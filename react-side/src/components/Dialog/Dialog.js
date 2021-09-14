import React from 'react'
import { useState, useEffect } from 'react'
import './Dialog.scss'
var variables_created = [];

function Dialog(props) {
    const { state, children, ...rest } = props;

    const [newvariable_name, setNewVariableName] = useState("");
    const [newvariable_type, setNewVariableType] = useState("float");
    const [dialog_open, setDialogOpen] = useState(false);

    const variable_name_set = (event) => {
        setNewVariableName(event.target.value);
    }

    const variable_type_set = (event) => {
        setNewVariableType(event.target.value);
    }
    function sendvariables() {
        variables_created.push([`${newvariable_type} ${newvariable_name}`, `${newvariable_name}`]);
        console.log(variables_created);
    }
    function closedialog() {
        setDialogOpen(false);
        sendvariables();
    }

    return (
        <div id="dialog_box_container">
            <dialog className={`dialog`} id={`Variable Creator`}>
                    <p><label>{`Variable Type: `}
                        <select>
                            <option>Float</option>
                            <option>Integer</option>
                            <option>String</option>
                        </select>
                    </label></p>
                    <p><label>{`Variable Name: `}
                        <input className={`button_round`} type="text" id={`variable_name`} onChange={variable_name_set}></input>
                    </label></p>
                    <menu>
                        <button className={`button_round`} onClick={closedialog}>Ok</button>
                    </menu>
                    {children}
            </dialog>
        </div >
    )
}

export default Dialog
