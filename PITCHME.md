# 【ハンズオン】Elixir/PhoenixでリアルタイムChatアプリを作ろう！
## Elixir/Phoenixを使って、簡単にチャットアプリを作成しよう！

---

### 自己紹介

中原 拓哉

経歴
- 金融系SIerでインフラエンジニアを6年
- 今年3月よりバックエンドエンジニアとして転職
  - インフラ(ちょっと)〜サーバーサイド(メイン)
  - 最近、フロントでVue.jsを書いたり

---

### 今日やること

- Elixir/Phoenixを使ったチャットアプリの作成

demoサイト　
　

demoサイトのURLはる

---

### Elixir/Phoenixとは

- ErlangのVM上(=EVM)で動く関数型言語
  - Erlangは並行性や耐障害性に優れ、ゲームなどでよく使われている
  - LINEでも使われている
  - Nintendo Switchのプッシュ通知システム
    - 最大想定で1億接続のスケーラビリティを、最大でも数秒の遅延で達成する
    - 1,000万台以上の同時接続と1日あたり約20億の通知をさばきながら、現時点まで一度もクラスタ全体の停止には至っていません。

> https://employment.en-japan.com/engineerhub/entry/2019/08/01/103000#%E3%81%9D%E3%82%82%E3%81%9D%E3%82%82ErlangElixir%E3%81%A8%E3%81%AF

　→ オブジェクト思考と、関数型の違い

- RailsコミッターのJose Valimが開発ておりRubyっぽい(完全に見かけだけ)

- いま学ぶべき将来性のあるプログラミング言語9選  第6位

> https://www.rankred.com/new-programming-languages-to-learn/


---

### ハンズオン・やってみる

---

### インストール
> https://hexdocs.pm/phoenix/installation.html

#### Elixirのインストール

$ brew update 

$ brew install elixir 

> https://elixir-lang.org/install.html#macos

※home brewがない人はインストール
> https://brew.sh/index_ja

---

#### Phoenixのインストール

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

#### node.jsのインストール

HomebrewからDL

```
$ brew install nodebrew
$ nodebrew -v
```

```
$ nodebrew ls-remote
```

```
$ nodebrew install-binary v10.16.3
```
→安定板(偶数番号)の最新を選択してください


```
$ nodebrew ls
$ nodebrew use v10.16.3
```

(参考)
> https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09

HPからDL  
> https://nodejs.org/en/download/


---

### プロジェクトの作成


---

### Phoenixを使って、大本となるアプリを作成

> https://hexdocs.pm/phoenix/up_and_running.html

```
$ mix phx.new hello `--no-ecto`
```

　→ rails new などと同じ

>　→ PhoenixはDB操作を行う際、主に`Ecto`と言うライブラリを利用しますが、今回はDBを利用しないため、`--no-ecto`オプションを付与してください


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

> http://localhost:4000 
にアクセス！！

→ Phoenixのトップページにアクセス

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

>1. clientでイベントが発生
>2. serverへメッセージ送信
>3. serverは接続している全クライアントへメッセージ送信

---

### Chatアプリの作成

以下を参考にしながら作成
> https://hexdocs.pm/phoenix/channels.html

---

### endpointの設定

> lib/hello_web/endpoint.ex

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

> lib/hello_web/channels/room_channel.ex

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

> assets/js/socket.js

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

> assets/js/socket.js

はどこから呼ぶかというと、

> assets/js/app.js

から呼ばれるようにします

※/hello/lib/hello_web/templates/layout/app.html.eex でassets/js/app.jsを実行

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

> ib/hello_web/templates/page/index.html.eex

まるっと全部削除して以下を記載

```
<div id="messages"></div>
<input id="chat-input" type="text"></input>
```

※名前入力する奴にする記載

---

### イベントリスナーを記載

> assets/js/socket.js

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

>/hello/lib/hello_web/channels/room_channel.ex

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
