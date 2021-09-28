import React from 'react'
import Menu from '../Menu'
import Button from '../Button'
import PropTypes from 'prop-types'
import "./Example_Code_Menu.scss"

function index(props) {
    const { children } = props;
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
                {children}
                </div>
                
            </div>
        </Menu>

    )
}

export default index
