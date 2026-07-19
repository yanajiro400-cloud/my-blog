---
title: "CSS 変数をデザイントークンとして使う——Figma と コードの橋渡し"
date: "2026-06-13"
cat: "Design"
tags: ["CSS", "Figma", "デザインシステム"]
img: "https://picsum.photos/seed/css-tokens/1200/630"
---

Figma でデザインを作り、それをコードに落とし込むとき、いつも悩むのが「この色、どこで管理する？」という問題だ。

ハードコードで `#1a1a1a` と書いていると、デザインが変わるたびに全ファイルを grep して回ることになる。そこで CSS 変数をデザイントークンとして扱う方法が効いてくる。

## CSS 変数の基本

```css
:root {
  --color-text: #1a1a1a;
  --color-text-secondary: #6b6b6b;
  --space-md: 16px;
  --radius-lg: 12px;
}
```

`:root` に定義しておけば、どこからでも `var(--color-text)` で参照できる。変更するときも1箇所だけ直せばいい。

## Figma Variables との対応

Figma の Variables 機能を使うと、デザインファイル側でも同じ名前でトークンを管理できる。

| Figma Variable | CSS 変数 |
|---|---|
| `color/text` | `--color-text` |
| `color/text-secondary` | `--color-text-secondary` |
| `space/md` | `--space-md` |

命名規則を揃えておくと、デザイナーとエンジニアの会話がスムーズになる。「テキストのセカンダリカラーを少し明るくして」という話が、そのままコードの変更に直結する。

## ダークモードも自然に対応できる

CSS 変数の強みは、メディアクエリと組み合わせてダークモードを簡単に実装できること。

```css
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111110;
    --text: #eeeeec;
  }
}
```

コンポーネントは `var(--bg)` を使うだけで、あとはブラウザが自動で切り替えてくれる。JavaScript は一切不要だ。

## まとめ

デザイントークンとして CSS 変数を使う利点をまとめると：

- 変更が1箇所で済む
- Figma の変数名と対応させやすい
- ダークモードやテーマ切り替えに強い
- ランタイムのオーバーヘッドがない

デザインと実装の距離を縮めるための、シンプルだけど効果的な仕組みだと思っている。
