import Blockly from "blockly";
import React, { useState, useEffect, forceUpdate } from 'react';


import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
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

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import "./customblocks/customblocks";
// import "./customblocks/ntypeblocks";
import "./customblocks/compiler/arduino_core";
import "./customblocks/peripherals/arduino_peripheral"
import './App.css';
import "./customblocks/MelloBlocks"
import "./customblocks/MelloBlocksGen"
import "./blocklyextras/custom_category"
import "./blocklyextras/toolbox_style.css"

import { Header } from "./components/Header/Header"
import { Body } from "./components/Body/Body"

import { toolboxCategories, newToolBox, MelloToolbox, MelloDOM } from "./customblocks/toolboxes/toolboxes"
import { mainLoopCode } from "./customblocks/compiler/arduino_core"
const { ipcRenderer } = window.require('electron')

var currentToolbox;
var response = "null";
currentToolbox = MelloDOM;
var currentToolboxName = "Mello";
var variables_created = [];
var OurWorkspace;
var workspaces = [undefined];

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
  footerdd: {
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

const component_styles = {
  "workspaceBackgroundColour": "#1f1254",
  "toolboxBackgroundColour": "#03254c"
}

const block_styles = {
  "loop_blocks": {
    "colourPrimary": "#c7b01a",
    "colourSecondary": "#AD7BE9",
    "colourTertiary": "#CDB6E9"
  },
  "logic_blocks": {
    "colourPrimary": "#c91818",
    "colourSecondary": "#64C7FF",
    "colourTertiary": "#C5EAFF"
  },
  "math_blocks": {
    "colourPrimary": "#03254c",
    "colourSecondary": "#A334C5",
    "colourTertiary": "#A3DB55"
  },
  "colour_blocks": {
    "colourPrimary": "#23445b",
    "colourSecondary": "#dbc7bd",
    "colourTertiary": "#845d49"
  },
  "variable_blocks": {
    "colourPrimary": "#525b99",
    "colourSecondary": "#dbbdd6",
    "colourTertiary": "#84497a"
  },
  "procedure_blocks": {
    "colourPrimary": "#995ba5",
    "colourSecondary": "#d6bddb",
    "colourTertiary": "#7a4984"
  },

}

var test_theme = Blockly.Theme.defineTheme('test_theme', {
  'blockStyles': block_styles,
  'componentStyles': component_styles,
  'startHats': true
});

const mello_laxml = `<xml xmlns="https://developers.google.com/blockly/xml"><block type="m_mainloop" x="430" y="150"></block></xml>`;
if (currentToolboxName == "Mello") {
  var newxml = mello_laxml;
  var newxmldom = Blockly.Xml.textToDom(newxml);
}
var newWorkspaceTab = 0;
const WorkspaceTabs = () => {

  const [workspacebuttons, setWorkspacebuttons] = useState([<div id={`Tab ${1}`}>
    <button id={`workspace_${1}`} onClick={(event, reason) => {
      workspaceTabchange(event);
      setWorkspaceTab(event.currentTarget.value - 1);
    }} value={1}>{`Workspace ${1}`}</button>
    <button value={1} onClick={(event, reason) => { deleteTab(event) }}>x</button></div>]);
  const [workspaceTab, setWorkspaceTab] = useState(1);
  const workspaceTabchange = (event) => {
    const currentWorkspace = Blockly.Xml.workspaceToDom(OurWorkspace);
    //Save old Workspace
    workspaces[newWorkspaceTab] = currentWorkspace;
    newWorkspaceTab = event.currentTarget.value - 1;
    console.log(workspaceTab)
    //Load new Workspace
    if (workspaces[newWorkspaceTab] !== undefined || null) {
      OurWorkspace.clear();
      Blockly.Xml.domToWorkspace(workspaces[newWorkspaceTab], OurWorkspace);
      console.log("Loaded workspace")
    }
    else {
      OurWorkspace.clear();
      workspaces[newWorkspaceTab] = Blockly.Xml.workspaceToDom(OurWorkspace);
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(mello_laxml), OurWorkspace);
      console.log("New Workspace Save");
    }
  }

  const deleteTab = (event) => {
    console.log(`Deleting Tab ${event.currentTarget.value}`)
    var tab = event.currentTarget.value - 1;
    setWorkspacebuttons(workspacebuttons => workspacebuttons.slice(0, tab).concat(workspacebuttons.slice(tab + 1)));
    workspaces.splice(event.currentTarget.value - 1, 1)
    console.log("Deleted Workspace")
    console.log(workspaces)
    try{
    var button = document.getElementById(`workspace_${tab+1}`)
    button.click()
    }
    catch(e){}
  }

  useEffect(() => {
    try{
    var next_tab = document.getElementById(`workspaceTabs`).children
    console.log(next_tab)
    for (var i = 0; i < workspaces.length-1; i++) {
      next_tab[i].id=`Tab ${i+1}`;
      next_tab[i].children[0].id = `workspace_${i+1}`
      next_tab[i].children[0].innerHTML = `Workspace ${i+1}`
      next_tab[i].children[1].id = `Close Button ${i+1}`
      next_tab[i].children[1].value=i+1
    }
  }
  catch(e){}
  })

  const addworkspaceTab = event => {
    var currenttab = workspacebuttons.length + 1;
    if (document.getElementById(`Tab ${workspacebuttons.length + 1}`) === null) {
      console.log("New Workspace Created");
      setWorkspacebuttons(workspacebuttons.concat(
        <div id={`Tab ${workspacebuttons.length + 1}`}>
          <button id={`workspace_${workspacebuttons.length + 1}`} onClick={(event, reason) => {
            workspaceTabchange(event);
            setWorkspaceTab(event.currentTarget.value - 1);
            console.log(workspaceTab)
          }} value={currenttab}>{`Workspace ${workspacebuttons.length + 1}`}</button>
          <button id={`Close Button ${workspacebuttons.length + 1}`} value={currenttab} onClick={(event, reason) => {
            deleteTab(event);
          }}>x</button></div>));
      console.log(workspacebuttons)
      workspaces.push(undefined)
    }
    else {
      console.log("New Workspace Created");
      currenttab += 1;
      setWorkspacebuttons(workspacebuttons.concat(
        <div id={`Tab ${workspacebuttons.length + 2}`}>
          <button id={`workspace_${workspacebuttons.length + 2}`} onClick={(event, reason) => {
            workspaceTabchange(event);
            setWorkspaceTab(event.currentTarget.value - 1);
            console.log(workspaceTab)
          }} value={currenttab + 1}>{`Workspace ${workspacebuttons.length + 2}`}</button>
          <button id={`Close Button ${workspacebuttons.length + 2}`} value={currenttab + 1} onClick={(event, reason) => {
            deleteTab(event);
          }}>x</button></div>));
      console.log(workspacebuttons)
      workspaces.push(undefined)
    }

  };
  return (
    <div id={`workspaceTabs`}>
      {workspacebuttons}
      <Button onClick={addworkspaceTab}>Add Workspace Tab</Button>
    </div>
  )
}

