import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import Body from '../Body'
import Blockly from 'blockly';
import { DeviceList } from '../../deviceDef/device_list';
import FrameBar from '../FrameBar'
import LoadScreen from '../LoadScreen'
import SplashScreenV2 from '../SplashScreenV2'
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager';
import { ThemeContext } from '../contexts/ThemeContext';


import "./TestMain.scss"
import "../../customblocks/customblocks";
import "../../customblocks/compiler/arduino_core";
import "../../customblocks/peripherals/arduino_peripheral"
import "../../customblocks/MelloBlocks"
import "../../customblocks/MelloBlocksGen"
import "../../customblocks/MingoBlocks"
import "../../customblocks/MingoBlocksGen"

import example_codes from "../../example_codes"
const { ipcRenderer } = window.require('electron')

var response = "null";

const TestMain = (props) => {

    const { selectedDevice,
        setSelectedDevice,
        currentWorkspace,
        currentBlock,
        currentDeviceName,
        setCurrentDeviceName,
        toolboxItems,
        setSelectedToolboxName,
        deviceCode,
        exportBlocks,
        upload_status,
        setUploadStatus,
        bodyLoaded,
        setBodyLoaded,
        splashScreen,
        setSplashScreen,
        openMingoBlox,
        device_manager,
        available_com_ports, 
        setAvailableCOMports} = useContext(Ctxt_SingletonManager)
    const { currentThemeName, setCurrentThemeName } = useContext(ThemeContext)

    
    const [system_settings, setSystemSettings] = useState([]);
    const [current_theme, setCurrentTheme] = useState("")
    const [splash_status, setSplashStatus] = useState("false");


    async function uploadCode_ipc() {
        var port = document.getElementById("selected-comport").value
        if (document.getElementById("c-codeEditor").style.display !== "flex") {
            //Invokes upload-code from electron with the current code
            ipcRenderer.invoke('upload-code', deviceCode, port);
        }
        else {
            var code = document.getElementById("full-editing").value
            ipcRenderer.invoke('upload-code', code, port);
        }

        //Waits for results on which comport arduino is found on
        ipcRenderer.on('arduino_comport', (event, result) => {
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
    function openRobocentre() {
        ipcRenderer.invoke("openRobocentre");
    }
    function contactSupportViaMail() {
        ipcRenderer.invoke("contactSupportViaMail");
    }
    function removeVideo() {
        var video = document.getElementById("loading-screen");
        video.style.opacity = 0
        setTimeout(function () {
            video.style.display = "none";
        }, [1000])

        // var body = document.getElementById("body-container")
        // body.style.display = "block";
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
                if (result.includes("Verifying...") == true) {
                    setUploadStatus("Verifying Code");
                    console.log("Verifying the code now")
                }
                else if (result.includes("Uploading...") == true) {
                    setUploadStatus("Uploading Code");
                    console.log("Uploading the code now")
                }
                else if (result.includes("An error occurred while uploading the sketch") == true) {
                    setUploadStatus("Upload Failed");
                    console.log("Upload Failed")
                }
                else if (result.includes("Upload Failed") == true) {
                    setUploadStatus("Upload Failed : Error in Code")
                }
                else if (result.includes("Upload Successful") == true) {
                    setUploadStatus("Upload Successful")
                    console.log("Upload Successful")
                }
                else if (result.includes("No Arduino Detected") == true) {
                    setUploadStatus("No Arduino Detected")
                    console.log("No Arduino Detected")
                }
            });
        }
        ipcRenderer.on("temp_log", (event, result) => {
            console.log(result);
        })
    })
    useEffect(() => {
        var outer_circle = document.getElementById("Outer_Circle_Device");
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
            try {
                var temp_settings = `theme: ${currentThemeName.toString()}\nhideSplash: ${splash_status.toString()}\ndevice: ${currentDeviceName.toString()}`
                writeSystemSettings(temp_settings)
                setSystemSettings(temp_settings)

            }
            catch (e) { }
        }
    }, [currentThemeName, currentDeviceName, splash_status])
    useEffect(() => {
        for (var i = 0; i < system_settings.length; i++) {
            if (system_settings[i] !== undefined) {
                var property = system_settings[i].toString().split(":")[0]
                switch (property) {
                    case "hideSplash":
                        setSplashStatus(system_settings[i].toString().replaceAll(";\r", "").replace("hideSplash: ", ""))
                        break;
                    case "theme":
                        setCurrentThemeName(system_settings[i].toString().replaceAll(";\r", "").replace("theme: ", ""));
                        break;
                    case "device":
                        var devName = system_settings[i].toString().replaceAll(";\r", "").replace("device: ", "")
                        var tmp = DeviceList.findIndex((ele) => ele.device_name == devName)
                        if (tmp != -1) {
                            setCurrentDeviceName(devName)
                            setSelectedDevice(DeviceList[tmp])
                            setSelectedToolboxName(devName)
                        }
                        break;
                }
            }
        }
        //.replaceAll(";\r","").replace("splash: ","")
        //document.getElementById("SplashStatus").checked
    }, [system_settings])
    useEffect(() => {
        if (bodyLoaded == true) {
            setTimeout(() => {
                removeVideo();
                setSplashScreen(
                    [<SplashScreenV2
                        onSplashClick={closeSplash}
                        robocentreURL={openRobocentre} />]
                )
            }, 4000)
        }
    }, [bodyLoaded])
    useEffect(() => {
        if (document.getElementById("SplashStatus") !== null) {
            if (splash_status == "true") {
                document.getElementById("SplashStatus").checked = true;
            }
            else {
                document.getElementById("SplashStatus").checked = false;
                document.getElementById('c-Body-a-SplashScreen').style.display = "inline-flex";
            }
        }
    }, [splashScreen])

    return (
        <div id="App">
            <div id="body-frame">
                <FrameBar />
            </div>
            <div id="loading-screen">
                <LoadScreen />
                <div id="comp-details">
                    <p>v1.0.1</p>
                    <p>© Mingo Blox LLC</p>
                    <a onClick={openMingoBlox}>www.mingoblox.com</a>
                </div>
            </div>

            <Body
                ToolboxFunction={open_flyout}
                workspaceClick={workspaceClick}
                toolboxButtons={toolboxItems}
                viewCode={deviceCode}
                example_codes={example_codes}
                uploadFunction={uploadCode_ipc}
                onSplashClick={closeSplash}
                robocentreURL={openRobocentre}
                deviceOnClick={device_manager}
                saveFile={exportBlocks}
                contactSupportViaMail={contactSupportViaMail}
            />
        </div>
    )
}

export default TestMain

TestMain.defaultProps = {

}