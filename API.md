# API Document

## Main Server

**POST `/script`** Upload the script

```latex
Request:
  form-data:
    file: binary file

Response: HTTP Status.
```

**POST `/image`** Upload the images (max count: 10)

```latex
Request:
  form-data:
    images: array of binary file

Response: HTTP Status.
```

**POST `/api/reload`** Reload logicer script.

```latex
Response: HTTP Status.
```

**GET `/api/led`** Get all leds color.

```latex
Response:
{
  "payload": {string[][]} 2d array of hex string of color.
}
```

**POST `/api/led`** Set the led color by position x, y.

```latex
Request:
{
  "x": {number} Position of X.(Row)
  "y": {number} Position of Y.(Column)
  "color": {string} Hex string of color.
}

Response: HTTP Status.
```

**GET `/api/button`** Get all buttons status.

```latex
Response:
{
  "payload": {number[][]} 2d array of status of button.
}
```

**POST `/api/button`** Trigger the button.

```latex
Request:
{
  "x": {number} Position of X.(Row)
  "y": {number} Position of Y.(Column)
}

Response: HTTP Status.
```

**POST `/api/broadcast/led`** Broadcast all leds to all nodes.

```latex
Response: HTTP Status.
```

**POST `/api/broadcast/button`** Broadcast all buttons to all nodes.

```latex
Response: HTTP Status.
```

**GET `/api/status`** Get all leds color and button status.

```latex
Response:
{
  "led": {string[][]} 2d array of hex string of color.
  "button": {number[][]} 2d array of status of button.
}
```

## Node Server

**POST `/api/led`** Set led.

payload 會是全部的 led 資料，各個 node 會依照 index 來擷取必要的資料

```latex
Request:
{
  "payload": {string[][]} 2d array of hex string of color.
}

Response: HTTP Status.
```

**DELETE `/api/led`** Reset led.

重置所有 Led

```latex
Response: HTTP Status.
```