const Jimp = require('jimp');

const LedNode = require('./common/modules/LedNode');

const modeEnum = require('./common/modeEnum');
const utils = require('./common/utils');
const ledManager = require('./common/ledManager');

const config = require('./config');
const logicer = require('./scripts/logicer');
const networkMrg = require('./networkManager');

const constValue = require('./common/constValue');
const runtimeValue = require('./runtimeValue');

const INTERVAL = config.RunnerInterval || 100;
/** @type {LedNode[]} */
const NODES = config.Nodes;

let _intervalId = null;
let _locked = false;
let _changeModeLocked = false;
let _currentTask = null;
let _lastLedStatus = null;
let _lastButtonStatus = null;

let _art = {
    index: 0,
    length: 0,
    data: [],
};

let _demoTargetIndex = null;
let _demoCurrentIndex = null;


class Runner {
    constructor() {
        this.lastUpdateTime = Date.now();
    }

    loop() {
        let self = this;
        if (_currentTask == null) {
            // console.warn('No task now.');
            self.lastUpdateTime = Date.now();
            return;
        }

        if (_locked || _changeModeLocked) {
            return;
        }

        _locked = true;
        let elapsed = Date.now() - self.lastUpdateTime;
        _currentTask(self, elapsed);
        self.lastUpdateTime = Date.now();
        _locked = false;

        // fix the led to reset
        if (_intervalId == null) {
            self.sendResetToNode();
        }
    }


    runNoneMode(self, elapsed) {
        // console.log('None mode running...');
        // do nothing...
    }

    runFreeMode(self, elapsed) {
        // console.log('Free mode running...');
        // do nothing...
    }

    runArtMode(self, elapsed) {
        // console.log('Art mode running...');

        /** @type {Array<Array<string>>} */
        let currentData = _art.data[_art.index];
        ledManager.setRawLedStatus(currentData);
        self.sendLedStatusToNode(currentData);

        _art.index = ++_art.index % _art.length;
    }

    runBlockyMode(self, elapsed) {
        // console.log('Blockly mode running...');

        runtimeValue.addElapsed(elapsed);
        logicer.run(constValue, runtimeValue, ledManager);
        self.sendLedStatusToNode(ledManager.getRawLedStatus());
    }

    runDemoMode(self, elapsed) {
        function getNodeLed(idx, currentLed) {
            let rowIdx = Math.floor(idx / constValue.NodeRow) % constValue.NodeRow;
            let rowStart = rowIdx * constValue.NodeLedHeight;
            let rowEnd = rowStart + constValue.NodeLedHeight;
            let colIdx = idx % constValue.NodeColumn;
            let colStart = colIdx * constValue.NodeLedWidth;
            let colEnd = colStart + constValue.NodeLedWidth;
            for (let r = rowStart; r < rowEnd; r++) {
                for (let c = colStart; c < colEnd; c++) {
                    currentLed[r][c] = constValue.Colors.WHITE;
                }
            }
            return currentLed;
        }

        if (_demoTargetIndex == null) {
            _demoCurrentIndex = _demoCurrentIndex % constValue.NodeCount;
        } else {
            _demoCurrentIndex = _demoTargetIndex;
        }

        let led = getNodeLed(_demoCurrentIndex, constValue.defaultLedArray());
        ledManager.setRawLedStatus(led);
        self.sendLedStatusToNode(led);
        _demoCurrentIndex++;
    }

    start() {
        let self = this;

        if (!_intervalId) {
            if (_lastLedStatus != null) {
                ledManager.setRawLedStatus(_lastLedStatus);
            }
            if (_lastButtonStatus != null) {
                ledManager.setAllButtonStatus(_lastButtonStatus);
            }

            self.sendLedStatusToNode(ledManager.getRawLedStatus());
            self.sendModeToNode(ledManager.getMode());

            _intervalId = setInterval(() => {
                self.loop();
            }, INTERVAL);

            console.log('Loop started');
        } else {
            console.log('The loop is already running');
        }
    }

