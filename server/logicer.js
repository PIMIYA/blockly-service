const config = require('./config');
const constValue = require('./common/constValue');
const ledManager = require('./common/ledManager');

function run() {
    if (ledManager.getButtonStatus(1, 1) != 0) {
        console.log('button 1, 1 enable');
    } else {
        console.log('button 1, 1 disable');
    }
}


class Logicer {
    doRun() {
        run();
    }
}
module.exports = new Logicer();
