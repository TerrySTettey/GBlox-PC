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