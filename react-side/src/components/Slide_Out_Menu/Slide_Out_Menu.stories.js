import React from 'react';
import { useState, useEffect } from 'react'
import Slide_Out_Menu from './Slide_Out_Menu'

function Slide_Out_Menu_Component() {
    const [svgcolor, setSvgColor] = useState(`#0000dc`);
    const [device_selected, setDevice] = useState(1);

    const device_svg =
        <svg xmlns="http://www.w3.org/2000/svg" width="227.914" height="175.467" viewBox="0 0 227.914 175.467">
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

    const help_div_svg =
        <svg xmlns="http://www.w3.org/2000/svg" width="354" height="220" viewBox="0 0 354 220">
            <g id="Path_330" data-name="Path 330" fill="#0b0533">
                <path d="M 333.5235595703125 219.5 L 0.5 219.5 L 0.5 23.23928833007812 L 18.92333793640137 0.5 L 353.5 0.5 L 353.5 198.0667419433594 L 333.5235595703125 219.5 Z" stroke="none" />
                <path d="M 19.1617431640625 1 L 1 23.41639709472656 L 1 219 L 333.3060607910156 219 L 353 197.8698425292969 L 353 1 L 19.1617431640625 1 M 18.68490600585938 0 L 354 0 L 354 198.2636413574219 L 333.7410583496094 220 L 0 220 L 0 23.0621337890625 L 18.68490600585938 0 Z" stroke="none" fill="#0000dc" />
            </g>
        </svg>


    return (
        <Slide_Out_Menu>
            <p>Select Your Device</p>
            {device_svg}
            {device_svg}
        </Slide_Out_Menu>
    )
}
export default {
    title: 'Slide Out Menu',
    component: Slide_Out_Menu
}

export const Device_Manager = () => Slide_Out_Menu_Component();