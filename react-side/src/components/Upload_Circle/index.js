import React from 'react'
import PropTypes from 'prop-types'
import './Upload_Circle.scss'
import Button from '../Button'

function index(props) {

  const circle =
    [
      <div className="circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="152.109" height="152.104" viewBox="0 0 152.109 152.104">
          <g id="Circle" transform="translate(-68.073 -128.04)">
            <g id="Outer_Circle" data-name="Outer Circle">
              <path id="Union_1" data-name="Union 1" d="M-61.372-15.223l3.547-1.463a76.826,76.826,0,0,0,4.8,8.869l-3.178,2.129A78.262,78.262,0,0,1-61.372-15.223Zm-5.083-14.769,3.786-.75a75.52,75.52,0,0,0,2.986,9.652l-3.546,1.465A76.727,76.727,0,0,1-66.455-29.992Zm-2.093-15.5h3.855a75.768,75.768,0,0,0,1.061,10.057l-3.785.75A78.455,78.455,0,0,1-68.549-45.488Zm-.036-4.785A79.373,79.373,0,0,1-67.6-61.128l3.761.75a78.719,78.719,0,0,0-.882,10.105Zm1.88-15.545a77.612,77.612,0,0,1,3.082-10.473l3.548,1.464a74.048,74.048,0,0,0-2.857,9.759Zm4.892-14.9a78.015,78.015,0,0,1,5.094-9.689l3.165,2.119a78.242,78.242,0,0,0-4.724,9.034Zm7.724-13.676a77.663,77.663,0,0,1,6.9-8.521l2.69,2.689a77.522,77.522,0,0,0-6.415,7.951Zm10.248-11.925a78.076,78.076,0,0,1,8.438-7.034l2.119,3.165a76.95,76.95,0,0,0-7.856,6.57Zm12.378-9.736a79.208,79.208,0,0,1,9.688-5.261l1.463,3.535a75.608,75.608,0,0,0-9.022,4.915ZM42.854-118l1.463-3.546a77.283,77.283,0,0,1,9.747,5.236l-2.119,3.178A74.7,74.7,0,0,0,42.854-118Zm-60.237-5.189a78.552,78.552,0,0,1,10.544-3.262l.752,3.774a75.7,75.7,0,0,0-9.832,3.035Zm45.942.38.75-3.772a77.022,77.022,0,0,1,10.593,3.2l-1.465,3.547A74.409,74.409,0,0,0,28.56-122.8Zm-30.719-4.605a79.409,79.409,0,0,1,11-1.12v3.857a76.145,76.145,0,0,0-10.247,1.048Zm15.77,2.724v-3.867a78.132,78.132,0,0,1,11.009,1.058l-.75,3.761A78.775,78.775,0,0,0,13.611-124.685Z" transform="translate(137.169 257.105)" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1" />
            </g>
            <g id="Inner_Circle" data-name="Inner Circle" transform="translate(84.397 144.359)">
              <path id="Path_78" data-name="Path 78" d="M169.581,121.744a64.455,64.455,0,0,0-16.126,2.042l.438,1.7a61.567,61.567,0,0,0-12.318,4.625l-.787-1.57a64.367,64.367,0,0,0-31.919,78.668l1.67-.583a62.529,62.529,0,0,0,59.043,41.93V239a52.964,52.964,0,0,1-51.888-42.284,53.448,53.448,0,0,1-1.077-10.681h-4.15a56.815,56.815,0,0,1,16.288-39.965l2.98,2.916a52.555,52.555,0,0,1,37.847-15.916,53.566,53.566,0,0,1,9.916.925l.767-4.061a56.573,56.573,0,0,1,13.313,4.286l-1.735,3.741a52.983,52.983,0,0,1,12.69,8.275l2.715-3.088a57.083,57.083,0,0,1,14.208,66.83l6.506,3.008a64.311,64.311,0,0,0-58.379-91.238Z" transform="translate(-105.297 -121.744)" fill="#0000dc" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1" />
            </g>
            <path id="Path_390" data-name="Path 390" d="M32,126a71.08,71.08,0,1,1,51.379-22.045c-.182-.438-.388-.876-.615-1.3A69.364,69.364,0,0,0,101.655,55a69.642,69.642,0,1,0-45.438,65.313c.318.364.658.718,1.011,1.055A70.526,70.526,0,0,1,32,126Z" transform="translate(116.683 153.646)" fill="#0000dc" stroke="rgba(0,0,0,0)" stroke-width="1" />
            <g id="Group_404" data-name="Group 404" transform="translate(4 7.737)">
              <path id="Path_389" data-name="Path 389" d="M-37.731,24.872h0L-39,12.993A53.816,53.816,0,0,0-25.983,9.932a15.388,15.388,0,0,0,4.65,11.018,65.828,65.828,0,0,1-16.4,3.923Zm5.157-10.864a3.263,3.263,0,0,0-3.261,3.259,3.265,3.265,0,0,0,3.261,3.262,3.265,3.265,0,0,0,3.261-3.262A3.263,3.263,0,0,0-32.574,14.009ZM3.788,3.822h0A15.617,15.617,0,0,0-4.77-4.534,54.291,54.291,0,0,0,3.1-16l10.635,5.446A66.248,66.248,0,0,1,3.789,3.821ZM5.8-12.364A3.264,3.264,0,0,0,2.54-9.1,3.264,3.264,0,0,0,5.8-5.843,3.264,3.264,0,0,0,9.061-9.1,3.264,3.264,0,0,0,5.8-12.364Z" transform="translate(188.48 241.803)" fill="#4c97ff" stroke="rgba(0,0,0,0)" stroke-width="1" />
            </g>
          </g>
        </svg>
        <p className="upload-text" id="Add_device" data-name="Add device" font-size="17">Add device</p>
      </div>]

  return (
    <div id="upload-container">
      {circle}
      <div id="selected-device">
        {props.children}
      </div>

      <div className="device-add-button">
        <Button
          id="device-add-button"
          type="DeviceAddButton"
          outColor="#0000bc"
          hoverColor="#0000aa"
          hoverEffect="svg-fill"
          onClick={props.onClick}
        />
      </div>

    </div>
  )
}

index.propTypes = {

}

export default index

