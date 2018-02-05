---
title: Linux 工作排程 crontab
date: "2017-07-01 10:20:00"
path: "/note-cronta/"
categories: 做個筆記怕忘記
thumbnail: /images/notes/docker_thumbnail.jpg
tags:
- 學習筆記
- 教學
- linux
- crontab

---

五六月因為相當忙碌幾乎沒寫任何的文章或是技術筆記，在今天 7/1 要繼續開始前進囉，日後會把之前想寫的技術文章逐一補起來。

* crontab 
* crontab 基本描述方式
* crontab 更多的時程設定方式

這次要筆記的題目是 Liunx 中的 crontab 工作排程。算是在工作上很基本很實用的功能，透過設定 crontab 讓 linux sever 在指定的時間或是依照某個頻率來執行任務。

# crontab 指令操作方式

 列出現有的 crontab 設定資訊，如果是第一次嘗試的話，基本上是沒有任何東西的，等到設定完成之後再來看結果。

``` bat
crontab -l
```


