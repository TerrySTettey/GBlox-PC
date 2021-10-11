import React, { useEffect, useState } from 'react'
import Button from '../Button'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'

import "./WorkTabHolder.scss"

var prevWSNum = 0;
var currentWSNum = 0;
var WSNumTracker = 0;
var TabDOM = [];

const WorkTabHolder = (props) => {
    var [buttonPressed, setButtonPressed] = useState(0);
    useEffect(() => {
        AddOnClick();
    }, [])

    useEffect(() => {

        if (buttonPressed === 1) {
            console.log("---------")
            console.log("Previous: " + prevWSNum)
            console.log("Current: " + currentWSNum)
            console.log("Latest: " + WSNumTracker)
            console.log("---------")

            setButtonPressed(0);

            //Change State of Previous
            var Num = TabDOM.findIndex(element => element.props.id.split("-")[2] == prevWSNum)
            if (TabDOM[Num] !== undefined) {
                TabDOM = [...TabDOM]
                TabDOM[Num] = <WorkspaceTab id={"i-WSButton-" + prevWSNum} text={"Workspace " + prevWSNum} ChangeTab={ChangeTab} clickState="Off" closeOnClick={CloseOnClick} />
            }
            //Change State of Current
            var Num2 = TabDOM.findIndex(element => element.props.id.split("-")[2] == currentWSNum)
            if (TabDOM[Num2] !== undefined) {
                TabDOM = [...TabDOM]
                TabDOM[Num2] = <WorkspaceTab id={"i-WSButton-" + currentWSNum} text={"Workspace " + currentWSNum} ChangeTab={ChangeTab} clickState="On" closeOnClick={CloseOnClick}/>
            }
        }
        

        //setTabDOMState(TabDOM)
    }, [buttonPressed]);

    function AddOnClick() {
        prevWSNum = currentWSNum
        WSNumTracker = WSNumTracker + 1;
        TabDOM = [...TabDOM, <WorkspaceTab id={"i-WSButton-" + WSNumTracker} text={"Workspace " + WSNumTracker} ChangeTab={ChangeTab} closeOnClick={CloseOnClick}/>]
        //console.log(TabDOM)
        currentWSNum = WSNumTracker;
        setButtonPressed(1);
    }

    function CloseOnClick(container) {
        //Set focus to prev tab 
        container.remove()
    }

    function ChangeTab(e) {
        var SelectedTabID = e.target.id.split("-")[2]
        prevWSNum = currentWSNum;
        currentWSNum = parseInt(SelectedTabID);
        //console.log(TabDOM)
        setButtonPressed(1);
    }

    //AddOnClick();
    return (
        <div className="c-WorkTabHolder-a-container">
            {TabDOM}
            <WorkspaceAdd onClick={AddOnClick} />
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}