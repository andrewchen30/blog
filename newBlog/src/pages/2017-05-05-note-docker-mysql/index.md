---
title: Docker 安裝 mysql + phpmyadmin
date: "2017-05-05 12:50:00"
path: "note-docker-mysql"
categories: 做個筆記怕忘記
thumbnail: /images/notes/docker_thumbnail.jpg
tags:
- 學習筆記
- 教學
- docker
- mysql

---

紀錄今天早上安裝 mysql 和 phpadmin 時所處理掉的伊些小問題

![docker](/images/notes/docker.jpg)

* mysql docker hub - https://hub.docker.com/r/mysql/mysql-server/
* phpmyadmin docker hub - https://hub.docker.com/r/phpmyadmin/phpmyadmin/

##### 建立 Mysql docker 容器 (container)

<!-- more -->

* `--name` 可以指定容器名稱
* `-p` 將外部的 3306 port 與內部的對照起來
* 這邊我指定 `tag` 為 `5.7` 版本
* 同時設定 root 的密碼

``` bat
docker run --name mysql -e MYSQL_ROOT_PASSWORD=MY_PASSWORD -p 127.0.0.1:3306:3306 -d mysql/mysql-server:5.7
```

##### 進入 mysql 命命列模式

* 確認安裝成功
* 下方指令的第一個 `mysql` 為容器名稱, 也就是上方指令所指定的 `--name` 的參數

``` bat
docker exec -it mysql mysql -u root -p
```

##### 建立 phpmyadmin 容器

* 透過 `--link` 將剛剛建立的容器與 db 對照
* 同時重新對照阜號

``` bat
docker run --name myadmin -d --link mysql_db_server:db -p 9100:80 phpmyadmin/phpmyadmin
```

開啟 [http://localhost:9100/index.php](http://localhost:9100/index.php) 能看到 phpadmin 的登入介面，輸入帳密後正常來說會登入失敗，因為還沒開啟 mysql 跨網域的登入功能，現在的 mysql 只能在容器內部 local 登入。


##### 調整 mysql 的登入網域限制

依序執行下列指令：

* 檢視資料庫清單
* 選擇 user 資料庫
* 修改指定的帳號登入區域限制，改為無限制
* 刷新

``` sql
SHOW DATABASES;
USE user;
UPDATE user SET host = '%' WHERE user = 'root';
FLUSH PRIVILEGES;
```

重新嘗試登入即可看到 phpmyadmin 的介面囉。

