import Blockly from 'blockly';

var peripheral_PreDeclarations = "";
var peripheral_BulkFunctions = "";
var peripheral_SetupCode = "";

const US_Trigger = 11;
const US_Echo = 10;
const Right_Light_Follower = "A1";
const Left_Light_Follower = "A0";
const Right_Line_Follower_Receiver = "A3";
const Left_Line_Follower_Receiver = "A2";
const IR_Remote = 3;
const BluetoothTX = 12;
const BluetoothRX = 13;
const LeftServo = 9;
const RightServo = 8;

function clearvars(){
  peripheral_PreDeclarations = "";
  peripheral_BulkFunctions = "";
  peripheral_SetupCode = "";
}

Blockly.JavaScript['sensor_ultrasonic'] = function(block) {
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

Blockly.JavaScript['sensor_light_follower_right'] = function(block) {
  peripheral_PreDeclarations += `int Right_Light_Follower = ${Right_Light_Follower};\n`;
  peripheral_SetupCode += `\tpinMode(Right_Light_Follower, INPUT);\n`
  var code = `analogRead(Right_Light_Follower)`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_light_follower_left'] = function(block) {
  peripheral_PreDeclarations += `int Left_Light_Follower = ${Left_Light_Follower};\n`;
  peripheral_SetupCode += `\tpinMode(Left_Light_Follower, INPUT);\n`
  var code = `analogRead(Left_Light_Follower)`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_line_follower_right'] = function(block) {
  var dropdown_right_line_follower_value = block.getFieldValue('Right Line Follower Value');
  peripheral_PreDeclarations += `int Right_Line_Follower_Receiver = ${Right_Line_Follower_Receiver};\n`;
  peripheral_SetupCode += `\tpinMode(Right_Line_Follower_Receiver, INPUT);`;
  var sensor_val = 0;
  if (dropdown_right_line_follower_value === "On"){
    sensor_val = 1;
  }
  else{
    sensor_val = 0;
  }
  var code =`map(analogRead(Right_Line_Follower_Receiver),0,255,0,1)==${sensor_val}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_line_follower_left'] = function(block) {
  var dropdown_left_line_follower_value = block.getFieldValue('Left Line Follower Value');
  peripheral_PreDeclarations += `int Left_Line_Follower_Receiver = ${Left_Line_Follower_Receiver};\n`;
  peripheral_SetupCode += `\tpinMode(Left_Line_Follower_Receiver, INPUT);`;
  var sensor_val = 0;
  if (dropdown_left_line_follower_value === "On"){
    sensor_val = 1;
  }
  else{
    sensor_val = 0;
  }
  var code = `map(analogRead(Left_Line_Follower_Receiver),0,255,0,1)==${sensor_val}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communication_infrared_start'] = function(block) {
  peripheral_PreDeclarations += `#include <IRremote.h>\nint IR_Remote=${IR_Remote};\n`;
  peripheral_SetupCode += `IrReceiver.begin(IR_Remote);\n`
  var code = '';
  return code;
};
Blockly.JavaScript['communication_infrared_value'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  peripheral_PreDeclarations += ``;
  peripheral_SetupCode += ``;
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communication_bluetooth_start'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  peripheral_PreDeclarations += `#include <SoftwareSerial.h>\nSoftwareSerial hc06(${BluetoothTX},${BluetoothRX});\n`
  peripheral_SetupCode += `\thc06.begin(9600);\n`;
  var code = '';
  return code;
};

Blockly.JavaScript['communication_bluetooth_receive'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, "NAME", Blockly.JavaScript.ORDER_ATOMIC);
  value_name = value_name.replaceAll(`'`,``);
  peripheral_PreDeclarations += `int read_bluetooth();\n`;
  peripheral_BulkFunctions += `int read_bluetooth(){\n\tif (hc06.available()){\n\t\t\treturn (hc06.read());\n}\n`
  var code = `(read_bluetooth()=="${value_name}")`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communincation_bluetooth_send'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  value_name = value_name.replaceAll(`'`,``);
  peripheral_PreDeclarations += `int send_bluetooth(char x);\n`;
  peripheral_BulkFunctions += `int send_bluetooth(char x){\n\thc06.write(x);\n}\n`
  // TODO: Assemble JavaScript into code variable.
  var code = `\tsend_bluetooth("${value_name}");\n`
  return code;
};

Blockly.JavaScript['sound_buzzer_buzz'] = function(block) {
  var dropdown_note = block.getFieldValue('Note');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['led_rgb_led'] = function(block) {
  var dropdown_colour = block.getFieldValue('colour');
  var dropdown_colour_value = block.getFieldValue('colour value');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['led_neo_led'] = function(block) {
  var dropdown_neopixel_led = block.getFieldValue('NeoPixel LED');
  var value_red_value = Blockly.JavaScript.valueToCode(block, 'Red Value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_green_value = Blockly.JavaScript.valueToCode(block, 'Green Value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blue_value = Blockly.JavaScript.valueToCode(block, 'Blue Value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['sound_buzzer_timer'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_buzzer_time = Blockly.JavaScript.valueToCode(block, 'Buzzer Time', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['motor_move_indef'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\n`;
  peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});`
  var code = '...;\n';
  switch(dropdown_direction){
    case "forward":
      code = "LeftServo.write(180);\nRightServo.write(0);";
      break;
    case "backward":
      code = "LeftServo.write(0);\nRightServo.write(180);";
      break;
    case "left":
      code = "LeftServo.write(0);\nRightServo.write(0);\ndelay(250);\nLeftServo.write(90);\nRightServo.write(90);";
      break;
    case "right":
      code = "LeftServo.write(180);\nRightServo.write(180);\ndelay(250);\nLeftServo.write(90);\nRightServo.write(90);";
      break;
    case "rleft":
      code = "LeftServo.write(0);\nRightServo.write(0);";
      break;
    case "rright":
      code = "LeftServo.write(180);\nRightServo.write(180);";
      break;
    case "stop":
      code = "LeftServo.write(90);\nRightServo.write(90);";
      break;
  }
  return code;
};

Blockly.JavaScript['motor_move_seconds'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\n`;
  peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});`
  var code = '...;\n';
  switch(dropdown_direction){
    case "forward":
      code = `LeftServo.write(180);\nRightServo.write(0);\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);`;
      break;
    case "backward":
      code = `LeftServo.write(0);\nRightServo.write(180);\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);`;
      break;
    case "rleft":
      code = `LeftServo.write(0);\nRightServo.write(0);\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);`;
      break;
    case "rright":
      code = `LeftServo.write(180);\nRightServo.write(180);\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);`;
      break;
    case "stop":
      code = `LeftServo.write(90);\nRightServo.write(90);\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);`;
      break;
  }
  return code;
};

Blockly.JavaScript['forklift_move_seconds'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['forklift_move_indef'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['servo_rotate_to_degrees'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['servo_360_rotate_direction'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

export {peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode, US_Trigger, US_Echo, clearvars}