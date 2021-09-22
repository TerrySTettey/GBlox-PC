import React from 'react'
import PropTypes from 'prop-types'
import './Toolbox.scss'
import Button from '../Button'


function level_group(level) {
    var button_levels = [];
    for (var i = 1; i <= level; i++) {
        if (i != level) {
            button_levels.push(
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={i}
                    hoverEffect="fill">
                </Button>
            )
            button_levels.push(
                <div className="level-connector"></div>
            )
        }
        else {
            button_levels.push(
                <div className="level-connector"></div>
            )
            button_levels.push(
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={i}
                    hoverEffect="fill">
                </Button>
            )
        }

    }
    return button_levels;
}
function Toolbox(props) {
    const { children } = props;
    var level = "Beginner"
    return (
        <div className="Toolbox">
            <div className="toolbox-title">Level: {level}</div>
            <div className="c-buttongroup-a-Levels">
                {level_group(5)}
            </div>
            <div className="connector">
                <div id="connector-bottom">

                </div>
                <div id="connector-middle">

                </div>
                <div id="connector-top">

                </div>
            </div>
        </div >
    )
}

Toolbox.propTypes = {

}

export default Toolbox

