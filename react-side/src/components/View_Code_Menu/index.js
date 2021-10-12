import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './View_Code_Menu.scss'

function Index(props) {
    const [viewCode, setViewCode] = useState("")
    useEffect(() => {
        // if (viewCode !== props.viewCode) {
        setViewCode(props.viewCode);
        // }
    });
    return (
        <Menu>
            <div id="view-code-menu">
                <div className="text">View Code</div>
                <div className="code-viewer">
                    <SyntaxHighlighter
                        language="arduino"
                        style={tomorrowNightBlue}
                        showLineNumbers={true}>
                        {viewCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </Menu>
    )
}

Index.propTypes = {

}

export default Index