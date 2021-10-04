import Blockly from "blockly";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TestMain from "./components/TestMain";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './App.css';

import { MelloDOM } from "./customblocks/toolboxes/toolboxes"
import { DeviceList } from "./deviceDef/device_list.js"
import AlterBlockly from "./blocklyextras/blocklyAlters";
import ToolSelector from "./components/ToolSelector/ToolSelector";

import "./customblocks/customblocks";
import "./customblocks/compiler/arduino_core";
import "./customblocks/peripherals/arduino_peripheral"
import "./customblocks/MelloBlocks"
import "./customblocks/MelloBlocksGen"
import { mainLoopCode } from "./customblocks/compiler/arduino_core"

const { ipcRenderer } = window.require('electron')

var currentToolbox = MelloDOM;
var initialized_workspace = false;
var currentToolboxName = "Mello";
var toolbox_selected = "";
var variables_created = [];
var OurWorkspace;
var toolbox_items = [];

//Blockly Themes

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
var clicked = 0;

const App = () => {
  const [arduinocode, setArduinoCode] = useState("");
  const [serialport_monitor, setSerialPortMonitor] = useState("test");
  const [serialport_status, setSerialPortStatus] = useState(false)

  function serialport_read() {
    console.log("Serial Port Button Clicked")
    if (serialport_status === false) {
      console.log("Serial Port Opened")
      ipcRenderer.invoke(`serialport_retreive`);
      ipcRenderer.on('serialport_monitor', (event, result) => {
        console.log(result)
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

  useEffect(() => {
    if (initialized_workspace === false) {
      toolbox_items = [];
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

      for (var i = 0; i < (OurWorkspace.toolbox_.getToolboxItems()).length; i++) {
        var items = OurWorkspace.toolbox_.getToolboxItems();
        var subcat = items[i].subcategoriesDiv_
        var id = ""
        if (items[i].subcategoriesDiv_ === undefined) {
          if (i >= 10) {
            id = String.fromCharCode(65 + (i - 10)).toLowerCase()
          }
          else {
            id = i;
          }
          toolbox_items.push([items[i].name_, `blockly-${id}`, "non-category"]);
        }
        else {
          var category = OurWorkspace.toolbox_.getToolboxItems()[i];
          category.setExpanded(true)
          var children_count = (category.getChildToolboxItems()).length
          if (i >= 10) {
            id = String.fromCharCode(65 + (i - 10)).toLowerCase()
          }
          toolbox_items.push([items[i].name_, `blockly-${id}`, "category", children_count]);
        }
      }
      Blockly.Xml.clearWorkspaceAndLoadFromXml(newxmldom, OurWorkspace);
      OurWorkspace.toolbox_.setVisible(false);
      OurWorkspace.addChangeListener(showCode);
      AlterBlockly();
      initialized_workspace = true;
    }
  })

  function workspaceClick(event) {
    console.log(event.target.id)
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

  return (
    <div>
      <TestMain
        ToolboxFunction={open_flyout}
        workspaceClick={workspaceClick}
        toolboxButtons={toolbox_items}
        viewCode={
          // <div>
          //   {arduinocode}
          // </div>
          <SyntaxHighlighter
            language="arduino"
            style={tomorrowNightBlue}
            showLineNumbers={true}>
            {arduinocode}
          </SyntaxHighlighter>
        }
        serialport_monitor={serialport_monitor}
        onSerialPortClick={serialport_read}
      />

    </div>
  )
}

export default App;
export { currentToolboxName, variables_created };