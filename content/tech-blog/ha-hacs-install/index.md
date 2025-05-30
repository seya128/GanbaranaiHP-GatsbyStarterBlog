---
title: 【HomeAssistant】HACSをインストール
date: "2025-05-30T20:00:00.000Z"
description: "Home Assistantの非公式な統合やUI要素を管理するツールHACSをインストールします。"
image: "./hacs-hp.png"
blog: "Tech"
tags: ["HomeAssistant"]
---

# HACSとは？

Home Assistant Community Store (HACS)

Home Assistantの非公式な統合、プラグイン、UI要素などを管理するためのツールです。コミュニティ製の豊富なコンテンツを簡単に見つけ、インストール、そして更新できるため、Home Assistantの機能を大幅に拡張し、よりパーソナルなスマートホーム環境を構築するのに役立ちます。

<iframe title="HACS" src="https://hatenablog-parts.com/embed?url=https://www.hacs.xyz/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

# HACSのインストール

前回ミニPCにHomeAssistant OSをインストールしました。  
<iframe title="HomeAssistantをミニPCにインストール | ガンバラナイ" src="https://hatenablog-parts.com/embed?url=https://ganbaranai.tech/tech-blog/ha-install-minipc/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

そのHomeAssistantをさらに便利にするためのツールHACSをインストールしていきます。

<iframe title="ユーザードキュメント - HACS" src="https://hatenablog-parts.com/embed?url=https://www.hacs.xyz/docs/use/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

このページの手順に従ってインストールします。

![](image.png)

## 1. HACSをダウンロードする前に、要件が満たされているかどうかを確認

![](image-1.png)

## 2. HACSをダウンロード

![](image-2.png)

「マイリンク」をクリックします。

![](image-3.png)  
ローカルのHomeAssitantのURLが違っていないか確認して「Save」

![](image-4.png)  
「Open Link」

![](image-5.png)  
「追加」

![](image-6.png)  
「インストール」

![](image-7.png)  
「開始」

HomeAssistantの再起動  
![](image-8.png)


## 3. HACS統合を設定

[設定] > [デバイスとサービス]

![](image-9.png)  
「統合を追加」

![](image-10.png)  
「hacs」で検索して、「HACS」をクリック

![](image-11.png)  
チェックを入れて「送信」

![](image-13.png)  
認証コードをメモして、リンクをクリック

GitHubのページが表示されるので、メモしたコードを入力

![](image-14.png)  
「SKIP AND FINISH」


## 4. 設定オプションを確認

特に設定を変更する必要はないと思います。

![](image-12.png)

## 5. HACSダッシュボードの概要を把握し、HACSの使用を開始

HACSの画面が利用できるようになりました。

![](image-15.png)

