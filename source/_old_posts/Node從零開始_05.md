title: Part 5 - express 進階運用
date: 2015-08-25 09:21:00
tags:
- Node.js
- Node.js 從零開始
- JavaScript
categories: Node.js 從零開始
comments: false
---

![Express](https://stormpath.com/images/blog/express-and-node-opengraph.png)

## 簡介

前一篇介紹過模板 Jade 的基本操作，並且透過 Express 朝 Jade 傳遞資料，在學習連接並操作 DB 之前，先來了解如何撰寫回應資料的 API，在撰寫 API 之前要來談談 RESTful api 這件事情，了解如何撰寫、規劃好的 API 架構。

有趣的事情是，RESTful API 指的是一種規劃 API 的方式，嚴格來說也不一定要遵守，看看外國網站 [nodeframework](http://nodeframework.com) 的對 Express 框架的分類，相當有趣的事情是被分類到 MVC 架構中的，不過主因是 Express 主要仰賴模板來結合資料與畫面。但再次說明，RESTful API 是一種規劃 API 的觀念與方式，因此我們仍然能在 Express 框架下撰寫 RESTful API。

這樣是不是緣木求魚呢？

並不是的，除非只想製作單純顯示資料的網頁，也就是單向從伺服器向使用者回應資料，那並不需要 API 規劃，把頁面跟 router 規劃好即可。但往往只要稍多的 API 資料操作，就容易造成整個 router 的混亂。因此撰寫 RESTful API 就像物件導向一樣，是一種好習慣，明沒有所謂的 MVC 架構下就沒有 RESTful API 的觀念。

對於 RESTful API 的討論推薦參考 [Amigo 陳兆祥](http://www.slideshare.net/AmigoChan?utm_campaign=profiletracking&utm_medium=sssite&utm_source=ssslideview) 前輩的 [slide](http://www.slideshare.net/AmigoChan/restful-api-design) 裡面觀念講解的相當詳細。

## 撰寫自己的 API

API 很難嗎？不會的，超簡單。其實大家早就會了。

這是原先回應網頁給使用者的方式。

``` js
router.get('/home', function(req, res, next) {
  res.render('andrew', { name: 'Andrew Chen' } ); 
});
```

改成這樣就能回應資料了，這次回應的資料是 JSON，包裝 name 這個資料

``` js
router.get('/getName', function(req, res, next) {
  res.json({ name: 'Andrew Chen' });
});
```

相當易懂，使用 `localhost:3000/home` 就能拿到 `{ name: 'Andrew Chen' }` 這筆資料了。

![回應資料狀況](http://polarbearandrew.github.io/blog/img/nodeFormZero_2/node_4_1.png)

但這樣並不符合需求，我們改變取得資料的方式。建立一個新的 .html 檔案。當然這個頁面以可以用 jade 撰寫，不過為了表示使用 API 並不需要是從伺服器產生的頁面，我們另外開一個。

``` html 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RESTful AIP</title>

  <!-- jQuery CDN -->
  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>

  <script>

  // ajax 操作
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/getName/',

    //取得資料成功觸發
    success: function(data){
      console.log('取得資料', data);
    },

    //失敗顯示 error
    fail: function(err){
      console.log('出現錯誤', err);
    }
  })
  </script>

</head>
<body>

  <!-- 使用者看到的畫面 -->
  <h1> API DEMO 頁面</h1>

</body>
</html>
```

接著啟動這個頁面，就會看到在前一篇題過的 XMLHttpRequest 錯誤，這個錯誤並沒有相當大，僅僅是 server 沒有給予 ajax 操作的權限而已。

![XMLHttpRequest 錯誤訊息](http://polarbearandrew.github.io/blog/img/nodeFormZero_2/node_4_2.png)

解決方式如下

### header 設定問題

如果需要 Node.js 中設定 http header 的話，在 `app.use` 各種 router 之前補上這段，讓非本機的連線能獲得請求的許可。這種問題在日後較容易出現，因為連線的權限不足需要許可。記得是在 `app.use` 各種 router 之前補上這段，補在之後是沒有用的。

``` js
//set haeder
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
```

接著就能看到 ajax 成功的取得資料。

![完成的成果](http://polarbearandrew.github.io/blog/img/nodeFormZero_2/node_4_3.png)

這種非同步的資料讀取方式，可以運用在很多不同的地方，舉例來說：

* Google 瀏覽器的輸入建議
* 在列表中進一步展開的詳細資訊
* 類似 Facebook 的聊天視窗

這些都是類似 ajax 的操作，當然類似功能的有 `request`、`fetch` 這些其他的功能會在日後提到，有興趣的朋友可去看看 `fetch`，最近相當火紅。稍微修改一下測試用的 html，簡易的 demo 一下 ajax 的運作狀況。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RESTful AIP</title>

  <!-- jQuery CDN -->
  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>

  <script>

  $('html, body').on('click', '#btn', function(){

    // ajax 操作
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/getName/',

      //取得資料成功觸發
      success: function(data){
        console.log('取得資料', data);
        $('#show').append('Hi !' + data.name);
      },

      //失敗顯示 error
      fail: function(err){
        console.log('出現錯誤', err);
        $('#show').append('找不到使用者資料')
      }
    })
  });
  </script>

</head>
<body>

  <!-- 使用者看到的畫面 -->
  <h1> API DEMO 頁面</h1>
  <button id="btn">取得資料</button>
  <hr/>
  <div id="show"></div>

</body>
</html>
```

## 結語

API 是使用者端跟伺服器溝通或取得資料的一種方式，下篇會介紹 Express 中的 RESTful API 操作，和各種傳遞資料的方式。

如果測試 API 時每次都要撰寫新的 html 相當麻煩。有兩種解決方式，一是撰寫測試程式碼，二是用 GUI 工具 [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)，我個人推薦使用 Postman 先度過還不會寫測試的階段。

## 參考資料

* [Express](http://expressjs.com)
* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
* [XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest)