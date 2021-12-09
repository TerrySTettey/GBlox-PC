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
const Port2 = ["A4", "A5", 2, 13];
const Port3 = ["A4", "A5", "A1", "A0"];
const Port4 = ["A4", "A5", "A3", "A2"];
const Port1 = ["A4", "A5", 9, 10];


//Setup Definitions
var DCMotorDefined = false;
var ServoDefined = false;
var NeoLEDDefined = false;
var MelodyDefined = false;


function clearvars() {
    //Clear Variables
    peripheral_PreDeclarations = "";
    peripheral_BulkFunctions = "";
    peripheral_SetupCode = "";

    //Clear Definition Bools
    DCMotorDefined = false;

}

//Setups
const DCMotorSetup = {
    PreDec: `\n
    \n`,
    Setup: `\n
        pinMode(${LMotorEN}, OUTPUT);
        pinMode(${RMotorEN}, OUTPUT);
        pinMode(${LMotorPWM}, OUTPUT);
        pinMode(${LMotorPWM}, OUTPUT);
    \n`,
    Bulk: `\n`
}

const ServoSetup = {
    PreDec: `\n
    #include <Servo.h>
    Servo Grabber;
    \n`,
    Setup: `\n
    \n`,
    Bulk: `\n
    void open_grabber(float speed) {
        for (int i = 90; i > 0; i--) {
          if (i < 0) {
            i = 0;
          }
          Grabber.write(i);
          delay(90 / (speed * 1000));
        }
      }
      
      void close_grabber(float speed) {
        for (int i = 0; i < 90; i++) {
          if (i > 90) {
            i = 90;
          }
          Grabber.write(i);
          delay(90 / (speed * 1000));
        }
      }
    \n`
}

const NeoLEDSetup = {
    PreDec: `\n
    #include <Adafruit_NeoPixel.h>
    \n`,
    Setup: `\n
    pixels.begin();
    \n`,
    Bulk: `\n
    \n`
}

