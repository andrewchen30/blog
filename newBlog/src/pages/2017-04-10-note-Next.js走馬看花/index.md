---
title: Next.js 2 走馬看花
date: "2017-04-10 20:52:00"
path: "/note-Next.js走馬看花/"
categories: 做個筆記怕忘記
thumbnail: /images/notes/nextJs_thumbnail.jpg
tags:
- 程式設計
- 重點筆記
- 心得分享
---

這幾天 Next.js 2 在台灣的技術圈洗了一輪版，讓我們花一點點時間快速看看 Next.js 到底在做什麼。

![Next.js](/images/notes/nextJs.jpg)

[Next.js Github](https://github.com/zeit/next.js/)

Next 算是對一般網站使用 React 高成本問題提出了解決方案，明確地簡化了環境建置和最基本的 routing。如果使用 Next 內建的 routing 機制，吃 `./pages` 資料夾中的檔案決定 router 時， 開發者能對  router 動得手腳就相對有限，（在 demo 中看到的，大部分需求應該都沒問題 的），但 Next 中仍然有相當的彈性能導入其他 routing 的框架，所以對於延展性的需求是無庸置疑的，而且官方有佛心的提供大量與其他框架結合的範例。

# 重點 

1. 打包了大部分 React server rendering 基本會用到的 package
1. `npm run xxx` 就建置完成了，webpack 什麼的都省了
1. Next 包 babel, webpack進去, 包了很多東西就對了
1. Next 直接實作了 server rendering, 這點大概就是 Next 最大的價值, 包括有針對 <head> 做一套對應的機制
1. 因為實作了 server rendering, Next 中有自己的撰寫風格, 有一個 getInitialProps 的 func，且 getInitialProps 是 async function
1. Next 裡面寫的 code 基本上就是 react code，他並不是一個全新的框架，因此學習成本是有限的。
1. 通常這種好棒棒的工具都有很肥的問題, Next 官方表示沒有, client 只會有 65kb 負擔 ( 因為是 server rendering, 肥的是 server 端 )
1. Next 彈性還是相當大的, graphQL, express, koa, typescript, reduxt 想跟誰結婚就跟誰結婚

<!-- more -->

******

# 快速起手

### 透過 npm 安裝 next.js 以及 react

``` bat
npm install next react react-dom --save
```

### 初始化 package.json

``` bat
npm init
```

在 package.json 中的 `scripts` 中加上對應的指令

``` json
{
    "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    },
}
```

### 建立資料夾結構

``` bat
.
├── node_modules/
├── pages/
├── static/
├── package.json
```

* `./pages/` Next 會針對這個資料夾做路由，每個檔案都是一個獨立的頁面，舉例來說有 `home.js` 和 `about.js` 兩個檔案，那 Next 就會自動導出 `http://{hostname}/home` 和 `http://{hostname}/about` 這兩個頁面出來，而這個頁面對於 Next 又有一些細節要注意，這個會在後面說到。
* `./static/` 很直觀的就是靜態檔案的放置資料夾，透過 `/static/{filename}` 可以直接在前端使用檔案。

### 新增第一個頁面檔案

官方給的範例是這個

``` javascript
export default () => (
  <div>Welcome to next.js!</div>
)
```

### 啟動 server

``` bat
npm run dev
```

前往 [http://localhost:3000](http://localhost:3000) 就可以看到最基礎的建置成果了。

**********