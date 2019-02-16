const LedNode = require('../common/modules/LedNode');

const request = require('../common/request');
const ledManager = require('../common/ledManager');

const config = require('./config');
const logicer = require('./logicer');

const INTERVAL = 1000;
/** @type {LedNode[]} */
const NODES = config.Nodes;

let intervalId = null;
let locked = false;

function sendLedStatus(url, led) {
    console.log(`Send to: ${url}`);
    request.Post(url, {
        payload: led
    }, (error, response) => {
        if (error) {
            console.error(error.message);
            return;
        }
        // console.log(response.data);
    });
}

function loop() {
    if (locked) {
        return;
    }
    locked = true;

    logicer.doRun();
    NODES.forEach(node => {
        try {
            sendLedStatus(node.Url, ledManager.getRawLedStatus());
        } catch (error) {
            console.error(error);
        }
    });

    locked = false;
}

function start() {
    console.log('Start loop');
    logicer.doRun();
    intervalId = setInterval(function () {
        loop();
    }, INTERVAL);
}

function stop() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    console.log('Stop loop');
}

exports.start = start;
exports.stop = stop;
