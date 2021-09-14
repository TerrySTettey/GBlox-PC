import React, { useState } from 'react'
import PropTypes from "prop-types"

import HeaderButton from "./../HeaderButton"

import "./Dropdown.scss"

const Dropdown = (props) => {
    var [buttonState, setButtonState] = useState("Out");

    function buttonClicked() {
        if (buttonState === "Out") {
            setButtonState("In");
        } else if (buttonState === "In") {
            setButtonState("Out");
        }

        showDropbox();
    }

    function showDropbox() {
        
    }

    var ButtonHolder = [];
    function populateDropbox() {
        var i = 0;
        if (props.list !== undefined && props.funcsOnClick !== undefined) {
            for (i; i < props.list.length; i++) {
               ButtonHolder.push(<button className="button-no-border" onClick={props.funcsOnClick[i]} >{props.list[i]}</button>)
            }
        }
    }

    return (
        <div className="dropdown-container">
            <HeaderButton buttonImage={props.buttonImage} onClick={buttonClicked} s_ButtonState={buttonState} />
            <div className="blue-dropdown-box">
                {populateDropbox()}
                {ButtonHolder}
            </div>
        </div>
    )
}

Dropdown.defaultProps = {
    buttonImage: 5,
    list: ["Hello", "World"],
    funcsOnClick: [()=>{console.log("Hello")},()=>{console.log("World")}]
}

Dropdown.propTypes = {
    buttonImage: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
    funcs: PropTypes.arrayOf(PropTypes.func)
}

export default Dropdown
