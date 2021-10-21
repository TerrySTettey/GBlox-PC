import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import Body from '../Body'
import Blockly from 'blockly';
import { DeviceList } from '../../deviceDef/device_list';

import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager';

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

    const {selectedDevice,currentWorkspace,currentBlock,currentDeviceName,setCurrentDeviceName,toolboxItems,deviceCode, exportBlocks, upload_status, setUploadStatus} = useContext(Ctxt_SingletonManager)
    const [serialport_monitor, setSerialPortMonitor] = useState("No Device Detected");
    const [serialport_status, setSerialPortStatus] = useState(false)
    const [available_com_ports, setAvailableCOMports] = useState([]);
    const [system_settings, setSystemSettings] = useState([]);
    const [current_theme, setCurrentTheme] = useState("")
    const [splash_status, setSplashStatus] = useState("false");

    function serialport_read() {
        //Starts the serial port monitor
        if (serialport_status === false) {      
            //Checks if serial port is already opened. If it is not opened, then start reading the serial port
            ipcRenderer.invoke(`serialport_retreive`);
            ipcRenderer.on('serialport_monitor', (event, result) => {
                setSerialPortMonitor(result);
            });
            //Set the Serial port status to ensure that the port does not attempt to open multiple times
            setSerialPortStatus(true);
        }
        else {
            //If Serial port is already opened, close the serial monitor and reset the values
            ipcRenderer.invoke(`serialport_close`);
            setSerialPortMonitor([]);
            console.log("Serial Port Closed")
            setSerialPortStatus(false);
        }
    }
    async function uploadCode_ipc() {
        //Invokes upload-code from electron with the current code
        ipcRenderer.invoke('upload-code', deviceCode);
        //Waits for results on which comport arduino is found on
        ipcRenderer.on('arduino_comport', (event, result) => {
            response = result;
            setUploadStatus(`Arduino found on ${response}`);
        });
        //Returns a confirmation for when the upload is done
        
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
                    if (Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(currentWorkspace)) === `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`) {
                        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(selectedDevice.default_workspace), currentWorkspace);
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
            if(currentDeviceName !== event.target.id){
                setCurrentDeviceName(event.target.id)
                console.log(DeviceList[DeviceList.findIndex(e => e.device_name == event.target.id)].default_workspace)
                console.log(currentWorkspace)
                currentWorkspace.clear()
                Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(DeviceList[DeviceList.findIndex(e => e.device_name == event.target.id)].default_workspace), currentWorkspace)
            }
            //setCurrentDeviceVar( event.target.id)
            popout.style.opacity = "0"
            popout.style.backgroundColor = "transparent";
            setTimeout(() => {
                popout.style.display = "none"
            }, 1)
        }
    }
    async function readSystemSettings() {
        ipcRenderer.invoke("load-settings");
        ipcRenderer.on('current-settings', (event, result) => {
            if (result !== "nil") {
                //console.log(result);
                setSystemSettings(result);
            }
        })
    }
    async function writeSystemSettings(system_settings) {
        ipcRenderer.invoke("write-settings", system_settings)
    }
    
    useEffect(() => {
        // setTimeout(() => {
        //     check_comport_constant();
        // }, 3000)
        if (system_settings.length < 1) {
            readSystemSettings();
            ipcRenderer.on('comport_constant', (event, result) => {
                setAvailableCOMports(result);
            });
            ipcRenderer.on('arduino_upload_status', (event, result) => {
                response = result;
                if(response.includes("Verifying...")==true){
                    setUploadStatus("Verifying Code");
                    console.log("Verifying the code now")
                }
                else if(response.includes("Uploading...")==true){
                    setUploadStatus("Uploading Code");
                    console.log("Uploading the code now")
                }
                else if(response.includes("An error occurred while uploading the sketch")==true){
                    setUploadStatus("Upload Failed");
                    console.log("Upload Failed")
                }
                else if(response.includes("Upload Failed")==true){
                    setUploadStatus("Upload Failed : Error in Code")
                }
                else if(response.includes("Upload Successful")==true){
                    setUploadStatus("Upload Successful")
                    console.log("Upload Successful")
                }
            });
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
            try{
                var temp_settings = `theme: ${current_theme.toString()}\nhideSplash: ${splash_status.toString()}\ndevice: ${currentDeviceName.toString()}`
                writeSystemSettings(temp_settings)
                setSystemSettings(temp_settings)
            }
            catch(e){}
        }
    }, [current_theme, currentDeviceName, splash_status])
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
                        var devName = system_settings[i].toString().replaceAll(";\r", "").replace("device: ", "")
                        var tmp = DeviceList.findIndex((ele)=>ele.device_name == devName)
                        if (tmp != -1 ){
                            setCurrentDeviceName(system_settings[i].toString().replaceAll(";\r", "").replace("device: ", ""))
                        }
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
                toolboxButtons={toolboxItems}
                viewCode={deviceCode}
                serialport_monitor={serialport_monitor}
                onSerialPortClick={serialport_read}
                example_codes={example_codes}
                uploadFunction={uploadCode_ipc}
                onSplashClick={closeSplash}
                Splashurl={"https://www.google.com"}
                deviceOnClick={device_manager}
                saveFile={exportBlocks}
            />
        </div>
    )
}

export default TestMain

TestMain.defaultProps = {

}