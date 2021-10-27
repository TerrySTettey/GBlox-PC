import { createContext, useEffect, useState, useContext, useReducer } from "react";
import { DeviceList } from "../../deviceDef/device_list";
import Blockly, { selected } from "blockly";
import AlterBlockly from "../../blocklyextras/blocklyAlters";
import { mainLoopCode } from "../../customblocks/compiler/arduino_core";
import { MelloDOM } from "../../customblocks/toolboxes/toolboxes";
import { ThemeContext } from "./ThemeContext";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import WorkspaceTab from "../WorkspaceTab";

const { ipcRenderer } = window.require('electron');

export const Ctxt_SingletonManager = createContext()

//var selectedDevice = DeviceList[0];
var currentWorkspace;
var createdVariables = [];
var currentBlock = null;
var globalToolboxName = "Mello"


const CtxtP_SingletonManager = (props) => {

    const [currentDeviceName, setCurrentDeviceName] = useState("");             //Used to set and check the current device selected
    const [toolboxItems, setToolboxItems] = useState([]);                       //Used to set and check the current items in the Toolbox
    const [deviceCode, setDeviceCode] = useState("");                           //Used to set and check the generated code for the current device
    const [initialized_workspace, setInitializedWorkspace] = useState(false);   //Used to set and check whether the Blockly Workspace has been initialized
    var [selectedDevice, setSelectedDevice] = useState(DeviceList[2]);          //Used to set and check the selected device's data
    const [currentDeviceChanged, setCurrentDeviceChanged] = useState(0)
    const [upload_status, setUploadStatus] = useState("");
    const [selectedToolbox, setSelectedToolbox] = useState(MelloDOM)
    const [toolboxUpdate, setToolboxUpdate] = useState(0)
    const [toolboxLevel, setToolboxLevel] = useState(1)
    const [selectedToolboxName, setSelectedToolboxName] = useState("")
    const [currentTabPath, setCurrentTabPath] = useState("")
    const [savedOrLoaded, setSavedOrLoaded] = useState(0)
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
            clearDropdowns()
        },
        //Open File
        () => {
            loadBlocks()
            clearDropdowns()
        },
        //Save File
        () => {
            exportBlocks()
            clearDropdowns()
        },
        //Save As File
        () => {
            exportBlocks(true)
            clearDropdowns()
        },
        () => {
            window.open(`mailto:?subject=Check out my gBlox code!&body=Hey There! Check out this awesome code!`)
        }
    ]
    var editheader = [
        () => {
            try {
                Blockly.copy(currentBlock)
                Blockly.deleteBlock(currentBlock)
            }
            catch (e) { }
            clearDropdowns()

        },
        () => {
            try {
                Blockly.copy(currentBlock)
            }
            catch (e) { }
            clearDropdowns()
        },
        () => {
            try {
                Blockly.paste(currentBlock)
            }
            catch (e) { }
            clearDropdowns()
        },
        () => {
            try {
                var allblocks = currentWorkspace.getAllBlocks(true);
                for (var i = 0; i < allblocks.length; i++) {
                    allblocks[i].select();
                }
            }
            catch (e) { }
            clearDropdowns()
        },
        () => {
            try {
                Blockly.deleteBlock(currentBlock)
            }
            catch (e) { }
            clearDropdowns()
        }
    ]


    useEffect(() => {
        /*When Current Device is changed:
            -> Change the device in the Device List
        */
        //Checking List to see if Device exists:
        if (initialized_workspace === true) {
            //console.log(`Selected Device updated in Singleton. Name: ${selectedDevice.device_name}; CurrentName: ${currentDeviceName}`)
            var tmp = DeviceList.findIndex((ele) => (ele.device_name == currentDeviceName))
            if (tmp !== -1) {
                //Assign device to (g_v)selectedDevice
                setSelectedDevice(DeviceList[tmp]);
                if (DeviceList[tmp].toolbox[toolboxLevel - 1] !== undefined) {
                    setSelectedToolbox(DeviceList[tmp].toolbox[toolboxLevel - 1])
                } else {
                    setToolboxLevel(1)
                    document.getElementById("toolbox_selector_level_1").click()
                    setSelectedToolbox(DeviceList[tmp].toolbox[0])
                }

                setSelectedToolboxName(DeviceList[tmp].device_name);
                setCurrentDeviceChanged(1)
                setToolboxUpdate(1)
            } else {
                //setCurrentDeviceName((prevState) => prevState)
            }
        }

    }, [currentDeviceName])

    useEffect(() => {
        globalToolboxName = selectedToolboxName;
    }, [selectedToolboxName])

    useEffect(() => {
        if (toolboxUpdate === 1)
            if (initialized_workspace) {
                if (selectedDevice.toolbox[toolboxLevel - 1] !== undefined) {
                    setSelectedToolbox(selectedDevice.toolbox[toolboxLevel - 1])
                    currentWorkspace.updateToolbox(selectedDevice.toolbox[toolboxLevel - 1]);
                } else {
                    setToolboxLevel(1)
                    document.getElementById("toolbox_selector_level_1").click()
                    setSelectedToolbox(selectedDevice.toolbox[0])
                    currentWorkspace.updateToolbox(selectedDevice.toolbox[0]);
                }
                generateToolbox();
            }
        setToolboxUpdate(0)
    }, [toolboxUpdate])
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
                    }, theme: dark_theme
                });
                generateToolbox();
                currentWorkspace.clear();
                currentWorkspace.toolbox_.setVisible(false);
                currentWorkspace.addChangeListener(showCode);
                currentWorkspace.addChangeListener(selectedBlock);
                currentWorkspace.registerButtonCallback("createvar", openVariableDialog)
                AlterBlockly();
                setInitializedWorkspace(true)
            }
        }
        //Disables pointer events for blockly if Modal settings is opened
        var dropdowns = document.getElementsByClassName("c-CustomDrop-a-Content")
        for (var i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].style.display !== "none"){
                document.getElementById("blocklyDiv").style.pointerEvents = "none";
            }
        }
    })

    //Exports Blocks
    async function exportBlocks(isSaveAs = false) {
        try {
            var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
            var xml_text = Blockly.Xml.domToText(xml);
            console.log("Saving the following: " + xml_text);
            var loc;
            if (isSaveAs === true) {
                loc = await ipcRenderer.sendSync('save-file',
                    {
                        device: currentDeviceName,
                        toolLevel: toolboxLevel,
                        variables: createdVariables,
                        xml: xml_text
                    }, "")
            } else {
                loc = await ipcRenderer.sendSync('save-file',
                    {
                        device: currentDeviceName,
                        toolLevel: toolboxLevel,
                        variables: createdVariables,
                        xml: xml_text
                    }, currentTabPath)
            }
            setCurrentTabPath(loc)
        } catch (e) {
            alert(e);
        }

        setSavedOrLoaded(1)
    }

    //Loads Blocks
    function loadBlocks() {
        try {
            var hold = ipcRenderer.sendSync('load-file')
            console.log(hold)
            if (hold !== "nil") {
                var xmlss = Blockly.Xml.textToDom(hold.xml)
                setToolboxLevel(hold.toolLevel)
                document.getElementById(`toolbox_selector_level_${hold.toolLevel}`).click()
                setCurrentDeviceName(hold.device)
                createdVariables = hold.variables;
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(xmlss, Blockly.mainWorkspace);

                setCurrentTabPath(hold.location)
            }
        } catch (e) {
            throw e;
        }

        setSavedOrLoaded(1)
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
        var code = Blockly.JavaScript.workspaceToCode(currentWorkspace);
        //console.log(selectedToolboxName)
        if (selectedToolboxName === "Mello") {
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

    function openVariableDialog() {
        document.getElementById("c-variableSelector").style.display = "block";
    }
    function closeVariableDialog(event) {
        console.log(event.target.id);
        if (event.target.id == "a-CloseButton") {
            document.getElementById("c-variableSelector").style.display = "none";
        }
        else {
            var newvariable_type = document.getElementById("variable-type-select").firstChild.value.toLowerCase();
            var newvariable_name = document.getElementById("variable-name-input").value
            createdVariables.push([`${newvariable_type} ${newvariable_name}`, `${newvariable_name}`]);
            document.getElementById("c-variableSelector").style.display = "none";
        }
    }
    //Used after dropdown functions to clear the dropdown off the screen
    function clearDropdowns() {
        var Boxes = document.getElementsByClassName("blue-dropdown-box")
        for (var i = 0; i < Boxes.length; i++) {
            Boxes[i].style.display = "none"
        }
    }

    return (
        <Ctxt_SingletonManager.Provider
            value={{
                currentDeviceName,
                setCurrentDeviceName,
                toolboxItems,
                setToolboxItems,
                deviceCode,
                setDeviceCode,
                currentWorkspace,
                selectedDevice,
                setSelectedDevice,
                initialized_workspace,
                setInitializedWorkspace,
                selectedToolbox,
                fileheader,
                editheader,
                exportBlocks,
                currentDeviceChanged,
                setCurrentDeviceChanged,
                selectedToolbox,
                setSelectedToolbox,
                closeVariableDialog,
                createdVariables,
                upload_status,
                setUploadStatus,
                toolboxUpdate,
                setToolboxUpdate,
                toolboxLevel,
                setToolboxLevel,
                setSelectedToolboxName,
                currentTabPath,
                setCurrentTabPath,
                savedOrLoaded,
                setSavedOrLoaded
            }}
        >
            {props.children}
        </Ctxt_SingletonManager.Provider>
    )
}

export default CtxtP_SingletonManager
export { globalToolboxName, createdVariables }
