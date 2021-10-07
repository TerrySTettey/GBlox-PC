import React, { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types"

import "./WorkspaceTab.scss"

const WorkspaceTab = (props) => {

    var [clickState, setClickState] = useState("Off");

    const container = useRef(null);

    function RunOnClick() {
        

        //Changing Transparency and Size
        if (props.ChangeTab !== undefined) {
            props.ChangeTab();
        }
    }

    return (
        <div className="c-WorkspaceTab-a-Container" ref={container} onClick={props.onClick}>
            <p className="c-WorkspaceTab-a-Text"> {props.text}
                <div className="i-dropShadow" />
            </p>
            <div className="i-dropShadow" />
            <div className="c-WorkspaceTab-a-Close" onClick={props.closeOnClick}>
                X
            </div>
        </div >
    )
}

export default WorkspaceTab

WorkspaceTab.defaultProps = {
    text: "Hello World",
}

WorkspaceTab.propTypes = {
    text: PropTypes.string,
}


