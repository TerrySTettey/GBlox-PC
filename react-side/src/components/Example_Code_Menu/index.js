import { useRef, useState, useEffect } from 'react'
import Menu from '../Menu'
import Button from '../Button'
import PropTypes from 'prop-types'
import "./Example_Code_Menu.scss"

function Index(props) {
    const { children } = props;

    function addDevices(example_object) {
        var devices = [];
        console.log(example_object.length)
        for (var i = 0; i < example_object.length; i++) {
            devices.push([
                <div className="device">
                    {example_object[i]}
                </div>
            ])

        }
        return devices;
    }


    function addExample() {
        const example_object = props.example_codes;
        console.log(example_object[0].header)

        var returnedExamples = [];
        for (var i = 0; i < example_object.length; i++) {
            console.log(example_object[i].header);
            returnedExamples.push(
                [<div className="code-example">
                    <div className="code-example-header">{example_object[i].header}</div>
                    <div className="example-details">
                        <div >Difficulty: Level {example_object[i].level}</div>
                        <div className="blocks_used">Blocks used:</div>
                        <div>{example_object[i].blocks}</div>
                        {example_object[i].description}
                    </div>
                    <div className="example-buttons">
                        <div className="example-devices">
                            {addDevices(example_object[i].devices)}
                        </div>
                        <Button
                            id="code-open"
                            type="ExampleButton"
                            outColor="#0000DC"
                            text="Open Code"
                        />
                    </div>
                </div>])
        }
        return returnedExamples;
    }

    return (
        <Menu>
            <div id="example-code-menu">
                <div className="text">Example Codes</div>
                <Button
                    type="FilterButton"
                    outColor="#0000bc"
                    hoverColor="#0000aa"
                    hoverEffect="fill"
                />
                <div id="examples">
                    {addExample()}
                </div>

            </div>
        </Menu>

    )
}

export default Index
