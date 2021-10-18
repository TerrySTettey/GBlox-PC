import React, { useContext, useEffect, useState } from 'react'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'
import Blockly, { Block } from 'blockly'
import "./WorkTabHolder.scss"
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager'

var currentWSNum = 0;
var WSNumTracker = 0;
var TabDOM = [];
var TabNums = [];
var TabXMLs = [];

var TabHolder = [];
var currentTab = null;
var done = false;


const WorkTabHolder = (props) => {
    const { initialized_workspace, setInitializedWorkspace, currentWorkspace, selectedDevice, setCurrentDeviceName, currentDeviceName } = useContext(Ctxt_SingletonManager);
    //const [currentTab, setCurrentTab] = useState(null)

    var [buttonPressed, setButtonPressed] = useState(0);

    class Tab {
        tabID
        tabJSX
        tabXML
        tabDevice
        tabSet
        constructor(TabNum) {
            this.tabID = TabNum
            this.tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabNum} text={"Workspace " + TabNum} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} />)
            var device_default_workspace = selectedDevice.default_workspace;
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(device_default_workspace), currentWorkspace);
            this.tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
            this.tabDevice = currentDeviceName
            this.tabSet = false;
        }
    }
    useEffect(() => {
        if (initialized_workspace === true && done == false) {
            console.log("INIT: " + initialized_workspace)
            AddOnClick();
            done = true;
        }
    }, [initialized_workspace])
    // useEffect(() => {

    //     if (buttonPressed === 1) {
    //         setButtonPressed(0);

    //         for (var i = 0; i < TabNums.length; i++) {
    //             if (TabNums[i] !== currentWSNum) {
    //                 TabDOM = [...TabDOM]
    //                 TabDOM[i] = <WorkspaceTab id={"i-WSButton-" + TabNums[i]} text={"Workspace " + TabNums[i]} ChangeTab={ChangeTab} clickState="Off" closeOnClick={CloseOnClick} />
    //             } else {
    //                 TabDOM = [...TabDOM]
    //                 TabDOM[i] = <WorkspaceTab id={"i-WSButton-" + currentWSNum} text={"Workspace " + currentWSNum} ChangeTab={ChangeTab} clickState="On" closeOnClick={CloseOnClick} />
    //             }
    //         }
    //     }
    // }, [buttonPressed]);

    useEffect(() => {
        if (buttonPressed === 1) {
            //Update All tab's Selected 
            console.log(currentTab)
            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID !== currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={"Workspace " + TabHolder[i].tabID} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} clickState="Off" />)
                } else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={"Workspace " + TabHolder[i].tabID} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} clickState="On" />)
                }
            }
            TabHolder = [...TabHolder]
            //Change Current Device to Current Tab's 




            //Load Current Tab's XML Data
            Blockly.Xml.domToWorkspace(TabHolder[getTabPosition(currentTab)].tabXML, currentWorkspace)
            setCurrentDeviceName(TabHolder[getTabPosition(currentTab)].tabDevice)

            setButtonPressed(0)
        }
    }, [buttonPressed])


    function AddOnClick() {
        //Increment Total Tab Number
        console.log("I am Here")
        WSNumTracker = WSNumTracker + 1;
        //Create New Tab
        var newTab = new Tab(WSNumTracker);
        newTab.tabDevice = currentDeviceName;
        //Add it to TabHolder
        TabHolder = [...TabHolder, newTab];
        //Set New Tab as Current 
        setCurrentTab(newTab);
        setButtonPressed(1)

    }

    function ChangeTab(e) {
        //Save Current Tab's Device and 
        //TabHolder[getTabPosition(currentTab)].tabDevice = currentDeviceVar;
        TabHolder[getTabPosition(currentTab)].tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        //Change CurrentTab to new Tab
        var SelectedTabID = e.target.id.split("-")[2]
        setCurrentTab(TabHolder[getTabPositionByID(SelectedTabID)])
        currentWorkspace.clear()
        setButtonPressed(1)
    }

    function ChangeTasb(e) {
        var SelectedTabID = e.target.id.split("-")[2]
        var currPos = TabXMLs.findIndex((el) => el.id == currentWSNum)

        //Saving Tab Data
        console.log(currentDeviceName)
        TabXMLs[currPos].device = currentDeviceName;
        TabXMLs[currPos].xmlData = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        console.log(TabXMLs[currPos])
        //Changes to Current Tab to Target Tab
        currentWSNum = parseInt(SelectedTabID);
        //Loads Current Tab WorkspaceXML to tab
        currPos = TabXMLs.findIndex((el) => el.id == currentWSNum)
        console.log(currPos)
        currentWorkspace.clear()
        Blockly.Xml.domToWorkspace(TabXMLs[currPos].xmlData, currentWorkspace)

        setButtonPressed(1);
    }

    function CloseOnClick() {

    }

    function setCurrentTab(value) {
        currentTab = value;
    }
    // function AddOnClick() {
    //     WSNumTracker = WSNumTracker + 1;
    //     TabDOM = [...TabDOM, <WorkspaceTab id={"i-WSButton-" + WSNumTracker} text={"Workspace " + WSNumTracker} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} />]
    //     currentWSNum = WSNumTracker;
    //     TabNums.push(WSNumTracker);
    //     currentWorkspace.clear();
    //     var chosen_device_list = DeviceList.findIndex(o => o.device_name === currentDeviceName)
    //     var device_default_workspace = DeviceList[chosen_device_list].default_workspace;
    //     Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(device_default_workspace), currentWorkspace);
    //     TabXMLs = [...TabXMLs, { id: currentWSNum, xmlData: Blockly.Xml.workspaceToDom(Blockly.mainWorkspace), device: currentDeviceVar }]
    //     console.log(TabXMLs)
    //     setButtonPressed(1);
    // }

    // function CloseOnClick(container) {
    //     //Set focus to prev tab 
    //     if (TabNums.length > 1) {
    //         var NumToDelete = container.id.split("-")[2];
    //         //console.log(container.id.split("-")[2])
    //         TabNums = TabNums.filter(function (ele) {
    //             return ele != NumToDelete;
    //         });
    //         TabDOM = TabDOM.filter(function (ele) {
    //             //console.log(ele.props.id.split("-")[2])
    //             return ele.props.id.split("-")[2] !== NumToDelete;
    //         });
    //         TabXMLs = TabXMLs.filter(function (ele) {
    //             //console.log(ele.props.id.split("-")[2])
    //             return ele.id !== NumToDelete;
    //         });

    //         //prevWSNum = TabNums[0];
    //         //container.remove()
    //         currentWSNum = TabNums[0]
    //         //Load first Workspace
    //         currentWorkspace.clear()
    //         Blockly.Xml.domToWorkspace(TabXMLs[0].xmlData, currentWorkspace)

    //         // if(NumToDelete <= TabNums.length){

    //         //     currentWSNum = TabNums[NumId];
    //         // } else {
    //         //     currentWSNum = TabNums[TabNums.length-1];
    //         // }
    //         console.log(TabNums)

    //         setButtonPressed(1);
    //     }
    // }



    function getTabHolderJSX() {
        var RetArr = []
        for (var i = 0; i < TabHolder.length; i++) {
            RetArr[i] = TabHolder[i].tabJSX;
        }
        return RetArr;
    }

    function getTabPosition(inTab) {
        return TabHolder.findIndex(tabElement => tabElement.tabID == inTab.tabID)
    }
    function getTabPositionByID(inTab) {
        return TabHolder.findIndex(tabElement => tabElement.tabID == inTab)
    }

    //AddOnClick();
    return (
        <div id="c-WorkTabHolder-B-Container" className="c-WorkTabHolder-a-container">
            {getTabHolderJSX()}
            <WorkspaceAdd onClick={AddOnClick} />
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}