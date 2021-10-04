import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import Body from '../Body'

import "./TestMain.scss"

const TestMain = (props) => {
    const [serialport_monitor, setSerialPortMonitor] = useState("")
    const [viewCode, setViewCode] = useState("")
    var AllScrolls = document.getElementsByClassName("blocklyScrollbarHandle");
    var i = 0;
    for (i = 0; i < AllScrolls.length; i++) {
        AllScrolls[i].style.display = "none !important";
    }
    useEffect(() => {
        setViewCode(props.viewCode)
        if (serialport_monitor !== props.serialPortMonitor) {
            setSerialPortMonitor(props.serialport_monitor);
        }
    })
    useEffect(() => {
        
    },[viewCode]);

    return (
        <div>
            <Body ToolboxFunction={props.ToolboxFunction} MenuFunction={props.MenuFunction} workspaceClick={props.workspaceClick} viewCode={viewCode} serialport_monitor={serialport_monitor} toolboxButtons={props.toolboxButtons} onSerialPortClick={props.onSerialPortClick} />
        </div>
    )
}

export default TestMain

TestMain.defaultProps = {

}