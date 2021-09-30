import Blockly from "blockly";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TestMain from "./components/TestMain";

import { MelloDOM, Basic_Flyouts } from "./customblocks/toolboxes/toolboxes"
import { DeviceList } from "./deviceDef/device_list.js"
import './App.css';
import AlterBlockly from "./blocklyextras/blocklyAlters";

import "./customblocks/customblocks";
import "./customblocks/compiler/arduino_core";
import "./customblocks/peripherals/arduino_peripheral"
import "./customblocks/MelloBlocks"
import "./customblocks/MelloBlocksGen"
import { mainLoopCode } from "./customblocks/compiler/arduino_core"

// require('prismjs/components/prism-jsx');
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


const App = () => {
  const [arduinocode, setArduinoCode] = useState("");
  const [toolbox_categories, setToolboxCategories] = useState([])

  function showCode(event) {
    var code = Blockly.JavaScript.workspaceToCode(OurWorkspace);
    if (currentToolboxName === "Mello" || currentToolboxName === "Basic") {
      code = mainLoopCode;
    }
    // OurWorkspace.registerButtonCallback("createvar", logbutton)
    // newxmldom = Blockly.Xml.workspaceToDom(workspace);
    // newxml = Blockly.Xml.domToText(newxmldom);
    // if (tabpanelval === 0) {
    // }
    // else {
    //   Blockly.Xml.domToWorkspace(newxmldom, workspace);
    // }
    setArduinoCode(code);
    console.log(code);
  }
  //Injecting Blockly
  useEffect(() => {
    toolbox_items = [];
    if (document.getElementById('blocklyDiv') !== null) {
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
          if (i >= 10) {
            id = String.fromCharCode(65 + (i - 10)).toLowerCase()
          }
          toolbox_items.push([items[i].name_, `blockly-${id}`, "category"]);
        }

      }
    }
    Blockly.Xml.domToWorkspace(newxmldom, OurWorkspace);
    console.log(OurWorkspace)
    OurWorkspace.toolbox_.setVisible(false);
    OurWorkspace.addChangeListener(showCode);
    
    AlterBlockly();
  })

function workspaceClick(event) {
  if (document.getElementById('blocklyDiv') !== null) {
    switch (event.target.id) {
      case "zoom-in":

        OurWorkspace.zoom(0, 0, 2)
        break;
      case "zoom-out":

        OurWorkspace.zoom(0, 0, -2)
        break;
      case "zoom-to-fit":
        OurWorkspace.zoomToFit()
        break;
      case "workspace-previous":
        OurWorkspace.undo(false);
        break;
      case "workspace-after":
        OurWorkspace.undo(true);
        break;
      default:
        break;
    }
    OurWorkspace.toolbox_.flyout_.reflow();
  }
}

function open_flyout(event) {
  console.log(toolbox_items);
  var flyout = (event.target.id).split("_")[0].concat("_Toolbox");
  if (document.getElementById('blocklyDiv') !== null) {
    toolbox_selected = flyout;
    switch (flyout) {
      case "Loop_Toolbox":
        document.getElementById("blockly-0").click()
        //Blockly.mainWorkspace.toolbox_.flyout_.show(Blockly.Xml.textToDom(Basic_Flyouts.Loop_Toolbox));
        break;
      case "Logic_Toolbox":
        OurWorkspace.getFlyout().show(Blockly.Xml.textToDom(Basic_Flyouts.Logic_Toolbox));
        break;
      case "Text_Toolbox":
        OurWorkspace.getFlyout().show(Blockly.Xml.textToDom(Basic_Flyouts.Text_Toolbox));
        break;
      case "Math_Toolbox":
        OurWorkspace.getFlyout().show(Blockly.Xml.textToDom(Basic_Flyouts.Math_Toolbox));
        break;
      default:
        break;
    }
  }
}

return (
  <div>
    <TestMain
      ToolboxFunction={open_flyout}
      workspaceClick={workspaceClick}
      viewCode={
        <p>
          {arduinocode}
        </p>
      }
      toolboxButtons={toolbox_items}
    />

  </div>
)
}

export default App;
export { currentToolboxName, variables_created };