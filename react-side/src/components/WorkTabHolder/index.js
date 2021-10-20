import React, { useContext, useEffect, useReducer, useState } from 'react'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'
import Blockly, { Block } from 'blockly'
import "./WorkTabHolder.scss"
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager'

var WSNumTracker = 0;
var TabHolder = [];
var currentTab = null;

const WorkTabHolder = (props) => {
    const { initialized_workspace, setInitializedWorkspace, currentWorkspace, selectedDevice, setCurrentDeviceName, currentDeviceName, setCurrentToolBoxLevel, currentToolBoxLevel, setToolBoxInit, toolBoxInit, currentDeviceChanged, setCurrentDeviceChanged, selectedToolbox, setSelectedToolbox } = useContext(Ctxt_SingletonManager);
    const [tabAddedState, setTabAddedState] = useState(0);
    const [tabChangedState, setTabChangedState] = useState(0)
    class Tab {
        tabID
        tabJSX
        tabXML
        tabDevice
        tabLevel
        constructor(TabNum) {
            this.tabID = TabNum
            this.tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabNum} text={"Workspace " + TabNum} ChangeTab={ChangeTab} closeOnClick={CloseTab} />)
            this.tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
            this.tabDevice = currentDeviceName
            this.tabLevel = 0;
        }
    }

    //When the current device is changed
    useEffect(() => {
        if (currentDeviceChanged === 1) {
            currentTab.tabDevice = currentDeviceName
            console.log(selectedDevice.toolbox)
            TabHolder[getTabPosition(currentTab)] = currentTab;
            //console.log(selectedToolbox)
            
            setCurrentDeviceChanged(0)
        }
    }, [currentDeviceChanged])

    //When Initialized
    useEffect(() => {
        if (initialized_workspace) {
            AddTab()
        }
    }, [initialized_workspace])

    //After a Tab is Added
    useEffect(() => {
        if (tabAddedState === 1) {
            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID === currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={"Workspace " + TabHolder[i].tabID} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="On" />)
                    currentTab = TabHolder[i]
                }
                else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={"Workspace " + TabHolder[i].tabID} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="Off" />)
                }
            }
            
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(selectedDevice.default_workspace), currentWorkspace);
            console.log(currentTab)
            setTabAddedState(0)
        }
    }, [tabAddedState])

    //After current Tab is changed
    useEffect(() => {
        if (tabChangedState === 1) {
            TabHolder[getTabPosition(currentTab)] = currentTab

            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID === currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={"Workspace " + TabHolder[i].tabID} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="On" />)
                    currentTab = TabHolder[i]
                }
                else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={"Workspace " + TabHolder[i].tabID} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="Off" />)
                }
            }

            console.log(currentTab)
            setTabChangedState(0)
        }
    }, [tabChangedState])

    function AddTab() {
        WSNumTracker = WSNumTracker + 1;
        currentTab = new Tab(WSNumTracker);
        TabHolder = [...TabHolder, currentTab]
        setTabAddedState(1)
    }
    function CloseTab() {

    }
    function ChangeTab(e) {
        var SelectedID = e.target.id.split("-")[2];
        currentTab.tabXML = Blockly.Xml.workspaceToDom(currentWorkspace)
        TabHolder[getTabPosition(currentTab)] = currentTab
        currentTab = TabHolder[getTabPositionByID(SelectedID)]
        Blockly.Xml.clearWorkspaceAndLoadFromXml(currentTab.tabXML, currentWorkspace)
        setCurrentDeviceName(currentTab.tabDevice)
        setTabChangedState(1)

    }
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
            <WorkspaceAdd onClick={AddTab} />
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}