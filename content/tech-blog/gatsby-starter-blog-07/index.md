---
title: GatsbyでHP作成 その7：TOPページに画像を表示
date: "2022-03-22T18:50:00.000Z"
description: "Gatsby Starter Blogで、TOPページに画像を表示します"
blog: "Tech"
tags: ["GatsbyJS"]
---

トップページに画像を入れてみました。
![](https://i.gyazo.com/647395b5006ab30275005ce44034b671.jpg)

## StaticImageコンポーネント
[こちら](https://zenn.dev/kaito18/articles/1b7a813375ac69)の記事を参考に、StaticImageコンポーネントを使って画像を表示してみます。

### 導入
```shell
yarn add gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem
```

```js
module.exports = {
    ：
  plugins: [
      ：
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
      ：
  ],
}
```

### 画像表示

トップページは、`src/pages/index.js`を表示します。
```js
    ：
import { StaticImage } from "gatsby-plugin-image"
    ：
const BlogIndex = ({ data, location }) => {
    :
    :    
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Top" />
      <StaticImage 
        src="../images/mori.jpg" 
        alt="はーつん"
        layout="fullWidth"
      />
      :

```
