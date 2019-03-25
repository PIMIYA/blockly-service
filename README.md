# Blockly

```text
./common - 共用 library
./led-node - Client node
./project-led Blockly - Blockly web site
./server - Server node
./src - Blockly source code
```

## 啟動

### Led Server

資料夾 `server` 為 led server，使用命令 `node app.js` 啟動 led server；

啟動前確認 `server/config.js` 內的資訊是否正確，最主要應該 `config.Port` 以及 `node.Host` 要修改設定。

Port 可以透過啟動命令直接以環境變數的方式給予修改

```sh
# mac or linux
Port=1234 node app.js

# windows powershell
$env:Port=1234; node app.js
```

### Led Node

資料夾 `led-node` 為 led node，使用命令 `sudo node app.js` 啟動 led node；

啟動前確認 `led-node/config.js` 內的資訊是否正確，最主要應該 `config.NodeIndex`, `config.Port` 以及 `config.ServerHost` 要修改設定。

NodeIndex, Port 以及 ServerHost 可以透過啟動命令直接以環境變數的方式給予修改

**NOTE** `led-node` 會同時啟動 python 撰寫的 `按鈕事件` 服務，所以需要在 `led-node` 底下安裝必要的 pip 套件。

```sh
sudo pip install requests
sudo pip install RPI.GPIO
```

```sh
# mac or linux
sudo Index=0 Port=1234 ServerHost="http://192.168.1.123:3000" node app.js

# windows powershell
$env:Index=0; $env:Port=1234; $env:ServerHost="http://192.168.1.123:3000"; node app.js
```

NOTE: 啟動 node server 一定要使用 sudo。

### 同步 `common`

利用以下命令來同步 `common` 中的檔案，`common` 中的檔案主要為 `server`, `node` 兩都會用到的類別、方法，為了開發方便故移出來共用。

使用前請先安裝 `glob`:

```sh
npm i glob
```

執行同步:

```sh
node sync.js
```

## 參考

- https://github.com/google/blockly
- https://developers.google.com/blockly/
- https://developers.google.com/blockly/guides/create-custom-blocks/overview
- https://blockly.webduino.io/?demo=demo-area-05

## 可能會用到的套件

- https://github.com/google/code-prettify

## 設計、文件

- x: Row, y: Column
- 組成為 78x18 的大型 led 矩陣。
  - 將 led 矩陣去拆分成 6x6，最後會變成 13x3 的 6x6 矩陣
- `1 張圖片`轉換成矩陣大概會占 `45 kb` 記憶體

## TODO

- [x] 整合 `common` 置 `led-node` 跟 `server` 中，寫個 script 把 `common` 中的當案複製到對應位置。
- [ ] 把 server, node 拆成兩個專案好管理(?)

- [x] 把所有顏色改用 rgb-hex 不要用 constValue.Color
- [x] 改成 39 nodes，每個 node 一個 board
- Server(Main Server)
  - [x] set x, y to color
  - [x] set mode 0, 1, 2
  - [x] get all led status [18, 78]
  - [x] get all button status [18, 78]
  - [x] get all led, button status [18, 78] { button {number}, led {rbg_hex} }
  - [x] Send reset to client
  - [x] Test Bitmap font, text to led data => 目前只有英文跟一些符號的字型可用
  - [x] 上傳 js file
  - [x] Reload `logicer.js`，然後重新執行
  - [x] 增加 elapsed time 相關方法
  - [x] upload image file
  - [x] ledManager.renderImage
  - [x] Jimp.image to ledStatus
  - [x] Dictionary class for cache image file
  - [x] Cache image which was loaded.
  - [ ] Reset api -> reset 當下 mode 的狀態
  - [ ] power on/off api -> off 的時候燈號全關不接受任何操作
  - [ ] (?)ledStatus to Jimp.image
  - [ ] (?)強制 resize 不符合大小的圖片
- Client(Node Server)
  - [x] 把 6x6 中 2, 4, 6 的陣列資料反轉， 因為 ws281x 的運作方式是 led 連續的，以下是 led 串連方式(註a) => ws281x-native 已經做好了
  - [x] API Reset ws281x
  - [x] API Change mode
- Blockly
  - [x] 增加 elapsed time 相關方法
  - [x] 增加位移 led 方法
  - [x] render image to led

註a:

```latex
00 01 02 03 04 05
11 10 09 08 07 06
12 13 14 15 16 17
23 22 21 20 19 18
24 25 26 27 28 29
35 34 33 32 31 30
```

- [ ] 用個網頁讓使用者選擇模式
  - 0: free mode 每個按鈕都每按一次變換顏色
  - 1: fixed content 製作好的內容直接跑 - run image
    - [rpi-ws281x-native](https://www.npmjs.com/package/rpi-ws281x-native)
      - Need Python 2.7
    - [rpi-ws281x-canvas](https://www.npmjs.com/package/rpi-ws281x-canvas)
    - [canvas](https://www.npmjs.com/package/canvas)
    - [rgba-convert](https://www.npmjs.com/package/rgba-convert)
  - 2: Blockly mode 利用 blockly 製作內容
- [ ] 下載 Blockly 產出來的 javascript
