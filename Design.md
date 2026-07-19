# Hover Design Rules

このサイトのインタラクティブ要素(ピル・カード・ボタン)のホバー時の見た目に関する共通ルール。

## 基本原則

- ホバーは「全体のopacityを下げてぼかす」のではなく、**要素自体の色(塗り)を変える**ことでフィードバックする。
- 状態は 3 段階で色が濃くなっていくグラデーションとして設計する:

  ```
  default(白/薄い塗り) → hover(一段濃い塗り) → active/selected(最も濃い塗り)
  ```

- 色の変化は `background-color` の transition で行う(`opacity` の transition は基本使わない)。

## トークン

| トークン | 値(light) | 用途 |
|---|---|---|
| `--accent-blue` | `#0048ff` | アクティブ/選択状態の塗り、アイコン色 |
| `--accent-blue-tint` | `#eef3ff` | ボタンの通常時の薄い塗り |
| `--border` | `rgba(0,0,0,0.08)` | 最も控えめなホバー塗り(グレー系) |
| `--border-secondary` | `rgba(0,0,0,0.15)` | 通常時の枠線 |
| `--text-secondary` | `#6b6b6b` | — |

## コンポーネント別ルール

### フィルターピル(`.home-pill`)

- default: 白背景 + `--border-secondary` の枠線
- hover: 背景を `--border`(薄いグレー)に。枠線の変化はなし
- active(選択中): 背景 `--accent-blue` + 白文字、枠線なし
- active + hover(選択解除しようとしている状態): 背景をさらに一段濃い青(`#0039c2`)に

### カード(Postsグリッド `.home-post-card` / カルーセル `.card`)

hoverで以下を同時に起こす:

1. **丸カーソル**: デフォルトカーソルを消し(`cursor: none`)、直径48pxの白丸(`mix-blend-mode: difference`)がマウスに追従する。フェードイン/アウトは `opacity` + `scale` の2軸で。実装は `HoverCursor` コンポーネント(`document.body` に `createPortal` — position:fixedが親要素のtransformに引っ張られないようにするため)
2. **画像を少し拡大**: `transform: scale(1.06)`、0.4s ease
3. **画像に黒オーバーレイ**: `::after` 疑似要素で `opacity: 0 → 0.2`、0.3s ease

カード自体の `opacity` フェードは使わない(黒オーバーレイに置き換え済み)。

### カルーセルのナビボタン(`.navButton`)

- default: 背景 `--accent-blue-tint`(薄い水色)、アイコン色 `--accent-blue`、枠線なし
- hover: 背景を一段濃く。`color-mix(in srgb, var(--accent-blue) 18%, var(--accent-blue-tint))` で `--accent-blue` を18%だけ混ぜて濃度を上げる
- disabled: `opacity: 0.3`

## カスタムカーソル(`HoverCursor` / `.hover-cursor`)

- サイズ: 48px、円形
- 色: 白(`#fff`)+ `mix-blend-mode: difference`(下の色を反転させて視認性を保つ)
- 表示/非表示: `opacity` + `scale`(0.4 → 1)のtransition
- `position: fixed` の基準がズレないよう、`document.body` に直接ポータル描画する(親要素にCSS transformがあると `position: fixed` の基準がそのtransform要素になってしまうため)
- タッチデバイスでは非表示(`@media (hover: none)`)
