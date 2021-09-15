import React from 'react'
import { useState, useEffect } from 'react'
import './Dialog.scss'
var variables_created = [];

function Dialog(props) {
    const { name, state, children, ...rest } = props;
    return (
        <div>    
            <div className={`dialog-container`}>
                <dialog className={`dialog`} id={name} display={`none`} {...rest}>
                    {children}
                </dialog>
            </div>
        </div>
    )
}

export default Dialog
