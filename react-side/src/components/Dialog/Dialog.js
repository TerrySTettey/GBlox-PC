import React from 'react'
import Button from '../Button'
import CustomDrop from '../CustomDrop'
import { useState, useEffect } from 'react'
import './Dialog.scss'

function Dialog(props) {
    const { name, state, children, ...rest } = props;
    return (
        <div className={`dialog-container`}>
            <div id="variable-type-text">Variable Type: </div>
            <div id="variable-type-select">
            <select>
                <option>Float</option>
                <option>Integer</option>
                <option>String</option>
            </select>
            </div>
            <div id="variable-name-text">
                Variable Name:
            </div>
            <input type="text" id="variable-name-input"></input>
            <div id="close-button">
                <Button
                    type="ExampleButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#0000DC"
                    hoverColor="#060841"
                    text={"Close"}
                    hoverEffect="fill">
                </Button>
            </div>
            <div id="ok-button">
                <Button
                    type="ExampleButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#0000DC"
                    hoverColor="#060841"
                    text={"Create New Variable"}
                    hoverEffect="fill">
                </Button>
            </div>
        </div>
    )
}

export default Dialog
