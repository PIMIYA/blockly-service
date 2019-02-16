const Color = require('./color');

class Utils {
    constructor() {
        let colors = new Color();
        this.orderedColors = [
            colors.BLACK,
            colors.WHITE,
            colors.RED,
            colors.ORANGE,
            colors.YELLOW,
            colors.GREEN,
            colors.BLUE,
            colors.INDIGO,
            colors.PURPLE,
        ];
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgb2Int(r, g, b) {
        return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
    }

    rgb2Hex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    colorWheel(pos) {
        pos = 255 - pos;
        if (pos < 85) {
            return this.rgb2Hex(255 - pos * 3, 0, pos * 3);
        } else if (pos < 170) {
            pos -= 85;
            return this.rgb2Hex(0, pos * 3, 255 - pos * 3);
        } else {
            pos -= 170;
            return this.rgb2Hex(pos * 3, 255 - pos * 3, 0);
        }
    }

    dumpLed(led, removeComma) {
        removeComma = (typeof removeComma === 'undefined') ? true : false;
        led.forEach(element => {
            console.log(removeComma ?
                element.toString().replace(/,+/g, '') :
                element.toString());
        });
    }

    /**
     * Get next color
     * @param {string} currentColo Hex string of color.
     * @returns {string} Next hex string of color
     */
    nextColor(currentColor) {
        let index = this.orderedColors.indexOf(currentColor);
        index = ++index % this.orderedColors.length;
        return this.orderedColors[index];
    }

    /**
     *
     * @param {string} colorHex
     * @returns {number}
     */
    hexToNumber(colorHex) {
        colorHex = `0x${colorHex.substr(1)}`;
        let components = {
            r: (colorHex & 0xff0000),
            g: (colorHex & 0x00ff00),
            b: (colorHex & 0x0000ff)
        };
        return components.r + components.g + components.b;
    }

    /**
     *
     * @param {Array<string>} data
     * @returns {Uint32Array}
     */
    hexToUint32Array(data) {
        let result = new Uint32Array(data.length);
        data.forEach((element, index) => {
            result[index] = this.hexToNumber(element);
        });

        return result;
    }
}

module.exports = new Utils();
