import React, { useState, useRef, useEffect } from 'react'
import Button from '../Button';

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
                <div style={{
                    display: 'flex',
                }}>
                    <h1>Language</h1>
                    <div className="modal-blank-space"/>
                    <Button type="SettingsXButton" />
                </div>


            </div>
            <div className="modal-section-break" />
            <div className="modal-section">
                <h1>Themes</h1>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5px' }}>
                        <p>Dark Mode</p>
                        <Button type="SettingsColor" outColor="#0b0533" />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5px' }}>
                        <p>Light Mode</p>
                        <Button type="SettingsColor" outColor="#FFF" />
                    </div>
                </div>
            </div>
            <div className="modal-section-break" />
            <div className="modal-section">
                <Button type="SettingsButton" outColor="#0000FF" inColor="#0000AA" hoverColor="#0000AA" />
            </div>
        </div >
    )
}

SettingsModal.defaultProps = {
}

SettingsModal.propTypes = {
}

export default SettingsModal
