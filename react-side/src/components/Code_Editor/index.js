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
import "prismjs/themes/prism-solarizedlight.css"
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
    function collapseContainer(event) {
        document.getElementById("menu-editing").value = document.getElementById("full-editing").value
        document.querySelector("#menu-highlighting-content").innerHTML = document.querySelector("#full-highlighting-content").innerHTML
        var code_editor = document.getElementById("c-codeEditor")
        if (event.target.id == "code-editor-collapse-button") {

            code_editor.style.transform = "scaleX(0.35)"
            code_editor.style.opacity = "0";
            setTimeout(() => {
                code_editor.style.display = "none";
            }, 500);

        }
        else {

            code_editor.style.transform = "scaleX(0)"
            code_editor.style.opacity = "0";
            document.getElementById("code-editor").click();
            setTimeout(() => {
                code_editor.style.display = "none";
            }, 500);

        }

    }

    return (
        <div id="code-editor-container">
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
        </div>
    )
}

Index.propTypes = {

}

export default Index