const MelodySetup = {
    PreDec: `\n
    #include <melody.h>
    MelodyPlayer mPlayer();
    \n`,
    Setup: `\n
    \n`,
    Bulk: `\n
    int* MerryChristmas() {
        return {
          NOTE_C5, 4,  //1
          NOTE_F5, 4, NOTE_F5, 8, NOTE_G5, 8, NOTE_F5, 8, NOTE_E5, 8,
          NOTE_D5, 4, NOTE_D5, 4, NOTE_D5, 4,
          NOTE_G5, 4, NOTE_G5, 8, NOTE_A5, 8, NOTE_G5, 8, NOTE_F5, 8,
          NOTE_E5, 4, NOTE_C5, 4, NOTE_C5, 4,
          NOTE_A5, 4, NOTE_A5, 8, NOTE_AS5, 8, NOTE_A5, 8, NOTE_G5, 8,
          NOTE_F5, 4, NOTE_D5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
      
          NOTE_F5, 2, NOTE_C5, 4,  //8
          NOTE_F5, 4, NOTE_F5, 8, NOTE_G5, 8, NOTE_F5, 8, NOTE_E5, 8,
          NOTE_D5, 4, NOTE_D5, 4, NOTE_D5, 4,
          NOTE_G5, 4, NOTE_G5, 8, NOTE_A5, 8, NOTE_G5, 8, NOTE_F5, 8,
          NOTE_E5, 4, NOTE_C5, 4, NOTE_C5, 4,
          NOTE_A5, 4, NOTE_A5, 8, NOTE_AS5, 8, NOTE_A5, 8, NOTE_G5, 8,
          NOTE_F5, 4, NOTE_D5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
          NOTE_F5, 2, NOTE_C5, 4,
      
          NOTE_F5, 4, NOTE_F5, 4, NOTE_F5, 4,  //17
          NOTE_E5, 2, NOTE_E5, 4,
          NOTE_F5, 4, NOTE_E5, 4, NOTE_D5, 4,
          NOTE_C5, 2, NOTE_A5, 4,
          NOTE_AS5, 4, NOTE_A5, 4, NOTE_G5, 4,
          NOTE_C6, 4, NOTE_C5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
          NOTE_F5, 2, NOTE_C5, 4,
          NOTE_F5, 4, NOTE_F5, 8, NOTE_G5, 8, NOTE_F5, 8, NOTE_E5, 8,
          NOTE_D5, 4, NOTE_D5, 4, NOTE_D5, 4,
      
          NOTE_G5, 4, NOTE_G5, 8, NOTE_A5, 8, NOTE_G5, 8, NOTE_F5, 8,  //27
          NOTE_E5, 4, NOTE_C5, 4, NOTE_C5, 4,
          NOTE_A5, 4, NOTE_A5, 8, NOTE_AS5, 8, NOTE_A5, 8, NOTE_G5, 8,
          NOTE_F5, 4, NOTE_D5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
          NOTE_F5, 2, NOTE_C5, 4,
          NOTE_F5, 4, NOTE_F5, 4, NOTE_F5, 4,
          NOTE_E5, 2, NOTE_E5, 4,
          NOTE_F5, 4, NOTE_E5, 4, NOTE_D5, 4,
      
          NOTE_C5, 2, NOTE_A5, 4,  //36
          NOTE_AS5, 4, NOTE_A5, 4, NOTE_G5, 4,
          NOTE_C6, 4, NOTE_C5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
          NOTE_F5, 2, NOTE_C5, 4,
          NOTE_F5, 4, NOTE_F5, 8, NOTE_G5, 8, NOTE_F5, 8, NOTE_E5, 8,
          NOTE_D5, 4, NOTE_D5, 4, NOTE_D5, 4,
          NOTE_G5, 4, NOTE_G5, 8, NOTE_A5, 8, NOTE_G5, 8, NOTE_F5, 8,
          NOTE_E5, 4, NOTE_C5, 4, NOTE_C5, 4,
      
          NOTE_A5, 4, NOTE_A5, 8, NOTE_AS5, 8, NOTE_A5, 8, NOTE_G5, 8,  //45
          NOTE_F5, 4, NOTE_D5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
          NOTE_F5, 2, NOTE_C5, 4,
          NOTE_F5, 4, NOTE_F5, 8, NOTE_G5, 8, NOTE_F5, 8, NOTE_E5, 8,
          NOTE_D5, 4, NOTE_D5, 4, NOTE_D5, 4,
          NOTE_G5, 4, NOTE_G5, 8, NOTE_A5, 8, NOTE_G5, 8, NOTE_F5, 8,
          NOTE_E5, 4, NOTE_C5, 4, NOTE_C5, 4,
      
          NOTE_A5, 4, NOTE_A5, 8, NOTE_AS5, 8, NOTE_A5, 8, NOTE_G5, 8,  //53
          NOTE_F5, 4, NOTE_D5, 4, NOTE_C5, 8, NOTE_C5, 8,
          NOTE_D5, 4, NOTE_G5, 4, NOTE_E5, 4,
          NOTE_F5, 2, REST, 4
        };
      }

    int* HappyBirthday() {
    return {
        NOTE_C4,4, NOTE_C4,8, 
        NOTE_D4,-4, NOTE_C4,-4, NOTE_F4,-4,
        NOTE_E4,-2, NOTE_C4,4, NOTE_C4,8, 
        NOTE_D4,-4, NOTE_C4,-4, NOTE_G4,-4,
        NOTE_F4,-2, NOTE_C4,4, NOTE_C4,8,

        NOTE_C5,-4, NOTE_A4,-4, NOTE_F4,-4, 
        NOTE_E4,-4, NOTE_D4,-4, NOTE_AS4,4, NOTE_AS4,8,
        NOTE_A4,-4, NOTE_F4,-4, NOTE_G4,-4,
        NOTE_F4,-2,
    };
    }
    \n`
}

Blockly.JavaScript["mingo_motor_move_indef"] = function (block) {
    var dropdown_direction = block.getFieldValue('direction');
    var dropdown_speed = block.getFieldValue('speed');

    if (DCMotorDefined === false) {
        if (block.getRootBlock().type == "m_mainloop") {
            peripheral_PreDeclarations += DCMotorSetup.PreDec;
            peripheral_SetupCode += DCMotorSetup.Setup;
            peripheral_BulkFunctions += DCMotorSetup.Bulk;
            DCMotorDefined = true;
        }
    }

    var code = '...;\n';
    switch (dropdown_direction) {
        case "forward":
            code = `
      digitalWrite(${LMotorEN}, HIGH);
      digitalWrite(${RMotorEN}, HIGH);
      analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
      analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
      \n`;
            break;
        case "backward":
            code = `
      digitalWrite(${LMotorEN}, LOW);
      digitalWrite(${RMotorEN}, LOW);
      analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
      analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
      \n`;
            break;
        case "left":
            code = `
      digitalWrite(${LMotorEN}, HIGH);
      digitalWrite(${RMotorEN}, HIGH);
      analogWrite(${LMotorPWM},0);
      analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
      \n`;
            break;
        case "right":
            code = `
      digitalWrite(${LMotorEN}, HIGH);
      digitalWrite(${RMotorEN}, HIGH);
      analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
      analogWrite(${RMotorPWM}, 0);
      \n`;
            break;
        case "rleft":
            code = `
      digitalWrite(${LMotorEN}, LOW);
      digitalWrite(${RMotorEN}, HIGH);
      analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
      analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
      \n`;
            break;
        case "rright":
            code = `
      digitalWrite(${LMotorEN}, HIGH);
      digitalWrite(${RMotorEN}, LOW);
      analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
      analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
      \n`;
            break;
    }
    return code;
}

