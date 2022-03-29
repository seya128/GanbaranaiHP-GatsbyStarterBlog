---
title: GatsbyでHP作成 その8：Googleフォントを使ってみる
date: "2022-03-22T20:10:00.000Z"
description: "Gatsby Starter Blogで、Googleフォントを使ってみます"
blog: "Tech"
tags: ["GatsbyJS"]
---

Gatsby Starter Blogのフォントがかなり個性的で日本語に合わない感じだったので、Googleフォントに変更してみました。


> ![](https://i.gyazo.com/454e3253b87e14a80c58def7a4ef60e2.png)

## Googleフォント
[こちら](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#self-host-google-fonts-with-fontsource)を参考にします。

### 導入
```shell
yarn add @fontsource/noto-sans-jp
```

### 適用

`gatsby-browser.js`に、フォントの読み込み部分を記載します。
```js
import "@fontsource/noto-sans-jp"
```

`src/style.css`を修正します。
```css
/*  --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
    Times, serif;
  --font-body: var(--fontFamily-serif);
  --font-heading: var(--fontFamily-sans);
*/
  --fontFamily: 'Noto Sans JP', sans-serif;
  --font-body: var(--fontFamily);
  --font-heading: var(--fontFamily);
```

これで普通の日本語表示になりました。
