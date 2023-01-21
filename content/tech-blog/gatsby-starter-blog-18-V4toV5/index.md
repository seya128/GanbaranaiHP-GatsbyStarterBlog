---
title: Gatsby V4からV5へアップデート
date: "202３-01-20T17:00:00.000Z"
description: "GatsbyV4をV5ヘアップデートしました"
blog: "Tech"
tags: ["GatsbyJS"]
image: "blogcard.png"
---

以下の公式サイトの説明に従ってアップデートしてみます。

<iframe title="Migrating from v4 to v5 | Gatsby" src="https://hatenablog-parts.com/embed?url=https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

## 非推奨の修正
v5 にアップグレードする前gatsbyに、最新の v4 バージョンに (およびすべてのプラグインを) アップグレードします。

```
$ yarn upgrade-interactive
yarn upgrade-interactive v1.22.19
info There appears to be trouble with your network connection. Retrying...
```


## node.jsのアップデート

Chromebook上のLinuxでは、Voltaを使ってnode.jsのバージョン管理をしていたので以下のように最新のLTSにアップデートしました。
```
$ volta install node
$ volta install npm
$ volta install yarn
```
インストールされたツールは以下のように確認できます。
```
$ volta list
⚡️ Currently active tools:

    Node: v18.13.0 (default)
    npm: v9.3.1 (default)
    Yarn: v1.22.19 (default)
    Tool binaries available: NONE
```

## Gatsby.jsのアップデート




