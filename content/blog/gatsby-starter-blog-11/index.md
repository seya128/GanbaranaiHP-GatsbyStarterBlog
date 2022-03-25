---
title: GatsbyでHP作成 その11：コードブロックにタイトルと行ハイライト追加
date: "2022-03-24T17:30:00.000Z"
description: "Gatsby Starter Blogで、コードブロックにタイトルと行ハイライト追加してみました。"
image: "2315bb0c1e4758114cfe534609cc99e4.png"
---

他のサイトを見ると、コードブロックにタイトルがついていたり、特定の行に色がついていたりしてわかりやすいなと思ったので、やってみました。

## プラグイン導入

```shell
$ yarn add gatsby-remark-prismjs-title
```

```jsx{9-10}:title=gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          ...
          `gatsby-remark-prismjs-title`,
          `gatsby-remark-prismjs`,
          ...
```

`gatsby-remark-prismjs-title`を、 `gatsby-remark-prismjs`より前に記述しないと、タイトルが表示されませんでした。


## CSS調整

prismテーマ変更。
（黒背景のコードブロックにしました）
```jsx:title=gatsby-browser.js
// Highlighting for code blocks
//import "prismjs/themes/prism.css"
import "prismjs/themes/prism-tomorrow.css"
```

コードブロックのタイトル部分のCSS
```css:title=style.css
.gatsby-code-title {
  background: #777;
  color: #eee;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  margin: 20px 0px -20px;
  padding: 8px 0.5rem 20px;
  font-size: 0.8em;
  line-height: 1;
  display: table;
}
```

コードブロックの行ハイライトのCSS
```css:title=style.css
.gatsby-highlight-code-line {
  background-color: #444444;
  display: block;
  margin-right: -1em;
  margin-left: -16px;
  padding-right: 1em;
  padding-left: 10px;
  border-left: 6px solid rgb(255 173 173);
}
```

## 記述法

````
```jsx{9-10}:title=gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          ...
          `gatsby-remark-prismjs-title`,
          `gatsby-remark-prismjs`,
          ...
```
````
と記述すると以下のようになります。
```jsx{9-10}:title=gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          ...
          `gatsby-remark-prismjs-title`,
          `gatsby-remark-prismjs`,
          ...
```
