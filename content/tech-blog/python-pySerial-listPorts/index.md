---
title: Pythonでシリアルポートの一覧取得(Windows)
date: "2022-04-25T13:00:00.000Z"
description: "Pythonでシリアルポートの一覧取得してみました。(Windows)"
blog: "Tech"
tags: ["Python"]
image: "365637ac9be2c4525f384ce1afecfdb6.png"
---

Pythonでシリアルポート通信をやってみようと思います。  
まずは、シリアルポートの一覧を取得できるようにしてみます。  
Windows環境でやってみます。

## pythonインストール

[Pythonの開発環境を用意しよう！（Windows） | プログラミングの入門なら基礎から学べるProgate\[プロゲート\]](https://prog-8.com/docs/python-env-win)

このあたりを参考にpythonをインストールしました。

## pySerialインストール

pythonでシリアル通信を行う場合、pySerialというライブラリを使うのが良さそうです。  

[【TIPS】Pythonでシリアル通信するpyserialの使い方と動作確認方法\[Windows版\]｜エンジニアライフスタイルブログ](https://engineer-lifestyle-blog.com/code/python/pyserial-communication-usage/)

このあたりを参考に、pySerialをインストールしました。

自分はArduinoをつなぎましたが、適当なシリアルポートがない場合は、上記サイトにあるようにcom0comという仮想シリアルドライバを入れるとよさそうです。

## シリアルポート取得

pySerialライブラリには、シリアルポートの一覧を取得するメソッドがあるようなのでこちらを使ってみます。

```python:title=pySerial_listPorts.py
import serial.tools.list_ports

ports = list(serial.tools.list_ports.comports())
for p in ports:
    print(p)
    print(" device       :", p.device)
    print(" name         :", p.name)
    print(" description  :", p.description)
    print(" hwid         :", p.hwid)
    print(" vid          :", p.vid)
    print(" pid          :", p.pid)
    print(" serial_number:", p.serial_number)
    print(" location     :", p.location)
    print(" manufactuer  :", p.manufacturer)
    print(" product      :", p.product)
    print(" interface    :", p.interface)
    print("")
```
## 実行結果

```
>python pySerial_listPorts.py
COM3 - USB シリアル デバイス (COM3)
 device       : COM3
 name         : COM3
 description  : USB シリアル デバイス (COM3)
 hwid         : USB VID:PID=2341:0042 SER=85734323331351C0F1A0 LOCATION=1-2
 vid          : 9025
 pid          : 66
 serial_number: 85734323331351C0F1A0
 location     : 1-2
 manufactuer  : Microsoft
 product      : None
 interface    : None

COM7 - com0com - serial port emulator (COM7)
 device       : COM7
 name         : COM7
 description  : com0com - serial port emulator (COM7)
 hwid         : COM0COM\PORT\CNCA0
 vid          : None
 pid          : None
 serial_number: None
 location     : None
 manufactuer  : Vyacheslav Frolov
 product      : None
 interface    : None

COM8 - com0com - serial port emulator (COM8)
 device       : COM8
 name         : COM8
 description  : com0com - serial port emulator (COM8)
 hwid         : COM0COM\PORT\CNCB0
 vid          : None
 pid          : None
 serial_number: None
 location     : None
 manufactuer  : Vyacheslav Frolov
 product      : None
 interface    : None
```

COM3が、Arduino  
COM7,COM8が、仮想シリアルドライバー  
です。

pythonでのシリアルポート一覧ができました。  
WSL環境(Ubuntu)では、どのような結果になるかも試してみようと思います。

