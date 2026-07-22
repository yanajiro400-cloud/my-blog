# Design System

このサイト(`my-blog`)の実装(`src/app/globals.css` / `src/app/layout.tsx`)から抽出したビジュアルルール集。AIエージェントがUIを実装・修正する際は、新しい値を推測せずここのトークンを使うこと。

## Colors

### ベーストークン (`:root`, light)

| トークン | 値 | 用途 |
|---|---|---|
| `--bg` | `#ffffff` | カード・ナビ・フッターなどの前景背景 |
| `--bg-secondary` | `#f6f6f6` | ページ全体の背景(body) |
| `--text` | `#1a1a1a` | 見出し・本文の主文字色 |
| `--text-secondary` | `#6b6b6b` | 補助テキスト(説明文・日付など) |
| `--text-tertiary` | `#a0a0a0` | もっとも控えめなテキスト(カテゴリ・タグ・件数) |
| `--border` | `rgba(0,0,0,0.08)` | 控えめな枠線・ホバー塗り |
| `--border-secondary` | `rgba(0,0,0,0.15)` | 通常時の枠線 |
| `--grid-line` | `rgba(0,0,0,0.04)` | ヒーロー背景の装飾グリッド線 |
| `--placeholder` | `#e4e4e0` | サムネイル画像がない場合の背景 |

### アクセントカラー

| トークン | 値 | 用途 |
|---|---|---|
| `--accent-blue` | `#0048ff` | タイトルの強調文字・フィルターピル・ナビ矢印など、ここぞという箇所にのみ使用 |
| `--accent-blue-tint` | `#eef3ff` | アクセントブルーの薄塗り(ボタンの通常時背景など) |

### ダークモード上書き (`@media (prefers-color-scheme: dark)`)

| トークン | 値 |
|---|---|
| `--bg` | `#111110` |
| `--bg-secondary` | `#1c1c1a` |
| `--text` | `#eeeeec` |
| `--text-secondary` | `#a0a09a` |
| `--text-tertiary` | `#6b6b66` |
| `--border` | `rgba(255,255,255,0.08)` |
| `--border-secondary` | `rgba(255,255,255,0.15)` |
| `--grid-line` | `rgba(255,255,255,0.04)` |
| `--accent-blue-tint` | `rgba(0,72,255,0.16)` |

`--accent-blue` はダークモードでも変更しない(ブランドカラーは固定)。

## Typography

### フォントファミリー

`next/font/google` で読み込み、CSS変数として公開:

- `--font-montserrat`(Montserrat, weight 400/500/600/700) — 見出し(`h1,h2,h3`)とナビ(`nav`)のラテン文字・数字用
- `--font-noto-sans-jp`(Noto Sans JP, weight 400/500) — それ以外の本文全般、日本語のフォールバック

`body { font-family: var(--font-noto-sans-jp), var(--font-montserrat), sans-serif; }`
`h1, h2, h3, nav { font-family: var(--font-montserrat), var(--font-noto-sans-jp), sans-serif; }`

### スケール(実際に使われているサイズ)

| 要素 | サイズ | ウェイト | 備考 |
|---|---|---|---|
| ホームヒーロータイトル | `clamp(56px, 9vw, 120px)` | 700 | `letter-spacing: -2px`, `line-height: 1` |
| Postsセクション見出し | `56px` | 700 | `color: var(--accent-blue)` |
| 記事タイトル(詳細ページ) | `22px` | 500 | `line-height: 1.4`, `letter-spacing: -0.3px` |
| 本文内 h2 | `16px` | 500 | — |
| 本文内 h3 | `14px` | 500 | — |
| ヒーロー説明文 | `16px` | 400 | `line-height: 1.9`, `color: var(--text-secondary)` |
| 本文(記事コンテンツ) | `14px` | 400 | `line-height: 1.9`, `color: var(--text)` |
| ナビロゴ | `14px` | 500 | `letter-spacing: -0.2px` |
| カードタイトル(一覧) | `16px` | 400 | — |
| 補助テキスト(日付・タグ・カテゴリ) | `11〜14px` | 400 | `var(--text-secondary)` または `var(--text-tertiary)` |

## Spacing

固定の8pxグリッドではなく、要素ごとに `4 / 6 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 80px` あたりの値を使い分けている。新規実装時はこの並びから近い値を選ぶ。

### コンテナ幅

| トークン | 値 |
|---|---|
| `--home-width` | `1280px` — ナビ・フッター・ヒーロー・一覧・記事詳細まで、全ページ共通の外枠幅 |
| 記事本文の読みやすい幅 | `760px`(`.article-inner`、`--home-width` の内側でさらに絞る) |

### レスポンシブ余白パターン

主要コンテナ(`.nav-inner`, `.section`, `.article-wrap`, `.footer-inner`)は左右パディングを共通のブレークポイントで縮める:

```
デフォルト: 80px
@media (max-width: 900px): 40px
@media (max-width: 760px): 24px
```

## Components

### 角丸

| トークン | 値 | 用途 |
|---|---|---|
| `--radius-md` | `8px` | サムネイル画像・コードブロック |
| `--radius-lg` | `12px` | カード(`.card`, `.popular-item`) |
| (直値) `4px` | — | ピル・ホームの投稿カード・戻るボタン |
| (直値) `50%` | — | 丸カーソル・カルーセルナビボタン |

### ボタン・ピル(`.home-pill`)

- default: 透明背景 + `--accent-blue` の1px枠線、文字も `--accent-blue`
- hover: 背景 `--accent-blue-tint`
- active(選択中): 背景・枠線とも `--accent-blue`、文字は白
- 高さ32px、`border-radius: 4px`、`transition: background 0.15s, color 0.15s, border-color 0.15s`

### カード

3種類あり、用途で使い分ける:

- `.home-post-card`(ホームの投稿グリッド) — `border-radius: 4px`、hoverで丸カーソル+画像拡大+黒オーバーレイ(詳細は「Interaction」参照)
- `.card`(`/blog` 一覧・カルーセル) — `border-radius: var(--radius-lg)`、hoverで `opacity: 0.75`
- `.popular-item`(横並びリスト) — `border-radius: var(--radius-lg)`、hoverで `opacity: 0.7`

いずれも背景は `var(--bg)`(ページ背景 `--bg-secondary` との明度差でカードを認識させる)。

### ナビ・フッター

- ナビの高さ: `48px`
- ホームページのみナビ背景が透明(ヒーローのグリッド背景と一体化させるため、`nav:has(+ main .home-hero)` で判定)
- フッターは `border-top: 0.5px solid var(--border)` で区切るのみ、影は使わない

## Elevation

**このサイトに `box-shadow` は一切存在しない。** 奥行き・階層は影ではなく、以下の手段のみで表現する:

- 背景の明度差(`--bg` の白いカード vs `--bg-secondary` のグレーページ)
- 枠線(`--border` / `--border-secondary`)
- ホバー時の塗りの濃淡変化(下記 Interaction 参照)

新しいコンポーネントを追加する際も `box-shadow` は使わず、この3つの手段で階層を作ること。
