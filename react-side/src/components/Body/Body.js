import React from 'react';
import PropTypes from 'prop-types';

import Upload_Circle from '../Upload_Circle/Upload_Circle'

import "./Body.scss";
import ProgressBar from '../ProgressBar';

const Body = ({ }) => {
    return (
        <div className="body-container">
            <svg id="c-Body-a-LeftSvg" xmlns="http://www.w3.org/2000/svg" width="46.26" height="90.84vh"/*"996.417"*/ viewBox="0 0 46.26 996.417" preserveAspectRatio="none">
                <defs>
                    <filter id="Path_1">
                        <feOffset dy="3" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="10.5" result="blur" />
                        <feFlood flood-color="#0713bf" flood-opacity="0.522" result="color" />
                        <feComposite operator="out" in="SourceGraphic" in2="blur" />
                        <feComposite operator="in" in="color" />
                        <feComposite operator="in" in2="SourceGraphic" />
                    </filter>
                </defs>
                <g data-type="innerShadowGroup">
                    <path id="Path_1-2" data-name="Path 1" d="M21,1030.372l-14.35,14.35v76.65H0V126.56l45.26,39.774v92.4L20.169,283.821Z" transform="translate(0.5 -125.455)" fill="#060841" />
                    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_1)">
                        <path id="Path_1-3" data-name="Path 1" d="M21,1030.372l-14.35,14.35v76.65H0V126.56l45.26,39.774v92.4L20.169,283.821Z" transform="translate(0.5 -125.46)" fill="#fff" />
                    </g>
                    <path id="Path_1-4" data-name="Path 1" d="M21,1030.372l-14.35,14.35v76.65H0V126.56l45.26,39.774v92.4L20.169,283.821Z" transform="translate(0.5 -125.455)" fill="none" stroke="#0000dc" stroke-width="1" />
                </g>
            </svg>
            <div className="c-Body-a-UploadCircle">
                <Upload_Circle />
            </div>
            <div className="c-Body-a-ProgressBar">
                <ProgressBar progress={55}/>
            </div>
        </div>
    )
}

export default Body


