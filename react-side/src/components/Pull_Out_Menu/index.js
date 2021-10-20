import React from 'react'
import PropTypes from 'prop-types'
import "./Pull_Out_Menu.scss"
import svg_dictionary from "../svg_dictionary"
import Button from '../Button'
import Help_Menu from '../Help_Menu'
import Serial_Menu from '../Serial_Menu'
import View_Code_Menu from '../View_Code_Menu'
import Edit_Code_Menu from '../Edit_Code_Menu'
import Example_Code_Menu from '../Example_Code_Menu'
import { useRef, useState, useEffect } from 'react'


function Pull_Out_Menu(props) {
    const [contents, setContents] = useState([<div></div>]);
    const [last_button_clicked, setLastButtonClicked] = useState("");
    const [currentMenu, setCurrentMenu] = useState("")
    const [serialport_monitor, setSerialPortMonitor] = useState("")
    const [serialport_status, setSerialPortStatus] = useState(false)
    const { children } = props;
    var [menuOpen, setMenuOpen] = useState("Open");
    var pull_out_menu = useRef(null);
    var pull_out_container = useRef(null);
    var code_viewer = null;


    function closeSerial() {
        if (serialport_status === true) {
            setSerialPortStatus(false)
            { props.onSerialPortClick() }
        }
    }

    function Menu(event) {
        var button_clicked = event.target.id;
        setMenuOpen("Open")
        
        if (button_clicked !== "") {
            switch (button_clicked) {
                case "serial-port":
                    if (serialport_status === false) {
                        setSerialPortMonitor(props.serialport_monitor);
                        props.onSerialPortClick()
                        setSerialPortStatus(true)
                        setContents([<Serial_Menu serialport_monitor={serialport_monitor} />]);
                    }
                    else {
                        setSerialPortMonitor(props.serialport_monitor);
                    }
                    setCurrentMenu(button_clicked)
                    break;
                case "view-code":
                    if (currentMenu !== button_clicked) {
                    setContents([<View_Code_Menu/>]);
                    setCurrentMenu(button_clicked)
                    }
                    break;
                case "help-menu":
                    if (currentMenu !== button_clicked) {
                        setContents([<Help_Menu />]);
                        setCurrentMenu(button_clicked)
                    }
                    break;

                case "code-editor":
                    if (currentMenu !== button_clicked) {
                        setContents([<Edit_Code_Menu />])
                        setCurrentMenu(button_clicked)
                    }
                    break;

                case "example-code":
                    if (currentMenu !== button_clicked) {
                        setContents([
                            <Example_Code_Menu example_codes={props.example_codes}>
                            </Example_Code_Menu>
                        ])
                        setCurrentMenu(button_clicked)
                    }
                    break;

            }
            if (button_clicked !== "serial-port") {
                closeSerial();
            }
        }

        if (currentMenu !== button_clicked) {
            setLastButtonClicked(button_clicked);
            setMenuOpen("Closed")
            pull_out_menu.current.style.marginLeft = "-410px"
            pull_out_container.current.style.opacity = "1"
        }
        else {
            setLastButtonClicked("None");
            pull_out_menu.current.style.marginLeft = "0px"
            pull_out_container.current.style.opacity = "0"
        }

    }


    useEffect(() => {
        var Overlay = document.getElementsByClassName("c-Body-a-Overlay")[0];
        var OverlayExtras = document.getElementsByClassName("c-Body-a-OverlayExtras")[0];
        var TabHolder = document.getElementById("c-WorkTabHolder-B-Container");

        if (menuOpen === "Closed") {
            if (!Overlay.classList.contains("t-Transition")) {
                Overlay.classList.add("t-Transition")
            }
            if (!OverlayExtras.classList.contains("t-Transition")) {
                OverlayExtras.classList.add("t-Transition")
            }
            if (!TabHolder.classList.contains("t-Transition")) {
                TabHolder.classList.add("t-Transition")
            }
            Overlay.style.width = "calc(100vw - 420px)"
            OverlayExtras.style.width = "420px"
            TabHolder.style.width = "calc(100vw - 706px)"
            setTimeout(function () {
                if (Overlay.classList.contains("t-Transition")) {
                    Overlay.classList.remove("t-Transition")
                }
                if (OverlayExtras.classList.contains("t-Transition")) {
                    OverlayExtras.classList.remove("t-Transition")
                }
                if (TabHolder.classList.contains("t-Transition")) {
                    TabHolder.classList.remove("t-Transition")
                }
            }, 500);

        } else {
            if (!Overlay.classList.contains("t-Transition")) {
                Overlay.classList.add("t-Transition")
            }
            if (!OverlayExtras.classList.contains("t-Transition")) {
                OverlayExtras.classList.add("t-Transition")
            }
            if (!TabHolder.classList.contains("t-Transition")) {
                TabHolder.classList.add("t-Transition")
            }
            Overlay.style.width = "100vw"
            OverlayExtras.style.width = "0px"
            TabHolder.style.width = "calc(100vw - 286px)"
            setTimeout(function () {
                if (Overlay.classList.contains("t-Transition")) {
                    Overlay.classList.remove("t-Transition")
                }
                if (OverlayExtras.classList.contains("t-Transition")) {
                    OverlayExtras.classList.remove("t-Transition")
                }
                if (TabHolder.classList.contains("t-Transition")) {
                    TabHolder.classList.remove("t-Transition")
                }
            }, 500);
        }
    }, [menuOpen])



    return (
        <div className="pull-out-menu" ref={pull_out_menu}>
            <div className="c-Pull-Out-Menu-a-buttongroup" >
                <Button
                    id="view-code"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={svg_dictionary.menu_buttons.viewCode}
                    hoverEffect="fill-tooltip"
                    onClick={Menu}
                    tooltip="View Code"
                />

                <Button
                    id="serial-port"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={svg_dictionary.menu_buttons.serialPort}
                    onClick={Menu}
                    hoverEffect="fill-tooltip"
                    tooltip="Serial Monitor"
                />
                <Button
                    id="code-editor"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={svg_dictionary.menu_buttons.codeEditor}
                    onClick={Menu}
                    hoverEffect="fill-tooltip"
                    tooltip="Code Editor"
                />
                <Button
                    id="example-code"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={svg_dictionary.menu_buttons.exampleCode}
                    onClick={Menu}
                    hoverEffect="fill-tooltip"
                    tooltip="Sample Codes"
                />

                <Button
                    id="help-menu"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={svg_dictionary.menu_buttons.helpMenu}
                    onClick={Menu}
                    hoverEffect="fill-tooltip"
                    tooltip="Help"
                />
            </div>
            <div className="pull-out-container" ref={pull_out_container} >
                <div className="container-background">
                    {contents}
                </div>
            </div>
        </div>

    )
}

export default Pull_Out_Menu
