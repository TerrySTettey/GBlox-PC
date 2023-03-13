import React, { useState, useEffect, useContext } from 'react'
import Button from '../Button'
import Blockly from 'blockly';
import { Ctxt_SingletonManager } from '../contexts/Ctxt_SingletonManager';
import { useLocale } from "react-easy-localization";
import { blockly } from "../Languages/lang.js";
import * as Fr from 'blockly/msg/fr';
import * as En from 'blockly/msg/en';
import CustomDrop from '../CustomDrop'
import './ModalSettings.scss'

const ModalSettings = (props) => {
    const { i18n, languageCode, changeLanguage } = useLocale();
    const { langauge, setLanguage } = useContext(Ctxt_SingletonManager);
    function removepointerEvent() {
        document.getElementById("blocklyDiv").style.pointerEvents = "none";
    }
    return (
        <div className="modal-container" onClick={removepointerEvent}>
            {/* <div className="modal-section">
                <h1>{i18n.lang}</h1>
                <Button
                    type="LanguageContentButton"
                    inColor="#0000aa"
                    outColor="#0000bc"
                    hoverColor="#0000aa"
                    s_ButtonState="Out"
                    text="English"
                    onClick={() => {
                        changeLanguage("en");
                        Blockly.setLocale(En);
                        Blockly.setLocale(blockly.en);
                    }}
                    hoverEffect="fill"
                />
                <Button
                    type="LanguageContentButton"
                    inColor="#0000aa"
                    outColor="#0000bc"
                    hoverColor="#0000aa"
                    s_ButtonState="Out"
                    text="French"
                    onClick={() => {
                        changeLanguage("fr");
                        Blockly.setLocale(Fr);
                        Blockly.setLocale(blockly.fr);
                    }}
                    hoverEffect="fill"
                />

            </div>
            <div className="modal-section-break" /> */}
            <div className="modal-section">
                <h1>{i18n.theme}</h1>
                <div style={{
                    display: 'flex',
                    maxHeight: '112px',
                    maxWidth: '365px',
                    position: 'relative',
                    left: '-12px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5px', flexGrow: '0', flexShrink: '0' }}>
                        <p>{i18n.dark_mode}</p>
                        <Button id="dark-theme" type="SettingsColor" outColor="#0b0533" hoverEffect="border" onClick={props.themeOnClick} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5px', flexGrow: '0', flexShrink: '0' }}>
                        <p>{i18n.light_mode}</p>
                        <Button id="light-theme" type="SettingsColor" outColor="#FFF" hoverEffect="border" onClick={props.themeOnClick} />
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ModalSettings
