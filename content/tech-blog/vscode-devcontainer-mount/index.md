---
title: VSCodeのRemoteContainerが激遅だったので対処してみた
date: "2022-08-01T15:00:00.000Z"
description: "RemoteContainerは超絶便利だが、ホストとの共有フォルダーが遅すぎて使い物にならない・・・"
blog: "Tech"
tags: ["Docker","VSCode","GatsbyJS"]
image: "88e6da6e5f456cebff223f27beee0ccc.png"
---

このブログのローカルビルド環境をdocker上に構築しようと、せっかくなのでVSCodeのRemote Conatinerを使って、VSCodeから楽々docker環境を立ち上げてビルドできるようにしてみました。  
簡単に構築できたのですが、ビルドが遅すぎる！！！！

いろいろ調べて、早くなったので、やり方をメモしておきます。

## 原因

遅い原因は、WindowsやMacだとホストと共有するフォルダのアクセスが激遅になるようです。  

## 対処方法

なので、Remote Containerは、コンテナの起動とコンテナ上のフォルダにVSCodeでアクセスするだけにします。
遅い共有フォルダは使わずに、dockerのボリューム上にソースコードをなどはPULLしてくるようにしました。

node_moduleや、.cacheなどのアクセス頻度が高いフォルダだけ、dockerボリュームにする方法も試しましたが、その方法だとビルドは早いですが、Gatsbyのホットリロード機能が効かず開発しにくかったです。

### devcontainer.json

```json:title=devcontainer.json
{
	"name": "Gatby",
	"build": {
		"dockerfile": "Dockerfile",
	},
	"mounts": [
		"source=${localWorkspaceFolderBasename}-Gatsby,target=/home/Gatsby,type=volume",
	],
	"workspaceFolder": "/home/Gatsby",
	"postCreateCommand": "sudo chown node /home/Gatsby",
	"remoteUser": "node"
}
```

``` json
	"mounts": [
		"source=${localWorkspaceFolderBasename}-Gatsby,target=/home/Gatsby,type=volume",
	],
```
`type=volume`で、dockerボリュームをマウントすることを表しています。

`${localWorkspaceFolderBasename}`は、ホスト側のフォルダ名です。  
ホストのフォルダ名が、`work`だったとすると、マウントするdockerボリューム名は`work-Gatsby`になります。  
ない場合は新たにdockerボリュームが作成されます。

``` json
	"workspaceFolder": "/home/Gatsby",
```
VS Codeで開くフォルダを指定しています。  
マウントした、dockerボリュームのフォルダが開きます。

``` json
	"postCreateCommand": "sudo chown node /home/Gatsby",
```
コンテナ作成後に実行されるコマンドです。  
マウントしたフォルダのオーナーを変更しています。

### Dockerfile

```
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}
RUN su node -c "npm install -g gatsby-cli"
```

Microsoft提供のnode16のコンテナを使って、Gatsbyのインストールまで行っています。


## 結論

ソースコードがホスト上のフォルダに反映されませんが、十分便利です。


## 参考

* [VSCode の Remote Container で React開発環境を構築する - Qiita](https://qiita.com/takashiuesaka/items/4012fee49ee0e06db72b)
* [VSCode と devcontainer で始める開発環境構築 - Qiita](https://qiita.com/haruhikonyan/items/291e1e5413a827fc6d9a)
