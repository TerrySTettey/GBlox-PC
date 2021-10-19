import { createContext, useEffect, useState, useContext } from "react";
import { DeviceList } from "../../deviceDef/device_list";
import Blockly from "blockly";
import AlterBlockly from "../../blocklyextras/blocklyAlters";
import { mainLoopCode } from "../../customblocks/compiler/arduino_core";
import { MelloDOM } from "../../customblocks/toolboxes/toolboxes";
import { ThemeContext } from "./ThemeContext";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { ipcRenderer } = window.require('electron');

export const Ctxt_SingletonManager = createContext()

var selectedDevice = DeviceList[0];
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

    const [currentDeviceName, setCurrentDeviceName] = useState("");        //Used to set and check the current device selected
    const [currentToolBoxLevel, setCurrentToolBoxLevel] = useState(0);          //Used to set and check the current Toolbox Level
    const [toolboxItems, setToolboxItems] = useState([]);                       //Used to set and check the current items in the Toolbox
    const [deviceCode, setDeviceCode] = useState("");                           //Used to set and check the generated code for the current device
    const [initialized_workspace, setInitializedWorkspace] = useState(false);   //Used to set and check whether the Blockly Workspace has been initialized
    const [toolBoxInit, setToolBoxInit] = useState(selectedDevice.toolbox)      //Used to initiate the change of a toolbox.

    const { 
        dark_theme,
        light_theme
    } = useContext(ThemeContext)

    var fileheader = [
        //New File
        () => {
            if (document.getElementsByClassName("c-WorkspaceAdd-a-Container")[0] !== undefined) {
                currentWorkspace.clear();
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
                var allblocks = currentWorkspace.getAllBlocks(true);
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


    useEffect(() => {
        /*When Current Device is changed:
            -> Change the device in the Device List
        */
        //Checking List to see if Device exists:
        if (initialized_workspace === true) {
            console.log(`Selected Device updated in Singleton. Name: ${selectedDevice.device_name}; CurrentName: ${currentDeviceName}`)
            var tmp = DeviceList.findIndex((ele) => (ele.device_name == currentDeviceName))
            console.log(tmp)
            if (tmp !== -1) {
                //Assign device to (g_v)selectedDevice
                selectedDevice = DeviceList[tmp];
                console.log(selectedDevice.device_name)
                selectedToolbox = selectedDevice.toolbox[0]
            } else {
                //setCurrentDeviceName((prevState) => prevState)
            }
        }

    }, [currentDeviceName])
    useEffect(() => {
        /*When currentToolBoxLevel is changed: Change the toolbox */
        if (currentWorkspace !== undefined) {
            if (currentToolBoxLevel > 0 && currentToolBoxLevel <= 5) {


            }
        }

    }, [currentToolBoxLevel])
    useEffect(() => {
        if (toolBoxInit === 1) {
            //console.log(selectedToolbox)
            //selectedToolbox = selectedDevice.toolbox[0];
            //currentWorkspace.updateToolbox(selectedToolbox);
            setToolBoxInit(0)
        }
    }, [toolBoxInit])
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

    //Exports Blocks
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

    //Loads Blocks
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
                setInitializedWorkspace,
                toolBoxInit,
                setToolBoxInit,
                selectedToolbox,
                fileheader,
                editheader,
            }}
        >
            {props.children}
        </Ctxt_SingletonManager.Provider>
    )
}

export default CtxtP_SingletonManager
