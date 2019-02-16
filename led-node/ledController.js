const _ = require('underscore');
const ws281x = require('rpi-ws281x-native');

const constValue = require('../common/constValue');
const ledManager = require('../common/ledManager');
const utils = require('../common/utils');

const config = require('./config');
const networkMgr = require('./networkManager');

const serverHost = process.env.ServerHost || config.ServerHost;

function drawLed(led) {
    ws281x.render(_.flatten(led));
}

function resetLed() {
    ws281x.reset();
}

/**
 * 使用前一定要呼叫 init
 */
class LedController {
    constructor() {}

    init(nodeIndex) {
        ledManager.init(nodeIndex);

        ws281x.init(constValue.BoardLedWidth * constValue.BoardLedHeight);
    }

    /**
     * Trigger button. Only for `Blockly mode`.
     * @param {number} x Row of board (Starting from 1)
     * @param {number} y Column of board (Starting from 1)
     */
    triggerButton(x, y) {
        let pos = utils.nodePosTolMainPos(config.NodeIndex, x, y);
        console.log(`[${config.NodeIndex}] (${x}, ${y}) => (${pos.Row}, ${pos.Column})`);
        if (!pos) {
            console.error(`[${config.NodeIndex}]Trigger button failed. Invalid position (${x}, ${y}).`);
            return;
        }

        networkMgr.triggerButton(serverHost, pos.Row, pos.Column);
    }

    /**
     * Change the led color to next. Only for `Free mode`.
     * @param {number} x Row of board (Starting from 1)
     * @param {number} y Column of board (Starting from 1)
     */
    nextLed(x, y) {
        try {
            let color = ledManager.getLedColor(x, y);
            let nextColor = utils.nextColor(color);
            ledManager.setLed(x, y, nextColor);

            let pos = utils.nodePosTolMainPos(config.NodeIndex, x, y);
            networkMgr.changeLedColor(serverHost, pos.Row, pos.Column, nextColor);
        } catch (error) {
            console.error(error);
        } finally {
            config.BoardsIndex.forEach((bIdx) => {
                let led = ledManager.getRawLedStatus(bIdx);
                drawLed(led);
            });
        }
    }

    sendLed(x, y, color) {
        console.log(`(${x}, ${y}): ${color}`);
        let pos = utils.nodePosTolMainPos(config.NodeIndex, x, y);
        networkMgr.changeLedColor(serverHost, pos.Row, pos.Column, color);
    }

    setLeds(ledStatus) {
        // console.log('==========');
        // console.log('Boards:', config.BoardsIndex);
        // console.log('==========');
        ledManager.setRawLedStatus(ledStatus);
        config.BoardsIndex.forEach((bIdx) => {
            let led = ledManager.getRawLedStatus(bIdx);
            drawLed(led);
        });
    }

    reset() {
        resetLed();
    }
}

module.exports = new LedController();
