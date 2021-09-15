import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import "./Button.scss"

const Button = (props) => {
    var buttonType;

    var [buttonColor, setButtonColor] = useState("#0000dc");

    useEffect(() => {
        if (props.s_ButtonState === "In") {
            setButtonColor(props.inColor);
        } else if (props.s_ButtonState === "Out") {
            setButtonColor(props.outColor);
        }
    }, [props.s_ButtonState])

    switch (props.type) {
        case "SettingsColor":
            buttonType = (
                <div className="modal-lighting-buttons" style={{ backgroundColor: buttonColor }} />
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
        case "":
            buttonType = (
                <div></div>
            )
        case " ":
            buttonType = (
                <div></div>
            )
            break;

    }

    function hoverIn() {
        setButtonColor(props.hoverColor);
    }

    function hoverOut() {
        if (props.s_ButtonState === "Out") {
            setButtonColor(props.outColor)
        } else if (props.s_ButtonState === "In") {
            setButtonColor(props.inColor)
        }
    }

    return (
        <div id="button-container">
            {buttonType}
            <button type="button" id="file-button" className="empty-button" onClick={props.onClick} onMouseEnter={hoverIn} onMouseLeave={hoverOut} />
        </div>
    )
}

Button.defaultProps = {
    type: "SettingsColor",
    inColor: "#0000bc",
    outColor: "#FAC",
    hoverColor: "#0000bc",
    s_ButtonState: "Out",
    text: "Revert all settings"
}

Button.propTypes = {
    buttonImage: PropTypes.string,
    inColor: PropTypes.string,
    outColor: PropTypes.string,
    hoverColor: PropTypes.string,
    s_ButtonState: PropTypes.string,
}

export default Button
