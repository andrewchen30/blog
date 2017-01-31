title: Android App - TTtimer
date: 2015-08-19 15:46:12
tags:
- Android
- Java
- 作品集
categories: 作品集
comments: false
---

<center>
![TTtimer](/images/TTtimer/ic_launcher.jpg)
</center>

名稱：TTtimer
類型：Andriod App / Java, 未上架
時間：2015/1 (大三上學期)
用途：期末作業
License：MIT

## 簡介

Android APP - TTtime 是我在大三上學期修 Amy 老師 Java 課程的期末作品。這隻 APP 大概是我個人最喜歡期末作品之一，包括結構和設計是我個人最喜歡的，當時我有不少的時間與不曉得發揮空間。TTtimer 的設計概念出自於 10,000 小時，意指在某一個專業區域中努力 10,000 小時才能成為該專業領域中的佼佼者。而 TTtimer 即是此類型的計時器，選擇目標的專業項目後，持續累計時間來達成最初設定的目標，並透過累計時間的百分比、累計總數來給予獎勵或是頭銜的稱號。

<center>
<img src="/images/TTtimer/working_finish.jpg" alt="TTtimer Working" style="width: 200px;"/>
</center>

以下為 APP 使用到的技術重點，有需要的同學可以在裡面尋找相關自訓。有機會的話相我想把這個 APP 上架，最為一次學習經驗。

## Source Code 分享

Source Code 放置在 Google Drive 上面，分享給需要範例的同學們。

