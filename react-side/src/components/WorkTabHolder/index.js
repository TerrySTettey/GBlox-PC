import React from 'react'
import Button from '../Button'

import "./WorkTabHolder.scss"

const WorkTabHolder = () => {
    return (
        <div className="c-WorkTabHolder-a-container">
            <div className="i-Button">
                <Button
                    hoverColor="#0000FF"
                    inColor="#060841"
                    outColor="#0B0533"
                    text="Workspace 1"
                    type="WorkspaceTabButton"
                />
            </div>
            <div className="i-Button">
            <Button
                hoverColor="#0000FF"
                inColor="#060841"
                outColor="#0B0533"
                text="Workspace 2"
                type="WorkspaceTabButton"
            />
            </div>
            <div className="i-Button">
            <Button
                hoverColor="#0000FF"
                inColor="#060841"
                outColor="#0B0533"
                text="Workspace 2sdsdsds"
                type="WorkspaceTabButton"
            />
            </div>
            <div className="i-Button">
            <Button
                hoverColor="#0000FF"
                inColor="#060841"
                outColor="#0B0533"
                text="Workspace 2sdsdsds"
                type="WorkspaceTabButton"
            />
            </div>
        </div>
    )
}

export default WorkTabHolder

WorkTabHolder.defaultProps = {

}