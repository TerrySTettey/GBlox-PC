import React from 'react'
import Button from '../Button'
import CustomDrop from '../CustomDrop'
import './ModalSettings.scss'

const ModalSettings = (props) => {
    return (
        <div className="modal-container">
    <div className="modal-section">
        <div style={{
            display: 'flex',
        }}>
            <h1>Language</h1>
            <div className="modal-blank-space" />
            <Button type="SettingsXButton" />
        </div>
        <div style={{
            display: 'block',
            position: 'relative',
            left: '0px',
            marginTop: '24px'
        }}>
            <CustomDrop buttonType="LanguageMenuButton" contentButtonTyype="LanguageContentButton" inColor="#0000AA" outColor="#0B0533" contentInColor="#0000aa" contentOutColor="#0000bc" contentHoverColor="#0000aa" text="English" list={['English', 'Francais']} dropType="list" />
        </div>
    </div>
    <div className="modal-section-break" />
    <div className="modal-section">
        <h1>Themes</h1>
        <div style={{
            display: 'flex',
            maxHeight: '112px',
            maxWidth: '365px',
            position: 'relative',
            left: '-12px'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5px', flexGrow: '0', flexShrink: '0' }}>
                <p>Dark Mode</p>
                <Button type="SettingsColor" outColor="#0b0533" hoverEffect="border" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5px', flexGrow: '0', flexShrink: '0' }}>
                <p>Light Mode</p>
                <Button type="SettingsColor" outColor="#FFF" hoverEffect="border" />
            </div>
        </div>
    </div>
    <div className="modal-section-break" />
    <div className="modal-section">
        <div style={{
            marginTop: '15px'
        }}>
            <Button type="SettingsButton" outColor="#0000FF" inColor="#0000AA" hoverColor="#0000AA" text="Revert all settings" />
        </div>
    </div>

</div >
    )
}

export default ModalSettings
