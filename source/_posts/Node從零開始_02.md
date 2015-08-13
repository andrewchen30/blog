title: Part 2 - 簡介與安裝
date: 2015-08-12 21:04:24
tags:
- Node.js
- Node.js 從零開始
- JavaScript
categories: Node.js 從零開始
comments: false
---

### Node.js 從零開始

![Node.js](http://lamb-mei.com/wp-content/uploads/2014/09/nodejs-1024x768-1.png)

## Node.js 簡介

簡單理解 Node.js 就是寫在伺服器端的 JavaScript，單純以網頁伺服器而言，其實並沒有相當複雜只要處理幾件事情：

* 解析 Client 提出的請求
* 去跟資料庫要資料
* 對資料做一些處理：檢查、篩選等商業邏輯
* 回應對應的資料給 Client

基於出次學習，先用最簡單的方式建立 Node.js http server，細節在日後在逐一去了解即可，首要目標是建立一個網頁伺服器。我們透過 Node.js 框架 [Express]() 來建立第一個網站伺服器。Express 是目前相當容易學習的框架之一。

我使用 NPM (Node Package Manager) 來安裝 Node.js 的框架與套件，NVM 跟 NPM 是相當不同的輔助管理工具：

* NVM：安裝/管理不同版本的 Node.js 
* NPM：安裝/管理各種 Node.js 的套件

NPM 會比 NVM 還頻繁的出現，NPM的細節會在下一章節進行介紹，現在我們的目標事件起 Node.js http server。

首先在電腦中找個習慣的地方建置一個資料夾，在資料夾下透過 NPM 指令安裝 express 簡易的架構產生器：

```bat
$ npm install -g express-generator
$ sudo npm install -g express-generator
```

某些情況下需要系統管理員的權限才能 `npm install`，單純只是因為建立資料夾的地方權限不足而已，如果權限不足會噴出很明顯的錯誤訊息(error message)：無法建立資料夾。

接著透過產生器提供的指令，產生出整個專案的基礎架構，日後也可以使用產生器產生伺服器基礎的架構，再去修改或補足想要的其它套件。

```bat
$ express myApp
```

馬上馬出基本結構建立的結果的訊息

```bat
$ express myApp

   create : myApp
   create : myApp/package.json
   create : myApp/app.js
   create : myApp/public
   create : myApp/public/javascripts
   create : myApp/public/images
   create : myApp/public/stylesheets
   create : myApp/public/stylesheets/style.css
   create : myApp/routes
   create : myApp/routes/index.js
   create : myApp/routes/users.js
   create : myApp/views
   create : myApp/views/index.jade
   create : myApp/views/layout.jade
   create : myApp/views/error.jade
   create : myApp/bin
   create : myApp/bin/www

   install dependencies:
     $ cd myApp && npm install

   run the app:
     $ DEBUG=myApp:* ./bin/www

```

此操作是建立基本的 Node.js http server 的框架，接著是進入到伺服器的資料夾內，將相依性的套件安裝起來。可以理解成汽車的結構幾乎都完成了，現在只要打開引擎蓋把引擎放進去。

進入伺服器的資料夾，myApp 是剛剛自動產生時所使用的名稱，可以隨專案需求更換。進入後直接用 NPM 指令安裝整個套件

```bat
$ cd myApp
$ npm install
```

`npm install` 這個指令是安裝此專案目錄下需要的相依性套件，NPM 會很聰明地把需要安裝的套件通通下載下來自動安裝，包括對應的版本也會正確地抓取，`npm install` 的細節會再下一篇教學中解說。初始化的 `npm install` 需要一些時間，與需要安裝的套件數量成正比，稍作等帶後即可看到長長一串的安裝清單，沒有錯誤訊息的話即可繼續往下。

用任何習慣使用的程式編輯器打開 `myApp` 之下的 `app.js`， `app.js` 是整個 server 的啟動檔案，express-generator相當完整將我們基本需要的程式碼 99% 都寫完了，只需要在最後方補上 server 監聽 port 的動作。在檔案尾端找到 `module.exports = app;` 將以下程式補在該行之前：

```js
app.listen(3000, function(){
    console.log('server started -> http://localhost:3000');
});

module.exports = app; //原先就有這行
```

或是我個人認為比較漂亮的寫法，port的值可能是從其他設定檔中抓取。

```js
var port = 3000; //值可能是從其他設定檔中抓取

app.listen(port, function(){
    console.log('listening -> http://localhost:' + port);
});

module.exports = app; //原先就有這行
```

確認補上上方這段程式碼後，接著回到終端幾啟動伺服器。在 `myApp` 的資料夾內輸入啟動指令：
( 使用 Node.js 啟動 app.js )

```
$ node app.js
```

啟動後再終端幾內會看到類似的畫面：

![$ node app.js]()

然後在瀏覽器的網址列輸入[http://localhost:3000](http://localhost:3000)即可看到 express-generator 自動產生的歡迎頁面！

![Express welcome page]()

## 結語

express-generator 使用名為 express 的框架建置最基本的網站伺服器架構，建置完架構後可以再手動進行修改以符合個人習慣或專案需求。 express 是目前 Node.js 套件中優秀好用的框架之一，之後的 **Node.js 從零開始** 的教程會使用 express 做為主軸，完成之後會進一步撰寫有關 Koa.js 的文章。


## 參考資料
