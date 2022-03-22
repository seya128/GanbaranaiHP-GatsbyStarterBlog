---
title: GatsbyでHP作成 その9：投稿にヒーロー画像を追加
date: "2022-03-22T23:00:00.000Z"
description: "Gatsby Starter Blogで、投稿にヒーロー画像を追加します"
image: "./tk-qJDkJRTedNw-unsplash.jpg"
---

ブログの投稿にヒーロー画像を表示するようにしてみます。


[このあたり](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image/)を参考にしてみます。


## マークダウン
```
---
title: GatsbyでHP作成 その9：投稿にヒーロー画像を追加
date: "2022-03-22T23:00:00.000Z"
description: "Gatsby Starter Blogで、投稿にヒーロー画像を追加します"
image: "./tk-qJDkJRTedNw-unsplash.jpg"
---
```
imageプロパティを追加し、この画像を表示するようにします。

## プラグイン
* gatsby-plugin-image
* gatsby-plugin-sharp
* gatsby-transformer-sharp
この辺りを使います。

[GatsbyでHP作成 その7：TOPページに画像を表示](../gatsby-starter-blog-07/)でインストールしているのですでに使える状態です。


## テンプレート修正


### GraphQL
ブログの投稿は、`src\templates\blog-post.js`の内容で処理されるのでこのファイルを修正します。

```jsx
export const pageQuery = graphql`
  query BlogPostBySlug(
    ...
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        ...
        image {
          childImageSharp {
            gatsbyImageData(
              width: 1024
              layout: FULL_WIDTH
            )
          }
        }
        ...
```

### 表示
同じく`src\templates\blog-post.js`を修正します。

```jsx
  ...
  import { GatsbyImage, getImage } from "gatsby-plugin-image"
  ...
  const BlogPostTemplate = ({ data, location }) => {
    ...
    const image = getImage(post.frontmatter.image)
    ...
    return (
      ...
      <header>
        <h1 itemProp="headline">{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <GatsbyImage image={image} alt={post.frontmatter.title} />
      </header>
      ...
```

`getImage`と`GatsbyImage`を追加します。

### CSS調整

`src/style.css`を調整。

```css
...
.blog-post header{
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-8) var(--spacing-0);
}

.blog-post header h1 {
  font-size: var(--fontSize-4);
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-2) var(--spacing-0);
}

.blog-post header p {
  font-size: var(--fontSize-0);
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-0) var(--spacing-0);
}
...
```
