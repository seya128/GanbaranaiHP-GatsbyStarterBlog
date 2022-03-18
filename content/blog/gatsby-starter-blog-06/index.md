---
title: GatsbyでHP作成 その6：記事ページのURLディレクトリを変更
date: "2022-03-18T15:50:00.000Z"
description: "Gatsby Starter Blogで、記事ページのURLディレクトリを変更する"
---

Gatsby Starter Blogでは、ベースURL直下に投稿ページが作成されます。  
`https://ドメイン/記事slug/`

これを、`blog`フォルダの下に記事を置くような感じにしたかったので試してみました。  
`https://ドメイン/blog/記事slug/`


gatsby-node.jsを修正します。
```jsx
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `/blog${value}`,
    })
  }
}
```
createNodeFieldに渡す、valueがURLになるようです。


![](https://i.gyazo.com/cecba23831ea62268fb1f90b8a30101a.png)

