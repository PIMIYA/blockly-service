var utils = {};

utils.NONE_COLOR = '#adadad'; // no change
utils.COLOR_BLACK_0 = '#000000';
utils.COLOR_WHITE_1 = '#ffffff';
utils.COLOR_RED_2 = '#ff0000';
utils.COLOR_ORANGE_3 = '#ffd306';
utils.COLOR_YELLOW_4 = '#f9f900';
utils.COLOR_GREEN_5 = '#00db00';
utils.COLOR_BLUE_6 = '#0000c6';
utils.COLOR_INDIGO_7 = '#00ffff';
utils.COLOR_PURPLE_8 = '#ae00ae';

utils.getColorIndex = function (color) {
    return color;
    // 直接改用 hex string
    switch (color) {
        case utils.COLOR_BLACK_0:
            return 0;
        case utils.COLOR_WHITE_1:
            return 1;
        case utils.COLOR_RED_2:
            return 2;
        case utils.COLOR_ORANGE_3:
            return 3;
        case utils.COLOR_YELLOW_4:
            return 4;
        case utils.COLOR_GREEN_5:
            return 5;
        case utils.COLOR_BLUE_6:
            return 6;
        case utils.COLOR_INDIGO_7:
            return 7;
        case utils.COLOR_PURPLE_8:
            return 8;

        default:
            return -1;
    }
};
