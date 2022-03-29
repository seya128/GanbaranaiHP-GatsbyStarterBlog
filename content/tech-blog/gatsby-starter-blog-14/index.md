---
title: GatsbyでHP作成 その14：記事リストをカード表示
date: "2022-03-30T00:00:00.000Z"
description: "Gatsby Starter Blogで、記事リストをカード表示してみました。"
blog: "Tech"
tags: ["GatsbyJS"]
image: "d2cd42986c806e5766ccab10bcca61ae.png"
---

そろそろトップページの見た目も調整していきます。  
まず、記事リストをカード表示にしてみました。

## 記事リスト表示用のコンポーネント作成

```jsx:title=src/components/post-grid.js
import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./post-grid.module.css"

const PostGrid = ({posts}) => {

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => {
        const title = post.frontmatter.title || post.fields.slug
        const image = getImage(post.frontmatter.image)||null
        return (
          <section key={index}>
            <Link to={post.fields.slug} className={styles.item}>
              <div className={styles.image}>
                {image && (
                <GatsbyImage image={image} alt={post.frontmatter.title} className={styles.image}/>
                )}
              </div>
              <section className={styles.section}>
                <div className={styles.date}>{post.frontmatter.date}</div>
                <h2 className={styles.title}>
                  {title}
                </h2>
                <p className={styles.p}
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </Link>
          </section>
        )
      })}
    </div>
  )
}

export default PostGrid
```

```css:title=src/components/post-grid.module.css
.grid {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
}

.item {
    display: block;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 1px 1px #ddd, 0px 2px 4px #ddd;
    border: #eee 1px solid;
    transition: .5s all;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #2e353f;
    text-decoration: none;
    height: 320px;
}
.item:hover {
    transform: translate3d(-2px, -3px, 0);
    box-shadow: 0px 1px 1px #aaa, 2px 6px 4px #aaa;
}

.image {
    height: 200px;
}

.section {
    margin: 0 4px;
}
.title {
    font-size: 1.2rem;
    margin: 2px 0;
    line-height: 120%;
}

.date {
    font-size: 0.7rem;
    margin-top: -2px;
}
.p {
    font-size: 1rem;
    line-height: 120%;
    margin: 0;
}
```

## TOPページを修正

```jsx:title=src/pages/index.js
...
import PostGrid from "../components/post-grid"

const BlogIndex = ({ data, location }) => {
  ...
      {blogs.map((blog => {
        return(
          <div key={blog.label}>
            <h3>{blog.label}</h3>
            <PostGrid posts={blog.posts}></PostGrid>
          </div>
          )
      }))}
  ...

export const pageQuery = graphql`
  query {
    ...
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          ...
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                transformOptions: {
                  fit: CONTAIN
                  cropFocus: ATTENTION
                }
                aspectRatio: 2
                width: 800
              )
            }
          ....
```

graphqlのgatsbyImageDataのパラメーターが良くわからず苦戦しました。  
まだ理解できていませんが、いろいろ触ってよさそうなこのパラメーターに収まりました。

