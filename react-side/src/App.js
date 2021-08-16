import { BlocklyWorkspace} from 'react-blockly';
import Blockly from "blockly";
import React,{ useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';


import "./customblocks/customblocks";
import "./customblocks/ntypeblocks";
import './App.css';

const {ipcRenderer} = window.require('electron')

var currentToolbox;

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
currentToolbox = newToolBox;

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
  const [xml, setXml] = useState("");
  const [javascriptcode, setJavascriptCode] = useState("");
  const classes = useStyles();
  
  const [toolboxstate, setChecked] = React.useState();
  
  const toolboxchange = event => {
    setChecked(event.target.checked);
    if (event.target.checked==true) {
      currentToolbox = toolboxCategories;
    }
    else{
      currentToolbox = newToolBox;
    }
    console.log(currentToolbox);
  };

  function showCode(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  function uploadCode(workspace, callback) {
    var code = javascriptcode;
    console.log("Compiled Code");
    var url = "http://127.0.0.1:8080/";
    var method = "POST";
    var async = true;
    var request = new XMLHttpRequest();
  
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) { 
          console.log("Code Done Uploading");
      }
      else{
        //console.log(request.status);
      }
      {
         var status = parseInt(request.status); 
           console.log(status);
           var errorInfo = null;
           switch (status) {
          case 200:
              errorInfo = "Code Upload Success";
              break;
          case 400:
              errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
              break;
          case 401:
              errorInfo = "No Arduino connection found"
              break;
          case 402:
              errorInfo = "Upload Failed"
              break;
          default:
              errorInfo = "code " + status + "\n\nUnknown error.";
              break;
          };
          console.log(errorInfo);
      }
      };
      request.open(method, url, async);
      request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      request.send(code);
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

  function loadBlocks(){
    try{
      ipcRenderer.send('load-file')
    }catch (e) {
      alert(e);
    }
  }

  ipcRenderer.on("return-load",async function(event, data){
    Blockly.mainWorkspace.clear();
    console.log(data);
    var xmlss = await Blockly.Xml.textToDom(data);
    Blockly.Xml.domToWorkspace(xmlss, Blockly.mainWorkspace);
  })

    return (
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={togglefiledrawer}>
                  <MenuIcon />
                  <Drawer
                    className={classes.drawerPaper}
                    variant="temporary"
                    open = {drawer}
                    onClick={onItemClick}
                    onClose={togglefiledrawer}
                    width = {500}
                  >
                    <List>
                      <ListItem>
                        <Button color="inherit" onClick={exportBlocks}>Save</Button>
                      </ListItem>
                      <ListItem>
                        <Button color="inherit" onClick={loadBlocks}>Load</Button>
                      </ListItem>
                    </List>
                  </Drawer>
                </IconButton>
                <Typography variant="h2" className={classes.title}>
                  Mintduino
                </Typography>
                <Button color="inherit" onClick={uploadCode}>Upload</Button>
                <FormGroup>
                <FormControlLabel
                    color = "inherit" control={
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
                initialxml={xml}
                onXmlChange={setXml}
                toolboxConfiguration = {currentToolbox}
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
                value={javascriptcode}
                readOnly
              ></textarea>
            </div>
        </div>
      );
}

export default App;