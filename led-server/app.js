const fs = require('fs');
const path = require('path');
const http = require('http');

const express = require('express');
const multer = require('multer');
const reload = require('reload');
const decache = require('decache');

const upload = multer({
    dest: 'temp/'
});

const constValue = require('./common/constValue');
const request = require('./common/request');
const ledManager = require('./common/ledManager');

const config = require('./config');

ledManager.init({
    path: config.ResourcePath
});

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

let port = process.env.Port || config.Port || 3000;
let app = express();
app.set('port', port);
app.use(express.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

const scriptFilePath = './scripts/logicer.js';
app.post('/script', upload.single('file'), function (req, res, next) {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, scriptFilePath);

    if (path.extname(req.file.originalname).toLowerCase() === ".js") {
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res.status(200).end();
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);

            res.status(403).end();
        });
    }
});

const imagePath = './public/images';
app.post('/image', upload.array('images', 10), function (req, res, next) {
    const targetDir = path.join(__dirname, imagePath);

    req.files.forEach(file => {
        let tempPath = file.path;
        let targetPath = path.join(targetDir, file.originalname);
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res.status(200).end();
        });
    });
});

// ========== API

app.route('/api/mode')
    .get(function (req, res) {
        res.json({
            mode: ledManager.getMode()
        });
    })
    .post(function (req, res) {
        let mode = req.body.mode;
        if (mode == null || mode == undefined) {
            res.status(400).end();
            return;
        }

        ledManager.setMode(mode);
        runner.changeMode(mode);

        res.end();
    });

app.post('/api/reload', function (req, res) {
    runner.stop();
    decache('./runner.js');
    runner = require('./runner');
    runner.changeMode(ledManager.getMode());
    runner.start();

    res.end();
});

app.route('/api/led')
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
    })
    .delete(function (req, res) {
        runner.resetAll();

        res.end();
    });

app.route('/api/button')
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

app.get('/api/status', function (req, res) {
    let detail = {
        led: ledManager.getRawLedStatus(),
        button: ledManager.getAllButtonStatus()
    }
    res.json(detail);
});

app.post('/api/broadcast/led', function (req, res) {
    // let ledStatus = utils.iterateLed(constValue.TotalLedWidth, constValue.TotalLedHeight);

    let data = req.body.led;
    if (data) {
        ledManager.setRawLedStatus(data);
    } else {
        data = ledManager.getRawLedStatus();
    }

    config.Nodes.forEach(node => {
        try {
            let url = `${node.Host}/api/led`;
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

app.post('/api/broadcast/button', function (req, res) {
    // let data = ledManager.getButtonStatus();

    // config.Nodes.forEach(node => {
    //     try {
    //         let url = `${node.Host}/api/button`;
    //         request.Post(url, {
    //             payload: data
    //         }, (error, response) => {
    //             if (error) {
    //                 console.error(error.message);
    //                 return;
    //             }
    //             // console.log(response.data);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    res.end();
});

app.route('/api/power')
    .post(function (req, res) {
        console.log('power on');ƒ
    })
    .delete(function (req, res) {
        console.log('power off');
    });

// FOR TEST #####
app.get('/api/led/:nodeIndex/:boardIndex', function (req, res) {
    const nodeIndex = parseInt(req.params.nodeIndex, null);
    const boardIndex = parseInt(req.params.boardIndex, null);
    console.log(nodeIndex, boardIndex);
    res.json(ledManager.getRawLedStatusByNodeIndex(nodeIndex, boardIndex));
});

// API ==========

let server = http.createServer(app)

// Reload code here
reload(app);

runner.changeMode(ledManager.getMode());
runner.start();

server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'));
    constValue.dumpInfo();
});
