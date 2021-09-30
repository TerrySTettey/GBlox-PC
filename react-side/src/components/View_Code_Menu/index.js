import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './View_Code_Menu.scss'

function index(props) {
    return (
        <Menu>
            <div id="view-code-menu">
                <div className="text">View Code</div>
                <div className="code-viewer">
                    {props.viewCode}
                </div>
            </div>
        </Menu>
    )
}

index.propTypes = {

}

export default index

