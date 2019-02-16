const _ = require('underscore');

const LedPosition = require('./modules/LedPosition');
const constValue = require('./constValue');

class Utils {
    constructor() {
        this.orderedColors = [
            constValue.Colors.BLACK,
            constValue.Colors.WHITE,
            constValue.Colors.RED,
            constValue.Colors.ORANGE,
            constValue.Colors.YELLOW,
            constValue.Colors.GREEN,
            constValue.Colors.BLUE,
            constValue.Colors.INDIGO,
            constValue.Colors.PURPLE,
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

    /**
     *
     * @param {number} nodeIndex
     * @param {number} x
     * @param {number} y
     * @returns {LedPosition}
     */
    nodePosTolMainPos(nodeIndex, x, y) {
        if (nodeIndex === undefined || x === undefined || y === undefined) {
            return;
        }

        let pos = new LedPosition();
        pos.BoardRow = x;
        pos.BoardColumn = y;

        let nodeX = Math.floor(nodeIndex / constValue.NodeRow);
        let nodeY = nodeIndex % constValue.NodeColumn;

        let orgX = nodeX * constValue.BoardLedHeight;
        let orgY = nodeY * constValue.BoardLedWidth;
        pos.Row = orgX + x;
        pos.Column = orgY + y;

        return pos;
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

    /************************************************************************+*/

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

    dumpLed(led, ledHeight, removeComma) {
        removeComma = (typeof removeComma === 'undefined') ? true : false;
        let rowIndex = 0;
        led.forEach(element => {
            console.log(removeComma ?
                element.toString().replace(/,+/g, '') :
                element.toString());
            rowIndex++;
            if (rowIndex % ledHeight == 0) {
                console.log('~~~');
            }
        });
    }

    rainbowLed(w, h) {
        let c = w * h;
        let led = [];
        for (let index = 0; index < c; index++) {
            led.push(this.colorWheel(index % 256));
        }

        return _.chunk(led, constValue.TotalLedWidth);
    }

    iterateLed(w, h) {
        let c = w * h;
        let led = [];
        for (let index = 0; index < c; index++) {
            let a = Math.floor(index / constValue.BoardLedWidth);
            let b = a % constValue.NodeColumn;
            let c = Math.floor(a / constValue.TotalLedHeight);
            let clr = b + c * constValue.NodeColumn;
            led.push('#' + `${clr}`.padStart(6, '0'));
        }
        return _.chunk(led, constValue.TotalLedWidth);
    }
}

module.exports = new Utils();
