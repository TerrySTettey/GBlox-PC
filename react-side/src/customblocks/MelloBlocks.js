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
        .appendField("Right Line Follower is")
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
        .appendField("Left Line Follower is")
        .appendField(new Blockly.FieldDropdown([["On","On"], ["Off","Off"]]), "Left Line Follower Value");
    this.setOutput(true, null);
    this.setColour(230);
    this.setInputsInline(true);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['communication_infrared_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start Infrared Communication");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['communication_infrared_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Read Infrared Character:")
        .appendField(new Blockly.FieldDropdown([["Up","46"],["Down","15"],["Right","43"],["Left","44"],["Ok","40"],["1","16"],["2","19"],["3","D"],["4","C"],["5","18"],["6","5E"],["7","8"],["8","1C"],["9","5A"],["0","52"],["#","4A"],["*","42"]]),"Received_Character");
    this.appendStatementInput("IR_Decode_Loop")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
        .appendField("Bluetooth Character Read is");
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
        .appendField(new Blockly.FieldDropdown([["C6","1047"], ["C#6","1109"], ["D6","1175"], ["Eb6","1245"], ["E6","1319"], ["F6","1397"], ["F#6","1480"], ["G6","1568"], ["G#6","1661"], ["A6","1760"], ["Bb6","1865"], ["B6","1976"], ["C7","2093"], ["C#7","2217"], ["D7","2349"], ["Eb7","2489"], ["E7","2637"], ["F7","2794"], ["F#7","2960"], ["G7","3136"], ["G#7","3322"], ["A7","3520"], ["Bb7","3729"], ["B7","3951"], ["C8","4186"]]), "Note");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setInputsInline(true);
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
        .appendField(new Blockly.FieldDropdown([["C6","1047"], ["C#6","1109"], ["D6","1175"], ["Eb6","1245"], ["E6","1319"], ["F6","1397"], ["F#6","1480"], ["G6","1568"], ["G#6","1661"], ["A6","1760"], ["Bb6","1865"], ["B6","1976"], ["C7","2093"], ["C#7","2217"], ["D7","2349"], ["Eb7","2489"], ["E7","2637"], ["F7","2794"], ["F#7","2960"], ["G7","3136"], ["G#7","3322"], ["A7","3520"], ["Bb7","3729"], ["B7","3951"], ["C8","4186"]]), "note")
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

Blockly.Blocks['sound_buzzer_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop Buzzer");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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

Blockly.Blocks['led_rgb_led_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Set Lights to")
        .appendField(new Blockly.FieldDropdown([["Red","Red"], ["Blue","Blue"], ["Green","Green"], ["Yellow","Yellow"],["Magenta","Magenta"],["Cyan","Cyan"],["Off","Off"]]), "colour")
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



Blockly.Blocks['motor_move_indef'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Make Mello")
        .appendField(new Blockly.FieldDropdown([["move forward","forward"], ["move backward","backward"], ["stop","stop"], ["turn left","left"], ["turn right","right"],["rotate left","rleft"],["rotate right","rright"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['motor_single_move_indef'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([["Left Motor","lm"],["Right Motor", "rm"]]), "motorselect")
        .appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"], ["to a stop","stop"]]), "direction");
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
        .appendField(new Blockly.FieldDropdown([["move forward","forward"], ["move backward","backward"], ["stop","stop"],["rotate left","rleft"],["rotate right","rright"]]), "direction");
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
        .appendField("Rotate forklift")
        .appendField(new Blockly.FieldDropdown([["slowly","slow"], ["moderately","medium"], ["quickly","fast"]]), "speed");
    this.appendValueInput("seconds")
        .setCheck("Number")
        .appendField("to");
    this.appendDummyInput()
        .appendField("degrees");
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

// Blockly.Blocks['variable_set'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Set Variable")
//         .appendField(new Blockly.FieldTextInput("var_name"), "varname");
//     this.appendValueInput("value")
//         .setCheck(["Number", "String"])
//         .appendField("to");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['variable_get'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Get Variable")
//         .appendField(new Blockly.FieldTextInput("var_name"), "varname")
//         .appendField("'s value");
//     this.setInputsInline(true);
//     this.setOutput(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['variable_create_int'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Create Integer Variable")
//         .appendField(new Blockly.FieldTextInput("var_name"), "varname");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['variable_create_float'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Create Float Variable")
//         .appendField(new Blockly.FieldTextInput("var_name"), "varname");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