適用於 Andriod Studio 版本：
[[Android APP]  TTtimer-for-AS-v1.0](https://drive.google.com/open?id=0B1p_o3Z5VQBeXzlXUlRNWExCUVE)

適用於 Eclipse 版本：
[[Android APP]  TTtimer-for-eclipse-v1.0](https://drive.google.com/open?id=0B1p_o3Z5VQBeYjM5ZEVQWVpWOWs)

## 技術簡介

#### 物件導向設計

APP 中，每個 `任務` 都是以一個物件包裝，包括包裝這個 `任務` 本身的資訊、進度、累計時間等等。而累計時間輸出時，可是轉換成百分比的函數，也是包裝在 PlaneToTime 的類別裡面。物件導向設計可參考的是以下主要幾個類別：

* MyTimer
* MicroTimer
* Plan
* PlanToTime

MyTimer 和 MicroTimer 類別主要功能就是計時器，在每個計畫中都會使用到一個計時計，並且有簡化一些時間I/O的機制，主要是根據我當時自己的需求所包裝的。而 Plan 和 PlanToTime 包裝了 `計畫` 和 `有時目標間的計畫`，事實上在最後 APP 實作的時候，並沒有 `無目標時間的計畫`，也就是說類別 Plan 只是單純被 PlanToTime 繼承，作用類似於一個基底類別，其實並沒有實作的功能，這屬於我個人設計錯誤，因為一開始有構想 `無目標時間的計畫`。因此在後面會發現，底層設計的取得獎勵的方式，略有不同，僅僅因為當初規劃時我的想法岔開了。

包裝這四個類別，在我專案開發中後期其為吃香，傳送資料時不太需要考慮資料格式。簡單思考：傳遞一個物件比起傳遞四個不同型別的參數，何者容易？當然是包裝好的一個物件，一次傳遞來得輕鬆方便。另外，包裝物件可以在多人開發時，資料格式的缺漏檢查，或是避免掉不必要的資料傳遞誤會與錯誤。

#### 計時器

計時器只有兩個原則，每秒(或是其他時間)的觸發事件，然後再撰寫自己紀錄的方式。計時器 Andriod 有預設事件，少量的計時器每秒的 tick 相當精準，不要一次開一大堆就好。也別用計時器去處理監聽事件，基本上 Andriod 大部份的物件都有自己的監聽事件，不需要自行去撰寫計時器去檢查。在 TTtimer 中牽涉到的類別如下：

* MainActivity
* TiemRiver
* SysSet

之前被問過幾次 Android App 的計時計怎麼處理，計時器的影子可以在 `Mainctivity` 中找到，當初設計是在 APP 一啟動時，背後就有一個碼表在計時，而計時計的參數被我抽取到 `TimeRiver` 和 `SysSet` 的類別中，其實 `TimeRiver` 的類別中的設定參數直接抽取到 `SysSet`，目前的方式是多個任務會共用同一個碼錶，避免每開一起一個新的任務就啟用新的碼表消耗效能。

#### SQLite

如果 SQLite 無法正常啟用，記得注意 Android 本身的版本是否要更新，之前個人在測試時就發生過無法啟動的狀況。情急之下用 txt 自己刻了一套類似功能的 documentation SQL。現在想想挺好笑的，結果期中考過後我發現手機系統要更新，更新好就能使用 SQLite 了，只好默默的砍掉整個手刻的 SQL。

關於 SQLite 我使用在兩個部分：儲存計畫、系統參數。

* PlanSQL
* SystemSettingSQL

兩者都相當直接的包裝了基本的 Sqlite 的 CRUD (新增/修改/刪除/查詢)，基本上 SQLite 在類別設計完成後，撰寫一次，確認每次 APP 開啟後跟 SQLite 的 IO 正常後，我就再也沒有修改過內部的程式碼。所以理想的話只要努力一次就好，並不需要開發途中不斷地維護那段程式碼。 SQLite 需要注意的重點是測試資料的問題。在開發時頻繁的測試過程中，程式碼除錯時會頻繁地影響到資料庫資料的變動，導致錯誤解決了卻仍然出現問題。主因是資料錯誤，產生 Garbage in garbage out 的結果。建議在開發期間每次 APP 啟動時就初始化一次資料，清空資料庫並且寫入測試用的資料，最終在 APP 發佈時只要將初始化資料的程式碼註解掉即可。

另外需要注意的事情是，程式碼要有解析空資料的能力。意思是多半在測試時，資料庫內已經有測試資料，往往忽略了有可能無資料的情況，反而在拿掉測試資料後才發現 APP 啟動的一瞬間就會因為資料讀取失敗而崩潰。

#### 動態新增控制項

這大概是我被詢問最頻繁的項目了。處理這部分的是以下兩個類別：

* AddBtn
* ViewList

動態新增控制項的步驟就是：宣告 > 設定 > 掛載。除非是要做 APP 遊戲，不然 Andriod 內建的 ListView 應該能解決大部份的問題，當初我在這塊也是修改了好幾個版本，一開始因為好玩也是手刻 ListView，再建立 Scroll view。不過內建的 ListView 和手刻的邏輯基本上是相同的，先將想要動態新增的物件製作成一份 ListItem 再由 ListView 去重複就對了。

#### Android Lifecycle 生命週期

![Andriod 生命週期 ](http://pic.pimg.tw/style77125tech/1369341764-3430810860.png)

撰寫 Andriod APP 最重要的就是生命週期。簡而言之，生命週期就是我們在手機各種操作時，切換到 APP 畫面時對程式運行的影響，例如執行中的 APP 在按下 Home 鍵後會進入到 `onPause()` 的狀態，不同的狀態不可能讓 APP 一直處於運轉中，因此 APP 作業流程設計會圍繞著 Android Lifecycle 在運轉，也是設計的核心。但記得在 Lifecycle 中，我個人認為最不能仰賴 `onDestroy()`，仰賴關閉 APP 時才去執行，無法預測 APP 是在什麼情況下被關閉的，可能執行緒被中斷、手機沒電等等狀況。重要的資料同步，盡可能不要放在 `onDestroy` 的部分。

#### 雙語系

TTtiemr 支援雙語系，支援 `zh-Tw` 和 `en` 語系，根據手機設定的國籍去做辨識。在手機中抓取字串的方式都需要使用 `android:text="@string/show"` 抓取，之前有聽過反映這樣相當不友善(且不容易辨識)，不過在後期翻譯時相當有趣，單純翻譯 `string` 的設定檔就可完成。如果從一開始就有遵守紀律，將對應的字串寫在設定檔內，在專案末期好好享受輕鬆翻譯 APP 語言的成果吧!

#### 多解析度圖片

在多解析度圖片這部分，我個人處理得相當糟糕，當初在 PC 上測試時雨手機上測試時發現差距極大，因此我大量的改用百分比去做設計。解決問題後我就沒有再去對多種解析度的螢幕下去做設計。

#### Animation 動畫效果

在 `WorkingActivity` 可以大量使用到動畫，Android 的動畫使用大致上是：宣告 > 設定參數 > 啟動。需要注意的是 Animation 的狀態，需要將正確的資料流操作掛載載正確的 Animation 事件上面，避免掉發生動畫時件不同步或是執行順序有問題的情況。Animation 玩起來相當有趣且有成就看，相當推薦大家玩玩。

![screen shot](/images/TTtimer/demo.jpg)

## 檔案簡介

path: src/main/java/tw/com/oit/andrew/

##### myclass/MyTimer

計時計類別，主要是依照需求包裝了計時器去配合之後的 Andriod time tick。

##### myclass/MicroTimer

繼承了 MyTimer，加入了秒數的欄位，最後這兩個計時器使用的類別會被包在 Plan 和 PlanToTime 中使用。

#### myclass/Plan

包裝了每個計畫項目資訊，屬於 PlanToTime 的父類別，絕大多數重要的功能也是在這裡。

#### myclass/PlanToTime

在計畫項目資訊增加了目標時間，之後的 Activity 中使用的都是這個 class。兩個 Plan 相關的 class 是整個 APP 中 CP 最高的，但也是被反覆修改最多次的，良好的物件設計讓我在整個 APP 開發的後期有了相當不錯的資料控管，我能清楚的掌握資料的傳輸。

#### system/Notify

包裝了所有使用的通知視窗(Dialog)，從外部可以輕鬆的呼叫視窗，僅需要傳入必要的字串需求即可。

#### system/SysSet

系統設定檔。應該與 TimeRiver 合併。

#### system/TimeRiver

系統設定檔。主要是針對計時器的部分，這部分的設定會被記錄在 SQLite 中，確保每次重新啟動時都會是使用者設定的值。

#### tenthousandtimer/MainActivity

主要介面的操作，拿讀取進來的資料動態新增控制項，並且宣告、啟動計時器。

#### tenthousandtimer/MetalsActivity

單純檢視獎牌與頭銜等訊息，可以視為單純的 ListView Demo。

#### tenthousandtimer/MyMenu

針對 Menu 包裝操作，命名並沒有使用 Activity 是用來區別這個是一包裝操作的 class 並非直接掛載在頁面上的。

#### tenthousandtimer/SettingActivity

設定頁面，設邊使用了固定的控制項，然後將設定的資訊寫在上面的 system 類別中，並儲存在 SQLite。

#### tenthousandtimer/WelcomActivity

歡迎界面，在裡面載入 SQLite 的資料，其實這沒有必要，在 MainActivity 中載入即可，單純為了好看。

#### tenthousandtimer/WorkingActivity

在 WorkingActivity 中大量的使用了 Animation，如果在事後才掛上 Animation 容易導致先前設計的資料流多少出現錯誤。仔細研究 Animation 與主程式非同步的關係，就能解決這個問題，並不至於需要 APP 大改寫。

#### tttsql/PlanSQL & tttsql/SystemSettingSQL

包裝了 SQLite 的操作，包含了整批資料的 CRUD，這邊對於 SQLite 的操作相當基本，依據我的印象，資料更新的操作是直接用覆蓋的。基本上也不會出錯，在小量的資料下，效能也沒有問題。PlanSQL 和 SystemSettingSQL 分別包裝了不同的資料而已，基本上觀念完全相同。皆是在載入畫面時會讀取資料。記得注意 Andriod 的版本問題，另外 SQLite 自己也有版本問題，請確保測試資料正確，紀律性的測試可以省去很多麻煩。

#### viewlist/AddBtn & viewlist/ViewList

這兩個類別都包裝了動態新增物件的功能，新增動態物件其實相當麻煩，要考慮物件本身、事件、資料，因此我會盡可能將資訊都封裝在類別內，屆時只需要傳入必要參數即可，如任務有用物件包裝好，那理所當然直接傳遞物件即可。

![screen shot](/images/TTtimer/demo2.jpg)

## 結語

TTtiemr 亦有存在問題，目前我個人也不知道該如何解決。TTtimer 似乎在重複開啟太多任務後，會導致手機效能降低，吃掉太多CPU或記憶體。但此部分已經超過我對 Andriod APP 的認知，需要更專業的技術。但 TTtimer 所使用的技術，除了連線的需求之外，能滿足絕大部份的 APP 開發。這次的 Andriod APP - TTtimer 分享希望能幫助到大家，如果有任何問題也可以 [Facebook](https://www.facebook.com/profile.php?id=100001317746154) 敲我或是寄信給我詢問細節，但請標明是誰詢問與相關的問題資訊。
