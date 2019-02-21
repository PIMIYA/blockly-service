const Jimp = require('jimp');
const Dict = require('./dict');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    // let fontPath = './images/font.fnt';

    // let img = await new Jimp(78, 18, '#ffffff');

    // new Jimp(img, async (err, image) => {
    //     const font = await Jimp.loadFont(fontPath);
    //     image.print(font, 0, 0, 'ABC');
    //     await image.writeAsync('./test.png');
    // });

    // new Jimp(img, async (err, image) => {
    //     await image.setPixelColor(Jimp.rgbaToInt(255, 0, 0, 255), 0, 0);
    //     await image.writeAsync('./test2.png');
    // });

    console.log(1);
    let img = await Jimp.read('./test.png');
    console.log(2);
    await sleep(500);
    console.log(3);

    let dict = new Dict();
    dict.add(1, {
        x: 1
    });
    console.log(dict.get(1));

}

run();
