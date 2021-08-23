import Blockly from 'blockly';
import {peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode, peripheral_LoopCode} from './../peripherals/arduino_peripheral.js'

var Total_PreDeclarations = "";
var Total_SetupCode = "void setup(){\n";
var Total_BulkFunctions = "";


Blockly.Blocks['n_mainloop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://www.clipartmax.com/png/full/219-2194283_open-green-flag-sprite.png", 40, 40, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Main Loop");
      this.appendStatementInput("mainLoop")
          .setCheck(null);
      this.setColour(135);
    this.setTooltip("The Main Loop of the program.");
    this.setHelpUrl("");
    }
};

Blockly.JavaScript['n_mainloop'] = function(block) {
    var statements_mainloop = Blockly.JavaScript.statementToCode(block, 'mainLoop');
    // TODO: Assemble JavaScript into code variable.
    Total_PreDeclarations += peripheral_PreDeclarations;
    Total_SetupCode += peripheral_SetupCode;
    Total_BulkFunctions += peripheral_BulkFunctions;
    var code = Total_PreDeclarations + Total_SetupCode +'\n}\nvoid loop(){\n'+ statements_mainloop + peripheral_LoopCode+ '\n}\n' + Total_BulkFunctions;
    //console.log(peripheral_SetupCode);
    Total_PreDeclarations = "";
    Total_SetupCode = "void setup(){\n";
    Total_BulkFunctions = "";
    return code;
};