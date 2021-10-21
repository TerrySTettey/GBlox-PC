var DeviceList = []
const full_toolbox = [{
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
    {
      kind: "category",
      name: "Variables",
      colour: "#2CB254",
      contents: [
        {
          kind: "button",
          text: "Create New Variable",
          callbackKey: "createvar"
        },
        {
          kind: "block",
          type: "variable_get"
        },
        {
          kind: "block",
          type: "variable_set"
        },

      ],
    },
  ],
}]

function device(device_name, compiler, microcontroller, toolbox, default_workspace, peripherals_used, peripherals_pins) {
  this.device_name = device_name;
  this.compiler = compiler;
  this.microcontroller = microcontroller;
  this.toolbox = toolbox;
  this.default_workspace = default_workspace;
  this.peripherals_used = peripherals_used;
  this.peripherals_pins = peripherals_pins;
}

const Arduino_Uno = new device(
  "Arduino Uno",
  "Arduino",
  "Arduino Uno",
  full_toolbox,
  `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`,
  [`Digital Pins`, `Analog Pins`, `Ultrasonic Sensor`, `Buzzer`, `Servo Motor`, `Bluetooth Receiver`, `Infrared Receiver`, `Neopixel Led`, `LCD`],
  undefined
);

const Arduino_Nano = new device(
  "Arduino Nano",
  "Arduino",
  "Arduino Nano",
  full_toolbox,
  `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`,
  [`Digital Pins`, `Analog Pins`, `Ultrasonic Sensor`, `Buzzer`, `Servo Motor`, `Bluetooth Receiver`, `Infrared Receiver`, `Neopixel Led`, `LCD`],
  undefined
);

const Mello_Bot = new device(
  "Mello",
  "Arduino",
  "Arduino Nano",
  [`<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category css-icon="customIcon fa fa-cog" name="Logic" colour="#5b80a5">
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
      <block type="for_loop">
      </block>
      <block type="controls_whileUntil">
          <field name="MODE">WHILE</field>
      </block>
      <block type="delay_core">
      <field name= "seconds" type="number"></field>
      </block>
  </category>
  <category css-icon="customIcon fa fa-cog" name="Math" colour="#5b67a5">
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
  <category css-icon="customIcon fa fa-cog" name="Text" colour="#5ba58c">
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
  <category css-icon="customIcon fa fa-cog" name="Actuators" colour="#05386B">
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
  </category>
  <category css-icon="customIcon fa fa-cog" name="Sensors">
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
  <category css-icon="customIcon fa fa-cog" name="COM">
    <category name="IR Control">
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
  <category css-icon="customIcon fa fa-cog" name="LEDs">
    <category css-icon="customIcon fa fa-cog" name="RGB LED">
        <block type="led_rgb_led">
            <field name="LED">Left</field>
            <field name="colour">Red</field>
            <field name="colour value">On</field>
        </block>
        <block type="led_rgb_led_all">
            <field name="LED">Left</field>
            <field name="colour">Red</field>
        </block>
    </category>
  </category>
  <category css-icon="customIcon fa fa-cog" name="Sound">
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
      <block type="sound_buzzer_stop"></block>
  </category>
  </category>

  <category name="Variables">
  <button text="Create New Variable" callbackKey="createvar"></button>
  <block type="variable_get"></block>
<block type="variable_set"></block>
  </category>
  
  </xml>`],
  `<xml xmlns="https://developers.google.com/blockly/xml"><block type="m_mainloop" x="430" y="150"></block></xml>`,
  [`Ultrasonic Sensor`, `Wheel Servo Motor A`, `Wheel Servo Motor B`, `Forklift Servo Motor C`, `Light Follower A`, `Light Follower B`, `Line Follower A`, `Line Follower B`, `Infrared Receiver`, `Bluetooth Receiver`, `RGB Led`, `Buzzer`],
  [[`Ultrasonic`, [11, 10]], [`Light Follower`, [`A0`, `A1`]], [`Line Follower`, [`A2`, `A3`]], [`Servo`, [9, 8, 10]], [`IR_Remote`, 3], [`Bluetooth`, [12, 13]], [`RGB Led`, [6, 4, 5]], [`Buzzer`, 7]]
);

const Mingo_Bot = new device(
  "Mingo",
  "Arduino",
  "Arduino Nano",
  full_toolbox,
  `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`,
  [`Line Follower`, `Ultrasonic Sensor`, `Infrared Receiver`, `Light Sensor`, `DC Motor (TB6612)`, `NeoPixel Led`],
  undefined
);

DeviceList.push(Arduino_Uno)
DeviceList.push(Arduino_Nano)
DeviceList.push(Mello_Bot)
DeviceList.push(Mingo_Bot)

export { DeviceList }