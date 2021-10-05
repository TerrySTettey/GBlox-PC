import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import Menu from '../Menu'
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-arduino";
import "prismjs/themes/prism-tomorrow.css";
import './Edit_Code_Menu.scss'


function Index(props) {
    const [edited_code, setEditedCode] = useState("");
    const slider_highlighting = useRef(null);
    const editor = useRef(null);

    function update(event) {
        var result_element = document.querySelector("#highlighting-content");
        // Update code
        result_element.innerHTML = event.target.value.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<"); /* Global RegExp */
        // Syntax Highlight
        Prism.highlightElement(result_element);
    }
    function sync_scroll(element) {
        /* Scroll result to scroll coords of event - sync with textarea */
        slider_highlighting.current.scrollTop = editor.current.scrollTop;
        slider_highlighting.current.scrollLeft = editor.current.scrollLeft;
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
    return (
        <Menu>
            <div id="edit-code-menu">
                <div className="text">Edit Code</div>
                <div id="code-editor-textarea">
                    <textarea id="editing" ref={editor} spellcheck="false" onInput={e => { update(e); sync_scroll(e) }} onScroll={e => sync_scroll(e)} onKeyDown={check_tab}></textarea>
                    <pre id="highlighting" ref={slider_highlighting} aria-hidden="true">
                        <code className="language-arduino" id="highlighting-content"></code>
                    </pre>
                </div>
            </div>
        </Menu>
    )
}

Index.propTypes = {

}

export default Index

