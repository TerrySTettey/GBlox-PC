import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import "./Button.scss"

const Button = (props) => {
    var buttonType;
    var buttonTyper = useRef(null);

    var size = [];

    var [buttonColor, setButtonColor] = useState("#0000dc");
    var [borderColor, setBorderColor] = useState("#0000dc")
    var [hoverState, setHoverState] = useState(false);
    var [svgColor, setSVGColor] = useState("#0000dc");

    useEffect(() => {
        if (props.s_ButtonState === "In") {
            setButtonColor(props.inColor);
            setSVGColor(props.inColor);
        } else if (props.s_ButtonState === "Out") {
            setButtonColor(props.outColor);
            setSVGColor(props.outColor);
        }
    }, [props.s_ButtonState])


    useEffect(() => {

        switch (props.hoverEffect) {
            case "fill":
                if (hoverState) {
                    setButtonColor(props.hoverColor);
                } else if (!hoverState) {
                    if (props.s_ButtonState === "Out") {
                        setButtonColor(props.outColor)
                    } else if (props.s_ButtonState === "In") {
                        setButtonColor(props.inColor)
                    }
                }
                break;
            case "border":
                if (hoverState) {
                    setBorderColor(props.hoverColor);
                    buttonTyper.current.style.margin = "2px"
                    buttonTyper.current.style.borderWidth = "4px"
                } else if (!hoverState) {
                    setBorderColor(props.borderColor)
                    buttonTyper.current.style.margin = "4px";
                    buttonTyper.current.style.borderWidth = "2px"
                }
                break;
            case "svg-fill":
                if (hoverState) {
                    setSVGColor(props.hoverColor)
                } else if (!hoverState) {
                    if (props.s_ButtonState === "Out") {
                        setSVGColor(props.outColor)
                    } else if (props.s_ButtonState === "In") {
                        setSVGColor(props.inColor)
                    }
                }
                break;
            case "":
                if (hoverState) {

                } else if (!hoverState) {

                }
                break;
        }
    }, [hoverState])

    function hoverIn() {
        setHoverState(true)
    }

    function hoverOut() {
        setHoverState(false)
    }

    const emptybutton = <button type="button" id={props.id} className="empty-button" onClick={props.onClick} onMouseEnter={hoverIn} onMouseLeave={hoverOut} />

    switch (props.type) {
        case "SettingsColor":
            buttonType = (
                <div>
                    <div className="modal-lighting-buttons" ref={buttonTyper} style={{
                        backgroundColor: buttonColor,
                        borderColor: borderColor
                    }} />
                    {emptybutton}
                </div>
            )
            break;
        case "SettingsButton":
            buttonType = (
                <div>
                    <div className="modal-lighting-buttons" style={
                        {
                            backgroundColor: buttonColor,
                            width: '330px',
                            height: '43px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: "#FFF0"
                        }
                    }>
                        <p className="button-text"> {props.text}</p>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "SettingsXButton":
            buttonType = (
                <div>
                    <div id="settings-close-button">
                        <h1>X</h1>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "LanguageMenuButton":
            buttonType = (
                <div>
                    <div className="c-Button-a-LanguageMenuButton" style={{
                        backgroundColor: buttonColor
                    }}>
                        <div className="i-FlagBox">{props.children}</div>
                        <p className="i-Text">{props.text}</p>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "LanguageContentButton":
            buttonType = (
                <div>
                    <div className="c-Button-a-LanguageContentButton" style={{
                        backgroundColor: buttonColor
                    }}>
                        <div className="i-FlagBox">{props.children}</div>
                        <p className="i-Text">{props.text}</p>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "SettingsHeaderButton":
            buttonType = (
                <div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="40" viewBox="0 0 130 40">
                            <g id="Group_533" data-name="Group 533" transform="translate(-226.5)">
                                <path id="Path_33" data-name="Path 33" d="M306.954,42H411.045c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-67.5 -42)" fill={buttonColor} />
                                <g id="Group_31" data-name="Group 31" transform="translate(243.901 8.595)">
                                    <text id="Settings" transform="translate(31.826 18)" fill="#fff" font-size="17" font-family="Baloo2-Regular, 'Baloo \32 '"><tspan x="0" y="0">Settings</tspan></text>
                                    <path id="Path_302" data-name="Path 302" d="M928,500.214v-4.427h-2.214a8.033,8.033,0,0,0-.716-1.724l1.567-1.567-3.131-3.131-1.567,1.567a8.015,8.015,0,0,0-1.724-.716V488h-4.427v2.214a8.014,8.014,0,0,0-1.724.716l-1.567-1.567-3.131,3.131,1.567,1.567a8.009,8.009,0,0,0-.716,1.724H908v4.427h2.215a8,8,0,0,0,.716,1.724l-1.567,1.567,3.131,3.131,1.567-1.567a8.005,8.005,0,0,0,1.724.716V508h4.427v-2.214a8.006,8.006,0,0,0,1.724-.716l1.567,1.567,3.131-3.131-1.567-1.567a8.029,8.029,0,0,0,.716-1.724ZM920.5,498a2.5,2.5,0,0,1-3.979,2.015,2.524,2.524,0,0,1-.536-.536,2.5,2.5,0,0,1,0-2.959,2.523,2.523,0,0,1,.536-.536,2.5,2.5,0,0,1,2.959,0,2.52,2.52,0,0,1,.536.536A2.495,2.495,0,0,1,920.5,498Z" transform="translate(-908.837 -486)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "WorkspaceTabButton":
            buttonType = (
                <div id={props.id} className="empty-button" onClick={props.onClick} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                    <div className="c-button-a-WorkspaceTabButton" style={{
                        backgroundColor: buttonColor
                    }}>
                        <p className="workspace-button-text"> {props.text}</p>
                        <div className="workspace-close-button" onClick={props.closeOnClick}>
                            X
                        </div>
                    </div>
                </div>
                
            )
            break;
        case "CircularOverlayMenuButton":
            buttonType = (
                <div>
                    <div className="c-button-a-CircularOverlayMenuButton" style={{
                        backgroundColor: buttonColor
                    }}>
                        <div className="button-svg">{props.children}</div>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "WorkspaceControlButton":
            buttonType = (
                <div>
                    <div className="c-button-a-WorkspaceControlButton" ref={buttonTyper} style={{
                        fill: `${svgColor}`
                    }}>
                        <div className="button-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="61.1" height="61.455" viewBox="0 0 61.1 61.455">
                                <defs>
                                    <filter id="Path_388" x="0" y="0" width="61.1" height="61.455" filterUnits="userSpaceOnUse">
                                        <feOffset input="SourceAlpha" />
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feFlood flood-color="#0000dc" />
                                        <feComposite operator="in" in2="blur" />
                                        <feComposite in="SourceGraphic" />
                                    </filter>
                                </defs>
                                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_388)">
                                    <path id="Path_388-2" data-name="Path 388" d="M-1108.511-437.532a17.964,17.964,0,0,0,14.112-9.719l3.564,1.822a21.96,21.96,0,0,1-17.249,11.879Zm1.058,1.434a1.093,1.093,0,0,0,1.093,1.093,1.093,1.093,0,0,0,1.094-1.093,1.094,1.094,0,0,0-1.094-1.094A1.093,1.093,0,0,0-1107.453-436.1Zm12.863-8.84a1.094,1.094,0,0,0,1.094,1.093h0a1.094,1.094,0,0,0,1.089-1.093,1.093,1.093,0,0,0-1.094-1.093A1.093,1.093,0,0,0-1094.59-444.938Zm-35.651-3.613-.562.2a21.58,21.58,0,0,1,10.7-26.369l.265.526a20.623,20.623,0,0,1,4.128-1.551l-.146-.57a21.645,21.645,0,0,1,5.405-.685h0a21.555,21.555,0,0,1,18.148,9.938,21.556,21.556,0,0,1,1.42,20.643l-2.18-1.008a19.138,19.138,0,0,0-4.763-22.4l-.912,1.036a17.741,17.741,0,0,0-4.253-2.775l.581-1.254a18.963,18.963,0,0,0-4.461-1.437l-.259,1.361a17.987,17.987,0,0,0-3.322-.311,17.616,17.616,0,0,0-12.686,5.335l-1-.978a19.047,19.047,0,0,0-5.46,13.4h1.392a17.964,17.964,0,0,0,.36,3.578A17.756,17.756,0,0,0-1110.45-437.7v3.2A20.953,20.953,0,0,1-1130.241-448.552Z" transform="translate(1141 486.01)" />
                                </g>
                            </svg>
                        </div>
                        <div className="button-children-svg"> {props.children} </div>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "WorkspaceControlButton_Previous":
            buttonType = (
                <div>

                    <div className="c-button-WorkspaceControlButton_Previous-After" ref={buttonTyper} style={{
                        fill: `${svgColor}`
                    }}>
                        <div className="button-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="66.398" height="60.152" viewBox="0 0 66.398 60.152">
                                <defs>
                                    <filter id="Path_145" x="0" y="0" width="66.398" height="60.152" filterUnits="userSpaceOnUse">
                                        <feOffset input="SourceAlpha" />
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feFlood flood-color="#0000dc" />
                                        <feComposite operator="in" in2="blur" />
                                        <feComposite in="SourceGraphic" />
                                    </filter>
                                </defs>
                                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_145)">
                                    <path id="Path_145-2" data-name="Path 145" d="M582.747,939.01l-.257.52A20.542,20.542,0,0,0,578.4,938l.142-.57a21.392,21.392,0,0,0-25.62,13.911q-.227.666-.406,1.348l-.453-1.021-2.662-6.018,1.067-2.754-4.312,1.15,4.97,11.221,1.039,2.346,1.836-.835,10.192-4.6,1.187-3.061-8.217,3.747-1.972-.76c.047-.141.081-.29.131-.43a19.136,19.136,0,0,1,5.342-7.806l.905,1.026a17.3,17.3,0,0,1,4.217-2.75L565.2,940.9a18.671,18.671,0,0,1,4.423-1.425l.256,1.354A17.574,17.574,0,0,1,585.76,945.8l.99-.968a18.875,18.875,0,0,1,5.413,13.283h-1.382a17.6,17.6,0,0,1-17.6,17.608V978.9A20.8,20.8,0,0,0,592.8,964.965l.556.193a21.384,21.384,0,0,0-10.613-26.148Z" transform="translate(-537.15 -927.75)" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "WorkspaceControlButton_After":
            buttonType = (
                <div>
                    <div className="c-button-WorkspaceControlButton_Previous-After" ref={buttonTyper} style={{
                        fill: `${svgColor}`
                    }}>
                        <div className="button-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="66.398" height="60.152" viewBox="0 0 66.398 60.152">
                                <defs>
                                    <filter id="Path_146" x="0" y="0" width="66.398" height="60.152" filterUnits="userSpaceOnUse">
                                        <feOffset input="SourceAlpha" />
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feFlood flood-color="#0000dc" />
                                        <feComposite operator="in" in2="blur" />
                                        <feComposite in="SourceGraphic" />
                                    </filter>
                                </defs>
                                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_146)">
                                    <path id="Path_146-2" data-name="Path 146" d="M557.953,939.01l.257.52A20.542,20.542,0,0,1,562.3,938l-.142-.57a21.392,21.392,0,0,1,25.62,13.911q.227.666.406,1.348l.453-1.021,2.662-6.018-1.067-2.754,4.312,1.15-4.97,11.221-1.039,2.346-1.836-.835-10.192-4.6-1.187-3.061,8.217,3.747,1.972-.76c-.047-.141-.081-.29-.131-.43a19.136,19.136,0,0,0-5.342-7.806l-.905,1.026a17.3,17.3,0,0,0-4.217-2.75l.577-1.246a18.671,18.671,0,0,0-4.423-1.425l-.256,1.354A17.574,17.574,0,0,0,554.94,945.8l-.99-.968a18.875,18.875,0,0,0-5.413,13.283h1.382a17.6,17.6,0,0,0,17.6,17.608V978.9A20.8,20.8,0,0,1,547.9,964.965l-.556.193a21.384,21.384,0,0,1,10.613-26.148Z" transform="translate(-537.15 -927.75)" />
                                </g>
                            </svg>

                        </div>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "UploadButton":
            buttonType = (
                <div>
                    <div className="c-button-a-UploadButton" style={{
                        fill: `${svgColor}`
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="252.517" height="38.69" viewBox="0 0 252.517 38.69">
                            <path id="Path_376" data-name="Path 376" d="M486.373,906.208H286.982v16.284l-12.6,12.6V943.9H525.172Z" transform="translate(-273.887 -905.708)" stroke="#0000dc" stroke-width="1" />
                        </svg>
                        <p className="button-text">{props.text}</p>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "ToolboxCategoryButton":
            buttonType = (
                <div className="c-button-a-ToolboxCategoryButton" ref={buttonTyper} style={{
                    backgroundColor: buttonColor,
                    borderColor: borderColor
                }}>
                    <div className="c-button-a-ToolboxCategoryContents" >
                        <div className="button-svg">
                            {props.children}
                        </div>
                        <div className="button-text">
                            {props.text}
                        </div>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "ToolboxLevelButton":
            buttonType = (
                <div>
                    <div className="c-button-a-ToolboxLevel" ref={buttonTyper} style={{
                        backgroundColor: buttonColor,
                        borderColor: borderColor
                    }}>
                        <p className="button-text">
                            {props.text}
                        </p>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "FilterButton":
            buttonType = (
                <div>
                    <div>
                        <svg id="Component_3_20" data-name="Component 3 – 20" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                            <path id="Path_33" data-name="Path 33" d="M306.954,42h94.091c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill={buttonColor} />
                            <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                                <text id="Filter" transform="translate(17.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Filter</tspan></text>
                                <path id="Union_5" data-name="Union 5" d="M-2569.748-80.167l-6.242-11.041h16l-6.242,11.041v5.035l-3.515,1.424Z" transform="translate(2566 93.258)" fill="none" stroke="#fff" stroke-width="2" />
                            </g>
                        </svg>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "DeviceAddButton":
            buttonType = (
                <div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                            <g id="Add_Button" data-name="Add Button" transform="translate(-166 -240)">
                                <circle id="Ellipse_4" data-name="Ellipse 4" cx="12.5" cy="12.5" r="12.5" transform="translate(166 240)" fill="#4c97ff" />
                                <rect id="Rectangle_137" data-name="Rectangle 137" width="11.263" height="1.449" transform="translate(172.869 251.795)" fill="#e9e9ff" />
                                <rect id="Rectangle_138" data-name="Rectangle 138" width="1.449" height="11.263" transform="translate(177.775 246.885)" fill="#e9e9ff" />
                            </g>
                        </svg>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case "ExampleButton":
            buttonType = (
                <div>
                    <div className="c-button-a-ExampleButton" ref={buttonTyper} style={{
                        backgroundColor: buttonColor,
                        borderColor: borderColor
                    }}>
                        <p className="button-text"> {props.text}</p>
                    </div>
                    {emptybutton}
                </div>
            )
            break;
        case " ":
            buttonType = (
                <div>
                    {emptybutton}
                </div >
            )
            break;

    }



    return (
        <div id="button-container">
            {buttonType}
        </div>
    )
}

Button.defaultProps = {
    type: "LanguageMenuButton",
    inColor: "#0000bc",
    outColor: "#FAC",
    hoverColor: "#0000bc",
    s_ButtonState: "Out",
    borderColor: "#3722FF",
    text: "Insert Text Here",
    hoverEffect: "fill"
}

Button.propTypes = {
    type: PropTypes.string,
    inColor: PropTypes.string,
    outColor: PropTypes.string,
    hoverColor: PropTypes.string,
    s_ButtonState: PropTypes.string,
}

export default Button
