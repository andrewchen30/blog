title: Console 使用技巧
date: 2017-06-01 15:34:00
categories: 做個筆記怕忘記
thumbnail: /images/notes/javascript_thumbnail.jpg
tags:
- 學習筆記
- javascript
- frontend

---

在一陣忙碌之後終於又有時間能靜下來寫篇 Blog 的文章，這次筆記的重點是 Front-end 開發時能時常使用的 console.log() 這個 API。

# 最基本的 `console.log()` 使用

基本的兩種輸出方式, 第一種的使用重點是 `console.log` 本身可以傳入複數個參數，之後會自動一併顯示。第二種寫法是更好更清楚的寫法，而 console.log 的 string formatter 基本上是跟 C++ 中的 printf 相同的用法。而需要注意的是 `%s` 這個欄位並沒有辦法直接印出 array 或是 json 資料格式對應的字串，會印出該資料的結構是哪種而已，如果想要印出 json 字串仍然需要自己進行 `JSON.stringify` 的操作。

``` js 
var a = 1;
var b = 2;
var data = { c: 3, d: 4, };
var arr = [1, 2, 3, ];

// #1 
// a = 1 , b = 2
console.log('a =', a, ', b =', b);

// #2 
// a = 1, b = 2
console.log('a = %s, b = %s', a, b);

// %s with JSON
// data = Object
console.log('data = %s', data); 

// %s with Array
// arr = Array(3)
console.log('arr = %s', arr);

```

基本上上述的部分應該沒什麼大的問題，多用幾次就會抓到自己的習慣了，也沒有什麼絕對正確的操作方式。同時 `console.log` 這個 API 是可以操作顏色的，在 Node.js Console 中為輸出的文字添加顏色的方式跟 `\n` 換行符號的概念是一樣的，而顏色的概念是 `切換輸出顏色`，意即當你切換成紅色時，之後輸出的結果就都是紅色，要透過重置或是切換成其他顏色才會改變。而 Chrome 的方式則與 Web 相似

``` js 
// Chrome 
console.log('%c %s', 'background: #222; color: Red;', 'background is black and font color is red');

// Node.js
console.log('\x1b[31m %s', 'this is color red');
```

#### Node.js console 顏色對照表

[參考資料](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)

顏色 | 程式碼 | 
---- | ---- |
重置 | "\x1b[0m"
明亮 | "\x1b[1m"
Dim | "\x1b[2m"
下底線 | "\x1b[4m"
閃爍 | "\x1b[5m"
反轉 | "\x1b[7m"
隱藏 | "\x1b[8m"
文字顏色 | -----
Black | "\x1b[30m"
Red | "\x1b[31m"
Green | "\x1b[32m"
Yellow | "\x1b[33m"
Blue | "\x1b[34m"
Magenta | "\x1b[35m"
Cyan | "\x1b[36m"
White | "\x1b[37m"
背景顏色 | -----
Black | "\x1b[40m"
Red | "\x1b[41m"
Green | "\x1b[42m"
Yellow | "\x1b[43m"
Blue | "\x1b[44m"
Magenta | "\x1b[45m"
Cyan | "\x1b[46m"
White | "\x1b[47m"


以上部分在 Node.js 和 Browser 中是雷同的，而 Browser console 的部分可能因為不同的瀏覽器不同而無法產生想要的結果，不過大致上是可以視為相同的邏輯與概念。

# `console.dir()`

`console.dir` 跟 `console.log` 最大的差別在於， `console.dir` 主要適用於顯示物件，會顯示物件中詳細的每個屬性及 prototype 的資訊。嘗試在 Chrome 中輸入下列兩種指令就會看到基本的差異。

``` js 
// 一般常用
console.log([1, 2])

// 更進階一點的使用
console.dir([1, 2])
```

當然一開始會覺得其實現在 Chrome 的 `console.log` 也能展開物件中對應的資訊了，感覺差異不大。那嘗試一下針對 DOM 的操作，`console.log` 針對 DOM 是印出該元素，而 `console.dir` 則是完整的顯示出該物件的所有的資訊。

``` js
// 僅顯示該元素 HTML 的程式碼
console.log(document.body);

// 顯示 javascript 中 DOM 完整的物件資訊
console.dir(document.body);
```

上述主要是在 Browser 中的操作，而 Node.js 中也有 `console.dir` 喔。嘗試下列程式碼就能看到更細節的東西。

[Node.js 官方文件](https://nodejs.org/api/console.html#console_console_dir_obj_options)

``` js
// node version 8.0.0

// 一般的 console.log
console.log(console); 

// 顯示更多的細節
var options = {
  // 是否顯示被隱藏的細節
  showHidden: true, 
  // 是否著色
  colors: true, 
  // 在該物件中遞迴向下檢查的層數
  // depth: 1, 
};
console.dir(console, options);

```

# `console.table()`

console.table 是一個相當有趣的功能，能將陣列物件以表格的方式顯示，在 Chrome console 中執行下列程式碼即可看到結果。

``` js
var menu = [
  {
    title: '香雞排',
    price: '70',
  },
  {
    title: '牛排',
    price: '350',
  },
  {
    title: '多拿滋',
    price: '55',
  },
  {
    title: '可樂',
    price: '29',
  },
];
console.table(menu);
```


# 最重要的 `console.time()` 和 `console.timeEnd()`

我個人認為這是前端開發中最重要的技能，透過這兩個 API 能協助自己尋找頁面載入時真正拖住速度的地方。透過設立起點跟中點，來偵測這段程式碼執行的時間。

``` js
// flagA: 12.35400390625ms
console.time('flagA');
for(var i = 0; i < 100; i++) { console.log(i) }
console.timeEnd('flagA');
```

測試後知道了這個 for 迴圈總共花了約 12ms。


# 結語

以上幾個是我自己比較常用到的 console API，而事實上是 Browser 和 Node.js 中的 console API 本身就存在著許多差異，只是 API 名稱設計時盡可能取得同步。使用這些 API 主要的重點還是讓開發者看到更正確的訊息，例如 `console.log` 、 `console.error` 和 `console.warning` 儘管顯示同一個字串，就存在著根本的差異，運用正確的 API 去顯示正確的值，避免自己混亂的同時也更有助於他人裡寫我們想要表達的東西。