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
const LeftServo = 9;
const RightServo = 8;
const ForkliftServo = 11;
const IR_Remote = 3;
const BluetoothTX = 12;
const BluetoothRX = 13;
const Buzzer_Pin = 7;
const RGB_R = 6;
const RGB_G = 4;
const RGB_B = 5;

/*
const LeftMotorCW =  0;
const LeftMotorACW = 135;
const RightMotorCW = 0;
const RightMotorACW = 135;
*/


const LeftMotorCW =  77;
const LeftMotorACW = 101;
const RightMotorCW = 78;
const RightMotorACW = 100;


var DSpeed = 530;

var ServoDefined = false;
var RGBDefined = false;


function clearvars(){
  peripheral_PreDeclarations = "";
  peripheral_BulkFunctions = "";
  peripheral_SetupCode = "";
  ServoDefined = false;
  RGBDefined = false;

}

Blockly.JavaScript['sensor_ultrasonic'] = function(block) {
  var code = "\tread_ultrasonic("+US_Trigger+","+US_Echo+")\n";
  if (peripheral_PreDeclarations.includes(`int US_Trigger = ${US_Trigger};\nint US_Echo = ${US_Echo};\n\n`) == 0){
    peripheral_PreDeclarations += `int US_Trigger = ${US_Trigger};\nint US_Echo = ${US_Echo};\n\n`;
    peripheral_SetupCode += `\tpinMode(${US_Trigger}, OUTPUT);\n\tpinMode(${US_Echo}, INPUT);\n`;
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
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_light_follower_right'] = function(block) {
  if (peripheral_PreDeclarations.includes()==0){
    peripheral_PreDeclarations += `int Right_Light_Follower = ${Right_Light_Follower};\n`;
    peripheral_SetupCode += `\tpinMode(Right_Light_Follower, INPUT);\n`
  }
  var code = `analogRead(Right_Light_Follower)`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_light_follower_left'] = function(block) {
  if (peripheral_PreDeclarations.includes(`int Left_Light_Follower = ${Left_Light_Follower};\n`)==0){
  peripheral_PreDeclarations += `int Left_Light_Follower = ${Left_Light_Follower};\n`;
  peripheral_SetupCode += `\tpinMode(Left_Light_Follower, INPUT);\n`
  }
  var code = `analogRead(Left_Light_Follower)`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_line_follower_right'] = function(block) {
  var dropdown_right_line_follower_value = block.getFieldValue('Right Line Follower Value');
  if (peripheral_PreDeclarations.includes(`int Right_Line_Follower_Receiver = ${Right_Line_Follower_Receiver};\n`)==0){
    peripheral_PreDeclarations += `int Right_Line_Follower_Receiver = ${Right_Line_Follower_Receiver};\n`;
    peripheral_SetupCode += `\tpinMode(Right_Line_Follower_Receiver, INPUT);\n`;
  }
  var sensor_val = 0;
  if (dropdown_right_line_follower_value === "On"){
    sensor_val = 1;
  }
  else{
    sensor_val = 0;
  }
  var code =`map(analogRead(Right_Line_Follower_Receiver),0,500,0,1)==${sensor_val}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_line_follower_left'] = function(block) {
  var dropdown_left_line_follower_value = block.getFieldValue('Left Line Follower Value');
  if (peripheral_PreDeclarations.includes(`int Left_Line_Follower_Receiver = ${Left_Line_Follower_Receiver};\n`)==0){
    peripheral_PreDeclarations += `int Left_Line_Follower_Receiver = ${Left_Line_Follower_Receiver};\n`;
    peripheral_SetupCode += `\tpinMode(Left_Line_Follower_Receiver, INPUT);\n`;
  }
  var sensor_val = 0;
  if (dropdown_left_line_follower_value === "On"){
    sensor_val = 1;
  }
  else{
    sensor_val = 0;
  }
  var code = `map(analogRead(Left_Line_Follower_Receiver),0,500,0,1)==${sensor_val}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communication_infrared_start'] = function(block) {
  if (peripheral_PreDeclarations.includes( `#include <IRremote.h>\nint IR_Remote=${IR_Remote};\n`)==0){
    peripheral_PreDeclarations += `#include <IRremote.h>\nint IR_Remote=${IR_Remote};\nIRrecv IrReceiver (IR_Remote);\ndecode_results results;\n`;
    peripheral_SetupCode += `\tIrReceiver.enableIRIn();\n`;
  }
  var code = '';
  return code;
};
Blockly.JavaScript['communication_infrared_value'] = function(block) {
  var dropdown_character = block.getFieldValue('Received_Character');
  var statements_ir_decode_loop = Blockly.JavaScript.statementToCode(block, 'IR_Decode_Loop');
  var code = `\tif(IrReceiver.decode(&results)){\n\t\tif(results.value==${dropdown_character}){${statements_ir_decode_loop}\n\t\t}\n\t}`;
  return code;
};

Blockly.JavaScript['communication_bluetooth_start'] = function(block) {
  if (peripheral_PreDeclarations.includes(`#include <SoftwareSerial.h>\nSoftwareSerial hc06(${BluetoothRX},${BluetoothTX});\n`)==0){
    peripheral_PreDeclarations += `#include <SoftwareSerial.h>\nSoftwareSerial hc06(${BluetoothRX},${BluetoothTX});\nchar bdata = 'a';\n`
    peripheral_SetupCode += `\thc06.begin(9600);\n`;
  }
  var code = 'while (hc06.available()>0){\n\tbdata = hc06.read();\n}\n';
  return code;
};

Blockly.JavaScript['communication_bluetooth_receive'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, "NAME", Blockly.JavaScript.ORDER_ATOMIC);
  value_name = value_name.replaceAll(`'`,``);
  /*
  if (peripheral_PreDeclarations.includes(`char bdata = 'a';\n`)==0){
    peripheral_PreDeclarations += `char bdata = 'a';\n`;
    peripheral_BulkFunctions += `char read_bluetooth(){\n\twhile (hc06.available()>0){\n\tbdata = hc06.read();\n}\n}\n`
  }
  */

  var code = `(bdata=='${value_name}')`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communincation_bluetooth_send'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  value_name = value_name.replaceAll(`'`,``);

  if (peripheral_PreDeclarations.includes(`int send_bluetooth(char x);\n`)==0){
    peripheral_PreDeclarations += `int send_bluetooth(char x);\n`;
    peripheral_BulkFunctions += `int send_bluetooth(char x){\n\thc06.write(x);\n}\n`
  }

  // TODO: Assemble JavaScript into code variable.
  var code = `\tsend_bluetooth("${value_name}");\n`
  return code;
};

Blockly.JavaScript['sound_buzzer_buzz'] = function(block) {
  var dropdown_note = block.getFieldValue('Note');
  // TODO: Assemble JavaScript into code variable.
  var code = `tone(${Buzzer_Pin}, ${dropdown_note});\n`;
  return code;
};

Blockly.JavaScript['led_rgb_led'] = function(block) {
  var dropdown_colour = block.getFieldValue('colour');
  var dropdown_colour_value = block.getFieldValue('colour value');
  // TODO: Assemble JavaScript into code variable.
  if(RGBDefined === false){
    peripheral_SetupCode += `\tpinMode(${RGB_R}, OUTPUT);\n\tpinMode(${RGB_G}, OUTPUT);\n\tpinMode(${RGB_B}, OUTPUT);\n`
    RGBDefined = true;
  }
  var code = '...;\n';
  switch(dropdown_colour){
    case "Red":
      if (dropdown_colour_value === "On"){
        code = `digitalWrite(${RGB_R}, HIGH);\n`
      } else if (dropdown_colour_value === "Off"){
        code = `digitalWrite(${RGB_R}, LOW);\n`
      }
      break;
    case "Blue":
      if (dropdown_colour_value === "On"){
        code = `digitalWrite(${RGB_B}, HIGH);\n`
      } else if (dropdown_colour_value === "Off"){
        code = `digitalWrite(${RGB_B}, LOW);\n`
      }
        break;
    case "Green":
      if (dropdown_colour_value === "On"){
        code = `digitalWrite(${RGB_G}, HIGH);\n`
      } else if (dropdown_colour_value === "Off"){
        code = `digitalWrite(${RGB_G}, LOW);\n`
      }
      break;
    default:
      break;
  }
  return code;
};

Blockly.JavaScript['led_neo_led'] = function(block) {
  var dropdown_neopixel_led = block.getFieldValue('NeoPixel LED');
  var value_red_value = Blockly.JavaScript.valueToCode(block, 'Red Value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_green_value = Blockly.JavaScript.valueToCode(block, 'Green Value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blue_value = Blockly.JavaScript.valueToCode(block, 'Blue Value', Blockly.JavaScript.ORDER_ATOMIC);
  const block_count = Blockly.mainWorkspace.getBlocksByType('led_neo_led',true);
  if (peripheral_PreDeclarations.includes(`#include <Adafruit_NeoPixel.h>\nAdafruit_NeoPixel pixels = Adafruit_NeoPixel(2, A6, NEO_GRB + NEO_KHZ800);\n`) ==0){
    peripheral_PreDeclarations += `#include <Adafruit_NeoPixel.h>\nAdafruit_NeoPixel pixels = Adafruit_NeoPixel(2, A6, NEO_GRB + NEO_KHZ800);\n`;
    peripheral_SetupCode += `pixels.begin();\n`;
  }
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['sound_buzzer_timer'] = function(block) {
  var dropdown_name = block.getFieldValue('note');
  var value_buzzer_time = Blockly.JavaScript.valueToCode(block, 'Buzzer Time', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `\ntone(${Buzzer_Pin},${dropdown_name});\ndelay(${value_buzzer_time});\nnoTone(${Buzzer_Pin});`;
  return code;
};

Blockly.JavaScript['motor_move_indef'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    peripheral_BulkFunctions += `\nvoid raise_fork(int speed){\n\tfor(int i = 90; i > 0; i--){\n\tif(i < 0) {\n\ti = 0;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n\nvoid lower_fork(int speed){\n\tfor(int i = 0; i < 90; i++){\n\tif(i > 90) {\n\ti = 90;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n`
    ServoDefined = true;
  }
  var code = '...;\n';
  switch(dropdown_direction){
    case "forward":
      code = `LeftServo.write(${LeftMotorACW});\nRightServo.write(${RightMotorCW});\n`;
      break;
    case "backward":
      code = `LeftServo.write(${LeftMotorCW});\nRightServo.write(${RightMotorACW});\n`;
      break;
    case "left":
      code = `LeftServo.write(${LeftMotorCW});\nRightServo.write(${RightMotorCW});\ndelay(${DSpeed});\nLeftServo.write(90);\nRightServo.write(90);\n`;
      break;
    case "right":
      code = `LeftServo.write(${LeftMotorACW});\nRightServo.write(${RightMotorACW});\ndelay(${DSpeed});\nLeftServo.write(90);\nRightServo.write(90);\n`;
      break;
    case "rleft":
      code = `LeftServo.write(${LeftMotorCW});\nRightServo.write(${RightMotorCW});\n`;
      break;
    case "rright":
      code = `LeftServo.write(${LeftMotorACW});\nRightServo.write(${RightMotorACW});\n`;
      break;
    case "stop":
      code = `LeftServo.write(90);\nRightServo.write(90);\n`;
      break;
  }
  return code;
};

