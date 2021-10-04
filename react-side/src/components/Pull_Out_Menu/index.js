import React from 'react'
import PropTypes from 'prop-types'
import "./Pull_Out_Menu.scss"
import Button from '../Button'
import Help_Menu from '../Help_Menu'
import Serial_Menu from '../Serial_Menu'
import View_Code_Menu from '../View_Code_Menu'
import Edit_Code_Menu from '../Edit_Code_Menu'
import Example_Code_Menu from '../Example_Code_Menu'
import { useRef, useState, useEffect } from 'react'

var last_view_code = ""

var menuOpen = "Closed";
function Pull_Out_Menu(props) {
    const [contents, setContents] = useState([<div></div>]);
    const [last_button_clicked, setLastButtonClicked] = useState("");
    const [currentMenu, setCurrentMenu] = useState("")
    const [serialport_monitor, setSerialPortMonitor] = useState("")
    const [serialport_status, setSerialPortStatus] = useState(false)
    const [viewCode, setViewCode] = useState("")
    const { children } = props;
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
        menuOpen = "Open"
        if (last_button_clicked !== event.target.id) {
            setLastButtonClicked(event.target.id);
            menuOpen = "Closed"

            pull_out_menu.current.style.marginLeft = "-410px"
            pull_out_container.current.style.opacity = "1"
        }
        else {
            setLastButtonClicked("None");
            pull_out_menu.current.style.marginLeft = "0px"
            pull_out_container.current.style.opacity = "0"

        }
        if (props.MenuFunction !== undefined) {
            props.MenuFunction(menuOpen)
        }
    }
    useEffect(() => {
        if (last_button_clicked !== "") {
            switch (last_button_clicked) {
                case "serial-port":
                    if (serialport_status === false) {
                        if (serialport_monitor !== props.serialport_monitor) {
                            setTimeout(function () {
                                setSerialPortMonitor(props.serialport_monitor);
                                setContents([<Serial_Menu serialport_monitor={serialport_monitor} />]);
                            }, 150);
                        }
                        { props.onSerialPortClick() }
                        setSerialPortStatus(true)
                    }
                    else {
                        setSerialPortMonitor(props.serialport_monitor);
                        setContents([<Serial_Menu serialport_monitor={serialport_monitor} />]);
                    }
                    setCurrentMenu(last_button_clicked)
                    break;
                case "view-code":
                    setViewCode(props.viewCode);
                    setContents([<View_Code_Menu viewCode={viewCode} />])
                    setCurrentMenu(last_button_clicked)
                    break;
                case "help-menu":
                    if (currentMenu !== last_button_clicked) {
                        setContents([<Help_Menu />]);
                        setCurrentMenu(last_button_clicked)
                    }
                    break;

                case "code-editor":
                    if (currentMenu !== last_button_clicked) {
                        setContents([<Edit_Code_Menu />]);
                        setCurrentMenu(last_button_clicked)
                    }
                    break;

                case "example-code":
                    if (currentMenu !== last_button_clicked) {
                        setContents([
                            <Example_Code_Menu>
                                <div className="code-example">
                                    <div className="code-example-header">Police Flash Light</div>
                                    <div className="example-details">
                                        <div>Difficulty: level 3</div>
                                        <div>Blocks used:</div>
                                        <div>Movement, Light Effects, Loops, Math</div>
                                        This example is like the 'Random Walk' example in Mode 4, but this time the movements aren't so random! That's because the 'random number generator seed' causes the same sequence of random numbers to appear, depending on the range of integers given. Run this program multiple times to see that you will get the same sequence of actions every time.
                                    </div>
                                </div>
                                <div className="code-example">
                                    <div className="code-example-header">Police Flash Light</div>
                                    <div className="example-details">
                                        <div>Difficulty: level 3</div>
                                        <div>Blocks used:</div>
                                        <div>Movement, Light Effects, Loops, Math</div>
                                        This example is like the 'Random Walk' example in Mode 4, but this time the movements aren't so random! That's because the 'random number generator seed' causes the same sequence of random numbers to appear, depending on the range of integers given. Run this program multiple times to see that you will get the same sequence of actions every time.
                                    </div>
                                </div>
                                <div className="code-example">
                                    <div className="code-example-header">Police Flash Light</div>
                                    <div className="example-details">
                                        <div>Difficulty: level 3</div>
                                        <div>Blocks used:</div>
                                        <div>Movement, Light Effects, Loops, Math</div>
                                        This example is like the 'Random Walk' example in Mode 4, but this time the movements aren't so random! That's because the 'random number generator seed' causes the same sequence of random numbers to appear, depending on the range of integers given. Run this program multiple times to see that you will get the same sequence of actions every time.
                                    </div>
                                </div>
                            </Example_Code_Menu>
                        ])
                        setCurrentMenu(last_button_clicked)
                    }
                    break;

            }
            if (last_button_clicked !== "serial-port") {
                closeSerial();
            }

        }

    })

    return (
        <div className="pull-out-menu" ref={pull_out_menu}>
            <div className="c-Pull-Out-Menu-a-buttongroup" >
                <Button
                    id="view-code"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={[
                        <svg xmlns="http://www.w3.org/2000/svg" width="32.18" height="22.266" viewBox="0 0 32.18 22.266">
                            <g id="Group_457" data-name="Group 457" transform="translate(1.414 0.191)">
                                <path id="Path_2" data-name="Path 2" d="M1856.659,371.3,1849,378.955l7.687,7.687" transform="translate(-1849 -367.739)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                                <path id="Path_3" data-name="Path 3" d="M1876.027,371.3l7.659,7.659L1876,386.642" transform="translate(-1854.335 -367.739)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                                <line id="Line_1" data-name="Line 1" x1="4.264" y2="21.884" transform="translate(13.129)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                            </g>
                        </svg>
                    ]}
                    hoverEffect="fill"
                    onClick={Menu}
                />

                <Button
                    id="serial-port"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={[
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="26.548" viewBox="0 0 31 26.548">
                            <g id="Rectangle_150" data-name="Rectangle 150" fill="none" stroke="#fff" stroke-width="2">
                                <rect width="31" height="21" rx="3" stroke="none" />
                                <rect x="1" y="1" width="29" height="19" rx="2" fill="none" />
                            </g>
                            <line id="Line_13" data-name="Line 13" y2="7" transform="translate(12.5 19.524)" fill="none" stroke="#fff" stroke-width="2" />
                            <line id="Line_14" data-name="Line 14" y2="7" transform="translate(18.5 19.524)" fill="none" stroke="#fff" stroke-width="2" />
                            <path id="Path_315" data-name="Path 315" d="M0,0H18" transform="translate(6.5 25.548)" fill="none" stroke="#fff" stroke-width="2" />
                            <path id="Path_316" data-name="Path 316" d="M1599.352,105.366l4.772-5.617,4.724,3.021,5.467-7.346,1.989,5.567,7.9-10.538" transform="translate(-1596.291 -87.011)" fill="none" stroke="#fff" stroke-width="1" />
                        </svg>
                    ]}
                    hoverEffect="fill"
                    onClick={Menu}
                />
                <Button
                    id="code-editor"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={[
                        <svg xmlns="http://www.w3.org/2000/svg" width="31.578" height="26.064" viewBox="0 0 31.578 26.064">
                            <g id="Group_433" data-name="Group 433" transform="translate(-719.931 -415.967)">
                                <path id="Path_294" data-name="Path 294" d="M740.965,431.775l-4.093.819.818-4.093,11.427-11.427,2.489-2.488,3.274,3.274Z" transform="translate(-4.786 2.795)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                <path id="Path_295" data-name="Path 295" d="M3.274,3.274l-.819-.819L0,0" transform="translate(745.162 419.837)" fill="#fff" stroke="#fff" stroke-width="2" />
                                <path id="Path_296" data-name="Path 296" d="M3.274,3.274l-.819-.819L0,0" transform="translate(733.905 429.457)" fill="#fff" stroke="#fff" stroke-width="2" />
                                <line id="Line_8" data-name="Line 8" x2="18.909" transform="translate(719.931 417.62)" fill="none" stroke="#fff" stroke-width="2" />
                                <path id="Path_314" data-name="Path 314" d="M0,0H14.887" transform="translate(719.931 422.122)" fill="none" stroke="#fff" stroke-width="2" />
                                <line id="Line_9" data-name="Line 9" x2="10.805" transform="translate(719.931 426.624)" fill="none" stroke="#fff" stroke-width="2" />
                                <line id="Line_10" data-name="Line 10" x2="9.004" transform="translate(719.931 431.126)" fill="none" stroke="#fff" stroke-width="2" />
                                <line id="Line_11" data-name="Line 11" x2="8.104" transform="translate(719.931 436.529)" fill="none" stroke="#fff" stroke-width="2" />
                                <line id="Line_12" data-name="Line 12" x2="20.709" transform="translate(719.931 441.031)" fill="none" stroke="#fff" stroke-width="2" />
                            </g>
                        </svg>

                    ]}
                    hoverEffect="fill"
                    onClick={Menu}
                />
                <Button
                    id="example-code"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={[
                        <svg xmlns="http://www.w3.org/2000/svg" width="29.172" height="20.077" viewBox="0 0 29.172 20.077">
                            <g id="Group_434" data-name="Group 434" transform="translate(-1596.705 -230.374)">
                                <path id="Path_317" data-name="Path 317" d="M78.751,357.47H60.463l-.98.914H56l-.7-.914H51.58V352H55.3l.7.91h3.482l.98-.91H78.751Z" transform="translate(1546.126 -120.626)" fill="none" stroke="#fff" stroke-width="2" />
                                <path id="Path_319" data-name="Path 319" d="M78.751,357.47H60.463l-.98.914H56l-.7-.914H51.58V352H55.3l.7.91h3.482l.98-.91H78.751Z" transform="translate(1546.126 -108.933)" fill="none" stroke="#fff" stroke-width="2" />
                                <path id="Path_318" data-name="Path 318" d="M69.189,357.47H60.463l-.98.914H56l-.7-.914H51.58V352H55.3l.7.91h3.482l.98-.91h8.726Z" transform="translate(1546.126 -114.779)" fill="none" stroke="#fff" stroke-width="2" />
                            </g>
                        </svg>
                    ]}
                    hoverEffect="fill"
                    onClick={Menu}
                />

                <Button
                    id="help-menu"
                    type="CircularOverlayMenuButton"
                    outColor="#060841"
                    hoverColor="#0000FF"
                    s_ButtonState="Out"
                    children={[
                        <svg xmlns="http://www.w3.org/2000/svg" width="30.253" height="31.164" viewBox="0 0 30.253 31.164">
                            <g id="Group_458" data-name="Group 458" transform="translate(-863 -411)">
                                <path id="Path_300" data-name="Path 300" d="M892.253,426.127a14.12,14.12,0,1,0-7.007,12.2c.281-.164.548-.348.817-.53l4.906,2.452-1.6-5.6a13.865,13.865,0,0,0,2.883-8.53Z" transform="translate(0 0)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                <g id="Group_429" data-name="Group 429" transform="translate(874.091 420.476)">
                                    <path id="Path_301" data-name="Path 301" d="M871.143,422.036a4.036,4.036,0,1,1,4.036,4.036V429.1" transform="translate(-871.143 -418)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <line id="Line_7" data-name="Line 7" y2="2.018" transform="translate(4.036 12.109)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                </g>
                            </g>
                        </svg>
                    ]}
                    hoverEffect="fill"
                    onClick={Menu}
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
