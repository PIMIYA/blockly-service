const ws281x = require('rpi-ws281x-native');
const {
    createCanvas,
    loadImage
} = require('canvas');

const canvas = createCanvas(8, 8);
const ctx = canvas.getContext('2d');
const canvasExtension = require('./extensions/canvas-extension');
const wait = ms => new Promise(r => setTimeout(r, ms));
const repeat = (ms, func) => new Promise(r => (setInterval(func, ms), wait(ms).then(r)));

canvas.toUint32Array = canvasExtension.toUint32Array.bind(null, canvas);
ws281x.init(64);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () {
        process.exit(0);
    });
});


let loadImages = [];
for (let i = 0; i < 8; i++) {
    let filePath = `./images/block-${i}.jpg`;
    loadImages.push(loadImage(filePath));
}
let artImages = [];
Promise.all(loadImages).then((values) => {
    console.log(values.length);
    values.forEach(image => {
        ctx.drawImage(image, 0, 0, 8, 8);
        artImages.push(canvas.toUint32Array().slice());
    });
}).then(() => {
    let imageCount = artImages.length;
    let imageIndex = 0;
    repeat(100, () => {
        let image = artImages[imageIndex];
        ws281x.render(image);
        imageIndex = ++imageIndex % imageCount;
    });
    console.log('Press <ctrl>+C to exit.');
});