Blockly.JavaScript["mingo_motor_single_move_indef"] = function (block) {
    var dropdown_motorselect = block.getFieldValue('motorselect');
    var dropdown_direction = block.getFieldValue('direction');
    var dropdown_speed = block.getFieldValue('speed');

    if (DCMotorDefined === false) {
        if (block.getRootBlock().type == "m_mainloop") {
            peripheral_PreDeclarations += DCMotorSetup.PreDec;
            peripheral_SetupCode += DCMotorSetup.Setup;
            peripheral_BulkFunctions += DCMotorSetup.Bulk;
            DCMotorDefined = true;
        }
    }

    var code = '...;\n';
    switch (dropdown_direction) {
        case "forward":
            if (dropdown_motorselect == "lm") {
                code = `
                    digitalWrite(${LMotorEN}, HIGH);
                    analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
                    \n`;
            } else if (dropdown_motorselect == "rm") {
                code = `
                    digitalWrite(${RMotorEN}, HIGH);
                    analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
                    \n`;
            }
            break;
        case "backward":
            if (dropdown_motorselect == "lm") {
                code = `
                    digitalWrite(${LMotorEN}, LOW);
                    analogWrite(${LMotorPWM},(int)((${dropdown_speed} * 255)/100));
                    \n`;
            } else if (dropdown_motorselect == "rm") {
                code = `
                    digitalWrite(${RMotorEN}, LOW);
                    analogWrite(${RMotorPWM},(int)((${dropdown_speed} * 255)/100));
                    \n`;
            }
            break;
        case "stop":
            if (dropdown_motorselect == "lm") {
                code = `
                    digitalWrite(${LMotorEN}, HIGH);
                    analogWrite(${LMotorPWM},0);
                    \n`;
            } else if (dropdown_motorselect == "rm") {
                code = `
                    digitalWrite(${RMotorEN}, HIGH);
                    analogWrite(${RMotorPWM},0);
                    \n`;
            }
            break;
    }
    return code;
}

Blockly.JavaScript["mingo_motor_stop_indef"] = function (block) {
    var dropdown_motorselect = block.getFieldValue('motor');

    if (DCMotorDefined === false) {
        if (block.getRootBlock().type == "m_mainloop") {
            peripheral_PreDeclarations += DCMotorSetup.PreDec;
            peripheral_SetupCode += DCMotorSetup.Setup;
            peripheral_BulkFunctions += DCMotorSetup.Bulk;
            DCMotorDefined = true;
        }
    }

    var code = '...;\n';
    switch (dropdown_motorselect) {
        case "all":
            code = `
                digitalWrite(${LMotorEN}, HIGH);
                analogWrite(${LMotorPWM},0);
                digitalWrite(${RMotorEN}, HIGH);
                analogWrite(${RMotorPWM},0);
                \n`;
            break;
        case "left":
            code = `
                digitalWrite(${LMotorEN}, HIGH);
                analogWrite(${LMotorPWM},0);
                \n`;
            break;
        case "right":
            code = `
                digitalWrite(${RMotorEN}, HIGH);
                analogWrite(${RMotorPWM},0);
                \n`;
            break;
    }
    return code;
}

Blockly.JavaScript["mingo_grabber_move"] = function (block) {
    var dropdown_action = block.getFieldValue('action');
    var dropdown_port = block.getFieldValue('port');

    if (ServoDefined === false) {
        if (block.getRootBlock().type == "m_mainloop") {

            switch (dropdown_port) {
                case "1":
                    ServoSetup.Setup = `\n
                    Grabber.attach(${Port1[2]})
                    \n`
                    break;
                case "2":
                    ServoSetup.Setup = `\n
                    Grabber.attach(${Port2[2]})
                    \n`
                    break;
            }


            peripheral_PreDeclarations += ServoSetup.PreDec;
            peripheral_SetupCode += ServoSetup.Setup;
            peripheral_BulkFunctions += ServoSetup.Bulk;

            ServoDefined = true;
        }
    }

    var code = '...;\n';
    switch (dropdown_action) {
        case "open":
            code = `open_grabber(50);\n`
            break;
        case "close":
            code = `close_grabber(50);\n`
            break;
    }

    return code;
}

