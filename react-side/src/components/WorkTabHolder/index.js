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


const WorkTabHolder = (props) => {

    const { initialized_workspace, OurWorkspace, device_chosen, default_workspace, DeviceList } = useContext(DeviceContext);
    var [buttonPressed, setButtonPressed] = useState(0);
    useEffect(() => {
        if (initialized_workspace === true) {
            AddOnClick();
            console.log(initialized_workspace + " has initialized")
        }
    }, [initialized_workspace])

    useEffect(() => {

        if (buttonPressed === 1) {
            // console.log("---------")
            // console.log("Current: " + currentWSNum)
            // console.log("Latest: " + WSNumTracker)
            // console.log("---------")

            setButtonPressed(0);

            for (var i = 0; i < TabNums.length; i++) {
                if (TabNums[i] !== currentWSNum) {
                    TabDOM = [...TabDOM]
                    TabDOM[i] = <WorkspaceTab id={"i-WSButton-" + TabNums[i]} text={"Workspace " + TabNums[i]} ChangeTab={ChangeTab} clickState="Off" closeOnClick={CloseOnClick} />
                } else {
                    TabDOM = [...TabDOM]
                    TabDOM[i] = <WorkspaceTab id={"i-WSButton-" + currentWSNum} text={"Workspace " + currentWSNum} ChangeTab={ChangeTab} clickState="On" closeOnClick={CloseOnClick} />
                }
            }

            // //Change State of Previous
            // var Num = TabDOM.findIndex(element => element.props.id.split("-")[2] == prevWSNum)
            // if (TabDOM[Num] !== undefined) {
            //     TabDOM = [...TabDOM]
            //     TabDOM[Num] = <WorkspaceTab id={"i-WSButton-" + prevWSNum} text={"Workspace " + prevWSNum} ChangeTab={ChangeTab} clickState="Off" closeOnClick={CloseOnClick} />
            // }
            // //Change State of Current
            // var Num2 = TabDOM.findIndex(element => element.props.id.split("-")[2] == currentWSNum)
            // if (TabDOM[Num2] !== undefined) {
            //     TabDOM = [...TabDOM]
            //     TabDOM[Num2] = <WorkspaceTab id={"i-WSButton-" + currentWSNum} text={"Workspace " + currentWSNum} ChangeTab={ChangeTab} clickState="On" closeOnClick={CloseOnClick} />
            // }
        }


        //setTabDOMState(TabDOM)
    }, [buttonPressed]);

    function AddOnClick() {
        //prevWSNum = currentWSNum
        WSNumTracker = WSNumTracker + 1;
        TabDOM = [...TabDOM, <WorkspaceTab id={"i-WSButton-" + WSNumTracker} text={"Workspace " + WSNumTracker} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} />]
        //console.log(TabDOM)
        currentWSNum = WSNumTracker;
        TabNums.push(WSNumTracker);
        
        OurWorkspace.clear();
        var chosen_device_list = DeviceList.findIndex(o => o.device_name === device_chosen)
        var device_default_workspace = DeviceList[chosen_device_list].default_workspace;
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(device_default_workspace), OurWorkspace);
        TabXMLs = [...TabXMLs, {id: currentWSNum, xmlData: Blockly.Xml.workspaceToDom(Blockly.mainWorkspace) }]
        console.log(TabXMLs)
        setButtonPressed(1);
    }

    function CloseOnClick(container) {
        //Set focus to prev tab 
        if (TabNums.length > 1) {
            var NumToDelete = container.id.split("-")[2];
            //console.log(container.id.split("-")[2])
            TabNums = TabNums.filter(function (ele) {
                return ele != NumToDelete;
            });
            TabDOM = TabDOM.filter(function (ele) {
                //console.log(ele.props.id.split("-")[2])
                return ele.props.id.split("-")[2] !== NumToDelete;
            });
            TabXMLs = TabXMLs.filter(function (ele) {
                //console.log(ele.props.id.split("-")[2])
                return ele.id !== NumToDelete;
            });

            //prevWSNum = TabNums[0];
            //container.remove()
            currentWSNum = TabNums[0]
            //Load first Workspace
            OurWorkspace.clear()
            Blockly.Xml.domToWorkspace(TabXMLs[0].xmlData, OurWorkspace)
            
            // if(NumToDelete <= TabNums.length){

            //     currentWSNum = TabNums[NumId];
            // } else {
            //     currentWSNum = TabNums[TabNums.length-1];
            // }
            console.log(TabNums)

            setButtonPressed(1);
        }
    }

    function ChangeTab(e) {
        var SelectedTabID = e.target.id.split("-")[2]
        var currPos = TabXMLs.findIndex((el)=>el.id == currentWSNum )
        //Saving Tab Data
        TabXMLs[currPos].xmlData = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        //Changes to Current Tab to Target Tab
        currentWSNum = parseInt(SelectedTabID);
        //Loads Current Tab WorkspaceXML to tab
        currPos = TabXMLs.findIndex((el)=>el.id == currentWSNum )
        console.log(currPos)
            OurWorkspace.clear()
            Blockly.Xml.domToWorkspace(TabXMLs[currPos].xmlData, OurWorkspace)

        setButtonPressed(1);
    }

    //AddOnClick();
    return (
        <div id="c-WorkTabHolder-B-Container" className="c-WorkTabHolder-a-container">
            {TabDOM}
            <WorkspaceAdd onClick={AddOnClick} />
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}