Blockly.JavaScript['motor_single_move_indef'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_motorselect = block.getFieldValue('motorselect');
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    peripheral_BulkFunctions += `\nvoid raise_fork(int speed){\n\tfor(int i = 90; i > 0; i--){\n\tif(i < 0) {\n\ti = 0;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n\nvoid lower_fork(int speed){\n\tfor(int i = 0; i < 90; i++){\n\tif(i > 90) {\n\ti = 90;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n`
    ServoDefined = true;
  }
  var code = '...;\n';
  switch(dropdown_direction){
    case "forward":
      if(dropdown_motorselect === "lm"){
        code = `LeftServo.write(${LeftMotorACW});\n`;
      } else if (dropdown_motorselect === "rm") {
        code = `RightServo.write(${RightMotorCW});\n`
      }
      break;
    case "backward":
      if(dropdown_motorselect === "lm"){
        code = `LeftServo.write(${LeftMotorCW});\n`;
      } else if (dropdown_motorselect === "rm") {
        code = `RightServo.write(${RightMotorACW});\n`
      }
      break;
    case "stop":
      if(dropdown_motorselect === "lm"){
        code = `LeftServo.write(90);\n`;
      } else if (dropdown_motorselect === "rm") {
        code = `RightServo.write(90);\n`
      }
      break;
  }
  return code;
};

