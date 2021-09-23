import React from 'react'
import Body  from '../Body'

import "./TestMain.scss"

const TestMain = () => {

    var AllScrolls = document.getElementsByClassName("blocklyScrollbarHandle");
    var i = 0;
    for(i = 0; i < AllScrolls.length; i++){
        AllScrolls[i].style.display = "none";
    }
    return (
        <div>
            <Body />
        </div>
    )
}

export default TestMain

TestMain.defaultProps = {
    
}