    stop() {
        let self = this;

        if (_intervalId) {
            _lastLedStatus = ledManager.getRawLedStatus();
            _lastButtonStatus = ledManager.getAllButtonStatus();
            ledManager.resetAll();

            clearInterval(_intervalId);
            _intervalId = null;

            self.sendModeToNode(modeEnum.NONE);
            self.sendResetToNode();

            console.log('Loop stopped');
        } else {
            console.log('The loop is already stopped');
        }
    }

    sendLedStatusToNode(ledData) {
        // console.log(ledData);
        NODES.forEach(node => {
            try {
                networkMrg.ledStatus(node.Host, ledData);
            } catch (error) {
                console.error(error);
            }
        });
    }

    sendResetToNode() {
        ledManager.resetAll();
        NODES.forEach(node => {
            try {
                // console.log(`sendResetToNode host: ${node.Host}`);
                networkMrg.ledReset(node.Host);
            } catch (error) {
                console.error(error);
            }
        });
    }

    sendModeToNode(mode) {
        NODES.forEach(node => {
            try {
                // console.log(`sendModeToNode host: ${node.Host}`);
                networkMrg.changeMode(node.Host, mode);
            } catch (error) {
                console.error(error);
            }
        });
    }

    setLed(x, y, color) {
        if (_intervalId == null) return;

        ledManager.setLed(x, y, color);
    }

    triggerButton(x, y) {
        if (_intervalId == null) return;

        let status = ledManager.getButtonStatus(x, y);
        let changeTo = status == 1 ? 0 : 1;
        ledManager.setButtonStatus(x, y, changeTo);


    }

    changeMode(mode, options) {
        options = options || {};
        options.sendToNode = options.sendToNode == undefined ? true : options.sendToNode;

        if (_changeModeLocked) {
            return;
        }

        _changeModeLocked = true;

        ledManager.resetAll();
        if (options.sendToNode) {
            this.sendModeToNode(mode);
        }

        switch (mode) {
            case modeEnum.NONE:
                console.log('Change to None mode.');
                _currentTask = this.runNoneMode;
                _changeModeLocked = false;
                break;

            case modeEnum.FREE:
                console.log('Change to Free mode.');
                _currentTask = this.runFreeMode;
                _changeModeLocked = false;
                break;

            case modeEnum.ART:
                console.log('Change to Art mode.');

                let loadImages = [];
                for (let i = 0; i < config.MAX_ART_IMAGE; i++) {
                    let filePath = `./res/images/${config.ArtImagePrefix}${i}.jpg`;
                    loadImages.push(Jimp.read(filePath));
                }

                _art.data = [];
                Promise.all(loadImages).then((values) => {
                    values.forEach(image => {
                        let data = utils.jimpImageToLedStatus(image);
                        _art.data.push(data);
                    });
                }).then(() => {
                    _art.index = 0;
                    _art.length = _art.data.length;
                    _changeModeLocked = false;
                });

                _currentTask = this.runArtMode;
                break;

            case modeEnum.BLOCKLY:
                console.log('Change to Blockly mode.');
                _currentTask = this.runBlockyMode;
                _changeModeLocked = false;
                break;

            case modeEnum.DEMO:
                console.log('Change to DEMO mode.');
                _currentTask = this.runDemoMode;
                _changeModeLocked = false;
                break;

            default:
                _currentTask = null;
                _changeModeLocked = false;
                console.error(`Set mode failed. There is no mode: ${mode}`);
                break;
        }
    }

    setDemoNode(nodeIndex) {
        if (nodeIndex === undefined || isNaN(nodeIndex)) {
            nodeIndex == null;
        }

        if (nodeIndex >= constValue.NodeCount) {
            nodeIndex = null;
        }

        _demoTargetIndex = nodeIndex;
        _demoCurrentIndex = nodeIndex === undefined ? 0 : nodeIndex;
    }

    backToIdle() {
        let mode = ledManager.getMode();
        if (mode == nodeEnum.ART) {
            return;
        }
        if (mode == nodeEnum.FREE) {
            ledManager.setMode(modeEnum.ART);
            this.changeMode(modeEnum.ART);
            this.sendResetToNode();
        }
    }
}

module.exports = new Runner();
