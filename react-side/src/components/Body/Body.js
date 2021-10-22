import React, { useState, useEffect, useRef, useContext } from 'react'
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager';
import { ThemeContext } from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

import "./Body.scss";
import svg_dictionary from '../svg_dictionary';
import ProgressBar from '../ProgressBar';
import Slide_Out_Menu from '../Slide_Out_Menu'
import Upload_Circle from '../Upload_Circle'
import Toolbox from '../Toolbox/Toolbox';
import Button from '../Button';
import Header from '../Header/Header'
import ToolSelector from '../ToolSelector/ToolSelector';
import Pull_Out_Menu from '../Pull_Out_Menu'
import CustomDrop from '../CustomDrop';
import WorkTabHolder from '../WorkTabHolder';
import SplashScreen from '../SplashScreen'
import NewDeviceManager from '../NewDeviceManager';
import Code_Editor from '../Code_Editor'
import VariableSelector from '../VariableSelector'

const Toolbox_colors = {
    Logic: "#4C97FF",
    Loop: "#DD0A18",
    Math: "#8D00E8",
    Text: "#16CE9C",
    Actuators: "#FE8013",
    Sensors: "#40BF4A",
    COM: "#D51CD5",
    Light: "#EFCA0F",
    Sound: "#FA857B",
    Default: "#DD0A18"
}

