import Blockly from 'blockly';
import 'blockly/javascript';

///Global Variables
var servo_declarations = "";  //Used to dynamically define new servos added to the workspace
var servo_statements = "";  //Uses servo_declarations to create declaration statements for each servo.
var servo_attach = "";  //Uses servo_declarations to create attach statements for each servo.

var ultrasonic_sensor_function = `\nint read_ultrasonic(int trigger, int echo){
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
  int duration = pulseIn(echo, HIGH);
  int distance = duration * 0.034 / 2;
  return distance;
}`
                                          //Function used to measure the distance of any ultrasonic sensor in centimeters
///Setup and Loop Block

Blockly.Blocks['main_block'] = {
  init: function() {
    this.appendStatementInput("Setup")
        .setCheck(null)
        .appendField("Setup");
    this.appendStatementInput("Loop")
        .setCheck(null)
        .appendField("Loop");
    this.setColour(100);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['main_block'] = function(block) {
  var statements_setup = Blockly.JavaScript.statementToCode(block, 'Setup');
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'Loop');
  // TODO: Assemble JavaScript into code variable.

  if (servo_statements===undefined){
    servo_statements="";  //Checks for if servo_statements is empty and ensures it stays empty.
  }
  if (servo_attach === undefined){
    servo_attach = "";  //Checks for if servo_attach is empty and ensures it stays empty.
  }
  
  var code = String("#include <Servo.h>\n"+servo_statements+"\nint read_ultrasonic(int trigger, int echo);\n\nvoid setup(){\n"+servo_attach+statements_setup+'}\nvoid loop(){\n' +statements_loop+'}\n'+ultrasonic_sensor_function); //Return final setup and loop code.
  servo_statements = "";  //Reset servo_statements to prevent repitions
  servo_attach = "";  //Reset servo_attach to prevent repitions
  return code;
};

///Setup Blocks
//Pin Setup
Blockly.Blocks['pin_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pin Setup")
        .appendField(new Blockly.FieldTextInput("0"), "Pin")
        .appendField(new Blockly.FieldDropdown([["INPUT","INPUT"], ["OUTPUT","OUTPUT"]]), "Pin Mode");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['pin_setup'] = function(block) {
  var text_digital_pin = block.getFieldValue('Pin');
  var dropdown_pin_mode = block.getFieldValue('Pin Mode');
  // TODO: Assemble JavaScript into code variable.
  var code = 'pinMode('+text_digital_pin+','+dropdown_pin_mode+'); //Pin '+text_digital_pin+' Setup\n'; //Returns code for setting up a pin (either analog or digital)
  return code;
};

//Ultrasonic Setup
Blockly.Blocks['ultrasonic_sensor_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ultrasonic Setup");
    this.appendDummyInput()
        .appendField("Trigger Pin")
        .appendField(new Blockly.FieldNumber(0, 0, 19), "Trigger Digital Pin");
    this.appendDummyInput()
        .appendField("Echo Pin")
        .appendField(new Blockly.FieldNumber(0, 0, 19), "Echo Digital Pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['ultrasonic_sensor_setup'] = function(block) {
  var number_trigger_digital_pin = block.getFieldValue('Trigger Digital Pin');
  var number_echo_digital_pin = block.getFieldValue('Echo Digital Pin');
  // TODO: Assemble JavaScript into code variable.
  var code = 'pinMode(' + number_trigger_digital_pin +', OUTPUT); //Trigger digital pin\npinMode('+number_echo_digital_pin+',INPUT); //Echo Digital pin\n'; //Returns code for setting up an ultrasonic sensor
  return code;
};

///Digital Blocks
//Digital Write Block
Blockly.Blocks['digital_pin_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Digital Pin Write");
    this.appendValueInput("Pin number")
        .setCheck("Number")
        .appendField("Digital Pin")
        .appendField(new Blockly.FieldNumber(0, 0, 19), "Digital Pin Number");
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("On/Off")
        .appendField(new Blockly.FieldDropdown([["Off","LOW"], ["On","HIGH"]]), "On/Off");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['digital_pin_write'] = function(block) {
  var number_digital_pin_number = block.getFieldValue('Digital Pin Number');
  var value_pin_number = Blockly.JavaScript.valueToCode(block, 'Pin number', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_on_off = block.getFieldValue('On/Off');
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var digital_pin_number = undefined
  if (value_pin_number!==""){
    digital_pin_number = value_pin_number;
  }
  else{
    digital_pin_number =number_digital_pin_number;
  }
  var code = 'digitalWrite('+digital_pin_number+','+dropdown_on_off+'); //Digital Pin '+digital_pin_number+' is '+dropdown_on_off+'\n';
  return code;
};

//Digital Read Block
Blockly.Blocks['digital_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Digital Pin Read")
        .appendField(new Blockly.FieldNumber(0, 0, 19), "Digital Pin Number");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['digital_read'] = function(block) {
  var number_digital_pin_number = block.getFieldValue('Digital Pin Number');
  // TODO: Assemble JavaScript into code variable.
  var code = '(digitalRead('+number_digital_pin_number+'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

///Analog Blocks
//Analog Write Block
Blockly.Blocks['analog_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Analog Pin Write");
    this.appendValueInput("Arduino Pin")
        .setCheck("Number")
        .appendField("Analog Pin")
        .appendField(new Blockly.FieldTextInput("0"), "Pin Number");
    this.appendValueInput("Analog Write")
        .setCheck("Number")
        .appendField("Output Value")
        .appendField(new Blockly.FieldNumber(0, 0, 255), "Duty Cycle");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['analog_write'] = function(block) {
  var text_pin_number = block.getFieldValue('Pin Number');
  var value_arduino_pin = Blockly.JavaScript.valueToCode(block, 'Arduino Pin', Blockly.JavaScript.ORDER_ATOMIC);
  var number_output_value = block.getFieldValue('Output Value');
  var value_analog_write = Blockly.JavaScript.valueToCode(block, 'Analog Write', Blockly.JavaScript.ORDER_ATOMIC);
  
  var analog_pin = undefined
  if (value_arduino_pin!==""){
    analog_pin = value_arduino_pin;
  }
  else{
    analog_pin = text_pin_number;
  }

  var output_value = undefined

  if (value_analog_write!==""){
    output_value = value_analog_write;
  }
  else{
    output_value = number_output_value;
  }
    // TODO: Assemble JavaScript into code variable.
  var code = 'analogWrite('+analog_pin+','+output_value+'); //Analog Pin '+analog_pin+' set to '+output_value+'\n';
  return code;
};

//Analog Read Block
Blockly.Blocks['analog_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Analog Pin Read")
        .appendField(new Blockly.FieldTextInput("default"), "Analog Pin");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['analog_read'] = function(block) {
  var text_analog_pin = block.getFieldValue('Analog Pin');
  // TODO: Assemble JavaScript into code variable.
  var code = '(analogRead(' + text_analog_pin + '))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

///Sensor Blocks
//Ultrasoinc Read Block
Blockly.Blocks['ultrasonic_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ultrasonic Sensor Read");
    this.appendDummyInput()
        .appendField("Trigger Pin")
        .appendField(new Blockly.FieldNumber(0, 0, 19), "Trigger Digital Pin");
    this.appendDummyInput()
        .appendField("Echo Pin")
        .appendField(new Blockly.FieldNumber(0, 0, 19), "Echo Digital Pin");
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['ultrasonic_sensor'] = function(block) {
  var number_trigger_digital_pin = block.getFieldValue('Trigger Digital Pin');
  var number_echo_digital_pin = block.getFieldValue('Echo Digital Pin');
  // TODO: Assemble JavaScript into code variable.
  var code = 'read_ultrasonic(' + number_trigger_digital_pin + ','+number_echo_digital_pin + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

///Actuator Blocks
//Servo Block Write
Blockly.Blocks['servo_write'] = {
  init: function() {
    this.appendValueInput("Servo Motor Pin")
        .setCheck("Number")
        .appendField("Servo Motor Pin")
        .appendField(new Blockly.FieldTextInput("0"), "Servo Motor Pin");
    this.appendValueInput("Servo Motor Position")
        .setCheck("Number")
        .appendField("Servo Motor Position")
        .appendField(new Blockly.FieldNumber(0, 0, 180), "Motor Position");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['servo_write'] = function(block) {
  var text_servo_motor_pin = block.getFieldValue('Servo Motor Pin');
  var value_servo_motor_pin = Blockly.JavaScript.valueToCode(block, 'Servo Motor Pin', Blockly.JavaScript.ORDER_ATOMIC);
  var number_motor_position = block.getFieldValue('Motor Position');
  var value_servo_motor_position = Blockly.JavaScript.valueToCode(block, 'Servo Motor Position', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  var servo_motor_pin = undefined
  if (value_servo_motor_pin!==""){
    servo_motor_pin = value_servo_motor_pin;
  }
  else{
    servo_motor_pin = text_servo_motor_pin;
  }

  var servo_motor_position = undefined
  if (value_servo_motor_position!==""){
    servo_motor_position = value_servo_motor_position;
  }
  else{
    servo_motor_position = number_motor_position;
  }

  var list_servo_var = Blockly.JavaScript.nameDB_.getDistinctName("myservo", Blockly.Variables.NAME_TYPE);
  servo_declarations = list_servo_var;
  servo_statements += 'Servo '+servo_declarations+';\n';
  servo_attach += '\n  '+servo_declarations+'.attach('+servo_motor_pin+');\n'
  var code = servo_declarations+'.write('+servo_motor_position+');\t//Move Servo to position '+servo_motor_position+'\n';
  return code;
};

Blockly.Blocks['delay'] = {
  init: function() {
    this.appendValueInput("Delay amount")
        .setCheck("Number")
        .appendField("Delay for")
        .appendField(new Blockly.FieldNumber(0), "Delay Amount")
        .appendField("milliseconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['delay'] = function(block) {
  var number_delay_amount = block.getFieldValue('Delay Amount');
  var value_delay_amount = Blockly.JavaScript.valueToCode(block, 'Delay amount', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var delay_amount = undefined
  if (value_delay_amount!==""){
    delay_amount = value_delay_amount;
  }
  else{
    delay_amount = number_delay_amount;
  }
  var code = 'delay('+delay_amount+');\n';
  return code;
};

Blockly.Blocks['for_loop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat for")
        .appendField(new Blockly.FieldNumber(0, 0), "loop amount")
        .appendField("Times");
    this.appendStatementInput("for loop")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['for_loop'] = function(block) {
  var number_loop_amount = block.getFieldValue('loop amount');
  var statements_for_loop = Blockly.JavaScript.statementToCode(block, 'for loop');
  // TODO: Assemble JavaScript into code variable.
  var code = 'for (int i = 0;i<'+number_loop_amount+';i++) {\n'+statements_for_loop+'};\n';
  return code;
};