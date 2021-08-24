import Blockly from 'blockly';

Blockly.Blocks['sensor_ultrasonic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Ultrasonic Sensor Value");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sensor_light_follower_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Right Light Follower Value");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sensor_light_follower_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Left Light Follower Value");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sensor_line_follower_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Right Line Follower")
        .appendField(new Blockly.FieldDropdown([["On","On"], ["Off","Off"]]), "Right Line Follower Value");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sensor_line_follower_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Left Line Follower")
        .appendField(new Blockly.FieldDropdown([["On","On"], ["Off","Off"]]), "Left Line Follower Value");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['communication_infrared_value'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["Number", "String"])
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Infrared Character:");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['communication_bluetooth_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Start Bluetooth Communication");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['communication_bluetooth_receive'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["Number", "String"])
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Bluetooth Character:");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['communincation_bluetooth_send'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Send Bluetooth Character:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_buzzer_buzz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Play Note:")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"], ["option","OPTIONNAME"], ["option","OPTIONNAME"]]), "Note");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_rgb_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Set")
        .appendField(new Blockly.FieldDropdown([["Red","Red"], ["Blue","Blue"], ["Green","Green"]]), "colour")
        .appendField("Light")
        .appendField(new Blockly.FieldDropdown([["On","On"], ["Off","Off"]]), "colour value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_neo_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Set ")
        .appendField(new Blockly.FieldDropdown([["Left","Left"], ["Right","Right"]]), "NeoPixel LED")
        .appendField("NeoPixel LED to:");
    this.appendValueInput("Red Value")
        .setCheck(null)
        .appendField("Red:");
    this.appendValueInput("Green Value")
        .setCheck(null)
        .appendField("Green:");
    this.appendValueInput("Blue Value")
        .setCheck(null)
        .appendField("Blue:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_buzzer_timer'] = {
  init: function() {
    this.appendValueInput("Buzzer Time")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Play Note")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"], ["option","OPTIONNAME"], ["option","OPTIONNAME"]]), "NAME")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['motor_move_indef'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Make Mello")
        .appendField(new Blockly.FieldDropdown([["move forward","forward"], ["move backward","backward"], ["stop","stop"], ["turn left","left"], ["turn right","right"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['motor_move_seconds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Make Mello")
        .appendField(new Blockly.FieldDropdown([["move forward","forward"], ["move backward","backward"], ["stop","stop"], ["turn left","left"], ["turn right","right"]]), "direction");
    this.appendValueInput("seconds")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['forklift_move_seconds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Make the forklift")
        .appendField(new Blockly.FieldDropdown([["rise upwards","up"], ["fall downwards","down"], ["stop","stop"]]), "direction")
        .appendField(new Blockly.FieldDropdown([["slowly","slow"], ["moderately","medium"], ["quickly","fast"]]), "speed");
    this.appendValueInput("seconds")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['forklift_move_indef'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Make the forklift")
        .appendField(new Blockly.FieldDropdown([["rise upwards","up"], ["fall downwards","down"], ["stop","stop"]]), "direction")
        .appendField(new Blockly.FieldDropdown([["slowly","slow"], ["moderately","medium"], ["quickly","fast"]]), "speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_rotate_to_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Stop Servo Motor");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_360_rotate_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Rotate Servo Motor")
        .appendField(new Blockly.FieldDropdown([["clockwise","cw"], ["anti-clockwise","acw"]]), "direction")
        .appendField(new Blockly.FieldDropdown([["slowly","slow"], ["moderately","medium"], ["quickly","fast"]]), "speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};