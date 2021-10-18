import { createContext, useState, useEffect } from "react"
import { DeviceList } from "../../deviceDef/device_list";
import Blockly from "blockly";
import AlterBlockly from "../../blocklyextras/blocklyAlters";
import { mainLoopCode } from "../../customblocks/compiler/arduino_core";
import { MelloDOM } from "../../customblocks/toolboxes/toolboxes";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export const DeviceContext = createContext();
const { ipcRenderer } = window.require('electron')

var current_device = `No Device Selected`;
var currentToolboxName = "Mello";
var default_workspace = `<xml xmlns="https://developers.google.com/blockly/xml"><block type="m_mainloop" x="430" y="150"></block></xml>`;
var newxml = default_workspace;
var newxmldom = Blockly.Xml.textToDom(newxml);
var currentToolbox = MelloDOM;
var OurWorkspace;
var toolbox_selected = "";
var variables_created = [];
var currentBlock = null;
var currentDeviceVar = "";
const dark_block_styles = {
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
const dark_component_styles = {
    "workspaceBackgroundColour": "#060841",
    "flyoutBackgroundColour": "#0B0533"
}
const light_block_styles = {
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
const light_component_styles = {
    "workspaceBackgroundColour": "#EFEFF2",
    "flyoutBackgroundColour": "#DEDEF1"
}
var dark_theme = Blockly.Theme.defineTheme('dark_theme', {
    'blockStyles': dark_block_styles,
    'componentStyles': dark_component_styles,
    'startHats': true
});
var light_theme = Blockly.Theme.defineTheme('light_theme', {
    'blockStyles': light_block_styles,
    'componentStyles': light_component_styles,
    'startHats': true
});



var initialized_workspace = false;


const DeviceContextProvider = (props) => {

    const [device_chosen, setDeviceChosen] = useState("");
    const [toolbox_items, setToolboxItems] = useState([]);
    const [arduinocode, setArduinoCode] = useState("");

    var fileheader = [
        //New File
        () => {
            if (document.getElementsByClassName("c-WorkspaceAdd-a-Container")[0] !== undefined) {
                OurWorkspace.clear();
                document.getElementsByClassName("c-WorkspaceAdd-a-Container")[0].click()
            }
        },
        //Open File
        () => {
            loadBlocks()
        },
        //Save File
        () => {
            exportBlocks()
        },
        //Save As File
        () => {
            exportBlocks()
        }
    ]
    var editheader = [
        () => {
            try{
                Blockly.copy(currentBlock)
                Blockly.deleteBlock(currentBlock)
            }
            catch(e){}
            
        },
        () => {
            try{
                Blockly.copy(currentBlock)
            }
            catch (e) {}
            
        },
        () => {
            try{
                Blockly.paste(currentBlock)
            }
            catch(e){}
        },
        () => {
            try{
                var allblocks = OurWorkspace.getAllBlocks(true);
                for (var i = 0; i < allblocks.length; i++) {
                    allblocks[i].select();
                }
            }
            catch(e){}
        },
        () => {
            try{
                Blockly.deleteBlock(currentBlock)
            }
            catch(e){}
        }
    ]

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

    function selectedBlock(event) {
        if (event.type == Blockly.Events.SELECTED) {
            currentBlock = OurWorkspace.getBlockById(event.newElementId);

        }
    }
    function logbutton() {
        console.log("Button Pressed")
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
        if (device_chosen !== "") {
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
                    }, theme: dark_theme
                });
                toolbox_maker();
                Blockly.Xml.clearWorkspaceAndLoadFromXml(newxmldom, OurWorkspace);
                OurWorkspace.toolbox_.setVisible(false);
                OurWorkspace.addChangeListener(showCode);
                OurWorkspace.addChangeListener(selectedBlock);
                AlterBlockly();
                initialized_workspace = true;
            }
        }
    })
    useEffect(() => {
        if (device_chosen !== "") {
            //currentDeviceVar = device_chosen;
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
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(default_workspace), OurWorkspace);
        }
    }, [device_chosen]);


    return (
        <DeviceContext.Provider value={{
            current_device,
            currentToolboxName,
            default_workspace,
            newxml,
            newxmldom,
            currentToolbox,
            fileheader,
            editheader,
            exportBlocks,
            loadBlocks,
            DeviceList,
            OurWorkspace,
            dark_theme,
            light_theme,
            toolbox_selected,
            variables_created,
            currentBlock,
            initialized_workspace,
            device_chosen,
            setDeviceChosen,
            toolbox_items,
            setToolboxItems,
            arduinocode,
            setArduinoCode
        }}>
            {props.children}
        </DeviceContext.Provider >
    )
}

export default DeviceContextProvider
export { currentToolboxName, variables_created }