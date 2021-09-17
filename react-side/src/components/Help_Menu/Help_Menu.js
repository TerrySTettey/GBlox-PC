import React from 'react'
import PropTypes from 'prop-types'
import './Help_Menu.scss'

function Help_Menu(props) {
    const {name, children, ...rest } = props;
    return (
        <div className="help-menu" >
            {children}
        </div>
    )
}


export default Help_Menu

