title: Part 6 - express 進階運用 (2)
date: 2015-08-25 10:40:36
tags:
- Node.js
- Node.js 從零開始
- JavaScript
categories: Node.js 從零開始
comments: false
---

![Express](https://stormpath.com/images/blog/express-and-node-opengraph.png)

## 前言

API 有各種需求，為了因應這些需求，API 能使用的操作也不是回應資料這麼簡單，接著介紹常用的 Express API 操作，透過這些操作基本上能應付絕大多數的需求。包含規劃 RESTful API，回應各種使用者操作，回應各種 bug，或是一些簡單的安全技巧。

## 各種資料接收的方式

先前提過的是 `res.query.data` 可以取得 queryString 的值，這邊介紹另外兩種

如果是用 post 傳入的 data，如下：

``` js 
$.ajax({
	type: 'POST',
	url: 'http://localhost:8080/login/',
	data: { account: 'admin', pwd: '123' }

	//取得資料成功觸發
	success: function(result){
		$('#show').append('Hi !' + result.name);
	},

	//失敗顯示 error
	fail: function(err){
		console.log('出現錯誤', err);
		$('#show').append('找不到使用者資料')
	}
  })
```

想要取得 data 傳送過來的資料相當簡單，運用 `this.body.params`：

```
router.get('/login', function(req, res, next) {

  var account = this.body.account;

  if( this.body.pwd === '123'){

    var data = { name: account, auth: 15 };
    res.json(data);

  }else{
    // login fail ...
  }

});
```

另外一種是取得 url 傳遞的參數，這種就偏向 RESTful APi 的使用方式，直接看範例：

``` js
router.get('/home/:lan', function(req, res, next) {

  if( this.params.lan === 'zh-TW' )
    res.render('home', data['zh-TW']);
  else
    res.render('home', data.en);
});
```

這個範例中讓 `http://localhost:3000/home/zh-TW` 能取得中文的首頁，其餘取得英文的首頁。這跟 QueryString 不同的是，他並不會寫一個很醜的 `?` 在後面，而是直接用路徑就可以傳遞參數，但需要注意的事情是：

`/home/:lan` 和 `/home`

是不同的，意即如果 `/home` 沒有接其他路徑，是會找不到頁面的，在規劃 Express Router 時需要多注意的地方。


## return

善用 return 來結束 API，同一支 API 不能回應兩次。也就是說 `res` 不能使用兩次，使用到第二次的時候 Node.js 就會出現錯誤。但 `res.json` 或是 `res.render` 等等操作，其實並不具備結束的功能。

``` js
router.get('/getName', function(req, res, next) {

  var data = { name: 'Andrew Chen' };
  res.json( data );
  res.json( data );
});
```

![Node.js 回報的錯誤](http://polarbearandrew.github.io/blog/img/nodeFormZero_2/node_4_4.png)

當然直接 `res.json( data );` 寫兩次的這個錯誤不太容易發生，實際上容易發生的情況為：


``` js
router.get('/getName', function(req, res, next) {

  var data = { name: 'Andrew Chen', auth: 15 };

  if( data.auth >= 10){
    res.json( data );
  }

  res.json( data );
});
```

有可能針對要回應(從資料庫裡撈出來的)的資料進行一些小檢查，用 if 做了簡單的判斷，往往在複雜的操作過後，會忘記最後面還有一個無論如何都會執行的 `res.json(data);`。因此在撰寫習慣下，建議在每個操作的末端，都補上 `return`。確保 API 的 function 有結束

``` js
router.get('/getName', function(req, res, next) {

  var data = { name: 'Andrew Chen', auth: 15 };

  if( data.auth >= 10){
    return res.json( data );
  }

  return res.json( data );
});
```

## http status code

從 API 中設定 http 的狀態碼，只需要使用 `res.status(200)`，替換數字即可，讓我們可以明確的操作這些狀態。使用在後面會有介紹。

## Express 常用操作

以下為四種常用到的操作：

``` js
res.render('index', data); //回應頁面

res.json( data );   		//回應 JSON 格式的資料

res.send( data );			//回應各種資料，可以回應字串

res.status(204).end();		//無聲的回應
```

需要解釋的是最後一種 "無聲的回應"。http code 204 是回應使用 “已經收到訊息，但要有任何動作”，也就是使用者端會感覺什麼事情都沒有發生，ajax 也不會觸發任何 success 或 fail 的操作。那 `.end()` 是透過 Express 發送 API 結束訊號，單純撰寫 `res.status(204)` 也可以，但並不會回傳任何訊息，ajax 的請求就會進入乾等，等到拋出遇時錯誤。因此透過 `.end()` 的操作讓 API 在無操作時明確的結束。

關於 status 204 的這種操作，感謝 [Dca](https://www.facebook.com/dca.hsu?fref=ts) 的教導。

## 回應錯誤

回應錯誤有兩種方式：

因為避免使用者看到太多不相干的資訊可以直接用 404 查無頁面回應使用者，這樣確保使用者不會發現我們的 code 有 bug。

``` js
res.status(404).end();
```

不過在 Express 中有另外更美的解決手段，透過 Middleware 去讀取 Express 預設的 404 page，只要啟用 Middleware 的 `next()` 即可。

``` js
router.get('/login', function(req, res, next) {
  var err = { msg: '登入錯誤' }
  return next(err);
});
```

這邊的 err 僅僅是個範例，有可能是我們從其他模組承接過來的 err，我們只要直接塞到下一個操作中，將自己想像成 Middleware 即可。加上return 同樣是確保結束。


## 結語

綜合以上的操作，可以開始規劃 Express Router，以下是我在其中一個專案中規劃的，僅供參考，大致上是後台管理系統對使用者資料的操作：

新增使用者資料		`[POST] /user/`
取得所有使用者資料 	`[GET] /user/`
取得幾筆使用者資料 	`[GET] /user/:count`
刪除使用者			`[DELETE] /user/`
修改使用者			`[PUT] /user`

但在規劃上並沒有絕對強制的用法，主要是看團隊習慣或是主流文化。在不同的情況下嘗試使用 RESTful API 下去規劃，我個人就在規畫初期撞到好幾次錯誤，起出認為的功能和前端街口會產生誤會，例如 "取得幾筆使用者資料 	`[GET] /user/:count`" 這種操作就引人遐想，`:count` 是指第幾比到第幾比，或是一次抓幾筆，甚至是使用者編號？因此 params 的正確命名並且和前端良好的溝通是維持整機制運作的重點。如果是全端開發，也要注意正確的語意，別在後期開發自己雷到自己。