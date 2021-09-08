import React from 'react';
import PropTypes from 'prop-types';

import "./Header.scss"

export const Header = ({ }) => {

    function fileButtonClicked(event) {
        document.getElementById("file-dropdown").classList.toggle("show");
    }

    return (
        <div className="header-container">
            <div id="logo">
                <h1>GBlox</h1>
            </div>
            <div className="header-button-container">
                <div className="dropdown-button">
                    <button type="button" id="file-button" className="button-no-border-drop glow" onClick={fileButtonClicked}>
                        <svg id="Component_3_1" data-name="Component 3 – 1" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                            <path id="Path_33" data-name="Path 33" d="M306.954,42h94.091c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                            <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                                <text id="File" transform="translate(18.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">File</tspan></text>
                                <g id="Group_424" data-name="Group 424" transform="translate(-4 -2.007)">
                                    <g id="Group_30" data-name="Group 30" transform="translate(-9.427 4.252)">
                                        <path id="Path_291" data-name="Path 291" d="M.573,1.451h6.5L9.17,3.514H18.6l1.81,2.435V18.564H.573Z" transform="translate(-0.573 -1.451)" fill="none" stroke="#fff" stroke-width="2" />
                                    </g>
                                    <path id="Path_292" data-name="Path 292" d="M10.157,9.272H3.734L1.982,11.389H-9.589" transform="translate(0 -0.16)" fill="none" stroke="#fff" stroke-width="2" />
                                    <g id="Ellipse_9" data-name="Ellipse 9" transform="translate(4.433 15.795)" fill="none" stroke="#fff" stroke-width="2">
                                        <circle cx="1.209" cy="1.209" r="1.209" stroke="none" />
                                        <circle cx="1.209" cy="1.209" r="0.209" fill="none" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <div className="dropdown-content" id="file-dropdown">
                        <button className="button-no-border">New</button>
                        <button className="button-no-border">Open</button>
                        <button className="button-no-border">Save</button>
                        <button className="button-no-border">Save As</button>
                        <button className="button-no-border">Share</button>
                        <button className="button-no-border">Close</button>
                    </div>
                </div>
                <button type="button" id="edit-button" className="button-no-border glow">
                    <svg id="Component_3_2" data-name="Component 3 – 2" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                        <path id="Path_33" data-name="Path 33" d="M306.954,42h94.091c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                        <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                            <text id="Edit" transform="translate(18.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Edit</tspan></text>
                        </g>
                        <g id="Group_427" data-name="Group 427" transform="translate(-714.946 -406.786)">
                            <path id="Path_294" data-name="Path 294" d="M741.417,433.677l-4.545.909.909-4.545,12.691-12.691,2.764-2.764,3.636,3.636Z" transform="translate(-3.441 2.795)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                            <path id="Path_295" data-name="Path 295" d="M3.636,3.636l-.909-.909L0,0" transform="translate(747.953 420.108)" fill="#fff" stroke="#fff" stroke-width="2" />
                            <path id="Path_296" data-name="Path 296" d="M3.636,3.636l-.909-.909L0,0" transform="translate(735.451 430.793)" fill="#fff" stroke="#fff" stroke-width="2" />
                        </g>
                    </svg>
                </button>
                <button type="button" id="save-button" className="button-no-border glow">
                    <svg id="Component_14_1" data-name="Component 14 – 1" xmlns="http://www.w3.org/2000/svg" width="103.381" height="40" viewBox="0 0 103.381 40">
                        <path id="Path_33" data-name="Path 33" d="M306.954,42h77.472c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                        <g id="Group_426" data-name="Group 426" transform="translate(-504.258 -38.405)">
                            <path id="Path_252" data-name="Path 252" d="M0,0H19.035V13.274l-3.006,4.778H0Z" transform="translate(524.001 49.458)" fill="none" stroke="#fff" stroke-width="2" />
                            <rect id="Rectangle_136" data-name="Rectangle 136" width="6.662" height="5.71" transform="translate(529.671 49.458)" fill="none" stroke="#fff" stroke-width="2" />
                        </g>
                        <text id="Save" transform="translate(51.227 26.595)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Save</tspan></text>
                    </svg>
                </button>
            </div>
            <div id="blank-space"></div>
            <div id="right-buttons-container">
                <div className="header-button-container">
                    <button type="button" id="robocentre-button" className="button-no-border glow">
                        <svg id="Component_3_6" data-name="Component 3 – 6" xmlns="http://www.w3.org/2000/svg" width="180" height="40" viewBox="0 0 180 40">
                            <path id="Path_33" data-name="Path 33" d="M306.954,42H461.045c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                            <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                                <text id="RoboCentre" transform="translate(18.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">RoboCentre</tspan></text>
                                <g id="Group_424" data-name="Group 424" transform="translate(-4 -2.007)">
                                    <g id="Group_30" data-name="Group 30" transform="translate(-9.427 4.252)">
                                        <path id="Path_291" data-name="Path 291" d="M.573,1.451h6.5L9.17,3.514H18.6l1.81,2.435V18.564H.573Z" transform="translate(-0.573 -1.451)" fill="none" stroke="#fff" stroke-width="2" />
                                    </g>
                                    <path id="Path_292" data-name="Path 292" d="M10.157,9.272H3.734L1.982,11.389H-9.589" transform="translate(0 -0.16)" fill="none" stroke="#fff" stroke-width="2" />
                                    <g id="Ellipse_9" data-name="Ellipse 9" transform="translate(4.433 15.795)" fill="none" stroke="#fff" stroke-width="2">
                                        <circle cx="1.209" cy="1.209" r="1.209" stroke="none" />
                                        <circle cx="1.209" cy="1.209" r="0.209" fill="none" />
                                    </g>
                                </g>
                            </g>
                        </svg>

                    </button>
                    <button type="button" id="competitions-button" className="button-no-border glow">
                        <svg id="Component_3_5" data-name="Component 3 – 5" xmlns="http://www.w3.org/2000/svg" width="170" height="40" viewBox="0 0 170 40">
                            <path id="Path_33" data-name="Path 33" d="M306.954,42H451.045c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                            <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                                <text id="Competitions" transform="translate(18.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Competitions</tspan></text>
                                <g id="Group_428" data-name="Group 428" transform="translate(-849.472 -404.742)">
                                    <path id="Path_297" data-name="Path 297" d="M850.715,417.639V408H838v9.639l4.488,2.094v3.838h-.748V425.8h5.236v-2.224h-.748v-3.838Z" transform="translate(-0.358)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_298" data-name="Path 298" d="M857.732,417.374H855V411h3.642Z" transform="translate(-4.642 -0.268)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_299" data-name="Path 299" d="M834.911,417.374h2.732V411H834Z" transform="translate(0 -0.268)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <line id="Line_6" data-name="Line 6" x2="11.838" transform="translate(838.081 426.212)" fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                </g>
                            </g>
                        </svg>
                    </button>
                    <button type="button" id="help-button" className="button-no-border glow">
                        <svg id="Component_3_4" data-name="Component 3 – 4" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                            <path id="Path_33" data-name="Path 33" d="M306.954,42h94.091c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                            <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                                <text id="Help" transform="translate(18.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Help</tspan></text>
                                <g id="Group_430" data-name="Group 430" transform="translate(-879.99 -411.199)">
                                    <path id="Path_300" data-name="Path 300" d="M884,422a10,10,0,1,0-4.96,8.639c.2-.116.388-.246.578-.375L883.091,432l-1.132-3.962A9.816,9.816,0,0,0,884,422Z" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <g id="Group_429" data-name="Group 429">
                                        <path id="Path_301" data-name="Path 301" d="M871.143,420.857A2.857,2.857,0,1,1,874,423.714v2.143" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                        <line id="Line_7" data-name="Line 7" y2="1.429" transform="translate(874 426.571)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    </g>
                                </g>
                            </g>
                        </svg>

                    </button>
                    <button type="button" id="settings-button" className="button-no-border glow">
                        <svg id="Component_3_3" data-name="Component 3 – 3" xmlns="http://www.w3.org/2000/svg" width="130" height="40" viewBox="0 0 130 40">
                            <path id="Path_33" data-name="Path 33" d="M306.954,42H411.045c5.06,5.1,7.9,7.961,12.955,13.063V82H294V55.063Z" transform="translate(-294 -42)" fill="#0000dc" />
                            <g id="Group_31" data-name="Group 31" transform="translate(30.99 8.794)">
                                <text id="Settings" transform="translate(18.237 17.801)" fill="#fff" font-size="17" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Settings</tspan></text>
                                <path id="Path_302" data-name="Path 302" d="M928,500.214v-4.427h-2.214a8.033,8.033,0,0,0-.716-1.724l1.567-1.567-3.131-3.131-1.567,1.567a8.015,8.015,0,0,0-1.724-.716V488h-4.427v2.214a8.014,8.014,0,0,0-1.724.716l-1.567-1.567-3.131,3.131,1.567,1.567a8.009,8.009,0,0,0-.716,1.724H908v4.427h2.215a8,8,0,0,0,.716,1.724l-1.567,1.567,3.131,3.131,1.567-1.567a8.005,8.005,0,0,0,1.724.716V508h4.427v-2.214a8.006,8.006,0,0,0,1.724-.716l1.567,1.567,3.131-3.131-1.567-1.567a8.029,8.029,0,0,0,.716-1.724ZM920.5,498a2.5,2.5,0,0,1-3.979,2.015,2.524,2.524,0,0,1-.536-.536,2.5,2.5,0,0,1,0-2.959,2.523,2.523,0,0,1,.536-.536,2.5,2.5,0,0,1,2.959,0,2.52,2.52,0,0,1,.536.536A2.495,2.495,0,0,1,920.5,498Z" transform="translate(-922.426 -486.2)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                            </g>
                        </svg>

                    </button>
                </div>
                <button type="button" id="menu-button" className="button-no-border grow">
                    <svg id="Component_8_1" data-name="Component 8 – 1" xmlns="http://www.w3.org/2000/svg" width="48.476" height="40.339" viewBox="0 0 48.476 40.339">
                        <path id="Path_246" data-name="Path 246" d="M0,0H48.476V5.008H0Z" fill="#e9e9ff" />
                        <path id="Path_247" data-name="Path 247" d="M0,0H48.476V5.008H0Z" transform="translate(0 17.666)" fill="#e9e9ff" />
                        <rect id="Rectangle_3" data-name="Rectangle 3" width="48.476" height="5.008" transform="translate(0 35.331)" fill="#e9e9ff" />
                    </svg>

                </button>
            </div>
        </div>
    )
}
/*
Header.PropTypes = {

}

Header.defaultProps = {

}

*/