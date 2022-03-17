---
title: GatsbyでHP作成 その4：Cloudflare Pagesで公開
date: "2022-03-17T20:20:00.000Z"
description: "Gatsbyで作ったサイトをCloudflarePagesで公開します。"
---

以下手順で、Gatsbyで作ったサイトをCloudflare Pagesで公開してみます。

1. GitHubにソースコードを保存
2. Cloudflare Pagesでデプロイ設定
3. 独自ドメイン設定

GitHubやCloudflareのアカウント等はすでに設定されている前提です。

## GitHubにソースコードを保存

GitHubでリポジトリを作成。

以下のコマンドで、ソースコードをpush.

```sh
git init
git add *
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:seya128/GanbaranaiHP-GatsbyStarterBlog.git
git push -u origin main
```

## Cloudflare Pagesでデプロイ設定

## 独自ドメイン設定
