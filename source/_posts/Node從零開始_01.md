title: Part 1 - 簡介與安裝
date: 2015-08-09 18:41:42
tags:
- Node.js
- Node.js 從零開始
- JavaScript
categories: Node.js 從零開始
comments: false
---

### Node.js 從零開始

![Node.js](http://lamb-mei.com/wp-content/uploads/2014/09/nodejs-1024x768-1.png)

## Node.js 簡介

* [Node.js 官方](https://nodejs.org/)
* [Node.js 台灣社群](http://nodejs.tw)
* [Node.js Facabook 台灣社群](https://www.facebook.com/groups/node.js.tw/)

隨著Google V8 引擎優秀的效能，JavaScript在近幾年迅速地竄紅，並透過Node.js的作者Ryan Dahl，讓JavaScript正式地能運作於伺服器端。

Node.js在 I/O 這方面表現相當優，主要歸功於非同步事件驅動的核心。Node.js 的非同步 I/O 適合在 I/O 密集的情況下使用，正是現今大部份網站面臨的情況。

Node.js 透過非阻塞式、非同步的 I/O 應付大量的請求，在以往阻塞式的伺服器語言設計中，後續資料需要等待前方 I/O 完成後才能繼續，或是需要開啟新的執行緒，在流量相當大的伺服器相對會造成一定時間的延遲。

一般來說會仰賴提升伺服器或是增加伺服器數量來分擔流量，但現今網路世界蓬勃發展，高流量已經相當常見，開發者不得不正視效能問題。

舉例來說新聞網站、部落格等，伺服器要能大量的回應資料，不需要牽涉到複雜的演算。使用 Node.js 伺服器能大大的解決 I/O 的需求。Node.js也相當適合配上 Single Page App 和 API，大量的 I/O 和少量的運算，Node.js 符合這一類型的需求。

我們可以在

## Node.js 快速安裝 (on MAC)

別急著下載Node.js官方的安裝檔，我們用更聰明的方式處理。

Node.js 近來版本更新快速，現階段又即將跟 Node.js 的分支 io.js 進行整合，Node.js 將版本大躍進到4.0版。以 PHP 來說，開發時往往有版號的問題，Node.js 亦有相同的情形，因此我們透過 Node Version Managerer (NVM) 來進行各個版本的：安裝、刪除、切換，讓我們在各個版本之間輕鬆自在的遊走！

那 NVM 又要怎麼安裝呢？MAC 使用者請使用[Homebrew](http://brew.sh)進行安裝，安裝Homebrew相當簡單，開啟終端及(Terminal)，然後複製[官網](http://brew.sh)上的安裝指令，即是以下指令，貼上直行即可。

備註：$ xxx 代表著要在終端機輸入 xxx 指令


``` bat
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

因為 MAC 原生就有安裝 Ruby，因此可以直接使用 Ruby 指令，基本上沒有大問題。接著再次確認 Homebrew 有正確安裝，查看Homebrew在本機的位址或是版本皆可。

``` bat
$ which brew          <--查詢路徑
/usr/local/bin/brew   <--路徑
$ brew -v             <--查詢版本
Homebrew 0.9.5        <--當前版本
```

接著就可以使用 Homebrew 安裝 NVM 囉：

``` bat
$ brew install nvm
```
接著請等終端機運行完畢即可。
接著要在終端機的指令集裡面補上 NVM 的指令，如果不熟悉Linux或vim的話，操作稍微比較麻煩一點，可依照以下說明一步步操作。

1. 使用 vim 打開 .bash_profile

	``` bat
	$ vim ~/.bash_profile
	```
	輸入上面 vim 的指令後，會看到一個相當不友善的編輯界面， vim 的操作需要一段時間才能熟悉，目前我們就將就學習會用到的部分就好。 
	
2. 用 vim 編輯 .bash_profile 檔案

	vim 也是仰賴指令來操作，將游標移動到想要的位置後按下鍵盤 `a` 可以開始編輯，接著使用一般的複製貼上 `cmd⌘+c`  `cmd⌘+v` 將以下兩串字貼進去：

	``` bat
	export NVM_DIR=~/.nvm
	source $(brew --prefix nvm)/nvm.sh
	```
	
3. 用 vim 儲存並離開

	(1) 按下 `esc`先離開編輯環境
	
	(2) 按下 `shift+:`
	
	(3) 輸入指令 `wq`
	
	(4) 按下 `enter`
	
	就會儲存並離開拉！

測試有沒有安裝成功，直接輸入 `$ nvm` 這個指令，終端機回應如下：

基本上就是 NVM 有哪些指令的目錄。

``` bat
Node Version Manager

Usage:
  nvm help                              Show this message
  nvm --version                         Print out the latest released version of nvm
  nvm install [-s] <version>            Download and install a <version>, [-s] from source. Uses .nvmrc if available
  nvm uninstall <version>               Uninstall a version
  nvm use <version>                     Modify PATH to use <version>. Uses .nvmrc if available
  nvm run <version> [<args>]            Run <version> with <args> as arguments. Uses .nvmrc if available for <version>
  nvm current                           Display currently activated version
  nvm ls                                List installed versions
  nvm ls <version>                      List versions matching a given description
  nvm ls-remote                         List remote versions available for install
  nvm deactivate                        Undo effects of `nvm` on current shell
  nvm alias [<pattern>]                 Show all aliases beginning with <pattern>
  nvm alias <name> <version>            Set an alias named <name> pointing to <version>
  nvm unalias <name>                    Deletes the alias named <name>
  nvm reinstall-packages <version>      Reinstall global `npm` packages contained in <version> to current version
  nvm unload                            Unload `nvm` from shell
  nvm which [<version>]                 Display path to installed node version. Uses .nvmrc if available

Example:
  nvm install v0.10.32                  Install a specific version number
  nvm use 0.10                          Use the latest available 0.10.x release
  nvm run 0.10.32 app.js                Run app.js using node v0.10.32
  nvm exec 0.10.32 node app.js          Run `node app.js` with the PATH pointing to node v0.10.32
  nvm alias default 0.10.32             Set default node version on a shell

Note:
  to remove, delete, or uninstall nvm - just remove ~/.nvm, ~/.npm, and ~/.bower folders
```

如果測試成功的話，那就可以開始安裝 Node.js 了！上面辛苦的安裝 NVM 可以為未來 Node.js 的版本切換省下許多功夫。

1. 讓 NVM 找出目前所有能安裝的版本，使用這個指令需要等待一下，然後會跑出一堆 Node.js 和 io.js 的版本。

	``` bat
	$ nvm ls-remote 
	```

2. 安裝指定想要的版本，推薦使用 0.10.24 或是 0.12.2 這幾個版本，如果有買任何 Node.js 的書籍，請參閱書籍使用的版本，在個版本中是存在著些微的差異的，使用不同的版本在學習的過程上多多少會造成不必要的麻煩。

	``` bat
	$ nvm install 0.12.2
	```

3. 切換指定使用的版本

	``` bat
	$ nvm use 0.12.2
	```
	
4. 查詢 nvm 的現狀，以下即是列印出來的狀況，可以查看當前使用的版本、預設使用的版本、穩定版本等等資訊...，方便日後切換版本時查看。

	``` bat
	$ nvm ls
	       v0.12.2
	default -> v0.10.24
	node -> stable (-> v0.12.2) (default)
	stable -> 0.12 (-> v0.12.2) (default)
	iojs -> iojs- (-> N/A) (default)
	```
	
5. 測試 node.js 安裝完成

	```bat
	$ node -v 
	v0.10.24
	$ which 
	/usr/local/opt/nvm/v0.10.24/bin/node
	```

## 結語

以個人的經驗而已，在 Node.js 的版本之間切換並沒有非常頻繁，社群通常都通用 v0.12.2 或是 v0.10.24 左右的版本，這幾的版本本身並沒有相當大的排斥性，但總偶爾會遇到其他版本的使用情況，如果沒有 nvm ，屆時就只能乖乖的移除並重新安裝。

在第一次安裝時把這個 NVM 安裝完成，能省解決掉不少問題，如果直接安裝 Node.js 事後又再補上 NVM ，在許多設定細節上也相當困擾。總之，一開始就裝好就對了！

## 參考文章
* [Homebrew](http://brew.sh)
* [stackflow-nvm](http://stackoverflow.com/questions/tagged/nvm)
* [stackflow-nvm command not found](http://stackoverflow.com/questions/16904658/node-version-manager-install-nvm-command-not-found)
* [Max OSX 新手入門](http://mac-osx-for-newbie-book.kejyun.com/software/softwareWebDeveloperNodeJS.html)
* [Node.js 安裝與版本切換教學 (for MAC)](http://icarus4.logdown.com/posts/175092-nodejs-installation-guide)
* [Homebrew: 新一代 OSX 套件管理工具](https://ihower.tw/blog/archives/4308/comment-page-1)
