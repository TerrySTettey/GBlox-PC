import React from 'react'
import PropTypes from 'prop-types'
import Help_Menu from './Help_Menu'

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
  <path id="Path_347" data-name="Path 347" d="M3357.259-92.2s3.72-6.975-9.3-7.44-42.316,3.72-41.386,36.736a120.359,120.359,0,0,0,3.7,26.97H3326.6" transform="translate(-1147.621 276.041)" fill="none" stroke="#fff" stroke-width="2"/>
  <path id="Path_348" data-name="Path 348" d="M3352.8-86.5s-8.4,12.09-22.348,12.09h-15.5v7.516s-3.3-.222-2.582,3.814,3.749,3.172,3.749,3.172,2.013,13.245,17.042,19.7a13.471,13.471,0,0,0,10.588.185" transform="translate(-1142.669 288.01)" fill="none" stroke="#fff" stroke-width="2"/>
  <path id="Path_349" data-name="Path 349" d="M3333.727-37.3h17.092s7.553-26.56,2.193-42.377-19.285-17.607-19.285-17.607-1.648,17.61,0,22.287,8.49,8.476,8.49,8.476v9s.072,9.521-6.02,17.074-6.275,5.848-6.275,5.848l-4.386-5.848,4.814-5.36,5.847,5.36" transform="translate(-1123.597 278.15)" fill="none" stroke="#fff" stroke-width="2"/>
  <g id="Ellipse_11" data-name="Ellipse 11" transform="translate(2183.291 219.479)" fill="none" stroke="#fff" stroke-width="2">
    <circle cx="3" cy="3" r="3" stroke="none"/>
    <circle cx="3" cy="3" r="2" fill="none"/>
  </g>
  <g id="Ellipse_12" data-name="Ellipse 12" transform="translate(2199.291 219.479)" fill="none" stroke="#fff" stroke-width="2">
    <circle cx="3" cy="3" r="3" stroke="none"/>
    <circle cx="3" cy="3" r="2" fill="none"/>
  </g>
  <path id="Path_350" data-name="Path 350" d="M2189.865,235.116c3.321,1.267,5.855,2.851,11.24,0" fill="none" stroke="#fff" stroke-width="2"/>
