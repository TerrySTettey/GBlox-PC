import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import "./Button.scss"

const Button = (props) => {
    var buttonType;
    var buttonTyper = useRef(null);

    var size =[];

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
                    buttonTyper.current.style.borderWidth= "4px"
                } else if (!hoverState) {
                    setBorderColor(props.borderColor)
                    buttonTyper.current.style.margin= "4px";
                    buttonTyper.current.style.borderWidth= "2px"
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
