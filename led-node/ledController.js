const _ = require('underscore');
const ws281x = require('rpi-ws281x-native');

const modeEnum = require('./common/modeEnum');
const constValue = require('./common/constValue');
const ledManager = require('./common/ledManager');
const utils = require('./common/utils');

const config = require('./config');
const networkMgr = require('./networkManager');

const serverHost = config.ServerHost;

function ledDraw(led) {
    let renderData = utils.hexToUint32Array(_.flatten(led));
    ws281x.render(renderData);
}

/**
 * 使用前一定要呼叫 init
 */
class LedController {
    constructor() {}

    init(nodeIndex) {
        let ledSize = constValue.BoardLedWidth * constValue.BoardLedHeight;
        ledManager.init({
            nodeIndex: nodeIndex
        });
        ws281x.init(ledSize);

        networkMgr.getServerMode(serverHost,
            (response) => {
                this.setMode(response.mode);
            }
        );
    }

    onButtonClickEvent(x, y) {
        switch (ledManager.mode) {
            case modeEnum.FREE:
                this.nextLed(x, y);
                break;
            case modeEnum.ART:
                break;
            case modeEnum.BLOCKLY:
                this.triggerButton(x, y);
                break;

            case modeEnum.NONE:
                // do nothing
                break;
            default:
                break;
        }
    }

    getMode() {
        return ledManager.getMode();
    }

    setMode(mode) {
        console.log(`Set mode: ${mode}`);
        ledManager.setMode(mode);
    }

    /**
     * Set the led from main server.
     * @param {Array<Array<string>>} ledStatus
     */
    updateLocalLeds(ledStatus) {
        // console.log('==========');
        // console.log('Boards:', config.BoardsIndex);
        // console.log('==========');
        ledManager.setRawLedStatus(ledStatus);

        config.BoardsIndex.forEach((bIdx) => {
            let led = ledManager.getRawLedStatus(bIdx);
            ledDraw(led);
        });
    }

    /**
     *
     * @param {number} x Row of board (Starting from 1)
     * @param {number} y Column of board (Starting from 1)
     * @param {string} color Hex string of color
     */
    sendLed(x, y, color) {
        console.log(`(${x}, ${y}): ${color}`);
        let pos = utils.nodePosTolMainPos(config.NodeIndex, x, y);
        networkMgr.changeLedColor(serverHost, pos.Row, pos.Column, color);
    }

    /**
     * Reset all led to disabled.
     */
    reset() {
        ledManager.resetAll();
        config.BoardsIndex.forEach((bIdx) => {
            let led = ledManager.getRawLedStatus(bIdx);
            ledDraw(led);
        });
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
                ledDraw(led);
            });
        }
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
}

module.exports = new LedController();
