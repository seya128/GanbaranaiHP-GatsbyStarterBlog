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
git add .gitignore
git add .prettier*
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:seya128/GanbaranaiHP-GatsbyStarterBlog.git
git push -u origin main
```

## Cloudflare Pagesでデプロイ設定

Cludflareにログインして、「ページ」の設定画面を表示します。
![](https://i.gyazo.com/bd30b9da24bdce1101bc254b167defc2.png)
![](https://i.gyazo.com/31c6b40ab6a4f64529285add211e9401.png)
Githubへの接続のための処理をします。
その後、リポジトリを選ぶ画面が出るので上でpushしたリポジトリを選びます。
![](https://i.gyazo.com/91d0e0adec4e0734671a8754ce84ece3.png)
フレームワークプリセットで「Gatsby」を選択します。
![](https://gyazo.com/979e6d8d821c2340d182c17b32877ae1)

#### エラーになりました。
![](https://i.gyazo.com/9902515cf8ac97cf7e2504576b198ae0.png)
node.jsのバージョンが古いようです。

`.nvmrc`というファイルにnode.jsのバージョンを書いておけばよさそう。
https://developers.cloudflare.com/pages/platform/build-configuration/

ローカル環境で16.14.0なので、同じバージョンをしてしてみます。

.nvmrc
```
16.14.0
```


## 独自ドメイン設定
