import { BlocklyWorkspace } from 'react-blockly';
import Blockly from "blockly";
import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import "./customblocks/customblocks";
import "./customblocks/ntypeblocks";
import './App.css';

function App() {
  const [xml, setXml] = useState("");
  const [javascriptcode, setJavascriptCode] = useState("");

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
  };

  const newToolBox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind:"block",
            type:"controls_if"
          },
          {
            kind:"block",
            type:"logic_compare"
          }
        ]
      },
      {
        kind: "category",
        name: "Loops",
        colour: "#5C81A6",
        contents:[
          {
            kind:"block",
            type:"controls_whileUntil"
          },
          {
            kind:"block",
            type:"n_mainloop"
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
            kind:"category",
            name:"Servo Motor",
            contents: [
              {
                kind: "block",
                type: "n_servo_rotate"
              }
            ]
          },
          {
            kind:"category",
            name:"LED",
            contents: [
              {
                kind: "block",
                type: "n_led_state"
              },
              {
                kind: "block",
                type: "n_writestate_ledon"
              },
              {
                kind: "block",
                type: "n_writestate_ledoff"
              }
            ]
          },
          {
            kind:"category",
            name:"Buzzer",
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
        contents:[
          {
            kind: "block",
            type: "n_delay"
          }
        ]
      }
    ]
  }

  function showCode(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  function uploadCode(workspace) {
    var code = javascriptcode;
    console.log("Compiled Code");
    alert("Ready to upload to Arduino.");
    var url = "http://127.0.0.1:8080/";
    var method = "POST";
    var async = true;
    var request = new XMLHttpRequest();
  
    request.onreadystatechange = function() {
      if (request.readyState !== 4) { 
          return; 
      }
      var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
          var errorInfo = null;
          switch (status) {
          case 200:
              errorInfo = "Code Upload Success";
              break;
          case 0:
              errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
              break;
          case 400:
              errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
              break;
          case 500:
              errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
              break;
          case 501:
              errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
              break;
          default:
              errorInfo = "code " + status + "\n\nUnknown error.";
              break;
          };
          
          alert(errorInfo);
      };
  
      request.open(method, url, async);
      request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      request.send(code);	    
  
  }

    return (
          <div className="App">
            <Button variant="contained" color="primary" onClick={uploadCode}>Upload Code</Button>
            <div className="App">
              <BlocklyWorkspace
                className="fill-height"
                wrapperClassName="fill-height"
                initialxml={xml}
                onXmlChange={setXml}
                toolboxConfiguration = {newToolBox}
                workspaceConfiguration={{
                  grid: {
                    spacing: 20,
                    length: 3,
                    colour: "#ccc",
                    snap: true,
                    wheel: true,
                  },
                }}
                onWorkspaceChange={showCode}
              />
              <textarea
                id="code"
                className="texter"
                value={javascriptcode}
                readOnly
              ></textarea>
            </div>
        </div>
      );
}

export default App;