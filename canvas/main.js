const ws281x = require('rpi-ws281x-native');
const Jimp = require('jimp');

const wait = ms => new Promise(r => setTimeout(r, ms));
const repeat = (ms, func) => new Promise(r => (setInterval(func, ms), wait(ms).then(r)));

const utils = require('./utils');

const SIZE = 64;
ws281x.init(SIZE);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () {
        process.exit(0);
    });
});


let loadImages = [];
for (let i = 0; i < 6; i++) {
    let filePath = `./images/full-${i}.jpg`;
    loadImages.push(Jimp.read(filePath));
}
let artImages = [];
Promise.all(loadImages).then((values) => {
    // console.log(values.length);
    values.forEach(image => {
        let tmp = [];
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            var r = this.bitmap.data[idx + 0];
            var g = this.bitmap.data[idx + 1];
            var b = this.bitmap.data[idx + 2];
            // console.log(`${x}, ${y}: ${r} ${g} ${b}`);
            tmp.push(utils.rgb2Hex(r, g, b));
        });

        artImages.push(tmp.slice());
    });
}).then(() => {
    let imageCount = artImages.length;
    let imageIndex = 0;

    repeat(100, () => {
        let image = artImages[imageIndex];
        let renderData = utils.hexToUint32Array(image);
        ws281x.render(renderData.slice(0, SIZE));
        imageIndex = ++imageIndex % imageCount;
    });

    console.log('Press <ctrl>+C to exit.');
});
