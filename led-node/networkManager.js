const request = require('./common/request');

class NetworkManager {
    constructor() {}

    /**
     *
     * @param {string} host Server host
     * @param {number} x
     * @param {number} y
     * @param {string} color Hex string of color
     */
    changeLedColor(host, x, y, color) {
        // console.log(host, x, y, color);
        let url = `${host}/api/led`;
        request.Post(url, {
            x: x,
            y: y,
            color: color
        }, (error, response) => {
            if (error) {
                console.error(error.message);
                return;
            }
        });
    }

    /**
     *
     * @param {string} host Server host
     * @param {number} x
     * @param {number} y
     */
    triggerButton(host, x, y) {
        // console.log(host, x, y);
        let url = `${host}/api/button`;
        request.Post(url, {
            x: x,
            y: y
        }, (error, response) => {
            if (error) {
                console.error(error.message);
                return;
            }
        });
    }

    getServerMode(host, cb) {
        let url = `${host}/api/mode`;
        request.Get(url, (error, response) => {
            if (error) {
                console.error(error.message);
                return;
            }

            if (cb) cb(response.data);
        });
    }

    // ========== DEBUG information ==========
    /**
     *
     * @param {string} host Server host
     * @param {number} nodeIndex Index of node
     * @param {number} x X of board(row)
     * @param {number} y Y of board(column)
     * @param {function} cb Function(response) { }
     */
    sendButtonEvent(host, nodeIndex, x, y, cb) {
        let url = `${host}/api/debug/buttonEvent`;
        request.Post(url, {
            nodeIndex: nodeIndex,
            x: x,
            y: y
        }, (error, response) => {
            if (error) {
                console.error(error.message);
                return;
            }

            if (cb) cb(response.data);
        });
    }
}

module.exports = new NetworkManager();
