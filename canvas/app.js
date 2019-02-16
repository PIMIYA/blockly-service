const express = require('express');
const http = require('http');
const ws281x = require('rpi-ws281x-native');

const utils = require('./utils');

const SIZE = 64;

ws281x.init(SIZE);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () {
        process.exit(0);
    });
});

let app = express();
app.set('port', 3000)
app.use(express.json());
app.use(express.static('public'));

let data = [];
data.length = SIZE;
data.fill(utils.orderedColors[0]);

app.get('/', function (req, res) {
    let c = data[0];
    c = utils.nextColor(c);
    data.fill(c);
    let dest = utils.hexToUint32Array(data).slice();
    ws281x.render(dest);
    res.end();
});

let server = http.createServer(app)
server.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