const Body = (props) => {
    var [PullOutState, setPullOutState] = useState("Closed")
    var TrashHolder = useRef(null);
    var FlyOutHolder = useRef(null)
    const [device_svg, setDeviceSVG] = useState(svg_dictionary.devices.Arduino_Uno_SVG)
    const [progress_value, setProgressValue] = useState(0)
    const {
        selectedDevice,
        upload_status
    } = useContext(Ctxt_SingletonManager)

    const [serialport_monitor, setSerialPortMonitor] = useState("")

    function genbuttons(toolbox_items) {
        var buttons = [];
        var children = [];
        var category = "";
        var category_svg = [];
        var category_color = "";
        var children_count = 0;
        for (var i = 0; i < toolbox_items.length; i++) {
            var svg = []
            var color = "";
            switch (toolbox_items[i][0]) {
                case "Loops":
                    svg = svg_dictionary.toolbox.Loop
                    color = Toolbox_colors.Loop;
                    break;
                case "Logic":
                    svg = svg_dictionary.toolbox.Logic;
                    color = Toolbox_colors.Logic;
                    break;
                case "Math":
                    svg = svg_dictionary.toolbox.Math;
                    color = Toolbox_colors.Math;
                    break;
                case "Text":
                    svg = svg_dictionary.toolbox.Text;
                    color = Toolbox_colors.Text;
                    break;
                case "Actuators":
                    svg = svg_dictionary.toolbox.Actuators;
                    color = Toolbox_colors.Actuators;
                    break;
                case "Sensors":
                    svg = svg_dictionary.toolbox.Sensors;
                    color = Toolbox_colors.Sensors;
                    break;
                case "COM":
                    svg = svg_dictionary.toolbox.COM;
                    color = Toolbox_colors.COM;
                    break;
                case "LEDs":
                    svg = svg_dictionary.toolbox.LEDs;
                    color = Toolbox_colors.Light;
                    break;
                case "Sound":
                    svg = svg_dictionary.toolbox.Sound;
                    color = Toolbox_colors.Sound;
                    break;
                default:
                    color = Toolbox_colors.Default;
                    break;
            }
            if (toolbox_items[i][2] == "category") {
                children_count = toolbox_items[i][3];
                category = toolbox_items[i][0]
                category_svg = svg;
                category_color = color;
            }
            else {
                children_count -= 1;
                if (children_count < 0) {
                    children_count = 0;
                    //Level 0 Buttons
                    buttons.push(
                        <Button
                            id={toolbox_items[i][1]}
                            type="ToolboxCategoryButton"
                            outColor={color}
                            hoverColor="#0000dc"
                            s_ButtonState="Out"
                            children={[svg]}
                            text={toolbox_items[i][0]}
                            toolbox_type={toolbox_items[i][2]}
                            child_count={children_count}
                            hoverEffect="fill"
                            onClick={props.ToolboxFunction}
                        />
                    )
                }
                else {
                    children.push(
                        <Button
                            id={toolbox_items[i][1]}
                            type="ToolboxCategoryButton"
                            outColor={category_color}
                            hoverColor="#0000dc"
                            s_ButtonState="Out"
                            children={[svg]}
                            text={toolbox_items[i][0]}
                            toolbox_type={toolbox_items[i][2]}
                            child_count={children_count}
                            hoverEffect="fill"
                            onClick={props.ToolboxFunction}
                        />
                    )
                    if (children_count === 0) {
                        buttons.push(
                            <CustomDrop
                                buttonType="ToolboxCategoryButton"
                                text={category}
                                childrenlist={children}
                                outColor={category_color}
                                dropType="toolbox_list"
                                svg={[category_svg]}
                                modal=""
                            />
                        )
                        children = []
                        category = ""
                        category_svg = [];
                    }
                }

            }
        }
        return buttons;
    }

    function updateProgress(value) {
        var cur = progress_value;
        var interv = setInterval(() => {
            console.log(progress_value)
            if (cur < value) {
                setProgressValue((p) => p + 1);
                cur++;
            }
            else {
                clearInterval(interv)
            }
        }, 50)
    }
    var TrashContainerChanged = false;
    var FlyoutContainerChanged = false;

    useEffect(() => {

        if (TrashContainerChanged === false) {
            var Trash = document.getElementsByClassName("blocklyTrash")[0];
            if (Trash !== undefined) {
                // console.log(Trash.tagName)
                TrashHolder.current.appendChild(Trash);
                TrashContainerChanged = true;
            }
        }
        if (serialport_monitor !== props.serialPortMonitor) {
            setSerialPortMonitor(props.serialport_monitor);
        }
    })
    useEffect(() => {
        switch (selectedDevice.device_name) {
            case "Mello":
                setDeviceSVG(svg_dictionary.devices.mello_temp);
                document.getElementById("Add_device").style.display = "none"
                break;
            case "Arduino Uno":
                setDeviceSVG(svg_dictionary.devices.Arduino_Uno_SVG);
                document.getElementById("Add_device").style.display = "none"
                break;
            default:
                document.getElementById("Add_device").style.display = "block"
                break;
        }
    }, [selectedDevice])
    useEffect(() => {
        if (upload_status === "No Arduino Detected" || upload_status.includes("Upload Failed") === true || upload_status === "") {
            setProgressValue(0);
        }
        else {
            switch (upload_status) {
                case "Verifying Code":
                    updateProgress(50);
                    break;
                case "Uploading Code":
                    updateProgress(70);
                    break;
                case "Upload Successful":
                    updateProgress(100);
                    break;
            }
        }
    }, [upload_status])
    // useEffect(()=>{
    //     updateProgress()
    // })

    return (
        <div className="body-container">
            <div className="c-Body-a-WorkspaceContainer">
                <svg>
                    <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M1,0.46 l0,-0.426 L0.982,0.001 l-0.472,0.001,-0.149,0,-0.331,0 L0,0.051 v0.089 l0.015,0.026 V0.928 L0.035,0.96 l0.261,0,0.024,0.04 H0.976 l0.024,-0.041 V0.937 l0,-0.001,-0.001,-0.363 h-0.033 V0.516"></path></clipPath>
                </svg>
                <div id="blocklyDiv">
                </div>
            </div>

            <div className="tester">
                <svg id="num4" xmlns="http://www.w3.org/2000/svg" width="770" height="288" viewBox="0 0 770 288">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_218" data-name="Rectangle 218" width="770" height="288" transform="translate(2354 -3220)" fill="rgba(25,255,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-41" y="-287" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_5" data-name="Mask Group 5" transform="translate(-2354 3220)" clip-path="url(#clip-path)">
                        <g id="Group_550" data-name="Group 550">
                            <g transform="matrix(1, 0, 0, 1, 2354, -3220)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(469.5 -2381.5)" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className="c-Body-a-Overlay">
                <svg id="num1" xmlns="http://www.w3.org/2000/svg" width="773" height="246" viewBox="0 0 772 245">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_225" data-name="Rectangle 225" width="772" height="245" transform="translate(2984 -4289)" fill="rgba(255,0,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_4" data-name="Mask Group 4" transform="translate(-2984 4289)" clip-path="url(#clip-path)">
                        <g id="Group_541" data-name="Group 541">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num4" xmlns="http://www.w3.org/2000/svg" width="773" height="283" viewBox="0 0 772 283">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_226" data-name="Rectangle 226" width="772" height="283" transform="translate(2984 -4044)" fill="rgba(255,204,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_5" data-name="Mask Group 5" transform="translate(-2984 4044)" clip-path="url(#clip-path)">
                        <g id="Group_540" data-name="Group 540">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num7" xmlns="http://www.w3.org/2000/svg" width="773" height="113" viewBox="0 0 772 113">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_226" data-name="Rectangle 226" width="772" height="283" transform="translate(2984 -4044)" fill="rgba(255,204,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_5" data-name="Mask Group 5" transform="translate(-2984 4044)" clip-path="url(#clip-path)">
                        <g id="Group_540" data-name="Group 540">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                {/*<svg id="num7" xmlns="http://www.w3.org/2000/svg" width="773" height="113" viewBox="0 0 772 113">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_227" data-name="Rectangle 227" width="772" height="113" transform="translate(2984 -3761)" fill="rgba(214,255,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_6" data-name="Mask Group 6" transform="translate(-2984 3761)" clip-path="url(#clip-path)">
                        <g id="Group_539" data-name="Group 539">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
    </svg>*/}
                <svg id="num10" xmlns="http://www.w3.org/2000/svg" width="773" height="345" viewBox="0 0 772 345">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_228" data-name="Rectangle 228" width="772" height="345" transform="translate(2984 -3648)" fill="rgba(0,255,85,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_7" data-name="Mask Group 7" transform="translate(-2984 3648)" clip-path="url(#clip-path)">
                        <g id="Group_538" data-name="Group 538">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num13" xmlns="http://www.w3.org/2000/svg" width="773" height="97" viewBox="0 0 772 94">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_229" data-name="Rectangle 229" width="772" height="94" transform="translate(2984 -3303)" fill="rgba(247,0,255,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_8" data-name="Mask Group 8" transform="translate(-2984 3303)" clip-path="url(#clip-path)">
                        <g id="Group_537" data-name="Group 537">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="workspace-controls">
                    <Button
                        id="zoom-in"
                        type="WorkspaceControlButton"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        children={svg_dictionary.workspace_controls.zoom_in}
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="zoom-out"
                        type="WorkspaceControlButton"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        children={svg_dictionary.workspace_controls.zoom_out}
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="zoom-to-fit"
                        type="WorkspaceControlButton"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        children={svg_dictionary.workspace_controls.zoom_fit}
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="workspace-previous"
                        type="WorkspaceControlButton_Previous"
                        inColor="#E9E9FF"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        s_ButtonState="Out"
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="workspace-after"
                        type="WorkspaceControlButton_After"
                        inColor="#060841"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        s_ButtonState="Out"
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                </div>

                {/*<svg id="num2" xmlns="http://www.w3.org/2000/svg" width="1076" height="246" viewBox="0 0 1076 245">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_225" data-name="Rectangle 225" width="1076" height="245" transform="translate(3756 -4289)" fill="rgba(255,0,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_9" data-name="Mask Group 9" transform="translate(-3756 4289)" clip-path="url(#clip-path)">
                        <g id="Group_546" data-name="Group 546">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>*/}
                <svg id="num2" xmlns="http://www.w3.org/2000/svg" width="1079" height="85" viewBox="0 0 1079 85" preserveAspectRatio="none">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_237" data-name="Rectangle 237" width="1079" height="85" transform="translate(1369 -6784)" fill="rgba(227,5,5,0.32)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_14" data-name="Mask Group 14" transform="translate(-1369 6784)" clip-path="url(#clip-path)">
                        <path id="Subtraction_9" data-name="Subtraction 9" d="M1920,1080H0V0H1920V1080ZM733.691,1017.475l39.577,39.476H1863.181l39.937-39.835V994.6l.6-.681-.98-354.408h-54.274V583.6l55.284-55.022-1.011-393.231-54.274-53.776H292.008l-48.914,47.88v87.4l25.155,25.091V985.854l31.837,31.756Z" transform="translate(599 -6784)" stroke="#0000dc" stroke-width="1" />
                    </g>
                </svg>
                <svg id="num14" xmlns="http://www.w3.org/2000/svg" width="1076" height="97" viewBox="0 0 1076 94" preserveAspectRatio="none">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_229" data-name="Rectangle 229" width="1076" height="94" transform="translate(3756 -3303)" fill="rgba(247,0,255,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_10" data-name="Mask Group 10" transform="translate(-3756 3303)" clip-path="url(#clip-path)">
                        <g id="Group_545" data-name="Group 545">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg id="num3" xmlns="http://www.w3.org/2000/svg" width="76" height="251" viewBox="0 0 72 245">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_225" data-name="Rectangle 225" width="72" height="245" transform="translate(4832 -4289)" fill="rgba(255,0,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_11" data-name="Mask Group 11" transform="translate(-4832 4289)" clip-path="url(#clip-path)">
                        <g id="Group_544" data-name="Group 544">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num6" xmlns="http://www.w3.org/2000/svg" width="76" height="283" viewBox="0 0 72 283">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_226" data-name="Rectangle 226" width="72" height="283" transform="translate(4832 -4044)" fill="rgba(255,204,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_12" data-name="Mask Group 12" transform="translate(-4832 4044)" clip-path="url(#clip-path)">
                        <g id="Group_543" data-name="Group 543">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg id="num9" xmlns="http://www.w3.org/2000/svg" width="76" height="113" viewBox="0 0 72 113">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_226" data-name="Rectangle 226" width="72" height="283" transform="translate(4832 -4044)" fill="rgba(255,204,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_12" data-name="Mask Group 12" transform="translate(-4832 4044)" clip-path="url(#clip-path)">
                        <g id="Group_543" data-name="Group 543">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                {/*<svg id="num9" xmlns="http://www.w3.org/2000/svg" width="76" height="113" viewBox="0 0 72 113">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_227" data-name="Rectangle 227" width="72" height="113" transform="translate(4832 -3761)" fill="rgba(214,255,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_13" data-name="Mask Group 13" transform="translate(-4832 3761)" clip-path="url(#clip-path)">
                        <g id="Group_542" data-name="Group 542">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
            </svg>
                <svg id="num9svg" xmlns="http://www.w3.org/2000/svg" width="28.25" height="19.392" viewBox="0 0 28.25 19.392">
                    <g id="Group_383" data-name="Group 383" transform="translate(1.414 0.219)">
                        <path id="Path_2" data-name="Path 2" d="M1855.634,371.3,1849,377.929l6.657,6.657" transform="translate(-1849 -368.216)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                        <path id="Path_3" data-name="Path 3" d="M1876.024,371.3l6.634,6.634L1876,384.586" transform="translate(-1857.236 -368.216)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                        <line id="Line_1" data-name="Line 1" x1="4.264" y2="18.953" transform="translate(11.072)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                    </g>
                </svg>*/}

                <svg id="num12" xmlns="http://www.w3.org/2000/svg" width="76" height="345" viewBox="0 0 72 345">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_228" data-name="Rectangle 228" width="72" height="345" transform="translate(4832 -3648)" fill="rgba(0,255,85,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_14" data-name="Mask Group 14" transform="translate(-4832 3648)" clip-path="url(#clip-path)">
                        <g id="Group_548" data-name="Group 548">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num15" xmlns="http://www.w3.org/2000/svg" width="77" height="97" viewBox="0 0 72 94">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_229" data-name="Rectangle 229" width="72" height="94" transform="translate(4832 -3303)" fill="rgba(247,0,255,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_15" data-name="Mask Group 15" transform="translate(-4832 3303)" clip-path="url(#clip-path)">
                        <g id="Group_547" data-name="Group 547">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <div id="TrashTotal">
                    <div id="num15HoverHolder">
                        <svg id="lid" xmlns="http://www.w3.org/2000/svg" width="62.049" height="26.565" viewBox="0 0 62.049 26.565">
                            <defs>
                                <filter id="Path_81" x="0" y="0" width="62.049" height="26.565" filterUnits="userSpaceOnUse">
                                    <feOffset input="SourceAlpha" />
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feFlood flood-color="#2000ff" />
                                    <feComposite operator="in" in2="blur" />
                                    <feComposite in="SourceGraphic" />
                                </filter>
                            </defs>
                            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_81)">
                                <path id="Path_81-2" data-name="Path 81" d="M1849.7,938.283h-10.84v-1.969l-1.052-1.052h-8.6L1827.943,934H1821.9v4.283h-10.4l-3.059,2.141v2.141h44.049v-2.141Z" transform="translate(-1799.44 -925)" fill="#e9e9ff" />
                            </g>
                        </svg>

                        <svg id="bin" xmlns="http://www.w3.org/2000/svg" width="62.944" height="62.37" viewBox="0 0 62.944 62.37">
                            <defs>
                                <filter id="Path_82" x="0" y="0" width="62.944" height="62.37" filterUnits="userSpaceOnUse">
                                    <feOffset input="SourceAlpha" />
                                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                                    <feFlood flood-color="#3a00ff" flood-opacity="0.659" />
                                    <feComposite operator="in" in2="blur" />
                                    <feComposite in="SourceGraphic" />
                                </filter>
                            </defs>
                            <g id="Group_547" data-name="Group 547" transform="translate(9.218 0.652)">
                                <g transform="matrix(1, 0, 0, 1, -9.22, -0.65)" filter="url(#Path_82)">
                                    <path id="Path_82-2" data-name="Path 82" d="M1812.688,946.74V957.9l2.371,2.371V977.33l4.78,4.78h25.428V967.541l3.365-3.364V946.74Zm10.129,32.425-2.175-1.919V951.023h2.175Zm5.8-1.919-2.175,1.919V951.023h2.175Zm5.8,1.919-2.175-1.919V951.023h2.175Zm5.8-1.919-2.175,1.919V951.023h2.175Z" transform="translate(-1799.19 -933.24)" fill="#e9e9ff" />
                                </g>
                            </g>
                        </svg>

                    </div>
                    <svg id="num15trash" ref={TrashHolder}>
                        {/*
                    <svg xmlns="http://www.w3.org/2000/svg" class="blocklySvg" style="background-color: rgb(6, 8, 65);" width="1661px" height="920px" tabindex="0" version="1.1">
                        <defs>
                            <pattern id="blocklyGridPattern12675100857393296" patternUnits="userSpaceOnUse" x="149" y="0" width="100" height="100">
                                <line stroke-width="1" x1="0" y1="0.5" x2="1" y2="0.5" />
                            </pattern></defs><g class="blocklyWorkspace">
                            <rect class="blocklyMainBackground" style="fill: url(#blocklyGridPattern12675100857393296); stroke: rgba(0, 0, 0, 0);" width="100%" height="100%" />
                            <g class="blocklyTrash" style="opacity: 0.4;" transform="translate(1579 825)"><clipPath id="blocklyTrashBodyClipPath35066959827688216">
                                <rect y="16" width="47" height="44" />
                            </clipPath>
                                <image clip-path="url(&quot;#blocklyTrashBodyClipPath35066959827688216&quot;)" x="0" y="-32" width="96" height="124" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://blockly-demo.appspot.com/static/media/sprites.png" />
                                <clipPath id="blocklyTrashLidClipPath35066959827688216">
                                    <rect width="47" height="16" />
                                </clipPath>
                                <image clip-path="url(&quot;#blocklyTrashLidClipPath35066959827688216&quot;)" transform="rotate(0)" x="0" y="-32" width="96" height="124" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://blockly-demo.appspot.com/static/media/sprites.png" />
                            </g>
                            <g class="blocklyBlockCanvas" transform="translate(149) scale(1)">
                                <g class="blocklyCursor">
                                    <g height="5" width="80">
                                        <rect style="display: none;" width="80" height="5">
                                            <animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="fill" attributeType="XML" />
                                        </rect>
                                        <rect class="blocklyVerticalMarker" style="display: none;" rx="10" ry="10" />
                                        <path style="display: none;" transform="">
                                            <animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="fill" attributeType="XML" /></path><path style="display: none;" fill="none" stroke-width="4" transform=""><animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="stroke" attributeType="XML" /></path><circle style="display: none;" stroke-width="4" r="5"><animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="fill" attributeType="XML" /></circle></g></g><g transform="translate(430 150)" data-id=")1~1ZMhC(_Q7wEByBRg]"><path class="blocklyPath" fill="#5c26ff" stroke="#451dbf" d="m 0 22 h 0 c 25 -22 71 -22 96 0 h 60 a 4 4 0 0 1 4 4 v 26 V 30 V 71 V 79 V 113 V 117 a 4 4 0 0 1 -4 4 H 64 c -2 0 -3 1 -4 2 l -4 4 c -1 1 -2 2 -4 2 h -12 c -2 0 -3 -1 -4 -2 l -4 -4 c -1 -1 -2 -2 -4 -2 h -8 a 4 4 0 0 0 -4 4 v 16 a 4 4 0 0 0 4 4 h 8 c 2 0 3 1 4 2 l 4 4 c 1 1 2 2 4 2 h 12 c 2 0 3 -1 4 -2 l 4 -4 c 1 -1 2 -2 4 -2 H 156 a 4 4 0 0 1 4 4 V 153 V 173 a 4 4 0 0 1 -4 4 h -152 a 4 4 0 0 1 -4 -4 Z" /><g transform="translate(8 30)"><image width="40px" height="40px" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://www.clipartmax.com/png/full/219-2194283_open-green-flag-sprite.png" alt="[object Object]" /></g><g transform="translate(56 40)"><text class="blocklyText" dominant-baseline="central" x="0" y="10.5" /></g></g></g></g></svg>
                */}
                    </svg>
                </div>

            </div>
            <div className="c-Body-a-OverlayExtras" />
            <Header />
            <WorkTabHolder />

            <div className="c-Body-a-OverlayItems">
                <div className="i-emptyDiv1" />
                <div className="c-Body-a-UploadCircle">
                    <Upload_Circle onClick={props.deviceOnClick}>
                        {device_svg}
                    </Upload_Circle>
                </div>
                <div className="i-emptyDiv2" />
                <div className="c-Body-a-ToolSelector">
                    <ToolSelector />
                </div>
                <div className="c-Body-a-ToolBox">
                    <Toolbox>
                        {genbuttons(props.toolboxButtons)}
                    </Toolbox>

                </div>
                <div className="i-emptyDiv3" />
                <div className="c-Body-a-UploadProg">
                    <div className="c-Body-a-UploadButton">
                        <Button type="UploadButton" text="Upload" outColor="#0000dc" hoverColor="#0000AA" hoverEffect="svg-fill" onClick={props.uploadFunction} />
                    </div>
                    <div className="c-Body-a-ProgressBar">
                        <ProgressBar progress={progress_value} />
                    </div>
                </div>
                <div className="i-emptyDiv4" />
            </div>
            {/*<div className="c-Body-a-FlyoutHolder" ref={FlyOutHolder}/>*/}
            <div className="c-Body-a-PulloutMenu">
                <Pull_Out_Menu toolboxButtons={props.toolboxButtons} onSerialPortClick={props.onSerialPortClick} serialport_monitor={serialport_monitor} example_codes={props.example_codes} />
            </div>
            <div id="c-device-manager">
                <div id="closeDeviceBackground" onClick={(e) => {
                    document.getElementById("c-device-manager").style.display = 'none'
                    e.stopPropagation();
                }}>
                </div>
                <NewDeviceManager deviceOnClick={props.deviceOnClick} />
            </div>
            <div id="c-codeEditor">
                <Code_Editor />
            </div>
            <div id="c-Body-a-SplashScreen">
                <SplashScreen
                    onSplashClick={props.onSplashClick}
                    Splashurl={props.Splashurl} />
            </div>
            <div id="c-variableSelector">
                <VariableSelector />
            </div>
        </div >
    )

}

export default Body