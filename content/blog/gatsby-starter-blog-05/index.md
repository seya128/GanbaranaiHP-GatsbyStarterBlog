---
title: GatsbyでHP作成 その5：画像やURLがはみ出す問題
date: "2022-03-18T00:10:00.000Z"
description: "Gatsby Starter Blogで、画像やURLがはみ出す問題の対処"
---

## 画像がはみ出す
Gatsby Starter Blogで、記事を投稿すると以下のように、画像がはみ出てしまいました。

![](https://i.gyazo.com/951c0c31b3d8ab4f9c09e9fde3e20b22.png)

`src/style.css`に以下を追加することで、横幅に合わせて収まるようになりました。
```css
.blog-post img {
  max-width: 100%;
}
```

![](https://i.gyazo.com/028a888094aa237329135d88cebdd68b.png)


## URLリンクがはみ出す

![](https://i.gyazo.com/5d4a5c9f4872b82379b10b58eb9cf915.png)

こちらも、`src/style.css`を修正することで直りました。
```css
a {
  color: var(--color-primary);
  word-break: break-all;
}
```
`word-break: break-all;`を追加して単語の途中でも改行するようにしました。

![](https://i.gyazo.com/6833cbf8254b3952ec1e7739c8c61af4.png)

