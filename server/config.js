const LedNode = require('./common/modules/LedNode');
const constValue = require('./common/constValue');

/**
 * A module that shouts hello!
 * @module config
 */

/**
 * @property {object} config
 * @property {number} config.port Port of server
 * @property {LedNode[]} config.nodes Node class
 */
let config = {};
/** @type {number} Port of server */
config.Port = 3000;
/** @type {string} Resource path */
config.ResourcePath = './public/images';
/** @type {number} Interval of runner */
config.RunnerInterval = 500;
/** @type {LedNode[]} */
config.Nodes = [];
for (let i = 0; i < constValue.NodeCount; i++) {
    let node = new LedNode();
    node.Index = i;
    let nodeIP = 100 + i;
    node.Host = `http://192.168.1.${nodeIP}:3000`;
    node.BoardsIndex = [];
    let idx = 0;
    for (let row = 0; row < constValue.BoardRow; row++) {
        for (let col = 0; col < constValue.BoardColumn; col++) {
            node.BoardsIndex.push(idx);
            idx++;
        }
    }

    // TODO: TEST
    node.Host = 'http://192.168.1.114:3000';

    config.Nodes.push(node);
}

module.exports = config;
