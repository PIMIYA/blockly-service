const Jimp = require('jimp');

async function run() {
    let fontPath = './images/font.fnt';

    let img = await new Jimp(78, 18, '#ffffff');

    new Jimp(img, async (err, image) => {
        const font = await Jimp.loadFont(fontPath);
        image.print(font, 0, 0, 'ABC');
        await image.writeAsync('./test.png');
    });

    new Jimp(img, async (err, image) => {
        await image.setPixelColor(Jimp.rgbaToInt(255, 0, 0, 255), 0, 0);
        await image.writeAsync('./test2.png');
    });
}

run();
