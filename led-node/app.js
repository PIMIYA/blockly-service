const express = require('express');
const http = require('http');

const config = require('./config');
let port = process.env.PORT || config.Port || 3000;
let nodeIndex = process.env.Index || config.NodeIndex;
config.SetIndex(nodeIndex);

const ledController = require('./ledController');
ledController.init(nodeIndex);

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function () {
    console.log('Node server stopped. Node Index: ' + nodeIndex);
    process.exit();
});

let app = express();
app.set('port', port)
app.use(express.json());
app.use(express.static('public'));

// ========== API

app.post('/led', function (req, res) {
    let payload = req.body.payload;
    ledController.setLeds(payload);

    res.end();
});

app.delete('/led', function (req, res) {
    ledController.reset();

    res.end();
});

// FOR TEST ==========
app.get('/button/:x/:y', function (req, res) {
    let x = parseInt(req.params.x, null);
    let y = parseInt(req.params.y, null);
    ledController.triggerButton(x, y);
    res.end();
});

// API ==========

let server = http.createServer(app)
server.listen(app.get('port'), function () {
    console.log('Node server listening on port ' + app.get('port'));
    console.log('Node Index ' + nodeIndex);
});
