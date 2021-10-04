import React from 'react';
import PropTypes from 'prop-types';
import Device_Manager from '../Device_Manager';
import { useState, useEffect, useRef } from 'react'
import "./Body.scss";
import ProgressBar from '../ProgressBar';
import Slide_Out_Menu from '../Slide_Out_Menu'
import Upload_Circle from '../Upload_Circle'
import Toolbox from '../Toolbox/Toolbox';
import Button from '../Button';
import Header from '../Header/Header'
import ToolSelector from '../ToolSelector/ToolSelector';
import Pull_Out_Menu from '../Pull_Out_Menu'
import CustomDrop from '../CustomDrop';


const Arduino_Uno_SVG =
    [<svg xmlns="http://www.w3.org/2000/svg" width="143.754" height="102.44" viewBox="0 0 143.754 102.44">
        <g id="ArduinoUno" transform="translate(-8 -8)">
            <g id="breadboardbreadboard" transform="translate(8 8)">
                <g id="icon" transform="translate(12.043)">
                    <path id="_x30_.1.0.0" d="M141.878,0l2.927,2.927V24.879l4.878,4.878V92.685l-4.878,4.879v2.954a1.923,1.923,0,0,1-1.92,1.922H19.892a1.921,1.921,0,0,1-1.92-1.92V1.92A1.92,1.92,0,0,1,19.892,0H141.878m-.147,34.147a3.073,3.073,0,0,0,6.147.01v-.011a3.073,3.073,0,0,0-6.147-.011Zm0,53.66a3.073,3.073,0,0,0,6.147.011v-.011a3.073,3.073,0,0,0-6.147-.011ZM44.168,4.878a3.073,3.073,0,0,0,6.146.011V4.878a3.073,3.073,0,1,0-6.146-.009v.009ZM41.729,97.564a3.073,3.073,0,0,0,6.146.009v-.009a3.073,3.073,0,0,0-6.146-.012Zm72.991,0a.816.816,0,1,0,1.632,0v0a.816.816,0,1,0-1.632,0Zm4.878,0a.816.816,0,1,0,1.631,0v0a.816.816,0,1,0-1.631,0Zm4.878,0a.816.816,0,1,0,1.633,0v0a.816.816,0,1,0-1.633,0Zm4.879,0a.816.816,0,1,0,1.632,0v0a.816.816,0,1,0-1.632,0Zm4.878,0a.816.816,0,1,0,1.633,0v0a.816.816,0,1,0-1.633,0v0Zm4.878,0a.816.816,0,1,0,1.632,0v0a.816.816,0,1,0-1.632,0Zm.148-53.66a.914.914,0,0,0,1.827,0v0a.914.914,0,0,0-1.827,0Zm4.878,0a.913.913,0,0,0,1.825,0v0a.913.913,0,0,0-1.825,0Zm-4.878,4.878a.914.914,0,0,0,1.827,0v0a.914.914,0,0,0-1.827,0Zm4.878,0a.913.913,0,1,0,1.825,0v0a.913.913,0,1,0-1.825,0Zm-4.878,4.878a.914.914,0,0,0,1.827,0v0a.914.914,0,0,0-1.827,0Zm4.878,0a.913.913,0,1,0,1.825,0v0a.913.913,0,0,0-1.825,0ZM57.061,11.22a.912.912,0,1,0,1.825,0v0a.912.912,0,1,0-1.825,0v0Zm0,4.878a.912.912,0,0,0,1.825,0v0a.912.912,0,0,0-1.825,0ZM52.182,11.22a.912.912,0,1,0,1.825,0v0a.912.912,0,1,0-1.825,0Zm0,4.878a.912.912,0,0,0,1.825,0v0a.912.912,0,0,0-1.825,0ZM47.3,11.22a.912.912,0,1,0,.913-.913A.912.912,0,0,0,47.3,11.22Zm0,4.878a.912.912,0,1,0,.913-.913A.912.912,0,0,0,47.3,16.1ZM97.158,4.878a.816.816,0,1,0,1.632,0v0a.816.816,0,1,0-1.632,0Zm-4.878,0a.816.816,0,0,0,1.633,0v0a.816.816,0,1,0-1.633-.005v.005Zm-4.878,0a.816.816,0,1,0,1.631,0V4.878A.816.816,0,1,0,87.4,4.872Zm-4.879,0a.816.816,0,0,0,1.633,0V4.878a.816.816,0,1,0-1.633-.005Zm-4.878,0a.817.817,0,0,0,1.634,0V4.878a.816.816,0,1,0-1.632-.005.011.011,0,0,0,0,.006Zm-4.878,0a.816.816,0,1,0,1.632,0V4.878a.816.816,0,1,0-1.632-.005Zm-4.879,0a.816.816,0,0,0,1.633,0V4.878a.816.816,0,1,0-1.633-.005Zm-4.878,0a.816.816,0,1,0,1.632,0V4.878a.816.816,0,1,0-1.632-.005v.006Zm-4.878,0a.816.816,0,0,0,1.633,0V4.878a.816.816,0,1,0-1.632-.005.021.021,0,0,0,0,.006Zm-4.878,0a.816.816,0,0,0,1.633,0V4.878a.816.816,0,0,0-1.633-.005v.006Zm85.856,0a.816.816,0,0,0,1.632,0v0a.816.816,0,1,0-1.632,0Zm-4.878,0a.816.816,0,0,0,1.633,0v0a.816.816,0,0,0-1.633,0Zm-4.878,0a.816.816,0,1,0,1.631,0v0a.816.816,0,1,0-1.631,0Zm-4.879,0a.816.816,0,0,0,1.633,0v0a.816.816,0,1,0-1.633,0Zm-4.878,0a.816.816,0,1,0,1.631,0v0a.816.816,0,1,0-1.631,0Zm-4.878,0a.816.816,0,1,0,1.632,0v0a.816.816,0,1,0-1.632,0Zm-4.878,0a.816.816,0,0,0,1.633,0v0a.816.816,0,0,0-1.633,0v0Zm-4.878,0a.816.816,0,1,0,1.631,0v0a.816.816,0,1,0-1.631,0ZM75.694,97.564a.816.816,0,0,0,1.632.005v-.005a.816.816,0,1,0-1.632-.005Zm-4.878,0a.816.816,0,0,0,1.632.005v-.005a.816.816,0,1,0-1.632-.005Zm9.756,0a.816.816,0,0,0,1.631.005v-.005a.816.816,0,1,0-1.631-.005Zm4.878,0a.816.816,0,0,0,1.633.005v-.005a.816.816,0,1,0-1.633-.005Zm4.878,0a.816.816,0,0,0,1.632.005v-.005a.816.816,0,1,0-1.632-.005Zm4.878,0a.816.816,0,1,0,1.631,0v0a.816.816,0,1,0-1.631,0Zm4.878,0a.816.816,0,1,0,1.633,0v0a.816.816,0,1,0-1.633,0Zm4.879,0a.816.816,0,1,0,1.631,0v0a.816.816,0,1,0-1.631,0Z" transform="translate(-17.972)" fill="#0f7391" />
                    <g id="_x30_.1.0.1" transform="translate(41.953 8.293)">
                        <circle id="_x30_.1.0.1.1" cx="0.488" cy="0.488" r="0.488" fill="none" stroke="#fff" stroke-width="0.72" />
                        <g id="_x30_.1.0.1.7" transform="translate(12.018 0.777)">
                            <g id="_x30_.1.0.1.7.0">
                                <g id="g19337" transform="translate(0)">
                                    <g id="g19339" transform="translate(0 0)">
                                        <g id="g19341">
                                            <g id="g19343">
                                                <g id="_x30_.1.0.1.7.0.0">
                                                    <g id="_x30_.1.0.1.7.0.0.0">
                                                        <g id="g19347" transform="translate(0 2.71) rotate(-90)">
                                                            <g id="g19349">
                                                                <g id="g19351">
                                                                    <g id="g19353">
                                                                        <g id="_x30_.1.0.1.7.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.7.0.0.0.0.0">
                                                                                <g id="g19357" transform="translate(0 0)">
                                                                                    <g id="g19359" transform="translate(0)">
                                                                                        <g id="g19361">
                                                                                            <g id="g19363">
                                                                                                <g id="_x30_.1.0.1.7.0.0.0.0.0.0">
                                                                                                    <g id="g19366" transform="translate(0 0)">
                                                                                                        <g id="g19368">
                                                                                                            <g id="g19370">
                                                                                                                <g id="g19372">
                                                                                                                    <text id="_x30_.1.0.1.7.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">13</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.8" transform="translate(16.897 0.777)">
                            <g id="_x30_.1.0.1.8.0">
                                <g id="g19377" transform="translate(0)">
                                    <g id="g19379" transform="translate(0 0)">
                                        <g id="g19381">
                                            <g id="g19383">
                                                <g id="_x30_.1.0.1.8.0.0">
                                                    <g id="_x30_.1.0.1.8.0.0.0">
                                                        <g id="g19387" transform="translate(0 2.71) rotate(-90)">
                                                            <g id="g19389">
                                                                <g id="g19391">
                                                                    <g id="g19393">
                                                                        <g id="_x30_.1.0.1.8.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.8.0.0.0.0.0">
                                                                                <g id="g19397" transform="translate(0 0)">
                                                                                    <g id="g19399" transform="translate(0)">
                                                                                        <g id="g19401">
                                                                                            <g id="g19403">
                                                                                                <g id="_x30_.1.0.1.8.0.0.0.0.0.0">
                                                                                                    <g id="g19406" transform="translate(0)">
                                                                                                        <g id="g19408">
                                                                                                            <g id="g19410">
                                                                                                                <g id="g19412">
                                                                                                                    <text id="_x30_.1.0.1.8.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">12</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.9" transform="translate(21.774 0.777)">
                            <g id="_x30_.1.0.1.9.0">
                                <g id="g19417" transform="translate(0)">
                                    <g id="g19419" transform="translate(0 0)">
                                        <g id="g19421">
                                            <g id="g19423">
                                                <g id="_x30_.1.0.1.9.0.0">
                                                    <g id="_x30_.1.0.1.9.0.0.0">
                                                        <g id="g19427" transform="translate(0 2.71) rotate(-90)">
                                                            <g id="g19429">
                                                                <g id="g19431">
                                                                    <g id="g19433">
                                                                        <g id="_x30_.1.0.1.9.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.9.0.0.0.0.0">
                                                                                <g id="g19437" transform="translate(0 0)">
                                                                                    <g id="g19439" transform="translate(0)">
                                                                                        <g id="g19441">
                                                                                            <g id="g19443">
                                                                                                <g id="_x30_.1.0.1.9.0.0.0.0.0.0">
                                                                                                    <g id="g19446" transform="translate(0)">
                                                                                                        <g id="g19448">
                                                                                                            <g id="g19450">
                                                                                                                <g id="g19452">
                                                                                                                    <text id="_x30_.1.0.1.9.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">11</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.10" transform="translate(26.652 0.777)">
                            <g id="_x30_.1.0.1.10.0">
                                <g id="g19457" transform="translate(0)">
                                    <g id="g19459" transform="translate(0 0)">
                                        <g id="g19461">
                                            <g id="g19463">
                                                <g id="_x30_.1.0.1.10.0.0">
                                                    <g id="_x30_.1.0.1.10.0.0.0">
                                                        <g id="g19467" transform="translate(0 2.71) rotate(-90)">
                                                            <g id="g19469">
                                                                <g id="g19471">
                                                                    <g id="g19473">
                                                                        <g id="_x30_.1.0.1.10.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.10.0.0.0.0.0">
                                                                                <g id="g19477" transform="translate(0 0)">
                                                                                    <g id="g19479" transform="translate(0)">
                                                                                        <g id="g19481">
                                                                                            <g id="g19483">
                                                                                                <g id="_x30_.1.0.1.10.0.0.0.0.0.0">
                                                                                                    <g id="g19486" transform="translate(0)">
                                                                                                        <g id="g19488">
                                                                                                            <g id="g19490">
                                                                                                                <g id="g19492">
                                                                                                                    <text id="_x30_.1.0.1.10.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">10</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.11" transform="translate(31.531 0.298)">
                            <g id="_x30_.1.0.1.11.0">
                                <g id="g19497" transform="translate(0 0)">
                                    <g id="g19499" transform="translate(0 0)">
                                        <g id="g19501">
                                            <g id="g19503">
                                                <g id="_x30_.1.0.1.11.0.0">
                                                    <g id="_x30_.1.0.1.11.0.0.0">
                                                        <g id="g19507" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19509">
                                                                <g id="g19511">
                                                                    <g id="g19513">
                                                                        <g id="_x30_.1.0.1.11.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.11.0.0.0.0.0">
                                                                                <g id="g19517" transform="translate(0 0)">
                                                                                    <g id="g19519">
                                                                                        <g id="g19521">
                                                                                            <g id="g19523">
                                                                                                <g id="_x30_.1.0.1.11.0.0.0.0.0.0">
                                                                                                    <g id="g19526" transform="translate(0 0)">
                                                                                                        <g id="g19528">
                                                                                                            <g id="g19530">
                                                                                                                <g id="g19532">
                                                                                                                    <text id="_x30_.1.0.1.11.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">9</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.12" transform="translate(36.409 0.298)">
                            <g id="_x30_.1.0.1.12.0">
                                <g id="g19537" transform="translate(0 0)">
                                    <g id="g19539" transform="translate(0 0)">
                                        <g id="g19541">
                                            <g id="g19543">
                                                <g id="_x30_.1.0.1.12.0.0">
                                                    <g id="_x30_.1.0.1.12.0.0.0">
                                                        <g id="g19547" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19549">
                                                                <g id="g19551">
                                                                    <g id="g19553">
                                                                        <g id="_x30_.1.0.1.12.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.12.0.0.0.0.0">
                                                                                <g id="g19557" transform="translate(0 0)">
                                                                                    <g id="g19559">
                                                                                        <g id="g19561">
                                                                                            <g id="g19563">
                                                                                                <g id="_x30_.1.0.1.12.0.0.0.0.0.0">
                                                                                                    <text id="_x30_.1.0.1.12.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">8</tspan></text>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.13" transform="translate(44.213 0.298)">
                            <g id="_x30_.1.0.1.13.0">
                                <g id="g19569" transform="translate(0 0)">
                                    <g id="g19571" transform="translate(0 0)">
                                        <g id="g19573">
                                            <g id="g19575">
                                                <g id="_x30_.1.0.1.13.0.0">
                                                    <g id="_x30_.1.0.1.13.0.0.0">
                                                        <g id="g19579" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19581">
                                                                <g id="g19583">
                                                                    <g id="g19585">
                                                                        <g id="_x30_.1.0.1.13.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.13.0.0.0.0.0">
                                                                                <g id="g19589" transform="translate(0 0)">
                                                                                    <g id="g19591">
                                                                                        <g id="g19593">
                                                                                            <g id="g19595">
                                                                                                <g id="_x30_.1.0.1.13.0.0.0.0.0.0">
                                                                                                    <g id="g19598" transform="translate(0 0)">
                                                                                                        <g id="g19600">
                                                                                                            <g id="g19602">
                                                                                                                <g id="g19604">
                                                                                                                    <text id="_x30_.1.0.1.13.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">7</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.14" transform="translate(49.092 0.298)">
                            <g id="_x30_.1.0.1.14.0">
                                <g id="g19609" transform="translate(0 0)">
                                    <g id="g19611" transform="translate(0 0)">
                                        <g id="g19613">
                                            <g id="g19615">
                                                <g id="_x30_.1.0.1.14.0.0">
                                                    <g id="_x30_.1.0.1.14.0.0.0">
                                                        <g id="g19619" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19621">
                                                                <g id="g19623">
                                                                    <g id="g19625">
                                                                        <g id="_x30_.1.0.1.14.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.14.0.0.0.0.0">
                                                                                <g id="g19629" transform="translate(0)">
                                                                                    <g id="g19631">
                                                                                        <g id="g19633">
                                                                                            <g id="g19635">
                                                                                                <g id="_x30_.1.0.1.14.0.0.0.0.0.0">
                                                                                                    <text id="_x30_.1.0.1.14.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">6</tspan></text>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.15" transform="translate(53.97 0.298)">
                            <g id="_x30_.1.0.1.15.0">
                                <g id="g19641" transform="translate(0 0)">
                                    <g id="g19643" transform="translate(0 0)">
                                        <g id="g19645">
                                            <g id="g19647">
                                                <g id="_x30_.1.0.1.15.0.0">
                                                    <g id="_x30_.1.0.1.15.0.0.0">
                                                        <g id="g19651" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19653">
                                                                <g id="g19655">
                                                                    <g id="g19657">
                                                                        <g id="_x30_.1.0.1.15.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.15.0.0.0.0.0">
                                                                                <g id="g19661" transform="translate(0 0)">
                                                                                    <g id="g19663">
                                                                                        <g id="g19665">
                                                                                            <g id="g19667">
                                                                                                <g id="_x30_.1.0.1.15.0.0.0.0.0.0">
                                                                                                    <text id="_x30_.1.0.1.15.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">5</tspan></text>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.16" transform="translate(58.848 0.298)">
                            <g id="_x30_.1.0.1.16.0">
                                <g id="g19673" transform="translate(0 0)">
                                    <g id="g19675" transform="translate(0 0)">
                                        <g id="g19677">
                                            <g id="g19679">
                                                <g id="_x30_.1.0.1.16.0.0">
                                                    <g id="_x30_.1.0.1.16.0.0.0">
                                                        <g id="g19683" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19685">
                                                                <g id="g19687">
                                                                    <g id="g19689">
                                                                        <g id="_x30_.1.0.1.16.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.16.0.0.0.0.0">
                                                                                <g id="g19693" transform="translate(0 0)">
                                                                                    <g id="g19695">
                                                                                        <g id="g19697">
                                                                                            <g id="g19699">
                                                                                                <g id="_x30_.1.0.1.16.0.0.0.0.0.0">
                                                                                                    <g id="g19702" transform="translate(0 0)">
                                                                                                        <g id="g19704">
                                                                                                            <g id="g19706">
                                                                                                                <g id="g19708">
                                                                                                                    <text id="_x30_.1.0.1.16.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">4</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.17" transform="translate(63.727 0.298)">
                            <g id="_x30_.1.0.1.17.0">
                                <g id="g19713" transform="translate(0 0)">
                                    <g id="g19715" transform="translate(0 0)">
                                        <g id="g19717">
                                            <g id="g19719">
                                                <g id="_x30_.1.0.1.17.0.0">
                                                    <g id="_x30_.1.0.1.17.0.0.0">
                                                        <g id="g19723" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19725">
                                                                <g id="g19727">
                                                                    <g id="g19729">
                                                                        <g id="_x30_.1.0.1.17.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.17.0.0.0.0.0">
                                                                                <g id="g19733" transform="translate(0 0)">
                                                                                    <g id="g19735">
                                                                                        <g id="g19737">
                                                                                            <g id="g19739">
                                                                                                <g id="_x30_.1.0.1.17.0.0.0.0.0.0">
                                                                                                    <text id="_x30_.1.0.1.17.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">3</tspan></text>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.18" transform="translate(68.604 0.298)">
                            <g id="_x30_.1.0.1.18.0">
                                <g id="g19745" transform="translate(0 0)">
                                    <g id="g19747" transform="translate(0 0)">
                                        <g id="g19749">
                                            <g id="g19751">
                                                <g id="_x30_.1.0.1.18.0.0">
                                                    <g id="_x30_.1.0.1.18.0.0.0">
                                                        <g id="g19755" transform="translate(0 1.355) rotate(-90)">
                                                            <g id="g19757">
                                                                <g id="g19759">
                                                                    <g id="g19761">
                                                                        <g id="_x30_.1.0.1.18.0.0.0.0">
                                                                            <g id="_x30_.1.0.1.18.0.0.0.0.0">
                                                                                <g id="g19765" transform="translate(0 0)">
                                                                                    <g id="g19767">
                                                                                        <g id="g19769">
                                                                                            <g id="g19771">
                                                                                                <g id="_x30_.1.0.1.18.0.0.0.0.0.0">
                                                                                                    <g id="g19774" transform="translate(0 0)">
                                                                                                        <g id="g19776">
                                                                                                            <g id="g19778">
                                                                                                                <g id="g19780">
                                                                                                                    <text id="_x30_.1.0.1.18.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">2</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.1.40" transform="translate(5.732 12.843)">
                            <g id="_x30_.1.0.1.40.1">
                                <g id="g19847" transform="translate(0)">
                                    <g id="g19849" transform="translate(0 0)">
                                        <g id="g19851">
                                            <g id="g19853">
                                                <g id="_x30_.1.0.1.40.1.1">
                                                    <g id="g19856">
                                                        <g id="g19858">
                                                            <g id="g19860">
                                                                <g id="g19862">
                                                                    <text id="_x30_.1.0.1.40.1.1.0" transform="translate(0 3)" fill="#fff" font-size="3" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">L</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="_x30_.1.0.2" transform="translate(28.05 8.239)">
                        <g id="_x30_.1.0.2.1" transform="translate(43.356 83.225)">
                            <g id="_x30_.1.0.2.1.0">
                                <g id="g19901" transform="translate(0 2.71) rotate(-90)">
                                    <g id="g19903" transform="translate(0 0)">
                                        <g id="g19905">
                                            <g id="g19907">
                                                <g id="_x30_.1.0.2.1.0.0">
                                                    <text id="_x30_.1.0.2.1.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">5V</tspan></text>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.2" transform="translate(67.649 83.225)">
                            <g id="g19913" transform="translate(0 2.71) rotate(-90)">
                                <g id="g19915" transform="translate(0 0)">
                                    <g id="g19917">
                                        <g id="g19919">
                                            <g id="_x30_.1.0.2.2.1">
                                                <g id="g19922" transform="translate(0 0)">
                                                    <g id="g19924">
                                                        <g id="g19926">
                                                            <g id="g19928">
                                                                <text id="_x30_.1.0.2.2.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A0</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.3" transform="translate(78.797 77.679)">
                            <g id="_x30_.1.0.2.3.0">
                                <g id="g19933" transform="translate(0 0)">
                                    <g id="g19935" transform="translate(0 0)">
                                        <g id="g19937">
                                            <g id="g19939">
                                                <g id="_x30_.1.0.2.3.0.0">
                                                    <g id="g19942" transform="translate(0 0)">
                                                        <g id="g19944">
                                                            <g id="g19946">
                                                                <g id="g19948">
                                                                    <text id="_x30_.1.0.2.3.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">ANALOG IN</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.4" transform="translate(15.978 1.821)">
                            <g id="_x30_.1.0.2.4.0">
                                <g id="g19953" transform="translate(0)">
                                    <g id="g19955" transform="translate(0)">
                                        <g id="g19957">
                                            <g id="g19959">
                                                <g id="_x30_.1.0.2.4.0.0">
                                                    <g id="_x30_.1.0.2.4.0.0.0">
                                                        <g id="g19963" transform="translate(0 5.42) rotate(-90)">
                                                            <g id="g19965">
                                                                <g id="g19967">
                                                                    <g id="g19969">
                                                                        <g id="_x30_.1.0.2.4.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.4.0.0.0.0.0">
                                                                                <g id="g19973" transform="translate(0 0)">
                                                                                    <g id="g19975" transform="translate(0)">
                                                                                        <g id="g19977">
                                                                                            <g id="g19979">
                                                                                                <g id="_x30_.1.0.2.4.0.0.0.0.0.0">
                                                                                                    <g id="g19982" transform="translate(0 0)">
                                                                                                        <g id="g19984">
                                                                                                            <g id="g19986">
                                                                                                                <g id="g19988">
                                                                                                                    <text id="_x30_.1.0.2.4.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">AREF</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.5" transform="translate(89.27 32.822)">
                            <g id="g19993" transform="translate(0)">
                                <g id="g19995" transform="translate(0 0)">
                                    <g id="g19997">
                                        <g id="g19999">
                                            <g id="_x30_.1.0.2.5.1">
                                                <g id="g20002">
                                                    <g id="g20004">
                                                        <g id="g20006">
                                                            <g id="g20008">
                                                                <text id="_x30_.1.0.2.5.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">1</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.6" transform="translate(21.078)">
                            <g id="_x30_.1.0.2.6.0">
                                <g id="g20013" transform="translate(0 0)">
                                    <g id="g20015" transform="translate(0 0)">
                                        <g id="g20017">
                                            <g id="g20019">
                                                <g id="_x30_.1.0.2.6.0.0">
                                                    <g id="_x30_.1.0.2.6.0.0.0">
                                                        <g id="g20023" transform="translate(0 5.42) rotate(-90)">
                                                            <g id="g20025">
                                                                <g id="g20027">
                                                                    <g id="g20029">
                                                                        <g id="_x30_.1.0.2.6.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.6.0.0.0.0.0">
                                                                                <g id="g20033" transform="translate(0 0)">
                                                                                    <g id="g20035" transform="translate(0)">
                                                                                        <g id="g20037">
                                                                                            <g id="g20039">
                                                                                                <g id="_x30_.1.0.2.6.0.0.0.0.0.0">
                                                                                                    <g id="g20042" transform="translate(0 0)">
                                                                                                        <g id="g20044">
                                                                                                            <g id="g20046">
                                                                                                                <g id="g20048">
                                                                                                                    <text id="_x30_.1.0.2.6.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">GND</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.10" transform="translate(17.074 21.787)">
                            <g id="g20059" transform="translate(0)">
                                <g id="g20061" transform="translate(0 0)">
                                    <g id="g20063">
                                        <g id="g20065">
                                            <g id="_x30_.1.0.2.10.1">
                                                <g id="g20068">
                                                    <g id="g20070">
                                                        <g id="g20072">
                                                            <g id="g20074">
                                                                <text id="_x30_.1.0.2.10.1.0" transform="translate(0 3)" fill="#fff" font-size="3" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">TX</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.11" transform="translate(17.126 26.421)">
                            <g id="g20079" transform="translate(0 0)">
                                <g id="g20081" transform="translate(0 0)">
                                    <g id="g20083">
                                        <g id="g20085">
                                            <g id="_x30_.1.0.2.11.1">
                                                <g id="g20088" transform="translate(0 0)">
                                                    <g id="g20090" transform="translate(0 0)">
                                                        <g id="g20092">
                                                            <g id="g20094">
                                                                <text id="_x30_.1.0.2.11.1.0" transform="translate(0 3)" fill="#fff" font-size="3" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">RX</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.14" transform="translate(33.144 79.569)">
                            <g id="_x30_.1.0.2.14.0">
                                <g id="g20103" transform="translate(0 0)">
                                    <g id="g20105" transform="translate(0 0)">
                                        <g id="g20107">
                                            <g id="g20109">
                                                <g id="_x30_.1.0.2.14.0.0">
                                                    <g id="_x30_.1.0.2.14.0.0.0">
                                                        <g id="g20113" transform="translate(0 6.098) rotate(-90)">
                                                            <g id="g20115" transform="translate(0)">
                                                                <g id="g20117">
                                                                    <g id="g20119">
                                                                        <g id="_x30_.1.0.2.14.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.14.0.0.0.0.0">
                                                                                <g id="g20123" transform="translate(0 0)">
                                                                                    <g id="g20125">
                                                                                        <g id="g20127">
                                                                                            <g id="g20129">
                                                                                                <g id="_x30_.1.0.2.14.0.0.0.0.0.0">
                                                                                                    <text id="_x30_.1.0.2.14.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">RESET</tspan></text>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.15" transform="translate(38.51 81.845)">
                            <g id="_x30_.1.0.2.15.0">
                                <g id="g20135" transform="translate(0 0)">
                                    <g id="g20137" transform="translate(0 0)">
                                        <g id="g20139">
                                            <g id="g20141">
                                                <g id="_x30_.1.0.2.15.0.0">
                                                    <g id="_x30_.1.0.2.15.0.0.0">
                                                        <g id="g20145" transform="translate(0 4.065) rotate(-90)">
                                                            <g id="g20147" transform="translate(0)">
                                                                <g id="g20149">
                                                                    <g id="g20151">
                                                                        <g id="_x30_.1.0.2.15.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.15.0.0.0.0.0">
                                                                                <g id="g20155" transform="translate(0 0)">
                                                                                    <g id="g20157" transform="translate(0)">
                                                                                        <g id="g20159">
                                                                                            <g id="g20161">
                                                                                                <g id="_x30_.1.0.2.15.0.0.0.0.0.0">
                                                                                                    <g id="g20164" transform="translate(0 0)">
                                                                                                        <g id="g20166">
                                                                                                            <g id="g20168">
                                                                                                                <g id="g20170">
                                                                                                                    <text id="_x30_.1.0.2.15.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">3V3</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.16" transform="translate(72.527 83.225)">
                            <g id="g20175" transform="translate(0 2.71) rotate(-90)">
                                <g id="g20177" transform="translate(0 0)">
                                    <g id="g20179">
                                        <g id="g20181">
                                            <g id="_x30_.1.0.2.16.1">
                                                <text id="_x30_.1.0.2.16.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A1</tspan></text>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.17" transform="translate(77.408 83.225)">
                            <g id="g20187" transform="translate(0 2.71) rotate(-90)">
                                <g id="g20189" transform="translate(0 0)">
                                    <g id="g20191">
                                        <g id="g20193">
                                            <g id="_x30_.1.0.2.17.1">
                                                <g id="g20196" transform="translate(0 0)">
                                                    <g id="g20198">
                                                        <g id="g20200">
                                                            <g id="g20202">
                                                                <text id="_x30_.1.0.2.17.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A2</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.18" transform="translate(82.284 83.225)">
                            <g id="g20207" transform="translate(0 2.71) rotate(-90)">
                                <g id="g20209" transform="translate(0 0)">
                                    <g id="g20211">
                                        <g id="g20213">
                                            <g id="_x30_.1.0.2.18.1">
                                                <g id="g20216" transform="translate(0 0)">
                                                    <g id="g20218">
                                                        <g id="g20220">
                                                            <g id="g20222">
                                                                <text id="_x30_.1.0.2.18.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A3</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.19" transform="translate(87.163 83.225)">
                            <g id="g20227" transform="translate(0 2.71) rotate(-90)">
                                <g id="g20229" transform="translate(0 0)">
                                    <g id="g20231">
                                        <g id="g20233">
                                            <g id="_x30_.1.0.2.19.1">
                                                <g id="g20236" transform="translate(0 0)">
                                                    <g id="g20238">
                                                        <g id="g20240">
                                                            <g id="g20242">
                                                                <text id="_x30_.1.0.2.19.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A4</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.20" transform="translate(92.04 83.225)">
                            <g id="g20247" transform="translate(0 2.71) rotate(-90)">
                                <g id="g20249" transform="translate(0 0)">
                                    <g id="g20251">
                                        <g id="g20253">
                                            <g id="_x30_.1.0.2.20.1">
                                                <g id="g20256" transform="translate(0 0)">
                                                    <g id="g20258">
                                                        <g id="g20260">
                                                            <g id="g20262">
                                                                <text id="_x30_.1.0.2.20.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A5</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.21" transform="translate(57.992 82.548)">
                            <g id="_x30_.1.0.2.21.0">
                                <g id="g20267" transform="translate(0 3.388) rotate(-90)">
                                    <g id="g20269" transform="translate(0 0)">
                                        <g id="g20271">
                                            <g id="g20273">
                                                <g id="_x30_.1.0.2.21.0.0">
                                                    <g id="g20276" transform="translate(0 0)">
                                                        <g id="g20278">
                                                            <g id="g20280">
                                                                <g id="g20282">
                                                                    <text id="_x30_.1.0.2.21.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">VIN</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.22" transform="translate(48.233 81.193)">
                            <g id="_x30_.1.0.2.22.0">
                                <g id="g20287" transform="translate(0 4.743) rotate(-90)">
                                    <g id="g20289" transform="translate(0 0)">
                                        <g id="g20291">
                                            <g id="g20293">
                                                <g id="_x30_.1.0.2.22.0.0">
                                                    <g id="g20296" transform="translate(0 0)">
                                                        <g id="g20298">
                                                            <g id="g20300">
                                                                <g id="g20302">
                                                                    <text id="_x30_.1.0.2.22.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">GND</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.23" transform="translate(52.973 81.167)">
                            <g id="_x30_.1.0.2.23.0">
                                <g id="g20307" transform="translate(0 4.743) rotate(-90)">
                                    <g id="g20309" transform="translate(0 0)">
                                        <g id="g20311">
                                            <g id="g20313">
                                                <g id="_x30_.1.0.2.23.0.0">
                                                    <g id="g20316" transform="translate(0 0)">
                                                        <g id="g20318">
                                                            <g id="g20320">
                                                                <g id="g20322">
                                                                    <text id="_x30_.1.0.2.23.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">GND</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.24" transform="translate(58.122 7.531)">
                            <g id="g20327" transform="translate(0 0)">
                                <g id="g20329" transform="translate(0 0)">
                                    <g id="g20331">
                                        <g id="g20333">
                                            <g id="_x30_.1.0.2.24.1">
                                                <g id="g20336" transform="translate(0 0)">
                                                    <g id="g20338">
                                                        <g id="g20340">
                                                            <g id="g20342">
                                                                <text id="_x30_.1.0.2.24.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">DIGITAL (PWM=</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g id="g20354" transform="translate(24.981 0)">
                                <g id="g20356" transform="translate(0 0)">
                                    <g id="g20358">
                                        <g id="g20360">
                                            <g id="_x30_.1.0.2.24.3">
                                                <g id="g20363" transform="translate(0 0)">
                                                    <g id="g20365">
                                                        <g id="g20367">
                                                            <g id="g20369">
                                                                <text id="_x30_.1.0.2.24.3.0" transform="translate(0 1)" fill="#fff" font-size="1" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">)</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.25" transform="translate(42.192 4.373)">
                            <g id="_x30_.1.0.2.25.0">
                                <g id="g20374" transform="translate(0 0)">
                                    <g id="g20376" transform="translate(0 0)">
                                        <g id="g20378">
                                            <g id="g20380">
                                                <g id="_x30_.1.0.2.25.0.0">
                                                    <g id="_x30_.1.0.2.25.0.0.0">
                                                        <g id="g20384" transform="translate(0 1.694) rotate(-90)">
                                                            <g id="g20386">
                                                                <g id="g20388">
                                                                    <g id="g20390">
                                                                        <g id="_x30_.1.0.2.25.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.25.0.0.0.0.0">
                                                                                <g id="_x30_.1.0.2.25.0.0.0.0.0.0">
                                                                                    <path id="_x30_.1.0.2.25.0.0.0.0.0.0.0" d="M0,.512C-.013.173.17,0,.4,0A1.061,1.061,0,0,1,.883.152,1.062,1.062,0,0,0,1.306.3c.123,0,.18-.1.184-.285h.2c.017.38-.18.512-.39.512A1.152,1.152,0,0,1,.811.373,1.037,1.037,0,0,0,.4.224c-.123,0-.2.085-.2.289Z" fill="#fff" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.26" transform="translate(37.163 4.373)">
                            <g id="_x30_.1.0.2.26.0">
                                <g id="g20398" transform="translate(0 0)">
                                    <g id="g20400" transform="translate(0 0)">
                                        <g id="g20402">
                                            <g id="g20404">
                                                <g id="_x30_.1.0.2.26.0.0">
                                                    <g id="_x30_.1.0.2.26.0.0.0">
                                                        <g id="g20408" transform="translate(0 1.694) rotate(-90)">
                                                            <g id="g20410">
                                                                <g id="g20412">
                                                                    <g id="g20414">
                                                                        <g id="_x30_.1.0.2.26.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.26.0.0.0.0.0">
                                                                                <g id="_x30_.1.0.2.26.0.0.0.0.0.0">
                                                                                    <path id="_x30_.1.0.2.26.0.0.0.0.0.0.0" d="M0,.512C-.013.173.17,0,.4,0A1.061,1.061,0,0,1,.883.152,1.062,1.062,0,0,0,1.306.3c.123,0,.18-.1.184-.285h.2c.017.38-.18.512-.39.512A1.152,1.152,0,0,1,.811.373,1.037,1.037,0,0,0,.4.224c-.123,0-.2.085-.2.289Z" fill="#fff" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.27" transform="translate(69.266 2.322)">
                            <g id="_x30_.1.0.2.27.0">
                                <g id="g20422" transform="translate(0)">
                                    <g id="g20424" transform="translate(0 0)">
                                        <g id="g20426">
                                            <g id="g20428">
                                                <g id="_x30_.1.0.2.27.0.0">
                                                    <g id="_x30_.1.0.2.27.0.0.0">
                                                        <g id="g20432" transform="translate(0 1.694) rotate(-90)">
                                                            <g id="g20434" transform="translate(0)">
                                                                <g id="g20436">
                                                                    <g id="g20438">
                                                                        <g id="_x30_.1.0.2.27.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.27.0.0.0.0.0">
                                                                                <g id="_x30_.1.0.2.27.0.0.0.0.0.0">
                                                                                    <path id="_x30_.1.0.2.27.0.0.0.0.0.0.0" d="M0,.512C-.013.172.17,0,.4,0A1.061,1.061,0,0,1,.883.152,1.056,1.056,0,0,0,1.306.3c.123,0,.18-.1.184-.286h.2c.017.381-.18.512-.39.512A1.145,1.145,0,0,1,.81.373,1.035,1.035,0,0,0,.4.224c-.122,0-.2.085-.2.289Z" fill="#fff" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.28" transform="translate(79.021 2.322)">
                            <g id="g20446" transform="translate(0)">
                                <g id="g20448" transform="translate(0 0)">
                                    <g id="g20450">
                                        <g id="g20452">
                                            <g id="_x30_.1.0.2.28.1">
                                                <g id="_x30_.1.0.2.28.1.0">
                                                    <g id="g20456" transform="translate(0 1.694) rotate(-90)">
                                                        <g id="g20458" transform="translate(0)">
                                                            <g id="g20460">
                                                                <g id="g20462">
                                                                    <g id="_x30_.1.0.2.28.1.0.0">
                                                                        <g id="_x30_.1.0.2.28.1.0.0.0">
                                                                            <g id="_x30_.1.0.2.28.1.0.0.0.0">
                                                                                <path id="_x30_.1.0.2.28.1.0.0.0.0.0" d="M0,.513C-.013.173.17,0,.4,0A1.047,1.047,0,0,1,.883.153,1.056,1.056,0,0,0,1.306.3c.123,0,.18-.1.184-.285h.2c.017.38-.18.512-.39.512A1.158,1.158,0,0,1,.81.374,1.04,1.04,0,0,0,.4.224c-.123,0-.2.085-.2.289Z" fill="#fff" />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.29" transform="translate(64.632 2.322)">
                            <g id="_x30_.1.0.2.29.0">
                                <g id="g20470" transform="translate(0)">
                                    <g id="g20472" transform="translate(0 0)">
                                        <g id="g20474">
                                            <g id="g20476">
                                                <g id="_x30_.1.0.2.29.0.0">
                                                    <g id="_x30_.1.0.2.29.0.0.0">
                                                        <g id="g20480" transform="translate(0 1.694) rotate(-90)">
                                                            <g id="g20482" transform="translate(0)">
                                                                <g id="g20484">
                                                                    <g id="g20486">
                                                                        <g id="_x30_.1.0.2.29.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.29.0.0.0.0.0">
                                                                                <g id="_x30_.1.0.2.29.0.0.0.0.0.0">
                                                                                    <path id="_x30_.1.0.2.29.0.0.0.0.0.0.0" d="M0,.512C-.013.172.17,0,.4,0A1.061,1.061,0,0,1,.883.152,1.056,1.056,0,0,0,1.306.3c.123,0,.18-.1.184-.286h.2c.017.38-.18.512-.39.512A1.145,1.145,0,0,1,.81.373,1.035,1.035,0,0,0,.4.224c-.122,0-.2.085-.2.289Z" fill="#fff" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.30" transform="translate(46.826 2.322)">
                            <g id="_x30_.1.0.2.30.0">
                                <g id="g20494" transform="translate(0)">
                                    <g id="g20496" transform="translate(0 0)">
                                        <g id="g20498">
                                            <g id="g20500">
                                                <g id="_x30_.1.0.2.30.0.0">
                                                    <g id="_x30_.1.0.2.30.0.0.0">
                                                        <g id="g20504" transform="translate(0 1.694) rotate(-90)">
                                                            <g id="g20506" transform="translate(0)">
                                                                <g id="g20508">
                                                                    <g id="g20510">
                                                                        <g id="_x30_.1.0.2.30.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.30.0.0.0.0.0">
                                                                                <g id="_x30_.1.0.2.30.0.0.0.0.0.0">
                                                                                    <path id="_x30_.1.0.2.30.0.0.0.0.0.0.0" d="M0,.512C-.013.173.17,0,.4,0A1.061,1.061,0,0,1,.883.152a1.054,1.054,0,0,0,.423.142c.123,0,.18-.1.184-.285h.2c.017.38-.18.512-.39.512A1.172,1.172,0,0,1,.81.373,1.042,1.042,0,0,0,.4.222c-.123,0-.2.085-.2.291Z" fill="#fff" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.31" transform="translate(33.635 24.404)">
                            <g id="_x30_.1.0.2.31.0">
                                <g id="g20519" transform="translate(0)">
                                    <g id="g20521" transform="translate(0 0)">
                                        <g id="g20523">
                                            <g id="g20525">
                                                <g id="_x30_.1.0.2.31.0.1">
                                                    <g id="g20528">
                                                        <g id="g20530">
                                                            <g id="g20532">
                                                                <g id="g20534">
                                                                    <text id="_x30_.1.0.2.31.0.1.0" transform="translate(0 4)" fill="#fff" font-size="4" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">Arduino</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g id="_x30_.1.0.2.31.1" transform="translate(20.314 0.95)">
                                <g id="g20539" transform="translate(0 0)">
                                    <g id="g20541" transform="translate(0 0)">
                                        <g id="g20543">
                                            <g id="g20545">
                                                <g id="_x30_.1.0.2.31.1.1">
                                                    <g id="g20548" transform="translate(0 0)">
                                                        <g id="g20550">
                                                            <g id="g20552">
                                                                <g id="g20554">
                                                                    <text id="_x30_.1.0.2.31.1.1.0" transform="translate(0 1)" fill="#fff" font-size="1" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">TM</tspan></text>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.32" transform="translate(28.998 79.569)">
                            <g id="_x30_.1.0.2.32.0">
                                <g id="g20559" transform="translate(0 0)">
                                    <g id="g20561" transform="translate(0 0)">
                                        <g id="g20563">
                                            <g id="g20565">
                                                <g id="_x30_.1.0.2.32.0.0">
                                                    <g id="_x30_.1.0.2.32.0.0.0">
                                                        <g id="g20569" transform="translate(0 6.098) rotate(-90)">
                                                            <g id="g20571" transform="translate(0)">
                                                                <g id="g20573">
                                                                    <g id="g20575">
                                                                        <g id="_x30_.1.0.2.32.0.0.0.0">
                                                                            <g id="_x30_.1.0.2.32.0.0.0.0.0">
                                                                                <g id="g20579" transform="translate(0 0)">
                                                                                    <g id="g20581">
                                                                                        <g id="g20583">
                                                                                            <g id="g20585">
                                                                                                <g id="_x30_.1.0.2.32.0.0.0.0.0.0">
                                                                                                    <g id="g20588" transform="translate(0 0)">
                                                                                                        <g id="g20590">
                                                                                                            <g id="g20592">
                                                                                                                <g id="g20594">
                                                                                                                    <text id="_x30_.1.0.2.32.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">IOREF</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.54" transform="translate(88.348 42.654)">
                            <g id="_x30_.1.0.2.54.1">
                                <g id="g20681" transform="translate(0 0)">
                                    <g id="g20683" transform="translate(0 0)">
                                        <g id="g20685">
                                            <g id="g20687">
                                                <g id="_x30_.1.0.2.54.1.1">
                                                    <g id="_x30_.1.0.2.54.1.1.0">
                                                        <g id="g20691" transform="translate(0 5.42) rotate(-90)">
                                                            <g id="g20693" transform="translate(0)">
                                                                <g id="g20695">
                                                                    <g id="g20697">
                                                                        <g id="_x30_.1.0.2.54.1.1.0.0">
                                                                            <g id="_x30_.1.0.2.54.1.1.0.0.0">
                                                                                <g id="g20701" transform="translate(0 0)">
                                                                                    <g id="g20703" transform="translate(0)">
                                                                                        <g id="g20705">
                                                                                            <g id="g20707">
                                                                                                <g id="_x30_.1.0.2.54.1.1.0.0.0.0">
                                                                                                    <g id="g20710" transform="translate(0 0)">
                                                                                                        <g id="g20712">
                                                                                                            <g id="g20714">
                                                                                                                <g id="g20716">
                                                                                                                    <text id="_x30_.1.0.2.54.1.1.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">ICSP</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.55" transform="translate(0 10.774)">
                            <g id="_x30_.1.0.2.55.1">
                                <g id="g20725">
                                    <g id="g20727">
                                        <g id="g20729">
                                            <g id="g20731">
                                                <g id="_x30_.1.0.2.55.1.1">
                                                    <g id="_x30_.1.0.2.55.1.1.0">
                                                        <g id="g20735" transform="translate(0 3.388) rotate(-90)">
                                                            <g id="g20737">
                                                                <g id="g20739">
                                                                    <g id="g20741">
                                                                        <g id="_x30_.1.0.2.55.1.1.0.0">
                                                                            <g id="_x30_.1.0.2.55.1.1.0.0.0">
                                                                                <g id="g20745" transform="translate(3.388 0) rotate(90)">
                                                                                    <g id="g20747" transform="translate(0 0)">
                                                                                        <g id="g20749">
                                                                                            <g id="g20751">
                                                                                                <g id="_x30_.1.0.2.55.1.1.0.0.0.0">
                                                                                                    <g id="g20754">
                                                                                                        <g id="g20756">
                                                                                                            <g id="g20758">
                                                                                                                <g id="g20760">
                                                                                                                    <text id="_x30_.1.0.2.55.1.1.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">ICSP2</tspan></text>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="_x30_.1.0.2.62" transform="translate(89.027 21.789)">
                            <g id="_x30_.1.0.2.62.1" transform="translate(0 0)">
                                <g id="g20793">
                                    <g id="g20795" transform="translate(0 0)">
                                        <g id="g20797">
                                            <g id="g20799">
                                                <g id="_x30_.1.0.2.62.1.1">
                                                    <text id="_x30_.1.0.2.62.1.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">ON</tspan></text>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <rect id="_x30_.1.0.6" width="9.603" height="9.603" transform="translate(33.492 31.053)" fill="#333" />
                    <rect id="_x30_.1.0.8" width="71.222" height="10.732" transform="translate(53.416 65.612)" fill="#333" />
                    <circle id="connector0pin" cx="1.091" cy="1.091" r="1.091" transform="translate(96.473 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.10" d="M160.361,140.295h2.183v5.019h-2.183v-5.019m0,2.51a1.09,1.09,0,0,0,2.181,0h0a1.09,1.09,0,1,0-2.181,0Z" transform="translate(-63.888 -45.241)" fill="#9a916c" />
                    <circle id="connector1pin" cx="1.091" cy="1.091" r="1.091" transform="translate(101.351 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.12" d="M167.561,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.09,1.09,0,0,0,2.18,0h0a1.09,1.09,0,1,0-2.18,0Z" transform="translate(-66.21 -45.241)" fill="#9a916c" />
                    <circle id="connector2pin" cx="1.091" cy="1.091" r="1.091" transform="translate(106.23 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.14" d="M174.76,140.295h2.183v5.019H174.76v-5.019m0,2.51a1.09,1.09,0,0,0,2.18,0h0a1.09,1.09,0,1,0-2.18,0Z" transform="translate(-68.532 -45.241)" fill="#9a916c" />
                    <circle id="connector3pin" cx="1.091" cy="1.091" r="1.091" transform="translate(111.109 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.16" d="M181.961,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.089,1.089,0,0,0,2.179,0h0a1.089,1.089,0,1,0-2.179,0Z" transform="translate(-70.854 -45.241)" fill="#9a916c" />
                    <circle id="connector4pin" cx="1.091" cy="1.091" r="1.091" transform="translate(115.986 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.18" d="M189.161,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.091,1.091,0,0,0,2.182,0h0a1.091,1.091,0,1,0-2.182,0Z" transform="translate(-73.176 -45.241)" fill="#9a916c" />
                    <circle id="connector5pin" cx="1.091" cy="1.091" r="1.091" transform="translate(120.864 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.20" d="M196.361,140.295h2.183v5.019h-2.183v-5.019m0,2.51a1.09,1.09,0,0,0,2.181,0h0a1.09,1.09,0,1,0-2.181,0Z" transform="translate(-75.497 -45.241)" fill="#9a916c" />
                    <circle id="connector39pin" cx="1.201" cy="1.201" r="1.201" transform="translate(120.999 42.703)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector40pin" cx="1.201" cy="1.201" r="1.201" transform="translate(125.877 42.703)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector41pin" cx="1.2" cy="1.2" r="1.2" transform="translate(121 47.582)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector42pin" cx="1.2" cy="1.2" r="1.2" transform="translate(125.877 47.582)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector43pin" cx="1.2" cy="1.2" r="1.2" transform="translate(121 52.46)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector44pin" cx="1.2" cy="1.2" r="1.2" transform="translate(125.877 52.46)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector45pin" cx="1.2" cy="1.2" r="1.2" transform="translate(38.801 10.02)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector46pin" cx="1.201" cy="1.201" r="1.201" transform="translate(38.801 14.897)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector47pin" cx="1.2" cy="1.2" r="1.2" transform="translate(33.923 10.02)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector48pin" cx="1.201" cy="1.201" r="1.201" transform="translate(33.923 14.897)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector49pin" cx="1.2" cy="1.2" r="1.2" transform="translate(29.044 10.02)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector50pin" cx="1.201" cy="1.201" r="1.201" transform="translate(29.044 14.897)" fill="none" stroke="#9a916c" stroke-width="0.85" />
                    <circle id="connector51pin" cx="1.091" cy="1.091" r="1.091" transform="translate(78.911 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.34" d="M134.441,3.5h2.183V8.515h-2.183V3.5m0,2.51a1.09,1.09,0,1,0,1.091-1.091A1.091,1.091,0,0,0,134.441,6.006Z" transform="translate(-55.53 -1.127)" fill="#9a916c" />
                    <circle id="connector52pin" cx="1.091" cy="1.091" r="1.091" transform="translate(74.034 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.36" d="M127.241,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.091,1.091,0,1,0,1.092-1.091A1.091,1.091,0,0,0,127.241,6.006Z" transform="translate(-53.208 -1.127)" fill="#9a916c" />
                    <circle id="connector53pin" cx="1.091" cy="1.091" r="1.091" transform="translate(69.155 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.38" d="M120.042,3.5h2.185V8.515h-2.185V3.5m0,2.51a1.091,1.091,0,1,0,1.09-1.091A1.093,1.093,0,0,0,120.042,6.006Z" transform="translate(-50.887 -1.127)" fill="#9a916c" />
                    <circle id="connector54pin" cx="1.091" cy="1.091" r="1.091" transform="translate(64.277 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.40" d="M112.84,3.5h2.182V8.515H112.84V3.5m0,2.51a1.089,1.089,0,1,0,1.091-1.091A1.092,1.092,0,0,0,112.84,6.006Z" transform="translate(-48.564 -1.127)" fill="#9a916c" />
                    <circle id="connector55pin" cx="1.091" cy="1.091" r="1.091" transform="translate(59.399 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.42" d="M105.641,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.089,1.089,0,1,0,1.09-1.091A1.091,1.091,0,0,0,105.641,6.006Z" transform="translate(-46.243 -1.127)" fill="#9a916c" />
                    <circle id="connector56pin" cx="1.091" cy="1.091" r="1.091" transform="translate(54.521 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.44" d="M98.441,3.5h2.182V8.515H98.441V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,98.441,6.006Z" transform="translate(-43.921 -1.127)" fill="#9a916c" />
                    <circle id="connector57pin" cx="1.091" cy="1.091" r="1.091" transform="translate(49.643 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.46" d="M91.241,3.5h2.182V8.515H91.241V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,91.241,6.006Z" transform="translate(-41.599 -1.127)" fill="#9a916c" />
                    <circle id="connector58pin" cx="1.091" cy="1.091" r="1.091" transform="translate(44.764 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.48" d="M84.042,3.5h2.182V8.515H84.042V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,84.042,6.006Z" transform="translate(-39.278 -1.127)" fill="#9a916c" />
                    <circle id="connector59pin" cx="1.091" cy="1.091" r="1.091" transform="translate(39.886 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.50" d="M76.841,3.5h2.182V8.515H76.841V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,76.841,6.006Z" transform="translate(-36.956 -1.127)" fill="#9a916c" />
                    <circle id="connector60pin" cx="1.091" cy="1.091" r="1.091" transform="translate(35.007 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.52" d="M69.641,3.5h2.182V8.515H69.641V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,69.641,6.006Z" transform="translate(-34.634 -1.127)" fill="#9a916c" />
                    <circle id="connector61pin" cx="1.091" cy="1.091" r="1.091" transform="translate(120.864 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.54" d="M196.361,3.5h2.183V8.515h-2.183V3.5m0,2.51a1.09,1.09,0,1,0,1.091-1.091A1.091,1.091,0,0,0,196.361,6.006Z" transform="translate(-75.497 -1.127)" fill="#9a916c" />
                    <circle id="connector62pin" cx="1.091" cy="1.091" r="1.091" transform="translate(115.986 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.56" d="M189.161,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,189.161,6.006Z" transform="translate(-73.176 -1.127)" fill="#9a916c" />
                    <circle id="connector63pin" cx="1.091" cy="1.091" r="1.091" transform="translate(111.109 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.58" d="M181.961,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.089,1.089,0,1,0,1.087-1.091A1.09,1.09,0,0,0,181.961,6.006Z" transform="translate(-70.854 -1.127)" fill="#9a916c" />
                    <circle id="connector64pin" cx="1.091" cy="1.091" r="1.091" transform="translate(106.23 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.60" d="M174.76,3.5h2.183V8.515H174.76V3.5m0,2.51a1.09,1.09,0,1,0,1.092-1.091A1.092,1.092,0,0,0,174.76,6.006Z" transform="translate(-68.532 -1.127)" fill="#9a916c" />
                    <circle id="connector65pin" cx="1.091" cy="1.091" r="1.091" transform="translate(101.351 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.62" d="M167.561,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.09,1.09,0,1,0,1.09-1.091A1.091,1.091,0,0,0,167.561,6.006Z" transform="translate(-66.21 -1.127)" fill="#9a916c" />
                    <circle id="connector66pin" cx="1.091" cy="1.091" r="1.091" transform="translate(96.473 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.64" d="M160.361,3.5h2.183V8.515h-2.183V3.5m0,2.51a1.09,1.09,0,1,0,1.091-1.091A1.091,1.091,0,0,0,160.361,6.006Z" transform="translate(-63.888 -1.127)" fill="#9a916c" />
                    <circle id="connector67pin" cx="1.091" cy="1.091" r="1.091" transform="translate(91.595 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.66" d="M153.161,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.091,1.091,0,1,0,1.091-1.091A1.091,1.091,0,0,0,153.161,6.006Z" transform="translate(-61.567 -1.127)" fill="#9a916c" />
                    <circle id="connector68pin" cx="1.091" cy="1.091" r="1.091" transform="translate(86.718 3.787)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.68" d="M145.961,3.5h2.182V8.515h-2.182V3.5m0,2.51a1.089,1.089,0,1,0,1.087-1.091A1.09,1.09,0,0,0,145.961,6.006Z" transform="translate(-59.245 -1.127)" fill="#9a916c" />
                    <circle id="connector84pin" cx="1.091" cy="1.091" r="1.091" transform="translate(57.448 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <circle id="connector91pin" cx="1.091" cy="1.091" r="1.091" transform="translate(52.569 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.71" d="M102.761,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.091,1.091,0,0,0,2.182,0h0a1.091,1.091,0,1,0-2.182,0Z" transform="translate(-45.314 -45.241)" fill="#9a916c" />
                    <path id="_x30_.1.0.72" d="M95.562,140.295h2.182v5.019H95.562v-5.019m0,2.51a1.091,1.091,0,0,0,2.182,0h0a1.091,1.091,0,1,0-2.182,0Z" transform="translate(-42.993 -45.241)" fill="#9a916c" />
                    <circle id="connector85pin" cx="1.091" cy="1.091" r="1.091" transform="translate(62.327 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.74" d="M109.961,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.089,1.089,0,0,0,2.179,0h0a1.089,1.089,0,1,0-2.179,0Z" transform="translate(-47.636 -45.241)" fill="#9a916c" />
                    <circle id="connector86pin" cx="1.091" cy="1.091" r="1.091" transform="translate(67.204 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.76" d="M117.161,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.091,1.091,0,0,0,2.182,0h0a1.091,1.091,0,1,0-2.182,0Z" transform="translate(-49.958 -45.241)" fill="#9a916c" />
                    <circle id="connector87pin" cx="1.091" cy="1.091" r="1.091" transform="translate(72.082 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.78" d="M124.361,140.295h2.183v5.019h-2.183v-5.019m0,2.51a1.09,1.09,0,0,0,2.181,0h0a1.09,1.09,0,1,0-2.181,0Z" transform="translate(-52.279 -45.241)" fill="#9a916c" />
                    <circle id="connector88pin" cx="1.091" cy="1.091" r="1.091" transform="translate(76.96 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.80" d="M131.561,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.09,1.09,0,0,0,2.18,0h0a1.09,1.09,0,1,0-2.18,0Z" transform="translate(-54.601 -45.241)" fill="#9a916c" />
                    <circle id="connector89pin" cx="1.091" cy="1.091" r="1.091" transform="translate(81.839 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.82" d="M138.76,140.295h2.183v5.019H138.76v-5.019m0,2.51a1.09,1.09,0,0,0,2.18,0h0a1.09,1.09,0,1,0-2.18,0Z" transform="translate(-56.923 -45.241)" fill="#9a916c" />
                    <circle id="connector90pin" cx="1.091" cy="1.091" r="1.091" transform="translate(86.718 96.473)" fill="none" stroke="#9a916c" stroke-width="0.811" />
                    <path id="_x30_.1.0.84" d="M145.961,140.295h2.182v5.019h-2.182v-5.019m0,2.51a1.089,1.089,0,0,0,2.179,0h0a1.089,1.089,0,1,0-2.179,0Z" transform="translate(-59.245 -45.241)" fill="#9a916c" />
                    <line id="_x30_.1.0.85" x2="72.435" transform="translate(50.694 19.757)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="0.864" />
                    <line id="_x30_.1.0.86" x2="26.855" transform="translate(96.274 85.508)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="0.864" />
                    <g id="_x30_.1.0.87" transform="translate(81.293 85.918)">
                        <g id="_x30_.1.0.87.0">
                            <g id="g20983" transform="translate(0 0)">
                                <g id="g20985" transform="translate(0 0)">
                                    <g id="g20987">
                                        <g id="g20989">
                                            <g id="_x30_.1.0.87.0.0">
                                                <g id="g20992" transform="translate(0 0)">
                                                    <g id="g20994">
                                                        <g id="g20996">
                                                            <g id="g20998">
                                                                <text id="_x30_.1.0.87.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">POWER</tspan></text>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <line id="_x30_.1.0.88" x2="24.332" transform="translate(65.856 85.508)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="0.864" />
                    <g id="_x30_.1.0.89" transform="translate(120.434 8.591)">
                        <g id="_x30_.1.0.89.0">
                            <g id="g21004" transform="translate(0 0)">
                                <g id="g21006" transform="translate(0 0)">
                                    <g id="g21008">
                                        <g id="g21010">
                                            <g id="_x30_.1.0.89.0.0">
                                                <g id="_x30_.1.0.89.0.0.0">
                                                    <g id="g21014" transform="translate(0 1.355) rotate(-90)">
                                                        <g id="g21016">
                                                            <g id="g21018">
                                                                <g id="g21020">
                                                                    <g id="_x30_.1.0.89.0.0.0.0">
                                                                        <g id="_x30_.1.0.89.0.0.0.0.0">
                                                                            <g id="g21024" transform="translate(0 0)">
                                                                                <g id="g21026" transform="translate(0)">
                                                                                    <g id="g21028">
                                                                                        <g id="g21030">
                                                                                            <g id="_x30_.1.0.89.0.0.0.0.0.0">
                                                                                                <g id="g21033" transform="translate(0)">
                                                                                                    <g id="g21035">
                                                                                                        <g id="g21037">
                                                                                                            <g id="g21039">
                                                                                                                <text id="_x30_.1.0.89.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">0</tspan></text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="_x30_.1.0.90" transform="translate(115.557 8.591)">
                        <g id="_x30_.1.0.90.0">
                            <g id="g21044" transform="translate(0 0)">
                                <g id="g21046" transform="translate(0 0)">
                                    <g id="g21048">
                                        <g id="g21050">
                                            <g id="_x30_.1.0.90.0.0">
                                                <g id="_x30_.1.0.90.0.0.0">
                                                    <g id="g21054" transform="translate(0 1.355) rotate(-90)">
                                                        <g id="g21056">
                                                            <g id="g21058">
                                                                <g id="g21060">
                                                                    <g id="_x30_.1.0.90.0.0.0.0">
                                                                        <g id="_x30_.1.0.90.0.0.0.0.0">
                                                                            <g id="g21064" transform="translate(0 0)">
                                                                                <g id="g21066" transform="translate(0)">
                                                                                    <g id="g21068">
                                                                                        <g id="g21070">
                                                                                            <g id="_x30_.1.0.90.0.0.0.0.0.0">
                                                                                                <g id="g21073" transform="translate(0)">
                                                                                                    <g id="g21075">
                                                                                                        <g id="g21077">
                                                                                                            <g id="g21079">
                                                                                                                <text id="_x30_.1.0.90.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">1</tspan></text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="_x30_.1.0.91" transform="translate(115.557 14.524)">
                        <g id="_x30_.1.0.91.0">
                            <g id="g21084" transform="translate(0)">
                                <g id="g21086" transform="translate(0)">
                                    <g id="g21088">
                                        <g id="g21090">
                                            <g id="_x30_.1.0.91.0.0">
                                                <g id="_x30_.1.0.91.0.0.0">
                                                    <g id="g21094" transform="translate(0 4.065) rotate(-90)">
                                                        <g id="g21096" transform="translate(0)">
                                                            <g id="g21098">
                                                                <g id="g21100">
                                                                    <g id="_x30_.1.0.91.0.0.0.0">
                                                                        <g id="_x30_.1.0.91.0.0.0.0.0">
                                                                            <g id="g21104" transform="translate(0 0)">
                                                                                <g id="g21106" transform="translate(0)">
                                                                                    <g id="g21108">
                                                                                        <g id="g21110">
                                                                                            <g id="_x30_.1.0.91.0.0.0.0.0.0">
                                                                                                <g id="g21113" transform="translate(0)">
                                                                                                    <g id="g21115">
                                                                                                        <g id="g21117">
                                                                                                            <g id="g21119">
                                                                                                                <text id="_x30_.1.0.91.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">TX0</tspan></text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="_x30_.1.0.92" transform="translate(120.434 14.524)">
                        <g id="_x30_.1.0.92.0">
                            <g id="g21124" transform="translate(0)">
                                <g id="g21126" transform="translate(0)">
                                    <g id="g21128">
                                        <g id="g21130">
                                            <g id="_x30_.1.0.92.0.0">
                                                <g id="_x30_.1.0.92.0.0.0">
                                                    <g id="g21134" transform="translate(0 4.065) rotate(-90)">
                                                        <g id="g21136" transform="translate(0)">
                                                            <g id="g21138">
                                                                <g id="g21140">
                                                                    <g id="_x30_.1.0.92.0.0.0.0">
                                                                        <g id="_x30_.1.0.92.0.0.0.0.0">
                                                                            <g id="g21144" transform="translate(0 0)">
                                                                                <g id="g21146" transform="translate(0)">
                                                                                    <g id="g21148">
                                                                                        <g id="g21150">
                                                                                            <g id="_x30_.1.0.92.0.0.0.0.0.0">
                                                                                                <g id="g21153" transform="translate(0)">
                                                                                                    <g id="g21155">
                                                                                                        <g id="g21157">
                                                                                                            <g id="g21159">
                                                                                                                <text id="_x30_.1.0.92.0.0.0.0.0.0.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">RX0</tspan></text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="_x30_.1.0.93" transform="translate(116.427 10.76)">
                        <path id="_x30_.1.0.93.0" d="M191.369,17.321h-1.327a.228.228,0,0,1-.2-.121.223.223,0,0,1,.012-.235l.663-.989a.238.238,0,0,1,.381,0l.63.944a.229.229,0,0,1-.158.4Z" transform="translate(-189.813 -15.881)" fill="#fff" />
                    </g>
                    <g id="_x30_.1.0.94" transform="translate(121.341 10.759)">
                        <path id="_x30_.1.0.94.0" d="M197.3,15.88h1.325a.235.235,0,0,1,.2.121.219.219,0,0,1-.014.236l-.659.989a.238.238,0,0,1-.381,0l-.63-.946a.227.227,0,0,1-.077-.171A.234.234,0,0,1,197.3,15.88Z" transform="translate(-197.066 -15.88)" fill="#fff" />
                    </g>
                    <g id="_x30_.1.0.95" transform="translate(109.711 17.136)">
                        <path id="_x30_.1.0.95.0" d="M179.9,25.854c-.014-.372.185-.562.442-.562a1.173,1.173,0,0,1,.524.167,1.144,1.144,0,0,0,.465.156c.134,0,.2-.108.2-.312h.223c.018.417-.2.562-.428.562a1.253,1.253,0,0,1-.54-.164,1.14,1.14,0,0,0-.446-.164c-.134,0-.215.094-.223.316Z" transform="translate(-179.9 -25.292)" fill="#fff" />
                    </g>
                    <g id="_x30_.1.0.96" transform="translate(61.418 21.532)">
                        <g id="_x30_.1.0.96.0">
                            <g id="_x30_.1.0.96.0.0">
                                <path id="_x30_.1.0.96.0.0.0" d="M120.3,35.363c.575-.63,1.015-1.2,1.545-1.679,2.01-1.8,4.273-2.467,6.864-1.375a5.461,5.461,0,0,1,3.244,6.193,5.669,5.669,0,0,1-5.328,4.322,6.773,6.773,0,0,1-5.562-2.665c-.224-.261-.438-.533-.72-.879-.2.238-.361.419-.514.609a6.9,6.9,0,0,1-6.13,2.927,5.691,5.691,0,0,1-5.068-5.082,5.572,5.572,0,0,1,5.713-5.941,6.758,6.758,0,0,1,5.449,2.928c.15.194.3.388.507.644Z" transform="translate(-108.623 -31.78)" fill="#fff" />
                                <path id="_x30_.1.0.96.0.0.1" d="M115.511,34.457a4.041,4.041,0,0,0-4.29,3.478,3.84,3.84,0,0,0,3.115,3.893,4.405,4.405,0,0,0,4.5-1.732c1.733-2.082,1.671-1.722.021-3.788A4.7,4.7,0,0,0,115.511,34.457Z" transform="translate(-109.456 -32.643)" fill="#0f7391" />
                                <path id="_x30_.1.0.96.0.0.2" d="M132.514,34.434a5.274,5.274,0,0,0-4.92,3.5.621.621,0,0,0,0,.513,6.516,6.516,0,0,0,3.623,3.28,3.81,3.81,0,0,0,4.228-1.176,3.309,3.309,0,0,0,.577-3.875,3.927,3.927,0,0,0-3.506-2.239Z" transform="translate(-114.722 -32.636)" fill="#0f7391" />
                            </g>
                            <g id="_x30_.1.0.96.0.1" transform="translate(4.053 4.81)">
                                <path id="_x30_.1.0.96.0.1.0" d="M118.3,40.034a.1.1,0,0,1-.1.1h-3.5a.1.1,0,0,1-.1-.1V38.976a.1.1,0,0,1,.1-.1h3.5a.1.1,0,0,1,.1.1Z" transform="translate(-114.605 -38.88)" fill="#fff" />
                            </g>
                            <g id="_x30_.1.0.96.0.2" transform="translate(15.61 3.589)">
                                <path id="_x30_.1.0.96.0.2.0" d="M135.366,38.4a.1.1,0,0,0-.1-.1h-1.031a.1.1,0,0,1-.1-.1V37.173a.1.1,0,0,0-.1-.1h-1.059a.1.1,0,0,0-.1.1V38.2a.1.1,0,0,1-.1.1h-1.031a.1.1,0,0,0-.1.1v1.058a.1.1,0,0,0,.1.1h1.031a.1.1,0,0,1,.1.1v1.03a.1.1,0,0,0,.1.1h1.059a.1.1,0,0,0,.1-.1v-1.03a.1.1,0,0,1,.1-.1h1.031a.1.1,0,0,0,.1-.1Z" transform="translate(-131.663 -37.077)" fill="#fff" />
                            </g>
                            <g id="_x30_.1.0.96.0.3" transform="translate(30.337 0.118)">
                                <circle id="_x30_.1.0.96.0.3.0" cx="0.385" cy="0.385" r="0.385" transform="translate(12.481)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.1" cx="0.385" cy="0.385" r="0.385" transform="translate(11.521)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.2" cx="0.385" cy="0.385" r="0.385" transform="translate(10.561)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.3" cx="0.385" cy="0.385" r="0.385" transform="translate(9.601)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.4" cx="0.385" cy="0.385" r="0.385" transform="translate(8.641)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.5" cx="0.385" cy="0.385" r="0.385" transform="translate(7.68)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.6" cx="0.385" cy="0.385" r="0.385" transform="translate(6.72)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.7" cx="0.385" cy="0.385" r="0.385" transform="translate(5.76)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.8" cx="0.385" cy="0.385" r="0.385" transform="translate(4.8)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.9" cx="0.385" cy="0.385" r="0.385" transform="translate(3.84)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.10" cx="0.385" cy="0.385" r="0.385" transform="translate(2.879)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.11" cx="0.385" cy="0.385" r="0.385" transform="translate(1.92)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.12" cx="0.385" cy="0.385" r="0.385" transform="translate(0.959)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.3.13" cx="0.385" cy="0.385" r="0.385" fill="#fff" />
                            </g>
                            <g id="_x30_.1.0.96.0.4" transform="translate(41.868 0.118)">
                                <circle id="_x30_.1.0.96.0.4.0" cx="0.384" cy="0.384" r="0.384" transform="translate(0.989 10.084)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.1" cx="0.384" cy="0.384" r="0.384" transform="translate(1.902 9.903)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.2" cx="0.385" cy="0.385" r="0.385" transform="translate(2.768 9.557)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.3" cx="0.384" cy="0.384" r="0.384" transform="translate(3.556 9.061)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.4" cx="0.385" cy="0.385" r="0.385" transform="translate(4.238 8.426)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.5" cx="0.384" cy="0.384" r="0.384" transform="translate(4.794 7.679)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.6" cx="0.384" cy="0.384" r="0.384" transform="translate(5.203 6.842)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.7" cx="0.384" cy="0.384" r="0.384" transform="translate(5.452 5.945)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.8" cx="0.384" cy="0.384" r="0.384" transform="translate(5.533 5.016)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.9" cx="0.384" cy="0.384" r="0.384" transform="translate(5.442 4.09)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.10" cx="0.384" cy="0.384" r="0.384" transform="translate(5.182 3.195)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.11" cx="0.384" cy="0.384" r="0.384" transform="translate(4.764 2.363)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.12" cx="0.384" cy="0.384" r="0.384" transform="translate(4.201 1.621)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.13" cx="0.385" cy="0.385" r="0.385" transform="translate(3.51 0.995)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.14" cx="0.385" cy="0.385" r="0.385" transform="translate(2.718 0.506)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.15" cx="0.385" cy="0.385" r="0.385" transform="translate(1.848 0.171)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.16" cx="0.385" cy="0.385" r="0.385" transform="translate(0.932)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.4.17" cx="0.385" cy="0.385" r="0.385" fill="#fff" />
                            </g>
                            <g id="_x30_.1.0.96.0.5" transform="translate(24.84 0.118)">
                                <circle id="_x30_.1.0.96.0.5.0" cx="0.385" cy="0.385" r="0.385" transform="translate(4.445 10.019)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.1" cx="0.385" cy="0.385" r="0.385" transform="translate(3.543 9.827)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.2" cx="0.385" cy="0.385" r="0.385" transform="translate(2.691 9.475)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.3" cx="0.385" cy="0.385" r="0.385" transform="translate(1.918 8.973)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.4" cx="0.385" cy="0.385" r="0.385" transform="translate(1.249 8.338)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.5" cx="0.385" cy="0.385" r="0.385" transform="translate(0.707 7.592)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.6" cx="0.385" cy="0.385" r="0.385" transform="translate(0.311 6.76)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.7" cx="0.385" cy="0.385" r="0.385" transform="translate(0.072 5.869)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.8" cx="0.385" cy="0.385" r="0.385" transform="translate(0 4.951)" fill="#fff" />
                                <path id="_x30_.1.0.96.0.5.9" d="M145.852,37.91a.385.385,0,1,1-.423.341.385.385,0,0,1,.423-.341Z" transform="translate(-145.331 -33.874)" fill="#fff" />
                                <path id="_x30_.1.0.96.0.5.10" d="M146.308,36.618a.385.385,0,1,1-.478.259A.386.386,0,0,1,146.308,36.618Z" transform="translate(-145.456 -33.453)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.11" cx="0.385" cy="0.385" r="0.385" transform="translate(0.776 2.329)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.12" cx="0.385" cy="0.385" r="0.385" transform="translate(1.337 1.597)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.13" cx="0.385" cy="0.385" r="0.385" transform="translate(2.021 0.98)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.14" cx="0.385" cy="0.385" r="0.385" transform="translate(2.809 0.499)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.15" cx="0.385" cy="0.385" r="0.385" transform="translate(3.669 0.168)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.16" cx="0.385" cy="0.385" r="0.385" transform="translate(4.575)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.5.17" cx="0.385" cy="0.385" r="0.385" transform="translate(5.497)" fill="#fff" />
                            </g>
                            <g id="_x30_.1.0.96.0.6" transform="translate(30.337 10.235)">
                                <circle id="_x30_.1.0.96.0.6.0" cx="0.385" cy="0.385" r="0.385" transform="translate(12.481)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.1" cx="0.385" cy="0.385" r="0.385" transform="translate(11.521)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.2" cx="0.385" cy="0.385" r="0.385" transform="translate(10.561)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.3" cx="0.385" cy="0.385" r="0.385" transform="translate(9.601)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.4" cx="0.385" cy="0.385" r="0.385" transform="translate(8.641)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.5" cx="0.385" cy="0.385" r="0.385" transform="translate(7.68)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.6" cx="0.385" cy="0.385" r="0.385" transform="translate(6.72)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.7" cx="0.385" cy="0.385" r="0.385" transform="translate(5.76)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.8" cx="0.385" cy="0.385" r="0.385" transform="translate(4.8)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.9" cx="0.385" cy="0.385" r="0.385" transform="translate(3.84)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.10" cx="0.385" cy="0.385" r="0.385" transform="translate(2.879)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.11" cx="0.385" cy="0.385" r="0.385" transform="translate(1.92)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.12" cx="0.385" cy="0.385" r="0.385" transform="translate(0.959)" fill="#fff" />
                                <circle id="_x30_.1.0.96.0.6.13" cx="0.385" cy="0.385" r="0.385" fill="#fff" />
                            </g>
                        </g>
                        <g id="_x30_.1.0.96.1" transform="translate(28.57 2.27)">
                            <path id="_x30_.1.0.96.1.0" d="M153.077,41.59a2.355,2.355,0,0,1-1.52-.419,1.81,1.81,0,0,1-.634-.972,4.18,4.18,0,0,1-.1-.609c-.018-.216-.03-.448-.03-.694V35.349h.636v3.537a2.65,2.65,0,0,0,.388,1.692,1.534,1.534,0,0,0,1.127.381,1.906,1.906,0,0,0,1.268-.381,2.656,2.656,0,0,0,.388-1.692V35.349h.65V38.9a4,4,0,0,1-.255,1.642,1.852,1.852,0,0,1-1.914,1.052Z" transform="translate(-150.79 -35.201)" fill="#fff" />
                            <path id="_x30_.1.0.96.1.1" d="M164.16,41.475h-.64l-3.213-5.036v5.045h-.54V35.349h.6l3.157,5.051V35.349h.64Z" transform="translate(-153.685 -35.201)" fill="#fff" />
                            <path id="_x30_.1.0.96.1.2" d="M170.629,35.131a2.465,2.465,0,0,1,1.931.9,3.059,3.059,0,0,1,.554,1.028,4.543,4.543,0,0,1,0,2.665,3.128,3.128,0,0,1-.554,1.031,2.453,2.453,0,0,1-1.931.9,2.459,2.459,0,0,1-1.938-.9,3.079,3.079,0,0,1-.558-1.031,4.558,4.558,0,0,1,0-2.665,3.065,3.065,0,0,1,.558-1.028,2.471,2.471,0,0,1,1.938-.9Zm0,5.8a1.713,1.713,0,0,0,.769-.173,1.74,1.74,0,0,0,.607-.5,2.452,2.452,0,0,0,.4-.8,4.087,4.087,0,0,0,0-2.143,2.463,2.463,0,0,0-.4-.8,1.7,1.7,0,0,0-.6-.5,1.727,1.727,0,0,0-.762-.171,1.756,1.756,0,0,0-.773.171,1.722,1.722,0,0,0-.613.5,2.435,2.435,0,0,0-.4.8,4.024,4.024,0,0,0,0,2.146,2.439,2.439,0,0,0,.4.8,1.746,1.746,0,0,0,.607.5,1.718,1.718,0,0,0,.771.174Z" transform="translate(-156.318 -35.131)" fill="#fff" />
                        </g>
                    </g>
                </g>
                <g id="g21250" transform="translate(107.17 95.125)">
                    <g id="g21252" transform="translate(0 0)">
                        <g id="g21254">
                            <g id="g21256">
                                <g id="_x30_.1.1">
                                    <g id="_x31_x06">
                                        <rect id="_x30_.1.1.0.0" width="29.269" height="4.878" fill="#404040" />
                                        <rect id="_x30_.1.1.0.1" width="1.884" height="1.886" transform="translate(1.497 1.497)" />
                                        <path id="_x30_.1.1.0.2" d="M1.9.956,2.6,1.65H4.486L5.179.956Z" transform="translate(-1.103 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.1.0.3" d="M6.407.956l-.693.7V3.537l.693.693Z" transform="translate(-2.332 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.1.0.4" d="M5.179,5.459l-.694-.693H2.6L1.9,5.459Z" transform="translate(-1.103 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.1.0.5" d="M1.9,4.23l.7-.694V1.65L1.9.956Z" transform="translate(-1.103 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.1.0.6" width="1.884" height="1.886" transform="translate(6.376 1.497)" />
                                        <path id="_x30_.1.1.0.7" d="M9.1.956l.7.694h1.884l.694-.694Z" transform="translate(-3.425 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.1.0.8" d="M13.605.956l-.694.7V3.537l.694.693Z" transform="translate(-4.653 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.1.0.9" d="M12.378,5.459l-.694-.693H9.8l-.7.693Z" transform="translate(-3.425 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.1.0.10" d="M9.1,4.23l.7-.694V1.65L9.1.956Z" transform="translate(-3.424 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.1.0.11" width="1.884" height="1.886" transform="translate(11.253 1.497)" />
                                        <path id="_x30_.1.1.0.12" d="M16.306.956,17,1.65h1.886l.7-.694Z" transform="translate(-5.747 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.1.0.13" d="M20.807.956l-.7.7V3.537l.7.693Z" transform="translate(-6.975 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.1.0.14" d="M19.58,5.459l-.7-.693H17l-.693.693Z" transform="translate(-5.747 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.1.0.15" d="M16.3,4.23,17,3.536V1.65L16.3.956Z" transform="translate(-5.747 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.1.0.16" width="1.884" height="1.886" transform="translate(16.132 1.497)" />
                                        <path id="_x30_.1.1.0.17" d="M23.507.956l.693.694h1.886l.7-.694Z" transform="translate(-8.07 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.1.0.18" d="M28.008.956l-.7.7V3.537l.7.693Z" transform="translate(-9.297 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.1.0.19" d="M26.779,5.459l-.7-.693H24.2l-.693.693Z" transform="translate(-8.07 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.1.0.20" d="M23.5,4.23l.7-.694V1.65L23.5.956Z" transform="translate(-8.068 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.1.0.21" width="1.883" height="1.886" transform="translate(21.009 1.497)" />
                                        <path id="_x30_.1.1.0.22" d="M30.706.956l.693.694h1.886L33.98.956Z" transform="translate(-10.391 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.1.0.23" d="M35.207.956l-.694.7V3.537l.694.693Z" transform="translate(-11.619 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.1.0.24" d="M33.978,5.459l-.693-.693H31.4l-.693.693Z" transform="translate(-10.391 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.1.0.25" d="M30.7,4.23l.694-.694V1.65L30.7.956Z" transform="translate(-10.39 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.1.0.26" width="1.884" height="1.886" transform="translate(25.888 1.497)" />
                                        <path id="_x30_.1.1.0.27" d="M37.9.956l.694.694h1.887l.693-.694Z" transform="translate(-12.712 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.1.0.28" d="M42.407.956l-.693.7V3.537l.693.693Z" transform="translate(-13.941 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.1.0.29" d="M41.179,5.459l-.694-.693H38.6l-.694.693Z" transform="translate(-12.712 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.1.0.30" d="M37.9,4.23l.7-.694V1.65L37.9.956Z" transform="translate(-12.712 -0.154)" fill="#373737" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21291" transform="translate(131.861 41.53)">
                    <g id="g21293" transform="translate(0)">
                        <g id="g21295">
                            <g id="g21297">
                                <g id="_x30_.1.2">
                                    <g id="_x32_x03">
                                        <g id="g21301" transform="translate(0 14.44) rotate(-90)">
                                            <g id="g21303" transform="translate(0 0)">
                                                <g id="g21305">
                                                    <g id="g21307">
                                                        <g id="_x30_.1.2.0.0">
                                                            <g id="_x30_.1.2.0.0.0">
                                                                <g id="_x30_.1.2.0.0.0.0">
                                                                    <path id="_x30_.1.2.0.0.0.0.0" d="M4.71,8.617V1.024L3.686,0H1.023L0,1.024V8.617L1.023,9.641H3.686Z" transform="translate(9.73)" fill="#404040" />
                                                                    <path id="_x30_.1.2.0.0.0.0.1" d="M4.712,8.617V1.024L3.69,0H1.026L0,1.024V8.617L1.026,9.641H3.69Z" transform="translate(4.862)" fill="#404040" />
                                                                    <path id="_x30_.1.2.0.0.0.0.2" d="M4.712,8.617V1.024L3.687,0H1.021L0,1.024V8.617L1.021,9.641H3.687Z" fill="#404040" />
                                                                    <path id="_x30_.1.2.0.0.0.0.3" d="M4.71,8.617V1.024L3.686,0H1.023L0,1.024V8.617L1.023,9.641H3.686Z" transform="translate(9.73)" fill="#404040" />
                                                                    <path id="_x30_.1.2.0.0.0.0.4" d="M4.712,8.617V1.024L3.69,0H1.026L0,1.024V8.617L1.026,9.641H3.69Z" transform="translate(4.862)" fill="#404040" />
                                                                    <path id="_x30_.1.2.0.0.0.0.5" d="M4.712,8.617V1.024L3.687,0H1.021L0,1.024V8.617L1.021,9.641H3.687Z" fill="#404040" />
                                                                    <g id="g21318" transform="translate(1.669 3.188) rotate(-90)">
                                                                        <g id="g21320" transform="translate(0 0)">
                                                                            <g id="g21322">
                                                                                <g id="g21324">
                                                                                    <g id="_x30_.1.2.0.0.0.0.6">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.6.0" width="1.557" height="1.558" transform="translate(0)" fill="#8d8c8c" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21328" transform="translate(1.67 8.064) rotate(-90)">
                                                                        <g id="g21330" transform="translate(0 0)">
                                                                            <g id="g21332">
                                                                                <g id="g21334">
                                                                                    <g id="_x30_.1.2.0.0.0.0.7">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.7.0" width="1.556" height="1.558" transform="translate(0 0)" fill="#8d8c8c" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21338" transform="translate(6.548 3.188) rotate(-90)">
                                                                        <g id="g21340">
                                                                            <g id="g21342">
                                                                                <g id="g21344">
                                                                                    <g id="_x30_.1.2.0.0.0.0.8">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.8.0" width="1.558" height="1.557" fill="#8d8c8c" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21348" transform="translate(6.548 8.065) rotate(-90)">
                                                                        <g id="g21350" transform="translate(0)">
                                                                            <g id="g21352">
                                                                                <g id="g21354">
                                                                                    <g id="_x30_.1.2.0.0.0.0.9">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.9.0" width="1.556" height="1.557" transform="translate(0 0)" fill="#8d8c8c" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21358" transform="translate(11.425 3.186) rotate(-90)">
                                                                        <g id="g21360" transform="translate(0)">
                                                                            <g id="g21362">
                                                                                <g id="g21364">
                                                                                    <g id="_x30_.1.2.0.0.0.0.10">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.10.0" width="1.556" height="1.557" fill="#8d8c8c" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21368" transform="translate(11.425 8.064) rotate(-90)">
                                                                        <g id="g21370" transform="translate(0)">
                                                                            <g id="g21372">
                                                                                <g id="g21374">
                                                                                    <g id="_x30_.1.2.0.0.0.0.11">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.11.0" width="1.556" height="1.557" transform="translate(0 0)" fill="#8d8455" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21378" transform="translate(11.802 7.689) rotate(-90)">
                                                                        <g id="g21380" transform="translate(0)">
                                                                            <g id="g21382">
                                                                                <g id="g21384">
                                                                                    <g id="_x30_.1.2.0.0.0.0.12">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.12.0" width="0.803" height="0.802" fill="#8c8663" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.2.0.0.0.0.13" d="M.379,0,0,.378v.8l.379.379Z" transform="translate(12.602 6.508)" fill="#b8af82" />
                                                                    <path id="_x30_.1.2.0.0.0.0.14" d="M.378,0h.8l.379.379H0Z" transform="translate(11.424 7.685)" fill="#80795b" />
                                                                    <path id="_x30_.1.2.0.0.0.0.15" d="M.378.378v.8L0,1.557V0Z" transform="translate(11.424 6.508)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.2.0.0.0.0.16" d="M1.556,0,1.178.378h-.8L0,0Z" transform="translate(11.424 6.508)" fill="#9a916c" />
                                                                    <g id="g21392" transform="translate(11.803 2.81) rotate(-90)">
                                                                        <g id="g21394" transform="translate(0)">
                                                                            <g id="g21396">
                                                                                <g id="g21398">
                                                                                    <g id="_x30_.1.2.0.0.0.0.17">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.17.0" width="0.803" height="0.802" transform="translate(0 0)" fill="#8c8663" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.2.0.0.0.0.18" d="M.379,0,0,.377v.8l.379.378Z" transform="translate(12.602 1.631)" fill="#b8af82" />
                                                                    <path id="_x30_.1.2.0.0.0.0.19" d="M.378,0h.8l.379.378H0Z" transform="translate(11.424 2.808)" fill="#80795b" />
                                                                    <path id="_x30_.1.2.0.0.0.0.20" d="M.378.377v.8L0,1.555V0Z" transform="translate(11.424 1.631)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.2.0.0.0.0.21" d="M1.556,0,1.178.377h-.8L0,0Z" transform="translate(11.424 1.631)" fill="#9a916c" />
                                                                    <g id="g21406" transform="translate(6.926 7.688) rotate(-90)">
                                                                        <g id="g21408">
                                                                            <g id="g21410">
                                                                                <g id="g21412">
                                                                                    <g id="_x30_.1.2.0.0.0.0.22">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.22.0" width="0.803" height="0.802" transform="translate(0)" fill="#8c8663" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.2.0.0.0.0.23" d="M.377,0,0,.378v.8l.377.379Z" transform="translate(7.727 6.508)" fill="#b8af82" />
                                                                    <path id="_x30_.1.2.0.0.0.0.24" d="M.377,0h.8l.377.379H0Z" transform="translate(6.548 7.685)" fill="#80795b" />
                                                                    <path id="_x30_.1.2.0.0.0.0.25" d="M.377.378v.8L0,1.557V0Z" transform="translate(6.548 6.508)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.2.0.0.0.0.26" d="M1.556,0,1.179.378h-.8L0,0Z" transform="translate(6.548 6.508)" fill="#9a916c" />
                                                                    <g id="g21420" transform="translate(6.924 2.809) rotate(-90)">
                                                                        <g id="g21422" transform="translate(0)">
                                                                            <g id="g21424">
                                                                                <g id="g21426">
                                                                                    <g id="_x30_.1.2.0.0.0.0.27">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.27.0" width="0.803" height="0.802" transform="translate(0 0)" fill="#8c8663" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.2.0.0.0.0.28" d="M.377,0,0,.377v.8l.377.378Z" transform="translate(7.727 1.631)" fill="#b8af82" />
                                                                    <path id="_x30_.1.2.0.0.0.0.29" d="M.377,0h.8l.377.378H0Z" transform="translate(6.548 2.808)" fill="#80795b" />
                                                                    <path id="_x30_.1.2.0.0.0.0.30" d="M.377.377v.8L0,1.555V0Z" transform="translate(6.548 1.631)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.2.0.0.0.0.31" d="M1.556,0,1.179.377h-.8L0,0Z" transform="translate(6.548 1.631)" fill="#9a916c" />
                                                                    <g id="g21434" transform="translate(2.045 7.688) rotate(-90)">
                                                                        <g id="g21436">
                                                                            <g id="g21438">
                                                                                <g id="g21440">
                                                                                    <g id="_x30_.1.2.0.0.0.0.32">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.32.0" width="0.802" height="0.803" fill="#8c8663" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.2.0.0.0.0.33" d="M.377,0,0,.378v.8l.377.379Z" transform="translate(2.848 6.508)" fill="#b8af82" />
                                                                    <path id="_x30_.1.2.0.0.0.0.34" d="M.376,0h.8l.377.379H0Z" transform="translate(1.669 7.685)" fill="#80795b" />
                                                                    <path id="_x30_.1.2.0.0.0.0.35" d="M.376.378v.8L0,1.557V0Z" transform="translate(1.669 6.508)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.2.0.0.0.0.36" d="M1.556,0,1.179.378h-.8L0,0Z" transform="translate(1.669 6.508)" fill="#9a916c" />
                                                                    <g id="g21448" transform="translate(2.045 2.809) rotate(-90)">
                                                                        <g id="g21450" transform="translate(0)">
                                                                            <g id="g21452">
                                                                                <g id="g21454">
                                                                                    <g id="_x30_.1.2.0.0.0.0.37">
                                                                                        <rect id="_x30_.1.2.0.0.0.0.37.0" width="0.802" height="0.804" fill="#8c8663" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.2.0.0.0.0.38" d="M.377,0,0,.377v.8l.377.379Z" transform="translate(2.848 1.631)" fill="#b8af82" />
                                                                    <path id="_x30_.1.2.0.0.0.0.39" d="M.376,0h.8l.377.379H0Z" transform="translate(1.669 2.808)" fill="#80795b" />
                                                                    <path id="_x30_.1.2.0.0.0.0.40" d="M.376.377v.8L0,1.556V0Z" transform="translate(1.669 1.631)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.2.0.0.0.0.41" d="M1.556,0,1.179.377h-.8L0,0Z" transform="translate(1.669 1.631)" fill="#9a916c" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21462" transform="translate(39.946 8.839)">
                    <g id="g21464" transform="translate(0 0)">
                        <g id="g21466">
                            <g id="g21468">
                                <g id="_x30_.1.3">
                                    <g id="_x32_x03_1_">
                                        <g id="g21472" transform="translate(14.44 9.641) rotate(180)">
                                            <g id="g21474" transform="translate(0 0)">
                                                <g id="g21476">
                                                    <g id="g21478">
                                                        <g id="_x30_.1.3.0.0">
                                                            <g id="_x30_.1.3.0.0.0">
                                                                <g id="_x30_.1.3.0.0.0.0">
                                                                    <path id="_x30_.1.3.0.0.0.0.0" d="M4.71,8.616V1.024L3.686,0H1.023L0,1.024V8.616L1.023,9.641H3.686Z" transform="translate(9.73)" fill="#404040" />
                                                                    <path id="_x30_.1.3.0.0.0.0.1" d="M4.712,8.616V1.024L3.689,0H1.025L0,1.024V8.616L1.025,9.641H3.689Z" transform="translate(4.863)" fill="#404040" />
                                                                    <path id="_x30_.1.3.0.0.0.0.2" d="M4.712,8.616V1.024L3.687,0H1.022L0,1.024V8.616L1.022,9.641H3.687Z" fill="#404040" />
                                                                    <path id="_x30_.1.3.0.0.0.0.3" d="M4.71,8.616V1.024L3.686,0H1.023L0,1.024V8.616L1.023,9.641H3.686Z" transform="translate(9.73)" fill="#404040" />
                                                                    <path id="_x30_.1.3.0.0.0.0.4" d="M4.712,8.616V1.024L3.689,0H1.025L0,1.024V8.616L1.025,9.641H3.689Z" transform="translate(4.863)" fill="#404040" />
                                                                    <path id="_x30_.1.3.0.0.0.0.5" d="M4.712,8.616V1.024L3.687,0H1.022L0,1.024V8.616L1.022,9.641H3.687Z" fill="#404040" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.6" width="1.558" height="1.557" transform="translate(1.667 1.632)" fill="#8d8c8c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.7" width="1.558" height="1.557" transform="translate(1.667 6.51)" fill="#8d8c8c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.8" width="1.557" height="1.557" transform="translate(6.545 1.632)" fill="#8d8c8c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.9" width="1.557" height="1.557" transform="translate(6.545 6.51)" fill="#8d8c8c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.10" width="1.557" height="1.557" transform="translate(11.422 1.632)" fill="#8d8c8c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.11" width="1.557" height="1.557" transform="translate(11.422 6.51)" fill="#8d8455" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.12" width="0.802" height="0.802" transform="translate(11.8 6.888)" fill="#8c8663" />
                                                                    <path id="_x30_.1.3.0.0.0.0.13" d="M.379,0,0,.379v.8l.379.378Z" transform="translate(12.6 6.51)" fill="#b8af82" />
                                                                    <path id="_x30_.1.3.0.0.0.0.14" d="M.378,0h.8l.379.378H0Z" transform="translate(11.422 7.689)" fill="#80795b" />
                                                                    <path id="_x30_.1.3.0.0.0.0.15" d="M.378.379v.8L0,1.557V0Z" transform="translate(11.422 6.51)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.3.0.0.0.0.16" d="M1.558,0,1.178.379h-.8L0,0Z" transform="translate(11.422 6.51)" fill="#9a916c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.17" width="0.802" height="0.801" transform="translate(11.8 2.01)" fill="#8c8663" />
                                                                    <path id="_x30_.1.3.0.0.0.0.18" d="M.379,0,0,.378v.8l.379.378Z" transform="translate(12.6 1.632)" fill="#b8af82" />
                                                                    <path id="_x30_.1.3.0.0.0.0.19" d="M.378,0h.8l.379.378H0Z" transform="translate(11.422 2.81)" fill="#80795b" />
                                                                    <path id="_x30_.1.3.0.0.0.0.20" d="M.378.378v.8L0,1.556V0Z" transform="translate(11.422 1.632)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.3.0.0.0.0.21" d="M1.558,0,1.178.378h-.8L0,0Z" transform="translate(11.422 1.632)" fill="#9a916c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.22" width="0.802" height="0.802" transform="translate(6.922 6.888)" fill="#8c8663" />
                                                                    <path id="_x30_.1.3.0.0.0.0.23" d="M.377,0,0,.379v.8l.377.378Z" transform="translate(7.724 6.51)" fill="#b8af82" />
                                                                    <path id="_x30_.1.3.0.0.0.0.24" d="M.377,0h.8l.377.378H0Z" transform="translate(6.545 7.689)" fill="#80795b" />
                                                                    <path id="_x30_.1.3.0.0.0.0.25" d="M.377.379v.8L0,1.557V0Z" transform="translate(6.545 6.51)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.3.0.0.0.0.26" d="M1.556,0,1.179.379h-.8L0,0Z" transform="translate(6.545 6.51)" fill="#9a916c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.27" width="0.802" height="0.801" transform="translate(6.922 2.01)" fill="#8c8663" />
                                                                    <path id="_x30_.1.3.0.0.0.0.28" d="M.377,0,0,.378v.8l.377.378Z" transform="translate(7.724 1.632)" fill="#b8af82" />
                                                                    <path id="_x30_.1.3.0.0.0.0.29" d="M.377,0h.8l.377.378H0Z" transform="translate(6.545 2.81)" fill="#80795b" />
                                                                    <path id="_x30_.1.3.0.0.0.0.30" d="M.377.378v.8L0,1.556V0Z" transform="translate(6.545 1.632)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.3.0.0.0.0.31" d="M1.556,0,1.179.378h-.8L0,0Z" transform="translate(6.545 1.632)" fill="#9a916c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.32" width="0.803" height="0.802" transform="translate(2.043 6.888)" fill="#8c8663" />
                                                                    <path id="_x30_.1.3.0.0.0.0.33" d="M.378,0,0,.379v.8l.378.378Z" transform="translate(2.846 6.51)" fill="#b8af82" />
                                                                    <path id="_x30_.1.3.0.0.0.0.34" d="M.376,0h.8l.378.378H0Z" transform="translate(1.667 7.689)" fill="#80795b" />
                                                                    <path id="_x30_.1.3.0.0.0.0.35" d="M.376.379v.8L0,1.557V0Z" transform="translate(1.667 6.51)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.3.0.0.0.0.36" d="M1.557,0,1.179.379h-.8L0,0Z" transform="translate(1.667 6.51)" fill="#9a916c" />
                                                                    <rect id="_x30_.1.3.0.0.0.0.37" width="0.803" height="0.801" transform="translate(2.043 2.01)" fill="#8c8663" />
                                                                    <path id="_x30_.1.3.0.0.0.0.38" d="M.378,0,0,.378v.8l.378.378Z" transform="translate(2.846 1.632)" fill="#b8af82" />
                                                                    <path id="_x30_.1.3.0.0.0.0.39" d="M.376,0h.8l.378.378H0Z" transform="translate(1.667 2.81)" fill="#80795b" />
                                                                    <path id="_x30_.1.3.0.0.0.0.40" d="M.376.378v.8L0,1.556V0Z" transform="translate(1.667 1.632)" fill="#5e5b43" />
                                                                    <path id="_x30_.1.3.0.0.0.0.41" d="M1.557,0,1.179.378h-.8L0,0Z" transform="translate(1.667 1.632)" fill="#9a916c" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21525" transform="translate(97.412 2.44)">
                    <g id="g21527" transform="translate(0 0)">
                        <g id="g21529">
                            <g id="g21531">
                                <g id="_x30_.1.4">
                                    <g id="_x31_x08">
                                        <g id="g21535" transform="translate(39.026 4.878) rotate(180)">
                                            <g id="g21537" transform="translate(0)">
                                                <g id="g21539">
                                                    <g id="g21541">
                                                        <g id="_x30_.1.4.0.0">
                                                            <g id="_x30_.1.4.0.0.0">
                                                                <rect id="_x30_.1.4.0.0.0.0" width="39.026" height="4.878" transform="translate(0)" fill="#404040" />
                                                                <rect id="_x30_.1.4.0.0.0.1" width="1.884" height="1.885" transform="translate(35.645 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.2" d="M3.274.694,2.581,0H.7L0,.694Z" transform="translate(34.949 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.3" d="M0,3.274l.7-.7V.693L0,0Z" transform="translate(34.949 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.4" d="M0,0,.7.693H2.581L3.273,0Z" transform="translate(34.95 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.5" d="M.694,0,0,.694V2.579l.694.694Z" transform="translate(37.53 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.6" width="1.883" height="1.885" transform="translate(30.767 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.7" d="M3.275.694,2.581,0H.694L0,.694Z" transform="translate(30.071 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.8" d="M0,3.274l.694-.7V.693L0,0Z" transform="translate(30.071 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.9" d="M0,0,.694.693H2.58L3.274,0Z" transform="translate(30.072 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.10" d="M.7,0,0,.694V2.579l.7.694Z" transform="translate(32.652 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.11" width="1.884" height="1.885" transform="translate(25.887 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.12" d="M3.274.694,2.58,0H.694L0,.694Z" transform="translate(25.193 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.13" d="M0,3.274l.694-.7V.693L0,0Z" transform="translate(25.193 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.14" d="M0,0,.692.693H2.578L3.272,0Z" transform="translate(25.195 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.15" d="M.7,0,0,.694V2.579l.7.694Z" transform="translate(27.773 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.16" width="1.884" height="1.885" transform="translate(21.009 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.17" d="M3.274.694,2.577,0H.692L0,.694Z" transform="translate(20.316 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.18" d="M0,3.274l.692-.7V.693L0,0Z" transform="translate(20.316 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.19" d="M0,0,.694.693H2.577L3.274,0Z" transform="translate(20.316 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.20" d="M.7,0,0,.694V2.579l.7.694Z" transform="translate(22.894 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.21" width="1.884" height="1.885" transform="translate(16.131 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.22" d="M3.274.694,2.581,0H.7L0,.694Z" transform="translate(15.436 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.23" d="M0,3.274l.7-.7V.693L0,0Z" transform="translate(15.436 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.24" d="M0,0,.7.693H2.579L3.272,0Z" transform="translate(15.437 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.25" d="M.694,0,0,.694V2.579l.694.694Z" transform="translate(18.017 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.26" width="1.884" height="1.885" transform="translate(11.254 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.27" d="M3.274.694,2.581,0H.7L0,.694Z" transform="translate(10.558 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.28" d="M0,3.274l.7-.7V.693L0,0Z" transform="translate(10.558 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.29" d="M0,0,.7.693H2.581L3.273,0Z" transform="translate(10.559 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.30" d="M.694,0,0,.694V2.579l.694.694Z" transform="translate(13.139 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.31" width="1.883" height="1.885" transform="translate(6.376 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.32" d="M3.275.694,2.581,0H.694L0,.694Z" transform="translate(5.68 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.33" d="M0,3.274l.694-.7V.693L0,0Z" transform="translate(5.68 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.34" d="M0,0,.694.693H2.58L3.274,0Z" transform="translate(5.681 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.35" d="M.7,0,0,.694V2.579l.7.694Z" transform="translate(8.261 0.802)" fill="#373737" />
                                                                <rect id="_x30_.1.4.0.0.0.36" width="1.884" height="1.885" transform="translate(1.496 1.496)" />
                                                                <path id="_x30_.1.4.0.0.0.37" d="M3.274.694,2.58,0H.694L0,.694Z" transform="translate(0.802 3.381)" fill="#2a2a29" />
                                                                <path id="_x30_.1.4.0.0.0.38" d="M0,3.274l.694-.7V.693L0,0Z" transform="translate(0.802 0.802)" fill="#474747" />
                                                                <path id="_x30_.1.4.0.0.0.39" d="M0,0,.692.693H2.578L3.272,0Z" transform="translate(0.804 0.802)" fill="#595959" />
                                                                <path id="_x30_.1.4.0.0.0.40" d="M.7,0,0,.694V2.579l.7.694Z" transform="translate(3.382 0.802)" fill="#373737" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21586" transform="translate(62.948 21.842)">
                    <g id="g21588" transform="translate(0 0)">
                        <g id="g21590">
                            <g id="g21592">
                                <g id="_x30_.1.5">
                                    <g id="chip-led0805">
                                        <g id="g21596" transform="translate(0 2.6) rotate(-90)">
                                            <g id="g21598">
                                                <g id="g21600">
                                                    <g id="g21602">
                                                        <g id="_x30_.1.5.0.0">
                                                            <g id="_x30_.1.5.0.0.0">
                                                                <g id="g21606">
                                                                    <g id="g21608">
                                                                        <g id="g21610">
                                                                            <g id="g21612">
                                                                                <g id="_x30_.1.5.0.0.0.0">
                                                                                    <g id="led-0603_1_">
                                                                                        <line id="_x30_.1.5.0.0.0.0.0.0" y2="4.903" transform="translate(0.001 0.036)" fill="none" />
                                                                                        <g id="g21617" transform="translate(0.002 5.012) rotate(-90)">
                                                                                            <g id="g21619">
                                                                                                <g id="g21621">
                                                                                                    <g id="g21623">
                                                                                                        <g id="_x30_.1.5.0.0.0.0.0.1">
                                                                                                            <rect id="_x30_.1.5.0.0.0.0.0.1.0" width="4.978" height="2.597" fill="#f2f2f2" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.5.0.0.0.0.0.2" d="M0,0S.316.437.289.587s.1.367,0,.458L0,1.033Z" transform="translate(0.001 3.25)" fill="rgba(34,181,115,0.7)" />
                                                                                        <g id="_x30_.1.5.0.0.0.0.0.3" transform="translate(0.978 2.185)">
                                                                                            <g id="g21629" transform="translate(0.016 0.579) rotate(-90)">
                                                                                                <g id="g21631">
                                                                                                    <g id="g21633">
                                                                                                        <g id="g21635">
                                                                                                            <g id="_x30_.1.5.0.0.0.0.0.3.0">
                                                                                                                <rect id="_x30_.1.5.0.0.0.0.0.3.0.0" width="0.579" height="0.651" fill="#fff" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                            <g id="g21639" transform="translate(0 0.579) rotate(-90)">
                                                                                                <g id="g21641">
                                                                                                    <g id="g21643">
                                                                                                        <g id="g21645">
                                                                                                            <g id="_x30_.1.5.0.0.0.0.0.3.1">
                                                                                                                <rect id="_x30_.1.5.0.0.0.0.0.3.1.0" width="0.579" height="0.033" fill="#b3b3b3" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <g id="_x30_.1.5.0.0.0.0.0.4" transform="translate(0.218 0.672)">
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.0" d="M.072,0,0,.653H.5L.425,0Z" transform="translate(0 2.97)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.5.0.0.0.0.0.4.1" transform="translate(0.205 1.994)">
                                                                                                <path id="_x30_.1.5.0.0.0.0.0.4.1.0" d="M0,1.018V1.012A1.639,1.639,0,0,1,.11.607C.164.465.64.228.581.046A.035.035,0,0,1,.61,0,.044.044,0,0,1,.663.028C.728.234.245.484.188.633a1.435,1.435,0,0,0-.105.388.04.04,0,0,1-.046.033A.038.038,0,0,1,0,1.018Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.2" d="M.425.653.495,0H0L.07.653Z" transform="translate(1.602)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.5.0.0.0.0.0.4.3" transform="translate(0.997 0.42)">
                                                                                                <path id="_x30_.1.5.0.0.0.0.0.4.3.0" d="M0,1.353a.04.04,0,0,1,.032-.037A1.783,1.783,0,0,0,.812.039.039.039,0,0,1,.855,0,.042.042,0,0,1,.9.039h0A1.754,1.754,0,0,1,.054,1.39.045.045,0,0,1,0,1.363S0,1.358,0,1.353Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.4" d="M.211.259S.212.018,0,0V.259Z" transform="translate(0.775 1.833)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.5" d="M.261.133S.054.24.023.169-.012.049.042.007.261.133.261.133Z" transform="translate(0.942 1.664)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.6" d="M.583,0C.64.183.164.419.11.561A1.519,1.519,0,0,0,0,.966H.04A1.639,1.639,0,0,1,.15.561C.2.419.68.182.621,0Z" transform="translate(0.168 2.04)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.7" d="M.07.653,0,0H.037l.07.653Z" transform="translate(1.565)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.8" d="M0,1.277A1.639,1.639,0,0,0,.778,0H.819A1.573,1.573,0,0,1,.039,1.278Z" transform="translate(0.991 0.459)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.9" d="M0,0V.258H.039V0Z" transform="translate(0.739 1.833)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.5.0.0.0.0.0.4.10" d="M.043,0C-.012.043-.009.089.022.161H.062C.029.09.027.041.081,0Z" transform="translate(0.907 1.669)" fill="#9d956c" />
                                                                                        </g>
                                                                                        <g id="g21663" transform="translate(2.563 3.895) rotate(-90)">
                                                                                            <g id="g21665" transform="translate(0)">
                                                                                                <g id="g21667">
                                                                                                    <g id="g21669">
                                                                                                        <g id="_x30_.1.5.0.0.0.0.0.5">
                                                                                                            <rect id="_x30_.1.5.0.0.0.0.0.5.0" width="2.861" height="0.035" transform="translate(0)" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.5.0.0.0.0.0.6" d="M2.6,0H0V3.6l2.6,0Z" transform="translate(0.003 0.684)" fill="#f2f2f2" opacity="0.5" />
                                                                                        <path id="_x30_.1.5.0.0.0.0.0.7" d="M.088,0H.271c.1.012.184-.008.184.066V3.355c0,.114-.044.119-.044-.008V.4C.411.093.34.051.277.051H.093C-.03.053-.03,0,.088,0Z" transform="translate(2.07 0.718)" fill="#fff" opacity="0.55" />
                                                                                        <path id="_x30_.1.5.0.0.0.0.0.8" d="M.094,3.417C.047,3.417,0,3.425,0,3.35V.087C0-.027.044-.033.044.092c0,.091,0,2.126,0,2.432,0,.4.048.893.048.893Z" transform="translate(0.06 0.774)" opacity="0.03" />
                                                                                        <path id="_x30_.1.5.0.0.0.0.0.9" d="M0,.035V.557H.353A.2.2,0,0,1,.535.684H2.6V0H0" transform="translate(0.001 0)" fill="#d1c690" />
                                                                                        <g id="g21677" transform="translate(2.563 0.682) rotate(-90)">
                                                                                            <g id="g21679" transform="translate(0)">
                                                                                                <g id="g21681">
                                                                                                    <g id="g21683">
                                                                                                        <g id="_x30_.1.5.0.0.0.0.0.10">
                                                                                                            <rect id="_x30_.1.5.0.0.0.0.0.10.0" width="0.682" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.5.0.0.0.0.0.11" d="M0,.726H2.6V0H.251A.215.215,0,0,1,.068.129H0V.691" transform="translate(0 4.286)" fill="#d1c690" />
                                                                                        <g id="g21688" transform="translate(2.565 5.01) rotate(-90)">
                                                                                            <g id="g21690" transform="translate(0)">
                                                                                                <g id="g21692">
                                                                                                    <g id="g21694">
                                                                                                        <g id="_x30_.1.5.0.0.0.0.0.12">
                                                                                                            <rect id="_x30_.1.5.0.0.0.0.0.12.0" width="0.726" height="0.035" transform="translate(0 0)" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21698" transform="translate(123.457 30.969)">
                    <g id="g21700" transform="translate(0 0)">
                        <g id="g21702">
                            <g id="g21704">
                                <g id="_x30_.1.6">
                                    <g id="chip-led0805_1_">
                                        <g id="g21708" transform="translate(0 2.6) rotate(-90)">
                                            <g id="g21710" transform="translate(0)">
                                                <g id="g21712">
                                                    <g id="g21714">
                                                        <g id="_x30_.1.6.0.0">
                                                            <g id="_x30_.1.6.0.0.0">
                                                                <g id="g21718">
                                                                    <g id="g21720">
                                                                        <g id="g21722">
                                                                            <g id="g21724">
                                                                                <g id="_x30_.1.6.0.0.0.0">
                                                                                    <g id="led-0603_2_">
                                                                                        <line id="_x30_.1.6.0.0.0.0.0.0" y2="4.903" transform="translate(0 0.037)" fill="none" />
                                                                                        <g id="g21729" transform="translate(0.001 5.013) rotate(-90)">
                                                                                            <g id="g21731">
                                                                                                <g id="g21733">
                                                                                                    <g id="g21735">
                                                                                                        <g id="_x30_.1.6.0.0.0.0.0.1">
                                                                                                            <rect id="_x30_.1.6.0.0.0.0.0.1.0" width="4.979" height="2.597" transform="translate(0 0)" fill="#f2f2f2" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.6.0.0.0.0.0.2" d="M0,0S.316.438.289.586s.1.367,0,.459L0,1.031Z" transform="translate(0.001 3.251)" fill="rgba(34,181,115,0.7)" />
                                                                                        <g id="_x30_.1.6.0.0.0.0.0.3" transform="translate(0.976 2.186)">
                                                                                            <g id="g21741" transform="translate(0.017 0.579) rotate(-90)">
                                                                                                <g id="g21743">
                                                                                                    <g id="g21745">
                                                                                                        <g id="g21747">
                                                                                                            <g id="_x30_.1.6.0.0.0.0.0.3.0">
                                                                                                                <rect id="_x30_.1.6.0.0.0.0.0.3.0.0" width="0.579" height="0.651" fill="#fff" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                            <g id="g21751" transform="translate(0 0.579) rotate(-90)">
                                                                                                <g id="g21753">
                                                                                                    <g id="g21755">
                                                                                                        <g id="g21757">
                                                                                                            <g id="_x30_.1.6.0.0.0.0.0.3.1">
                                                                                                                <rect id="_x30_.1.6.0.0.0.0.0.3.1.0" width="0.579" height="0.033" transform="translate(0 0)" fill="#b3b3b3" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <g id="_x30_.1.6.0.0.0.0.0.4" transform="translate(0.218 0.672)">
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.0" d="M.07,0,0,.652H.5L.425,0Z" transform="translate(0 2.972)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.6.0.0.0.0.0.4.1" transform="translate(0.205 1.997)">
                                                                                                <path id="_x30_.1.6.0.0.0.0.0.4.1.0" d="M0,1.018V1.012A1.658,1.658,0,0,1,.11.6C.164.463.64.225.581.045A.034.034,0,0,1,.61,0,.045.045,0,0,1,.663.028C.728.235.245.484.188.633a1.422,1.422,0,0,0-.105.387.04.04,0,0,1-.046.034A.042.042,0,0,1,0,1.018Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.2" d="M.425.655.495,0H0L.07.655Z" transform="translate(1.602)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.6.0.0.0.0.0.4.3" transform="translate(0.997 0.418)">
                                                                                                <path id="_x30_.1.6.0.0.0.0.0.4.3.0" d="M0,1.356a.041.041,0,0,1,.032-.037A1.783,1.783,0,0,0,.812.042.042.042,0,0,1,.855,0,.041.041,0,0,1,.9.042h0a1.753,1.753,0,0,1-.844,1.35A.048.048,0,0,1,0,1.365.016.016,0,0,1,0,1.356Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.4" d="M.211.259S.212.02,0,0V.259Z" transform="translate(0.775 1.834)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.5" d="M.261.133S.054.239.023.169-.012.048.042.007.261.133.261.133Z" transform="translate(0.941 1.667)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.6" d="M.583,0C.64.184.164.418.11.56A1.522,1.522,0,0,0,0,.967H.04A1.658,1.658,0,0,1,.15.56C.2.418.68.18.621,0Z" transform="translate(0.167 2.042)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.7" d="M.07.655,0,0H.037l.07.655Z" transform="translate(1.565)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.8" d="M0,1.277A1.639,1.639,0,0,0,.778,0H.819A1.578,1.578,0,0,1,.039,1.279Z" transform="translate(0.99 0.459)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.9" d="M0,0V.258H.039V0Z" transform="translate(0.737 1.834)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.6.0.0.0.0.0.4.10" d="M.043,0C-.012.043-.009.089.022.161l.041,0C.029.09.027.041.081,0Z" transform="translate(0.905 1.671)" fill="#9d956c" />
                                                                                        </g>
                                                                                        <g id="g21775" transform="translate(2.564 3.897) rotate(-90)">
                                                                                            <g id="g21777">
                                                                                                <g id="g21779">
                                                                                                    <g id="g21781">
                                                                                                        <g id="_x30_.1.6.0.0.0.0.0.5">
                                                                                                            <rect id="_x30_.1.6.0.0.0.0.0.5.0" width="2.863" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.6.0.0.0.0.0.6" d="M2.6,0H0V3.6l2.6,0Z" transform="translate(0.002 0.684)" fill="#f2f2f2" opacity="0.5" />
                                                                                        <path id="_x30_.1.6.0.0.0.0.0.7" d="M.088,0H.271c.1.013.184-.009.184.067V3.356c0,.114-.044.119-.044-.009V.4C.411.091.34.048.277.048l-.184,0C-.03.051-.03,0,.088,0Z" transform="translate(2.069 0.72)" fill="#fff" opacity="0.55" />
                                                                                        <path id="_x30_.1.6.0.0.0.0.0.8" d="M.094,3.418C.047,3.418,0,3.426,0,3.351V.087c0-.114.044-.12.044.006,0,.093,0,2.127,0,2.432,0,.4.048.892.048.892Z" transform="translate(0.058 0.776)" opacity="0.03" />
                                                                                        <path id="_x30_.1.6.0.0.0.0.0.9" d="M0,.035V.557H.353A.2.2,0,0,1,.535.684H2.6V0H0" transform="translate(0.001)" fill="#d1c690" />
                                                                                        <g id="g21789" transform="translate(2.565 0.684) rotate(-90)">
                                                                                            <g id="g21791" transform="translate(0)">
                                                                                                <g id="g21793">
                                                                                                    <g id="g21795">
                                                                                                        <g id="_x30_.1.6.0.0.0.0.0.10">
                                                                                                            <rect id="_x30_.1.6.0.0.0.0.0.10.0" width="0.682" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.6.0.0.0.0.0.11" d="M0,.726H2.6V0H.251A.214.214,0,0,1,.068.129H0V.691" transform="translate(0 4.288)" fill="#d1c690" />
                                                                                        <g id="g21800" transform="translate(2.564 5.011) rotate(-90)">
                                                                                            <g id="g21802" transform="translate(0)">
                                                                                                <g id="g21804">
                                                                                                    <g id="g21806">
                                                                                                        <g id="_x30_.1.6.0.0.0.0.0.12">
                                                                                                            <rect id="_x30_.1.6.0.0.0.0.0.12.0" width="0.725" height="0.035" transform="translate(0 0)" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21810" transform="translate(54.851 77.959)">
                    <g id="g21812" transform="translate(0 0)">
                        <g id="g21814">
                            <g id="g21816">
                                <g id="_x30_.1.7">
                                    <g id="panasonic_d">
                                        <g id="g21820" transform="translate(12.433) rotate(90)">
                                            <g id="g21822" transform="translate(0 0)">
                                                <g id="g21824">
                                                    <g id="g21826">
                                                        <g id="_x30_.1.7.0.0">
                                                            <g id="_x30_.1.7.0.0.0">
                                                                <g id="_x30_.1.7.0.0.0.0">
                                                                    <g id="g21831" transform="translate(13.841 5.767) rotate(90)">
                                                                        <g id="g21833" transform="translate(0)">
                                                                            <g id="g21835">
                                                                                <g id="g21837">
                                                                                    <g id="_x30_.1.7.0.0.0.0.0">
                                                                                        <rect id="_x30_.1.7.0.0.0.0.0.0" width="0.862" height="0.704" fill="#ccc" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21841" transform="translate(0.703 5.767) rotate(90)">
                                                                        <g id="g21843">
                                                                            <g id="g21845">
                                                                                <g id="g21847">
                                                                                    <g id="_x30_.1.7.0.0.0.0.1">
                                                                                        <rect id="_x30_.1.7.0.0.0.0.1.0" width="0.862" height="0.703" transform="translate(0 0)" fill="#ccc" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21851" transform="translate(13.84 5.766) rotate(90)">
                                                                        <g id="g21853">
                                                                            <g id="g21855">
                                                                                <g id="g21857">
                                                                                    <g id="_x30_.1.7.0.0.0.0.2">
                                                                                        <rect id="_x30_.1.7.0.0.0.0.2.0" width="0.138" height="0.704" opacity="0.1" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21861" transform="translate(0.703 5.765) rotate(90)">
                                                                        <g id="g21863">
                                                                            <g id="g21865">
                                                                                <g id="g21867">
                                                                                    <g id="_x30_.1.7.0.0.0.0.3">
                                                                                        <rect id="_x30_.1.7.0.0.0.0.3.0" width="0.138" height="0.703" opacity="0.1" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21871" transform="translate(13.841 6.491) rotate(90)">
                                                                        <g id="g21873">
                                                                            <g id="g21875">
                                                                                <g id="g21877">
                                                                                    <g id="_x30_.1.7.0.0.0.0.4">
                                                                                        <rect id="_x30_.1.7.0.0.0.0.4.0" width="0.138" height="0.704" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21881" transform="translate(0.703 6.49) rotate(90)">
                                                                        <g id="g21883" transform="translate(0)">
                                                                            <g id="g21885">
                                                                                <g id="g21887">
                                                                                    <g id="_x30_.1.7.0.0.0.0.5">
                                                                                        <rect id="_x30_.1.7.0.0.0.0.5.0" width="0.138" height="0.703" transform="translate(0 0)" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.7.0.0.0.0.6" d="M2.581,12.433H11.5a.942.942,0,0,0,.938-.937V.94A.942.942,0,0,0,11.5,0H2.581L0,2.582V9.853Z" transform="translate(0.702 0.001)" fill="#1a1a1a" />
                                                                    <circle id="_x30_.1.7.0.0.0.0.7" cx="5.897" cy="5.897" r="5.897" transform="translate(1.023 0.32)" fill="#e6e6e6" />
                                                                    <path id="_x30_.1.7.0.0.0.0.8" d="M2.581,12.433H11.5a.942.942,0,0,0,.938-.937V.94A.942.942,0,0,0,11.5,0H2.581L0,2.582V9.853Z" transform="translate(0.702 0.001)" fill="#333" />
                                                                    <path id="_x30_.1.7.0.0.0.0.9" d="M0,2.707,2.583.125H11.5a.942.942,0,0,1,.938.94V.94A.942.942,0,0,0,11.5,0H2.581L0,2.582v.125Z" transform="translate(0.702)" />
                                                                    <path id="_x30_.1.7.0.0.0.0.10" d="M12.435,1.642a.942.942,0,0,1-.938.938H2.582L0,0V.124L2.582,2.7H11.5a.942.942,0,0,0,.938-.937Z" transform="translate(0.701 9.729)" fill="#fff" opacity="0.1" />
                                                                    <path id="_x30_.1.7.0.0.0.0.11" d="M5.9,0A5.9,5.9,0,1,1,0,5.9,5.88,5.88,0,0,1,5.9,0Z" transform="translate(1.024 0.238)" fill="#e6e6e6" />
                                                                    <path id="_x30_.1.7.0.0.0.0.12" d="M2.482,4.8A5.887,5.887,0,0,0,0,0V9.6A5.884,5.884,0,0,0,2.482,4.8Z" transform="translate(10.334 1.415)" />
                                                                    <path id="_x30_.1.7.0.0.0.0.13" d="M0,0A5.9,5.9,0,0,0,5.9,5.9,5.871,5.871,0,0,0,9.31,4.8,5.885,5.885,0,0,0,11.792,0V.165a5.883,5.883,0,0,1-2.482,4.8A5.861,5.861,0,0,1,5.9,6.061,5.9,5.9,0,0,1,0,.165Z" transform="translate(1.024 6.052)" fill="#fff" opacity="0.3" />
                                                                    <path id="_x30_.1.7.0.0.0.0.14" d="M2.482,4.957A5.889,5.889,0,0,0,0,.155V0A5.887,5.887,0,0,1,2.482,4.8Z" transform="translate(10.334 1.415)" fill="#fff" opacity="0.5" />
                                                                    <path id="_x30_.1.7.0.0.0.0.15" d="M9.31,1.249A5.89,5.89,0,0,0,0,6.052V5.9a5.89,5.89,0,0,1,9.31-4.8Z" transform="translate(1.024 0.32)" opacity="0.2" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21901" transform="translate(41.192 77.959)">
                    <g id="g21903" transform="translate(0 0)">
                        <g id="g21905">
                            <g id="g21907">
                                <g id="_x30_.1.8">
                                    <g id="panasonic_d_1_">
                                        <g id="g21911" transform="translate(12.433) rotate(90)">
                                            <g id="g21913" transform="translate(0 0)">
                                                <g id="g21915">
                                                    <g id="g21917">
                                                        <g id="_x30_.1.8.0.0">
                                                            <g id="_x30_.1.8.0.0.0">
                                                                <g id="_x30_.1.8.0.0.0.0">
                                                                    <g id="g21922" transform="translate(13.841 5.767) rotate(90)">
                                                                        <g id="g21924" transform="translate(0)">
                                                                            <g id="g21926">
                                                                                <g id="g21928">
                                                                                    <g id="_x30_.1.8.0.0.0.0.0">
                                                                                        <rect id="_x30_.1.8.0.0.0.0.0.0" width="0.862" height="0.703" fill="#ccc" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21932" transform="translate(0.703 5.766) rotate(90)">
                                                                        <g id="g21934">
                                                                            <g id="g21936">
                                                                                <g id="g21938">
                                                                                    <g id="_x30_.1.8.0.0.0.0.1">
                                                                                        <rect id="_x30_.1.8.0.0.0.0.1.0" width="0.862" height="0.703" fill="#ccc" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21942" transform="translate(13.84 5.765) rotate(90)">
                                                                        <g id="g21944" transform="translate(0)">
                                                                            <g id="g21946">
                                                                                <g id="g21948">
                                                                                    <g id="_x30_.1.8.0.0.0.0.2">
                                                                                        <rect id="_x30_.1.8.0.0.0.0.2.0" width="0.138" height="0.704" opacity="0.1" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21952" transform="translate(0.703 5.765) rotate(90)">
                                                                        <g id="g21954">
                                                                            <g id="g21956">
                                                                                <g id="g21958">
                                                                                    <g id="_x30_.1.8.0.0.0.0.3">
                                                                                        <rect id="_x30_.1.8.0.0.0.0.3.0" width="0.138" height="0.703" transform="translate(0 0)" opacity="0.1" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21962" transform="translate(13.841 6.491) rotate(90)">
                                                                        <g id="g21964">
                                                                            <g id="g21966">
                                                                                <g id="g21968">
                                                                                    <g id="_x30_.1.8.0.0.0.0.4">
                                                                                        <rect id="_x30_.1.8.0.0.0.0.4.0" width="0.138" height="0.704" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g21972" transform="translate(0.703 6.49) rotate(90)">
                                                                        <g id="g21974">
                                                                            <g id="g21976">
                                                                                <g id="g21978">
                                                                                    <g id="_x30_.1.8.0.0.0.0.5">
                                                                                        <rect id="_x30_.1.8.0.0.0.0.5.0" width="0.138" height="0.703" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.8.0.0.0.0.6" d="M2.581,12.433H11.5a.942.942,0,0,0,.938-.937V.94A.942.942,0,0,0,11.5,0H2.581L0,2.582V9.853Z" transform="translate(0.703 0.001)" fill="#1a1a1a" />
                                                                    <circle id="_x30_.1.8.0.0.0.0.7" cx="5.897" cy="5.897" r="5.897" transform="translate(1.023 0.32)" fill="#e6e6e6" />
                                                                    <path id="_x30_.1.8.0.0.0.0.8" d="M2.581,12.433H11.5a.942.942,0,0,0,.938-.937V.94A.942.942,0,0,0,11.5,0H2.581L0,2.582V9.853Z" transform="translate(0.703 0.001)" fill="#333" />
                                                                    <path id="_x30_.1.8.0.0.0.0.9" d="M0,2.707,2.582.125H11.5a.942.942,0,0,1,.938.94V.94A.942.942,0,0,0,11.5,0H2.581L0,2.582Z" transform="translate(0.704)" />
                                                                    <path id="_x30_.1.8.0.0.0.0.10" d="M12.435,1.642a.942.942,0,0,1-.938.938H2.582L0,0V.124L2.582,2.7H11.5a.942.942,0,0,0,.938-.937Z" transform="translate(0.702 9.729)" fill="#fff" opacity="0.1" />
                                                                    <path id="_x30_.1.8.0.0.0.0.11" d="M5.9,0A5.9,5.9,0,1,1,0,5.9,5.88,5.88,0,0,1,5.9,0Z" transform="translate(1.024 0.238)" fill="#e6e6e6" />
                                                                    <path id="_x30_.1.8.0.0.0.0.12" d="M2.482,4.8A5.887,5.887,0,0,0,0,0V9.6A5.881,5.881,0,0,0,2.482,4.8Z" transform="translate(10.334 1.415)" />
                                                                    <path id="_x30_.1.8.0.0.0.0.13" d="M0,0A5.9,5.9,0,0,0,5.9,5.9,5.871,5.871,0,0,0,9.31,4.8,5.885,5.885,0,0,0,11.792,0V.165a5.883,5.883,0,0,1-2.482,4.8A5.861,5.861,0,0,1,5.9,6.061,5.9,5.9,0,0,1,0,.165Z" transform="translate(1.024 6.052)" fill="#fff" opacity="0.3" />
                                                                    <path id="_x30_.1.8.0.0.0.0.14" d="M2.482,4.957A5.889,5.889,0,0,0,0,.155V0A5.887,5.887,0,0,1,2.482,4.8Z" transform="translate(10.334 1.415)" fill="#fff" opacity="0.5" />
                                                                    <path id="_x30_.1.8.0.0.0.0.15" d="M9.31,1.249A5.89,5.89,0,0,0,0,6.052V5.9a5.89,5.89,0,0,1,9.31-4.8Z" transform="translate(1.024 0.32)" opacity="0.2" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g21992" transform="translate(63.264 95.125)">
                    <g id="g21994" transform="translate(0 0)">
                        <g id="g21996">
                            <g id="g21998">
                                <g id="_x30_.1.9">
                                    <g id="_x31_x08_1_">
                                        <rect id="_x30_.1.9.0.0" width="39.026" height="4.878" fill="#404040" />
                                        <rect id="_x30_.1.9.0.1" width="1.884" height="1.886" transform="translate(1.497 1.497)" />
                                        <path id="_x30_.1.9.0.2" d="M1.9.956,2.6,1.65H4.484l.7-.694Z" transform="translate(-1.102 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.3" d="M6.406.956l-.7.7V3.537l.7.693Z" transform="translate(-2.329 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.4" d="M5.178,5.459l-.7-.693H2.6L1.9,5.459Z" transform="translate(-1.102 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.5" d="M1.9,4.23,2.6,3.536V1.65L1.9.956Z" transform="translate(-1.101 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.6" width="1.884" height="1.886" transform="translate(6.376 1.497)" />
                                        <path id="_x30_.1.9.0.7" d="M9.1.956,9.8,1.65h1.886l.7-.694Z" transform="translate(-3.424 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.8" d="M13.607.956l-.7.7V3.537l.7.693Z" transform="translate(-4.652 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.9" d="M12.378,5.459l-.694-.693H9.8L9.1,5.459Z" transform="translate(-3.424 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.10" d="M9.1,4.23l.7-.694V1.65L9.1.956Z" transform="translate(-3.423 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.11" width="1.884" height="1.886" transform="translate(11.254 1.497)" />
                                        <path id="_x30_.1.9.0.12" d="M16.3.956,17,1.65h1.886l.694-.694Z" transform="translate(-5.745 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.13" d="M20.806.956l-.694.7V3.537l.694.693Z" transform="translate(-6.973 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.14" d="M19.577,5.459l-.694-.693H17l-.694.693Z" transform="translate(-5.745 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.15" d="M16.3,4.23l.7-.694V1.65L16.3.956Z" transform="translate(-5.745 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.16" width="1.884" height="1.886" transform="translate(16.132 1.497)" />
                                        <path id="_x30_.1.9.0.17" d="M23.5.956l.694.694h1.887l.692-.694Z" transform="translate(-8.067 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.18" d="M28.005.956l-.692.7V3.537l.692.693Z" transform="translate(-9.295 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.19" d="M26.777,5.459l-.694-.693H24.2l-.694.693Z" transform="translate(-8.067 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.20" d="M23.5,4.23l.7-.694V1.65L23.5.956Z" transform="translate(-8.066 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.21" width="1.884" height="1.886" transform="translate(21.011 1.497)" />
                                        <path id="_x30_.1.9.0.22" d="M30.7.956l.7.694h1.885l.694-.694Z" transform="translate(-10.389 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.23" d="M35.2.956l-.694.7V3.537l.694.693Z" transform="translate(-11.617 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.24" d="M33.977,5.459l-.694-.693H31.4l-.7.693Z" transform="translate(-10.389 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.25" d="M30.7,4.23l.7-.694V1.65L30.7.956Z" transform="translate(-10.388 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.26" width="1.884" height="1.886" transform="translate(25.888 1.497)" />
                                        <path id="_x30_.1.9.0.27" d="M37.9.956l.693.694h1.885l.7-.694Z" transform="translate(-12.711 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.28" d="M42.406.956l-.7.7V3.537l.7.693Z" transform="translate(-13.938 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.29" d="M41.177,5.459l-.694-.693H38.6l-.693.693Z" transform="translate(-12.711 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.30" d="M37.9,4.23l.694-.694V1.65L37.9.956Z" transform="translate(-12.71 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.31" width="1.884" height="1.886" transform="translate(30.767 1.497)" />
                                        <path id="_x30_.1.9.0.32" d="M45.1.956l.694.694h1.885l.7-.694Z" transform="translate(-15.033 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.33" d="M49.606.956l-.7.7V3.537l.7.693Z" transform="translate(-16.26 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.34" d="M48.378,5.459l-.7-.693H45.8l-.694.693Z" transform="translate(-15.033 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.35" d="M45.1,4.23l.7-.694V1.65L45.1.956Z" transform="translate(-15.032 -0.154)" fill="#373737" />
                                        <rect id="_x30_.1.9.0.36" width="1.884" height="1.886" transform="translate(35.645 1.497)" />
                                        <path id="_x30_.1.9.0.37" d="M52.3.956,53,1.65h1.886l.694-.694Z" transform="translate(-17.354 -0.154)" fill="#2a2a29" />
                                        <path id="_x30_.1.9.0.38" d="M56.806.956l-.694.7V3.537l.694.693Z" transform="translate(-18.582 -0.154)" fill="#474747" />
                                        <path id="_x30_.1.9.0.39" d="M55.577,5.459l-.694-.693H53l-.694.693Z" transform="translate(-17.354 -1.382)" fill="#595959" />
                                        <path id="_x30_.1.9.0.40" d="M52.3,4.23l.7-.694V1.65L52.3.956Z" transform="translate(-17.354 -0.154)" fill="#373737" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22043" transform="translate(62.908 35.208)">
                    <g id="g22045" transform="translate(0 0)">
                        <g id="g22047">
                            <g id="g22049">
                                <g id="_x30_.1.10">
                                    <g id="chip-led0805_2_">
                                        <g id="g22053" transform="translate(5.012 0) rotate(90)">
                                            <g id="g22055" transform="translate(0)">
                                                <g id="g22057">
                                                    <g id="g22059">
                                                        <g id="_x30_.1.10.0.0">
                                                            <g id="_x30_.1.10.0.0.0">
                                                                <g id="g22063">
                                                                    <g id="g22065" transform="translate(0)">
                                                                        <g id="g22067">
                                                                            <g id="g22069">
                                                                                <g id="_x30_.1.10.0.0.0.0">
                                                                                    <g id="led-0603_3_">
                                                                                        <line id="_x30_.1.10.0.0.0.0.0.0" y2="4.903" transform="translate(0.005 0.033)" fill="none" />
                                                                                        <g id="g22074" transform="translate(2.599 0.034) rotate(90)">
                                                                                            <g id="g22076">
                                                                                                <g id="g22078">
                                                                                                    <g id="g22080">
                                                                                                        <g id="_x30_.1.10.0.0.0.0.0.1">
                                                                                                            <rect id="_x30_.1.10.0.0.0.0.0.1.0" width="4.978" height="2.597" transform="translate(0)" fill="#f2f2f2" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.10.0.0.0.0.0.2" d="M0,0S.316.437.289.587s.1.367,0,.458L0,1.033Z" transform="translate(0.001 3.251)" fill="rgba(34,181,115,0.7)" />
                                                                                        <g id="_x30_.1.10.0.0.0.0.0.3" transform="translate(0.979 2.185)">
                                                                                            <g id="g22086" transform="translate(0.668 0.001) rotate(90)">
                                                                                                <g id="g22088" transform="translate(0 0)">
                                                                                                    <g id="g22090">
                                                                                                        <g id="g22092">
                                                                                                            <g id="_x30_.1.10.0.0.0.0.0.3.0">
                                                                                                                <rect id="_x30_.1.10.0.0.0.0.0.3.0.0" width="0.579" height="0.651" transform="translate(0)" fill="#fff" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                            <g id="g22096" transform="translate(0.033 0) rotate(90)">
                                                                                                <g id="g22098" transform="translate(0 0)">
                                                                                                    <g id="g22100">
                                                                                                        <g id="g22102">
                                                                                                            <g id="_x30_.1.10.0.0.0.0.0.3.1">
                                                                                                                <rect id="_x30_.1.10.0.0.0.0.0.3.1.0" width="0.579" height="0.033" fill="#b3b3b3" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <g id="_x30_.1.10.0.0.0.0.0.4" transform="translate(0.22 0.672)">
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.0" d="M.07,0,0,.652H.5L.425,0Z" transform="translate(0 2.972)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.10.0.0.0.0.0.4.1" transform="translate(0.204 1.995)">
                                                                                                <path id="_x30_.1.10.0.0.0.0.0.4.1.0" d="M0,1.018V1.012A1.639,1.639,0,0,1,.11.607C.164.465.64.228.581.046A.035.035,0,0,1,.61,0,.044.044,0,0,1,.663.028C.728.234.245.484.188.633a1.435,1.435,0,0,0-.105.388.04.04,0,0,1-.046.033A.039.039,0,0,1,0,1.018Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.2" d="M.425.654.495,0H0L.07.654Z" transform="translate(1.601)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.10.0.0.0.0.0.4.3" transform="translate(0.995 0.421)">
                                                                                                <path id="_x30_.1.10.0.0.0.0.0.4.3.0" d="M0,1.353a.04.04,0,0,1,.032-.037A1.783,1.783,0,0,0,.812.039.039.039,0,0,1,.855,0,.042.042,0,0,1,.9.039h0A1.754,1.754,0,0,1,.054,1.39.045.045,0,0,1,0,1.363.023.023,0,0,1,0,1.353Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.4" d="M.211.259S.212.018,0,0V.259Z" transform="translate(0.774 1.833)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.5" d="M.261.133S.054.24.023.169-.012.049.042.007.261.133.261.133Z" transform="translate(0.94 1.665)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.6" d="M.583,0C.64.183.164.419.11.561A1.519,1.519,0,0,0,0,.966H.04A1.639,1.639,0,0,1,.15.561C.2.419.68.182.621,0Z" transform="translate(0.167 2.041)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.7" d="M.068.654,0,0H.036l.07.654Z" transform="translate(1.565)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.8" d="M0,1.277A1.639,1.639,0,0,0,.778,0H.819A1.573,1.573,0,0,1,.039,1.278Z" transform="translate(0.989 0.459)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.9" d="M0,0V.258H.039V0Z" transform="translate(0.736 1.833)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.10.0.0.0.0.0.4.10" d="M.043,0C-.012.043-.009.089.022.161H.062C.029.09.027.041.081,0Z" transform="translate(0.905 1.671)" fill="#9d956c" />
                                                                                        </g>
                                                                                        <g id="g22120" transform="translate(2.6 1.036) rotate(90)">
                                                                                            <g id="g22122" transform="translate(0)">
                                                                                                <g id="g22124">
                                                                                                    <g id="g22126">
                                                                                                        <g id="_x30_.1.10.0.0.0.0.0.5">
                                                                                                            <rect id="_x30_.1.10.0.0.0.0.0.5.0" width="2.861" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.10.0.0.0.0.0.6" d="M2.6,0H0V3.6l2.6,0Z" transform="translate(0.003 0.684)" fill="#f2f2f2" opacity="0.5" />
                                                                                        <path id="_x30_.1.10.0.0.0.0.0.7" d="M.087,0H.27c.1.012.184-.008.184.066V3.355c0,.114-.044.119-.044-.008V.4C.41.093.339.051.276.051H.092C-.03.052-.03,0,.087,0Z" transform="translate(2.07 0.718)" fill="#fff" opacity="0.55" />
                                                                                        <path id="_x30_.1.10.0.0.0.0.0.8" d="M.093,3.417C.047,3.417,0,3.425,0,3.35V.087C0-.027.044-.033.044.092c0,.091,0,2.126,0,2.432C.047,2.927.093,3.417.093,3.417Z" transform="translate(0.058 0.775)" opacity="0.03" />
                                                                                        <path id="_x30_.1.10.0.0.0.0.0.9" d="M0,.035V.557H.353A.2.2,0,0,1,.535.684H2.6V0H0" transform="translate(0.001)" fill="#d1c690" />
                                                                                        <g id="g22134" transform="translate(2.601 0.001) rotate(90)">
                                                                                            <g id="g22136" transform="translate(0 0)">
                                                                                                <g id="g22138">
                                                                                                    <g id="g22140">
                                                                                                        <g id="_x30_.1.10.0.0.0.0.0.10">
                                                                                                            <rect id="_x30_.1.10.0.0.0.0.0.10.0" width="0.682" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.10.0.0.0.0.0.11" d="M0,.726H2.6V0H.251A.214.214,0,0,1,.068.129H0V.692" transform="translate(0 4.286)" fill="#d1c690" />
                                                                                        <g id="g22145" transform="translate(2.601 4.286) rotate(90)">
                                                                                            <g id="g22147">
                                                                                                <g id="g22149">
                                                                                                    <g id="g22151">
                                                                                                        <g id="_x30_.1.10.0.0.0.0.0.12">
                                                                                                            <rect id="_x30_.1.10.0.0.0.0.0.12.0" width="0.726" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22155" transform="translate(62.907 30.818)">
                    <g id="g22157" transform="translate(0 0)">
                        <g id="g22159">
                            <g id="g22161">
                                <g id="_x30_.1.11">
                                    <g id="chip-led0805_3_">
                                        <g id="g22165" transform="translate(5.013 0) rotate(90)">
                                            <g id="g22167" transform="translate(0)">
                                                <g id="g22169">
                                                    <g id="g22171">
                                                        <g id="_x30_.1.11.0.0">
                                                            <g id="_x30_.1.11.0.0.0">
                                                                <g id="g22175">
                                                                    <g id="g22177" transform="translate(0)">
                                                                        <g id="g22179">
                                                                            <g id="g22181">
                                                                                <g id="_x30_.1.11.0.0.0.0">
                                                                                    <g id="led-0603_4_">
                                                                                        <line id="_x30_.1.11.0.0.0.0.0.0" y2="4.903" transform="translate(0.005 0.033)" fill="none" />
                                                                                        <g id="g22186" transform="translate(2.599 0.035) rotate(90)">
                                                                                            <g id="g22188">
                                                                                                <g id="g22190">
                                                                                                    <g id="g22192">
                                                                                                        <g id="_x30_.1.11.0.0.0.0.0.1">
                                                                                                            <rect id="_x30_.1.11.0.0.0.0.0.1.0" width="4.978" height="2.597" transform="translate(0)" fill="#f2f2f2" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.11.0.0.0.0.0.2" d="M0,0S.316.437.289.587s.1.367,0,.458L0,1.033Z" transform="translate(0.001 3.251)" fill="rgba(34,181,115,0.7)" />
                                                                                        <g id="_x30_.1.11.0.0.0.0.0.3" transform="translate(0.978 2.187)">
                                                                                            <g id="g22198" transform="translate(0.669 0) rotate(90)">
                                                                                                <g id="g22200" transform="translate(0 0)">
                                                                                                    <g id="g22202">
                                                                                                        <g id="g22204">
                                                                                                            <g id="_x30_.1.11.0.0.0.0.0.3.0">
                                                                                                                <rect id="_x30_.1.11.0.0.0.0.0.3.0.0" width="0.579" height="0.651" transform="translate(0)" fill="#fff" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                            <g id="g22208" transform="translate(0.033 0) rotate(90)">
                                                                                                <g id="g22210">
                                                                                                    <g id="g22212">
                                                                                                        <g id="g22214">
                                                                                                            <g id="_x30_.1.11.0.0.0.0.0.3.1">
                                                                                                                <rect id="_x30_.1.11.0.0.0.0.0.3.1.0" width="0.579" height="0.033" transform="translate(0)" fill="#b3b3b3" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <g id="_x30_.1.11.0.0.0.0.0.4" transform="translate(0.22 0.672)">
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.0" d="M.07,0,0,.652H.5L.425,0Z" transform="translate(0 2.972)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.11.0.0.0.0.0.4.1" transform="translate(0.204 1.995)">
                                                                                                <path id="_x30_.1.11.0.0.0.0.0.4.1.0" d="M0,1.018V1.012A1.639,1.639,0,0,1,.11.607C.164.465.64.228.581.046A.035.035,0,0,1,.61,0,.044.044,0,0,1,.663.028C.728.234.245.484.188.633a1.435,1.435,0,0,0-.105.388.04.04,0,0,1-.046.033A.04.04,0,0,1,0,1.018Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.2" d="M.425.654.495,0H0L.07.654Z" transform="translate(1.601)" fill="#d1c690" />
                                                                                            <g id="_x30_.1.11.0.0.0.0.0.4.3" transform="translate(0.995 0.421)">
                                                                                                <path id="_x30_.1.11.0.0.0.0.0.4.3.0" d="M0,1.353a.04.04,0,0,1,.032-.037A1.783,1.783,0,0,0,.812.039.039.039,0,0,1,.855,0,.042.042,0,0,1,.9.039h0A1.754,1.754,0,0,1,.054,1.39.045.045,0,0,1,0,1.363.023.023,0,0,1,0,1.353Z" fill="#d1c690" />
                                                                                            </g>
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.4" d="M.211.259S.212.018,0,0V.259Z" transform="translate(0.775 1.833)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.5" d="M.261.133S.054.24.023.169-.012.049.042.007.261.133.261.133Z" transform="translate(0.941 1.665)" fill="#d1c690" />
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.6" d="M.583,0C.64.183.164.419.11.561A1.519,1.519,0,0,0,0,.966H.04A1.639,1.639,0,0,1,.15.561C.2.419.68.182.621,0Z" transform="translate(0.167 2.041)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.7" d="M.07.654,0,0H.037l.07.654Z" transform="translate(1.564)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.8" d="M0,1.277A1.639,1.639,0,0,0,.778,0H.819A1.573,1.573,0,0,1,.039,1.278Z" transform="translate(0.99 0.459)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.9" d="M0,0V.258H.039V0Z" transform="translate(0.737 1.833)" fill="#9d956c" />
                                                                                            <path id="_x30_.1.11.0.0.0.0.0.4.10" d="M.043,0C-.012.043-.009.089.022.161H.062C.029.09.027.041.081,0Z" transform="translate(0.905 1.671)" fill="#9d956c" />
                                                                                        </g>
                                                                                        <g id="g22232" transform="translate(2.6 1.036) rotate(90)">
                                                                                            <g id="g22234">
                                                                                                <g id="g22236">
                                                                                                    <g id="g22238">
                                                                                                        <g id="_x30_.1.11.0.0.0.0.0.5">
                                                                                                            <rect id="_x30_.1.11.0.0.0.0.0.5.0" width="2.861" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.11.0.0.0.0.0.6" d="M2.6,0H0V3.6l2.6,0Z" transform="translate(0.003 0.684)" fill="#f2f2f2" opacity="0.5" />
                                                                                        <path id="_x30_.1.11.0.0.0.0.0.7" d="M.087,0H.271c.1.012.184-.008.184.066V3.355c0,.114-.044.119-.044-.008V.4C.41.093.339.051.277.051H.093C-.03.052-.03,0,.087,0Z" transform="translate(2.07 0.718)" fill="#fff" opacity="0.55" />
                                                                                        <path id="_x30_.1.11.0.0.0.0.0.8" d="M.094,3.417C.047,3.417,0,3.425,0,3.35V.087C0-.027.044-.033.044.092c0,.091,0,2.126,0,2.432C.046,2.927.094,3.417.094,3.417Z" transform="translate(0.06 0.775)" opacity="0.03" />
                                                                                        <path id="_x30_.1.11.0.0.0.0.0.9" d="M0,.035V.557H.353A.2.2,0,0,1,.535.684H2.6V0H0" transform="translate(0.001)" fill="#d1c690" />
                                                                                        <g id="g22246" transform="translate(2.6 0.001) rotate(90)">
                                                                                            <g id="g22248" transform="translate(0 0)">
                                                                                                <g id="g22250">
                                                                                                    <g id="g22252">
                                                                                                        <g id="_x30_.1.11.0.0.0.0.0.10">
                                                                                                            <rect id="_x30_.1.11.0.0.0.0.0.10.0" width="0.682" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                        <path id="_x30_.1.11.0.0.0.0.0.11" d="M0,.726H2.6V0H.251A.214.214,0,0,1,.068.129H0V.692" transform="translate(0 4.286)" fill="#d1c690" />
                                                                                        <g id="g22257" transform="translate(2.6 4.286) rotate(90)">
                                                                                            <g id="g22259">
                                                                                                <g id="g22261">
                                                                                                    <g id="g22263">
                                                                                                        <g id="_x30_.1.11.0.0.0.0.0.12">
                                                                                                            <rect id="_x30_.1.11.0.0.0.0.0.12.0" width="0.726" height="0.035" fill="#fff" opacity="0.5" />
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22267" transform="translate(19.86 62.533)">
                    <g id="g22269" transform="translate(0 0)">
                        <g id="g22271">
                            <g id="g22273">
                                <g id="_x30_.1.12">
                                    <g id="sot223">
                                        <g id="g22277" transform="translate(13.634 0) rotate(90)">
                                            <g id="g22279" transform="translate(0 0)">
                                                <g id="g22281">
                                                    <g id="g22283">
                                                        <g id="_x30_.1.12.0.0">
                                                            <g id="_x30_.1.12.0.0.0">
                                                                <g id="_x30_.1.12.0.0.0.0">
                                                                    <g id="g22288" transform="translate(12.103 0) rotate(90)">
                                                                        <g id="g22290">
                                                                            <g id="g22292">
                                                                                <g id="g22294">
                                                                                    <g id="_x30_.1.12.0.0.0.0.0">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.0.0" width="3.317" height="2.343" fill="#999" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22298" transform="translate(7.662 0.001) rotate(90)">
                                                                        <g id="g22300">
                                                                            <g id="g22302">
                                                                                <g id="g22304">
                                                                                    <g id="_x30_.1.12.0.0.0.0.1">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.1.0" width="3.317" height="2.344" fill="#999" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22308" transform="translate(3.22) rotate(90)">
                                                                        <g id="g22310" transform="translate(0 0)">
                                                                            <g id="g22312">
                                                                                <g id="g22314">
                                                                                    <g id="_x30_.1.12.0.0.0.0.2">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.2.0" width="3.317" height="2.341" transform="translate(0 0)" fill="#999" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22318" transform="translate(12.103 0) rotate(90)">
                                                                        <g id="g22320" transform="translate(0 0)">
                                                                            <g id="g22322">
                                                                                <g id="g22324">
                                                                                    <g id="_x30_.1.12.0.0.0.0.3">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.3.0" width="0.099" height="2.343" transform="translate(0 0)" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22328" transform="translate(7.662 0.001) rotate(90)">
                                                                        <g id="g22330" transform="translate(0 0)">
                                                                            <g id="g22332">
                                                                                <g id="g22334">
                                                                                    <g id="_x30_.1.12.0.0.0.0.4">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.4.0" width="0.099" height="2.344" transform="translate(0 0)" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22338" transform="translate(3.22) rotate(90)">
                                                                        <g id="g22340" transform="translate(0 0)">
                                                                            <g id="g22342">
                                                                                <g id="g22344">
                                                                                    <g id="_x30_.1.12.0.0.0.0.5">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.5.0" width="0.099" height="2.341" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22348" transform="translate(9.947 10.053) rotate(90)">
                                                                        <g id="g22350" transform="translate(0 0)">
                                                                            <g id="g22352">
                                                                                <g id="g22354">
                                                                                    <g id="_x30_.1.12.0.0.0.0.6">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.6.0" width="3.581" height="6.916" transform="translate(0 0)" fill="#999" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22358" transform="translate(9.947 13.525) rotate(90)">
                                                                        <g id="g22360">
                                                                            <g id="g22362">
                                                                                <g id="g22364">
                                                                                    <g id="_x30_.1.12.0.0.0.0.7">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.7.0" width="0.109" height="6.916" transform="translate(0)" fill="#fff" opacity="0.2" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="g22368" transform="translate(12.981 3.318) rotate(90)">
                                                                        <g id="g22370" transform="translate(0 0)">
                                                                            <g id="g22372">
                                                                                <g id="g22374">
                                                                                    <g id="_x30_.1.12.0.0.0.0.8">
                                                                                        <rect id="_x30_.1.12.0.0.0.0.8.0" width="6.737" height="12.981" transform="translate(0)" fill="#303030" />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <path id="_x30_.1.12.0.0.0.0.9" d="M12.983.488H0L.487,0H12.493Z" transform="translate(0 9.565)" fill="#1f1f1f" />
                                                                    <path id="_x30_.1.12.0.0.0.0.10" d="M12.983,0H0L.487.49H12.493Z" transform="translate(0 3.317)" fill="#1f1f1f" />
                                                                    <path id="_x30_.1.12.0.0.0.0.11" d="M.49,6.737V0L0,.49V6.248Z" transform="translate(12.493 3.317)" />
                                                                    <path id="_x30_.1.12.0.0.0.0.12" d="M0,6.737V0L.487.49V6.248Z" transform="translate(0 3.317)" fill="#3d3d3d" />
                                                                    <circle id="_x30_.1.12.0.0.0.0.13" cx="0.488" cy="0.488" r="0.488" transform="translate(11.03 4.295)" fill="#1f1f1f" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22383" transform="translate(8.783 78.799)">
                    <g id="g22385" transform="translate(0 0)">
                        <g id="g22387">
                            <g id="g22389">
                                <g id="_x30_.1.13">
                                    <g id="powersupply_dc-21mm">
                                        <g id="g22393" transform="translate(26.52) rotate(90)">
                                            <g id="g22395" transform="translate(0)">
                                                <g id="g22397">
                                                    <g id="g22399">
                                                        <g id="_x30_.1.13.0.0">
                                                            <g id="_x30_.1.13.0.0.0">
                                                                <g id="g22403">
                                                                    <g id="g22405">
                                                                        <g id="g22407">
                                                                            <g id="g22409">
                                                                                <g id="_x30_.1.13.0.0.0.0">
                                                                                    <g id="dc-21mm">
                                                                                        <g id="g22413" transform="translate(17.286 0) rotate(90)">
                                                                                            <g id="g22415">
                                                                                                <g id="g22417">
                                                                                                    <g id="g22419">
                                                                                                        <g id="_x30_.1.13.0.0.0.0.0.0">
                                                                                                            <g id="_x30_.1.13.0.0.0.0.0.0.0">
                                                                                                                <g id="_x30_.1.13.0.0.0.0.0.0.0.0" transform="translate(1.153 0.602)">
                                                                                                                    <g id="_x30_.1.13.0.0.0.0.0.0.0.0.0">
                                                                                                                        <rect id="_x30_.1.13.0.0.0.0.0.0.0.0.0.0" width="22.339" height="16.079" fill="#232323" />
                                                                                                                        <rect id="_x30_.1.13.0.0.0.0.0.0.0.0.0.1" width="21.638" height="1.115" transform="translate(0.292 14.576)" fill="#494949" />
                                                                                                                        <rect id="_x30_.1.13.0.0.0.0.0.0.0.0.0.2" width="21.638" height="3.638" transform="translate(0.293 10.937)" fill="rgba(61,61,61,0.3)" />
                                                                                                                        <rect id="_x30_.1.13.0.0.0.0.0.0.0.0.0.3" width="22.34" height="1.097" transform="translate(0.292 0.35)" />
                                                                                                                        <rect id="_x30_.1.13.0.0.0.0.0.0.0.0.0.4" width="22.34" height="3.947" transform="translate(0.292 1.416)" fill="rgba(15,15,15,0.4)" />
                                                                                                                    </g>
                                                                                                                    <rect id="_x30_.1.13.0.0.0.0.0.0.0.0.1" width="0.401" height="16.078" transform="translate(0 0.001)" opacity="0.2" />
                                                                                                                </g>
                                                                                                                <line id="_x30_.1.13.0.0.0.0.0.0.0.1" y2="16.079" transform="translate(3.057 0.602)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" opacity="0.5" />
                                                                                                                <g id="_x30_.1.13.0.0.0.0.0.0.0.2" transform="translate(7.685 0.587)">
                                                                                                                    <rect id="_x30_.1.13.0.0.0.0.0.0.0.2.0" width="0.872" height="16.077" transform="translate(13.437)" opacity="0.25" />
                                                                                                                    <path id="_x30_.1.13.0.0.0.0.0.0.0.2.1" d="M14.118,10.217V0H5.109a5.109,5.109,0,0,0,0,10.218Z" transform="translate(0 2.948)" stroke="#565656" stroke-miterlimit="10" stroke-width="0.25" opacity="0.25" />
                                                                                                                </g>
                                                                                                                <g id="_x30_.1.13.0.0.0.0.0.0.0.3" transform="translate(7.685)">
                                                                                                                    <path id="_x30_.1.13.0.0.0.0.0.0.0.3.0" d="M14.118,10.217V0H5.109a5.109,5.109,0,0,0,0,10.218Z" transform="translate(0 3.535)" fill="#232323" />
                                                                                                                    <rect id="_x30_.1.13.0.0.0.0.0.0.0.3.1" width="5.209" height="17.286" transform="translate(13.626 0)" fill="#232323" />
                                                                                                                </g>
                                                                                                                <rect id="_x30_.1.13.0.0.0.0.0.0.0.4" width="1.152" height="3.871" transform="translate(0 6.708)" fill="#6d6d6d" />
                                                                                                                <rect id="_x30_.1.13.0.0.0.0.0.0.0.5" width="0.661" height="7.606" transform="translate(0.493 4.841)" fill="#494949" />
                                                                                                                <rect id="_x30_.1.13.0.0.0.0.0.0.0.6" width="4.245" height="0.712" transform="translate(21.804 16.294)" fill="#494949" />
                                                                                                                <rect id="_x30_.1.13.0.0.0.0.0.0.0.7" width="4.246" height="0.712" transform="translate(21.804 0.245)" />
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22442" transform="translate(0 15.505)">
                    <g id="g22444" transform="translate(0 0)">
                        <g id="g22446">
                            <g id="g22448">
                                <g id="_x30_.1.14">
                                    <g id="pn61729">
                                        <g id="g22452" transform="translate(0 27.527) rotate(-90)">
                                            <g id="g22454" transform="translate(0)">
                                                <g id="g22456">
                                                    <g id="g22458">
                                                        <g id="_x30_.1.14.0.0">
                                                            <g id="_x30_.1.14.0.0.0">
                                                                <g id="_x30_.1.14.0.0.0.0">
                                                                    <g id="_x30_.1.14.0.0.0.0.0" transform="translate(24.764 11.84)">
                                                                        <path id="_x30_.1.14.0.0.0.0.0.0" d="M2.762,1.306v2H0V0H2.148a.615.615,0,0,1,.615.615S2.763,1.306,2.762,1.306Z" fill="#999" />
                                                                        <path id="_x30_.1.14.0.0.0.0.0.1" d="M2.762.547H0V0H2.248C2.521,0,2.762.379,2.762.547Z" fill="gray" />
                                                                    </g>
                                                                    <g id="_x30_.1.14.0.0.0.0.1" transform="translate(2.762)">
                                                                        <g id="g22467" transform="translate(0.001 29.978) rotate(-90)">
                                                                            <g id="g22469" transform="translate(0)">
                                                                                <g id="g22471">
                                                                                    <g id="g22473">
                                                                                        <g id="_x30_.1.14.0.0.0.0.1.0">
                                                                                            <rect id="_x30_.1.14.0.0.0.0.1.0.0" width="24.853" height="22.005" fill="#b3b3b3" />
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                        <g id="g22477" transform="translate(0 5.126) rotate(-90)">
                                                                            <g id="g22479">
                                                                                <g id="g22481">
                                                                                    <g id="g22483">
                                                                                        <g id="_x30_.1.14.0.0.0.0.1.1">
                                                                                            <rect id="_x30_.1.14.0.0.0.0.1.1.0" width="5.126" height="22.005" fill="#999" />
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                        <g id="g22487" transform="translate(0.001 29.98) rotate(-90)">
                                                                            <g id="g22489">
                                                                                <g id="g22491">
                                                                                    <g id="g22493">
                                                                                        <g id="_x30_.1.14.0.0.0.0.1.2">
                                                                                            <rect id="_x30_.1.14.0.0.0.0.1.2.0" width="29.979" height="1.386" transform="translate(0)" fill="#ccc" opacity="0.5" />
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                        <g id="g22497" transform="translate(20.619 29.979) rotate(-90)">
                                                                            <g id="g22499">
                                                                                <g id="g22501">
                                                                                    <g id="g22503">
                                                                                        <g id="_x30_.1.14.0.0.0.0.1.3">
                                                                                            <rect id="_x30_.1.14.0.0.0.0.1.3.0" width="29.979" height="1.387" opacity="0.2" />
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="_x30_.1.14.0.0.0.0.2" transform="translate(0 11.839)">
                                                                        <path id="_x30_.1.14.0.0.0.0.2.0" d="M0,1.306v2H2.762V0H.613A.613.613,0,0,0,0,.615Z" transform="translate(0)" fill="#b3b3b3" />
                                                                        <path id="_x30_.1.14.0.0.0.0.2.1" d="M0,.547H2.762V0H.514C.24,0,0,.379,0,.547Z" fill="#e6e6e6" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22510" transform="translate(14.758 0.683)">
                    <g id="g22512" transform="translate(0)">
                        <g id="g22514">
                            <g id="g22516">
                                <g id="_x30_.1.15">
                                    <g id="smd_157sw">
                                        <g id="g22520" transform="translate(1.756 12.561) rotate(-90)">
                                            <g id="g22522">
                                                <g id="g22524">
                                                    <g id="g22526">
                                                        <g id="_x30_.1.15.0.0">
                                                            <g id="_x30_.1.15.0.0.0">
                                                                <path id="_x30_.1.15.0.0.0.0" d="M0,14.063H10.826V0H0V4.233H.249v5.6H0Z" transform="translate(0 0.002)" fill="#ccc" />
                                                                <path id="_x30_.1.15.0.0.0.1" d="M10.746,0H0V14.063H10.746V9.832H10.5v-5.6h.25Z" transform="translate(1.815 0.002)" fill="#ccc" />
                                                                <circle id="_x30_.1.15.0.0.0.2" cx="3.467" cy="3.467" r="3.467" transform="translate(2.812 3.568)" fill="#641d1c" />
                                                                <path id="_x30_.1.15.0.0.0.3" d="M.169,6.934A3.466,3.466,0,0,0,3.636,3.469,3.468,3.468,0,0,0,.169,0H0A3.468,3.468,0,0,1,3.468,3.469,3.466,3.466,0,0,1,0,6.934Z" transform="translate(6.279 3.567)" opacity="0.2" />
                                                                <circle id="_x30_.1.15.0.0.0.4" cx="3.34" cy="3.34" r="3.34" transform="translate(2.939 3.695)" fill="#852725" />
                                                                <circle id="_x30_.1.15.0.0.0.5" cx="3.34" cy="3.34" r="3.34" transform="translate(2.861 3.696)" fill="#852725" />
                                                                <g id="_x30_.1.15.0.0.0.6" transform="translate(2.939 3.616)">
                                                                    <path id="_x30_.1.15.0.0.0.6.0" d="M0,.158a3.34,3.34,0,1,0,6.68,0V0a3.34,3.34,0,0,1-3.34,3.341A3.34,3.34,0,0,1,0,0Z" transform="translate(0.001 3.341)" opacity="0.1" />
                                                                    <path id="_x30_.1.15.0.0.0.6.1" d="M6.68,3.5A3.34,3.34,0,1,0,0,3.5V3.341a3.34,3.34,0,1,1,6.68,0Z" fill="#fff" opacity="0.2" />
                                                                </g>
                                                                <g id="g22539" transform="translate(0 4.233) rotate(-90)">
                                                                    <g id="g22541" transform="translate(0)">
                                                                        <g id="g22543">
                                                                            <g id="g22545">
                                                                                <g id="_x30_.1.15.0.0.0.7">
                                                                                    <rect id="_x30_.1.15.0.0.0.7.0" width="4.233" height="0.251" fill="#fff" opacity="0.2" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <g id="g22549" transform="translate(0 14.064) rotate(-90)">
                                                                    <g id="g22551" transform="translate(0)">
                                                                        <g id="g22553">
                                                                            <g id="g22555">
                                                                                <g id="_x30_.1.15.0.0.0.8">
                                                                                    <rect id="_x30_.1.15.0.0.0.8.0" width="4.23" height="0.251" fill="#fff" opacity="0.2" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <g id="g22559" transform="translate(0.25 9.833) rotate(-90)">
                                                                    <g id="g22561" transform="translate(0)">
                                                                        <g id="g22563">
                                                                            <g id="g22565">
                                                                                <g id="_x30_.1.15.0.0.0.9">
                                                                                    <rect id="_x30_.1.15.0.0.0.9.0" width="5.6" height="0.249" fill="#fff" opacity="0.2" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <g id="g22569" transform="translate(12.302 4.233) rotate(-90)">
                                                                    <g id="g22571" transform="translate(0)">
                                                                        <g id="g22573">
                                                                            <g id="g22575">
                                                                                <g id="_x30_.1.15.0.0.0.10">
                                                                                    <rect id="_x30_.1.15.0.0.0.10.0" width="4.233" height="0.249" opacity="0.2" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <g id="g22579" transform="translate(12.3 14.063) rotate(-90)">
                                                                    <g id="g22581">
                                                                        <g id="g22583">
                                                                            <g id="g22585">
                                                                                <g id="_x30_.1.15.0.0.0.11">
                                                                                    <rect id="_x30_.1.15.0.0.0.11.0" width="4.23" height="0.25" opacity="0.2" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <g id="g22589" transform="translate(12.051 9.834) rotate(-90)">
                                                                    <g id="g22591">
                                                                        <g id="g22593">
                                                                            <g id="g22595">
                                                                                <g id="_x30_.1.15.0.0.0.12">
                                                                                    <rect id="_x30_.1.15.0.0.0.12.0" width="5.601" height="0.25" opacity="0.2" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                        <g id="_x30_.1.15.0.1" transform="translate(0 1.355)">
                                            <rect id="_x30_.1.15.0.1.0" width="1.863" height="1.525" transform="translate(15.837 8.313)" fill="#e6e6e6" />
                                            <rect id="_x30_.1.15.0.1.1" width="1.863" height="1.526" transform="translate(15.837 0.013)" fill="#e6e6e6" />
                                            <rect id="_x30_.1.15.0.1.2" width="1.863" height="2.315" transform="translate(0 3.712)" fill="#e6e6e6" />
                                            <rect id="_x30_.1.15.0.1.3" width="1.863" height="1.525" transform="translate(0 8.313)" fill="#e6e6e6" />
                                            <rect id="_x30_.1.15.0.1.4" width="1.863" height="1.526" transform="translate(0 0.013)" fill="#e6e6e6" />
                                            <rect id="_x30_.1.15.0.1.5" width="0.226" height="2.315" transform="translate(0 3.712)" fill="#fff" opacity="0.2" />
                                            <rect id="_x30_.1.15.0.1.6" width="0.226" height="1.525" transform="translate(0 8.313)" fill="#fff" opacity="0.2" />
                                            <rect id="_x30_.1.15.0.1.7" width="0.226" height="1.526" transform="translate(0 0.013)" fill="#fff" opacity="0.2" />
                                            <rect id="_x30_.1.15.0.1.8" width="0.07" height="1.525" transform="translate(17.66 8.3)" opacity="0.2" />
                                            <rect id="_x30_.1.15.0.1.9" width="0.07" height="1.526" transform="translate(17.66)" opacity="0.2" />
                                            <rect id="_x30_.1.15.0.1.10" width="0.226" height="1.525" transform="translate(15.848 8.322)" opacity="0.1" />
                                            <rect id="_x30_.1.15.0.1.11" width="0.226" height="1.526" transform="translate(15.848 0.022)" opacity="0.1" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="_x30_.1.16" transform="translate(18.477 13.145)">
                    <g id="g22614" transform="translate(0 0)">
                        <g id="g22616" transform="translate(0 0)">
                            <g id="g22618">
                                <g id="g22620">
                                    <g id="_x30_.1.16.1">
                                        <g id="g22623" transform="translate(0 0)">
                                            <g id="g22625">
                                                <g id="g22627">
                                                    <g id="g22629">
                                                        <text id="_x30_.1.16.1.0" transform="translate(0 2)" fill="#fff" font-size="2" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">RESET</tspan></text>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="g22632" transform="translate(45.662 2.439)">
                    <g id="g22634" transform="translate(0 0)">
                        <g id="g22636">
                            <g id="g22638">
                                <g id="_x30_.1.17">
                                    <g id="_x31_x10">
                                        <rect id="_x30_.1.17.0.0" width="48.782" height="4.878" fill="#404040" />
                                        <rect id="_x30_.1.17.0.1" width="1.883" height="1.885" transform="translate(1.498 1.497)" />
                                        <path id="_x30_.1.17.0.2" d="M1.137,1.183l.693.694H3.716l.7-.694Z" transform="translate(-0.333 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.3" d="M5.638,1.183l-.7.7V3.764l.7.693Z" transform="translate(-1.561 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.4" d="M4.411,5.685l-.7-.693H1.83l-.693.693Z" transform="translate(-0.333 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.5" d="M1.135,4.457l.694-.694V1.877l-.694-.694Z" transform="translate(-0.333 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.6" width="1.884" height="1.885" transform="translate(6.377 1.497)" />
                                        <path id="_x30_.1.17.0.7" d="M8.336,1.183l.693.694h1.886l.7-.694Z" transform="translate(-2.655 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.8" d="M12.837,1.183l-.7.7V3.764l.7.693Z" transform="translate(-3.882 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.9" d="M11.61,5.685l-.7-.693H9.029l-.693.693Z" transform="translate(-2.655 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.10" d="M8.334,4.457l.694-.694V1.877l-.694-.694Z" transform="translate(-2.654 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.11" width="1.883" height="1.885" transform="translate(11.254 1.497)" />
                                        <path id="_x30_.1.17.0.12" d="M15.535,1.183l.693.694h1.888l.694-.694Z" transform="translate(-4.976 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.13" d="M20.038,1.183l-.694.7V3.764l.694.693Z" transform="translate(-6.205 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.14" d="M18.809,5.685l-.693-.693H16.228l-.693.693Z" transform="translate(-4.976 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.15" d="M15.535,4.457l.693-.694V1.877l-.693-.694Z" transform="translate(-4.976 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.16" width="1.884" height="1.885" transform="translate(16.133 1.497)" />
                                        <path id="_x30_.1.17.0.17" d="M22.736,1.183l.7.694h1.886l.693-.694Z" transform="translate(-7.299 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.18" d="M27.238,1.183l-.693.7V3.764l.693.693Z" transform="translate(-8.527 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.19" d="M26.01,5.685l-.694-.693H23.431l-.7.693Z" transform="translate(-7.299 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.20" d="M22.734,4.457l.7-.694V1.877l-.7-.694Z" transform="translate(-7.298 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.21" width="1.883" height="1.885" transform="translate(21.012 1.497)" />
                                        <path id="_x30_.1.17.0.22" d="M29.935,1.183l.7.694h1.886l.693-.694Z" transform="translate(-9.62 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.23" d="M34.437,1.183l-.693.7V3.764l.693.693Z" transform="translate(-10.848 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.24" d="M33.207,5.685l-.693-.693H30.63l-.7.693Z" transform="translate(-9.62 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.25" d="M29.933,4.457l.7-.694V1.877l-.7-.694Z" transform="translate(-9.619 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.26" width="1.883" height="1.885" transform="translate(25.89 1.497)" />
                                        <path id="_x30_.1.17.0.27" d="M37.137,1.183l.693.694h1.886l.7-.694Z" transform="translate(-11.942 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.28" d="M41.639,1.183l-.7.7V3.764l.7.693Z" transform="translate(-13.17 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.29" d="M40.411,5.685l-.7-.693H37.83l-.693.693Z" transform="translate(-11.942 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.30" d="M37.135,4.457l.694-.694V1.877l-.694-.694Z" transform="translate(-11.942 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.31" width="1.884" height="1.885" transform="translate(30.767 1.497)" />
                                        <path id="_x30_.1.17.0.32" d="M44.339,1.183l.691.694h1.885l.7-.694Z" transform="translate(-14.265 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.33" d="M48.838,1.183l-.7.7V3.764l.7.693Z" transform="translate(-15.491 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.34" d="M47.611,5.685l-.7-.693H45.03l-.691.693Z" transform="translate(-14.265 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.35" d="M44.336,4.457l.693-.694V1.877l-.693-.694Z" transform="translate(-14.264 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.36" width="1.883" height="1.885" transform="translate(35.645 1.497)" />
                                        <path id="_x30_.1.17.0.37" d="M51.535,1.183l.692.694h1.889l.692-.694Z" transform="translate(-16.585 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.38" d="M56.037,1.183l-.692.7V3.764l.692.693Z" transform="translate(-17.814 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.39" d="M54.809,5.685l-.692-.693H52.227l-.692.693Z" transform="translate(-16.585 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.40" d="M51.533,4.457l.694-.694V1.877l-.694-.694Z" transform="translate(-16.585 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.41" width="1.884" height="1.885" transform="translate(40.524 1.497)" />
                                        <path id="_x30_.1.17.0.42" d="M58.736,1.183l.7.694h1.886l.692-.694Z" transform="translate(-18.907 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.43" d="M63.238,1.183l-.692.7V3.764l.692.693Z" transform="translate(-20.136 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.44" d="M62.008,5.685l-.692-.693H59.431l-.7.693Z" transform="translate(-18.907 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.45" d="M58.734,4.457l.7-.694V1.877l-.7-.694Z" transform="translate(-18.907 -0.381)" fill="#373737" />
                                        <rect id="_x30_.1.17.0.46" width="1.882" height="1.885" transform="translate(45.403 1.497)" />
                                        <path id="_x30_.1.17.0.47" d="M65.934,1.183l.7.694h1.884l.694-.694Z" transform="translate(-21.229 -0.381)" fill="#2a2a29" />
                                        <path id="_x30_.1.17.0.48" d="M70.436,1.183l-.694.7V3.764l.694.693Z" transform="translate(-22.457 -0.381)" fill="#474747" />
                                        <path id="_x30_.1.17.0.49" d="M69.206,5.685l-.692-.693H66.63l-.7.693Z" transform="translate(-21.229 -1.609)" fill="#595959" />
                                        <path id="_x30_.1.17.0.50" d="M65.932,4.457l.7-.694V1.877l-.7-.694Z" transform="translate(-21.228 -0.381)" fill="#373737" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            <rect id="rect23416" width="3.696" height="2.568" transform="translate(71.507 29.858)" fill="rgba(255,255,0,0.38)" />
            <rect id="rect23418" width="3.696" height="2.634" transform="translate(132.098 38.98)" fill="rgba(0,255,0,0.38)" />
        </g>
    </svg>]

const mello_temp = [<svg xmlns="http://www.w3.org/2000/svg" width="84.996" height="94.827" viewBox="0 0 84.996 94.827">
    <path id="robot-svgrepo-com" d="M109,75.268a8.083,8.083,0,0,0-4.915-7.722V60.522a4.818,4.818,0,0,0-4.813-4.813H89.437a4.818,4.818,0,0,0-4.813,4.813h0V73.732H74.588V71.991a1.743,1.743,0,0,1,1.741-1.741h1.638a3.178,3.178,0,0,0,3.175-3.175V63.8A3.176,3.176,0,0,0,79.5,61.022v-4.4a5.645,5.645,0,0,0,3.23-4.4h19.811a1.536,1.536,0,0,0,1.536-1.536V47.2a3.194,3.194,0,0,0-2.741-3.145L79.5,41.153V40.86a3.178,3.178,0,0,0-3.175-3.175H72.95V34.306a3.178,3.178,0,0,0-3.175-3.175H68.034V27.4a4.835,4.835,0,0,0,3.024-3.024h4.253a5.631,5.631,0,0,0,10.747-2.355V14.542h3.379a1.536,1.536,0,0,0,1.536-1.536V8.09A3.178,3.178,0,0,0,87.8,4.915h-.816L84.161.684A1.535,1.535,0,0,0,82.883,0H77.968A1.535,1.535,0,0,0,76.69.684L73.869,4.915h-.816A3.178,3.178,0,0,0,69.878,8.09v4.915a1.536,1.536,0,0,0,1.536,1.536h3.379V21.3H71.059a4.812,4.812,0,0,0-9.121,0H58.2V14.542h3.379a1.536,1.536,0,0,0,1.536-1.536V8.09a3.178,3.178,0,0,0-3.175-3.175h-.816L56.307.684A1.535,1.535,0,0,0,55.029,0H50.113a1.535,1.535,0,0,0-1.278.684L46.014,4.915H45.2A3.178,3.178,0,0,0,42.023,8.09v4.915a1.536,1.536,0,0,0,1.536,1.536h3.379v7.476a5.631,5.631,0,0,0,10.747,2.355h4.253A4.834,4.834,0,0,0,64.962,27.4v3.735H63.221a3.178,3.178,0,0,0-3.175,3.175v3.379H56.668a3.178,3.178,0,0,0-3.175,3.175v.293l-21.852,2.9A3.19,3.19,0,0,0,28.915,47.2v3.494a1.536,1.536,0,0,0,1.536,1.536H50.263a5.645,5.645,0,0,0,3.23,4.4v4.005a1.742,1.742,0,0,0-1.638,1.736v4.711a3.178,3.178,0,0,0,3.175,3.175h1.638a1.743,1.743,0,0,1,1.741,1.741v1.741H48.372V60.522a4.818,4.818,0,0,0-4.813-4.813H33.729a4.818,4.818,0,0,0-4.813,4.813v7.024a8.523,8.523,0,0,0,0,15.444v7.024a4.818,4.818,0,0,0,4.813,4.813h9.831a4.818,4.818,0,0,0,4.813-4.813V76.8H58.408v1.741a4.818,4.818,0,0,0,4.813,4.813h6.554a4.818,4.818,0,0,0,4.813-4.813V76.8H84.624v13.21a4.818,4.818,0,0,0,4.813,4.813h9.831a4.818,4.818,0,0,0,4.813-4.813V82.99A8.083,8.083,0,0,0,109,75.268ZM78.79,3.072h3.271L83.29,4.915H77.561ZM72.95,8.09a.1.1,0,0,1,.1-.1H87.8a.1.1,0,0,1,.1.1v3.379H72.95V8.09Zm10.036,6.452v7.476a2.56,2.56,0,0,1-5.12,0V14.542ZM50.935,3.072h3.271l1.229,1.843H49.707ZM45.1,8.09a.1.1,0,0,1,.1-.1H59.944a.1.1,0,0,1,.1.1v3.379H45.1V8.09Zm7.476,16.487a2.563,2.563,0,0,1-2.56-2.56V14.542h5.12v7.476A2.563,2.563,0,0,1,52.571,24.577ZM66.5,21.1a1.741,1.741,0,1,1-1.741,1.741A1.743,1.743,0,0,1,66.5,21.1ZM45.3,72.239,31.988,73.571V70.1L45.3,68.773ZM31.988,76.658,45.3,75.327v3.466L31.988,80.124ZM45.3,62.219v3.466L31.988,67.017V63.55ZM31.988,83.212,45.3,81.881v3.466L31.988,86.678Zm1.741-24.431h9.831a1.733,1.733,0,0,1,1.123.412L31.991,60.462A1.742,1.742,0,0,1,33.729,58.781ZM27.072,75.268a5.462,5.462,0,0,1,1.843-4.2v8.4A5.462,5.462,0,0,1,27.072,75.268ZM43.559,91.755H33.729a1.743,1.743,0,0,1-1.741-1.741v-.248L45.3,88.435v1.58A1.743,1.743,0,0,1,43.559,91.755ZM77.148,54.07a2.56,2.56,0,1,1,2.56-2.56A2.563,2.563,0,0,1,77.148,54.07Zm23.772-6.975a.1.1,0,0,1,.088.1v1.958H82.263A5.666,5.666,0,0,0,79.5,46.4V44.252Zm-37.8-12.789a.1.1,0,0,1,.1-.1h6.554a.1.1,0,0,1,.1.1v3.379H63.119Zm-6.452,6.452H76.329a.1.1,0,0,1,.1.1v5.065a5.631,5.631,0,0,0,0,11.17v3.529H56.565V57.1a5.631,5.631,0,0,0,0-11.17V40.86A.1.1,0,0,1,56.667,40.757ZM31.988,47.2a.1.1,0,0,1,.073-.1l21.432-2.845V46.4a5.666,5.666,0,0,0-2.759,2.759H31.988Zm23.86,1.754a2.56,2.56,0,1,1-2.56,2.56A2.563,2.563,0,0,1,55.848,48.95Zm-.922,18.126V63.7H77.968a.1.1,0,0,1,.1.1v3.277a.1.1,0,0,1-.1.1H55.029A.1.1,0,0,1,54.926,67.076Zm16.59,11.469a1.743,1.743,0,0,1-1.741,1.741H63.221a1.743,1.743,0,0,1-1.741-1.741V71.991a4.788,4.788,0,0,0-.327-1.741h10.69a4.788,4.788,0,0,0-.327,1.741v6.554ZM101.009,63.55v3.466L87.7,65.685V62.219ZM87.7,68.773,101.009,70.1V73.57L87.7,72.239Zm13.313,7.885v3.466L87.7,78.793V75.327ZM87.7,81.881l13.313,1.331v3.466L87.7,85.347Zm18.228-6.613a5.463,5.463,0,0,1-1.843,4.2v-8.4A5.463,5.463,0,0,1,105.924,75.268ZM99.268,58.781a1.742,1.742,0,0,1,1.738,1.682L88.314,59.193a1.733,1.733,0,0,1,1.123-.412Zm0,32.975H89.437A1.743,1.743,0,0,1,87.7,90.014v-1.58l13.313,1.331v.248A1.743,1.743,0,0,1,99.268,91.755Z" transform="translate(-24)" fill="#00ff19" />
</svg>
]
const svgs = {
    Loop:
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="21.961" height="25.013" viewBox="0 0 21.961 25.013">
                <g id="Group_406" data-name="Group 406" transform="translate(-2.905 -1314.595)">
                    <path id="Path_264" data-name="Path 264" d="M0,8.478V0H18.475" transform="translate(23.452 1334.96) rotate(180)" fill="none" stroke="#fff" stroke-width="2" />
                    <path id="Path_265" data-name="Path 265" d="M-20.935,1250.045v-8.478H-2.46" transform="translate(25.254 77.676)" fill="none" stroke="#fff" stroke-width="2" />
                    <path id="Path_263" data-name="Path 263" d="M0,0H5.573V5.573" transform="translate(8.26 1338.901) rotate(-135)" fill="none" stroke="#fff" stroke-width="2" />
                    <path id="Path_266" data-name="Path 266" d="M0,0H5.573V5.573" transform="translate(19.511 1315.302) rotate(45)" fill="none" stroke="#fff" stroke-width="2" />
                </g>
            </svg>
        </div>
    ,
    Logic:
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24.041" height="20" viewBox="0 0 24.041 20">
                <g id="Path_270" data-name="Path 270" fill="none">
                    <path d="M0,20H20V14.088l4.041,1.158V6.326L20,7.075V0H10.492l1.43,3.466h-4.9L8.653,0H0Z" stroke="none" />
                    <path d="M 17.99999618530273 18 L 17.99999618530273 11.4343900680542 L 22.04141616821289 12.59189128875732 L 22.04141616821289 8.730239868164062 L 17.99999618530273 9.479229927062988 L 17.99999618530273 2 L 13.48047924041748 2 L 14.91034603118896 5.465819835662842 L 3.865156173706055 5.465819835662842 L 5.499288558959961 2 L 1.999996185302734 2 L 1.999996185302734 18 L 17.99999618530273 18 M 19.99999618530273 20 L -3.823241968348157e-06 20 L -3.823241968348157e-06 0 L 8.653446197509766 0 L 7.01931619644165 3.465820074081421 L 11.92169570922852 3.465820074081421 L 10.49182605743408 0 L 19.99999618530273 0 L 19.99999618530273 7.074520111083984 L 24.04141616821289 6.325530052185059 L 24.04141616821289 15.24512004852295 L 19.99999618530273 14.08761978149414 L 19.99999618530273 20 Z" stroke="none" fill="#fff" />
                </g>
            </svg>
        </div>,
    Math: <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="17.345" height="23" viewBox="0 0 17.345 23">
            <g id="Group_407" data-name="Group 407" transform="translate(-5.54 -1.246)">
                <path id="Path_267" data-name="Path 267" d="M3.6,6.611H20.941" transform="translate(1.945 3.308)" fill="none" stroke="#fff" stroke-width="2" />
                <path id="Path_269" data-name="Path 269" d="M3.6,6.611H20.941" transform="translate(1.945 16.636)" fill="none" stroke="#fff" stroke-width="2" />
                <path id="Path_268" data-name="Path 268" d="M0,0H17.345" transform="translate(14.213 18.591) rotate(-90)" fill="none" stroke="#fff" stroke-width="2" />
            </g>
        </svg>
    </div>,
    Text: <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="33" viewBox="0 0 14 33">
            <text id="T" transform="translate(0 27)" fill="#fff" font-size="25" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">T</tspan></text>
        </svg>
    </div>,
    Actuators: <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g id="Path_276" data-name="Path 276" transform="translate(-908 -488)" fill="none" stroke-miterlimit="10">
                <path d="M932,502.656v-5.313h-2.657a9.631,9.631,0,0,0-.859-2.069l1.88-1.881-3.758-3.758-1.881,1.881a9.624,9.624,0,0,0-2.069-.859V488h-5.313v2.657a9.623,9.623,0,0,0-2.069.859l-1.881-1.881-3.757,3.758,1.88,1.881a9.607,9.607,0,0,0-.859,2.069H908v5.313h2.657a9.6,9.6,0,0,0,.859,2.069l-1.88,1.881,3.757,3.758,1.881-1.881a9.608,9.608,0,0,0,2.069.859V512h5.313v-2.657a9.609,9.609,0,0,0,2.069-.859l1.881,1.881,3.758-3.758-1.88-1.881a9.627,9.627,0,0,0,.859-2.069ZM923,500a3,3,0,0,1-.582,1.775,3.024,3.024,0,0,1-.643.643,3,3,0,0,1-3.551,0,3.029,3.029,0,0,1-.643-.643,3,3,0,0,1,0-3.551,3.029,3.029,0,0,1,.643-.643,3,3,0,0,1,3.551,0,3.024,3.024,0,0,1,.643.643A3,3,0,0,1,923,500Z" stroke="none" />
                <path d="M 920.6563720703125 509.9999694824219 L 920.6563720703125 507.8321838378906 L 922.1091918945312 507.4189147949219 C 922.6809692382812 507.2562866210938 923.2322998046875 507.02734375 923.7479858398438 506.7384033203125 L 925.069091796875 505.9981689453125 L 926.6063842773438 507.5355834960938 L 927.5357055664062 506.6062927246094 L 925.9989624023438 505.0693054199219 L 926.7384033203125 503.74853515625 C 927.0272216796875 503.2327575683594 927.2562255859375 502.6811218261719 927.4190063476562 502.1089782714844 L 927.8323974609375 500.6564025878906 L 929.9998779296875 500.6564025878906 L 929.9998779296875 499.3434753417969 L 927.8324584960938 499.3434753417969 L 927.4190673828125 497.8909912109375 C 927.2561645507812 497.3187561035156 927.0271606445312 496.7670593261719 926.7384033203125 496.2512817382812 L 925.9989624023438 494.9304809570312 L 927.53564453125 493.3936767578125 L 926.6063232421875 492.46435546875 L 925.0693359375 494.0012817382812 L 923.7484741210938 493.2616882324219 C 923.2322387695312 492.9726257324219 922.6806640625 492.7436218261719 922.1090698242188 492.5809631347656 L 920.6563720703125 492.1676635742188 L 920.6563720703125 490.0000305175781 L 919.3436279296875 490.0000305175781 L 919.3436279296875 492.1676635742188 L 917.8909301757812 492.5809631347656 C 917.3189697265625 492.7437133789062 916.7673950195312 492.9727172851562 916.2515869140625 493.2615966796875 L 914.9307250976562 494.0013732910156 L 913.3935546875 492.4643859863281 L 912.4644775390625 493.3935852050781 L 914.0015869140625 494.9308166503906 L 913.2615966796875 496.2517700195312 C 912.97265625 496.7675170898438 912.7437133789062 497.3188171386719 912.5812377929688 497.8904113769531 L 912.1681518554688 499.3434753417969 L 910 499.3434753417969 L 910 500.6564025878906 L 912.168212890625 500.6564025878906 L 912.5812377929688 502.1095581054688 C 912.7437133789062 502.6810607910156 912.9725952148438 503.2323303222656 913.2615356445312 503.748046875 L 914.0015869140625 505.0690002441406 L 912.4644775390625 506.6063842773438 L 913.3934936523438 507.5355529785156 L 914.9309692382812 505.9981079101562 L 916.2520751953125 506.7384948730469 C 916.767333984375 507.0272521972656 917.3186645507812 507.2561950683594 917.8908081054688 507.4189147949219 L 919.3436279296875 507.8321838378906 L 919.3436279296875 509.9999694824219 L 920.6563720703125 509.9999694824219 M 919.24462890625 504.9427490234375 C 918.4500732421875 504.822265625 917.6875 504.5064697265625 917.0379638671875 504.028564453125 C 916.6298828125 503.7278442382812 916.270751953125 503.36865234375 915.9703369140625 502.9605102539062 C 915.493408203125 502.3121032714844 915.1776733398438 501.5495300292969 915.0571899414062 500.7551574707031 C 915.0191650390625 500.5078735351562 914.9998779296875 500.2538146972656 914.9998779296875 499.9999694824219 C 914.9998779296875 499.7455444335938 915.0192260742188 499.490966796875 915.0574340820312 499.2432556152344 C 915.177978515625 498.4497680664062 915.4935302734375 497.6878662109375 915.9708862304688 497.0386657714844 C 916.2710571289062 496.6309204101562 916.6301879882812 496.2717590332031 917.0387573242188 495.9708251953125 C 917.687255859375 495.4934692382812 918.4503784179688 495.177490234375 919.2454833984375 495.0570373535156 C 919.7412109375 494.9811096191406 920.2666625976562 494.9819641113281 920.7539672851562 495.0569152832031 C 921.5496215820312 495.1773986816406 922.31298828125 495.4935302734375 922.9607543945312 495.9706420898438 C 923.3688354492188 496.2709045410156 923.7282104492188 496.6302490234375 924.0286865234375 497.0384216308594 C 924.5056762695312 497.6859741210938 924.821533203125 498.4480895996094 924.9423828125 499.2426452636719 C 924.9805297851562 499.4908142089844 924.9998779296875 499.7455749511719 924.9998779296875 499.9999694824219 C 924.9998779296875 500.2535400390625 924.9806518554688 500.5075988769531 924.9426879882812 500.7551574707031 C 924.822021484375 501.55078125 924.5059204101562 502.3138427734375 924.029052734375 502.9610290527344 C 923.728515625 503.3693237304688 923.369140625 503.7286987304688 922.9611206054688 504.0290222167969 C 922.3128662109375 504.5062866210938 921.5501098632812 504.822265625 920.7552490234375 504.9428100585938 C 920.26025390625 505.0186767578125 919.7386474609375 505.0186157226562 919.24462890625 504.9427490234375 M 922.6563720703125 511.9999694824219 L 917.3436279296875 511.9999694824219 L 917.3436279296875 509.3426208496094 C 916.6153564453125 509.1354675292969 915.9217529296875 508.8460388183594 915.2742919921875 508.4831848144531 L 913.3934326171875 510.3640441894531 L 909.63623046875 506.6064147949219 L 911.5167236328125 504.7256164550781 C 911.1539306640625 504.0780944824219 910.864501953125 503.3847351074219 910.657470703125 502.6564025878906 L 908 502.6564025878906 L 908 497.3434753417969 L 910.657470703125 497.3434753417969 C 910.864501953125 496.6152648925781 911.1539306640625 495.9218444824219 911.5167236328125 495.2742614746094 L 909.63623046875 493.3935852050781 L 913.3934326171875 489.6359558105469 L 915.2742919921875 491.5166320800781 C 915.9217529296875 491.1540222167969 916.6153564453125 490.8645324707031 917.3436279296875 490.6573181152344 L 917.3436279296875 488.0000305175781 L 922.6563720703125 488.0000305175781 L 922.6563720703125 490.6573181152344 C 923.3846435546875 490.8645324707031 924.0780029296875 491.1540222167969 924.7255859375 491.5166320800781 L 926.6063232421875 489.6359558105469 L 930.364013671875 493.3935852050781 L 928.4835205078125 495.2742614746094 C 928.8460693359375 495.9218444824219 929.1353759765625 496.6152648925781 929.3426513671875 497.3434753417969 L 931.9998779296875 497.3434753417969 L 931.9998779296875 502.6564025878906 L 929.3426513671875 502.6564025878906 C 929.1353759765625 503.3847351074219 928.8460693359375 504.0780944824219 928.4835205078125 504.7256164550781 L 930.364013671875 506.6064147949219 L 926.6063232421875 510.3640441894531 L 924.7255859375 508.4831848144531 C 924.0780029296875 508.8460388183594 923.3846435546875 509.1354675292969 922.6563720703125 509.3426208496094 L 922.6563720703125 511.9999694824219 Z M 919.9998779296875 496.9999694824219 C 919.8455810546875 496.9999694824219 919.6937255859375 497.0115661621094 919.545654296875 497.0343933105469 C 919.0565185546875 497.1083679199219 918.60595703125 497.3006286621094 918.224365234375 497.5815124511719 C 917.97900390625 497.7622375488281 917.76220703125 497.9789123535156 917.5814208984375 498.2244567871094 C 917.3009033203125 498.6059875488281 917.1083984375 499.0566101074219 917.034423828125 499.5456237792969 C 917.011474609375 499.6936950683594 916.9998779296875 499.8457336425781 916.9998779296875 499.9999694824219 C 916.9998779296875 500.1543273925781 917.011474609375 500.3061218261719 917.034423828125 500.4542541503906 C 917.1083984375 500.9433898925781 917.3009033203125 501.3940734863281 917.5814208984375 501.7754211425781 C 917.76220703125 502.0210266113281 917.97900390625 502.2376403808594 918.224365234375 502.4184265136719 C 918.60595703125 502.6991882324219 919.0565185546875 502.8915710449219 919.545654296875 502.9655456542969 C 919.8421020507812 503.0113830566406 920.1580200195312 503.0113220214844 920.45458984375 502.9655456542969 C 920.9432373046875 502.8915710449219 921.39404296875 502.6991882324219 921.775390625 502.4184265136719 C 922.02099609375 502.2376403808594 922.237548828125 502.0210266113281 922.4183349609375 501.7754211425781 C 922.6993408203125 501.3940734863281 922.8914794921875 500.9433898925781 922.9654541015625 500.4542541503906 C 922.98828125 500.3061218261719 922.9998779296875 500.1543273925781 922.9998779296875 499.9999694824219 C 922.9998779296875 499.8457336425781 922.98828125 499.6936950683594 922.9654541015625 499.5456237792969 C 922.8914794921875 499.0566101074219 922.6993408203125 498.6059875488281 922.4183349609375 498.2244567871094 C 922.237548828125 497.9789123535156 922.02099609375 497.7622375488281 921.775390625 497.5815124511719 C 921.39404296875 497.3006286621094 920.9432373046875 497.1083679199219 920.45458984375 497.0343933105469 C 920.30615234375 497.0115661621094 920.1544189453125 496.9999694824219 919.9998779296875 496.9999694824219 Z" stroke="none" fill="#fff" />
            </g>
        </svg>
    </div>,
    Sensors:
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18.388" height="24.087" viewBox="0 0 18.388 24.087">
                <g id="Group_420" data-name="Group 420" transform="translate(-409.076 827.744) rotate(-90)">
                    <path id="Path_277" data-name="Path 277" d="M827.055,420.069a16.026,16.026,0,0,1-22.671-.594" transform="translate(0 1.986)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_278" data-name="Path 278" d="M823.16,417.239a11.272,11.272,0,0,1-15.946-.594" transform="translate(0.533 1.453)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_279" data-name="Path 279" d="M819.265,414.409a6.529,6.529,0,0,1-9.221-.594" transform="translate(1.065 0.921)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_282" data-name="Path 282" d="M3.746,1.873A1.873,1.873,0,0,1,0,1.873C1.515,1.873,2.786,1.869,3.746,1.873Z" transform="translate(813.846 408.924)" fill="none" stroke="#fff" stroke-width="2" />
                    <path id="Path_293" data-name="Path 293" d="M0,0H18.414" transform="translate(806.473 410.076)" fill="none" stroke="#fff" stroke-width="2" />
                </g>
            </svg>
        </div>,
    COM:
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="25.691" height="20.751" viewBox="0 0 25.691 20.751">
                <g id="Group_421" data-name="Group 421" transform="translate(-400.482 824.408) rotate(-90)">
                    <path id="Path_277" data-name="Path 277" d="M823.682,419.981a13.641,13.641,0,0,1-19.3-.506" transform="translate(0 1.44)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_281" data-name="Path 281" d="M19.3.506A13.593,13.593,0,0,1,9.9,4.258,13.592,13.592,0,0,1,0,0" transform="translate(823.682 405.74) rotate(180)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_279" data-name="Path 279" d="M820.988,414.52a7.75,7.75,0,0,1-10.944-.705" transform="translate(-1.483 3.427)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_280" data-name="Path 280" d="M10.944.705A7.72,7.72,0,0,1,5.825,2.637,7.712,7.712,0,0,1,0,0" transform="translate(819.505 409.413) rotate(180)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <circle id="Ellipse_8" data-name="Ellipse 8" cx="1.594" cy="1.594" r="1.594" transform="translate(812.438 411.455)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <line id="Line_4" data-name="Line 4" x1="6.061" transform="translate(805.977 413.05)" fill="none" stroke="#fff" stroke-width="2" />
                </g>
            </svg>
        </div>,
    LEDs:
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.302" height="25" viewBox="0 0 16.302 25">
                <g id="Group_422" data-name="Group 422" transform="translate(-81 -562)">
                    <g id="Union_1" data-name="Union 1" transform="translate(81 562)" fill="none">
                        <path d="M4.919,19.1a28.857,28.857,0,0,0-1.063-3.35,8.975,8.975,0,0,0-1.134-1.954A7.777,7.777,0,0,1,0,7.9,8.028,8.028,0,0,1,8.151,0,8.028,8.028,0,0,1,16.3,7.9a7.683,7.683,0,0,1-1.175,4.088h.024l-.068.069a8,8,0,0,1-1.4,1.641c-.252.329-.521.7-.795,1.109A13.428,13.428,0,0,0,11.25,19.1Z" stroke="none" />
                        <path d="M 9.693992614746094 17.09538078308105 C 10.00057411193848 16.08835792541504 10.49416446685791 14.79061794281006 11.23131561279297 13.69170093536377 C 11.50537490844727 13.28313159942627 11.79702568054199 12.87623119354248 12.09816551208496 12.48232173919678 L 12.21198558807373 12.33344173431396 L 12.35147571563721 12.20830154418945 C 12.75676536560059 11.84470176696777 13.10915565490723 11.43077087402344 13.39882564544678 10.97800159454346 L 13.43127536773682 10.92675113677979 C 14.00098514556885 10.01554107666016 14.30211544036865 8.968471527099609 14.30211544036865 7.898731231689453 C 14.30211544036865 4.646161556243896 11.54276561737061 2.000001430511475 8.151055335998535 2.000001430511475 C 4.759345531463623 2.000001430511475 1.999995350837708 4.646161556243896 1.999995350837708 7.898731231689453 C 1.999995350837708 9.564651489257812 2.740345239639282 11.16133117675781 4.031225204467773 12.27934169769287 L 4.201235294342041 12.42659091949463 L 4.334285259246826 12.60791110992432 C 4.967045307159424 13.47019100189209 5.433355331420898 14.28248119354248 5.720275402069092 15.02222156524658 C 6.013867855072021 15.77921962738037 6.253640651702881 16.49971580505371 6.436537265777588 17.09538078308105 L 9.693992614746094 17.09538078308105 M 11.24967575073242 19.09538078308105 L 4.918905258178711 19.09538078308105 C 4.918905258178711 19.09538078308105 4.544835567474365 17.52251052856445 3.855605363845825 15.74542140960693 C 3.599365234375 15.08476161956787 3.165685415267944 14.39597129821777 2.721855401992798 13.79115104675293 C 1.051645278930664 12.34459114074707 -4.664001608034596e-06 10.24064159393311 -4.664001608034596e-06 7.898731231689453 C -4.664001608034596e-06 3.536511421203613 3.649415254592896 1.345214855064114e-06 8.151055335998535 1.345214855064114e-06 C 12.65269565582275 1.345214855064114e-06 16.30211448669434 3.536511421203613 16.30211448669434 7.898731231689453 C 16.30211448669434 9.395111083984375 15.87274551391602 10.79441165924072 15.12709522247314 11.98702144622803 L 15.15141487121582 11.98702144622803 C 15.15141487121582 11.98702144622803 15.127685546875 12.01042175292969 15.08352565765381 12.05587100982666 C 14.69534492492676 12.66259098052979 14.22492504119873 13.21446132659912 13.68704509735107 13.69701099395752 C 13.4351749420166 14.02647113800049 13.1659049987793 14.39786148071289 12.89225578308105 14.80582141876221 C 11.72192573547363 16.55051040649414 11.24967575073242 19.09538078308105 11.24967575073242 19.09538078308105 Z" stroke="none" fill="#fff" />
                    </g>
                    <line id="Line_5" data-name="Line 5" x2="7.027" transform="translate(85.637 583.043)" fill="none" stroke="#fff" stroke-width="2" />
                    <path id="Path_286" data-name="Path 286" d="M1,0H4.774" transform="translate(86.264 586)" fill="none" stroke="#fff" stroke-width="2" />
                </g>
            </svg>
        </div>,
    Sound:
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="23.785" height="16.291" viewBox="0 0 23.785 16.291">
                <g id="Group_423" data-name="Group 423" transform="translate(-820.5 -392.489)">
                    <path id="Path_287" data-name="Path 287" d="M849.336,392.071a10.06,10.06,0,0,1-.373,14.232" transform="translate(-8.819 1.688)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_289" data-name="Path 289" d="M841.221,400.187a4.1,4.1,0,0,1-.372,5.788" transform="translate(-4.117 -2.205)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <rect id="Rectangle_149" data-name="Rectangle 149" width="5.23" height="6.276" transform="translate(821.5 397.496)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                    <path id="Path_290" data-name="Path 290" d="M835.1,408.212l-5.23-3.218v-6.276l5.23-3.218Z" transform="translate(-2.984 -1.222)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                </g>
            </svg>
        </div>
}
const Toolbox_colors = {
    Logic: "#0000DC",
    Loop: "#4C97FF",
    Math: "#8D00E8",
    Text: "#16CE9C",
    Actuators: "#FE8013",
    Sensors: "#40BF4A",
    COM: "#D51CD5",
    Light: "#EFCA0F",
    Sound: "#FA857B"
}
function add_device(svg) {
    return (
        <div className="device_icon">
            <svg className="border" xmlns="http://www.w3.org/2000/svg" width="227.914" height="175.467" viewBox="0 0 227.914 175.467">
                <defs>
                    <filter id="Union_3" x="0" y="0" width="227.914" height="175.467" filterUnits="userSpaceOnUse">
                        <feOffset input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="7.5" result="blur" />
                        <feFlood flood-color="#0000dc" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Union_3)">
                    <path id="Union_3-2" data-name="Union 3" d="M-426.485-10.52l6.37-6.774h44.594l12.741-13.549V-98.588l6.37,6.774v60.97L-375.521-10.52Zm-111.131,0V-34.607L-536.2-33.1v21.076h74.323l-1.416,1.5Zm.707-48.173v-60.971l19.112-20.323h50.965l-6.371,6.774H-517.8l-12.74,13.549v67.745Zm179.792-58.712v-21.076H-431.44l1.416-1.5H-355.7V-115.9Z" transform="translate(560.62 162.99)" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1" />
                </g>
            </svg>
            <div className="children">
                {svg}
            </div>

        </div>
    )

}

function PullOutPullOut(stateCheck) {
    var Overlay = document.getElementsByClassName("c-Body-a-Overlay")[0];
    var OverlayExtras = document.getElementsByClassName("c-Body-a-OverlayExtras")[0];
    if (stateCheck === "Closed") {
        if (!Overlay.classList.contains("t-Transition")) {
            Overlay.classList.add("t-Transition")
        }
        if (!OverlayExtras.classList.contains("t-Transition")) {
            OverlayExtras.classList.add("t-Transition")
        }
        Overlay.style.width = "calc(100vw - 420px)"
        OverlayExtras.style.width = "420px"
        setTimeout(function () {
            if (Overlay.classList.contains("t-Transition")) {
                Overlay.classList.remove("t-Transition")
            }
            if (OverlayExtras.classList.contains("t-Transition")) {
                OverlayExtras.classList.remove("t-Transition")
            }
        }, 800);

    } else {
        if (!Overlay.classList.contains("t-Transition")) {
            Overlay.classList.add("t-Transition")
        }
        if (!OverlayExtras.classList.contains("t-Transition")) {
            OverlayExtras.classList.add("t-Transition")
        }
        Overlay.style.width = "100vw"
        OverlayExtras.style.width = "0px"
        setTimeout(function () {
            if (Overlay.classList.contains("t-Transition")) {
                Overlay.classList.remove("t-Transition")
            }
            if (OverlayExtras.classList.contains("t-Transition")) {
                OverlayExtras.classList.remove("t-Transition")
            }
        }, 800);
    }
}


const Body = (props) => {
    var TrashHolder = useRef(null);
    function genbuttons(toolbox_items) {
        var buttons = [];
        var children = [];
        var category = "";
        var category_svg = [];
        var category_color = "";
        var children_count = 0;
        for (var i = 0; i < toolbox_items.length; i++) {
            var svg = []
            var color = "";
            switch (toolbox_items[i][0]) {
                case "Loops":
                    svg = svgs.Loop;
                    color = Toolbox_colors.Loop;
                    break;
                case "Logic":
                    svg = svgs.Logic;
                    color = Toolbox_colors.Logic;
                    break;
                case "Math":
                    svg = svgs.Math;
                    color = Toolbox_colors.Math;
                    break;
                case "Text":
                    svg = svgs.Text;
                    color = Toolbox_colors.Text;
                    break;
                case "Actuators":
                    svg = svgs.Actuators;
                    color = Toolbox_colors.Actuators;
                    break;
                case "Sensors":
                    svg = svgs.Sensors;
                    color = Toolbox_colors.Sensors;
                    break;
                case "COM":
                    svg = svgs.COM;
                    color = Toolbox_colors.COM;
                    break;
                case "LEDs":
                    svg = svgs.LEDs;
                    color = Toolbox_colors.Light;
                    break;
                case "Sound":
                    svg = svgs.Sound;
                    color = Toolbox_colors.Sound;
                    break;
                default:
                    color = ("#" + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6))
                    break;
            }
            if (toolbox_items[i][2] == "category") {
                children_count = toolbox_items[i][3];
                category = toolbox_items[i][0]
                category_svg = svg;
                category_color = color;
            }
            else {
                children_count -= 1;
                if (children_count < 0) {
                    children_count = 0;
                    //Level 0 Buttons
                    buttons.push(
                        <Button
                            id={toolbox_items[i][1]}
                            type="ToolboxCategoryButton"
                            outColor={color}
                            hoverColor="#0000dc"
                            s_ButtonState="Out"
                            children={[svg]}
                            text={toolbox_items[i][0]}
                            toolbox_type={toolbox_items[i][2]}
                            child_count={children_count}
                            hoverEffect="fill"
                            onClick={props.ToolboxFunction}
                        />
                    )
                }
                else {
                    children.push(
                        <Button
                            id={toolbox_items[i][1]}
                            type="ToolboxCategoryButton"
                            outColor={category_color}
                            hoverColor="#0000dc"
                            s_ButtonState="Out"
                            children={[svg]}
                            text={toolbox_items[i][0]}
                            toolbox_type={toolbox_items[i][2]}
                            child_count={children_count}
                            hoverEffect="fill"
                            onClick={props.ToolboxFunction}
                        />
                    )
                    if (children_count === 0) {
                        buttons.push(
                            <CustomDrop
                                buttonType="ToolboxCategoryButton"
                                text={category}
                                childrenlist={children}
                                outColor={category_color}
                                dropType="toolbox_list"
                                svg={[category_svg]}
                                modal=""
                            />
                        )
                        children = []
                        category = ""
                        category_svg = [];
                    }
                }

            }


        }
        return buttons;
    }

    var TrashContainerChanged = false;
    useEffect(() => {
        if (TrashContainerChanged === false) {
            var Trash = document.getElementsByClassName("blocklyTrash")[0];
            if (Trash !== undefined) {
                console.log(Trash.tagName)
                TrashHolder.current.appendChild(Trash);
                TrashContainerChanged = true;
            }
        }
    })

    var slide_out = useRef(null)
    const [drawerstate, setDrawerState] = useState(false);
    function device_drawer(event) {
        if (drawerstate == false) {
            slide_out.current.style.display = "inline-flex";
            setDrawerState(true);
        }
        else {
            slide_out.current.style.display = "none";
            setDrawerState(false);
        }
    }
    return (
        <div className="body-container">
            <div className="c-Body-a-WorkspaceContainer">
                <svg>
                    <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M1,0.46 l0,-0.426 L0.982,0.001 l-0.472,0.001,-0.149,0,-0.331,0 L0,0.051 v0.089 l0.015,0.026 V0.928 L0.035,0.96 l0.261,0,0.024,0.04 H0.976 l0.024,-0.041 V0.937 l0,-0.001,-0.001,-0.363 h-0.033 V0.516"></path></clipPath>
                </svg>
                <div id="blocklyDiv">
                </div>
            </div>

            <div className="tester">
                <svg id="num4" xmlns="http://www.w3.org/2000/svg" width="770" height="288" viewBox="0 0 770 288">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_218" data-name="Rectangle 218" width="770" height="288" transform="translate(2354 -3220)" fill="rgba(25,255,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-41" y="-287" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_5" data-name="Mask Group 5" transform="translate(-2354 3220)" clip-path="url(#clip-path)">
                        <g id="Group_550" data-name="Group 550">
                            <g transform="matrix(1, 0, 0, 1, 2354, -3220)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(469.5 -2381.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className="c-Body-a-Overlay">
                <svg id="num1" xmlns="http://www.w3.org/2000/svg" width="773" height="246" viewBox="0 0 772 245">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_225" data-name="Rectangle 225" width="772" height="245" transform="translate(2984 -4289)" fill="rgba(255,0,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_4" data-name="Mask Group 4" transform="translate(-2984 4289)" clip-path="url(#clip-path)">
                        <g id="Group_541" data-name="Group 541">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num4" xmlns="http://www.w3.org/2000/svg" width="773" height="283" viewBox="0 0 772 283">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_226" data-name="Rectangle 226" width="772" height="283" transform="translate(2984 -4044)" fill="rgba(255,204,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_5" data-name="Mask Group 5" transform="translate(-2984 4044)" clip-path="url(#clip-path)">
                        <g id="Group_540" data-name="Group 540">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num7" xmlns="http://www.w3.org/2000/svg" width="773" height="113" viewBox="0 0 772 113">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_227" data-name="Rectangle 227" width="772" height="113" transform="translate(2984 -3761)" fill="rgba(214,255,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_6" data-name="Mask Group 6" transform="translate(-2984 3761)" clip-path="url(#clip-path)">
                        <g id="Group_539" data-name="Group 539">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num10" xmlns="http://www.w3.org/2000/svg" width="773" height="345" viewBox="0 0 772 345">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_228" data-name="Rectangle 228" width="772" height="345" transform="translate(2984 -3648)" fill="rgba(0,255,85,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_7" data-name="Mask Group 7" transform="translate(-2984 3648)" clip-path="url(#clip-path)">
                        <g id="Group_538" data-name="Group 538">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num13" xmlns="http://www.w3.org/2000/svg" width="773" height="97" viewBox="0 0 772 94">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_229" data-name="Rectangle 229" width="772" height="94" transform="translate(2984 -3303)" fill="rgba(247,0,255,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_8" data-name="Mask Group 8" transform="translate(-2984 3303)" clip-path="url(#clip-path)">
                        <g id="Group_537" data-name="Group 537">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="workspace-controls">
                    <Button
                        id="zoom-in"
                        type="WorkspaceControlButton"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.745" height="16.745" viewBox="0 0 16.745 16.745">
                                <rect id="Rectangle_6" data-name="Rectangle 6" width="16.745" height="2.155" transform="translate(0 7.295)" />
                                <rect id="Rectangle_7" data-name="Rectangle 7" width="2.155" height="16.745" transform="translate(7.295)" />
                            </svg>
                        ]}
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="zoom-out"
                        type="WorkspaceControlButton"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.745" height="2.232" viewBox="0 0 16.745 2.232">
                                <rect id="Rectangle_8" data-name="Rectangle 8" width="16.745" height="2.232" />
                            </svg>
                        ]}
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="zoom-to-fit"
                        type="WorkspaceControlButton"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.745" height="8.511" viewBox="0 0 16.745 8.511">
                                <rect id="Rectangle_9" data-name="Rectangle 9" width="16.745" height="2.232" fill="#e9e9ff" />
                                <rect id="Rectangle_10" data-name="Rectangle 10" width="16.745" height="2.232" transform="translate(0 6.279)" fill="#e9e9ff" />
                            </svg>

                        ]}
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="workspace-previous"
                        type="WorkspaceControlButton_Previous"
                        inColor="#E9E9FF"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        s_ButtonState="Out"
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                    <Button
                        id="workspace-after"
                        type="WorkspaceControlButton_After"
                        inColor="#060841"
                        outColor="#E9E9FF"
                        hoverColor="#0000FF"
                        s_ButtonState="Out"
                        hoverEffect="svg-fill"
                        onClick={props.workspaceClick}
                    />
                </div>

                {/*<svg id="num2" xmlns="http://www.w3.org/2000/svg" width="1076" height="246" viewBox="0 0 1076 245">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_225" data-name="Rectangle 225" width="1076" height="245" transform="translate(3756 -4289)" fill="rgba(255,0,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_9" data-name="Mask Group 9" transform="translate(-3756 4289)" clip-path="url(#clip-path)">
                        <g id="Group_546" data-name="Group 546">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>*/}
                <svg id="num2" xmlns="http://www.w3.org/2000/svg" width="1079" height="85" viewBox="0 0 1079 85" preserveAspectRatio="none">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_237" data-name="Rectangle 237" width="1079" height="85" transform="translate(1369 -6784)" fill="rgba(227,5,5,0.32)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_14" data-name="Mask Group 14" transform="translate(-1369 6784)" clip-path="url(#clip-path)">
                        <path id="Subtraction_9" data-name="Subtraction 9" d="M1920,1080H0V0H1920V1080ZM733.691,1017.475l39.577,39.476H1863.181l39.937-39.835V994.6l.6-.681-.98-354.408h-54.274V583.6l55.284-55.022-1.011-393.231-54.274-53.776H292.008l-48.914,47.88v87.4l25.155,25.091V985.854l31.837,31.756Z" transform="translate(599 -6784)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                    </g>
                </svg>
                <svg id="num14" xmlns="http://www.w3.org/2000/svg" width="1076" height="97" viewBox="0 0 1076 94" preserveAspectRatio="none">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_229" data-name="Rectangle 229" width="1076" height="94" transform="translate(3756 -3303)" fill="rgba(247,0,255,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_10" data-name="Mask Group 10" transform="translate(-3756 3303)" clip-path="url(#clip-path)">
                        <g id="Group_545" data-name="Group 545">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg id="num3" xmlns="http://www.w3.org/2000/svg" width="76" height="251" viewBox="0 0 72 245">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_225" data-name="Rectangle 225" width="72" height="245" transform="translate(4832 -4289)" fill="rgba(255,0,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_11" data-name="Mask Group 11" transform="translate(-4832 4289)" clip-path="url(#clip-path)">
                        <g id="Group_544" data-name="Group 544">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num6" xmlns="http://www.w3.org/2000/svg" width="76" height="283" viewBox="0 0 72 283">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_226" data-name="Rectangle 226" width="72" height="283" transform="translate(4832 -4044)" fill="rgba(255,204,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_12" data-name="Mask Group 12" transform="translate(-4832 4044)" clip-path="url(#clip-path)">
                        <g id="Group_543" data-name="Group 543">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num9" xmlns="http://www.w3.org/2000/svg" width="76" height="113" viewBox="0 0 72 113">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_227" data-name="Rectangle 227" width="72" height="113" transform="translate(4832 -3761)" fill="rgba(214,255,0,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_13" data-name="Mask Group 13" transform="translate(-4832 3761)" clip-path="url(#clip-path)">
                        <g id="Group_542" data-name="Group 542">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num9svg" xmlns="http://www.w3.org/2000/svg" width="28.25" height="19.392" viewBox="0 0 28.25 19.392">
                    <g id="Group_383" data-name="Group 383" transform="translate(1.414 0.219)">
                        <path id="Path_2" data-name="Path 2" d="M1855.634,371.3,1849,377.929l6.657,6.657" transform="translate(-1849 -368.216)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                        <path id="Path_3" data-name="Path 3" d="M1876.024,371.3l6.634,6.634L1876,384.586" transform="translate(-1857.236 -368.216)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                        <line id="Line_1" data-name="Line 1" x1="4.264" y2="18.953" transform="translate(11.072)" fill="none" stroke="#e9e9ff" stroke-miterlimit="10" stroke-width="2" />
                    </g>
                </svg>
                <svg id="num12" xmlns="http://www.w3.org/2000/svg" width="76" height="345" viewBox="0 0 72 345">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_228" data-name="Rectangle 228" width="72" height="345" transform="translate(4832 -3648)" fill="rgba(0,255,85,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_14" data-name="Mask Group 14" transform="translate(-4832 3648)" clip-path="url(#clip-path)">
                        <g id="Group_548" data-name="Group 548">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num15" xmlns="http://www.w3.org/2000/svg" width="76" height="97" viewBox="0 0 72 94">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_229" data-name="Rectangle 229" width="72" height="94" transform="translate(4832 -3303)" fill="rgba(247,0,255,0.4)" />
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_15" data-name="Mask Group 15" transform="translate(-4832 3303)" clip-path="url(#clip-path)">
                        <g id="Group_547" data-name="Group 547">
                            <path id="Subtraction_5" data-name="Subtraction 5" d="M3120,4098H1200v-.392h6.651v-76.649l14.35-14.35-.831-746.552,25.091-25.091v-92.4l-34.568-30.378L1200,3102.8V3018H3120V4098Zm-1186.4-62.539,39.576,39.477H3063.087l39.937-39.834V4012.59l.6-.681-.981-354.408h-54.273v-55.909l55.284-55.023-.359-415.93-30-32.639-784.264.978-247.2.2-549.91.383L1443,3147.442v87.4l25.155,25.09v743.912l31.838,31.757Z" transform="translate(1784 -7307)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            <g id="Rectangle_230" data-name="Rectangle 230" transform="translate(2763 -3949)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="71" height="400" stroke="none" />
                                <rect x="0.5" y="0.5" width="70" height="399" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <div id="TrashTotal">
                    <div id="num15HoverHolder">
                        <svg id="lid" xmlns="http://www.w3.org/2000/svg" width="62.049" height="26.565" viewBox="0 0 62.049 26.565">
                            <defs>
                                <filter id="Path_81" x="0" y="0" width="62.049" height="26.565" filterUnits="userSpaceOnUse">
                                    <feOffset input="SourceAlpha" />
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feFlood flood-color="#2000ff" />
                                    <feComposite operator="in" in2="blur" />
                                    <feComposite in="SourceGraphic" />
                                </filter>
                            </defs>
                            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_81)">
                                <path id="Path_81-2" data-name="Path 81" d="M1849.7,938.283h-10.84v-1.969l-1.052-1.052h-8.6L1827.943,934H1821.9v4.283h-10.4l-3.059,2.141v2.141h44.049v-2.141Z" transform="translate(-1799.44 -925)" fill="#e9e9ff" />
                            </g>
                        </svg>

                        <svg id="bin" xmlns="http://www.w3.org/2000/svg" width="62.944" height="62.37" viewBox="0 0 62.944 62.37">
                            <defs>
                                <filter id="Path_82" x="0" y="0" width="62.944" height="62.37" filterUnits="userSpaceOnUse">
                                    <feOffset input="SourceAlpha" />
                                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                                    <feFlood flood-color="#3a00ff" flood-opacity="0.659" />
                                    <feComposite operator="in" in2="blur" />
                                    <feComposite in="SourceGraphic" />
                                </filter>
                            </defs>
                            <g id="Group_547" data-name="Group 547" transform="translate(9.218 0.652)">
                                <g transform="matrix(1, 0, 0, 1, -9.22, -0.65)" filter="url(#Path_82)">
                                    <path id="Path_82-2" data-name="Path 82" d="M1812.688,946.74V957.9l2.371,2.371V977.33l4.78,4.78h25.428V967.541l3.365-3.364V946.74Zm10.129,32.425-2.175-1.919V951.023h2.175Zm5.8-1.919-2.175,1.919V951.023h2.175Zm5.8,1.919-2.175-1.919V951.023h2.175Zm5.8-1.919-2.175,1.919V951.023h2.175Z" transform="translate(-1799.19 -933.24)" fill="#e9e9ff" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <svg id="num15trash" ref={TrashHolder}>
                        {/*
                    <svg xmlns="http://www.w3.org/2000/svg" class="blocklySvg" style="background-color: rgb(6, 8, 65);" width="1661px" height="920px" tabindex="0" version="1.1">
                        <defs>
                            <pattern id="blocklyGridPattern12675100857393296" patternUnits="userSpaceOnUse" x="149" y="0" width="100" height="100">
                                <line stroke-width="1" x1="0" y1="0.5" x2="1" y2="0.5" />
                            </pattern></defs><g class="blocklyWorkspace">
                            <rect class="blocklyMainBackground" style="fill: url(#blocklyGridPattern12675100857393296); stroke: rgba(0, 0, 0, 0);" width="100%" height="100%" />
                            <g class="blocklyTrash" style="opacity: 0.4;" transform="translate(1579 825)"><clipPath id="blocklyTrashBodyClipPath35066959827688216">
                                <rect y="16" width="47" height="44" />
                            </clipPath>
                                <image clip-path="url(&quot;#blocklyTrashBodyClipPath35066959827688216&quot;)" x="0" y="-32" width="96" height="124" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://blockly-demo.appspot.com/static/media/sprites.png" />
                                <clipPath id="blocklyTrashLidClipPath35066959827688216">
                                    <rect width="47" height="16" />
                                </clipPath>
                                <image clip-path="url(&quot;#blocklyTrashLidClipPath35066959827688216&quot;)" transform="rotate(0)" x="0" y="-32" width="96" height="124" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://blockly-demo.appspot.com/static/media/sprites.png" />
                            </g>
                            <g class="blocklyBlockCanvas" transform="translate(149) scale(1)">
                                <g class="blocklyCursor">
                                    <g height="5" width="80">
                                        <rect style="display: none;" width="80" height="5">
                                            <animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="fill" attributeType="XML" />
                                        </rect>
                                        <rect class="blocklyVerticalMarker" style="display: none;" rx="10" ry="10" />
                                        <path style="display: none;" transform="">
                                            <animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="fill" attributeType="XML" /></path><path style="display: none;" fill="none" stroke-width="4" transform=""><animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="stroke" attributeType="XML" /></path><circle style="display: none;" stroke-width="4" r="5"><animate repeatCount="indefinite" values="#ffa200;transparent;transparent;" dur="1s" attributeName="fill" attributeType="XML" /></circle></g></g><g transform="translate(430 150)" data-id=")1~1ZMhC(_Q7wEByBRg]"><path class="blocklyPath" fill="#5c26ff" stroke="#451dbf" d="m 0 22 h 0 c 25 -22 71 -22 96 0 h 60 a 4 4 0 0 1 4 4 v 26 V 30 V 71 V 79 V 113 V 117 a 4 4 0 0 1 -4 4 H 64 c -2 0 -3 1 -4 2 l -4 4 c -1 1 -2 2 -4 2 h -12 c -2 0 -3 -1 -4 -2 l -4 -4 c -1 -1 -2 -2 -4 -2 h -8 a 4 4 0 0 0 -4 4 v 16 a 4 4 0 0 0 4 4 h 8 c 2 0 3 1 4 2 l 4 4 c 1 1 2 2 4 2 h 12 c 2 0 3 -1 4 -2 l 4 -4 c 1 -1 2 -2 4 -2 H 156 a 4 4 0 0 1 4 4 V 153 V 173 a 4 4 0 0 1 -4 4 h -152 a 4 4 0 0 1 -4 -4 Z" /><g transform="translate(8 30)"><image width="40px" height="40px" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://www.clipartmax.com/png/full/219-2194283_open-green-flag-sprite.png" alt="[object Object]" /></g><g transform="translate(56 40)"><text class="blocklyText" dominant-baseline="central" x="0" y="10.5" /></g></g></g></g></svg>
                */}
                    </svg>
                </div>

            </div>
            <div className="c-Body-a-OverlayExtras" />
            <Header />
            <div className="c-Body-a-OverlayItems">
                <div className="i-emptyDiv1" />
                <div className="c-Body-a-UploadCircle">
                    <Upload_Circle
                        onClick={device_drawer}
                    />
                </div>
                <div className="i-emptyDiv2" />
                <div className="c-Body-a-ToolSelector">
                    <ToolSelector />
                </div>
                <div className="c-Body-a-ToolBox">
                    <Toolbox>
                        {genbuttons(props.toolboxButtons)}
                    </Toolbox>

                </div>
                <div className="i-emptyDiv3" />
                <div className="c-Body-a-UploadProg">
                    <div className="c-Body-a-UploadButton">
                        <Button type="UploadButton" text="Upload" outColor="#0000dc" hoverColor="#0000AA" hoverEffect="svg-fill" />
                    </div>
                    <div className="c-Body-a-ProgressBar">
                        <ProgressBar progress={55} />
                    </div>
                </div>
                <div className="i-emptyDiv4" />
                <div id="device-manager" ref={slide_out}>
                    <Slide_Out_Menu>
                        <div className="devices">
                            {add_device(Arduino_Uno_SVG)}
                            {add_device(mello_temp)}
                            {add_device(Arduino_Uno_SVG)}
                            {add_device(mello_temp)}
                            {add_device(Arduino_Uno_SVG)}
                            {add_device(mello_temp)}
                            {add_device(Arduino_Uno_SVG)}
                            {add_device(mello_temp)}

                        </div>
                    </Slide_Out_Menu>
                </div>
            </div>
            <div className="c-Body-a-PulloutMenu">
                <Pull_Out_Menu MenuFunction={PullOutPullOut} viewCode={props.viewCode} toolboxButtons={props.toolboxButtons} serialport_monitor={props.serialport_monitor} onSerialPortClick={props.onSerialPortClick}/>
            </div>
        </div >
    )

}

export default Body