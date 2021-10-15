import React, { useContext, useEffect, useState } from 'react'
import { DeviceContext } from '../contexts/DeviceContext'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'
import Blockly, { Block } from 'blockly'
import "./WorkTabHolder.scss"

var currentWSNum = 0;
var WSNumTracker = 0;
var TabDOM = [];
var TabNums = [];
var TabXMLs = [];

var TabHolder = [];
var currentTab = null;
var currentDeviceVar = null;


const WorkTabHolder = (props) => {
    const { initialized_workspace, OurWorkspace, device_chosen, DeviceList, setDeviceChosen} = useContext(DeviceContext);
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
            var chosen_device_list = DeviceList.findIndex(o => o.device_name === device_chosen)
            var device_default_workspace = DeviceList[chosen_device_list].default_workspace;
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(device_default_workspace), OurWorkspace);
            this.tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
            this.tabDevice = currentDeviceVar
            this.tabSet = false;
            console.log(this.tabDevice)
        }
    }
    useEffect(() => {
        if (initialized_workspace === true) {
            AddOnClick();
            //console.log(initialized_workspace + " has initialized")
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
            Blockly.Xml.domToWorkspace(TabHolder[getTabPosition(currentTab)].tabXML, OurWorkspace)
            setDeviceChosen(TabHolder[getTabPosition(currentTab)].tabDevice)

            setButtonPressed(0)
        }
    }, [buttonPressed])
    useEffect(()=> {
        try{
            currentDeviceVar = device_chosen;
            currentTab.tabDevice = device_chosen;
            console.log(currentTab)
            TabHolder[getTabPosition(currentTab)] = currentTab;
            TabHolder = [...TabHolder]
        }
        catch(e){}
        
    }, [device_chosen])


    function AddOnClick() {
        //Increment Total Tab Number
        WSNumTracker = WSNumTracker + 1;
        //Create New Tab
        var newTab = new Tab(WSNumTracker);
        newTab.tabDevice = device_chosen;
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
        OurWorkspace.clear()
        setButtonPressed(1)

    }

    function ChangeTasb(e) {
        var SelectedTabID = e.target.id.split("-")[2]
        var currPos = TabXMLs.findIndex((el) => el.id == currentWSNum)

        //Saving Tab Data
        console.log(device_chosen)
        TabXMLs[currPos].device = currentDeviceVar;
        TabXMLs[currPos].xmlData = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        console.log(TabXMLs[currPos])
        //Changes to Current Tab to Target Tab
        currentWSNum = parseInt(SelectedTabID);
        //Loads Current Tab WorkspaceXML to tab
        currPos = TabXMLs.findIndex((el) => el.id == currentWSNum)
        console.log(currPos)
        OurWorkspace.clear()
        Blockly.Xml.domToWorkspace(TabXMLs[currPos].xmlData, OurWorkspace)
        
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
    //     OurWorkspace.clear();
    //     var chosen_device_list = DeviceList.findIndex(o => o.device_name === device_chosen)
    //     var device_default_workspace = DeviceList[chosen_device_list].default_workspace;
    //     Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(device_default_workspace), OurWorkspace);
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
    //         OurWorkspace.clear()
    //         Blockly.Xml.domToWorkspace(TabXMLs[0].xmlData, OurWorkspace)

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