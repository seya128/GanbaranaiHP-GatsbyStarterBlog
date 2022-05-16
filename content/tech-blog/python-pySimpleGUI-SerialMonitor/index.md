---
title: PythonでGUIプログラム作成(シリアルモニターを作ってみた)
date: "2022-05-26T15:00:00.000Z"
description: "PySimpleGUIを使ってArduinoIDEのシリアルモニターもどきを作ってみました。"
blog: "Tech"
tags: ["Python","PySimpleGUI"]
image: "Screenshot.png"
---

前回pySerialを使って、シリアルポートの一覧を取得することができたので、今回はPySimpleGUIを使ってArduinoIDEのシリアルモニターのようなプログラムを作成しました。

## PySimpleGUIとは

Pythonで簡単にGUIアプリを作成するためのライブラリです。

[公式サイト](https://pysimplegui.readthedocs.io/)

### Jump Start
公式サイトにJumpStartとして、PySimpleGUIのインストール方法と簡単なサンプルが書かれています。

#### インストール
```
> pip install pysimplegui
```

#### サンプルコード
``` python:title=jumpstart.py
import PySimpleGUI as sg

sg.theme('DarkAmber')   # Add a touch of color
# All the stuff inside your window.
layout = [  [sg.Text('Some text on Row 1')],
            [sg.Text('Enter something on Row 2'), sg.InputText()],
            [sg.Button('Ok'), sg.Button('Cancel')] ]

# Create the Window
window = sg.Window('Window Title', layout)
# Event Loop to process "events" and get the "values" of the inputs
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Cancel': # if user closes window or clicks cancel
        break
    print('You entered ', values[0])

window.close()
```

#### 実行
```
> python jumpstart.py
```
![](https://user-images.githubusercontent.com/46163555/68713283-7cb38200-056b-11ea-990a-aa1603af5a11.png)

たったこれだけのコードでGUIプログラムができるなんて素敵ですね。

### Cookbook

上記サンプルだけでなく、[公式サイトのCookbook](https://pysimplegui.readthedocs.io/en/latest/cookbook/)に使い方やサンプルが書かれています。

また、その中にいろいろなサンプルコードを実行したり見たりできるDEMOプログラム["PySimpleGUI Demo Program & Project Browser"](https://pysimplegui.readthedocs.io/en/latest/cookbook/#demo-program-project-browser-features) が紹介されています。  
このデモプログラムで実際に動かしながらコードの中身を見ることができます。  
いくつかのサンプルは、ライブラリを別途インストールしないと動作しないようです。

![](https://user-images.githubusercontent.com/46163555/151877440-85ad9239-3219-4711-8cdf-9abc1501f05a.jpg)

コードを編集するためのエディタなどのパス設定は「Setting」ボタンでできます。

## シリアルモニター作成

上記を参考にしながら、Arduino IDEのシリアルモニターに似たものを作成してみました。

``` python:title=SerialMonitor.py
# PySimpleGUIを使ったシリアルモニター
# ArduinoIDEのシリアルモニターとほとんど同じです

import PySimpleGUI as sg
import datetime
import serial
from serial.tools import list_ports


# 改行コード
DICT_NEWLINE = {
  'none':   '', 
  'LF':     '\n',
  'CR':     '\r',
  'CR+LF':  '\r\n'
}

# ボーレート
LIST_BAUDRATE = [
  '300 bps',
  '1200 bps',
  '2400 bps',
  '4800 bps',
  '9600 bps',
  '19200 bps',
  '38400 bps',
  '57600 bps',
  '74880 bps',
  '115200 bps',
  '230400 bps',
  '250000 bps',
  '500000 bps',
  '1000000 bps',
  '2000000 bps'
]

# COMポートリスト
def list_port():

  ports = list_ports.comports()    # ポートデータを取得
  
  devices = [info.device for info in ports]
  
  return devices

# COMポートオープン
def open_port(port, baudrate):
  ser = serial.Serial()
  ser.baudrate = int(baudrate[0:-4])
  ser.timeout = 0.01       # タイムアウトの時間(秒)
  ser.port = port
  # 開いてみる
  try:
      ser.open()
      return ser
  except:
      print("error when opening serial")
      return None


# 出力エリアにプリント
def printOut(s, sep, scroll, timestamp):
    if timestamp==True:
      now = datetime.datetime.now().strftime('%H:%M:%S.%f')
      sg.cprint(now[0:-3]+sep+s,end="", autoscroll=scroll)
    else:
      sg.cprint(s,end="", autoscroll=scroll)



# シリアルモニター

com_list = list_port()

layout = [
   [
     sg.Input('', size=(10,1), font=('ＭＳ ゴシック',10),  expand_x=True, key='-IN-'), 
     sg.Button('Send', bind_return_key=True, key='-SEND-')
   ],
   [sg.Multiline('', size=(80,30), font=('ＭＳ ゴシック',10), expand_x=True, expand_y=True, key='-OUT-')],
   [
     sg.Checkbox('AutoScroll', default = True, key='-AutoScroll-'), 
     sg.Checkbox('Timestamp', default = False, key='-Timestamp-'),
     sg.Stretch(),
     sg.Combo(values=list(DICT_NEWLINE.keys()), default_value='LF', readonly=True, key='-newline-'),
     sg.Combo(values=com_list, default_value=com_list[0], enable_events=True, readonly=True, key='-port-'),
     sg.Combo(values=LIST_BAUDRATE, default_value='115200 bps',  enable_events=True, readonly=True, key='-baudrate-'),
     sg.Button('Clear', key='-CLEAR-')
   ]
]

window = sg.Window('Serial Monitor', layout, resizable=True,return_keyboard_events=True)

sg.cprint_set_output_destination(window, '-OUT-');


ser = open_port(window['-port-'].DefaultValue, window['-baudrate-'].DefaultValue)

while True:             # Event Loop
  event, values = window.read(timeout = 2)  # timeoutの単位はms
  if event == sg.WIN_CLOSED:
    break
  if event == '-SEND-':
    w_data = values['-IN-']+DICT_NEWLINE[values['-newline-']]
    try:
      ser.write(w_data.encode())
    finally:
      #printOut(values['-IN-']+'\n', ' <- ', values['-AutoScroll-'], values['-Timestamp-'])
      window['-IN-'].update('');
  if event == '-port-' or event == '-baudrate-':
    if ser is not None:
      ser.close();
    ser = open_port(values['-port-'], values['-baudrate-'])
  if event == '-CLEAR-':
    window['-OUT-'].update('')
  
  if ser is not None:
    if ser.is_open:
      while (True):
        data = ser.readline()
        if data == b'':
          break
        try:
          printOut(data.decode(), ' -> ', values['-AutoScroll-'], values['-Timestamp-']) 
        except:
          print('Decode Error')

if ser is not None:
  ser.close()
  
window.close()

```

## ポイント

### 文字フォント

``` python
sg.Input('', size=(10,1), font=('ＭＳ ゴシック',10),  expand_x=True, key='-IN-'),
```

フォントの指定はこのようにカッコで括って、フォント名とサイズを指定する必要があります。

等幅フォントにしなけれいけなかったので、「ＭＳ ゴシック」を指定しているが、Windows以外でも共通で使える等幅フォントって何を指定すればよいのだろう？

### ウィンドウのリサイズ

``` python
sg.Multiline('', size=(80,30), font=('ＭＳ ゴシック',10), expand_x=True, expand_y=True, key='-OUT-')
```
ウィンドウのリサイズによってサイズを変えたいエレメントには、`expand_x=True`や`expand_y=True`を指定します。

エレメントの間の空間をウィンドウサイズに合わせて変化させたい場合は、
``` python
sg.Stretch()
```
を、エレメントを間に入れれば良さそうです。  
Stretchエレメントを使って、ウィンドウの右にエレメントを寄せることができます。  
(ウィンドウ下部の、コンボボックスやボタンのところで使っています)

さらに、ウィンドウ自体をサイズ変更できるようにする必要があります。
``` python
window = sg.Window('Serial Monitor', layout, resizable=True,return_keyboard_events=True)
```
`resizable=True`を指定します。

### コンボボックス、チェックボックスなどのイベント

コンボボックスや、チェックボックスは、デフォルトではイベントが発生しない設定になるようです。  
`enable_events=True`を指定すると、変更時にイベントが発生するようになります。

### コンボボックスのリードオンリー

コンボボックスは、デフォルトでは文字列部分を編集できるようになっています。  
文字入力はさせずに、選択肢だけから選ばせる場合は、`readonly=True`を指定します。

### シリアル通信の読み込みタイムアウト

シリアル通信の読み込みタイムアウトの指定を短くしないと、入力エリアの文字入力がスムーズにできなくなったりしました。

``` python
  ser = serial.Serial()
  ser.timeout = 0.01       # タイムアウトの時間(秒)
```
timeoutの指定は秒単位ですが、小数も指定できるようです。

