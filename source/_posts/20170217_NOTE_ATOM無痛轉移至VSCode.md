title: ATOM無痛轉移至VSCode
date: 2017-02-17 08:13:20
categories: 做個筆記怕忘記
thumbnail: /images/notes/AtomvsVScode_thumbnail.png
tags:
- 程式設計
- 重點筆記
- atom2vscode
- atom 
- vscode
- visual studio code
---

* 如何將快捷鍵全部調整成與 Atom 相同？
* VSCode 安裝 Theme
* VSCode 調整設定的方式
* 常用套件推薦

隨這過去這一年 VS Code 的使用者增加，Atom vs Sublime vs VSCode 相關的討論炒得越來越火熱，也有越來越多社群上的大大表示跳槽到 VSCode 的圈內。以我個人來說，我是從 Atom 跳槽到 VSCode ，剛跳槽的時候也遇到了不少的問題，以下介紹了 Atom 跟 VSCode 跳槽的細節過程：

### 將快捷鍵全部調整成跟 Atom 一樣

<!--more-->

換編輯器最痛的苦莫過於快捷鍵的改變，VSCode 中有 [Atom Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings) 的套件，安裝後可以直接將大部分的 VSCode 快捷鍵改得跟 Atom 差不多，個人覺得這是最重要的的！調整快捷鍵設定之後，對整個 VSCode 的熟悉度 +100 😄

![VSCode 套用 Atom 的快捷鍵](/images/notes/VSCode_atomKeymap.jpg)

### VSCode 安裝 Theme 不同的小細節

VSCode 安裝後的 Theme 請去 `Code > 喜好設定 > 彩色佈景主題` ，與 Atom 最重要的差異是 Theme 和 Syntax Color 是綁定的，不相 Atom 可以分開選則 (或許要去設定中調整細節才行了)。

![VSCode 設定 Theme 的方式](/images/notes/VSCodeThemeSet.jpg)

### 調整設定

個人覺得這部分 VSCode 過一陣子之後就會改掉，VSCode 目前的設定並沒有比較好的 GUI 介面可以手用，要透過 JSON 檔案來維護，不過幾乎是全部的設定都已經偶中文翻譯了，並沒有太大的問題，只要複製做邊需要的片段程式碼到右邊就好了。話說調整設定的時候，VSCode 很貼心的主動開啟雙視窗，貼心++。

![VSCode調整設定的方式](/images/notes/VSCode調整設定的方式.jpg)

### 個人常用的 VSCode 套件

* 首推當然是：[Atom Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings)
* Theme 的部分我是使用：[Theme-atom-one-dark](https://marketplace.visualstudio.com/items?itemName=andischerer.theme-atom-one-dark)
* 因為先前我在 Atom 是使用 [Git-Plus](https://atom.io/packages/git-plus)，如果你也喜歡用 `cmd + shift + p ` 來執行 Git 相關的指令的話推薦使用 [Git Easy](https://marketplace.visualstudio.com/items?itemName=bibhasdn.git-easy)
* 必備的 Git Log 查看工具 [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)，而且相當美觀呢

### 小結

先前覺得 VSCode 的社群資源並不如 Atom 龐大，事實也是如此，但以我個人使用的功能來說，最基本的功能已經齊全了！而因為 Atom 在我的 Mac 上打字總是慢半拍的原因 (而且更新到 1.14 以上的版本仍然沒有改善)，讓我更積極主動地想要脫離 Atom 跳槽的 VSCode。