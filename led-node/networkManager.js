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
}

module.exports = new NetworkManager();
