import Blockly from "blockly";
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import TestMain from "./components/TestMain";

import { MelloDOM } from "./customblocks/toolboxes/toolboxes"
import './App.css';

var currentToolbox;
currentToolbox = MelloDOM;
var OurWorkspace;
//Blockly Themes

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


//Default Workspace
var default_workspace = `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`;
var newxml = default_workspace;
var newxmldom = Blockly.Xml.textToDom(newxml);


const App = () => {

  //Injecting Blockly
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
          snap: true
        }, theme: test_theme
      });
      Blockly.Xml.domToWorkspace(newxmldom, OurWorkspace);
      OurWorkspace.toolbox_.setVisible(false);
    }
  })
  
  return (
    <div>
      <TestMain />
    </div>
  )
}

export default App;