import React from 'react';
import { useState, useEffect } from 'react'
import Dialog from './Dialog'

function Dialog_Component() {
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
        //variables_created.push([`${newvariable_type} ${newvariable_name}`, `${newvariable_name}`]);
        //console.log(variables_created);
    }

    function closedialog() {
        setDialogOpen(false);
        sendvariables();
    }
    return (
        <Dialog name="Variable-Selector">
            <div>{`Variable Type: `}
                <select>
                    <option>Float</option>
                    <option>Integer</option>
                    <option>String</option>
                </select>
            </div>
            <div>
                {`Variable Name: `}
                <input type="text" id={`variable_name`} onChange={variable_name_set}></input>
            </div>

            <menu>
                <button>Close</button>
                <button onClick={closedialog}>Create New Variable</button>
            </menu>
        </Dialog>

    )
}

export default {
    title: "Dialog",
    component: Dialog
}


export const Variable_Dialog = () => Dialog_Component()
{/* <p><label>Variable
<select>
    <option>Float</option>
    <option>Integer</option>
    <option>String</option>
</select>
</label></p>
<input type="text" id={`variable_name`} onChange={variable_name_set}></input>
<menu>
<button onClick={closedialog}>Ok</button>
</menu> */}