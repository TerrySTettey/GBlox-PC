import Blockly from "blockly";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TestMain from "./components/TestMain";

import { MelloDOM, Basic_Flyouts } from "./customblocks/toolboxes/toolboxes"
import { DeviceList } from "./deviceDef/device_list.js"
import './App.css';
import importblocks from "./customblocks/import"
import AlterBlockly from "./blocklyextras/blocklyAlters";

var currentToolbox = MelloDOM;
var currentToolboxName = "Mello";
var toolbox_selected = "";
var variables_created = [];
var OurWorkspace;



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
var default_workspace = `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`;
var newxml = default_workspace;
var newxmldom = Blockly.Xml.textToDom(newxml);


const App = () => {
  importblocks.importblocks();
  //Injecting Blockly
  useEffect(() => {

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
      Blockly.Xml.domToWorkspace(newxmldom, OurWorkspace);
      OurWorkspace.toolbox_.setVisible(false);

      //Blockly Alters
      AlterBlockly();
    }
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


    }
  }

  function open_flyout(event) {
    var flyout = (event.target.id).split("_")[0].concat("_Toolbox");
    //OurWorkspace.toolbox_.flyout_

    if (document.getElementById('blocklyDiv') !== null) {
      if (flyout !== toolbox_selected) {
        toolbox_selected = flyout;
        switch (flyout) {
          case "Logic_Toolbox":
            OurWorkspace.toolbox_.flyout_.show(Blockly.Xml.textToDom(Basic_Flyouts.Logic_Toolbox));
            break;
          case "Text_Toolbox":
            OurWorkspace.toolbox_.flyout_.show(Blockly.Xml.textToDom(Basic_Flyouts.Text_Toolbox));
            break;
          case "Loop_Toolbox":
            OurWorkspace.toolbox_.flyout_.show(Blockly.Xml.textToDom(Basic_Flyouts.Loop_Toolbox));
            break;
          case "Math_Toolbox":
            OurWorkspace.toolbox_.flyout_.show(Blockly.Xml.textToDom(Basic_Flyouts.Math_Toolbox));
            break;
          default:
            break;
        }
      }
      else {
        console.log("HIDE")
        toolbox_selected = ""
        OurWorkspace.toolbox_.flyout_.hide();
      }
    }
  }

  return (
    <div>
      <TestMain ToolboxFunction={open_flyout} workspaceClick={workspaceClick} />
    </div>
  )
}

export default App;
export { currentToolboxName, variables_created };