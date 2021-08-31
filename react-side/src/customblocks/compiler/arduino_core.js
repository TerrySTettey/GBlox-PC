import Blockly from 'blockly';
import { currentToolboxName, variables_created } from '../../App.js';
var peripherals = null;
var variables_set = [["int sample_var", "Test"]];
async function getPeripherals(){
    if (currentToolboxName === "Basic"){
        peripherals = await import('./../peripherals/arduino_peripheral.js')
    }
    else if (currentToolboxName === "Mello"){
        peripherals = await import('./../MelloBlocksGen.js')
    }
}

function dynamicVariables(new_var){
    // console.log(variables_set.includes(new_var));
    if (variables_set.includes(new_var) == 0) {
        variables_set.push(new_var);
        console.log(typeof new_var);
    }
    return variables_set;
    
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

Blockly.Blocks['communication_serial_print'] = {
    init: function() {
      this.appendValueInput("Serial_Print")
          .setCheck(null)
          .appendField("Print");
      this.appendDummyInput()
          .appendField(" to Serial Monitor");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['communication_serial_read'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Read From Serial Monitor");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['variable_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Set Variable")
          .appendField(new Blockly.FieldDropdown(variables_set),`variables_set`);
      this.appendValueInput("value")
          .setCheck(["Number", "String"])
          .appendField("to");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['variable_get'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Get Variable")
          .appendField(new Blockly.FieldDropdown(variables_set),`variables_set`)
          .appendField("'s value");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['variable_create_variable'] = {
    init: function() {
      this.appendValueInput("varname")
          .setCheck(null)
          .appendField("Create")
          .appendField(new Blockly.FieldDropdown([["Float","float"], ["Integer","int"], ["Character","char"], ["String","char[]"]]), "variable type")
          .appendField("Variable named");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  
//   Blockly.Blocks['variable_create_int'] = {
//     init: function() {
//       this.appendDummyInput()
//           .appendField("Create Integer Variable")
//           .appendField(new Blockly.FieldTextInput("var_name"), "varname");
//       this.setInputsInline(true);
//       this.setPreviousStatement(true, null);
//       this.setNextStatement(true, null);
//       this.setColour(230);
//    this.setTooltip("");
//    this.setHelpUrl("");
//     }
//   };
  
//   Blockly.Blocks['variable_create_float'] = {
//     init: function() {
//       this.appendDummyInput()
//           .appendField("Create Float Variable")
//           .appendField(new Blockly.FieldTextInput("var_name"), "varname");
//       this.setInputsInline(true);
//       this.setPreviousStatement(true, null);
//       this.setNextStatement(true, null);
//       this.setColour(230);
//    this.setTooltip("");
//    this.setHelpUrl("");
//     }
//   };
function updatevariables_toolbox(workspace){
    var new_variable = variables_created;
    var xmllist = [];
    if (new_variable !== []){
    var blockText = `<block type="variable_get">
      <field name="variables_set">"Test"</field>
    </block>
    <block type="variable_set">
      <field name="varname">var_name</field>
    </block>`;
    const block = Blockly.Xml.textToDom(blockText);
      xmllist.push(block);
    }
    return xmllist;
}

Blockly.JavaScript['n_mainloop'] = function(block) {
    getPeripherals();
    //Blockly.HSV_SATURATION = 0.75;
    //Blockly.HSV_VALUE = 1;

    block.setDeletable(false);
    block.setMovable(false);
    block.setColour(0x0000FF)
    var statements_mainloop = Blockly.JavaScript.statementToCode(block, 'mainLoop');
    console.log(variables_set)
    console.log(variables_created.length)
    if (variables_created.length != 0){
        variables_set = variables_created;
        for (var i = 0; i < variables_set.length; i++) {
            Total_PreDeclarations += `${variables_set[i][0]};\n`;
            console.log(Total_PreDeclarations)
        }
    }
    var checkbox_loop = block.getFieldValue("LOOP");
    try{
        Total_PreDeclarations += peripherals.peripheral_PreDeclarations;
        Total_SetupCode +=peripherals.peripheral_SetupCode;
        Total_BulkFunctions += peripherals.peripheral_BulkFunctions;
        if (peripherals.IR_Loop != ``){
            statements_mainloop +=`\tif(IrReceiver.decode()){\n\t\t${peripherals.IR_Loop}\nIrReceiver.resume();\n}`;
        }
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
    // var duplicate_number = 0;
    // for (var i=0; i<(variables_set.length); i++){
    //     console.log(variables_set);
    //     console.log(variables_created);
    //         if (variables_set[i][0].includes(variables_created[0])==1){
    //             console.log("Duplicate found");
    //             duplicate_number++;
    //         }
    //     }
    // if (duplicate_number == 0){
    //     variables_set.push(variables_created);
    // }
    // duplicate_number = 0;


    return code;
};



Blockly.JavaScript['n_delay'] = function(block) {
    var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '\ndelay('+value_seconds+');';
    return code;
};

Blockly.JavaScript['communication_serial_print'] = function(block) {
    var value_serial_print = Blockly.JavaScript.valueToCode(block, 'Serial_Print', Blockly.JavaScript.ORDER_ATOMIC);
    value_serial_print = value_serial_print.replaceAll(`'`,``);
    if (Total_SetupCode.includes(`Serial.begin(9600);`) == 0){
        Total_SetupCode += `\tSerial.begin(9600);\n`;
    }
    var code = `\tSerial.println("${value_serial_print}");\n`;
    return code;
  };

  Blockly.JavaScript['communication_serial_read'] = function(block) {
    if (Total_SetupCode.includes(`Serial.begin(9600);`) == 0){
        Total_SetupCode += `\tSerial.begin(9600);\n`;
    }
    var code = `Serial.read()`;
    return code;
  };

  Blockly.JavaScript['variable_set'] = function(block) {
    var text_varname = block.getFieldValue('variables_set');
    console.log(text_varname);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    code = `${text_varname} = ${value_value};\n`
    return code;
  };
  
  Blockly.JavaScript['variable_get'] = function(block) {
    var text_varname = block.getFieldValue('variables_set');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    code = `Value is : ${text_varname}`
    console.log(variables_set);
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
//   Blockly.JavaScript['variable_create_variable'] = function(block) {
//     var dropdown_variable_type = block.getFieldValue('variable type');
//     var text_varname = Blockly.JavaScript.valueToCode(block, 'varname', Blockly.JavaScript.ORDER_ATOMIC);
//     text_varname = text_varname.replaceAll(`'`,'');
//     var code = `${dropdown_variable_type} ${text_varname};\n`
//     if (text_varname !== ""){
//         const temp_var = [`${dropdown_variable_type} ${text_varname}`,`${text_varname}`];
//         var duplicate_number = 0;
//         // console.log(temp_var[0]);
//         // console.log("arr" + variables_set[0][1])
//         for (var i=0; i<(variables_set.length); i++){
//             // console.log(variables_set[i][0].includes(temp_var[0]));
//                 if (variables_set[i][0].includes(temp_var[0])==1){
//                     console.log("Duplicate found");
//                     duplicate_number++;
//                 }
//             }
//         if (duplicate_number == 0){
//             variables_set.push(temp_var);
//         }
//         duplicate_number = 0;

//     }
//     return code;
//   };


//   Blockly.JavaScript['variable_create_int'] = function(block) {
//     var text_varname = block.getFieldValue('varname');
//     // TODO: Assemble JavaScript into code variable.
//     var code = `int ${text_varname};\n`
//     const temp_var = [`int ${text_varname}`,`${text_varname}`];
//     var duplicate_number = 0;
//     // console.log(temp_var[0]);
//     // console.log("arr" + variables_set[0][1])
//     for (var i=0; i<(variables_set.length); i++){
//         // console.log(variables_set[i][0].includes(temp_var[0]));
//             if (variables_set[i][0].includes(temp_var[0])==1){
//                 console.log("Duplicate found");
//                 duplicate_number++;
//             }
//         }
//     if (duplicate_number == 0){
//         variables_set.push(temp_var);
//     }
//     duplicate_number = 0;
//     return code;
//   };
  
//   Blockly.JavaScript['variable_create_float'] = function(block) {
//     var text_varname = block.getFieldValue('varname');
//     // TODO: Assemble JavaScript into code variable.
//     var code = `float ${text_varname};\n`
//     const temp_var = [`float ${text_varname}`,`${text_varname}`];
//     var duplicate_number = 0;
//     // console.log(temp_var[0]);
//     // console.log("arr" + variables_set[0][1])
//     for (var i=0; i<(variables_set.length); i++){
//         // console.log(variables_set[i][0].includes(temp_var[0]));
//             if (variables_set[i][0].includes(temp_var[0])==1){
//                 console.log("Duplicate found");
//                 duplicate_number++;
//             }
//         }
//     if (duplicate_number == 0){
//         variables_set.push(temp_var);
//     }
//     duplicate_number = 0;
//     return code;
//   };