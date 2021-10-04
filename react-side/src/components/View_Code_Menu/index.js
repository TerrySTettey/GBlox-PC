import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './View_Code_Menu.scss'

function Index(props) {
    const [view_code, setViewCode] = useState("");
    useEffect(() => {
        setTimeout(function(){ setViewCode(props.viewCode); }, 1000);
        
    });
    return (
        <Menu>
            <div id="view-code-menu">
                <div className="text">View Code</div>
                <div className="code-viewer">
                    {view_code}
                </div>
            </div>
        </Menu>
    )
}

Index.propTypes = {

}

export default Index

