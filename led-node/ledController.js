const _ = require('underscore');
const ws281x = require('rpi-ws281x-native');

const modeEnum = require('./common/modeEnum');
const constValue = require('./common/constValue');
const ledManager = require('./common/ledManager');
const utils = require('./common/utils');

const config = require('./config');
const networkMgr = require('./networkManager');

const serverHost = config.ServerHost;

//啟動按扭btn.py
const exec = require('child_process').exec;
const kill = require('tree-kill');
var sref = null;

function ledDraw(led) {
    led = utils.reverseOdd(led);
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

        this.exec_btn();
    }

    onButtonClickEvent(x, y) {
        // console.log(config.NodeIndex, ledManager.mode, x, y);
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

        // send x, y and node index to server
        networkMgr.sendButtonEvent(config.NodeIndex, x, y);
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
    reset(ignoreInit) {
        this.stop_btn();
        ws281x.reset();
        if (!ignoreInit) {
            let ledSize = constValue.BoardLedWidth * constValue.BoardLedHeight;
            ws281x.init(ledSize);
            this.exec_btn();
        }

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

    //執行按扭btn.py
    exec_btn() {
        if (sref == null) {
            var call = 'python ./btn4pi/btn.py';
            sref = exec(call, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(stdout);
            });
        }
    }

    //停止按扭btn.py
    stop_btn() {
        if (sref && sref.pid > 0) {
            kill(sref.pid, 'SIGTERM', function () {
                myLog('Killed btn process with PID: ', sref.pid);
                sref = null;
            });
        }
    }


}

module.exports = new LedController();