Blockly.JavaScript['motor_move_seconds'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    peripheral_BulkFunctions += `\nvoid raise_fork(int speed){\n\tfor(int i = 90; i > 0; i--){\n\tif(i < 0) {\n\ti = 0;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n\nvoid lower_fork(int speed){\n\tfor(int i = 0; i < 90; i++){\n\tif(i > 90) {\n\ti = 90;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n`
    ServoDefined = true;
  }
  var code = '...;\n';
  switch(dropdown_direction){
    case "forward":
      code = `LeftServo.write(${LeftMotorACW});\nRightServo.write(${RightMotorCW});\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);\n`;
      break;
    case "backward":
      code = `LeftServo.write(${LeftMotorCW});\nRightServo.write(${RightMotorACW});\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);\n`;
      break;
    case "rleft":
      code = `LeftServo.write(${LeftMotorCW});\nRightServo.write(${RightMotorCW});\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);\n`;
      break;
    case "rright":
      code = `LeftServo.write(${LeftMotorACW});\nRightServo.write(${RightMotorACW});\ndelay(${value_seconds*1000});\nLeftServo.write(90);\nRightServo.write(90);\n`;
      break;
    case "stop":
      code = `LeftServo.write(90);\nRightServo.write(90);\ndelay(${value_seconds*1000});\n`;
      break;
  }
  return code;
};

