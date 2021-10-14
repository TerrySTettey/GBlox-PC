import React, { useContext, useEffect, useState } from 'react'
import Button from '../Button'
import { DeviceContext } from '../contexts/DeviceContext'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'

import "./WorkTabHolder.scss"

var currentWSNum = 0;
var WSNumTracker = 0;
var TabDOM = [];
var TabNums = [];


const WorkTabHolder = (props) => {

    const {} = useContext(DeviceContext)

    class TabItem {

        selectedDevice;
        workSpace;
    
        tabID;
        tabNum;
        tabJsx;
        tabName;
    
        constructor(tabNum){
            this.tabNum = tabNum;
            this.tabID = `i-WSButton-${this.tabNum}`;
            this.tabName = `Workspace ${this.tabNum}`;
            this.tabJsx = (<WorkspaceTab id={"i-WSButton-" + this.tabNum} text={"Workspace " + this.tabNum} ChangeTab={ChangeTab} closeOnClick={CloseOnClick} />);
            //Set Selected Device to Default Selected Devices
            
            //Set Workspace to Default Workspace according to Selected Device
        }
    
        loadWorkspace(){
            //Sets the device to the right device and loads the attached workspace
        }
    }

    var [buttonPressed, setButtonPressed] = useState(0);
    useEffect(() => {
        AddOnClick();
    }, [])

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
        setButtonPressed(1);
    }

    function CloseOnClick(container) {
        //Set focus to prev tab 
        var NumToDelete = container.id.split("-")[2];
        //console.log(container.id.split("-")[2])
        TabNums = TabNums.filter(function (ele) {
            return ele != NumToDelete;
        });
        TabDOM = TabDOM.filter(function (ele) {
            //console.log(ele.props.id.split("-")[2])
            return ele.props.id.split("-")[2] !== NumToDelete;
        });

        //prevWSNum = TabNums[0];
        //container.remove()
        currentWSNum = TabNums[0]

        // if(NumToDelete <= TabNums.length){

        //     currentWSNum = TabNums[NumId];
        // } else {
        //     currentWSNum = TabNums[TabNums.length-1];
        // }
        console.log(TabNums)
        
        setButtonPressed(1);
    }

    function ChangeTab(e) {
        var SelectedTabID = e.target.id.split("-")[2]
        //prevWSNum = currentWSNum;
        currentWSNum = parseInt(SelectedTabID);
        //console.log(TabDOM)
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