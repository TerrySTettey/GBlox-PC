import { createContext, useEffect, useState } from "react";
import { DeviceList } from "../../deviceDef/device_list";
import Blockly from "blockly";
import AlterBlockly from "../../blocklyextras/blocklyAlters";
import { mainLoopCode } from "../../customblocks/compiler/arduino_core";
import { MelloDOM } from "../../customblocks/toolboxes/toolboxes";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Ctxt_SingletonManager = createContext()

var selectedDevice=DeviceList[0];
var selectedToolbox = MelloDOM;
var currentWorkspace;
var createdVariables = [];
var currentBlock = null;


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
const component_styles = {
    "workspaceBackgroundColour": "#060841",
    "flyoutBackgroundColour": "#0B0533"
}
var test_theme = Blockly.Theme.defineTheme('test_theme', {
    'blockStyles': block_styles,
    'componentStyles': component_styles,
    'startHats': true
});

const CtxtP_SingletonManager = (props) => {

    const [currentDeviceName, setCurrentDeviceName] = useState("Empty");        //Used to set and check the current device selected
    const [currentToolBoxLevel, setCurrentToolBoxLevel] = useState(1);          //Used to set and check the current Toolbox Level
    const [toolboxItems, setToolboxItems] = useState([]);                       //Used to set and check the current items in the Toolbox
    const [deviceCode, setDeviceCode] = useState("");                           //Used to set and check the generated code for the current device
    const [initialized_workspace, setInitializedWorkspace] = useState(false);   //Used to set and check whether the Blockly Workspace has been initialized

    useEffect(() => {
        /*When Current Device is changed:
            -> Change the device in the Device List
        */
        //Checking List to see if Device exists:
        if (initialized_workspace === true) {
            var tmp = DeviceList.findIndex((ele) => (ele.device_name == currentDeviceName))
            if (tmp !== -1) {
                //Assign device to (g_v)selectedDevice
                selectedDevice = DeviceList[tmp];
            } else {
                //setCurrentDeviceName((prevState) => prevState)
            }
        }

    }, [currentDeviceName])
    useEffect(() => {
        /*When currentToolBoxLevel is changed: Change the toolbox */
        if (currentWorkspace !== undefined) {
            if (currentToolBoxLevel > 0 && currentToolBoxLevel <= 5) {
                selectedToolbox = selectedDevice.toolbox[currentToolBoxLevel];
                currentWorkspace.updateToolbox(selectedToolbox);

            }
        }

    }, [currentToolBoxLevel])
    useEffect(() => {
        /*Initializes Blockly injection */
        if (currentDeviceName !== "") {
            if (initialized_workspace === false) {
                var tb = selectedToolbox;
                currentWorkspace = Blockly.inject('blocklyDiv', {
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
                generateToolbox();
                currentWorkspace.clear();
                currentWorkspace.toolbox_.setVisible(false);
                currentWorkspace.addChangeListener(showCode);
                currentWorkspace.addChangeListener(selectedBlock);
                AlterBlockly();
                setInitializedWorkspace(true)
            }
        }
    })

    //Generates toolbox list for the GUI
    function generateToolbox() {
        var toolbox_temp = [];
        for (var i = 0; i < (currentWorkspace.toolbox_.getToolboxItems()).length; i++) {
            var items = currentWorkspace.toolbox_.getToolboxItems();
            var id = items[i].id_
            var name = items[i].name_
            if (items[i].subcategoriesDiv_ === undefined) {
                toolbox_temp.push([name, id, "non-category"]);
            }
            else {
                var category = currentWorkspace.toolbox_.getToolboxItems()[i];
                category.setExpanded(true)
                var children_count = (category.getChildToolboxItems()).length
                toolbox_temp.push([name, id, "category", children_count]);
            }
        }
        setToolboxItems(toolbox_temp)
    }

    //Used to show the generated Blockly code.
    function showCode() {
        var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
        if (selectedDevice.device_name === "Mello" || selectedDevice.device_name === "Basic") {
            code = mainLoopCode;
        }
        //currentWorkspace.registerButtonCallback("createvar", logbutton)
        setDeviceCode(code);
    }

    //Used to get the currently selected block in the Blockly Workspace
    function selectedBlock(event) {
        if (event.type == Blockly.Events.SELECTED) {
            currentBlock = currentWorkspace.getBlockById(event.newElementId);
        }
    }

    return (
        <Ctxt_SingletonManager.Provider
            value={{
                currentDeviceName,
                setCurrentDeviceName,
                currentToolBoxLevel,
                setCurrentToolBoxLevel,
                toolboxItems,
                setToolboxItems,
                deviceCode,
                setDeviceCode,
                currentWorkspace,
                selectedDevice,
                initialized_workspace,
                setInitializedWorkspace
            }}
        >
            {props.children}
        </Ctxt_SingletonManager.Provider>
    )
}

export default CtxtP_SingletonManager