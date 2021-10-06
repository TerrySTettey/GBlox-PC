import React from 'react'
import Button from '../Button'
import WorkspaceAdd from '../WorkspaceAdd'
import WorkspaceTab from '../WorkspaceTab'

import "./WorkTabHolder.scss"

const WorkTabHolder = () => {
    return (
        <div className="c-WorkTabHolder-a-container">
            <WorkspaceTab text="Hello World, its me"/>
            <WorkspaceTab text="Best Program in the world"/>
            <WorkspaceTab text="Lost and Found"/>
            <WorkspaceTab text="Hello World, its me"/>
            <WorkspaceTab text="Best Program in the world"/>
            <WorkspaceTab text="Lost and Found"/>
            <WorkspaceTab text="Hello World, its me"/>
            <WorkspaceTab text="Best Program in the world"/>
            <WorkspaceTab text="Lost and Found"/>
            <WorkspaceTab text="Hello World, its me"/>
            <WorkspaceTab text="Best Program in the world"/>
            <WorkspaceTab text="Lost and Found"/>
            <WorkspaceAdd />
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}