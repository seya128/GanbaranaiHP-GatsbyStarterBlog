---
title: GatsbyでHP作成 その2：ブログ記事を投稿
date: "2022-03-17T18:40:00.000Z"
description: "Gatsby Starter Blogでブログ記事を投稿してみます。"
---

[Gatsby Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/)では、
`content/blog/`の下に、記事のフォルダを作成し、その中に`index.md`を作成するようになっています。

フォルダ名が、URLになるようです。

`content/blog/gatsby-starter-blog-01`というフォルダを作成し、  
その中に以下の内容の`index.md`を作成しました。

`````md
---
title: GatsbyでHP作成 その1：インストール～ブログタイトルを変更
date: "2022-03-17T18:00:00.000Z"
description: "Gatsby Starter Blogをインストールし、ブログタイトルを変更、BIO表示の代わりに簡単なテキストを入れます"
---

Gatsybyという、WEBサイトを作るツールを使って、ガンバラナイのHPを作っていきます。

「がんばらない技術を提供」とか言って、いきなり難しいことを書いていますが、  
「がんばりたい」ことは、がんばります！  
「がんばりたくない」ことは、がんばりません。もしくはがんばらないように考えます。

ということで、以下は興味のある人や、これからGatsbyでブログやHPを構築していこうという人だけ読んでください。

## Gatsby Starter Blogをインストール

Gatsbyはすでインストールされている前提で進めていきます。

[Gatsby Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/)をベースに改造していきます。

```
$ npx gatsby new ganbaranai-blog https://github.com/gatsbyjs/gatsby-starter-blog
```
これでインストールできるので、とりあえずローカルで表示してみます。
```
$ cd ganbaranai-blog
$ yarn develop
```
(自分は、[こちら](https://www.gatsbyjs.com/docs/glossary/yarn/)を参考にyarnを使うようにしました。)


ブラウザで、http://localhost:8000/ を確認すると以下のようになりました。
![](https://i.gyazo.com/92b56d05e59c0d334a10804dca94b6f3.png)

## ページタイトルなどの基本情報を変更

gatsby-config.jsの基本情報を修正。

```jsx
siteMetadata: {
    title: `ガンバラナイ`,
    author: {
      name: `Kyle Mathews`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `がんばり過ぎていませんか？がんばらない技術を提供します。`,
    siteUrl: `https://ganbaranai.tech/`,
    social: {
      twitter: `ganbaranai_tech`,
    },
  },
```

とりあえず、title,description,siteUrl,twitterを修正しました。

## トップページAuthor表示をやめて簡単な説明文を入れる

src/index.jsを修正

```jsx
if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        {/*<Bio />*/}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      {/*<Bio />*/}
      <div>
        がんばり過ぎていませんか？<br/>
        ガンバラナイは、がんばらない技術を提供していきます。
      </div>
      <ol style={{ listStyle: `none` }}>
```

`<Bio />`の行をコメントアウトしました。

ここまでの修正で以下のような表示になりました。
![](https://i.gyazo.com/f94edc292dd721c40aa3d83de57b16f8.png)
``````

以下のような感じになりました。

![](https://i.gyazo.com/e0f263b411a26fd7c1badf107516c325.png)

