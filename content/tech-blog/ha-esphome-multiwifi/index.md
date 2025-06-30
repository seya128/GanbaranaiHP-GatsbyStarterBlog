---
title: 【HomeAssistant】ESP-Homeで複数のWiFiネットワークを使う
date: "2025-06-30T14:00:00.000Z"
description: "ESP-Homeで複数のWiFiネットワークを使うための設定。"
image: "./image-1.png"
blog: "Tech"
tags: ["HomeAssistant","ESPHome"]
---

# ESP-Homeで作成するデバイスが複数のWiFiネットワークを使えるようにする

複数のWiFiネットワークの設定をしておいて、接続できるWiFiネットワークがあれば自動的に接続するようにできます。

ESPHomeでは、wifi コンポーネントの networks キーを使用することで、複数のWi-FiネットワークのSSIDとパスワードをリストとして指定できます。ESPHomeデバイスは、指定されたネットワークの中から最も信号強度の強いものに自動的に接続しようとします。

以下、config.yaml ファイルでの設定例：
```yaml
wifi:
  networks:
    - ssid: "自宅Wi-Fi"
      password: "自宅Wi-Fiのパスワード"
    - ssid: "オフィスWi-Fi"
      password: "オフィスWi-Fiのパスワード"
    - ssid: "テザリング用Wi-Fi"
      password: "テザリングのパスワード"
  # ap: # フォールバックホットスポットを有効にする場合
  #   ssid: "ESPHome Fallback AP"
  #   password: "fallbackpassword"
  ```

ポイントは、networks キーを使用して、複数のネットワークをリストとして指定することです。ESPHomeデバイスは、これらのネットワークの中から最も信号強度の強いものに自動的に接続します。

## secrets.yamlを使って、ssidやpasswordなどの機密情報を管理する

パスワードなどの機密情報は、secrets.yaml ファイルに記述し、!secret を使って参照することをおすすめします。これにより、設定ファイルをGitHubなどに公開する際にも安全です。

secrets.yaml の例:

```yaml
home_wifi_ssid: "自宅Wi-Fi"
home_wifi_password: "自宅Wi-Fiのパスワード"
office_wifi_ssid: "オフィスWi-Fi"
office_wifi_password: "オフィスWi-Fiのパスワード"
```

config.yaml からの参照例:
```yaml
wifi:
  networks:
    - ssid: !secret home_wifi_ssid
      password: !secret home_wifi_password
    - ssid: !secret office_wifi_ssid
      password: !secret office_wifi_password
```

このように、ESPHomeでは複数のWiFi SSID情報を柔軟に設定し、デバイスを様々な環境に対応させることができます。

前回設定したBluetoothプロキシでも応用できると思います。

<iframe title="【HomeAssistant】Bluetoothの届かない場所にはBluetoothプロキシ | ガンバラナイ" src="https://hatenablog-parts.com/embed?url=https://ganbaranai.tech/tech-blog/ha-bluetooth-proxy/" style="width:100%;height:150px; max-width:600px; margin-left:auto; margin-right:auto;" frameborder="0" scrolling="no" loading="lazy"></iframe>

