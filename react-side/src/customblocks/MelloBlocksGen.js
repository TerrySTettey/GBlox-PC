import Blockly from 'blockly';
Blockly.JavaScript['sensor_light_follower'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_line_follower_right'] = function(block) {
  var dropdown_right_line_follower_value = block.getFieldValue('Right Line Follower Value');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sensor_line_follower_left'] = function(block) {
  var dropdown_left_line_follower_value = block.getFieldValue('Left Line Follower Value');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communication_infrared_value'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communication_bluetooth_start'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['communication_bluetooth_receive'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communincation_bluetooth_send'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['sound_buzzer_buzz'] = function(block) {
  var dropdown_note = block.getFieldValue('Note');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['led_rgb_led'] = function(block) {
  var dropdown_led = block.getFieldValue('LED');
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
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['motor_move_seconds'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
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