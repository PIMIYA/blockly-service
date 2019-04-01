class Debug {
    constructor() {
        this.logs = [];
        this.maxLog = 100;
    }

    /**
     * 
     * @param {string} mgs 
     */
    log(mgs) {
        this.logs.push(mgs);
        if (this.logs.length > this.maxLog) {
            this.logs.shift();
        }
    }
}

let _debug;
if (!_debug) {
    _debug = new Debug();
}

module.exports = _debug;
