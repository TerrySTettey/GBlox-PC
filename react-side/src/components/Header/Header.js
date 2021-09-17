import React from 'react';
import PropTypes from 'prop-types';

import "./Header.scss"
import Dropdown from '../Dropdown';
import HeaderButton from '../HeaderButton';
import Button from '../Button'
import CustomDrop from '../CustomDrop';

const Header = ({ }) => {

    /**Create Overlay for DropList*/
    var overlay = document.createElement('div')
    overlay.classList.add("focusOverlay")

    overlay.onclick = function (event) {
        var drops = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < drops.length; i++) {
            if (drops[i].classList.contains("show")) {
                drops[i].classList.remove("show");
            }
        }
        overlay.remove()
    }


    function fileButtonClicked(event) {
        var buttonholder = document.getElementById("file-dropdown")
        buttonholder.classList.toggle("show");
        if (buttonholder.classList.contains('show')) {
            document.getElementsByClassName("App")[0].appendChild(overlay);
        }

    }

    function editButtonClicked(event) {
        var buttonholder = document.getElementById("edit-dropdown")
        buttonholder.classList.toggle("show");
        if (buttonholder.classList.contains('show')) {
            document.getElementsByClassName("App")[0].appendChild(overlay);
        }
    }

    function helpButtonClicked(event) {
        var buttonholder = document.getElementById("help-dropdown")
        buttonholder.classList.toggle("show");
        if (buttonholder.classList.contains('show')) {
            document.getElementsByClassName("App")[0].appendChild(overlay);
        }
    }

    function settingsButtonClicked(event) {
        var buttonholder = document.getElementById("settings-dropdown")
        buttonholder.classList.toggle("show");
        if (buttonholder.classList.contains('show')) {
            //document.getElementsByClassName("App")[0].appendChild(overlay);
        }
    }

    return (
        <div>
            <div className="header-container">
                <div id="logo">
                    <h1>GBlox</h1>
                </div>
                <div className="header-buttons-segment">
                    <Dropdown buttonImage="1" list={["New", "Open", "Save", "Save As", "Share", "Close"]} />
                    <Dropdown buttonImage="2" list={["Cut", "Copy", "Paste", "Select All", "Delete"]} />
                    <HeaderButton buttonImage="3" />
                </div>
                <div id="blank-space" />
                <div className="header-buttons-segment">
                    <HeaderButton buttonImage="4" />
                    <HeaderButton buttonImage="5" />
                    <div style={{
                        marginLeft: '5px'
                    }}>
                    <CustomDrop
                        dropType="modal"
                        funcsOnClick={[
                            () => { },
                            function noRefCheck() { }
                        ]}
                        list={[
                            'Hello',
                            'World'
                        ]}
                        modal="SettingsModal"
                        hoverColor="#0000aa"
                        inColor="#0000bc"
                        outColor="#0000dc"
                    />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Header

/*
Header.PropTypes = {

}

Header.defaultProps = {

}

*/