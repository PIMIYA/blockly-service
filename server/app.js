const express = require('express');
const http = require('http');
const reload = require('reload');
const decache = require('decache');

const constValue = require('../common/constValue');
const utils = require('../common/utils');
const request = require('../common/request');
const ledManager = require('../common/ledManager');
ledManager.init();

const config = require('./config');
let runner = require('./runner');

if (process.platform === "win32") {
    let rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function () {
    runner.stop();
    console.log('Server stopped');
    process.exit();
});

let port = process.env.PORT || config.Port || 3000;
let app = express();
app.set('port', port);
app.use(express.json());
app.use(express.static('public'));

// ========== API

app.post('/reload', function (req, res) {
    runner.stop();
    decache('./runner.js');
    runner = require('./runner');
    runner.start();

    res.end();
});

app.route('/led')
    .get(function (req, res) {
        res.json(ledManager.getRawLedStatus());
    })
    .post(function (req, res) {
        let x = req.body.x;
        let y = req.body.y;
        let color = req.body.color;
        // console.log(x, y, color);

        ledManager.setLed(x, y, color);
        res.end();
    });

app.route('/button')
    .get(function (req, res) {
        res.json(ledManager.getAllButtonStatus());
    })
    .post(function (req, res) {
        let x = req.body.x;
        let y = req.body.y;

        let status = ledManager.getButtonStatus(x, y);
        let changeTo = status == 1 ? 0 : 1;
        ledManager.setButtonStatus(x, y, changeTo);

        res.end();
    });

app.get('/led/:nodeIndex/:boardIndex', function (req, res) {
    const nodeIndex = parseInt(req.params.nodeIndex, null);
    const boardIndex = parseInt(req.params.boardIndex, null);
    console.log(nodeIndex, boardIndex);
    res.json(ledManager.getRawLedStatusByNodeIndex(nodeIndex, boardIndex));
});

app.post('/broadcast/led', function (req, res) {
    // let ledStatus = utils.iterateLed(constValue.TotalLedWidth, constValue.TotalLedHeight);
    let data = req.body.led;
    if (data) {
        ledManager.setRawLedStatus(data);
    } else {
        data = ledManager.getRawLedStatus();
    }

    config.Nodes.forEach(node => {
        try {
            let url = `${node.Url}/led`;
            request.Post(url, {
                payload: data
            }, (error, response) => {
                if (error) {
                    console.error(error.message);
                    return;
                }
                // console.log(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    });

    res.end();
});

app.post('/broadcast/button', function (req, res) {
    let data = ledManager.getButtonStatus();

    config.Nodes.forEach(node => {
        try {
            let url = `${node.Url}/button`;
            request.Post(url, {
                payload: data
            }, (error, response) => {
                if (error) {
                    console.error(error.message);
                    return;
                }
                // console.log(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    });

    res.end();
});

// API ==========

let server = http.createServer(app)

// Reload code here
reload(app);

// runner.start();

server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'));
});
