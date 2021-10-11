import React, { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types"

import "./WorkspaceTab.scss"

const WorkspaceTab = (props) => {

    /*var [clickState, setClickState] = useState("Off");*/

    const container = useRef(null);

    useEffect(()=> {
        let aText = container.current.querySelectorAll(".c-WorkspaceTab-a-Text")[0];
        let aShadow = container.current.querySelectorAll(".i-dropShadow")[0];

        if(props.clickState === "On"){
            container.current.style.maxWidth = "fit-content";
            container.current.style.backgroundColor = "#0B0533";
            container.current.style.flexGrow = "1";
            container.current.style.flexShrink = "0";
            aText.style.color = "#FFF"
            aText.style.maxWidth = "1000px"
            aShadow.style.backgroundImage = "linear-gradient(to right, #0000,#0B0533)"
        } else  if (props.clickState === "Off") {
            container.current.style.maxWidth = "180px";
            container.current.style.backgroundColor = "#0B0533CC";
            container.current.style.flexGrow = "0";
            container.current.style.flexShrink = "1";
            aText.style.color = "#FFF6"
            aText.style.maxWidth = "162px"
            aShadow.style.backgroundImage = "linear-gradient(to right, #0000,#0B0533CC)"
        }
    },[props.clickState])

    function RunOnClick(e) {
        //Changing Transparency and Size
        if (props.ChangeTab !== undefined) {
            props.ChangeTab(e);
        }
    }

    function CloseOnClick() {
        container.current.remove();
    }

    return (
        <div className="c-WorkspaceTab-a-Container" ref={container} onClick={RunOnClick} id={props.id}>
            <p className="c-WorkspaceTab-a-Text"> {props.text}
                <div className="i-dropShadow" />
            </p>
            <div className="i-dropShadow" />
            <div className="c-WorkspaceTab-a-Close" onClick={CloseOnClick}>
                X
            </div>
        </div >
    )
}


export default WorkspaceTab

WorkspaceTab.defaultProps = {
    text: "Hello World",
    clickState: "Off",
}

WorkspaceTab.propTypes = {
    text: PropTypes.string,
    clickState: PropTypes.string,

}


