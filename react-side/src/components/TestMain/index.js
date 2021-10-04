import React from 'react'
import PropTypes from 'prop-types'
import Body  from '../Body'

import "./TestMain.scss"

const TestMain = (props) => {

    var AllScrolls = document.getElementsByClassName("blocklyScrollbarHandle");
    var i = 0;
    for(i = 0; i < AllScrolls.length; i++){
        AllScrolls[i].style.display = "none !important";
    }
    return (
        <div>
            <Body ToolboxFunction={props.ToolboxFunction} MenuFunction={props.MenuFunction} workspaceClick={props.workspaceClick} viewCode={props.viewCode} toolboxButtons={props.toolboxButtons} serialport_monitor={props.serialport_monitor} onSerialPortClick={props.onSerialPortClick}/>
        </div>
    )
}

export default TestMain

TestMain.defaultProps = {
    
}