import Blockly from "blockly";
const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "logic_compare",
          },
        ],
      },
      {
        kind: "category",
        name: "Loops",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "for_loop",
          },
          {
            kind: "block",
            type: "controls_whileUntil",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
        ],
      },
      {
        kind: "category",
        name: "Functional Blocks",
        colour: "#5CA699",
        contents: [
          {
            kind: "block",
            type: "main_block",
          },
          {
            kind: "block",
            type: "delay",
          },
        ],
      },
      {
        kind: "category",
        name: "Digital",
        colour: "#5DB254",
        contents: [
          {
            kind: "block",
            type: "pin_setup"
          },
          {
            kind: "block",
            type: "digital_pin_write"
          },
          {
            kind: "block",
            type: "digital_read"
          },
        ],
      },
      {
        kind: "category",
        name: "Analog",
        colour: "#2DB254",
        contents: [
          {
            kind: "block",
            type: "pin_setup"
          },
          {
            kind: "block",
            type: "analog_write"
          },
          {
            kind: "block",
            type: "analog_read"
          },
        ],
      },
      {
        kind: "category",
        name: "Sensors",
        colour: "#4DB254",
        contents: [
          {
            kind: "block",
            type: "ultrasonic_sensor"
          },
          {
            kind: "block",
            type: "ultrasonic_sensor_setup"
          },
        ],
      },
      {
        kind: "category",
        name: "Actuators",
        colour: "#2CB254",
        contents: [
          {
            kind: "block",
            type: "servo_write"
          },
        ],
      },
    ],
  }
  // Beginner Toolbox
  const newToolBox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "controls_if"
          },
          {
            kind: "block",
            type: "logic_compare"
          }
        ]
      },
      {
        kind: "category",
        name: "Loops",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "controls_whileUntil"
          },
          {
            kind: "block",
            type: "n_mainloop"
          }
        ]
      },
      {
        kind: "category",
        name: "Math",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "math_number"
          },
          {
            kind: "block",
            type: "math_round"
          }
        ]
      },
      {
        kind: "category",
        name: "Sensors",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "n_ultra_read"
          }
        ]
      },
      {
        kind: "category",
        name: "Actuators",
        colour: "#5C81A6",
        contents: [
          {
            kind: "category",
            name: "Servo Motor",
            contents: [
              {
                kind: "block",
                type: "n_servo_rotate"
              }
            ]
          },
          {
            kind: "category",
            name: "LED",
            contents: [
              {
                kind: "block",
                type: "n_led_state"
              }
            ]
          },
          {
            kind: "category",
            name: "Buzzer",
            contents: [
              {
                kind: "block",
                type: "n_buzzer_play"
              },
              {
                kind: "block",
                type: "n_buzzer_stop"
              },
              {
                kind: "block",
                type: "n_buzzer_play_def"
              },
              {
                kind: "block",
                type: "n_note"
              },
              {
                kind: "block",
                type: "n_buzzer_play_note"
              },
              {
                kind: "block",
                type: "n_buzzer_play_note_def"
              }
            ]
          }
        ]
      },
      {
        kind: "category",
        name: "Core Functions",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "n_delay"
          }
        ]
      }
    ]
  }
  //Mello Toolbox
  const MelloToolbox = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Logic" colour="#5b80a5">
      <block type="controls_if"></block>
      <block type="logic_compare">
          <field name="OP">EQ</field>
      </block>
      <block type="logic_operation">
          <field name="OP">AND</field>
      </block>
      <block type="logic_negate"></block>
      <block type="logic_boolean">
          <field name="BOOL">TRUE</field>
      </block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
  </category>
  <category name="Loops" colour="#5ba55b">
      <block type="controls_repeat_ext">
          <value name="TIMES">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>
      <block type="controls_whileUntil">
          <field name="MODE">WHILE</field>
      </block>
  </category>
  <category name="Math" colour="#5b67a5">
      <block type="math_number">
          <field name="NUM">0</field>
      </block>
      <block type="math_arithmetic">
          <field name="OP">ADD</field>
          <value name="A">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
          <value name="B">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
      </block>
      <block type="math_number_property">
          <mutation divisor_input="false"></mutation>
          <field name="PROPERTY">EVEN</field>
          <value name="NUMBER_TO_CHECK">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>
  </category>
  <category name="Text" colour="#5ba58c">
      <block type="text">
        <field name="TEXT"></field>
      </block>
      <block type="text_join">
        <mutation items="2"></mutation>
      </block>
      <block type="text_length">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_isEmpty">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
      <block type="text_changeCase">
        <field name="CASE">UPPERCASE</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_trim">
        <field name="MODE">BOTH</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_prompt_ext">
        <mutation type="TEXT"></mutation>
        <field name="TYPE">TEXT</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
    </category>
  <category name="Actuators">
    <category name="Motor">
    <block type="motor_move_indef">
      <field name="direction">forward</field>
    </block>
    <block type="motor_single_move_indef">
      <field name="motorselect">lm</field>
      <field name="direction">forward</field>
    </block>
    <block type="motor_move_seconds">
      <field name="direction">forward</field>
      <value name="seconds">
        <block type="math_number">
          <field name="NUM">0</field>
        </block>
      </value>
    </block>
    </category>
    <category name="Forklift">
    <block type="forklift_move_seconds">
      <field name="direction">up</field>
      <field name="speed">slow</field>
      <value name="seconds">
        <block type="math_number">
          <field name="NUM">0</field>
        </block>
      </value>
    </block>
    <block type="forklift_move_indef">
      <field name="direction">up</field>
      <field name="speed">slow</field>
    </block>
    </category>
    <category name="Servo">
    <block type="servo_rotate_to_degrees"></block>
    <block type="servo_360_rotate_direction">
      <field name="direction">cw</field>
      <field name="speed">slow</field>
    </block>
    </category>
  </category>
  <category name="Sensors">
  <category name="Ultrasonic">
      <block type="sensor_ultrasonic"></block>
  </category>
  <category name="Light Follower">
      <block type="sensor_light_follower_right"></block>
      <block type="sensor_light_follower_left"></block>
  </category>
  <category name="Line Follower">
      <block type="sensor_line_follower_right">
          <field name="Right Line Follower Value">On</field>
      </block>
      <block type="sensor_line_follower_left">
          <field name="Left Line Follower Value">On</field>
      </block>
  </category>
  </category>
  <category name="Communication">
  <category name="Infrared Remote Control">
      <block type="communication_infrared_start"></block>
      <block type="communication_infrared_value">
          <field name="Received_Character">FF629D</field>
      </block>
  </category>
  <category name="Bluetooth">
      <block type="communication_bluetooth_start"></block>
      <block type="communication_bluetooth_receive">
          <value name="NAME">
              <block type="text">
                  <field name="TEXT"></field>
              </block>
          </value>
      </block>
      <block type="communincation_bluetooth_send">
          <value name="NAME">
              <block type="text">
                  <field name="TEXT"></field>
              </block>
          </value>
      </block>
  </category>
  <category name="Serial">
  <block type="communication_serial_print"></block>
  <block type="communication_serial_read"></block>
  </category>
  </category>
  <category name="LEDs">
  <category name="RGB LED">
      <block type="led_rgb_led">
          <field name="LED">Left</field>
          <field name="colour">Red</field>
          <field name="colour value">On</field>
      </block>
  </category>
  <category name="NeoPixel LED">
      <block type="led_neo_led">
          <field name="NeoPixel LED">Left</field>
          <value name="Red Value">
              <block type="math_number">
                  <field name="NUM">0</field>
              </block>
          </value>
          <value name="Green Value">
              <block type="math_number">
                  <field name="NUM">0</field>
              </block>
          </value>
          <value name="Blue Value">
              <block type="math_number">
                  <field name="NUM">0</field>
              </block>
          </value>
      </block>
  </category>
  </category>
  <category name="Sound">
  <category name="Buzzer">
      <block type="sound_buzzer_timer">
          <field name="note">1047</field>
          <value name="Buzzer Time">
              <block type="math_number">
                  <field name="NUM">0</field>
              </block>
          </value>
      </block>
      <block type="sound_buzzer_buzz">
        <field name="Note">1047</field>
      </block>
  </category>
  </category>

  <category name="Variables">
  <button text="Create New Variable" callbackKey="createvar"></button>
  <block type="variable_get"></block>
<block type="variable_set"></block>
  </category>
  
  </xml>`;
  
  const MelloDOM = Blockly.Xml.textToDom(MelloToolbox);

  export {toolboxCategories, newToolBox, MelloToolbox, MelloDOM}