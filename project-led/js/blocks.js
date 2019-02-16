Blockly.FieldColour.COLOURS = [
    utils.NONE_COLOR,
    utils.COLOR_BLACK_0,
    utils.COLOR_WHITE_1,
    utils.COLOR_RED_2,
    utils.COLOR_ORANGE_3,
    utils.COLOR_YELLOW_4,
    utils.COLOR_GREEN_5,
    utils.COLOR_BLUE_6,
    utils.COLOR_INDIGO_7,
    utils.COLOR_PURPLE_8,
];
Blockly.FieldColour.COLUMNS = 3;

Blockly.Blocks['led_matrix_input'] = {
    init: function () {
        this.appendValueInput("led_matrix_")
            // .appendField(new Blockly.FieldVariable("matrix"), "matrix_var")
            .appendField("Set LED matrix")
            .appendField(new Blockly.FieldDropdown([
                ["1", "0"],
                ["2", "1"],
                ["3", "2"],
                ["4", "3"],
                ["5", "4"],
                ["6", "5"],
                ["7", "6"],
                ["8", "7"],
                ["9", "8"],
                ["10", "9"],
                ["11", "10"],
                ["12", "11"],
                ["13", "12"],
                ["14", "13"],
                ["15", "14"],
                ["16", "15"],
                ["17", "16"],
                ["18", "17"],
                ["19", "18"],
                ["20", "19"],
                ["21", "20"],
                ["22", "21"],
                ["23", "22"],
                ["24", "23"],
                ["25", "24"],
                ["26", "25"],
                ["27", "26"],
                ["28", "27"],
                ["29", "28"],
                ["30", "29"],
                ["31", "30"],
                ["32", "31"],
                ["33", "32"],
                ["34", "33"],
                ["35", "34"],
                ["36", "35"],
                ["37", "36"],
                ["38", "37"],
                ["39", "38"],
            ]), "matrix")
            .setCheck("led_6x6");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['led_6x6'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led1_1')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led1_2')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led1_3')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led1_4')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led1_5')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led1_6');
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led2_1')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led2_2')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led2_3')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led2_4')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led2_5')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led2_6');
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led3_1')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led3_2')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led3_3')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led3_4')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led3_5')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led3_6');
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led4_1')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led4_2')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led4_3')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led4_4')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led4_5')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led4_6');
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led5_1')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led5_2')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led5_3')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led5_4')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led5_5')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led5_6');
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led6_1')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led6_2')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led6_3')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led6_4')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led6_5')
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), 'led6_6');
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("灰色表示不變更當前顏色");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set LED ( X:")
            .appendField(new Blockly.FieldNumber(1, 1, 18), "x")
            .appendField(", Y:")
            .appendField(new Blockly.FieldNumber(1, 1, 78), "y")
            .appendField(")")
            .appendField(new Blockly.FieldColour(utils.NONE_COLOR), "led_clr");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(150);
        this.setTooltip("x: [1~18], y: [1~78]");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['led_enabled'] = {
    init: function () {
        this.appendDummyInput()
            // .appendField(new Blockly.FieldVariable("led_enabled"), "led_enabled")
            .appendField("Led ( X:")
            .appendField(new Blockly.FieldNumber(1, 1, 18), "x")
            .appendField(", Y:")
            .appendField(new Blockly.FieldNumber(1, 1, 78), "y")
            .appendField(") is enabled");
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setTooltip("x: [1~18], y: [1~78]");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['led_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Led Color: ( X:")
            .appendField(new Blockly.FieldNumber(1, 1, 18), "x")
            .appendField(", Y:")
            .appendField(new Blockly.FieldNumber(1, 1, 78), "y")
            .appendField(")");
        this.setOutput(true, "Number");
        this.setColour(210);
        this.setTooltip("x: [1~18], y: [1~78]");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['led_78x18'] = {
    init: function () {
        for (let x = 1; x <= 18; x++) {
            var block = this.appendDummyInput();
            for (let y = 1; y <= 78; y++) {
                block.appendField(new Blockly.FieldColour(utils.NONE_COLOR), `led${x}_${y}`);
            }
        }

        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("灰色表示不變更當前顏色");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['button_status'] = {
    init: function () {
        this.appendDummyInput()
            // .appendField(new Blockly.FieldVariable("led_enabled"), "led_enabled")
            .appendField("Button ( X:")
            .appendField(new Blockly.FieldNumber(1, 1, 18), "x")
            .appendField(", Y:")
            .appendField(new Blockly.FieldNumber(1, 1, 78), "y")
            .appendField(") is enabled");
        this.setOutput(true, "Boolean");
        this.setColour(325);
        this.setTooltip("x: [1~18], y: [1~78]");
        this.setHelpUrl("");
    }
};