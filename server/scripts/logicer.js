const constValue = require('../common/constValue');
const ledManager = require('../common/ledManager');
const config = require('../config');
const runtimeValue = require('../runtimeValue');

function test1() {
    if (ledManager.getButtonStatus(3, 3) != 0) {
        ledManager.setLed(1, 8, "#ffffff");
        ledManager.setRawLedByMatrixObject({
            "index": 0,
            "value": [
                ["#000000", -1, -1, -1, -1, -1, -1, -1],
                [-1, "#000000", -1, -1, -1, -1, -1, -1],
                [-1, -1, "#000000", -1, -1, -1, -1, -1],
                [-1, -1, -1, "#000000", -1, -1, -1, -1],
                [-1, -1, -1, -1, "#000000", -1, -1, -1],
                [-1, -1, -1, -1, -1, "#000000", -1, -1],
                [-1, -1, -1, -1, -1, -1, "#000000", -1],
                [-1, -1, -1, -1, -1, -1, -1, "#000000"]
            ]
        });
    } else {
        ledManager.setLed(1, 8, "#000000");
        ledManager.setRawLedByMatrixObject({
            "index": 0,
            "value": [
                ["#ff0000", -1, -1, -1, -1, -1, -1, -1],
                [-1, "#ffd306", -1, -1, -1, -1, -1, -1],
                [-1, -1, "#f9f900", -1, -1, -1, -1, -1],
                [-1, -1, -1, "#00db00", -1, -1, -1, -1],
                [-1, -1, -1, -1, "#0000c6", -1, -1, -1],
                [-1, -1, -1, -1, -1, "#00ffff", -1, -1],
                [-1, -1, -1, -1, -1, -1, "#ae00ae", -1],
                [-1, -1, -1, -1, -1, -1, -1, "#ffffff"]
            ]
        });
    }
}

let index = 0;

function test2() {
    index %= 8;
    let file = `./res/images/block-${index++}.jpg`;
    ledManager.renderImage(file);
}

function run() {
    test2()
}

module.exports = {
    run: run
};
