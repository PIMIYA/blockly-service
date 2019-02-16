const Jimp = require('jimp');

const LedNode = require('../common/modules/LedNode');

const modeEnum = require('../common/modeEnum');
const utils = require('../common/utils');
const ledManager = require('../common/ledManager');

const config = require('./config');
const logicer = require('./logicer');
const networkMrg = require('./networkManager');

const INTERVAL = 60;
/** @type {LedNode[]} */
const NODES = config.Nodes;

let _intervalId = null;
let _locked = false;
let _currentTask = null;

let _art = {
    index: 0,
    length: 0,
    data: [],
};

class Runner {
    constructor() {}

    loop() {
        if (_currentTask == null) {
            // console.warn('No task now.');
            return;
        }

        if (_locked) {
            return;
        }

        _locked = true;
        _currentTask();
        _locked = false;
    }

    runFreeMode() {
        // console.log('Free mode running...');
        // do nothing...
    }

    runArtMode() {
        // console.log('Art mode running...');

        /** @type {Array<Array<string>>} */
        let currentData = _art.data[_art.index];
        NODES.forEach(node => {
            try {
                ledManager.setRawLedStatus(currentData);
                networkMrg.ledStatus(node.Host, currentData);
            } catch (error) {
                console.error(error);
            }
        });

        _art.index = ++_art.index % _art.length;
    }

    runBlockyMode() {
        // console.log('Blockly mode running...');

        logicer.doRun();
        NODES.forEach(node => {
            try {
                networkMrg.ledStatus(node.Host, ledManager.getRawLedStatus());
            } catch (error) {
                console.error(error);
            }
        });
    }

    start() {
        console.log('Start loop');
        logicer.doRun();
        _intervalId = setInterval(this.loop, INTERVAL);
    }

    stop() {
        if (_intervalId) {
            clearInterval(_intervalId);
        }
        console.log('Stop loop');
    }

    changeMode(mode, options) {
        options = options || {};

        _locked = true;

        ledManager.resetAll();
        switch (mode) {
            case modeEnum.FREE:
                console.log('Change to Free mode.');
                _currentTask = this.runFreeMode;
                _locked = false;
                break;

            case modeEnum.ART:
                console.log('Change to Art mode.');

                let loadImages = [];
                for (let i = 0; i < 6; i++) {
                    let filePath = `./res/images/full-${i}.jpg`;
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
                    _locked = false;
                });

                _currentTask = this.runArtMode;
                break;

            case modeEnum.BLOCKLY:
                console.log('Change to Blockly mode.');
                _currentTask = this.runBlockyMode;
                _locked = false;
                break;

            default:
                _currentTask = null;
                console.error(`Set mode failed. There is node mode: ${mode}`);
                break;
        }
    }
}

module.exports = new Runner();