Blockly.JavaScript["mingo_led_range"] = function (block) {
    var ledSelect = block.getFieldValue('ledSelect');
    var port = block.getFieldValue('port');
    var red = Blockly.JavaScript.valueToCode(block, 'red', Blockly.JavaScript.ORDER_ATOMIC);
    var green = Blockly.JavaScript.valueToCode(block, 'green', Blockly.JavaScript.ORDER_ATOMIC);
    var blue = Blockly.JavaScript.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_ATOMIC);

    if (NeoLEDDefined === false) {
        if (block.getRootBlock().type == "m_mainloop") {

            switch (dropdown_port) {
                case "1":
                    NeoLEDSetup.Setup = `\n
                    Adafruit_NeoPixel pixels(2, ${Port1[3]}, NEO_GRB + NEO_KHZ800);
                    \n`
                    break;
                case "2":
                    NeoLEDSetup.Setup = `\n
                    Adafruit_NeoPixel pixels(2, ${Port[3]}, NEO_GRB + NEO_KHZ800);
                    \n`
                    break;
            }


            peripheral_PreDeclarations += ServoSetup.PreDec;
            peripheral_SetupCode += ServoSetup.Setup;
            peripheral_BulkFunctions += ServoSetup.Bulk;

            ServoDefined = true;
        }
    }

    var code = '...;\n';

    switch (ledSelect) {
        case "all":
            code = `
            pixels.setPixelColor(0,pixels.Color(${red},${green}, ${blue}));
            pixels.setPixelColor(1,pixels.Color(${red},${green}, ${blue}));
            pixels.show();
            \n`
            break;
        case "left":
            code = `
            pixels.setPixelColor(0,pixels.Color(${red},${green}, ${blue}));
            pixels.show();
            \n`
            break;
        case "right":
            code = `
            pixels.setPixelColor(1,pixels.Color(${red},${green}, ${blue}));
            pixels.show();
            \n`
            break;
    }

    return code;
}

Blockly.JavaScript["mingo_led_definite"] = function (block) {
    var ledSelect = block.getFieldValue('ledSelect');
    var port = block.getFieldValue('port');
    var colorSelect = block.getFieldValue('colorSelect');

    if (NeoLEDDefined === false) {
        if (block.getRootBlock().type == "m_mainloop") {

            switch (dropdown_port) {
                case "1":
                    NeoLEDSetup.Setup = `\n
                    Adafruit_NeoPixel pixels(2, ${Port1[3]}, NEO_GRB + NEO_KHZ800);
                    \n`
                    break;
                case "2":
                    NeoLEDSetup.Setup = `\n
                    Adafruit_NeoPixel pixels(2, ${Port[3]}, NEO_GRB + NEO_KHZ800);
                    \n`
                    break;
            }


            peripheral_PreDeclarations += ServoSetup.PreDec;
            peripheral_SetupCode += ServoSetup.Setup;
            peripheral_BulkFunctions += ServoSetup.Bulk;

            ServoDefined = true;
        }
    }

    var code = '...;\n';
    var colorCode = '';

    switch (colorSelect) {
        case "red":
            colorCode = '1, 0 , 0';
            break;
        case "green":
            colorCode = '0, 1 , 0';
            break;
        case "blue":
            colorCode = '0, 0 , 1';
            break;
        case "none":
            colorCode = '0, 0 , 0';
            break;
    }

    switch (ledSelect) {
        case "all":
            code = `
            pixels.setPixelColor(0,pixels.Color(${colorCode}));
            pixels.setPixelColor(1,pixels.Color(${colorCode}));
            pixels.show();
            \n`
            break;
        case "left":
            code = `
            pixels.setPixelColor(0,pixels.Color(${colorCode}));
            pixels.show();
            \n`
            break;
        case "right":
            code = `
            pixels.setPixelColor(1,pixels.Color(${colorCode}));
            pixels.show();
            \n`
            break;
    }

    return code;
}

Blockly.JavaScript["mingo_sound_play"] = function (block) {
    var note = block.getFieldValue('Note');

    var code = `tone(${Buzzer_Pin}, ${note});\n`;

    return code;
}

Blockly.JavaScript["mingo_sound_play_timed"] = function (block) {
    var note = block.getFieldValue('Note');
    var value_buzzer_time = Blockly.JavaScript.valueToCode(block, 'Buzzer Time', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `tone(${Buzzer_Pin}, ${note});\ndelay(${value_buzzer_time * 1000});\nnoTone(${Buzzer_Pin});`;

    return code;
}

Blockly.JavaScript["mingo_sound_stop"] = function (block) {
    var code = `\tnoTone(${Buzzer_Pin});\n`;

    return code;
}

Blockly.JavaScript["mingo_sound_play_song"] = function (block) {
    var song = block.getFieldValue('song');

    var code = `...\n`;
    switch (song) {
        case "merry":
            code = `mPlayer.play_melody(140, MerryChristmas())`;
            break;
        case "bday":
            code = `mPlayer.play_melody(180, HappyBirthday())`;
            break;
        case "sirenA":
            break;
        case "sirenB":
            break;
    }

    return code;
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


export { peripheral_PreDeclarations, peripheral_BulkFunctions, peripheral_SetupCode, clearvars }