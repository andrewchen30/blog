---
title: 建立自己的 Telegram ChatBot
date: "2017-02-18 10:25:35"
path: "/note-建立自己的TelegramBot/"
categories: 做個筆記怕忘記
thumbnail: /images/notes/TelegramChatBot/createTelegramBot_thumbnail.jpg
tags:
- 程式設計
- 重點筆記
- TelegramBot
- ChatBot
- Telegram
- Node.js 
- telegraf.js
---

![建立自己的 Telegram ChatBot](/images/notes/TelegramChatBot/createTelegramBot.jpg)

* 申請 TelegramBot 的帳號
* 透過 Node/telegraf.js 撰寫 ChatBot

# 申請 TelegramBot 的帳號

### 1.透過 `@BotFather` 申請

在 Telegram APP 中找到 `@BotFather` 這個官方的 BOT：

<!--more-->

![@BotFather](/images/notes/TelegramChatBot/BotFather.jpg)

開始跟 `@BotFather` 對話，按下 start 之後會出現簡易的功能列表：

![按下 Start 開始](/images/notes/TelegramChatBot/start.jpg)

選擇 `/newbot`：

首先 `@BotFather` 會詢問 bot 的名稱和使用者名稱，首先詢問的名稱就是一般聊天視窗上方看到的名稱，而使用者名稱是在搜尋時會出現的名稱。Telegram 針對 ChatBot 規範：必須使用 `_bot` 做為結尾，舉例來說我選擇了 `AC` 當名稱，而使用者名稱則是 `AC_bot`，如果 `@BotFather` 回答 "Sorry, this username is already tacken." 代表已經有人註冊該使用者名稱，請嘗試取其他的名字。

![設定名稱](/images/notes/TelegramChatBot/newBot.jpg)

基本設定完成，`@BotFather`。基本設定完成之後，在 `@BotFather` 回覆的長長的訊息中，有兩個重點：第一個是 `t.me/<剛剛取的使用者名稱>` 的 ChatBot 聊天鏈結，和一個 `HTTP API token`， token 大致上長這樣：`2345162:DFAGSsfd2312LK2JDAL_ASL23L5KJ`，由 `數字` + `：` + `英文數字` 所組成，這組 token 相當重要，是建立 ChatBot 最重要的東西，同時請注意不要外流。

# 2.測試 Token

接著我們測試 Token 是否已經開始運作。透過 HTTP 請求即可完成。將下述網址中的 `{ChatBot token}` 更換成剛剛從 `@BotFather` 那邊拿到的 token 即可。

``` 
https://api.telegram.org/bot{ChatBot token}/getMe
```

接著就會看到驗證成功的訊息：

``` js
{
    ok: true,
    result: {
        id: 324237649,
        first_name: "AC",
        username: "ACkeeper_bot"
    }
}
```

接著我們就可以繼續往下建置 ChatBot 核心的 Bot 的部分。

# 3.Node.js 建立 Bot server

其實也有其他的第三方服務可以串接 ChatBot，諸如：[chatfuel](https://chatfuel.com/create-chatbot-for-telegram)，但如果你跟我一樣有比較客製化的分析需求，或是想要串接自己的 DB 等狀況，自建 Node.js Bot server 是一個比較方便的選擇。

Node.js 中使用的套件是：[telegraf.js](https://github.com/telegraf/telegraf)，官方推薦，支援最完整的套件。`telegraf.js` 自己官方是號稱Telegram Chat API 有 100% 支援："Full Telegram Bot API support"。 

![telegraf](http://telegraf.js.org/header.png)

安裝 telegraf.js。這邊需要注意的是 Node.js 的版本，`telegraf` 所要求的版本為 `>=6.2.0`，而我在開發時使用的事 `v6.9.5`。

``` bat
$ npm install telegraf --save
```

這個是 `telegraf` 的基本範例：

`process.env.BOT_TOKEN` 要更換成從 `@BotFather` 那邊取得的 token，或是執行 Node 前透過全域變數先設定好，如果你的專案有放在 Github 上的話，這邊請注 token 寫在當案中時，不要順手的就 commit push，這樣 token 就外流了！事後可能造成不必要的麻煩。基本的範例功能非常簡單：

* 一開始進入會說："Welcome!"
* 說："hi"，會回覆："hey there!"
* 傳送貼圖，會回覆："👍"

``` js
const Telegraf = require('telegraf')

const app = new Telegraf(process.env.BOT_TOKEN)

app.command('start', (ctx) => {
  console.log('start', ctx.from)
  ctx.reply('Welcome!')
})

app.hears('hi', (ctx) => ctx.reply('Hey there!'))

app.on('sticker', (ctx) => ctx.reply('👍'))

app.startPolling()
```

# 測試結果

這樣就完成了初步的 Telegram ChatBot 基本建置。測試結果如下：

![hi!](/images/notes/TelegramChatBot/hi.jpg)

另外是在與自己的 ChatBot 連線時，可以獲得 `ChatID`，這個在之後的操作會相當常用到。上方程式碼第 6 行的， `console.log('start', ctx.from)` 所輸出的資料：

``` js
start { 
    id: 123123123,
    first_name: 'Andrew',
    last_name: 'Chen',
    username: 'AndrewChenTW'
}
```

*****

# 參考文件

* [Telegram Bot revolution](https://telegram.org/blog/bot-revolution)
* [telegraf.js](http://telegraf.js.org)