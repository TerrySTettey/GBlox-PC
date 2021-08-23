import Blockly from 'blockly';

var peripheral_PreDeclarations = "";
var peripheral_BulkFunctions = "";
var peripheral_SetupCode = "";

var US_Trigger;
var US_Echo;
var Servo_Pin;

function clearvars(){
    peripheral_PreDeclarations = "";
    peripheral_BulkFunctions = "";
    peripheral_SetupCode = "";
}

function change_Pins(Ultrasonic_Sensor, Servo, Motor, LED, NeoPixel, Light, Line_Sensor, Infrared_Sensor, Bluetooth_Module) {

}

Blockly.Blocks['n_ultra_read'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://www.clipartmax.com/png/full/1-17510_radio-waves-clip-art-radio-wave.png", 40, 40, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Read Ultrasonic Sensor Value (cm)")
          .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"], ["option","OPTIONNAME"], ["option","OPTIONNAME"]]), "Ultrasonic Number");
      this.setOutput(true, "Number");
      this.setColour(230);
   this.setTooltip("Read Ultrasonic Sensor Value in centimeters");
   this.setHelpUrl("");
    }
};

Blockly.Blocks['n_servo_rotate'] = {
    init: function() {
      this.appendValueInput("degrees")
          .setCheck("Number")
          .appendField(new Blockly.FieldImage("https://static.thenounproject.com/png/1230725-200.png", 40, 40, { alt: "*ServoMotorIcon", flipRtl: "FALSE" }))
          .appendField("Rotate Servo Motor to ");
      this.appendDummyInput()
          .appendField("Degrees");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
   this.setTooltip("Rotates Servo Motor to specified number of degrees");
   this.setHelpUrl("");
    }
};

Blockly.JavaScript['n_ultra_read'] = function(block) {
    var code = "\tread_ultrasonic("+US_Trigger+","+US_Echo+")\n";;
    peripheral_PreDeclarations += "int US_Trigger = " + US_Trigger+";\nint US_Echo = " + US_Echo+";\n\n";
    peripheral_SetupCode += "\tpinMode("+US_Trigger+", OUTPUT);\n\tpinMode("+US_Echo+", INPUT);\n"
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
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['n_servo_rotate'] = function(block) {
    peripheral_PreDeclarations += "#include <Servo.h>\n Servo ServoA\n";
    peripheral_SetupCode += "\tServoA.attach("+Servo_Pin+");\n";
    var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '\n\tServoA.write('+value_degrees+');\n';
    return code;
};

export {peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode, US_Trigger, US_Echo, clearvars}