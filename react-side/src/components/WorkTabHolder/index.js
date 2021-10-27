import React, { useContext, useEffect, useRef, useState } from 'react'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'
import Blockly, { Block } from 'blockly'
import "./WorkTabHolder.scss"
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager'
import { throws } from 'assert'

var WSNumTracker = 0;
var TabHolder = [];
var currentTab = null;

const WorkTabHolder = (props) => {
    const {
        initialized_workspace,
        setInitializedWorkspace,
        currentWorkspace,
        selectedDevice,
        setCurrentDeviceName,
        currentDeviceName,
        setCurrentToolBoxLevel,
        currentToolBoxLevel,
        setToolBoxInit,
        toolBoxInit,
        currentDeviceChanged,
        setCurrentDeviceChanged,
        selectedToolbox,
        setSelectedToolbox,
        toolboxLevel,
        setToolboxLevel,
        setToolboxUpdate,
        currentTabPath,
        setCurrentTabPath,
        savedOrLoaded,
        setSavedOrLoaded
    } = useContext(Ctxt_SingletonManager);
    const [tabAddedState, setTabAddedState] = useState(0);
    const [tabChangedState, setTabChangedState] = useState(0)
    const [tabClosedState, setTabClosedState] = useState(0)
    class Tab {
        tabID
        tabJSX
        tabXML
        tabDevice
        tabLevel
        tabPath
        tabName
        constructor(TabNum) {
            this.tabID = TabNum;
            this.tabPath = "";
            this.setName()
            this.tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabNum} text={this.tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} />)
            this.tabXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
            this.tabDevice = currentDeviceName
            this.tabLevel = 1;
        }

        setName() {
            if (this.tabPath !== "") {
                var splits = this.tabPath.split("\\")
                var name = splits[splits.length - 1]
                this.tabName = name.split(".")[0]
            } else {
                this.tabName = "Workspace " + this.tabID
            }
        }
    }

    //When the current device is changed
    useEffect(() => {
        if (currentDeviceChanged === 1) {
            currentTab.tabDevice = currentDeviceName
            TabHolder[getTabPosition(currentTab)] = currentTab;
            setCurrentDeviceChanged(0)
        }
    }, [currentDeviceChanged])

    //When Initialized
    useEffect(() => {
        if (initialized_workspace) {
            AddTab()
        }
    }, [initialized_workspace])

    //When saved or loaded
    useEffect(() => {
        if (savedOrLoaded === 1) {
            currentTab.tabPath = currentTabPath
            currentTab.setName();
            TabHolder[getTabPosition(currentTab)] = currentTab;

            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID === currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="On" />)
                    currentTab = TabHolder[i]
                }
                else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="Off" />)
                }
            }

            setSavedOrLoaded(0)
        }
    }, [savedOrLoaded])
    //After a Tab is Added
    useEffect(() => {
        if (tabAddedState === 1) {
            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID === currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="On" />)
                    currentTab = TabHolder[i]
                }
                else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="Off" />)
                }
            }

            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(selectedDevice.default_workspace), currentWorkspace);
            setTabAddedState(0)
        }
    }, [tabAddedState])

    //After current Tab is changed
    useEffect(() => {
        if (tabChangedState === 1) {
            TabHolder[getTabPosition(currentTab)] = currentTab
            document.getElementById("toolbox_selector_level_" + currentTab.tabLevel).click()
            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID === currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="On" />)
                    currentTab = TabHolder[i]
                }
                else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="Off" />)
                }
            }
            setToolboxLevel(currentTab.tabLevel)
            setToolboxUpdate(1)
            console.log(currentTab)

            setTabChangedState(0)
        }
    }, [tabChangedState])
    //After Tab is closed
    useEffect(() => {
        if (tabClosedState === 1) {
            TabHolder[getTabPosition(currentTab)] = currentTab
            document.getElementById("toolbox_selector_level_" + currentTab.tabLevel).click()
            for (var i = 0; i < TabHolder.length; i++) {
                if (TabHolder[i].tabID === currentTab.tabID) {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="On" />)
                    currentTab = TabHolder[i]
                }
                else {
                    TabHolder[i].tabJSX = (<WorkspaceTab id={"i-WSButton-" + TabHolder[i].tabID} text={TabHolder[i].tabName} ChangeTab={ChangeTab} closeOnClick={CloseTab} clickState="Off" />)
                }
            }
            setToolboxLevel(currentTab.tabLevel)
            setToolboxUpdate(1)
            console.log(currentTab)
            setTabClosedState(0)
        }
    }, [tabClosedState])

    useEffect(() => {
        if (currentTab !== null) {
            currentTab.tabLevel = toolboxLevel
        }
    })

    function AddTab() {
        if (currentTab !== null) {
            currentTab.tabXML = Blockly.Xml.workspaceToDom(currentWorkspace)
            TabHolder[getTabPosition(currentTab)] = currentTab
        }
        var IDArray = []
        for(var i = 0; i < TabHolder.length; i++){
            IDArray.push(TabHolder[i].tabID)
        }
        if(IDArray.length !== 0){
            WSNumTracker = Math.max(...IDArray) + 1;
        } else {
            WSNumTracker = 1;
        }
        currentTab = new Tab(WSNumTracker);
        //currentTab.tabLevel = toolboxLevel;
        setCurrentTabPath("")
        setToolboxUpdate(1)
        TabHolder = [...TabHolder, currentTab]

        setTabAddedState(1)
    }
    function CloseTab(e) {
        if (TabHolder.length > 1) {
            var SelectedID = e.target.parentNode.id.split("-")[2];
            TabHolder = TabHolder.filter((el) => { return el.tabID != SelectedID })
            currentTab = TabHolder[TabHolder.length - 1]
            Blockly.Xml.clearWorkspaceAndLoadFromXml(currentTab.tabXML, currentWorkspace)
            setCurrentDeviceName(currentTab.tabDevice)
            setTabClosedState(1)
        }
    }
    function ChangeTab(e) {
        var SelectedID = e.target.id.split("-")[2];
        currentTab.tabXML = Blockly.Xml.workspaceToDom(currentWorkspace)
        TabHolder[getTabPosition(currentTab)] = currentTab
        currentTab = TabHolder[getTabPositionByID(SelectedID)]
        Blockly.Xml.clearWorkspaceAndLoadFromXml(currentTab.tabXML, currentWorkspace)
        setCurrentDeviceName(currentTab.tabDevice)
        setCurrentTabPath(currentTab.tabPath)
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