# API Document

## Main Server

**POST `/reload`** Reload logicer script.

```latex
Response: HTTP Status.
```

**GET `/led`** Get all leds color.

```latex
Response:
{
  payload: {string[][]} 2d array of hex string of color.
}
```

**POST `/led`** Set the led color by position x, y.

```latex
Request:
{
  x: {number} Position of X.(Row)
  y: {number} Position of Y.(Column)
  color: {string} Hex string of color.
}

Response: HTTP Status.
```

**GET `/button`** Get all buttons status.

```latex
Response:
{
  payload: {number[][]} 2d array of status of button.
}
```

**POST `/button`** Trigger the button.

```latex
Request:
{
  x: {number} Position of X.(Row)
  y: {number} Position of Y.(Column)
}

Response: HTTP Status.
```

**POST `/broadcast/led`** Broadcast all leds to all nodes.

```latex
Response: HTTP Status.
```

**POST `/broadcast/button`** Broadcast all buttons to all nodes.

```latex
Response: HTTP Status.
```

## Node Server

**POST `/led`** Set led.

payload 會是全部的 led 資料，各個 node 會依照 index 來擷取必要的資料

```latex
Request:
{
  payload: {string[][]} 2d array of hex string of color.
}

Response: HTTP Status.
```

**DELETE `/led`** Reset led.

重置所有 Led

```latex
Response: HTTP Status.
```