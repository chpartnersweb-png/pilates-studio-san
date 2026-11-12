import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector<HTMLElement>('[data-header]');
const menu = document.querySelector<HTMLDialogElement>('[data-mobile-menu]');
const menuOpen = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const lightbox = document.querySelector<HTMLDialogElement>('[data-lightbox]');
let lenis: Lenis | undefined;

function hasOpenModal() {
  return Boolean(menu?.open || lightbox?.open);
}

function lockScroll() {
  document.documentElement.classList.add('has-modal');
  lenis?.stop();
}

function releaseScroll() {
  if (hasOpenModal()) return;
  document.documentElement.classList.remove('has-modal');
  lenis?.start();
}

function closeDialog(dialog: HTMLDialogElement | null) {
  dialog?.close();
  // The native close event is queued. Unlock now so a same-frame anchor
  // navigation is not discarded by Lenis while it is still stopped.
  releaseScroll();
}

function focusSection(target: HTMLElement) {
  const needsTabindex = !target.hasAttribute('tabindex');
  if (needsTabindex) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (needsTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
}

// Keep ordinary, usable links in the HTML; enhance only same-page anchors.
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  event.preventDefault();
  if (menu?.open) closeDialog(menu);
  requestAnimationFrame(() => {
    if (lenis && !reducedMotion.matches) {
      lenis.scrollTo(target, {
        offset: -(header?.getBoundingClientRect().height ?? 80) - 16,
        duration: 1.25,
        onComplete: () => focusSection(target),
      });
    } else {
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
      focusSection(target);
    }
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
  });
});

menuOpen?.addEventListener('click', () => {
  if (!menu || menu.open) return;
  menu.showModal();
  menuOpen.setAttribute('aria-expanded', 'true');
  lockScroll();
});
document.querySelector('[data-menu-close]')?.addEventListener('click', () => closeDialog(menu));
menu?.addEventListener('close', () => {
  menuOpen?.setAttribute('aria-expanded', 'false');
  releaseScroll();
});
const desktopViewport = window.matchMedia('(min-width: 1024px)');
desktopViewport.addEventListener('change', (event) => {
  if (event.matches && menu?.open) closeDialog(menu);
});

// The navigation begins below the opening photograph, then sticks at the top.
const hero = document.querySelector<HTMLElement>('.hero');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY >= (hero?.offsetHeight ?? 0));
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// A native dialog provides focus containment, Escape dismissal and focus return.
const galleryImages = [...document.querySelectorAll<HTMLButtonElement>('[data-gallery-image]')];
const expandedImage = document.querySelector<HTMLImageElement>('[data-lightbox-image]');
const expandedCaption = document.querySelector<HTMLElement>('[data-lightbox-caption]');
const expandedCounter = document.querySelector<HTMLElement>('[data-lightbox-counter]');
let currentImage = 0;

function displayImage(index: number) {
  if (!galleryImages.length || !expandedImage) return;
  currentImage = (index + galleryImages.length) % galleryImages.length;
  const source = galleryImages[currentImage];
  expandedImage.src = source.dataset.source ?? '';
  expandedImage.alt = source.dataset.alt ?? '';
  if (expandedCaption) expandedCaption.textContent = source.dataset.title ?? '';
  if (expandedCounter) expandedCounter.textContent = `${String(currentImage + 1).padStart(2, '0')} / ${String(galleryImages.length).padStart(2, '0')}`;
}

galleryImages.forEach((button, index) => button.addEventListener('click', () => {
  if (!lightbox) return;
  displayImage(index);
  lightbox.showModal();
  lockScroll();
}));
document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => closeDialog(lightbox));
document.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => displayImage(currentImage - 1));
document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => displayImage(currentImage + 1));
lightbox?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    displayImage(currentImage + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
lightbox?.addEventListener('click', (event) => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(lightbox);
});
lightbox?.addEventListener('close', () => {
  expandedImage?.removeAttribute('src');
  releaseScroll();
});

// GSAP owns the sole animation clock, shared with Lenis and ScrollTrigger.
// Content is visible by default, even when scripts or animation do not run.
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
    prevent: (element) => element.hasAttribute('data-lenis-prevent'),
  });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  if (hasOpenModal()) lenis.stop();

  // On reloads of deep links, do not replay the opening outside the viewport.
  if (window.scrollY < 100 && (!window.location.hash || window.location.hash === '#top')) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-hero-line]', { yPercent: 110, duration: 1.1, stagger: .08 }, .08)
      .from('[data-hero-visual]', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.45, ease: 'power2.inOut' }, .2)
      .from('[data-hero-reveal]', { autoAlpha: 0, duration: .85, stagger: .12 }, .7);
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      autoAlpha: 0,
      y: 18,
      duration: .9,
      ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });

  const parallax = gsap.matchMedia();
  parallax.add('(min-width: 768px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
      gsap.fromTo(image, { yPercent: -2, scale: 1.06 }, {
        yPercent: 2,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    });
  });

  return () => {
    parallax.revert();
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = undefined;
  };
});

function refreshLayout() {
  lenis?.resize();
  ScrollTrigger.refresh();
  updateHeader();
}

if (document.readyState === 'complete') refreshLayout();
else window.addEventListener('load', refreshLayout, { once: true });
document.fonts.ready.then(refreshLayout);

// Return from the browser's back/forward cache without keeping a stale scroll lock.
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  releaseScroll();
  refreshLayout();
});
