const axios = require('axios');

class HttpRequest {
    constructor(timeout) {
        this.timeout = timeout || 1000;
    }

    Get(url, callback) {
        let config = {};
        config.timeout = this.timeout;

        axios.get(url, config)
            .then(function (response) {
                if (callback) callback(null, response);
            })
            .catch(function (error) {
                if (callback) callback(error);
            });
    }

    Post(url, params, callback) {
        let config = {};
        config.timeout = this.timeout;

        axios.post(url, params, config)
            .then(function (response) {
                if (callback) callback(null, response);
            })
            .catch(function (error) {
                if (callback) callback(error);
            });
    }

    Delete(url, params, callback) {
        let config = {};
        config.timeout = this.timeout;

        if (callback == undefined) {
            callback = params;
            params = {};
        }

        axios.delete(url, params)
            .then(function (response) {
                if (callback) callback(null, response);
            })
            .catch(function (error) {
                if (callback) callback(error);
            });
    }
}

module.exports = new HttpRequest();
