import Blockly from 'blockly';

//Peripheral Vars
var peripheral_PreDeclarations = "";
var peripheral_BulkFunctions = "";
var peripheral_SetupCode = "";

//Device Definitions
const IR_Remote = 3;
const LMotorEN = 4;
const RMotorEN = 7;
const LMotorPWM = 5;
const RMotorPWM = 6;
const Buzzer_Pin = 7;
const BluetoothTX = 12;
const BluetoothRX = 11;
const MainSLC = "A4";
const MainSDA = "A5";
const Port1 = ["SLC","SDA", 9, 10];
const Port2 = ["SLC","SDA", 2, 13];
const Port3 = ["SLC","SDA", "A1", "A0"];
const Port4 = ["SLC","SDA", "A3", "A2"];

function clearvars() {
    //Clear Variables
    peripheral_PreDeclarations = "";
    peripheral_BulkFunctions = "";
    peripheral_SetupCode = "";

    //Clear Definition Bools
    

}

Blockly.JavaScript["mingo_motor_move_indef"] = function (block) {

}

Blockly.JavaScript["mingo_motor_single_move_indef"] = function (block) {
    
}

Blockly.JavaScript["mingo_motor_stop_indef"] = function (block) {
    
}

Blockly.JavaScript["mingo_grabber_move"] = function (block) {
    
}

Blockly.JavaScript["mingo_led_range"] = function (block) {
    
}

Blockly.JavaScript["mingo_led_definite"] = function (block) {
    
}

Blockly.JavaScript["mingo_sound_play"] = function (block) {
    
}

Blockly.JavaScript["mingo_sound_play_timed"] = function (block) {
    
}

Blockly.JavaScript["mingo_sound_play"] = function (block) {
    
}

Blockly.JavaScript["mingo_sound_stop"] = function (block) {
    
}

Blockly.JavaScript["mingo_sound_play_song"] = function (block) {
    
}

Blockly.JavaScript["mingo_light_read"] = function (block) {
    
}

Blockly.JavaScript["mingo_line_read"] = function (block) {
    
}

Blockly.JavaScript["mingo_ultrasonic_sensor"] = function (block) {
    
}

Blockly.JavaScript["mingo_ir_begin"] = function (block) {
    
}

Blockly.JavaScript["mingo_ir_read"] = function (block) {
    
}

Blockly.JavaScript["mingo_bluetooth_begin"] = function (block) {
    
}

Blockly.JavaScript["mingo_bluetooth_read"] = function (block) {
    
}

Blockly.JavaScript["mingo_bluetooth_send"] = function (block) {
    
}

Blockly.JavaScript["mingo_display_text"] = function (block) {
    
}

Blockly.JavaScript["mingo_display_clear"] = function (block) {
    
}

Blockly.JavaScript["mingo_display_face"] = function (block) {
    
}

Blockly.JavaScript["mingo_display_animation"] = function (block) {
    
}


export {peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode,clearvars}