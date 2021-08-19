import { BlocklyWorkspace } from 'react-blockly';
import Blockly from "blockly";
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import "./customblocks/customblocks";
import "./customblocks/ntypeblocks";
import './App.css';

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

currentToolbox = newToolBox;

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
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    width: 1000
  }
}));

function App() {
  const [laxml, setXml] = useState(`<xml xmlns="https://developers.google.com/blockly/xml"><block type="n_mainloop" id="E_nLLiJ8ewVBQ%pGS{hU" x="430" y="150"></block></xml>`);
  const [javascriptcode, setJavascriptCode] = useState("");
  const [upload_status, setUploadStatus] = useState("");
  const [tabpanelval, settabpanel] = useState(0);

  const classes = useStyles();

  const [toolboxstate, setChecked] = useState();

  const toolboxchange = event => {
    setChecked(event.target.checked);
    if (event.target.checked == true) {
      currentToolbox = toolboxCategories;
    }
    else {
      currentToolbox = newToolBox;
    }
    console.log(currentToolbox);
  };

  const tabpanelchange = (event, newTabval) => {
    settabpanel(newTabval);
  };

  function showCode(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  // Drawer Stuff
  const [drawer, setDrawer] = useState(false);
  const [state, setState] = React.useState(false)

  const list = () => {
    <List>
      <ListItem>Hello World, it works!</ListItem>
    </List>
  }

  const togglefiledrawer = () => {
    setDrawer(!drawer)
  }

  const onItemClick = () => {
    setDrawer(Drawer.variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };

  function clearWorkspace() {
    Blockly.mainWorkspace.clear();
  }


  function exportBlocks() {
    try {
      var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
      var xml_text = Blockly.Xml.domToText(xml);
      console.log(xml_text);
      ipcRenderer.send('save-file', xml_text)
    } catch (e) {
      alert(e);
    }
  }

  function loadBlocks() {
    try {
      alert("Load-File -> Electron main.js")
      var xmlss = Blockly.Xml.textToDom(ipcRenderer.sendSync('load-file'))
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(xmlss, Blockly.mainWorkspace);
    } catch (e) {
      alert(e);
    }
  }

  async function uploadCode_ipc() {
    response = 'Attempting to upload code';
    setUploadStatus(response);
    console.log(response);
    response = 'Awaiting Response from Arduino'
    console.log(response);
    //setUploadStatus(response);
    ipcRenderer.invoke('upload-code', javascriptcode);
    ipcRenderer.on('return_arduino', (event, result) => {
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
              onClick={onItemClick}
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
          <Typography variant="h2" className={classes.title}>
            Mintduino
          </Typography>
          <Button color="inherit" onClick={uploadCode_ipc}>Upload</Button>
          <FormGroup>
            <FormControlLabel
              color="inherit" control={
                <Switch
                  checked={toolboxstate}
                  onChange={toolboxchange}
                  value={toolboxstate}
                  name="toolbox"
                />
              }
              labelPlacement="start"
              label="Advanced Toolbox"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>

      <div className="App">
        <BlocklyWorkspace
          className="fill-height"
          wrapperClassName="fill-height"
          initialXml={laxml}
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
        <div>
          <Tabs color="inherit" value={tabpanelval} onChange={tabpanelchange} aria-label="simple tabs example">
            <Tab label="Upload Status" {...a11yProps(0)} />
            <Tab label="Code Generated" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={tabpanelval} index={0}>
            <Typography align="center" color="inherit" display="block" variant="button">Upload Status : {upload_status}</Typography>
          </TabPanel>
          <TabPanel value={tabpanelval} index={1}>
            <textarea
              id="code"
              value={javascriptcode}
              readOnly
            ></textarea>
          </TabPanel>

        </div>


      </div>
    </div>
  );
}

export default App;