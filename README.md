# Blockly

```text
./common - 共用 library
./led-node - Client node
./project-led Blockly - Blockly web site
./server - Server node
./src - Blockly source code
```

## 啟動

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

- [x] 把所有顏色改用 rgb-hex 不要用 constValue.Color
- [x] 改成 39 nodes，每個 node 一個 board
- Server
  - [ ] set x, y to color
  - [x] set mode 0, 1, 2
  - [x] get all led status [18, 78]
  - [x] get all button status [18, 78]
  - [ ] get all led, button status [18, 78] { button {number}, led {number or rbg_hex} }
  - [ ] Send reset to client
  - [ ] Test Bitmap font, text to led data
- Client
  - [x] 把 6x6 中 2, 4, 6 的陣列資料反轉， 因為 ws281x 的運作方式是 led 連續的，以下是 led 串連方式(註a) => ws281x-native 已經做好了
  - [x] API Reset ws281x
  - [x] API Change mode

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
- [ ] 上傳 js file 讓產出來的 code 給 server 跑