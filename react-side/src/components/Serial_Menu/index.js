import React, { useState, useEffect, useContext } from 'react';
import { useLocale } from "react-easy-localization";
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager'
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './Serial_Menu.scss'

function Index(props) {
    const {serialport_monitor, serialport_write} = useContext(Ctxt_SingletonManager)
    const { i18n} = useLocale();
    function sendSerial(e){
        if (e.key == "Enter"){
            var value = document.getElementById("serial-input").value;
            serialport_write(value)
            document.getElementById("serial-input").value = ""
        }
    }
    return (
        <Menu>
            <div id="serial-menu">
                <div className="text">{i18n.serial_monitor}</div>
                <div className="serial-monitor">
                    {serialport_monitor}
                </div>
                <div className="serial-write">
                    <input id="serial-input" placeholder={i18n.write_to_serial_monitor} onKeyPress={sendSerial}></input>
                </div>
            </div>
        </Menu>
    )
}

Index.propTypes = {

}

export default Index

