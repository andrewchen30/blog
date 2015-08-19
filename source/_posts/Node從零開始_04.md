title: Part 4 - express 基礎操作
date: 2015-08-18 22:30:15
tags:
- Node.js
- Node.js 從零開始
- JavaScript
categories: Node.js 從零開始
comments: false
---

![Express](https://stormpath.com/images/blog/express-and-node-opengraph.png)

## 簡介

Express 是目前 Node.js 相當流行的框架之一，使用 Express 建立建立網頁伺服器節省掉了建置伺服器、解析請求資訊等等，相當方便，開發只需要專心資料處理的問題即可。

## 新增回應頁面

以下我們需要做幾件事情，由上而下是從最簡單的頁面，到可以放入自己想要的資料的頁面：

* 新增一個 express route 回應新頁面
* 用的 jade 模板製作新頁面
* 加入 nodemon 開發工具，加速開發
* 在頁面中放入動態的資訊
* 讓使用者可以只用 query string 動態修改頁面的變數

首先我們打開 `myApp/routes/index.js` ，檔案內容如下：

``` js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

檔案中，前兩行引入了 express 的模組，並且使用了模組裡面 router 的功能。router 顧名思義就是為這個網頁伺服器建立一個路由器，解析使用者的請求，並執行所對應到的工作或是回應正確的頁面。顯而易見的註解 `/* GET home page. */` 直接說明了些下來這段程式碼是用來回應使用者網站首頁。路由器中只有一個功能 `router.get( url, callback)`，即是當使用者輸入了路徑 `url` 的話，開始執行 `callback`。而 callback 中的 `res.render('index', { title: 'Express' });` 是用來回應正確的頁面，我在後面再做解釋。這邊先解釋 router 本身運作的原理。接著我們看到最後一行，`module.exports = router;` 將路由器輸出成模組，模組在 app.js 中被載入。

接下來就是 express 整個路由器運作的重點。

打開 app.js 中找到第 8 行和第 25 行，因為 express-generator 有可能有不同的更新版本，行號有可能不同，因此找到以下兩行為：

``` js
var routes = require('./routes/index');
app.use('/', routes);
```

因為這邊 `routes` 的命名會導致後續的解釋相當饒舌，先將它改成 `pages`，用 `pages` 來逐一理解狀況。

``` js
var pages = require('./routes/index');
app.use('/', pages);
```

前面是引入了檔案 index.js 將其儲存在 pages 的變數中，而其實 index.js 中的最後一行是 `module.exports = router;` 輸出了 `router` 作為模組，所以這邊 `pages` 是拿到了一個 `express.Router();` 的模組。換個角度說，在 index.js 中，從 express 的模組中取用了 `express.Router();` 的路由器模組，加入取得首頁的功能後並輸出成模組。在 app.js 中透過引入這麼模組拿到這個路由器的功能。

為什麼要搞得這麼複雜？如果網站較為複雜，有 50 個頁面時，如果將 50 種不同的路由行為通通寫在同一個檔案中，會相當混亂，拆分路由是 express 中很重要的事情，有助於整個伺服器的結構更清晰。

接著是 `app.use('/', pages);` 使用了 `pages` 剛剛載入的路由模組，而前面的 `/` 的意思是，在 pages 檔案中的路由，前面通通要接上 `/`。看看另一行更容易了解 express 的做法：`app.use('/users', users);`，載入了 `users` 這個模組，並且在前面通通接上 `/users`，即是區別 `users` 和 `pages` 這兩種操作。在設計時我們可以將針對不同對象的操作，分別放在不同的檔案中，並且在 app.js 載入時，給他們一個統一的路徑。並大幅簡化在該模組檔案中的路徑長度。

以目前的狀況來說，在 index.js 中回應 home page 的這個操作，`/` 代表的是root，即是沒有接任何其他路徑的意思。透過這個路徑我們就能進行對應的操作，而此路徑對應的操作就是返回一個 express-generator 預設的歡迎頁面，使用的路徑就是：

伺服器的位址 + app.js 賦予該模組的位址 + 該路由其需求的位址 = 實際發出請求的 url

`http://localhost` + `/` + `/`  => `http://localhost/`

舉例來說，我們可能有一個使用者登入/登出/個人檔案的頁面，那我們就可以寫成這樣，相當方便的歸類方式：

`http://localhost` + `/users` + `/login`  => `http://localhost/users/login`

`http://localhost` + `/users` + `/logout`  => `http://localhost/users/logout`

`http://localhost` + `/users` + `/profile`  => `http://localhost/users/profile`

接著我們複製並修改程式碼，讓我們能過過另一個路徑也能取得預設的首頁，在這之前可嘗試使用 `http://localhost/home` 送出請求，伺服器會回應 404 page not found。

``` js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page 2. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

在終端機按下 `ctrl + c` 中斷 Node.js server，並重新啟動 `node app.js`。接著就能透過 `http://localhost/home` 拿到預設頁面。

在開發 Node.js 實需要重新啟動才能讓新的程式碼重新載入生成伺服器，但是在開發時不斷的重啟伺服器相當麻煩。Node.js 中有相當多的輔助工具可以協助開發，依照目前的需求，推薦使用一套名為 nodemon 套件， `$ npm install nodemon -g` 即可使用 `$ nodemon app.js` 啟動伺服器，而 nodemon 會在伺服器的 Javascript 檔案儲存修改時，自動重新啟動伺服器，讓我們免去手動重啟。

除了 nodemon 之外，仍然有幾個相似的套件可以參考。以下兩者適用於產品發佈，個人覺得並不太適合開發時期。

* [Forever](https://github.com/foreverjs/forever)
* [PM2](https://github.com/Unitech/pm2)

接著我們新增一個屬於自己的頁面，express 並不是直接回應 html 的頁面，而是編譯模板後產生 html 頁面返還給使用者。預設使用模板是 [jade](http://jade-lang.com)，jade 寫起來真的非常漂亮簡潔，帶入參數時更是方便，唯一的缺點就是在編譯的過程並不如其他模板來得快，不過在目前的需求上差異並不大。另外知名的模板有 [ejs](http://www.embeddedjs.com) ，此教學先以 jade 作為範例。請在 `myApp/views/` 下面新增一個屬於自己的 `andrew.jade` 頁面。並在裡面寫上以下內容，如果要複製以下這段程式碼，請注意排版，排版是 jade 要命脈：

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Document
body
  h1 Hello world
  p express demo
```

學習 jade 直接看官方的 Github 文件即可，相當易懂且又是中文的。[Jade-Github](https://github.com/jadejs/jade/blob/master/Readme_zh-cn.md)，jade並沒有非常難，每次縮排就是代表 html 標籤的內部子元素，往下建立新的一層子元素的意思。這邊有幾個重點需要注意，屬於常犯的 jade 錯誤：

* jade 仰賴縮排編譯程式碼，因要完全正確的縮排與空白
* 前面的縮排需要統一，使用 `tab` 或 `2個空白` 或 `4個空白`，任一種，但一定要統一
* h1, p 內容之前，都有一個小空白，注意不要漏掉了

接著我們修改 `'/home'` 這個路由，讓我們能拿到我們自己新增的頁面。

``` js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET my page 2. */
router.get('/home', function(req, res, next) {
  res.render('andrew'); //andrew 為檔案名稱
});

module.exports = router;
```
`res.render('andrew');` 的功能及時回傳 `andrew` 這個頁面。express 會在 views 的資料夾中找到 `andrew.jade` 的頁面。接著就瀏覽器會顯示 h1 大小的 Hello World 和一般的 express demo，正確顯示的話就能進行到下一步。

接著我們要對這個頁面傳入參數，傳入的方式其實在取得 home page 的方式中已經多少有點提示：

``` js
/* GET my page 2. */
router.get('/home', function(req, res, next) {
  res.render('andrew', { name: 'Andrew Chen'} );
});
```

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Document
body
  h1= name
  p express demo
```

以 JOSN 的格式包裝資料，丟在第二個參數傳進去後可以直接使用對應變數名稱在 .jade 中打開，修改後的效果會顯示 h1 大小的 Andrew Chen 和一般的 express demo。當然 express demo 也可換成自己想要的字串。到目前為止的技術已經足夠創造一個基礎的靜態網頁伺服器了。

接著我們來說明如何從使用者端訊息到伺服器端，最簡易的傳送方式就是 `GET`，使用 query string 要傳送方式，將 url 改成 `http://localhost:3000/home?name=Andrew` 可以透過 query string 將 `Andrew` 這個字串傳送到伺服器端。在伺服器端承接 query string 的參數的方式為：

``` js
/* GET my page 2. */
router.get('/home', function(req, res, next) {
  var name = req.query.name; //取得queryString的資料
  res.render('andrew', { name: name}); // 再將 name 當成資料傳給 .jade
});
```

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Document
body
  h1= 'Hi! ' + name
  p express demo
```

`req` 在這邊代表 request，請求的意思。代表客戶端的請求，請求中的 `query` 所夾帶的 `name` 的參數。目前的畫面如下，除了字體很醜之外，沒什麼大問題了。

![目前成果](http://polarbearandrew.github.io/blog/img/nodeFormZero_2/node_3_1.png)

常用的資料傳遞操作的方式還有幾種，將會在下一章節撰寫 API 時逐一介紹。

## Express middleware

Express middleware 是用來撰寫每個網頁的請求都需要執行的功能，可以想像成 "中間人"，所有的 router 檢查時都會路過這個 function，而在執行這個 function 後會繼續檢查並尋找原先請求的路徑。直接看範例相當清楚：

``` js
var express = require('express');
var router = express.Router();

// I am middleware !
router.use( function(req, res, next){
  console.log('middleware in index.js');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET my page 2. */
router.get('/home', function(req, res, next) {
  res.render('andrew', { name: 'Andrew Chen' } ); //andrew 為檔案名稱
});
module.exports = router;
```

接著去看終端機中的 log，會發現 'middleware in index.js' 先被顯示出來，伺服器才回應這個頁面。Middleware 可以用來做實作登入檢查機制或是身任認證。例如使用到某些特定的功能，那在整個 router 下的操作都需要檢查，那可以先透過 middleware 先檢查後在執行。

那如果是一般的路由請求中使用 `next()` 這個操作，把自己當作中間人，下一個人會是誰？下一個是用來承接錯誤的 function，通常用來承接找尋不到指定頁面或是伺服器運算錯誤的狀況，就出現在 app.js 中。

``` js
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
```

這段程式碼就是在最終，如果上方所有的路由都找尋不到指定頁面，就會進入到這個 function，他會回覆使用者 404 not found 的訊息。

## header 設定問題

如果需要 Node.js 中設定 http header 的話，在 `app.use` 各種 router 之前補上這段，讓非本機的連線能獲得請求的許可。這種問題在日後較容易出現，因為連線的權限不足需要許可。

``` js
//set haeder
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
```

## 結語

express 擁有對絕大多數網頁伺服器所需要的操作，大幅了簡化開發的難度，上述的 query string 和 router 完全不需要擔心操作請求字串的解析，輕鬆的就能取得參數和回傳頁面，透過這些基礎的功能，就能建立起一個簡易的網頁伺服器。善用 express 模組能撰寫自己的 API 與資料庫連線，就學會一套相當完整的網頁伺服器。
