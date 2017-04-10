title: 設計模式創建型模式 Creational Pattern
date: 2017-04-10 13:10:00
categories: Code要好好寫
thumbnail: /images/notes/design_pattern_thumbnail.jpg
tags:
- 程式設計
- 重點筆記
- 心得分享
---

設計模式主要被分為三大類：

* 創建型模式 Creational Pattern
* 結構型模式 Structural Pattern
* 行為型模式 Behavioral pattern

# 工廠模式 Factory pattern

<!-- more -->

透過新增不同的類別來達成延展或修改功能的需求。在實例化類別前因應需求決定實例化的對象，而這幾個類別在接下來的程式碼中，可能都有差不多的操作。舉例來說：宣告 `user` 時，透過條件判定噓要實例化 `user`、`vip` 或是 `admin` 的類別，而在之後操作時可直接透過 `user.login()` 直接進行想要的操作，因為在一開始實例化類別時已經處理完成需求的擴充或更改了。

``` java
User user;
if(isAdmin) {
    user = Admin();
}
else if(isVIP) {
    user = VIP();
}
else {
    user = User();
}
```

工廠模式有很多種實作方式：簡單工廠、抽象工廠、方法工廠等等。都是用相同的邏輯在運作，只是切分的層面或方式不同。

# 建造者模式 Builder Pattern

Builder Pattern  我個人認為可以直接視為工廠模式的一種，如果再細分的話更接近抽象工廠模式。Builder Pattern 的重點在於抽取出程式碼中最終實作的某部分，透過一個抽象類別來規範這些實作的方式，而之後若有擴充的需求，直接依賴於抽象類別再行新增，然後在實例化時切換即可。可以想像成網頁中模組化的 footer 當你抽換 footer 時，整個網站的 footer 都可以跟著抽換。

# 雛形模式 Prototype Pattern

在新建立物件時，透過複製現有的物件來建立。

# 單例模式 Singleton Pattern

一個類別就只擁有一個實例化，如果再次進行實例化，就直接回傳原先已實例化的物件。Single Pattern 中又細分成兩種操作模式，一種是在整個系統初始化或是啟動時就直接對該類別實例化，另一則是在第一次宣告時才實例化。差別在於佔用記憶體和初始化的效能。