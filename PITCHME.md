### 【ハンズオン】Elixir/PhoenixでリアルタイムChatアプリを作ろう！
###  Elixir/Phoenixを使って、簡単にチャットアプリを作成しよう！

---

### 自己紹介

中原 拓哉

- 経歴
  - 金融系SIerでインフラエンジニアを6年
  - 今年3月よりバックエンドエンジニアとして転職
    - インフラ(ちょっと)〜サーバーサイド(メイン)
    - 最近、フロントでVue.jsを書いたり

- [Twitter @arakawa_gios](https://twitter.com/arakawa_gios) 

後日質問・指摘等あればこちらへどうぞ

---

### 所属

<img width=80% alt="スクリーンショット 2019-10-24 15 25 12" src="https://user-images.githubusercontent.com/38724804/67459049-9bacab80-f672-11e9-9158-74bfdd2470d2.png">

+++

<img width=80% alt="スクリーンショット 2019-10-24 15 27 59" src="https://user-images.githubusercontent.com/38724804/67459344-50df6380-f673-11e9-9734-20627d9c08d9.png">

- [TeckUp connpassページ](https://teckup-tokyo.connpass.com/h) 

---

### コミュニティでやってること

<img width=80% alt="スクリーンショット 2019-10-24 15 28 16" src="https://user-images.githubusercontent.com/38724804/67459375-66548d80-f673-11e9-9a67-7316d6c4e8d8.png">

+++

### LT会やります

<img width=80% alt="スクリーンショット 2019-10-24 15 30 49" src="https://user-images.githubusercontent.com/38724804/67459390-70768c00-f673-11e9-84b4-1b7e95be2d0e.png">

- [TeckUp！ LT大会#2 in 代々木](https://teckup-tokyo.connpass.com/event/151574/) 

---

### 今日やること
- 今日作るもの(5分)
- Elixir/Phoenixとは(10分)
- ハンズオン(50分)
- 質疑応答(20分)
- 懇親会(30分)

---

### 今日作るもの

- Elixir/Phoenixを使ったチャットアプリ
  - demoサイト　
  - https://chat-hands-on-demo.herokuapp.com/

---

### Elixir/Phoenixとは

---

### Elixirとは？

- ErlangのVM上(=EVM)で動く関数型言語
  - Erlangは並行性や耐障害性に優れ、ゲームなどでよく使われている
    - LINEの裏
    - Nintendo Switchのプッシュ通知システム
      - 1,000万台以上の同時接続と1日あたり約20億の通知をさばきながら、現時点まで一度もクラスタ全体の停止には至っていません。

<img width="100" alt="スクリーンショット 2019-10-24 15 59 54" src="https://user-images.githubusercontent.com/38724804/67461056-6ce50400-f677-11e9-8087-17d26d46f038.png">

+++

- [大規模ゲーム開発で存在感を高めるErlang/Elixir ─ Nintendo Switch™とロマサガRSの事例から](https://employment.en-japan.com/engineerhub/entry/2019/08/01/103000#%E3%81%9D%E3%82%82%E3%81%9D%E3%82%82ErlangElixir%E3%81%A8%E3%81%AF)

---

- RailsコミッターのJose Valimが開発しておりRubyっぽい(完全に見かけだけ)
  - Ruby:オブジェクト指向言語
  - Elixir:関数型言語

- [いま学ぶべき将来性のあるプログラミング言語9選 第6位](https://www.rankred.com/new-programming-languages-to-learn/)

---

### Phoenixとは？
- Elixir製のWebフレームワーク
  - Elixir/Phoenixの開発者が、Railsのcontributorであったため、Railsと似たような構成になっている。
  - MVCモデル

<img width="100" alt="スクリーンショット 2019-10-24 15 58 51" src="https://user-images.githubusercontent.com/38724804/67460924-327b6700-f677-11e9-8d36-0ba6135c640b.png">

+++

(補足)
- MVCモデル
  - 3つの要素ごとに役割が分かれている
    - Model(モデル):DBの管理
    - View(ビュー）:ユーザーへの画面表示
    - Controller(コントローラー):ユーザーのアクセス制御

<img width="150" alt="スクリーンショット 2019-10-24 16 02 04" src="https://user-images.githubusercontent.com/38724804/67461153-a74ea100-f677-11e9-886e-1d3dba60671d.png">

(参考)
- [画像で図解！サルでもわかるRailsにおけるMVC入門](https://www.yuta-u.com/programing/rails_mvc)

---

### ハンズオン

- スライドを元に実施していきますが、うまく動かない点や、気になる点があれば気にせず手をあげてご質問ください。

---

### インストール

- 公式ガイドを元にインストール
https://hexdocs.pm/phoenix/installation.html

### Elixirのインストール

```
$ brew update 
```

```
$ brew install elixir 
```

https://elixir-lang.org/install.html#macos

※home brewがない人はこちらでインストール
https://brew.sh/index_ja

---

### Phoenixのインストール

##### Elixirがインストールされていることを確認 
```
elixir -v
Erlang/OTP 19 [erts-8.3] [source] [64-bit] [smp:8:8] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Elixir 1.5.3
```

```
$ mix archive.install hex phx_new 1.4.10
```

---

### node.jsのインストール

HomebrewからDL

```
$ brew install nodebrew
$ nodebrew -v
```

```
$ nodebrew ls-remote
```

---

```
$ nodebrew install-binary v10.16.3
```
→安定板(偶数番号)の最新を選択してください


```
$ nodebrew ls
$ nodebrew use v10.16.3
```

+++

(参考)
https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09

HPからDL  
https://nodejs.org/en/download/

---

### プロジェクトの作成

---

### Phoenixを使って、大本となるアプリを作成

https://hexdocs.pm/phoenix/up_and_running.html

```
$ mix phx.new hello `--no-ecto`
```
- rails new などと同様のもの

- PhoenixはDB操作を行う際、主に`Ecto`と言うライブラリを利用しますが、今回はDBを利用しないため、`--no-ecto`オプションを付与してください

---

```
mix phx.new hello --no-ecto
* creating hello/config/config.exs
* creating hello/config/dev.exs
* creating hello/config/prod.exs
...
* creating hello/assets/static/images/phoenix.png
* creating hello/assets/static/favicon.ico

Fetch and install dependencies? [Yn] → 聞かれたらYを入力してエンター
```

---

### Phoenixサーバーの起動

```
$ cd hello
$ mix phx.server
or
$ iex -S mix phx.server
```

```
$ mix phx.server
[info] Running HelloWeb.Endpoint with cowboy 2.5.0 at http://localhost:4000

Webpack is watching the files…
...
```

- http://localhost:4000 
にアクセス！！

  - Phoenixのトップページにアクセス

---

### MVC FWについてざっと話す

#### Router

#### Contoroller

#### Template/View

---

### Chatアプリの作成

どのような機能を使ってリアルタイムChatを実現するのか？

#### WebSocket

通常のHTTP通信

・Request → Server → Response
・常時接続型


WebSocket

Channelを購読→イベントがあると購読している読者に通知

- 1. clientでイベントが発生
- 2. serverへメッセージ送信
- 3. serverは接続している全クライアントへメッセージ送信

---

### Chatアプリの作成

以下を参考にしながら作成
- https://hexdocs.pm/phoenix/channels.html

---

### endpointの設定

- lib/hello_web/endpoint.ex

/socketを有効にする

```
socket "/socket", HelloWeb.UserSocket,
  websocket: true,
  longpoll: false
```
→ デフォルトでこうなっているはずなのでそのまま。

---

### socketの設定

> lib/hello_web/channels/user_socket.ex

channelを有効にする　　

```
defmodule HelloWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "room:*", HelloWeb.RoomChannel  → コメントアウトを外す
```

→ トピックが"room:"で始まるメッセージをクライアントが送信するたびに、RoomChannelにルーティングされます。

---

### Channelの設定
クライアントからのイベント(着信と発信の両方向)を処理箇所

RoomChannelの設定をするために、以下のファイルを作成します。

- lib/hello_web/channels/room_channel.ex

```
defmodule HelloWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
```

---

### socket接続用のJS作成

クライアント(ブラウザ)とサーバーで通信するためのJavaScriptを作成していきます。

処理は以下のファイルで、デフォルトで用意されている。

- assets/js/socket.js

```
// assets/js/socket.js
// ...
socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("room:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
```

---

### socket接続用のJSの読み込み

- assets/js/socket.js

はどこから呼ぶかというと、

- assets/js/app.js

から呼ばれるようにします

※/hello/lib/hello_web/templates/layout/app.html.eex でassets/js/app.jsを実行

---

ファイルの下の方に

```
import socket from "./socket"
```

がコメントアウトされているのでこちらを外す

```
// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"  → // を削除
```

---

### テンプレート(HTML)に入力欄を記載

- ib/hello_web/templates/page/index.html.eex

まるっと全部削除して以下を記載

```
<div id="messages"></div>
<input id="chat-input" type="text"></input>
```

※名前入力する奴にする記載

---

### イベントリスナーを記載

- assets/js/socket.js

```
// Now that you are connected, you can join channels with a topic:
let channel           = socket.channel("room:lobby", {})  → "room:lobby"に書き換える
let chatInput         = document.querySelector("#chat-input") → ここから、
let messagesContainer = document.querySelector("#messages")

chatInput.addEventListener("keypress", event => {
  if(event.keyCode === 13){
    channel.push("new_msg", {body: chatInput.value})
    chatInput.value = ""
  }
})

channel.on("new_msg", payload => {
  let messageItem = document.createElement("li")
  messageItem.innerText = `[${Date()}] ${payload.body}`
  messagesContainer.appendChild(messageItem)
})                                                            → ここまで追加

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
```


コンソールログから、"Joined successfully"となっていることを確認

---

"new_msg" が実行されて受け取るイベントを記載

- /hello/lib/hello_web/channels/room_channel.ex

```
defmodule HelloWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do → ここから、
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end                                                    → ここまで
end
```

### 動かしてみる

ブラウザで
http://localhost:4000 を複数タブで表示

片方で投稿すると、もう片方でも通知できればOK！

+++

### ご清聴ありがとうございました

ご質問・ご指摘がありましたら、<br>[Twitter @arakawa_gios](https://twitter.com/arakawa_gios)までお願いします

LTスライド: https://gitpitch.com/DAdDY0055/supporterzcolab_phoenix_hands_on#/18
