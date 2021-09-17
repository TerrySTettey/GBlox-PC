import React from 'react'
import PropTypes from 'prop-types'
import './Progress_Bar.scss'

function Progress_Bar(props) {
    const { children } = props;
    const bar_overlay =
        <svg xmlns="http://www.w3.org/2000/svg" className="bar-overlay" width="701.667" height="44.554" viewBox="0 0 701.667 44.554">
            <defs>
                <filter id="Exclusion_1" x="0" y="0" width="701.667" height="44.554" filterUnits="userSpaceOnUse">
                    <feOffset input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood flood-color="#0000dc" flood-opacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="Union_2_-_Outline" x="5.878" y="3.847" width="675.602" height="36.86" filterUnits="userSpaceOnUse">
                    <feOffset input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="3" result="blur-2" />
                    <feFlood flood-color="#0000dc" flood-opacity="0.451" />
                    <feComposite operator="in" in2="blur-2" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Exclusion_1)">
                <path id="Exclusion_1-2" data-name="Exclusion 1" d="M681.907,25.554H0V0H656.352L681.9,25.552ZM633.647,3.848l19.135,17.86h8.93L642.577,3.848Zm-33,0,19.135,17.86h8.93L609.576,3.848Zm-33,0,19.135,17.86h8.93L576.576,3.848Zm-33,0,19.135,17.86h8.93L543.577,3.848Zm-33,0,19.135,17.86h8.93L510.576,3.848Zm-33,0,19.135,17.86h8.93L477.576,3.848Zm-33,0,19.135,17.86h8.93L444.577,3.848Zm-33,0,19.135,17.86h8.93L411.576,3.848Zm-33,0,19.135,17.86h8.93L378.576,3.848Zm-33,0,19.135,17.86h8.93L345.577,3.848Zm-33,0,19.135,17.86h8.93L312.576,3.848Zm-33,0,19.135,17.86h8.93L279.576,3.848Zm-33,0,19.135,17.86h8.93L246.577,3.848Zm-33,0,19.135,17.86h8.93L213.576,3.848Zm-33,0,19.135,17.86h8.93L180.576,3.848Zm-33,0,19.135,17.86h8.93L147.577,3.848Zm-33,0,19.135,17.86h8.93L114.576,3.848Zm-33,0,19.135,17.86h8.93L81.576,3.848Zm-33,0,19.135,17.86h8.93L48.577,3.848Zm-33,0,19.135,17.86h8.93L15.576,3.848Z" transform="translate(9.5 9.5)" fill="#060841" stroke="#0016de" stroke-width="1" />
            </g>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Union_2_-_Outline)">
                <path id="Union_2_-_Outline-2" data-name="Union 2 - Outline" d="M656.333,18.36h-10.4L625.732-.5h10.4l.144.135Zm-10-1H653.8L635.733.5h-7.464Zm-23,1h-10.4l-.144-.134L592.732-.5h10.4Zm-10-1H620.8L602.733.5h-7.464Zm-23,1h-10.4l-.144-.134L559.731-.5h10.4Zm-10-1H587.8L569.732.5h-7.464Zm-23,1h-10.4L526.732-.5h10.4l.144.135Zm-10-1H554.8L536.733.5h-7.464Zm-23,1h-10.4l-.144-.134L493.732-.5h10.4l.144.135Zm-10-1H521.8L503.733.5h-7.464Zm-23,1h-10.4l-.144-.134L460.731-.5h10.4l.144.135Zm-10-1H488.8L470.732.5h-7.464Zm-23,1h-10.4l-.144-.134L427.732-.5h10.394l.144.135Zm-10-1H455.8L437.732.5h-7.463Zm-23,1h-10.4l-.144-.134L394.732-.5h10.4l.144.135Zm-10-1H422.8L404.733.5h-7.464Zm-23,1h-10.4l-.144-.134L361.731-.5h10.4l.144.135Zm-10-1H389.8L371.732.5h-7.464Zm-23,1h-10.4l-.144-.134L328.732-.5h10.394l.144.135Zm-10-1H356.8L338.732.5h-7.463Zm-23,1h-10.4l-.144-.134L295.732-.5h10.4l.144.135Zm-10-1H323.8L305.733.5h-7.464Zm-23,1h-10.4l-.144-.134L262.731-.5h10.4l.144.135Zm-10-1H290.8L272.732.5h-7.464Zm-23,1h-10.4L229.732-.5h10.4Zm-10-1H257.8L239.733.5h-7.464Zm-23,1h-10.4L196.732-.5h10.4l.144.135Zm-10-1H224.8L206.733.5h-7.464Zm-23,1h-10.4L163.731-.5h10.4l.144.135Zm-10-1H191.8L173.732.5h-7.464Zm-23,1h-10.4L130.732-.5h10.4Zm-10-1H158.8L140.733.5h-7.464Zm-23,1h-10.4L97.731-.5h10.4Zm-10-1H125.8L107.733.5h-7.464Zm-23,1h-10.4L64.731-.5h10.4Zm-10-1H92.8L74.732.5H67.268Zm-23,1h-10.4L31.732-.5h10.4Zm-10-1H59.8L41.733.5H34.269Zm-23,1h-10.4L-1.268-.5h10.4Zm-10-1H26.8L8.733.5H1.268Z" transform="translate(16.15 13.35)" fill="#707070" />
            </g>
        </svg>

    return (
        <div id="progress-bar">

            <svg xmlns="http://www.w3.org/2000/svg" className="bar-background" width="680.593" height="22.783" viewBox="0 0 680.593 22.783">
                <path id="Background_Slider" data-name="Background Slider" d="M971.061,957.482,996.5,979.265H317.756V957.482Z" transform="translate(-317.256 -956.982)" fill="#060841" stroke="#0000dc" stroke-width="1" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" className="bar-slider" width="680.593" height="22.783" viewBox="0 0 680.593 22.783" preserveAspectRatio="none"a>
                <path id="Slider" d="M971.061,957.482,996.5,979.265H317.756V957.482Z" transform="translate(-317.256 -956.982)" fill="#fff" stroke="#0000dc" stroke-width="1" />
            </svg>


            {bar_overlay}

            {children}
        </div>
    )
}

export default Progress_Bar

