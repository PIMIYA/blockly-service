const constValue = require('../common/constValue');
const ledManager = require('../common/ledManager');
const config = require('../config');
const runtimeValue = require('../runtimeValue');

function run() {
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

module.exports = {
    run: run
};
