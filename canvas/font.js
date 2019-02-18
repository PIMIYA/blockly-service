const Jimp = require('jimp');

async function run() {
    let imgPath = './images/full-0.jpg';
    let fontPath = './images/font.fnt';

    const nova = await Jimp.read(imgPath);
    const font = await Jimp.loadFont(fontPath);
    nova.print(font, 0, 0, 'ABC');
    nova.writeAsync('./test.png');
}

run();