Blockly.JavaScript['forklift_move_seconds'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    peripheral_BulkFunctions += `\nvoid raise_fork(int speed){\n\tfor(int i = 90; i > 0; i--){\n\tif(i < 0) {\n\ti = 0;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n\nvoid lower_fork(int speed){\n\tfor(int i = 0; i < 90; i++){\n\tif(i > 90) {\n\ti = 90;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n`
    ServoDefined = true;
  }



  var code = '...;\n';
  return code;
};

Blockly.JavaScript['forklift_move_indef'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    peripheral_BulkFunctions += `\nvoid raise_fork(int speed){\n\tfor(int i = 90; i > 0; i--){\n\tif(i < 0) {\n\ti = 0;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n\nvoid lower_fork(int speed){\n\tfor(int i = 0; i < 90; i++){\n\tif(i > 90) {\n\ti = 90;\n}\nForkliftServo.write(i);\ndelay(1000/(speed*90));\n}\n}\n`
    ServoDefined = true;
  }
  var code = '...;\n';
  switch (dropdown_direction){
    case "up":
      if (dropdown_speed == "slow"){
        code = `raise_fork(0.4)`
      }else if (dropdown_speed == "medium"){
        code = `raise_fork(1)`
      }else if (dropdown_speed == "fast"){
        code = `raise_fork(2)`
      }
      break;
    case "down":
      if (dropdown_speed == "slow"){
        code = `lower_fork(0.4)`
      }else if (dropdown_speed == "medium"){
        code = `lower_fork(1)`
      }else if (dropdown_speed == "fast"){
        code = `lower_fork(2)`
      }
      break;
  }
  return code;
};

Blockly.JavaScript['servo_rotate_to_degrees'] = function(block) {
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    ServoDefined = true;
  }
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['servo_360_rotate_direction'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');
  if(ServoDefined === false) {
    peripheral_PreDeclarations += `#include <Servo.h>\nServo LeftServo;\nServo RightServo;\nServo ForkliftServo;\n`;
    peripheral_SetupCode += `\tLeftServo.attach(${LeftServo});\n\tRightServo.attach(${RightServo});\n\tForkliftServo.attach(${ForkliftServo});\n`
    ServoDefined = true;
  }
  var code = '...;\n';
  return code;
};

export {peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode, US_Trigger, US_Echo, clearvars}