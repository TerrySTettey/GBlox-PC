import React, { useState, useEffect, useContext } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types'
import { DeviceContext } from '../contexts/DeviceContext';
import Menu from '../Menu'
import './View_Code_Menu.scss'

function Index(props) {
    const {arduinocode} = useContext(DeviceContext)
    //const [viewCode, setViewCode] = useState("")
    return (
        <Menu>
            <div id="view-code-menu">
                <div className="text">View Code</div>
                <div className="code-viewer">
                    <SyntaxHighlighter
                        language="arduino"
                        style={tomorrowNightBlue}
                        showLineNumbers={true}>
                        {arduinocode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </Menu>
    )
}

Index.propTypes = {

}

export default Index