import Blockly from 'blockly';
import { currentToolboxName } from '../../App.js';
var peripherals = null;

async function getPeripherals(){
    if (currentToolboxName === "Basic"){
        peripherals = await import('./../peripherals/arduino_peripheral.js')
        console.log("Imported Basic")
    }
    else if (currentToolboxName === "Mello"){
        peripherals = await import('./../MelloBlocksGen.js')
    }
}


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
    },

};

Blockly.JavaScript['n_mainloop'] = function(block) {
    getPeripherals();
    var statements_mainloop = Blockly.JavaScript.statementToCode(block, 'mainLoop');
    try{
        Total_PreDeclarations += peripherals.peripheral_PreDeclarations;
        Total_SetupCode +=peripherals.peripheral_SetupCode;
        Total_BulkFunctions += peripherals.peripheral_BulkFunctions;
    }
    catch(e){
        console.log(e)
    }

    var code = Total_PreDeclarations + Total_SetupCode +'}\nvoid loop(){\n'+ statements_mainloop + '}\n' + Total_BulkFunctions;
    // console.log(Total_PreDeclarations);
    Total_PreDeclarations = "";
    Total_SetupCode = "\nvoid setup(){\n";
    Total_BulkFunctions = "";
    try{
        peripherals.clearvars();
    }
    catch(e){
        console.log(e);
    }
    
    return code;
};