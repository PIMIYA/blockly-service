const axios = require('axios');

class HttpRequest {
    constructor() {}

    Get(url, params, callback) {
        axios.get(url, params)
            .then(function (response) {
                if (callback) callback(null, response);
            })
            .catch(function (error) {
                if (callback) callback(error);
            });
    }

    Post(url, params, callback) {
        axios.post(url, params)
            .then(function (response) {
                if (callback) callback(null, response);
            })
            .catch(function (error) {
                if (callback) callback(error);
            });
    }
}

module.exports = new HttpRequest();
