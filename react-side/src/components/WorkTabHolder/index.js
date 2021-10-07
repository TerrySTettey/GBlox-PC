import React, {useState} from 'react'
import Button from '../Button'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'

import "./WorkTabHolder.scss"



const WorkTabHolder = (props) => {
    var [activeTab, setActiveTab] = useState(1)
    var [WSNum, setWSNum] = useState(1)
    const [TabDOM, setTabDOM] = useState([])

    function AddOnClick() {
        setTabDOM([...TabDOM,<WorkspaceTab text={"Workspace "+ WSNum}/> ])
        console.log(TabDOM)
        setWSNum(WSNum+1)
    }

    return (
        <div className="c-WorkTabHolder-a-container">
            <WorkspaceTab text="Hello World, its me"/>
            <WorkspaceTab text="Best Program in the world"/>
            <WorkspaceTab text="Hello World, its me"/>
            {TabDOM}
            <WorkspaceAdd onClick={AddOnClick}/>
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}