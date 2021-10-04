import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './Serial_Menu.scss'

function Index(props) {
    const [serialport_monitor, setSerialPortMonitor] = useState("")

    useEffect(() =>
    {
        setSerialPortMonitor(props.serialport_monitor);
        console.log(props.serialport_monitor)
    })

    return (
        <Menu>
            <div id="serial-menu">
                <div className="text">Serial Monitor</div>
                <div className="serial-monitor">
                    {serialport_monitor}
                </div>
                <div className="serial-write">
                    <input className="serial-input" placeholder="Write To Serial monitor"></input>
                </div>
            </div>
        </Menu>
    )
}

Index.propTypes = {

}

export default Index

