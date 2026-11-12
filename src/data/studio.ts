import machine01 from '../assets/line_oa_chat_261112_141434.jpg';
import machine02 from '../assets/line_oa_chat_261112_141436.jpg';
import chair from '../assets/line_oa_chat_261112_141437.jpg';
import reformer from '../assets/line_oa_chat_261112_141438.jpg';
import machine03 from '../assets/line_oa_chat_261112_141441.jpg';
import instructorStudio from '../assets/line_oa_chat_261112_141442.jpg';
import matLesson from '../assets/line_oa_chat_261112_141443.jpg';
import machineLesson from '../assets/line_oa_chat_261112_141444.jpg';
import instructor from '../assets/line_oa_chat_261112_141446.jpg';
import studioDetail from '../assets/line_oa_chat_261112_141447.jpg';
import welcome from '../assets/line_oa_chat_261112_141448.jpg';
import instructor01 from '../assets/line_oa_chat_261112_141449.jpg';
import instructor02 from '../assets/line_oa_chat_261112_141450.jpg';

export const links = {
  reserve: 'https://pilates-studio-san.stores.jp/reserve/pilates-3',
  line: 'https://lin.ee/qrd3Bivf',
  instagram: 'https://www.instagram.com/pilates.studio.san/',
  map: 'https://g.co/kgs/tSJwFL',
  phone: 'tel:09014971628',
};
export const navigation = [
  { href: '#about', en: 'About', label: 'Sanについて' },
  { href: '#lesson', en: 'Lesson', label: 'レッスン' },
  { href: '#price', en: 'Price', label: '料金' },
  { href: '#instructor', en: 'Instructor', label: 'インストラクター' },
  { href: '#access', en: 'Access', label: 'アクセス' },
];
export const photos = { machineLesson, matLesson, instructor, studioDetail };
// Six studio photographs and three everyday portraits, plus four main images.
export const gallery = [
  { image: machine01, label: 'プライベートスタジオ', alt: '木製のピラティスマシンと鏡を備えたスタジオの室内', position: 'center' },
  { image: reformer, label: 'マシンと向き合う時間', alt: 'スタジオに設置された木製のピラティスリフォーマー', position: 'center' },
  { image: chair, label: 'からだに合わせた器具', alt: 'ピラティスチェアとローラーなどのエクササイズ用具', position: 'center' },
  { image: welcome, label: 'ようこそ、Sanへ', alt: '観葉植物と小さな椅子に飾られたPilates studio Sanのサイン', position: 'center' },
  { image: machine02, label: '自分だけの空間', alt: '大きな鏡の前に設置されたピラティスマシン', position: 'center' },
  { image: machine03, label: '日々のセッションの場所', alt: '窓から光が入るスタジオに置かれたピラティスマシン', position: 'center' },
  { image: instructorStudio, label: 'スタジオにて', alt: 'スタジオの窓辺に立つインストラクター山口千恵子', position: 'center 28%' },
  { image: instructor01, label: 'セッションのひとこま', alt: '観葉植物のそばにいるインストラクター山口千恵子', position: 'center 32%' },
  { image: instructor02, label: 'Sanの日常', alt: 'スタジオ内で撮影したインストラクター山口千恵子の写真', position: 'center 30%' },
];
export const prices = [
  { count: '1', unit: '回', english: 'Single session', title: '1回レッスン', amount: '8,500', perSession: 'ご自身のペースで通いたい方に', validity: '都度払い' },
  { count: '5', unit: '回', english: '5-session pass', title: '5回チケット', amount: '40,000', perSession: '1回あたり 8,000円', validity: '有効期限 3ヶ月' },
  { count: '10', unit: '回', english: '10-session pass', title: '10回チケット', amount: '75,000', perSession: '1回あたり 7,500円', validity: '有効期限 5ヶ月' },
];
