import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import {ThemeContext} from '../contexts/ThemeContext'

import "./ProgressBar.scss"

const ProgressBar = (props) => {
   const {
      current_theme
   } = useContext(ThemeContext)

   const FilledBar = (
      <div className="i-FilledBar" />
   )

   const EmptyBar = (
      <div className="i-EmptyBar" />
   )

   var BarCode = [];
   var fillNum = 0;
   if (props.progress % 2 === 0) {
      fillNum = Math.round(props.progress / 2);
      // console.log(fillNum)
   } else {
      fillNum = Math.round(props.progress / 2) - 1;
      // console.log(fillNum)
   }

   for (var i = 1; i <= 50; i++) {
      if (i <= fillNum) {
         BarCode.push(FilledBar);
      }
      else {
         BarCode.push(EmptyBar);
      }
   }

   useEffect(()=>{
      if (current_theme !== null){
         if (current_theme.dropShadowStatus == true){
            var bars = document.getElementsByClassName("i-FilledBar")
            for (var i = 0; i < bars.length; i++) {
               bars[i].style.filter = "drop-shadow(0 0 6px var(--secondary-color))"
            }
         }
         else{
            var bars = document.getElementsByClassName("i-FilledBar")
            for (var i = 0; i < bars.length; i++) {
               bars[i].style.filter = "none"
            }
         }
      }

   },[current_theme])
   return (
      <div className="c-ProgressBar-a-BarContainer">
         <div className="i-ProgressPercent">{props.progress}%</div>
         <div className="i-ContainerHolder">
            <svg xmlns="http://www.w3.org/2000/svg" width="683.613" height="26.554" viewBox="0 0 683.613 26.554">
               <path id="Path_379" data-name="Path 379" d="M974.108,957.482l25.554,25.554H317.756V957.482Z" transform="translate(-317.256 -956.982)" stroke="#0000dc" stroke-width="1" />
            </svg>
            <div className="i-WhiteBarContainer">
               {BarCode}
            </div>
         </div>
      </div>
   )
}

export default ProgressBar

ProgressBar.defaultProps = {
   progress: 100,
}

ProgressBar.propTypes = {
   progress: PropTypes.number,
}