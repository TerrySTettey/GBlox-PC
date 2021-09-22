import React, {useRef} from 'react'
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
    var Connector = useRef(null);
    var level = "Beginner"

    function level1OnClick() {
        if(Connector.current.classList.contains("con-pos-1")){
            Connector.current.classList.remove("con-pos-1");
        }
        if(Connector.current.classList.contains("con-pos-2")){
            Connector.current.classList.remove("con-pos-2");
        }
        if(Connector.current.classList.contains("con-pos-3")){
            Connector.current.classList.remove("con-pos-3");
        }
        if(Connector.current.classList.contains("con-pos-4")){
            Connector.current.classList.remove("con-pos-4");
        }
        if(Connector.current.classList.contains("con-pos-5")){
            Connector.current.classList.remove("con-pos-5");
        }

        Connector.current.classList.add("con-pos-1");
    }

    function level2OnClick() {
        if(Connector.current.classList.contains("con-pos-1")){
            Connector.current.classList.remove("con-pos-1");
        }
        if(Connector.current.classList.contains("con-pos-2")){
            Connector.current.classList.remove("con-pos-2");
        }
        if(Connector.current.classList.contains("con-pos-3")){
            Connector.current.classList.remove("con-pos-3");
        }
        if(Connector.current.classList.contains("con-pos-4")){
            Connector.current.classList.remove("con-pos-4");
        }
        if(Connector.current.classList.contains("con-pos-5")){
            Connector.current.classList.remove("con-pos-5");
        }

        Connector.current.classList.add("con-pos-2");
    }
    function level3OnClick() {
        if(Connector.current.classList.contains("con-pos-1")){
            Connector.current.classList.remove("con-pos-1");
        }
        if(Connector.current.classList.contains("con-pos-2")){
            Connector.current.classList.remove("con-pos-2");
        }
        if(Connector.current.classList.contains("con-pos-3")){
            Connector.current.classList.remove("con-pos-3");
        }
        if(Connector.current.classList.contains("con-pos-4")){
            Connector.current.classList.remove("con-pos-4");
        }
        if(Connector.current.classList.contains("con-pos-5")){
            Connector.current.classList.remove("con-pos-5");
        }

        Connector.current.classList.add("con-pos-3");
    }
    function level4OnClick() {
        if(Connector.current.classList.contains("con-pos-1")){
            Connector.current.classList.remove("con-pos-1");
        }
        if(Connector.current.classList.contains("con-pos-2")){
            Connector.current.classList.remove("con-pos-2");
        }
        if(Connector.current.classList.contains("con-pos-3")){
            Connector.current.classList.remove("con-pos-3");
        }
        if(Connector.current.classList.contains("con-pos-4")){
            Connector.current.classList.remove("con-pos-4");
        }
        if(Connector.current.classList.contains("con-pos-5")){
            Connector.current.classList.remove("con-pos-5");
        }

        Connector.current.classList.add("con-pos-4");
    }
    function level5OnClick() {
        if(Connector.current.classList.contains("con-pos-1")){
            Connector.current.classList.remove("con-pos-1");
        }
        if(Connector.current.classList.contains("con-pos-2")){
            Connector.current.classList.remove("con-pos-2");
        }
        if(Connector.current.classList.contains("con-pos-3")){
            Connector.current.classList.remove("con-pos-3");
        }
        if(Connector.current.classList.contains("con-pos-4")){
            Connector.current.classList.remove("con-pos-4");
        }
        if(Connector.current.classList.contains("con-pos-5")){
            Connector.current.classList.remove("con-pos-5");
        }

        Connector.current.classList.add("con-pos-5");
    }



    return (
        <div className="Toolbox">
            <div className="toolbox-title">Level: {level}</div>
            <div className="c-buttongroup-a-Levels">
                {/*level_group(5)*/}
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={1}
                    hoverEffect="fill"
                    onClick={level1OnClick}>
                </Button>
                <div className="level-connector"></div>
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={2}
                    hoverEffect="fill"
                    onClick={level2OnClick}>
                </Button>
                <div className="level-connector"></div>
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={3}
                    hoverEffect="fill"
                    onClick={level3OnClick}>
                </Button>
                <div className="level-connector"></div>
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={4}
                    hoverEffect="fill"
                    onClick={level4OnClick}>
                </Button>
                <div className="level-connector"></div>
                <Button
                    type="ToolboxLevelButton"
                    s_ButtonState="Out"
                    inColor="#060841"
                    outColor="#060841"
                    hoverColor="#0000DC"
                    text={5}
                    hoverEffect="fill"
                    onClick={level5OnClick}>
                </Button>
            </div>
            <div className="connector" ref={Connector}>
                <div id="connector-bottom"/>
                <div id="connector-middle"/>
                <div id="connector-top"/>
            </div>
        </div >
    )
}

Toolbox.propTypes = {

}

export default Toolbox

