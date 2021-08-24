import { BlocklyWorkspace } from 'react-blockly';
import Blockly from "blockly";
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';


import "./customblocks/customblocks";
import "./customblocks/ntypeblocks";
import "./customblocks/compiler/arduino_core";
import './App.css';
import "./customblocks/MelloBlocks"
import "./customblocks/MelloBlocksGen"

const { ipcRenderer } = window.require('electron')

var currentToolbox;
var response = "null";
// Advanced Toolbox
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
        <value name="NAME">
            <block type="text">
                <field name="TEXT"></field>
            </block>
        </value>
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
        <field name="NAME">OPTIONNAME</field>
        <value name="Buzzer Time">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
        </value>
    </block>
</category>
</category>
</xml>`;

const MelloDOM = Blockly.Xml.textToDom(MelloToolbox);

currentToolbox = MelloDOM;
var currentToolboxName = "Mello";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
        <Box>
            {children}
        </Box>
      </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flex: '1 1 100'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  Tabs: {
    position: "relative",
    width: 1000,
    align: "left",
    padding: 0
  },
  Progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  footer: {
    display: 'flex',
    position: "fixed",
    backgroundColor: "#F8F8F8",
    zIndex: 999,
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
  },
  phantom: {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

}));
const laxml = `<xml xmlns="https://developers.google.com/blockly/xml"><block type="n_mainloop" id="E_nLLiJ8ewVBQ%pGS{hU" x="430" y="150"></block></xml>`
var newxml = laxml;
var newxmldom = Blockly.Xml.textToDom(newxml);

function App() {
  
  const [javascriptcode, setJavascriptCode] = useState("");
  const [upload_status, setUploadStatus] = useState("");
  const [tabpanelval, settabpanel] = useState(0);
  const [toolbox_used, setToolboxUsed] = useState(1);
  const [UploadProgress, setUploadProgress] = useState(1);
  const classes = useStyles();
  const [toolboxstate, setChecked] = useState(false);



  const code_change = event => {
    setJavascriptCode(event.target.value);
  }

  const select_toolbox = event => {
    setToolboxUsed(event.target.value);;
switch(event.target.value){
  case 1: 
    currentToolbox = MelloDOM;
    currentToolboxName = "Mello";
    break;
  case 2:
    currentToolbox = newToolBox;
    currentToolboxName = "Basic";
    break;
  case 3:
    currentToolbox = toolboxCategories;
    currentToolboxName = "Advanced"
    break;
}
  }

  const toolboxchange = event => {
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      currentToolbox = toolboxCategories;
    }
    else {
      currentToolbox = newToolBox;
    }
    //console.log(currentToolbox);
  };

  const tabpanelchange = (event, newTabval) => {
    settabpanel(newTabval);
  };

  React.useEffect(() => {
    if (upload_status === "No Arduino Detected" || upload_status === "Upload Successful" || upload_status === "Upload Failed : Error in Code" || upload_status === ""){
      setUploadProgress(1);
    }
    else{
      setUploadProgress(0);
    }
    return UploadProgress;
  });
  function showCode(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    newxmldom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    newxml = Blockly.Xml.domToText(newxmldom);
    if (tabpanelval === 0){
      if (newxml===laxml){}
      else{
        newxmldom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        newxml = Blockly.Xml.domToText(newxmldom);
      }
    }
    else{
      Blockly.Xml.domToWorkspace(newxmldom);
    }
    setJavascriptCode(code);
  }

  // Drawer Stuff
  const [drawer, setDrawer] = useState(false);

  const togglefiledrawer = () => {
    setDrawer(!drawer)
  }

  function clearWorkspace() {
    Blockly.mainWorkspace.clear();
  }


  function exportBlocks() {
    try {
      var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
      var xml_text = Blockly.Xml.domToText(xml);
      console.log("Saving the following: " + xml_text);
      ipcRenderer.send('save-file', xml_text)
    } catch (e) {
      alert(e);
    }
  }

  function loadBlocks() {
    try {
      console.log("Loading a file...")
      var xmlss = Blockly.Xml.textToDom(ipcRenderer.sendSync('load-file'))
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(xmlss, Blockly.mainWorkspace);
    } catch (e) {
      throw e;
    }
  }

  async function uploadCode_ipc() {
    response = 'Uploading code';
    setUploadStatus(response);
    //console.log(response);
    response = 'Awaiting Response from Arduino';
    setUploadStatus(response);
    //console.log(response);
    //setUploadStatus(response);
    ipcRenderer.invoke('upload-code', javascriptcode);
    ipcRenderer.on('arduino_comport',(event,result)=>{
      console.log(result);
      response=result;
      setUploadStatus(`Arduino found on ${response}`);
    });

    ipcRenderer.on('arduino_upload_status', (event, result) => {
      console.log(result);
      response = result;
      setUploadStatus(response);
    });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={togglefiledrawer}>
            <MenuIcon />
            <Drawer
              className={classes.drawerPaper}
              variant="temporary"
              open={drawer}
              onClose={togglefiledrawer}
              width={500}
            >
              <List>
                <ListItem>
                  <Button color="inherit" onClick={exportBlocks}>Save</Button>
                </ListItem>
                <ListItem>
                  <Button color="inherit" onClick={loadBlocks}>Load</Button>
                </ListItem>
                <ListItem>
                  <Button color="inherit" onClick={clearWorkspace}>Clear Workspace</Button>
                </ListItem>
              </List>
            </Drawer>
          </IconButton>
          <Typography component = "span" variant="h2" className={classes.title}>
            Mintduino
          </Typography>
          {UploadProgress == 0 &&
              <CircularProgress color="secondary"/>
            }
          <Button color="inherit" onClick={uploadCode_ipc}>Upload</Button>
          {/* <FormGroup>
            <FormControlLabel
              color="inherit" control={
                <Switch
                  checked={toolboxstate}
                  onChange={toolboxchange}
                  onClick={toolboxchange}
                  value={toolboxstate}
                  name="toolbox"
                />
              }
              labelPlacement="start"
              label="Advanced Toolbox"
            />
          </FormGroup> */}
        <FormControl>
        <InputLabel id="Toolbox Select">Toolbox</InputLabel>
        <Select
          labelId="Toolbox Select"
          id="Toolbox Select"
          value={toolbox_used}
          variant="outlined"
          onChange={select_toolbox}
        >
          <MenuItem value={1}>Mello Toolbox</MenuItem>
          <MenuItem value={2}>Basic Toolbox</MenuItem>
          <MenuItem value={3}>Advanced Toolbox</MenuItem>
        </Select>
      </FormControl>
        </Toolbar>
      </AppBar>
          <div>
          <Tabs value={tabpanelval} onChange={tabpanelchange} >
            <Tab label="Blockly Workspace" {...a11yProps(0)} />
            <Tab label="Code Generated" {...a11yProps(1)} />
            <Tab label="Edit Code" {...a11yProps(2)} />
            <Tab label="Serial Monitor" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={tabpanelval} index={0} className = {classes.Tabs}>
            <div className="BlocklyDiv">
              <BlocklyWorkspace
                className="fill-height"
                wrapperClassName="fill-height"
                initialXml={newxml}
                toolboxConfiguration={currentToolbox}
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
              </div>
          </TabPanel>
          <TabPanel value={tabpanelval} index={1}>
            <TextField id="outlined-basic" variant="outlined" value={javascriptcode} disabled={true} multiline = {true} fullWidth = {true} align="justify"/>
          </TabPanel>
          <TabPanel value={tabpanelval} index={2}>
          <TextField id="outlined-basic" variant="outlined" value={javascriptcode} disabled={false} multiline = {true} fullWidth = {true} align="justify" onChange={code_change}/>
          </TabPanel>
          <TabPanel value={tabpanelval} index={3}>
            </TabPanel>
          </div>
          <div className={classes.footer}>
            <TextField display="block" disabled = {true} variant="outlined" value = {"Upload Status : " + upload_status} fullWidth = {true}></TextField>

          </div>
      </div>

      
  );
}

export default App;
export {currentToolboxName};