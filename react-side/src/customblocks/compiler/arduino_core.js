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
    this.appendDummyInput()
          .appendField("Run Forever")
          .appendField(new Blockly.FieldCheckbox("TRUE"),"LOOP");
      this.appendStatementInput("mainLoop")
          .setCheck(null);
      this.setColour(135);
    this.setTooltip("The Main Loop of the program.");
    this.setHelpUrl("");
    },

};

Blockly.Blocks['n_delay'] = {
    init: function() {
      this.appendValueInput("seconds")
          .setCheck("Number")
          .appendField("delay for");
      this.appendDummyInput()
          .appendField("milliseconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(240);
   this.setTooltip("Delays the program for a number of milliseconds.");
   this.setHelpUrl("");
    }
};

Blockly.JavaScript['n_mainloop'] = function(block) {
    getPeripherals();
    var statements_mainloop = Blockly.JavaScript.statementToCode(block, 'mainLoop');
    var checkbox_loop = block.getFieldValue("LOOP");
    try{
        Total_PreDeclarations += peripherals.peripheral_PreDeclarations;
        Total_SetupCode +=peripherals.peripheral_SetupCode;
        Total_BulkFunctions += peripherals.peripheral_BulkFunctions;
    }
    catch(e){
        console.log(e)
    }
        if (checkbox_loop=="TRUE"){
            var code = `${Total_PreDeclarations} ${Total_SetupCode} \n}\n\nvoid loop(){\n ${statements_mainloop}\n} \n ${Total_BulkFunctions}`;
        }
        else{
            var code = `${Total_PreDeclarations} \nint runOnce;\n ${Total_SetupCode} \nrunOnce = 0;\n}\n\nvoid loop(){\n\tif(runOnce == 0){\n${statements_mainloop}\nrunOnce = 1;}\n}\n${Total_BulkFunctions}`;
        }
    
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



Blockly.JavaScript['n_delay'] = function(block) {
    var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '\ndelay('+value_seconds+');';
    return code;
};