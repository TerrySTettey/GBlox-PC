import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import Body from '../Body'
import Blockly from 'blockly';
import { DeviceContext } from '../contexts/DeviceContext';

import "./TestMain.scss"

import "../../customblocks/customblocks";
import "../../customblocks/compiler/arduino_core";
import "../../customblocks/peripherals/arduino_peripheral"
import "../../customblocks/MelloBlocks"
import "../../customblocks/MelloBlocksGen"

import example_codes from "../../example_codes"

const { ipcRenderer } = window.require('electron')

var response = "null";

const TestMain = (props) => {
    //const [serialport_monitor, setSerialPortMonitor] = useState("")
    //const [viewCode, setViewCode] = useState("")

    // useEffect(() => {
    //     if (viewCode !== props.viewCode) {
    //         setViewCode(props.viewCode)
    //     }
    //     if (serialport_monitor !== props.serialport_monitor) {
    //         setSerialPortMonitor(props.serialport_monitor);
    //     }

    // })

    const [current_device,currentToolboxName,default_workspace,newxml,newxmldom,currentToolbox,OurWorkspace,toolbox_selected,variables_created,currentBlock,block_styles,component_styles,test_theme,initialized_workspace,device_chosen,setDeviceChosen,toolbox_items,setToolboxItems,arduinocode,setArduinoCode] = useContext(DeviceContext)
    const [serialport_monitor, setSerialPortMonitor] = useState("No Device Detected");
    const [serialport_status, setSerialPortStatus] = useState(false)
    const [upload_status, setUploadStatus] = useState("");
    const [available_com_ports, setAvailableCOMports] = useState([]);
    const [system_settings, setSystemSettings] = useState([]);
    const [current_theme, setCurrentTheme] = useState("")
    const [splash_status, setSplashStatus] = useState("false");

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
            Blockly.copy(currentBlock)
            Blockly.deleteBlock(currentBlock)
        },
        () => {
            Blockly.copy(currentBlock)
        },
        () => {
            Blockly.paste(currentBlock)
        },
        () => {
            var allblocks = OurWorkspace.getAllBlocks(true);
            for (var i = 0; i < allblocks.length; i++) {
                allblocks[i].select();
            }
        },
        () => {
            Blockly.deleteBlock(currentBlock)
        }
    ]
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
        setSplashStatus((document.getElementById('SplashStatus').checked).toString())
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
                    if (Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(OurWorkspace)) === `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`) {
                        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(default_workspace), OurWorkspace);
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
            }, 1)
        }
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
            if (hold !== "nil") {
                var xmlss = Blockly.Xml.textToDom(hold)
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(xmlss, Blockly.mainWorkspace);
            }
        } catch (e) {
            throw e;
        }
    }
    async function check_comport_constant() {
        ipcRenderer.invoke('check_comport_constant');
        ipcRenderer.on('comport_constant', (event, result) => {
            setAvailableCOMports(result);
        });

    }
    async function readSystemSettings() {
        ipcRenderer.invoke("load-settings");
        ipcRenderer.on('current-settings', (event, result) => {
            if (result !== "nil") {
                console.log(result);
                setSystemSettings(result);
            }
        })
    }
    async function writeSystemSettings(system_settings) {
        ipcRenderer.invoke("write-settings", system_settings)
    }
    useEffect(() => {
        setTimeout(() => {
            check_comport_constant();
        }, 3000)
        if (system_settings.length < 1) {
            readSystemSettings();
        }
    })
    useEffect(() => {
        var outer_circle = document.getElementById("Outer_Circle");
        if (available_com_ports.length > 0) {
            outer_circle.style.fill = "green"
            outer_circle.style.animation = ("none")
        }
        else {
            outer_circle.style.fill = "red"
            outer_circle.style.animation = "saturate 2s infinite ease-in-out alternate-reverse"
        }
    }, [available_com_ports])

    useEffect(() => {
        if (system_settings[1] !== undefined) {
            var temp_settings = `theme: ${current_theme.toString()}\nhideSplash: ${splash_status.toString()}\ndevice: ${device_chosen.toString()}`
            writeSystemSettings(temp_settings)
            setSystemSettings(temp_settings)
            console.log(`theme: ${current_theme.toString()}\nhideSplash: ${splash_status.toString()}\ndevice: ${device_chosen.toString()}`)
        }
    }, [current_theme, device_chosen, splash_status])
    useEffect(() => {
        for (var i = 0; i < system_settings.length; i++) {
            if (system_settings[i] !== undefined) {
                var property = system_settings[i].toString().split(":")[0]
                switch (property) {
                    case "hideSplash":
                        setSplashStatus(system_settings[i].toString().replaceAll(";\r", "").replace("hideSplash: ", ""))
                        if (system_settings[i].toString().replaceAll(";\r", "").replace("hideSplash: ", "") == "true") {
                            document.getElementById("SplashStatus").checked = true;
                        }
                        else {
                            document.getElementById("SplashStatus").checked = false;
                            document.getElementById('c-Body-a-SplashScreen').style.display = "inline-flex";
                        }
                        break;
                    case "theme":
                        setCurrentTheme(system_settings[i].toString().replaceAll(";\r", "").replace("theme: ", ""));
                        break;
                    case "device":
                        setDeviceChosen(system_settings[i].toString().replaceAll(";\r", "").replace("device: ", ""))
                        break;
                }
            }
        }
        //.replaceAll(";\r","").replace("splash: ","")
        //document.getElementById("SplashStatus").checked
    }, [system_settings])

    return (
        <div>
            <Body
                ToolboxFunction={open_flyout}
                workspaceClick={workspaceClick}
                toolboxButtons={toolbox_items}
                viewCode={
                    arduinocode
                }
                serialport_monitor={serialport_monitor}
                onSerialPortClick={serialport_read}
                example_codes={example_codes}
                uploadFunction={uploadCode_ipc}
                onSplashClick={closeSplash}
                Splashurl={"https://www.google.com"}
                deviceOnClick={device_manager}
                fileheaderfunc={fileheader}
                editheaderfunc={editheader}
                saveFile={exportBlocks}
            />
        </div>
    )
}

export default TestMain

TestMain.defaultProps = {

}