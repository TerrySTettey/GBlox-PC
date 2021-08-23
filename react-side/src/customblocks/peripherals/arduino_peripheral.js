import Blockly from 'blockly';

var peripheral_PreDeclarations = "";
var peripheral_BulkFunctions = "";
var peripheral_SetupCode = "";
var peripheral_LoopCode = "";

var US_Trigger;
var US_Echo;

Blockly.Blocks['n_ultra_read'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://www.clipartmax.com/png/full/1-17510_radio-waves-clip-art-radio-wave.png", 40, 40, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Read Ultrasonic Sensor Value (cm)");
      this.setOutput(true, "Number");
      this.setColour(230);
   this.setTooltip("Read Ultrasonic Sensor Value in centimeters");
   this.setHelpUrl("");
    }
};

Blockly.JavaScript['n_ultra_read'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    peripheral_PreDeclarations = "";
    peripheral_BulkFunctions = "";
    peripheral_SetupCode = "";
    peripheral_LoopCode = "";
    var code = "read_ultrasonic("+US_Trigger+","+US_Echo+")\n";;
    peripheral_PreDeclarations += "int US_Trigger = " + US_Trigger+";\nint US_Echo = " + US_Echo+";\n";
    peripheral_SetupCode += "\npinMode("+US_Trigger+", OUTPUT);\n  pinMode("+US_Echo+", INPUT);\n"
    peripheral_BulkFunctions += `\nint read_ultrasonic(int trigger, int echo){
        digitalWrite(trigger, LOW);
        delayMicroseconds(2);
        digitalWrite(trigger, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigger, LOW);
        int duration = pulseIn(echo, HIGH);
        int distance = duration * 0.034 / 2;
        return distance;
    }`
    //console.log(peripheral_SetupCode);
    // TODO: Change ORDER_NONE to the correct strength.

    return [code, Blockly.JavaScript.ORDER_NONE];
};

export {peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode, peripheral_LoopCode, US_Trigger, US_Echo}
