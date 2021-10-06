import React, { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types"

import "./WorkspaceAdd.scss"

const WorkspaceAdd = (props) => {
    return (
        <div className="c-WorkspaceAdd-a-Container" onClick={props.onClick}>
            <div className="i-DivBox"/>
            <div className="i-DivBox-1"/>
            <div className="i-DivBox-2"/>
            <div className="i-DivBox-3"/>
            <div className="i-DivBox-4"/>
            <div className="c-WorkspaceAdd-a-Plus">
                +
            </div>
        </div >
    )
}

export default WorkspaceAdd

WorkspaceAdd.defaultProps = {
    text: "Hello World",
}

WorkspaceAdd.propTypes = {
    text: PropTypes.string,
}


