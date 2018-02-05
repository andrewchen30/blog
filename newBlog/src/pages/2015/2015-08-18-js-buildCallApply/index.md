---
title: JavaScript 綁定函數方式比較 - .bind() .apply() .call()
date: "2015-08-18 22:30:15"
path: "/js-buildCallApply/"
categories: Node.js
thumbnail: /images/notes/javascript_thumbnail.jpg
tags:
- Node.js
- JavaScript
- 學習筆記
- 教學

---

![javascript](/images/javascript.jpg)

JavaScript 在呼叫 Function 時，有三種方式可以改變其範疇，分別為 `.bind()`,`.call()`, `.apply()`, 而這三種又有些許的差異：

<!--more-->

#### function .bind()

.bind() 不會立即執行 function，並設定 `this` 範疇與傳入參數。傳入第一個參數是 scope，指定 function 內 `this` 的範疇。

``` js
func.bind( this, 1 ,2 ,3 ) ;   // 不會立即執行
```

#### function .call()

.call() 呼叫 function，並設定 `this` 範疇與傳入參數。傳入第一個參數是 scope，指定 function 內 `this` 的範疇。

``` js
func.call( this, 1 ,2 ,3 ) ;   // 逐一傳入參數 (立即執行)
```

#### function .apply()

.apply() 呼叫 function，並設定 `this` 範疇與傳入參數。傳入第一個參數是 scope，指定 function 內 `this` 的範疇。而參數是統一用一個陣列包起來，apply 會自行拆開傳入。


``` js
func.apply( this, [ 1, 2, 3 ] );  // 參數統一用 array 傳入 (立即執行)
```
