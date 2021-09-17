import React, { useRef, useEffect, useState } from 'react';
import Button from '../Button'
import './CustomDrop.scss'

const CustomDrop = (props) => {
    var [buttonState, setButtonState] = useState("Out");
    const dropContainer = useRef(null);
    const dropContent = useRef(null);
    useOutsideAlerter(dropContainer);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            //Alert on click outside of element
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setButtonState("Out");
                    dropContent.current.style.display = "none"
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    function buttonClicked() {
        if (buttonState === "Out") {
            setButtonState("In");
            dropContent.current.style.display = "block"
        } else if (buttonState === "In") {
            setButtonState("Out");
            dropContent.current.style.display = "none"
        }
        console.log(dropContent)
    }

    var ButtonHolder = [];
    function populateDropbox() {
        var i = 0;
        if (props.list !== undefined && props.funcsOnClick !== undefined) {
            for (i; i < props.list.length; i++) {
                ButtonHolder.push(
                    <div class="c-CustomDrop-a-MenuButton">
                        <Button type={props.contentButtonType} onClick={props.funcsOnClick[i]} text={props.list[i]} inColor={props.contentInColor} outColor={props.contentOutColor}  hoverColor={props.contentHoverColor}/>
                    </div>
                )
            }
        }
    }

    return (
        <div className="c-CustomDrop-a-Container" ref={dropContainer}>
            <Button 
            type={props.buttonType}
            onClick={buttonClicked}
            s_ButtonState={buttonState}
            inColor={props.inColor}
            outColor={props.outColor}
            text={props.text}
            contentInColor={props.contentInColor}
            contentOutColor={props.contentOutColor}
            contentHoverColor={props.contentHoverColor}
            />
            <div className="c-CustomDrop-a-Content" ref={dropContent}>
                {populateDropbox()}
                {ButtonHolder}
            </div>
        </div>
    )
}

CustomDrop.defaultProps = {
    buttonType: "LanguageMenuButton",
    contentButtonType: "LanguageContentButton",
    list: ["Hello", "World"],
    funcsOnClick: [() => { console.log("Hello") }, () => { console.log("World") }],

}

export default CustomDrop
