title: JavaScript - .bind() .apply() .call()
date: 2015-08-18 22:30:15
tags:
- JavaScript
categories: JavaScript
comments: false
---

func.bind( null, 1 ,2 ,3 ) ;   // 不會立即執行

func.apply( null, [ 1, 2, 3 ] );  // 傳入 array (立即執行)

func.call( null, 1, 2, 3 ); // 逐一傳入 (立即執行)