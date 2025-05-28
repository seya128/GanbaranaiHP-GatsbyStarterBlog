---
title: HomeAssistantをミニPCにインストール
date: "2025-05-28T18:00:00.000Z"
description: "HomeAssistantをミニPCにインストール手順。USBでUbuntuを起動して内蔵SSDにインストールするやり方"
image: "./home-assistant-hp.png"
blog: "Tech"
tags: ["HomeAssistant"]
---

# HomeAssistantとは

ホーム アシスタントは、ホーム オートメーションに使用される無料のオープンソース ソフトウェアです。これは統合プラットフォームおよびスマート ホーム ハブとして機能し、ユーザーがスマート ホーム デバイスを制御できるようにします。

(Wikipediaより)

複数メーカーのいろいろなスマートホーム製品や、自作の機器などを一括管理できるようです。

自由にカスタムできるダッシュボードや、いろんな機器を組み合わせた自動化などもできるという優れものらしいです。

<iframe title="Home Assistant" src="https://hatenablog-parts.com/embed?url=https://www.home-assistant.io/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

# インストール方法

インストール方法はいろいろあって、一番簡単なのは、
- SDカードにHomeAssistantOSを書き込んでラズベリーパイで起動

なのですが、ラズベリーパイも今購入するとなんだかんだで１万円台後半必要。  

HomeAssistatOSは、IntelPCにも対応とのことなので、２万円出して安いミニPCのほうがスペックが格段に良いので試してみることにします。

Amazonで19,900円で購入したPCを使います。

<iframe title="２万円以下のミニPC「ACEMAGIC Vista Mini V1」を買ってみた | ガンバラナイ" src="https://hatenablog-parts.com/embed?url=https://ganbaranai.tech/blog/minipc-acemagic-vistaminiv1/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

