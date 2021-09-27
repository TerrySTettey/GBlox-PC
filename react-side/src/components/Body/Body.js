import React from 'react';
import PropTypes from 'prop-types';

import Upload_Circle from '../Upload_Circle/Upload_Circle'

import "./Body.scss";
import ProgressBar from '../ProgressBar';
import Toolbox from '../Toolbox/Toolbox';
import Button from '../Button';
import Header from '../Header/Header'

const Body = (props) => {
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
                <svg id="num1" xmlns="http://www.w3.org/2000/svg" width="770" height="254" viewBox="0 0 770 250" preserveAspectRatio="none">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_216" data-name="Rectangle 216" width="770" height="250" transform="translate(2354 -3470)" fill="rgba(255,9,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-41" y="-37" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_4" data-name="Mask Group 4" transform="translate(-2354 3470)" clip-path="url(#clip-path)">
                        <g id="Group_551" data-name="Group 551">
                            <g transform="matrix(1, 0, 0, 1, 2354, -3470)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(469.5 -2131.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
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
                <svg id="num7" xmlns="http://www.w3.org/2000/svg" width="770" height="135" viewBox="0 0 770 135">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_219" data-name="Rectangle 219" width="770" height="135" transform="translate(2354 -2932)" fill="rgba(255,255,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-41" y="-575" width="2004" height="1163.998" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_6" data-name="Mask Group 6" transform="translate(-2354 2932)" clip-path="url(#clip-path)">
                        <g id="Group_549" data-name="Group 549" transform="translate(2061 -3468.734)">
                            <g transform="matrix(1, 0, 0, 1, 293, 536.73)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1922,1082H6.16v-76.754l14.372-14.39L19.7,242.229l25.13-25.16V124.415L10.209,93.954,0,84.971V0H1922V1082ZM731.25,1027.366l39.639,39.586H1862.505l40-39.946v-22.576l.6-.683-.982-355.394h-54.358V592.289l55.37-55.175-.36-417.085L1872.724,87.3l-785.49.981-247.589.2-550.769.384-48.991,48.013v87.639l25.195,25.16V995.656l31.888,31.846Z" transform="translate(0 -537)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(0 286.734)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num10" xmlns="http://www.w3.org/2000/svg" width="770" height="307" viewBox="0 0 770 307">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_220" data-name="Rectangle 220" width="770" height="307" transform="translate(2354 -2797)" fill="rgba(255,173,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-41" y="-687" width="2004" height="1127.002" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_7" data-name="Mask Group 7" transform="translate(-2354 2797)" clip-path="url(#clip-path)">
                        <g id="Group_548" data-name="Group 548" transform="translate(2061 -3445.755)">
                            <g transform="matrix(1, 0, 0, 1, 293, 648.75)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M750.6,1045H6.16V970.872l14.373-13.9L19.7,233.946l25.13-24.3V120.161L10.209,90.741,0,82.066V0H1922V1045h-39.2l19.706-19.68v-22.576l.6-.683-.982-355.394h-54.358V590.6l55.371-55.175-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.991,48.013v87.639l25.195,25.16V993.971l31.888,31.846,434.282-.136L750.6,1045Z" transform="translate(0 -649)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(0 276.755)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="362" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="361" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num13" xmlns="http://www.w3.org/2000/svg" width="770" height="96" viewBox="0 0 770 92">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_221" data-name="Rectangle 221" width="770" height="92" transform="translate(2354 -2479)" fill="rgba(255,9,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-41" y="-1028" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_8" data-name="Mask Group 8" transform="translate(-2354 2479)" clip-path="url(#clip-path)">
                        <g id="Group_547" data-name="Group 547">
                            <g transform="matrix(1, 0, 0, 1, 2354, -2479)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(469.5 -3122.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg id="num2" xmlns="http://www.w3.org/2000/svg" width="1077" height="250" viewBox="0 0 1077 250">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_216" data-name="Rectangle 216" width="1077" height="250" transform="translate(3124 -3470)" fill="rgba(255,9,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-811" y="-37" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_9" data-name="Mask Group 9" transform="translate(-3124 3470)" clip-path="url(#clip-path)">
                        <g id="Group_556" data-name="Group 556">
                            <g transform="matrix(1, 0, 0, 1, 3124, -3470)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(-300.5 -2131.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num8" xmlns="http://www.w3.org/2000/svg" width="1077" height="135" viewBox="0 0 1077 135">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_219" data-name="Rectangle 219" width="1077" height="135" transform="translate(3124 -2932)" fill="rgba(255,255,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-811" y="-575" width="2004" height="1163.998" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_10" data-name="Mask Group 10" transform="translate(-3124 2932)" clip-path="url(#clip-path)">
                        <g id="Group_555" data-name="Group 555" transform="translate(2061 -3468.734)">
                            <g transform="matrix(1, 0, 0, 1, 1063, 536.73)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1922,1082H6.16v-76.754l14.372-14.39L19.7,242.229l25.13-25.16V124.415L10.209,93.954,0,84.971V0H1922V1082ZM731.25,1027.366l39.639,39.586H1862.505l40-39.946v-22.576l.6-.683-.982-355.394h-54.358V592.289l55.37-55.175-.36-417.085L1872.724,87.3l-785.49.981-247.589.2-550.769.384-48.991,48.013v87.639l25.195,25.16V995.656l31.888,31.846Z" transform="translate(-770 -537)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(0 286.734)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num14" xmlns="http://www.w3.org/2000/svg" width="1077" height="92" viewBox="0 0 1077 92">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_221" data-name="Rectangle 221" width="1077" height="92" transform="translate(3124 -2479)" fill="rgba(255,9,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-811" y="-1028" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_11" data-name="Mask Group 11" transform="translate(-3124 2479)" clip-path="url(#clip-path)">
                        <g id="Group_554" data-name="Group 554">
                            <g transform="matrix(1, 0, 0, 1, 3124, -2479)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(-300.5 -3122.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg id="num3" xmlns="http://www.w3.org/2000/svg"  width="78" height="250" viewBox="0 0 78 250">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_216" data-name="Rectangle 216" width="78" height="250" transform="translate(4201 -3470)" fill="rgba(255,9,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-1888" y="-37" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_12" data-name="Mask Group 12" transform="translate(-4201 3470)" clip-path="url(#clip-path)">
                        <g id="Group_561" data-name="Group 561">
                            <g transform="matrix(1, 0, 0, 1, 4201, -3470)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(-1377.5 -2131.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num6" xmlns="http://www.w3.org/2000/svg"  width="78" height="288" viewBox="0 0 78 288">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_218" data-name="Rectangle 218" width="78" height="288" transform="translate(4201 -3220)" fill="rgba(25,255,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-1888" y="-287" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_13" data-name="Mask Group 13" transform="translate(-4201 3220)" clip-path="url(#clip-path)">
                        <g id="Group_560" data-name="Group 560">
                            <g transform="matrix(1, 0, 0, 1, 4201, -3220)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(-1377.5 -2381.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num9" xmlns="http://www.w3.org/2000/svg"  width="78" height="135" viewBox="0 0 78 135">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_219" data-name="Rectangle 219" width="78" height="135" transform="translate(4201 -2932)" fill="rgba(255,255,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-1888" y="-575" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_14" data-name="Mask Group 14" transform="translate(-4201 2932)" clip-path="url(#clip-path)">
                        <g id="Group_559" data-name="Group 559">
                            <g transform="matrix(1, 0, 0, 1, 4201, -2932)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(-1377.5 -2669.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num12" xmlns="http://www.w3.org/2000/svg"  width="78" height="307" viewBox="0 0 78 307">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_220" data-name="Rectangle 220" width="78" height="307" transform="translate(4201 -2797)" fill="rgba(255,173,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-1888" y="-708" width="2004" height="1127" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_15" data-name="Mask Group 15" transform="translate(-4201 2797)" clip-path="url(#clip-path)">
                        <g id="Group_558" data-name="Group 558" transform="translate(2061 -3467)">
                            <g transform="matrix(1, 0, 0, 1, 2140, 670)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M750.6,1045h0L6.16,1045v-74.13l14.372-13.9L19.7,233.945l25.13-24.3V120.161L10.209,90.741,0,82.065V0H1922V1045h-39.2l19.7-19.679v-22.576l.6-.683-.982-355.394h-54.358V590.6l55.37-55.175-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.991,48.013v87.64L265.08,247.99V993.97l31.888,31.846,434.282-.136L750.594,1045Z" transform="translate(-1847 -670)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(0 277)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="362" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="361" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>
                <svg id="num15" xmlns="http://www.w3.org/2000/svg"  width="78" height="92" viewBox="0 0 78 92">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_221" data-name="Rectangle 221" width="78" height="92" transform="translate(4201 -2479)" fill="rgba(255,9,9,0.4)" />
                        </clipPath>
                        <filter id="Subtraction_3" x="-1888" y="-1028" width="2004" height="1163.999" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="13.5" result="blur" />
                            <feFlood flood-color="#01f" flood-opacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                    <g id="Mask_Group_16" data-name="Mask Group 16" transform="translate(-4201 2479)" clip-path="url(#clip-path)">
                        <g id="Group_557" data-name="Group 557">
                            <g transform="matrix(1, 0, 0, 1, 4201, -2479)" filter="url(#Subtraction_3)">
                                <path id="Subtraction_3-2" data-name="Subtraction 3" d="M1452.5,3214.5H-463.341v-76.754l14.373-14.39-.833-748.626,25.131-25.16v-92.652l-34.622-30.462-10.209-8.983V2132.5h1922v1082ZM261.75,3159.866l39.639,39.585H1393l40-39.946V3136.93l.6-.683-.982-355.394h-54.359v-56.064l55.371-55.176-.36-417.085-30.047-32.731-785.49.981-247.589.2-550.769.384-48.992,48.013v87.639l25.195,25.16v745.979L-172.533,3160l434.282-.136Z" transform="translate(-1377.5 -3122.5)" fill="#0b0533" stroke="#0000dc" stroke-width="1" />
                            </g>
                            <g id="Rectangle_222" data-name="Rectangle 222" transform="translate(2061 -3182)" fill="#fff" stroke="#707070" stroke-width="1">
                                <rect width="58" height="375" stroke="none" />
                                <rect x="0.5" y="0.5" width="57" height="374" fill="none" />
                            </g>
                        </g>
                    </g>
                </svg>

            </div>
            <Header />
            <div className="c-Body-a-UploadCircle">
                <Upload_Circle />
            </div>
            <div className="c-Body-a-ToolBox">
                <Toolbox>
                    <Button
                        type="ToolboxCategoryButton"
                        inColor="#060841"
                        outColor="#0000DC"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.961" height="25.013" viewBox="0 0 21.961 25.013">
                                <g id="Group_406" data-name="Group 406" transform="translate(-2.905 -1314.595)">
                                    <path id="Path_264" data-name="Path 264" d="M0,8.478V0H18.475" transform="translate(23.452 1334.96) rotate(180)" fill="none" stroke="#fff" stroke-width="2" />
                                    <path id="Path_265" data-name="Path 265" d="M-20.935,1250.045v-8.478H-2.46" transform="translate(25.254 77.676)" fill="none" stroke="#fff" stroke-width="2" />
                                    <path id="Path_263" data-name="Path 263" d="M0,0H5.573V5.573" transform="translate(8.26 1338.901) rotate(-135)" fill="none" stroke="#fff" stroke-width="2" />
                                    <path id="Path_266" data-name="Path 266" d="M0,0H5.573V5.573" transform="translate(19.511 1315.302) rotate(45)" fill="none" stroke="#fff" stroke-width="2" />
                                </g>
                            </svg>

                        ]}
                        text="Loop"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        inColor="#060841"
                        outColor="#4C97FF"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.041" height="20" viewBox="0 0 24.041 20">
                                <g id="Path_270" data-name="Path 270" fill="none">
                                    <path d="M0,20H20V14.088l4.041,1.158V6.326L20,7.075V0H10.492l1.43,3.466h-4.9L8.653,0H0Z" stroke="none" />
                                    <path d="M 17.99999618530273 18 L 17.99999618530273 11.4343900680542 L 22.04141616821289 12.59189128875732 L 22.04141616821289 8.730239868164062 L 17.99999618530273 9.479229927062988 L 17.99999618530273 2 L 13.48047924041748 2 L 14.91034603118896 5.465819835662842 L 3.865156173706055 5.465819835662842 L 5.499288558959961 2 L 1.999996185302734 2 L 1.999996185302734 18 L 17.99999618530273 18 M 19.99999618530273 20 L -3.823241968348157e-06 20 L -3.823241968348157e-06 0 L 8.653446197509766 0 L 7.01931619644165 3.465820074081421 L 11.92169570922852 3.465820074081421 L 10.49182605743408 0 L 19.99999618530273 0 L 19.99999618530273 7.074520111083984 L 24.04141616821289 6.325530052185059 L 24.04141616821289 15.24512004852295 L 19.99999618530273 14.08761978149414 L 19.99999618530273 20 Z" stroke="none" fill="#fff" />
                                </g>
                            </svg>
                        ]}
                        text="Logic"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        outColor="#8D00E8"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.345" height="23" viewBox="0 0 17.345 23">
                                <g id="Group_407" data-name="Group 407" transform="translate(-5.54 -1.246)">
                                    <path id="Path_267" data-name="Path 267" d="M3.6,6.611H20.941" transform="translate(1.945 3.308)" fill="none" stroke="#fff" stroke-width="2" />
                                    <path id="Path_269" data-name="Path 269" d="M3.6,6.611H20.941" transform="translate(1.945 16.636)" fill="none" stroke="#fff" stroke-width="2" />
                                    <path id="Path_268" data-name="Path 268" d="M0,0H17.345" transform="translate(14.213 18.591) rotate(-90)" fill="none" stroke="#fff" stroke-width="2" />
                                </g>
                            </svg>

                        ]}
                        text="Math"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        outColor="#16CE9C"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="33" viewBox="0 0 14 33">
                                <text id="T" transform="translate(0 27)" fill="#fff" font-size="25" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">T</tspan></text>
                            </svg>

                        ]}
                        text="Text"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        outColor="#FE8013"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g id="Path_276" data-name="Path 276" transform="translate(-908 -488)" fill="none" stroke-miterlimit="10">
                                    <path d="M932,502.656v-5.313h-2.657a9.631,9.631,0,0,0-.859-2.069l1.88-1.881-3.758-3.758-1.881,1.881a9.624,9.624,0,0,0-2.069-.859V488h-5.313v2.657a9.623,9.623,0,0,0-2.069.859l-1.881-1.881-3.757,3.758,1.88,1.881a9.607,9.607,0,0,0-.859,2.069H908v5.313h2.657a9.6,9.6,0,0,0,.859,2.069l-1.88,1.881,3.757,3.758,1.881-1.881a9.608,9.608,0,0,0,2.069.859V512h5.313v-2.657a9.609,9.609,0,0,0,2.069-.859l1.881,1.881,3.758-3.758-1.88-1.881a9.627,9.627,0,0,0,.859-2.069ZM923,500a3,3,0,0,1-.582,1.775,3.024,3.024,0,0,1-.643.643,3,3,0,0,1-3.551,0,3.029,3.029,0,0,1-.643-.643,3,3,0,0,1,0-3.551,3.029,3.029,0,0,1,.643-.643,3,3,0,0,1,3.551,0,3.024,3.024,0,0,1,.643.643A3,3,0,0,1,923,500Z" stroke="none" />
                                    <path d="M 920.6563720703125 509.9999694824219 L 920.6563720703125 507.8321838378906 L 922.1091918945312 507.4189147949219 C 922.6809692382812 507.2562866210938 923.2322998046875 507.02734375 923.7479858398438 506.7384033203125 L 925.069091796875 505.9981689453125 L 926.6063842773438 507.5355834960938 L 927.5357055664062 506.6062927246094 L 925.9989624023438 505.0693054199219 L 926.7384033203125 503.74853515625 C 927.0272216796875 503.2327575683594 927.2562255859375 502.6811218261719 927.4190063476562 502.1089782714844 L 927.8323974609375 500.6564025878906 L 929.9998779296875 500.6564025878906 L 929.9998779296875 499.3434753417969 L 927.8324584960938 499.3434753417969 L 927.4190673828125 497.8909912109375 C 927.2561645507812 497.3187561035156 927.0271606445312 496.7670593261719 926.7384033203125 496.2512817382812 L 925.9989624023438 494.9304809570312 L 927.53564453125 493.3936767578125 L 926.6063232421875 492.46435546875 L 925.0693359375 494.0012817382812 L 923.7484741210938 493.2616882324219 C 923.2322387695312 492.9726257324219 922.6806640625 492.7436218261719 922.1090698242188 492.5809631347656 L 920.6563720703125 492.1676635742188 L 920.6563720703125 490.0000305175781 L 919.3436279296875 490.0000305175781 L 919.3436279296875 492.1676635742188 L 917.8909301757812 492.5809631347656 C 917.3189697265625 492.7437133789062 916.7673950195312 492.9727172851562 916.2515869140625 493.2615966796875 L 914.9307250976562 494.0013732910156 L 913.3935546875 492.4643859863281 L 912.4644775390625 493.3935852050781 L 914.0015869140625 494.9308166503906 L 913.2615966796875 496.2517700195312 C 912.97265625 496.7675170898438 912.7437133789062 497.3188171386719 912.5812377929688 497.8904113769531 L 912.1681518554688 499.3434753417969 L 910 499.3434753417969 L 910 500.6564025878906 L 912.168212890625 500.6564025878906 L 912.5812377929688 502.1095581054688 C 912.7437133789062 502.6810607910156 912.9725952148438 503.2323303222656 913.2615356445312 503.748046875 L 914.0015869140625 505.0690002441406 L 912.4644775390625 506.6063842773438 L 913.3934936523438 507.5355529785156 L 914.9309692382812 505.9981079101562 L 916.2520751953125 506.7384948730469 C 916.767333984375 507.0272521972656 917.3186645507812 507.2561950683594 917.8908081054688 507.4189147949219 L 919.3436279296875 507.8321838378906 L 919.3436279296875 509.9999694824219 L 920.6563720703125 509.9999694824219 M 919.24462890625 504.9427490234375 C 918.4500732421875 504.822265625 917.6875 504.5064697265625 917.0379638671875 504.028564453125 C 916.6298828125 503.7278442382812 916.270751953125 503.36865234375 915.9703369140625 502.9605102539062 C 915.493408203125 502.3121032714844 915.1776733398438 501.5495300292969 915.0571899414062 500.7551574707031 C 915.0191650390625 500.5078735351562 914.9998779296875 500.2538146972656 914.9998779296875 499.9999694824219 C 914.9998779296875 499.7455444335938 915.0192260742188 499.490966796875 915.0574340820312 499.2432556152344 C 915.177978515625 498.4497680664062 915.4935302734375 497.6878662109375 915.9708862304688 497.0386657714844 C 916.2710571289062 496.6309204101562 916.6301879882812 496.2717590332031 917.0387573242188 495.9708251953125 C 917.687255859375 495.4934692382812 918.4503784179688 495.177490234375 919.2454833984375 495.0570373535156 C 919.7412109375 494.9811096191406 920.2666625976562 494.9819641113281 920.7539672851562 495.0569152832031 C 921.5496215820312 495.1773986816406 922.31298828125 495.4935302734375 922.9607543945312 495.9706420898438 C 923.3688354492188 496.2709045410156 923.7282104492188 496.6302490234375 924.0286865234375 497.0384216308594 C 924.5056762695312 497.6859741210938 924.821533203125 498.4480895996094 924.9423828125 499.2426452636719 C 924.9805297851562 499.4908142089844 924.9998779296875 499.7455749511719 924.9998779296875 499.9999694824219 C 924.9998779296875 500.2535400390625 924.9806518554688 500.5075988769531 924.9426879882812 500.7551574707031 C 924.822021484375 501.55078125 924.5059204101562 502.3138427734375 924.029052734375 502.9610290527344 C 923.728515625 503.3693237304688 923.369140625 503.7286987304688 922.9611206054688 504.0290222167969 C 922.3128662109375 504.5062866210938 921.5501098632812 504.822265625 920.7552490234375 504.9428100585938 C 920.26025390625 505.0186767578125 919.7386474609375 505.0186157226562 919.24462890625 504.9427490234375 M 922.6563720703125 511.9999694824219 L 917.3436279296875 511.9999694824219 L 917.3436279296875 509.3426208496094 C 916.6153564453125 509.1354675292969 915.9217529296875 508.8460388183594 915.2742919921875 508.4831848144531 L 913.3934326171875 510.3640441894531 L 909.63623046875 506.6064147949219 L 911.5167236328125 504.7256164550781 C 911.1539306640625 504.0780944824219 910.864501953125 503.3847351074219 910.657470703125 502.6564025878906 L 908 502.6564025878906 L 908 497.3434753417969 L 910.657470703125 497.3434753417969 C 910.864501953125 496.6152648925781 911.1539306640625 495.9218444824219 911.5167236328125 495.2742614746094 L 909.63623046875 493.3935852050781 L 913.3934326171875 489.6359558105469 L 915.2742919921875 491.5166320800781 C 915.9217529296875 491.1540222167969 916.6153564453125 490.8645324707031 917.3436279296875 490.6573181152344 L 917.3436279296875 488.0000305175781 L 922.6563720703125 488.0000305175781 L 922.6563720703125 490.6573181152344 C 923.3846435546875 490.8645324707031 924.0780029296875 491.1540222167969 924.7255859375 491.5166320800781 L 926.6063232421875 489.6359558105469 L 930.364013671875 493.3935852050781 L 928.4835205078125 495.2742614746094 C 928.8460693359375 495.9218444824219 929.1353759765625 496.6152648925781 929.3426513671875 497.3434753417969 L 931.9998779296875 497.3434753417969 L 931.9998779296875 502.6564025878906 L 929.3426513671875 502.6564025878906 C 929.1353759765625 503.3847351074219 928.8460693359375 504.0780944824219 928.4835205078125 504.7256164550781 L 930.364013671875 506.6064147949219 L 926.6063232421875 510.3640441894531 L 924.7255859375 508.4831848144531 C 924.0780029296875 508.8460388183594 923.3846435546875 509.1354675292969 922.6563720703125 509.3426208496094 L 922.6563720703125 511.9999694824219 Z M 919.9998779296875 496.9999694824219 C 919.8455810546875 496.9999694824219 919.6937255859375 497.0115661621094 919.545654296875 497.0343933105469 C 919.0565185546875 497.1083679199219 918.60595703125 497.3006286621094 918.224365234375 497.5815124511719 C 917.97900390625 497.7622375488281 917.76220703125 497.9789123535156 917.5814208984375 498.2244567871094 C 917.3009033203125 498.6059875488281 917.1083984375 499.0566101074219 917.034423828125 499.5456237792969 C 917.011474609375 499.6936950683594 916.9998779296875 499.8457336425781 916.9998779296875 499.9999694824219 C 916.9998779296875 500.1543273925781 917.011474609375 500.3061218261719 917.034423828125 500.4542541503906 C 917.1083984375 500.9433898925781 917.3009033203125 501.3940734863281 917.5814208984375 501.7754211425781 C 917.76220703125 502.0210266113281 917.97900390625 502.2376403808594 918.224365234375 502.4184265136719 C 918.60595703125 502.6991882324219 919.0565185546875 502.8915710449219 919.545654296875 502.9655456542969 C 919.8421020507812 503.0113830566406 920.1580200195312 503.0113220214844 920.45458984375 502.9655456542969 C 920.9432373046875 502.8915710449219 921.39404296875 502.6991882324219 921.775390625 502.4184265136719 C 922.02099609375 502.2376403808594 922.237548828125 502.0210266113281 922.4183349609375 501.7754211425781 C 922.6993408203125 501.3940734863281 922.8914794921875 500.9433898925781 922.9654541015625 500.4542541503906 C 922.98828125 500.3061218261719 922.9998779296875 500.1543273925781 922.9998779296875 499.9999694824219 C 922.9998779296875 499.8457336425781 922.98828125 499.6936950683594 922.9654541015625 499.5456237792969 C 922.8914794921875 499.0566101074219 922.6993408203125 498.6059875488281 922.4183349609375 498.2244567871094 C 922.237548828125 497.9789123535156 922.02099609375 497.7622375488281 921.775390625 497.5815124511719 C 921.39404296875 497.3006286621094 920.9432373046875 497.1083679199219 920.45458984375 497.0343933105469 C 920.30615234375 497.0115661621094 920.1544189453125 496.9999694824219 919.9998779296875 496.9999694824219 Z" stroke="none" fill="#fff" />
                                </g>
                            </svg>

                        ]}
                        text="Actuators"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        outColor="#40BF4A"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.388" height="24.087" viewBox="0 0 18.388 24.087">
                                <g id="Group_420" data-name="Group 420" transform="translate(-409.076 827.744) rotate(-90)">
                                    <path id="Path_277" data-name="Path 277" d="M827.055,420.069a16.026,16.026,0,0,1-22.671-.594" transform="translate(0 1.986)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_278" data-name="Path 278" d="M823.16,417.239a11.272,11.272,0,0,1-15.946-.594" transform="translate(0.533 1.453)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_279" data-name="Path 279" d="M819.265,414.409a6.529,6.529,0,0,1-9.221-.594" transform="translate(1.065 0.921)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_282" data-name="Path 282" d="M3.746,1.873A1.873,1.873,0,0,1,0,1.873C1.515,1.873,2.786,1.869,3.746,1.873Z" transform="translate(813.846 408.924)" fill="none" stroke="#fff" stroke-width="2" />
                                    <path id="Path_293" data-name="Path 293" d="M0,0H18.414" transform="translate(806.473 410.076)" fill="none" stroke="#fff" stroke-width="2" />
                                </g>
                            </svg>


                        ]}
                        text="Sensors"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        outColor="#D51CD5"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
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
                        ]}
                        text="COM"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        outColor="#EFCA0F"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
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

                        ]}
                        text="Light"
                        hoverEffect="fill"
                    />
                    <Button
                        type="ToolboxCategoryButton"
                        inColor="#0000bc"
                        outColor="#FA857B"
                        hoverColor="#0000dc"
                        s_ButtonState="Out"
                        children={[
                            <svg xmlns="http://www.w3.org/2000/svg" width="23.785" height="16.291" viewBox="0 0 23.785 16.291">
                                <g id="Group_423" data-name="Group 423" transform="translate(-820.5 -392.489)">
                                    <path id="Path_287" data-name="Path 287" d="M849.336,392.071a10.06,10.06,0,0,1-.373,14.232" transform="translate(-8.819 1.688)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_289" data-name="Path 289" d="M841.221,400.187a4.1,4.1,0,0,1-.372,5.788" transform="translate(-4.117 -2.205)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <rect id="Rectangle_149" data-name="Rectangle 149" width="5.23" height="6.276" transform="translate(821.5 397.496)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                    <path id="Path_290" data-name="Path 290" d="M835.1,408.212l-5.23-3.218v-6.276l5.23-3.218Z" transform="translate(-2.984 -1.222)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" />
                                </g>
                            </svg>


                        ]}
                        text="Sound"
                        hoverEffect="fill"
                    />
                </Toolbox>

            </div>
            <div className="c-Body-a-UploadButton">
                <Button type="UploadButton" text="Upload" outColor="#060841" hoverColor="#0000dc" hoverEffect="svg-fill" />
            </div>
            <div className="c-Body-a-ProgressBar">
                <ProgressBar progress={55} />
            </div>

        </div>
    )

}



export default Body


