import Blockly from "blockly";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TestMain from "./components/TestMain";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './App.css';

import { MelloDOM, newToolBox } from "./customblocks/toolboxes/toolboxes"
import { DeviceList } from "./deviceDef/device_list.js"
import AlterBlockly from "./blocklyextras/blocklyAlters";
import ToolSelector from "./components/ToolSelector/ToolSelector";

import "./customblocks/customblocks";
import "./customblocks/compiler/arduino_core";
import "./customblocks/peripherals/arduino_peripheral"
import "./customblocks/MelloBlocks"
import "./customblocks/MelloBlocksGen"
import { mainLoopCode } from "./customblocks/compiler/arduino_core"
import example_codes from "./example_codes"
const { ipcRenderer } = window.require('electron')

var initialized_workspace = false;
var currentToolboxName = "Mello";
var toolbox_selected = "";
var variables_created = [];
var OurWorkspace;
var response = "null";
var current_device = `No Device Selected`;
var currentToolbox = MelloDOM;

const component_styles = {
  "workspaceBackgroundColour": "#060841",
  "flyoutBackgroundColour": "#0B0533"
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


//Default Workspace
var default_workspace = `<xml xmlns="https://developers.google.com/blockly/xml"><block type="m_mainloop" x="430" y="150"></block></xml>`;
var newxml = default_workspace;
var newxmldom = Blockly.Xml.textToDom(newxml);

const App = () => {
  const [arduinocode, setArduinoCode] = useState("");
  const [serialport_monitor, setSerialPortMonitor] = useState("No Device Detected");
  const [serialport_status, setSerialPortStatus] = useState(false)
  const [upload_status, setUploadStatus] = useState("");
  const [device_chosen, setDeviceChosen] = useState("");
  const [toolbox_items, setToolboxItems] = useState([]);
  const [available_com_ports, setAvailableCOMports] = useState([]);

  function serialport_read() {
    console.log("Serial Port Button Clicked")
    if (serialport_status === false) {
      console.log("Serial Port Opened")
      ipcRenderer.invoke(`serialport_retreive`);
      ipcRenderer.on('serialport_monitor', (event, result) => {
        setSerialPortMonitor(result);
      });
      setSerialPortStatus(true);
    }
    else {
      ipcRenderer.invoke(`serialport_close`);
      setSerialPortMonitor([]);
      console.log("Serial Port Closed")
      setSerialPortStatus(false);
    }
  }

  function logbutton() {
    console.log("Button Pressed");
  }

  function showCode() {
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    if (currentToolboxName === "Mello" || currentToolboxName === "Basic") {
      code = mainLoopCode;
    }
    OurWorkspace.registerButtonCallback("createvar", logbutton)
    setArduinoCode(code);
  }
  async function uploadCode_ipc() {
    response = 'Uploading code';
    setUploadStatus(response);
    //console.log(response);
    response = 'Awaiting Response from Arduino';
    setUploadStatus(response);
    //console.log(response);
    //setUploadStatus(response);
    ipcRenderer.invoke('upload-code', arduinocode);
    ipcRenderer.on('arduino_comport', (event, result) => {
      response = result;
      setUploadStatus(`Arduino found on ${response}`);
    });

    ipcRenderer.on('arduino_upload_status', (event, result) => {
      response = result;
      setUploadStatus(response);
    });
  }
  function closeSplash() {
    var splash = document.getElementById('c-Body-a-SplashScreen')
    splash.style.backgroundColor = "transparent";
    splash.style.backdropFilter = "none"
    splash.style.opacity = "0"

    setTimeout(() => {
      splash.style.display = "none"
    }, 600)
  }
  function workspaceClick(event) {
    if (document.getElementById('blocklyDiv') !== null) {
      switch (event.target.id) {
        case "zoom-in":
          Blockly.mainWorkspace.zoom(0, 0, 2);
          break;
        case "zoom-out":
          Blockly.mainWorkspace.zoom(0, 0, -2)
          break;
        case "zoom-to-fit":
          Blockly.mainWorkspace.zoomToFit()
          break;
        case "workspace-previous":
          Blockly.mainWorkspace.undo(false);
          if (Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(OurWorkspace))===`<xml xmlns="https://developers.google.com/blockly/xml"></xml>`){
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(default_workspace),OurWorkspace);
          }
          break;
        case "workspace-after":
          Blockly.mainWorkspace.undo(true);
          break;
        default:
          break;
      }
    }
  }

  function open_flyout(event) {
    document.getElementById(event.target.id).click()
  }
  function toolbox_maker() {
    var toolbox_temp = [];
    for (var i = 0; i < (OurWorkspace.toolbox_.getToolboxItems()).length; i++) {
      var items = OurWorkspace.toolbox_.getToolboxItems();
      var subcat = items[i].subcategoriesDiv_
      var id = items[i].id_
      var name = items[i].name_
      if (items[i].subcategoriesDiv_ === undefined) {
        toolbox_temp.push([name, id, "non-category"]);
      }
      else {
        var category = OurWorkspace.toolbox_.getToolboxItems()[i];
        category.setExpanded(true)
        var children_count = (category.getChildToolboxItems()).length
        toolbox_temp.push([name, id, "category", children_count]);
      }
    }
    setToolboxItems(toolbox_temp)
  }
  function device_manager(event) {
    var popout = document.getElementById("c-device-manager")
    if (event.target.id === "device-add-button") {
      popout.style.opacity = "1"
      popout.style.backgroundColor = "#0B0533dd";
      popout.style.display = "inline-flex"
    }
    else {
      setDeviceChosen(event.target.id)
      popout.style.opacity = "0"
      popout.style.backgroundColor = "transparent";
      setTimeout(() => {
        popout.style.display = "none"
      },1)
    }
  }

  async function check_comport_constant(){
    ipcRenderer.invoke('check_comport_constant');
    ipcRenderer.on('comport_constant', (event, result) => {
      setAvailableCOMports(result);
    });
    
  }
  useEffect(() => {
    setTimeout(()=>{
      check_comport_constant();
    },3000)
    
    if(device_chosen !== ""){
    if (initialized_workspace === false) {
      var tb = currentToolbox;
      OurWorkspace = Blockly.inject('blocklyDiv', {
        toolbox: tb, renderer: "zelos", zoom:
        {
          wheel: true,
          startScale: 1,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        }, grid:
        {
          snap: true
        }, theme: test_theme
      });
      toolbox_maker();
      Blockly.Xml.clearWorkspaceAndLoadFromXml(newxmldom, OurWorkspace);
      OurWorkspace.toolbox_.setVisible(false);
      OurWorkspace.addChangeListener(showCode);
      AlterBlockly();
      initialized_workspace = true;
    }
  }
  })
  useEffect(() => {
    var outer_circle = document.getElementById("Outer_Circle");
    if (available_com_ports.length>0){
      outer_circle.style.fill = "green"
      outer_circle.style.animation = ("none")
    }
    else{
      outer_circle.style.fill = "red"
      outer_circle.style.animation = "saturate 2s infinite ease-in-out alternate-reverse"
    }
  },[available_com_ports])
  useEffect(() => {
    if (device_chosen !== "") {
      var chosen_device_list = DeviceList.findIndex(o => o.device_name === device_chosen)
      default_workspace = DeviceList[chosen_device_list].default_workspace;
      current_device = DeviceList[chosen_device_list].device_name;
      currentToolboxName = DeviceList[chosen_device_list].device_name;
      if (current_device.includes("Arduino") == 0) {
        currentToolbox = Blockly.Xml.textToDom(DeviceList[chosen_device_list].toolbox);
      }
      else {
        currentToolbox = DeviceList[chosen_device_list].toolbox;
      }
      OurWorkspace.updateToolbox(currentToolbox);
      OurWorkspace.clear();
      toolbox_maker();
      Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(default_workspace),OurWorkspace);
    }
  }, [device_chosen]);

  return (
    <div>
      <TestMain
        ToolboxFunction={open_flyout}
        workspaceClick={workspaceClick}
        toolboxButtons={toolbox_items}
        viewCode={
          <SyntaxHighlighter
            language="arduino"
            style={tomorrowNightBlue}
            showLineNumbers={true}>
            {arduinocode}
          </SyntaxHighlighter>
        }
        serialport_monitor={serialport_monitor}
        onSerialPortClick={serialport_read}
        example_codes={example_codes}
        uploadFunction={uploadCode_ipc}
        onSplashClick={closeSplash}
        Splashurl={"https://www.google.com"}
        deviceOnClick={device_manager}
      />

    </div>
  )
}

export default App;
export { currentToolboxName, variables_created };