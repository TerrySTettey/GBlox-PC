import React from 'react'
import { useState, useEffect } from 'react'
import './Slide_Out_Menu.scss'

function Slide_Out_Menu(props) {
    const {name, children, ...rest } = props;
    return (
        <div id={name} className={`sidebar-nav`}>
            {children}
        </div>
    )
}

export default Slide_Out_Menu
