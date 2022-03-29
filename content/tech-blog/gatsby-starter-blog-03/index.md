---
title: GatsbyでHP作成 その3：ブログ記事ページの投稿者情報を非表示
date: "2022-03-17T19:20:00.000Z"
description: "Gatsby Starter Blogのログ記事ページの投稿者情報を非表示にします。"
blog: "Tech"
tags: ["GatsbyJS"]
---

トップページの投稿者情報は非表示にしましたが、ブログ記事ページにも投稿者情報が表示されていましたので、こちらも非表示にします。

![](https://i.gyazo.com/3582a1af5407614541553505538f69fb.png)


gatsby starter blogの記事ページのテンプレートは、
`src/templates/blog-post.js`ですので、こちらを修正します。

```jsx
import * as React from "react"
import { Link, graphql } from "gatsby"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          {/*<Bio />*/}
        </footer>
      </article>
```

最初のほうの`import Bio`の行と、  
`<footer>`の`<Bio />`の行をコメントアウトします。

これで、投稿者情報が非表示になりました。

