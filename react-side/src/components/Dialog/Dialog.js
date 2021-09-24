import React from 'react'
import { useState, useEffect } from 'react'
import './Dialog.scss'
var variables_created = [];

function Dialog(props) {
    const { name, state, children, ...rest } = props;
    return (
            <div className={`dialog-container`}>
                <dialog display={`none`} {...rest}>
                    {children}
                </dialog>
            </div>
    )
}

export default Dialog
