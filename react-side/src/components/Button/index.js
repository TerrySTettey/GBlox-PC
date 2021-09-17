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

    useEffect(() => {
        if (props.s_ButtonState === "In") {
            setButtonColor(props.inColor);
        } else if (props.s_ButtonState === "Out") {
            setButtonColor(props.outColor);
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
            case "":
                if (hoverState) {

                } else if (!hoverState) {

                }
                break;
        }
    }, [hoverState])

    switch (props.type) {
        case "SettingsColor":
            buttonType = (
                <div className="modal-lighting-buttons" ref={buttonTyper} style={{
                    backgroundColor: buttonColor,
                    borderColor: borderColor
                }} />
            )
            break;
        case "SettingsButton":
            buttonType = (
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
            )
            break;
        case "SettingsXButton":
            buttonType = (
                <div id="settings-close-button">
                    <h1>X</h1>
                </div>
            )
            break;
        case "LanguageMenuButton":
            buttonType = (
                <div className="c-Button-a-LanguageMenuButton" style={{
                    backgroundColor: buttonColor
                }}>
                    <div className="i-FlagBox">{props.children}</div>
                    <p className="i-Text">{props.text}</p>
                </div>
            )
            break;
        case "LanguageContentButton":
            buttonType = (
                <div className="c-Button-a-LanguageContentButton" style={{
                    backgroundColor: buttonColor
                }}>
                    <div className="i-FlagBox">{props.children}</div>
                    <p className="i-Text">{props.text}</p>
                </div>
            )
            break;
        case "SettingsHeaderButton":
            buttonType = (
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
            )
            break;
        case " ":
            buttonType = (
                <div></div>
            )
            break;

    }

    function hoverIn() {
        setHoverState(true)
    }

    function hoverOut() {
        setHoverState(false)
    }

    return (
        <div id="button-container">
            {buttonType}
            <button type="button" id="file-button" className="empty-button" onClick={props.onClick} onMouseEnter={hoverIn} onMouseLeave={hoverOut} />
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
