import React, { useState, useRef, useEffect } from 'react'

import "./SettingsModal.scss"

const SettingsModal = (props) => {
    var [buttonState, setButtonState] = useState("Out");

    // On click outside of Object
    function useOutsideAlerter(ref) {
        useEffect(() => {
            //Alert on click outside of element
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setButtonState("Out");
                    //dropdownBox.current.style.display = "none"
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    return (
        <div className="modal-container">
            <div className="modal-section">
                <h1>Language</h1>
            </div>
            <div className="modal-section-break" />
            <div className="modal-section">
                <h1>Themes</h1>
                <div style={{}}>
                    <div style={{}}>
                    <p>Dark Mode</p>
                    <div className="modal-lighting-buttons"/>
                    </div>
                    <div style={{}}>
                    <p>Light Mode</p>
                    </div>
                </div>
            </div>
            

            <div className="modal-section-break" />
        </div>
    )
}

SettingsModal.defaultProps = {
}

SettingsModal.propTypes = {
}

export default SettingsModal
