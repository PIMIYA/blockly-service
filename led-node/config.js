const constValue = require('./common/constValue');
/**
 * A module that shouts hello!
 * @module config
 */

/**
 * @property {object} config
 * @property {number} config.Index Index of node server.
 * @property {string} config.ServerHost Host of server.
 * @property {number} config.NodeId Id of Node, also index.
 * @property {number} config.Port Port of server listening.
 * @property {number[]} config.BoardsIndex Boards index on node.
 */
let config = {};
/** @type {number} Id of Node, also index. */
config.NodeIndex = null;
/** @type {number} Port of server listening. */
config.Port = 3000;
/** @type {string} Host of server. */
config.ServerHost = 'http://localhost:3000';

/** @type {number[]} Boards index on node. */
config.BoardsIndex = [];
let idx = 0;
for (let row = 0; row < constValue.BoardRow; row++) {
    for (let col = 0; col < constValue.BoardColumn; col++) {
        config.BoardsIndex.push(idx);
        idx++;
    }
}

/**
 * Set the id of node server.
 * @memberof config.UpdateId
 * @method UpdateId
 * @param {number} index Index of node server.
 */
config.SetIndex = function (index) {
    this.NodeIndex = index;
    this.BoardsIndex = [];
    let idx = 0;
    for (let row = 0; row < constValue.BoardRow; row++) {
        for (let col = 0; col < constValue.BoardColumn; col++) {
            this.BoardsIndex.push(idx);
            idx++;
        }
    }
};

config.SetServerHost = function (host) {
    this.ServerHost = host;
}

module.exports = config;
