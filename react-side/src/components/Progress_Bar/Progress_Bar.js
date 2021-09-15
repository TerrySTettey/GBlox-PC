import React from 'react'
import PropTypes from 'prop-types'
import './Progress_Bar.scss'

function Progress_Bar(props) {
    const {children} = props;
    return (
        <div className="progress-bar">
            {children}
            <div ></div>
        </div>
    )
}

export default Progress_Bar

