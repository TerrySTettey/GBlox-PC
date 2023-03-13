import React, { useState, useEffect, useContext } from 'react';
import { useLocale } from "react-easy-localization";
import Button from '../Button'
import CustomDrop from '../CustomDrop'
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager';
import './VariableSelector.scss'

function Index(props) {
    const { name, state, children, ...rest } = props;
    const [variableName, setVariableName] = useState("");
    const { 
        closeVariableDialog
    } = useContext(Ctxt_SingletonManager)
    const { i18n} = useLocale();
    return (
        <div className={`dialog-container`}>
            <div id="variable-type-text">{i18n.variable_type + ": "}</div>
            <div id="variable-type-select">
            <select>
                <option>Float</option>
                <option>Integer</option>
                <option>String</option>
            </select>
            </div>
            <div id="variable-name-text">
            {i18n.variable_name + ": "}
            </div>
            <input type="text" id="variable-name-input" onChange = {
                (e) => {
                    setVariableName(e.target.value);
                }
            }></input>
            <div id="close-button">
                <Button
                    type="ExampleButton"
                    id="a-CloseButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#0000DC"
                    hoverColor="#060841"
                    text={i18n.close}
                    hoverEffect="fill"
                    onClick={(e) => {
                        closeVariableDialog(e, variableName)}
                    }
                    >
                </Button>
            </div>
            <div id="ok-button">
                <Button
                    type="ExampleButton"
                    id="a-OkButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#0000DC"
                    hoverColor="#060841"
                    text={i18n.create_variable}
                    hoverEffect="fill"
                    onClick={(e) => {
                        closeVariableDialog(e, variableName)}
                    }>
                        
                </Button>
            </div>
        </div>
    )
}

export default Index