function App() {

  /*
  Blockly.Themes.FutureRetro = Blockly.Theme.defineTheme('futureRetro', 
  {
    'blockStyles': {
      "colourPrimary": "#4a148c",
      "colourSecondary":"#AD7BE9",
      "colourTertiary":"#CDB6E9"
    },
    'categoryStyles':{
      "colour": "#4a148c"
    },
    'componentStyles':{
      'workspaceBackgroundColour': '#1e1e1e'
    },
  });
  */

  const [javascriptcode, setJavascriptCode] = useState("");
  const [upload_status, setUploadStatus] = useState("");
  const [tabpanelval, settabpanel] = useState(0);
  const [toolbox_used, setToolboxUsed] = useState(1);
  const [UploadProgress, setUploadProgress] = useState(1);
  const classes = useStyles();
  const [serialport_monitor, setSerialPortMonitor] = useState([]);
  const [serialport_value, setSerialPortWrite] = useState("");
  const [newvariable_name, setNewVariableName] = useState("");
  const [newvariable_type, setNewVariableType] = useState("float");
  const [dialog_open, setDialogOpen] = useState(false);



  const code_change = event => {
    setJavascriptCode(event.target.value);
  }

  const select_toolbox = event => {
    setToolboxUsed(event.target.value);;
    switch (event.target.value) {
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
    console.log("switch?")
    if (OurWorkspace !== null && OurWorkspace !== undefined) {
      console.log("Ye")
      OurWorkspace.updateToolbox(currentToolbox);
      if (currentToolboxName === "Mello") {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(mello_laxml), OurWorkspace);
      }
    }
  }


  const tabpanelchange = (event, newTabval) => {
    const oldTabval = tabpanelval;
    settabpanel(newTabval);
    if (newTabval === 3) {
      if (newTabval !== oldTabval) {
        ipcRenderer.invoke(`serialport_retreive`);
        serialport_read();
      }
    }
    else {
      ipcRenderer.invoke(`serialport_close`);
      setSerialPortMonitor([]);
    }
  };

  const serialport_change = (event) => {
    setSerialPortWrite(event.target.value);
  }

  const variable_name_set = (event) => {
    setNewVariableName(event.target.value);
  }

  const variable_type_set = (event) => {
    setNewVariableType(event.target.value);
  }

  function logbutton() {
    console.log("Button Pressed");
    setDialogOpen(true);
  }

  function sendvariables() {
    variables_created.push([`${newvariable_type} ${newvariable_name}`, `${newvariable_name}`]);
    console.log(variables_created);
  }

  function closedialog() {
    setDialogOpen(false);
    sendvariables();
  }

  function showCode(workspace) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    if (currentToolboxName === "Mello" || currentToolboxName === "Basic") {
      code = mainLoopCode;
    }
    Blockly.mainWorkspace.registerButtonCallback("createvar", logbutton)
    newxmldom = Blockly.Xml.workspaceToDom(workspace);
    newxml = Blockly.Xml.domToText(newxmldom);
    if (tabpanelval === 0) {
    }
    else {
      Blockly.Xml.domToWorkspace(newxmldom, workspace);
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
    if (currentToolboxName === "Mello" || currentToolboxName === "Basic") {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(mello_laxml), Blockly.mainWorkspace);
    }
  }

  function serialport_read() {
    ipcRenderer.on('serialport_monitor', (event, result) => {
      setSerialPortMonitor(result);
      //console.log(serialport_results);
    });
  }

  function serialport_write() {
    ipcRenderer.invoke("serialport_write", serialport_value);
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
      var hold = ipcRenderer.sendSync('load-file')
      if (hold !== "nil") {
        var xmlss = Blockly.Xml.textToDom(hold)
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(xmlss, Blockly.mainWorkspace);
      }
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
    ipcRenderer.on('arduino_comport', (event, result) => {
      response = result;
      setUploadStatus(`Arduino found on ${response}`);
    });

    ipcRenderer.on('arduino_upload_status', (event, result) => {
      response = result;
      setUploadStatus(response);
    });
  }

  useEffect(() => {
    if (document.getElementById('blocklyDiv') !== null) {
      var tb = currentToolbox;
      OurWorkspace = Blockly.inject('blocklyDiv', {
        toolbox: currentToolbox, renderer: "zelos", zoom:
        {
          controls: true,
          wheel: true,
          startScale: 1,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        }, grid:
        {
          spacing: 20,
          length: 3,
          colour: '#03254c',
          snap: true
        }, theme: test_theme
      });
      Blockly.Xml.domToWorkspace(newxmldom, OurWorkspace);
      OurWorkspace.toolbox_.setVisible(true)
      OurWorkspace.addChangeListener(function (event) {
        showCode(OurWorkspace);
        if (OurWorkspace !== null) {
          // console.log(OurWorkspace.toolbox_.toolboxPosition);
        }
      })
      OurWorkspace.registerButtonCallback("Openfly", function (event) {
        OurWorkspace.toolbox_.flyout_.show(mello_laxml)
      });

    }

  }, [tabpanelval])

  function sendflyout() {
    if (OurWorkspace !== null) {
      var Toolboxer = document.getElementsByClassName("blocklyToolboxDiv")[0];
      console.log(Toolboxer)
      var Destination = document.getElementById("ToolboxHolder").appendChild(Toolboxer)
      Toolboxer.style.position = "absolute";
      Toolboxer.style.width = "30vw";
      Toolboxer.style.height = "20vw";
      Toolboxer.style.left = "350px";

      /*
      var LogicButton=document.getElementById("blockly-0");
      OurWorkspace.toolbox_.flyout_.positionAt_(500,500,0,0)
      LogicButton.click();
      */
      /*
      console.log(Blockly.utils.toolbox.convertToolboxDefToJson(MelloToolbox))
      OurWorkspace.refreshToolboxSelection()
      OurWorkspace.toolbox_.flyout_.show(Blockly.Xml.textToDom(`<xml> <block type="variable_get"></block> </xml>`))
      */
    }
  }

  React.useEffect(() => {

    if (upload_status === "No Arduino Detected" || upload_status === "Upload Successful" || upload_status.includes("Upload Failed : Error in Code") === 1 || upload_status === "") {
      setUploadProgress(1);
    }
    else {
      setUploadProgress(0);
    }
    return UploadProgress;
  });

  return (
    <div className="App">
      <Header />
      <Body />
      <div id="ToolboxHolder"></div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
          <Typography component="span" variant="h2" className={classes.title}>
            Mintduino
          </Typography>
          <Button onClick={sendflyout}>TesstTool</Button>
          {UploadProgress == 0 &&
            <CircularProgress color="secondary" />
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
        <TabPanel value={tabpanelval} index={0} className={classes.Tabs}>
          <section id="blocklyArea">
            <div id="blocklyDiv">
              <WorkspaceTabs />
              <Dialog
                onClose={(event, reason) => {
                  if (reason == 'backdropClick') {
                    setDialogOpen(false);
                  }
                }
                } open={dialog_open}>
                <DialogTitle id="simple-dialog-title">Set Variable</DialogTitle>
                <Select
                  value={newvariable_type}
                  variant="outlined"
                  onChange={variable_type_set}
                >
                  <MenuItem value={"float"}>Float</MenuItem>
                  <MenuItem value={"int"}>Integer</MenuItem>
                  <MenuItem value={"char"}>Character</MenuItem>
                  <MenuItem value={"String"}>String</MenuItem>
                </Select>
                <TextField id="outlined-basic" variant="filled" value={newvariable_name} disabled={false} multiline={false} fullWidth={true} align="justify" onChange={variable_name_set} />
                <Button onClick={closedialog}>Ok</Button>
              </Dialog>
            </div>
          </section>
        </TabPanel>
        <TabPanel value={tabpanelval} index={1}>
          <SyntaxHighlighter
            language="arduino"
            style={docco}
            showLineNumbers={true}>
            {javascriptcode}
          </SyntaxHighlighter>
        </TabPanel>
        <TabPanel value={tabpanelval} index={2}>
          <TextField id="outlined-basic" variant="outlined" value={javascriptcode} disabled={false} multiline={true} fullWidth={true} align="justify" onChange={code_change} />
        </TabPanel>
        <TabPanel value={tabpanelval} index={3}>
          <Typography variant="h3">
            Serial Monitor
          </Typography>
          <TextField id="outlined-basic" variant="outlined" value={serialport_monitor} disabled={true} multiline={true} fullWidth={true} align="justify" maxRows={12} autoFocus={true} />
          <Typography variant="h5">
            Write to Serial Monitor
          </Typography>
          <TextField id="outlined-basic" variant="filled" value={serialport_value} disabled={false} multiline={false} fullWidth={true} align="justify" onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              serialport_write();
              ev.preventDefault();
            }
          }}
            onChange={serialport_change} />
        </TabPanel>
      </div>
      <div className={classes.footer}>
        <TextField display="block" disabled={true} variant="outlined" value={"Upload Status : " + upload_status} fullWidth={true}></TextField>

      </div>
    </div>
  );
}

export default App;
export { currentToolboxName, variables_created };