# Pilates studio San

自由が丘のプライベートピラティススタジオの1ページサイトです。
Astro / GSAP / ScrollTrigger / Lenisを使用しています。

## 編集する場所

- `src/pages/index.astro` — ページの構成、本文、SEO・OGP設定
- `src/data/studio.ts` — 予約・SNSなどのリンク、料金、写真
- `src/styles/global.css` — 配色、レイアウト、レスポンシブ対応
- `src/scripts/main.ts` — スクロール演出、モバイルメニュー、写真ギャラリー
- `src/assets/logo-transparent.png` — 背景透過済みのロゴ
- `public/ogp.jpg` — ご提供の `src/assets/logo.jpg` のコピー
- `public/robots.txt` — クローラーのアクセス許可とサイトマップURL
- `public/sitemap.xml` — 公開ページのサイトマップ
- `src/pages/404.astro` — 存在しないURLのエラーページ（noindex）

## 開発サーバー

```sh
npm run dev -- --background
```

終了・状態・ログは `npm run astro -- dev stop`、`npm run astro -- dev status`、
`npm run astro -- dev logs` で管理します。

## 公開URL・SEO

公開URLは `https://pilates-studio-san.pages.dev/` です。
`astro.config.mjs` の `site` に設定し、canonical・OGP画像・構造化データのURLに使用しています。
公開先を変更する場合は `site` に加えて `public/robots.txt` と `public/sitemap.xml` のURLも更新してください。

- タイトル：自由が丘・九品仏のプライベートピラティス｜Pilates studio San
- 説明文：最寄り駅・世田谷区奥沢・完全プライベート・料金を、実際の掲載内容に合わせて記載。
- canonicalとOGPのURLは、公開URLを基準とした絶対URLで出力。
- JSON-LDで `WebSite`・`WebPage`・`ExerciseGym` を関連付け、店舗名・住所・電話番号・営業時間・料金を出力。
- 料金は `src/data/studio.ts` の表示用データから構造化データも作成。
- 祝日の営業時間は `PublicHolidays` として別途指定。不定休の説明も掲載。
- robots.txtはクロールを許可し、サイトマップを案内。
- サイトマップには正規のトップページだけを掲載。ページ内のアンカーと404ページは含めていません。
- Astroの404ページを用意し、Cloudflare Pagesで存在しないURLがトップページとして配信される既定動作を避けます。

公開後は、Google Search ConsoleでこのURLの所有権を確認したうえで、
`https://pilates-studio-san.pages.dev/sitemap.xml` を送信し、トップページのURL検査からインデックス登録をリクエストできます。
Search Consoleの所有権確認用トークンや管理権限は、このリポジトリには設定していません。

## 掲載内容

- ご提供の写真13点を、本文の4点とギャラリーの9点に分けてすべて使用。
- 体験レッスンは「実施していない」という依頼内容を優先。
- 最寄り駅の省略部分は、ご指定の公式予約ページにある「自由が丘駅」を採用。
- 料金はご提供の金額と有効期限を掲載。1回あたりの金額は回数券の総額から算出。
- LINEは依頼文のURL、Instagramは依頼文のユーザーネームに対応するプロフィールURLを使用。
- 資格の `BODY CNTROL PILATES` は `BODY CONTROL PILATES` に表記補正。

## ロゴ透過処理

ImageGenの組み込みツールを使用し、元画像を編集対象として、円の外側の白背景を透過した別ファイルを保存。
元の `logo.jpg` は保持しています。

使用したプロンプト:

> Use case: background-extraction. Edit target: the provided existing Pilates studio San logo. Create a faithful transparent-background cutout of this exact logo for a website. Remove ONLY the white background outside the coral-pink circle, replacing it with genuine alpha transparency. Preserve the entire coral circular disc, its original subtly imperfect round shape, gray flowing San lettering, pale yellow Pilates studio lettering, original type, exact text, proportions and original colors. Do not redesign, redraw, reinterpret or add elements. Keep the complete logo centered in a square canvas with small transparent padding. Preserve all artwork within the pink circle exactly.

## 確認状況

依頼に従い、実装後のビルド・テスト・開発サーバー起動・ブラウザ確認は行っていません。
