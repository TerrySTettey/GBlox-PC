import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './Serial_Menu.scss'

function index(props) {
    return (
        <Menu>
            <div id="serial-menu">
                <div className="text">Serial Monitor</div>
                <div className="serial-monitor">
                    {props.serialport_monitor}
                </div>
                <div className="serial-write">
                    <input className="serial-input" placeholder="Write To Serial monitor"></input>
                </div>
            </div>
        </Menu>
    )
}

index.propTypes = {

}

export default index

