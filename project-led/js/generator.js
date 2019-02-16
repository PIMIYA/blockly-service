'use strict';

goog.require('Blockly.JavaScript');

Blockly.JavaScript['led_matrix_input'] = function (block) {
    var index_matrix = block.getFieldValue('matrix');
    var value_led_matrix_ = Blockly.JavaScript.valueToCode(block, 'led_matrix_', Blockly.JavaScript.ORDER_MEMBER);
    value_led_matrix_ = value_led_matrix_ ? JSON.parse(value_led_matrix_) : null;

    if (!value_led_matrix_) {
        return '';
    }

    var obj = {
        type: 'matrix',
        index: parseInt(index_matrix),
        value: value_led_matrix_
    };
    var output = JSON.stringify(obj);

    var code = 'ledManager.setRawLedByMatrixObject(' + output + ');\n';
    return code;
};

Blockly.JavaScript['led_6x6'] = function (block) {
    var led1_1 = utils.getColorIndex(block.getFieldValue('led1_1'));
    var led1_2 = utils.getColorIndex(block.getFieldValue('led1_2'));
    var led1_3 = utils.getColorIndex(block.getFieldValue('led1_3'));
    var led1_4 = utils.getColorIndex(block.getFieldValue('led1_4'));
    var led1_5 = utils.getColorIndex(block.getFieldValue('led1_5'));
    var led1_6 = utils.getColorIndex(block.getFieldValue('led1_6'));

    var led2_1 = utils.getColorIndex(block.getFieldValue('led2_1'));
    var led2_2 = utils.getColorIndex(block.getFieldValue('led2_2'));
    var led2_3 = utils.getColorIndex(block.getFieldValue('led2_3'));
    var led2_4 = utils.getColorIndex(block.getFieldValue('led2_4'));
    var led2_5 = utils.getColorIndex(block.getFieldValue('led2_5'));
    var led2_6 = utils.getColorIndex(block.getFieldValue('led2_6'));

    var led3_1 = utils.getColorIndex(block.getFieldValue('led3_1'));
    var led3_2 = utils.getColorIndex(block.getFieldValue('led3_2'));
    var led3_3 = utils.getColorIndex(block.getFieldValue('led3_3'));
    var led3_4 = utils.getColorIndex(block.getFieldValue('led3_4'));
    var led3_5 = utils.getColorIndex(block.getFieldValue('led3_5'));
    var led3_6 = utils.getColorIndex(block.getFieldValue('led3_6'));

    var led4_1 = utils.getColorIndex(block.getFieldValue('led4_1'));
    var led4_2 = utils.getColorIndex(block.getFieldValue('led4_2'));
    var led4_3 = utils.getColorIndex(block.getFieldValue('led4_3'));
    var led4_4 = utils.getColorIndex(block.getFieldValue('led4_4'));
    var led4_5 = utils.getColorIndex(block.getFieldValue('led4_5'));
    var led4_6 = utils.getColorIndex(block.getFieldValue('led4_6'));

    var led5_1 = utils.getColorIndex(block.getFieldValue('led5_1'));
    var led5_2 = utils.getColorIndex(block.getFieldValue('led5_2'));
    var led5_3 = utils.getColorIndex(block.getFieldValue('led5_3'));
    var led5_4 = utils.getColorIndex(block.getFieldValue('led5_4'));
    var led5_5 = utils.getColorIndex(block.getFieldValue('led5_5'));
    var led5_6 = utils.getColorIndex(block.getFieldValue('led5_6'));

    var led6_1 = utils.getColorIndex(block.getFieldValue('led6_1'));
    var led6_2 = utils.getColorIndex(block.getFieldValue('led6_2'));
    var led6_3 = utils.getColorIndex(block.getFieldValue('led6_3'));
    var led6_4 = utils.getColorIndex(block.getFieldValue('led6_4'));
    var led6_5 = utils.getColorIndex(block.getFieldValue('led6_5'));
    var led6_6 = utils.getColorIndex(block.getFieldValue('led6_6'));

    var led1 = [led1_1, led1_2, led1_3, led1_4, led1_5, led1_6];
    var led2 = [led2_1, led2_2, led2_3, led2_4, led2_5, led2_6];
    var led3 = [led3_1, led3_2, led3_3, led3_4, led3_5, led3_6];
    var led4 = [led4_1, led4_2, led4_3, led4_4, led4_5, led4_6];
    var led5 = [led5_1, led5_2, led5_3, led5_4, led5_5, led5_6];
    var led6 = [led6_1, led6_2, led6_3, led6_4, led6_5, led6_6];

    var code = JSON.stringify([led1, led2, led3, led4, led5, led6]);
    // console.log(code);

    return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['set_led'] = function (block) {
    var number_x = block.getFieldValue('x');
    var number_y = block.getFieldValue('y');
    var colour_led_clr = block.getFieldValue('led_clr');

    // var obj = {
    //     type: 'single',
    //     x: parseInt(number_x),
    //     y: parseInt(number_y),
    //     value: utils.getColorIndex(colour_led_clr)
    // };

    var code = 'ledManager.setLed(' +
        number_x + ',' +
        number_y + ',' +
        utils.getColorIndex(colour_led_clr) + ');\n';
    return code;
};

Blockly.JavaScript['led_enabled'] = function (block) {
    // var variable_led_enabled = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('led_enabled'), Blockly.Variables.NAME_TYPE);
    var number_x = block.getFieldValue('x');
    var number_y = block.getFieldValue('y');
    var code = 'ledManager.isLedEnabled(' + number_x + ',' + number_y + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['led_color'] = function (block) {
    var number_x = block.getFieldValue('x');
    var number_y = block.getFieldValue('y');
    var code = 'ledManager.ledColor(' + number_x + ',' + number_y + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['button_status'] = function (block) {
    var number_x = block.getFieldValue('x');
    var number_y = block.getFieldValue('y');
    var code = 'ledManager.buttonStatus(' + number_x + ',' + number_y + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};