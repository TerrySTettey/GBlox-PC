import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu'
import './Edit_Code_Menu.scss'

function index(props) {
    return (
        <Menu>
            <div id="edit-code-menu">
                <div className="text">Edit Code</div>
                <div className="code-editor">
                </div>
            </div>
        </Menu>
    )
}

index.propTypes = {

}

export default index