</g>
</svg>
]
var check_for_update_svg = [<svg xmlns="http://www.w3.org/2000/svg" width="85.263" height="85.97" viewBox="0 0 85.263 85.97">
<g id="Group_466" data-name="Group 466" transform="translate(-1355.726 -1634.631) rotate(45)">
  <g id="Path_340" data-name="Path 340" transform="translate(2147.292 154.426)" fill="none">
    <path d="M28,0S45,12.536,45,28c0,11.088-7.04,45.235-7.04,45.235a32.016,32.016,0,0,0-9.715-1.524A38.281,38.281,0,0,0,18.04,73.64S10,39.32,10,28C10,12.536,28,0,28,0Z" stroke="none"/>
    <path d="M 27.96418380737305 2.526420593261719 C 26.36931610107422 3.771415710449219 23.38509178161621 6.26409912109375 20.43766784667969 9.594200134277344 C 17.95461273193359 12.3996467590332 15.98300170898438 15.24216842651367 14.57759857177734 18.04282379150391 C 12.86723327636719 21.45121383666992 12 24.80129241943359 12 28 C 12 37.37507247924805 17.78598022460938 63.52422332763672 19.5091438293457 71.10338592529297 C 21.59442901611328 70.53073120117188 24.92351531982422 69.77796173095703 28.20468902587891 69.71122741699219 C 28.36643409729004 69.70793151855469 28.53176689147949 69.70626831054688 28.69607734680176 69.70626831054688 C 31.70851898193359 69.70626831054688 34.56180191040039 70.25699615478516 36.42818069458008 70.71996307373047 C 37.94766235351562 63.12710571289062 43 37.1877326965332 43 28 C 43 24.78631210327148 42.17866516113281 21.42343521118164 40.55881118774414 18.00479125976562 C 39.23117828369141 15.20283508300781 37.36944580078125 12.35997009277344 35.02532196044922 9.555160522460938 C 32.26864242553711 6.256698608398438 29.47804832458496 3.780754089355469 27.96418380737305 2.526420593261719 M 28 0 C 28 0 45 12.5360221862793 45 28 C 45 39.08766937255859 37.96019744873047 73.23471069335938 37.96019744873047 73.23471069335938 C 37.96019744873047 73.23471069335938 33.22544860839844 71.60952758789062 28.2453670501709 71.7108154296875 C 23.26524353027344 71.81211090087891 18.03972244262695 73.639892578125 18.03972244262695 73.639892578125 C 18.03972244262695 73.639892578125 10 39.31962585449219 10 28 C 10 12.5360221862793 28 0 28 0 Z" stroke="none" fill="#fff"/>
  </g>
  <path id="Path_341" data-name="Path 341" d="M2190.158,195.469c.008,0,11.446,10.055,6.57,28.3-4.439-6.823-9.559-7.122-9.559-7.122" fill="none" stroke="#fff" stroke-width="2"/>
  <path id="Path_346" data-name="Path 346" d="M2194.948,195.469c-.008,0-11.446,10.055-6.57,28.3,4.439-6.823,9.559-7.122,9.559-7.122" transform="translate(-34.775)" fill="none" stroke="#fff" stroke-width="2"/>
  <path id="Path_342" data-name="Path 342" d="M2159.328,194.746s10.645,5.7,21.746,0" transform="translate(4345.208 411.703) rotate(180)" fill="none" stroke="#fff" stroke-width="2"/>
  <path id="Path_345" data-name="Path 345" d="M2159.328,194.745s12.16,6.513,24.842,0" transform="translate(2.999 -26.651)" fill="none" stroke="#fff" stroke-width="2"/>
  <g id="Ellipse_10" data-name="Ellipse 10" transform="translate(2169.292 182.426)" fill="none" stroke="#fff" stroke-width="2">
    <circle cx="6" cy="6" r="6" stroke="none"/>
    <circle cx="6" cy="6" r="5" fill="none"/>
  </g>
  <g id="Path_344" data-name="Path 344" transform="translate(2169.292 229.426)" fill="none">
    <path d="M6,0a6,6,0,0,1,6,6c0,3.314-6,16.58-6,16.58S0,9.314,0,6A6,6,0,0,1,6,0Z" stroke="none"/>
    <path d="M 6 1.999996185302734 C 3.794389724731445 1.999996185302734 2 3.79438591003418 2 5.999996185302734 C 2 6.394655227661133 2.20557975769043 8.193785667419434 4.850840091705322 14.77450561523438 C 5.241721153259277 15.74691772460938 5.634264945983887 16.6945629119873 6 17.56195068359375 C 6.365735054016113 16.6945629119873 6.758278846740723 15.74691772460938 7.149159908294678 14.77450561523438 C 9.79442024230957 8.193785667419434 10 6.394655227661133 10 5.999996185302734 C 10 3.79438591003418 8.205610275268555 1.999996185302734 6 1.999996185302734 M 6 -3.814697265625e-06 C 9.31371021270752 -3.814697265625e-06 12 2.686285018920898 12 5.999996185302734 C 12 9.313706398010254 6 22.57971572875977 6 22.57971572875977 C 6 22.57971572875977 0 9.313706398010254 0 5.999996185302734 C 0 2.686285018920898 2.68628978729248 -3.814697265625e-06 6 -3.814697265625e-06 Z" stroke="none" fill="#fff"/>
  </g>
</g>
</svg>
]
function help_div(svg, text) {
    svg=[svg[0]];
    svg.push(<div>{text}</div>);
    return (
        <div className="help-icon">
            <svg className="border_svg" xmlns="http://www.w3.org/2000/svg" width="354" height="220" viewBox="0 0 354 220">
                <g id="Path_330" data-name="Path 330" fill="#0b0533">
                    <path d="M 333.5235595703125 219.5 L 0.5 219.5 L 0.5 23.23928833007812 L 18.92333793640137 0.5 L 353.5 0.5 L 353.5 198.0667419433594 L 333.5235595703125 219.5 Z" stroke="none" />
                    <path d="M 19.1617431640625 1 L 1 23.41639709472656 L 1 219 L 333.3060607910156 219 L 353 197.8698425292969 L 353 1 L 19.1617431640625 1 M 18.68490600585938 0 L 354 0 L 354 198.2636413574219 L 333.7410583496094 220 L 0 220 L 0 23.0621337890625 L 18.68490600585938 0 Z" stroke="none" fill="#0000dc" />
                </g>
            </svg>
            <div className="children_help">
            {svg}
            </div>
        </div>
    )
};

function Help_Menu_component() {
    return (
        <Help_Menu>
            <div className="text">Testing</div>
            {help_div(learn_svg,"Learn")}
            {help_div(support_svg,"Support")}
            {help_div(check_for_update_svg,"Check for Update")}

        </Help_Menu>
    )
}

export default {
    title: 'Help Menu',
    component: Help_Menu
}

export const Help_Menu_Default = () => Help_Menu_component();

