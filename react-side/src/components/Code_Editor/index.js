import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

import Menu from '../Menu'
import Prism from "prismjs";
import Button from "../Button"
import Upload_Circle from '../Upload_Circle'
import Header from '../Header/Header'
import ProgressBar from '../ProgressBar';
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-arduino";
import "prismjs/themes/prism-tomorrow.css";
import './Code_Editor.scss'

const { ipcRenderer } = window.require('electron')

var lines = [1]

function Index(props) {
    const [edited_code, setEditedCode] = useState("");
    const slider_highlighting = useRef(null);
    const editor = useRef(null);
    const [lineNumber, setLineNumber] = useState(<p>{1}</p>);

    function update(event) {
        var result_element = document.querySelector("#full-highlighting-content");
        // Update code
        result_element.innerHTML = event.target.value.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<"); /* Global RegExp */
        // Syntax Highlight
        var textarea = document.getElementById("full-editing");

        lines = textarea.value.substr(0, textarea.selectionStart).split("\n").length
        var temp_line_array = [];
        for (var i = 0; i < lines; i++) {
            temp_line_array.push(<p>{i + 1}</p>)
        }
        setLineNumber(temp_line_array)

        Prism.highlightElement(result_element);
    }
    function sync_scroll(element) {
        /* Scroll result to scroll coords of event - sync with textarea */
        slider_highlighting.current.scrollTop = editor.current.scrollTop;
        slider_highlighting.current.scrollLeft = editor.current.scrollLeft;
        document.getElementById("line-numbers").scrollTop = editor.current.scrollTop;
    }

    function check_tab(event) {
        var code = event.target.value;
        if (event.key == "Tab") {
            event.preventDefault();
            var before_tab = code.slice(0, event.target.selectionStart);
            var after_tab = code.slice(event.target.selectionEnd, event.target.value.length);
            console.log(`Value before slice = ${before_tab}`)
            console.log(`Value after slice = ${after_tab}`)
            var cursor_pos = event.target.selectionEnd + 1;
            event.target.value = before_tab + "\t" + after_tab;
            event.target.selectionStart = cursor_pos;
            event.target.selectionEnd = cursor_pos;
            update(event);
        }
    }
    function collapseContainer(event){
        document.getElementById("menu-editing").value = document.getElementById("full-editing").value
        document.querySelector("#menu-highlighting-content").innerHTML = document.querySelector("#full-highlighting-content").innerHTML
        var code_editor = document.getElementById("c-codeEditor")
        if (event.target.id == "code-editor-collapse-button"){
            code_editor.style.marginLeft="1920px"
            code_editor.style.opacity = "0"
            
        }
        else{
            code_editor.style.marginLeft="1920px"
            document.getElementById("code-editor").click();
            setTimeout(()=>{
                code_editor.style.display = "none";
            },1000);
            
        }
        
    }
    async function uploadCode_ipc() {

        ipcRenderer.invoke('upload-code', document.getElementById("full-editing").value);
        ipcRenderer.on('arduino_comport', (event, result) => {

        });

        ipcRenderer.on('arduino_upload_status', (event, result) => {

        });
    }

    useEffect(() => {

    })
    return (
        <div id="code-editor-container">
            <div id="code-editor-header">
                <Header fileheaderfunc={props.fileheaderfunc} editheaderfunc={props.editheaderfunc} saveFile={props.saveFile} />
            </div>
            <div id="code-editor-background">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1618 975.002" preserveAspectRatio="xMidYMax slice">
                    <path id="Union_4" data-name="Union 4" d="M-411,959H-2029v-.345h453.662l-25.555-25.554H-2029V923h.333V-16H-411V923h0v36h0Z" transform="translate(2029 16)" fill="#0B0533" />
                </svg>
            </div>
            <div id="code-sidebar">
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
            </div>
            <Upload_Circle
                onClick={props.deviceOnClick}
            />
            <div id="outline">


                <div id="code-editor-items">
                    <div className="text">Code Editor</div>
                    <div id="code-editor-buttons">
                        <div id="collapse-button">
                            <Button
                                id="code-editor-collapse-button"
                                type="CollapseEditor"
                                outColor="#9898F0"
                                onClick={collapseContainer}
                            />
                        </div>
                        <div id="close-button">
                            <Button
                                id="code-editor-close-button"
                                type="MenuXButton"
                                outColor="#9898F0"
                                onClick={collapseContainer}
                            />
                        </div>
                    </div>
                    <div id="code-editor-textarea">
                        <div id="code-lines">
                            <pre id="line-numbers">{lineNumber}</pre>
                        </div>

                        <div id="full-editor">
                            <textarea id="full-editing" ref={editor} spellcheck="false" onInput={e => { update(e); sync_scroll(e) }} onScroll={e => sync_scroll(e)} onKeyDown={check_tab} rows={50}></textarea>
                            <pre id="full-highlighting" ref={slider_highlighting} aria-hidden="true">
                                <code className="language-arduino" id="full-highlighting-content"></code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
            <div className="c-Body-a-UploadProg">
                <div className="c-Body-a-UploadButton">
                    <Button type="UploadButton" text="Upload" outColor="#0000dc" hoverColor="#0000AA" hoverEffect="svg-fill" onClick={uploadCode_ipc} />
                </div>
                <div className="c-Body-a-ProgressBar">
                    <ProgressBar progress={55} />
                </div>
            </div>


        </div>
    )
}

Index.propTypes = {

}

export default Index

