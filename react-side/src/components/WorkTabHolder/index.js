import React, { useContext, useEffect, useReducer, useState } from 'react'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'
import Blockly, { Block } from 'blockly'
import "./WorkTabHolder.scss"
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager'

var WSNumTracker = 0;

var TabHolder = [];
var currentTab = null;
var done = false;


const WorkTabHolder = (props) => {
    const { initialized_workspace, setInitializedWorkspace, currentWorkspace, selectedDevice, setCurrentDeviceName, currentDeviceName, setCurrentToolBoxLevel, currentToolBoxLevel, setToolBoxInit, toolBoxInit } = useContext(Ctxt_SingletonManager);
    var [buttonPressed, setButtonPressed] = useState(0);

    class Tab {
        tabID
        tabJSX
        tabXML
        tabDevice
        tabSet
        tabLevel
        constructor(TabNum) {
            this.tabID = TabNum
            this.tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabNum} text={"Workspace " + TabNum} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} />)
            this.tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
            this.tabDevice = currentDeviceName
            this.tabSet = false;
            this.tabLevel = 0;
            //console.log(this)
        }
    }

    const [Tabber, TabDispatch] = useReducer(TabReducer, []);

    function TabReducer(state, action) {
        switch (action.type) {
            case "ADD-TAB":
                WSNumTracker = WSNumTracker + 1;
                console.log("WSNUM: " + WSNumTracker)
                Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(selectedDevice.default_workspace), currentWorkspace);
                let newTab = new Tab(WSNumTracker);
                currentTab = newTab
                return [...state, currentTab];
                break;
            case "CLOSE-TAB":
                return state
                break;
            case "CHANGE-TAB":
                return state
                break;
            default:
                return state
                break;
        }
    }

    useEffect(() => {
        if (initialized_workspace) {
            AddOnClick();
        }
    }, [initialized_workspace])
    {
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
    }
    useEffect(() => {
        if (buttonPressed === 1) {
            //Update All tab's Selected 
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
            //Blockly.Xml.domToWorkspace(TabHolder[getTabPosition(currentTab)].tabXML, currentWorkspace)
            //setCurrentDeviceName(TabHolder[getTabPosition(currentTab)].tabDevice)

            TabHolder[getTabPosition(currentTab)].tabDevice = currentDeviceName

            setButtonPressed(0)
        }
    }, [buttonPressed])


    function AddOnClick() {
        //Increment Total Tab Number
        WSNumTracker = WSNumTracker + 1;
        //Create New Tab
        var newTab = new Tab(WSNumTracker);
        console.log("Selected Device is still " + selectedDevice.device_name + " when its supposed to be " + currentDeviceName)
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(selectedDevice.default_workspace), currentWorkspace);
        //Add it to TabHolder
        TabHolder = [...TabHolder, newTab];
        //Set New Tab as Current 
        setCurrentTab(newTab);
        setButtonPressed(1)
    }

    function ChangeTab(e) {
        //Save Current Tab's Device
        //TabHolder[getTabPosition(currentTab)].tabDevice = currentDeviceName
        //console.log(`Last Tab (${getTabPosition(currentTab)})  Device: ${currentDeviceName}`)
        //TabHolder[getTabPosition(currentTab)].tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        //Change CurrentTab to new Tab
        var SelectedTabID = e.target.id.split("-")[2]
        setCurrentTab(TabHolder[getTabPositionByID(SelectedTabID)])
        console.log(currentTab)
        //currentWorkspace.clear()
        //setCurrentDeviceName(TabHolder[getTabPositionByID(SelectedTabID)].tabDevice)
        //setToolBoxInit(1)
        setButtonPressed(1)
    }

    function CloseOnClick() {

    }

    function setCurrentTab(value) {
        currentTab = value;
    }

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
        for (var i = 0; i < Tabber.length; i++) {
            RetArr[i] = Tabber[i].tabJSX;
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
            <WorkspaceAdd onClick={(e) => TabDispatch({ type: "ADD-TAB" })} />
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}