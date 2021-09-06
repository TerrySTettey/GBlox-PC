import Blockly from "blockly";
import React, { useState , useEffect} from 'react';

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
import {toolboxCategories, newToolBox, MelloToolbox, MelloDOM} from "./customblocks/toolboxes/toolboxes"
import {mainLoopCode} from "./customblocks/compiler/arduino_core"
const { ipcRenderer } = window.require('electron')

var currentToolbox;
var response = "null";
currentToolbox = MelloDOM;
var currentToolboxName = "Mello";
var variables_created = [];

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


const mello_laxml = `<xml xmlns="https://developers.google.com/blockly/xml"><block type="n_mainloop" id="E_nLLiJ8ewVBQ%pGS{hU" x="430" y="150"></block></xml>`;
if (currentToolboxName == "Mello"){
  var newxml = mello_laxml;
  var newxmldom = Blockly.Xml.textToDom(newxml);
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

const tabpanelchange = (event, newTabval) => {
    const oldTabval = tabpanelval;
    settabpanel(newTabval);
    if (newTabval === 3){
      if (newTabval !== oldTabval){
        ipcRenderer.invoke(`serialport_retreive`);
        serialport_read();
      }
    }
    else{
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

  React.useEffect(() => {

    if (upload_status === "No Arduino Detected" || upload_status === "Upload Successful" || upload_status.includes("Upload Failed : Error in Code") === 1  || upload_status === ""){
      setUploadProgress(1);
    }
    else{
      setUploadProgress(0);
    }
    return UploadProgress;
  });

  function logbutton(){
    console.log("Button Pressed");
    setDialogOpen(true);
  }
  function sendvariables(){ 
    variables_created.push([`${newvariable_type} ${newvariable_name}`, `${newvariable_name}`]);
    console.log(variables_created);
  }
  function closedialog() {
    setDialogOpen(false);
    sendvariables();
  }

  function showCode(workspace) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    if (currentToolboxName === "Mello" || currentToolboxName === "Basic"){
      code = mainLoopCode;
    }
    Blockly.mainWorkspace.registerButtonCallback("createvar", logbutton)
    newxmldom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    newxml = Blockly.Xml.domToText(newxmldom);
    if (tabpanelval === 0){
      if (newxml===mello_laxml){}
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
    if (currentToolboxName === "Mello" || currentToolboxName === "Basic"){
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(mello_laxml),Blockly.mainWorkspace);
    }
  }

  function serialport_read(){
    ipcRenderer.on('serialport_monitor', (event, result) => { 
      setSerialPortMonitor(result);
      //console.log(serialport_results);
    });
  }

  function serialport_write(){
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
      if(hold !== "nil"){
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
    ipcRenderer.on('arduino_comport',(event,result)=>{
      response=result;
      setUploadStatus(`Arduino found on ${response}`);
    });

    ipcRenderer.on('arduino_upload_status', (event, result) => {
      response = result;
      setUploadStatus(response);
    });
  }

  var OurWorkspace
 
  useEffect(() => {
    OurWorkspace = Blockly.inject('blocklyDiv', { toolbox: currentToolbox, renderer: "zelos", workspace:false})
  },[])

  return (
    <div className="App">
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
            <div id="blocklyDiv">
              <Dialog 
                onClose={(event, reason) => {if (reason == 'backdropClick'){
                setDialogOpen(false);
                }}
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
                <MenuItem value={"char[]"}>String</MenuItem>
              </Select>
                <TextField id="outlined-basic" variant = "filled" value={newvariable_name} disabled={false} multiline = {false} fullWidth = {true} align="justify" onChange={variable_name_set}/>
                <Button onClick={closedialog}>Ok</Button>
              </Dialog>
            </div>
          </TabPanel>
          <TabPanel value={tabpanelval} index={1}>
          <SyntaxHighlighter 
          language="arduino" 
          style={docco}
          showLineNumbers = {true}>
              {javascriptcode}
            </SyntaxHighlighter>
          </TabPanel>
          <TabPanel value={tabpanelval} index={2}>
          <TextField id="outlined-basic" variant="outlined" value={javascriptcode} disabled={false} multiline = {true} fullWidth = {true} align="justify" onChange={code_change}/>
          </TabPanel>
          <TabPanel value={tabpanelval} index={3}>
          <Typography variant="h3">
            Serial Monitor
          </Typography>
          <TextField id="outlined-basic" variant="outlined" value={serialport_monitor} disabled={true} multiline = {true} fullWidth = {true} align="justify" maxRows = {12} autoFocus = {true}/>
          <Typography variant="h5">
            Write to Serial Monitor
          </Typography>
          <TextField id="outlined-basic" variant = "filled" value={serialport_value} disabled={false} multiline = {false} fullWidth = {true} align="justify" onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                serialport_write();
                ev.preventDefault();
              }
            }} 
            onChange={serialport_change}/>
          </TabPanel>
          </div>
          <div className={classes.footer}>
            <TextField display="block" disabled = {true} variant="outlined" value = {"Upload Status : " + upload_status} fullWidth = {true}></TextField>

          </div>
      </div>
  );
}

export default App;
export {currentToolboxName, variables_created};