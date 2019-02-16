const _ = require('underscore');
const ws281x = require('rpi-ws281x-native');

const utils = require('./utils');

const SIZE = 64;

ws281x.init(SIZE);

let data = [];
for (let index = 0; index < 8; index++) {
    let tmp = new Array(8);
    for (let l = 0; l < 8; l++)
        tmp[l] = utils.colorWheel((l * 32) % 256);

    if (index % 2 == 1) {
        tmp = tmp.reverse();
    }

    data.push(tmp);
}

console.log(data);
// console.log(_.flatten(data));

let renderData = utils.hexToUint32Array(_.flatten(data)).slice();
ws281x.render(renderData);
