import React, { useState, useEffect, useRef, useContext } from 'react'
import Button from '../Button'
import './Alert_Notification.scss'
import PropTypes from 'prop-types'

function Index(props) {

    function alertType() {
        var returnedDiv;
        if (props.type === 'alert') {
            returnedDiv = [
                <div className="c-Alert-Alert">
                    <p>{props.text}</p>
                </div>,
                <div className="c-Alert-CloseButton">
                    <Button
                        type="ExampleButton"
                        id="c-CloseButton"
                        text={"No"}
                        onClick={props.closeAlert}
                    >
                    </Button>
                </div>,
                <div className="c-Alert-OkButton">
                    <Button
                        type="ExampleButton"
                        id="c-OkButton"
                        text={"Yes"}
                        onClick={props.acceptAlert}
                    >
                    </Button>
                </div>]
        }
        else if (props.type === 'notification'){
            returnedDiv = [
                <div className="c-Alert-Alert">
                    <p>{props.text}</p>
                </div>,
                <div className="c-Alert-OkButton">
                    <Button
                        type="ExampleButton"
                        id="c-OkButton"
                        text={"Ok"}
                        onClick={props.closeAlert}
                    >
                    </Button>
                </div>]
        }
        return returnedDiv;
    }


    return (
        <div className="c-Alert-a-Container">
            <svg className="c-Alert-SVG" xmlns="http://www.w3.org/2000/svg" width="93.811" height="85.117" viewBox="0 0 93.811 85.117">
                <path id="OOjs_UI_icon_alert" d="M92.229,138.933,54.182,71.662A8.69,8.69,0,0,0,47,66.447a8.692,8.692,0,0,0-7.131,5.215L1.78,138.933c-3.941,6.938-.7,12.631,7.131,12.631H85.1C92.933,151.565,96.17,145.871,92.229,138.933ZM51.7,137.211H42.313v-9.569H51.7Zm0-19.138H42.313V89.365H51.7Z" transform="translate(-0.099 -66.447)"/>
            </svg>
            <div className={`c-Alert-a-${props.type}Content`}>
                {alertType()}
            </div>
        </div>
    )
}

export default Index
