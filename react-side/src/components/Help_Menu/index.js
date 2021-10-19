import React from 'react'
import PropTypes from 'prop-types'
import './Help_Menu.scss'
import Menu from '../Menu'

var learn_svg = [
    <svg xmlns="http://www.w3.org/2000/svg" width="74.786" height="62.563" viewBox="0 0 74.786 62.563" >
        <g id="Group_469" data-name="Group 469" transform="translate(-2156.398 -164.853)">
            <path id="icons8_bookmark_3" d="M8.238,8.3H34.6a4.919,4.919,0,0,1,4.943,4.943V67.812A8.012,8.012,0,0,0,34.6,65.958H8.238A4.919,4.919,0,0,1,3.3,61.016V13.238A4.919,4.919,0,0,1,8.238,8.3Zm36.54,0h26.36a4.919,4.919,0,0,1,4.943,4.943V61.016a4.919,4.919,0,0,1-4.943,4.943H44.778a8.012,8.012,0,0,0-4.943,1.853V13.238A4.919,4.919,0,0,1,44.778,8.3Z" transform="translate(2154.103 157.557)" fill="none" stroke="#fff" stroke-width="2" />
            <g id="Group_467" data-name="Group 467" transform="translate(-3)">
                <line id="Line_24" data-name="Line 24" x2="24" transform="translate(2202.791 175.979)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_23" data-name="Line 23" x2="24" transform="translate(2202.791 185.088)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_22" data-name="Line 22" x2="24" transform="translate(2202.791 194.197)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_20" data-name="Line 20" x2="24" transform="translate(2202.791 203.306)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_21" data-name="Line 21" x2="24" transform="translate(2202.791 212.415)" fill="none" stroke="#fff" stroke-width="2" />
            </g>
            <g id="Group_468" data-name="Group 468" transform="translate(-39)">
                <line id="Line_24-2" data-name="Line 24" x2="24" transform="translate(2202.791 175.979)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_23-2" data-name="Line 23" x2="24" transform="translate(2202.791 185.088)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_22-2" data-name="Line 22" x2="24" transform="translate(2202.791 194.197)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_20-2" data-name="Line 20" x2="24" transform="translate(2202.791 203.306)" fill="none" stroke="#fff" stroke-width="2" />
                <line id="Line_21-2" data-name="Line 21" x2="24" transform="translate(2202.791 212.415)" fill="none" stroke="#fff" stroke-width="2" />
            </g>
        </g>
    </svg>
]
var support_svg = [<svg xmlns="http://www.w3.org/2000/svg" width="74.424" height="74.613" viewBox="0 0 74.424 74.613">
    <g id="Group_470" data-name="Group 470" transform="translate(-2157.93 -175.362)">
        <path id="Path_347" data-name="Path 347" d="M3357.259-92.2s3.72-6.975-9.3-7.44-42.316,3.72-41.386,36.736a120.359,120.359,0,0,0,3.7,26.97H3326.6" transform="translate(-1147.621 276.041)" fill="none" stroke="#fff" stroke-width="2" />
        <path id="Path_348" data-name="Path 348" d="M3352.8-86.5s-8.4,12.09-22.348,12.09h-15.5v7.516s-3.3-.222-2.582,3.814,3.749,3.172,3.749,3.172,2.013,13.245,17.042,19.7a13.471,13.471,0,0,0,10.588.185" transform="translate(-1142.669 288.01)" fill="none" stroke="#fff" stroke-width="2" />
        <path id="Path_349" data-name="Path 349" d="M3333.727-37.3h17.092s7.553-26.56,2.193-42.377-19.285-17.607-19.285-17.607-1.648,17.61,0,22.287,8.49,8.476,8.49,8.476v9s.072,9.521-6.02,17.074-6.275,5.848-6.275,5.848l-4.386-5.848,4.814-5.36,5.847,5.36" transform="translate(-1123.597 278.15)" fill="none" stroke="#fff" stroke-width="2" />
        <g id="Ellipse_11" data-name="Ellipse 11" transform="translate(2183.291 219.479)" fill="none" stroke="#fff" stroke-width="2">
            <circle cx="3" cy="3" r="3" stroke="none" />
            <circle cx="3" cy="3" r="2" fill="none" />
        </g>
        <g id="Ellipse_12" data-name="Ellipse 12" transform="translate(2199.291 219.479)" fill="none" stroke="#fff" stroke-width="2">
            <circle cx="3" cy="3" r="3" stroke="none" />
            <circle cx="3" cy="3" r="2" fill="none" />
        </g>
        <path id="Path_350" data-name="Path 350" d="M2189.865,235.116c3.321,1.267,5.855,2.851,11.24,0" fill="none" stroke="#fff" stroke-width="2" />
    </g>
</svg>
]
var check_for_update_svg = [<svg xmlns="http://www.w3.org/2000/svg" width="91.542" height="91.541" viewBox="0 0 91.542 91.541">
<g id="Group_466" data-name="Group 466" transform="translate(-1347.921 -1636.156) rotate(45)">
  <path id="Path_462" data-name="Path 462" d="M338.151-390.588a5.6,5.6,0,0,1,5.6-5.6,5.6,5.6,0,0,1,5.6,5.6c0,3.094-5.6,15.481-5.6,15.481S338.151-387.495,338.151-390.588Zm-11.206-49.491c0-14.441,16.808-26.147,16.808-26.147s15.875,11.706,15.875,26.147c0,10.353-6.574,42.239-6.574,42.239a29.916,29.916,0,0,0-9.071-1.423,35.754,35.754,0,0,0-9.53,1.8S326.945-429.509,326.945-440.079Z" transform="translate(1831.505 623.881)" fill="none" stroke="#0000dc" stroke-width="2"/>
  <path id="Path_341" data-name="Path 341" d="M2190.158,195.469c.008,0,11.446,10.055,6.57,28.3-4.439-6.823-9.559-7.122-9.559-7.122" fill="none" stroke="#0000dc" stroke-width="2"/>
  <path id="Path_346" data-name="Path 346" d="M2194.948,195.469c-.008,0-11.446,10.055-6.57,28.3,4.439-6.823,9.559-7.122,9.559-7.122" transform="translate(-34.775)" fill="none" stroke="#0000dc" stroke-width="2"/>
  <path id="Path_342" data-name="Path 342" d="M2159.328,194.746s10.645,5.7,21.746,0" transform="translate(4345.208 411.703) rotate(180)" fill="none" stroke="#0000dc" stroke-width="2"/>
  <path id="Path_345" data-name="Path 345" d="M2159.328,194.745s10.377,5.558,21.2,0" transform="translate(4.82 -26.438)" fill="none" stroke="#0000dc" stroke-width="2"/>
  <path id="Path_461" data-name="Path 461" d="M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" transform="translate(2169.292 182.426)" fill="none" stroke="#0000dc" stroke-width="2"/>
</g>
</svg>



]
function help_div(svg, text) {
    svg = [svg[0]];
    svg.push(<div>{text}</div>);
    return (
        <div className="help-icon">
            <svg className="border_svg" xmlns="http://www.w3.org/2000/svg" width="354" height="220" viewBox="0 0 354 220">
                <g id="Path_330" data-name="Path 330" fill="#0b0533">
                    <path d="M 333.5235595703125 219.5 L 0.5 219.5 L 0.5 23.23928833007812 L 18.92333793640137 0.5 L 353.5 0.5 L 353.5 198.0667419433594 L 333.5235595703125 219.5 Z" stroke="none" />
                    <path id="border-stroke" d="M 19.1617431640625 1 L 1 23.41639709472656 L 1 219 L 333.3060607910156 219 L 353 197.8698425292969 L 353 1 L 19.1617431640625 1 M 18.68490600585938 0 L 354 0 L 354 198.2636413574219 L 333.7410583496094 220 L 0 220 L 0 23.0621337890625 L 18.68490600585938 0 Z" stroke="none" />
                </g>
            </svg>
            <div className="children_help">
                {svg}
            </div>
        </div>
    )
};
function Help_Menu(props) {
    const { name, children, ...rest } = props;
    return (
        <Menu>
            <div className="help-menu">
                <div className="text">Help</div>
                <div className="Help-Buttons">
                    {help_div(learn_svg, "Learn")}
                    {help_div(support_svg, "Support")}
                    {help_div(check_for_update_svg, "Check for Update")}
                </div>
            </div>
        </Menu>
    )
}

export default Help_Menu

