const config = require('./config');
const constValue = require('../common/constValue');
const ledManager = require('../common/ledManager');

function run() {
    console.log('run...');
    // ledManager.marqueeLed();
    // if (ledManager.isLedEnabled(1, 1)) {
    //     ledManager.setLed(2, 1, 1);
    // }
}

class Logicer {
    doRun() {
        console.log('Running logicer...');
        // ledManager.resetAll();
        run();
    }
}

module.exports = new Logicer();
