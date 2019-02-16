const request = require('../common/request');

class NetworkManager {
    constructor() {}

    ledStatus(host, led) {
        // console.log(`ledStatus::Send to ${host}`);
        let url = `${host}/led`;
        request.Post(url, {
            payload: led
        }, (error, response) => {
            if (error) {
                console.error(error.message);
                return;
            }
            // console.log(response.data);
        });
    }

    ledReset(host) {
        // console.log(`ledReset::Send to ${host}`);
        let url = `${host}/led`;
        request.Delete(url, {
            payload: led
        }, (error, response) => {
            if (error) {
                console.error(error.message);
                return;
            }
            // console.log(response.data);
        });
    }
}

module.exports = new NetworkManager();
