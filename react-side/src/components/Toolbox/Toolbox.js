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
                <div id="connector-middle">

                    <svg classname="middle" xmlns="http://www.w3.org/2000/svg" height="10.341" viewBox="0 0 46.923 10.341" preserveAspectRatio="xMidYMid meet">
                        <path id="Middle" d="M112.923,339.087H68v-2h44.923Z" transform="translate(-68 -337.087)" fill="#e9e9ff" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="10.341" viewBox="0 0 2 10.341">
                        <path id="Path_97" data-name="Path 97" d="M113.923,338.087h-2V327.746h2Z" transform="translate(-111.923 -327.746)" fill="#e9e9ff" />
                    </svg>
                </div>
                <div id="connector-bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14.119" viewBox="0 0 2 14.119" preserveAspectRatio="xMidYMin">
                        <path id="Path_97" data-name="Path 97" d="M69,352.205H67V338.087h2Z" transform="translate(-67 -338.087)" fill="#e9e9ff" />
                    </svg>
                </div>

            </div>
        </div >
    )
}

Toolbox.propTypes = {

}

export default Toolbox

