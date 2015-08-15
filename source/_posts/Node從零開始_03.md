title: Part 3 - 淺談 NPM
date: 2015-08-12 21:04:24
tags:
- Node.js
- Node.js 從零開始
- JavaScript
categories: Node.js 從零開始
comments: false
---

<center>
![NPM](https://www.npmjs.com/static/images/wombat-by-night.svg)
</center>

前一篇提到的 [NPM](https://www.npmjs.com) ，是 Node.js 運作中最重要的一個環節， Node.js 仰賴 NPM 進行套件整理並安裝，包含了基本安裝、相依性安裝、指定版本安裝等等，簡而言之 NPM 處理所有我們在 Node.js 開發時跟套件相關的基本操作，同時也讓 Node.js 的模組得以快速發展。

介紹 NPM 主要有幾個重點：

* NPM 的 package.json
* 透過 NPM 安裝套件
* 爲專案設定專用指令

## package.json

package.json 是 npm 最重要的核心，每個專案都會擁有一個 package.josn 的檔案，目前 express-generator 產生的看起來是這樣：

``` josn
{
  "name": "myApp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.10.2",
    "cookie-parser": "~1.3.3",
    "debug": "~2.1.1",
    "express": "~4.11.1",
    "jade": "~1.9.1",
    "morgan": "~1.5.1",
    "serve-favicon": "~2.2.0"
  }
}
```

在第一層的目錄就能找到，如果不使用 express-generator，當然也可以用 `npm init` 去自行初始化 package.json，指令會一步一步的引導完成。逐一解釋 package.json 裡面的參數，`name` `version` `private`，分別是使用者可以自行設定的參數，並不會直接影響專案的運行。 `script` 我們後面在介紹。接著是紀錄在 package.json中的相依性的資訊，除了現在看到的 dependencies 外還有 Devdependencies，差異為：

* dependencies：啟動時，必要的相依性套件
* Devdependencies：開發時，必要的相依性套件，通常是輔助工具。

下面會教如何自動產生這段訊息，當然也可以自己手動補上資訊，然後讓 npm 讀取 package.json 再一次安裝(手動並沒有比較方便)。

## 使用 NPM 安裝模組(套件)

在上一篇 "Node.js從零開始" 的教學中已經用過了某些 `npm install` 的指令但並沒有詳細介紹。以下為指令做逐一的詳細解釋，別急著看第一種就使用，建議看完後尋找適當且符合情況的指令來使用。

1. 基本安裝

	`$ npm install <套件名稱>` 指令會在目前的目錄下安裝指定的 `<套件名稱>` 套件。範例如下：

	``` bat
	$ npm install express
	```

	安裝完成的套件會出現在 `node_modules` 的資料夾內。

2. 安裝指定版本

	`$ npm install <套件名稱>@<版本號碼>` 指令會在目前的目錄下安裝指定 `<版本號碼>` 版本的 `<套件名稱>`套件。請注意中間有一個 `@` 的符號喔。範例如下：

	``` bat
	$ npm install express@4.11.1
	```

	如果你非常清楚版本的差異，想要用指定的版本，可以設定一個區間：

	``` bat
	$ npm install express@">=1.0.0 <2.0.0"
	```

	一般來說，不需要指定版本，或是指定單一版本即可正確的安裝。較少的情況會使用到指定版本區間的指令。另外，如果沒有指定版本，使用一般的 `npm install` ，NPM 會聰明地選擇當下 Node.js 版本能相容的最新版本。

3. 安裝為全域套件

	全域套件顧名思義，與全域變數的概念雷同，全域套件並不會出現在專案中，以下以兩種狀況會安裝全域套件：

	* 以後會頻繁使用的套件
	* 與專案本身無關的套件

	就已 express-generator 來說， generator 其實是與專案無關的，僅僅進行專案初始化的動作，初始化完成後其實並不需要 express-generator 才能運轉，所以在 "相依性套件" 的思考上，建置完成的專案並不依賴 express-generator，也就是沒有 express-generator 專案也能啟動。此時我會選擇將 express-generator 安裝在全域，全域安裝其實是安裝在  `node/bin` 的資料夾下。全域安裝的模組可以在許多專案間可以共用、重複使用，例如某些 babel 的套件也是此情況。而會重複使用的套件，同樣是 express-generator 可以協助我初始化不同的專案，基於方便，一次安裝為全域套件即可，不需要在每次初始化專案時就重新安裝 express-generator。
	
	備註：某些套件本身就會要求使用全域安裝，如：nodemon

	安裝全域套件相當簡單：`npm install <套件名稱> -g`，在尾端接上 `-g` 代表 global 的參數即可。

	``` bat
	$ npm install express-generator -g
	```

	`-g` 可以跟安裝指定版本的方式混用，並不衝突，同樣是在後方接上 `-g` 的參數即可。通常全域安裝會需要 `sudo` 的加持，才會有足夠的權限，因為 Node.js 本身是裝在系統資料夾下面。

4. 安裝並儲存在 package.json 中

	紀錄相依性的資訊在 package.json 中，分為一般的 dependencies 和 Devdependencies，差異為：

	* dependencies：啟動時，必要的相依性套件
	* Devdependencies：開發時，必要的相依性套件，通常是輔助工具。

	為什麼需要將資訊儲存在 package.json 中，主要原因是在於團隊開發時，會使用版本控管來同步各個成員之間的進度，而將套件內容列入版本監控內，不僅僅不利於網路傳輸，也會拖慢動態監控的速度。一般會在 package.json 中紀錄清楚使用了哪些套件，其他成員僅需要一次性的安裝即可，這樣可以大幅降低版本控管系統的負擔。此舉動其實在使用 express-generator 時已經發生過，express-generator 僅會產生適當的 package.json，並沒有幫我們下載對應的模組，

	指令為 `$ npm install <package name> --save` 和 `$ npm install <package name> --save-dev`

	``` bat
	$ npm install express --save  // dependencies
	$ npm install gulp --save-dev // Devdependencies
	```

5. 自動安裝 package.jso 中所有的相依性套件

	```
	$ npm install
	``` 

	相當直接的指令。npm 會自行尋找目錄下的 package.json 檔案，並且進行安裝。
	
	