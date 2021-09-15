import React from 'react';
import { useState, useEffect } from 'react'
import Progress_Bar from './Progress_Bar'

function Progress_Bar_Component() {

    const bar_background =
        <svg xmlns="http://www.w3.org/2000/svg" width="700.707" height="42.999" viewBox="0 0 700.707 42.999">
            <defs>
                <filter id="Intersection_1" x="0.5" y="0.5" width="698.999" height="41.999" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood flood-opacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="Path_381" x="0" y="0" width="700.707" height="42.999" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="3" result="blur-2" />
                    <feFlood flood-color="#0000dc" flood-opacity="0.361" />
                    <feComposite operator="in" in2="blur-2" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Intersection_1)">
                <path id="Intersection_1-2" data-name="Intersection 1" d="M681,24.777h0ZM681,24.777Zm-681,0v-24H657l24,24,0,0ZM647.3,19.6h7.06L639.229,5.477H632.17Zm-33,0h7.059L606.228,5.477H599.17Zm-33,0h7.059L573.229,5.477h-7.06Zm-33,0h7.06L540.229,5.477H533.17Zm-33,0h7.059L507.228,5.477H500.17Zm-33,0h7.059L474.229,5.477h-7.06Zm-33,0h7.06L441.229,5.477H434.17Zm-33,0h7.059L408.228,5.477H401.17Zm-33,0h7.059L375.229,5.477h-7.06Zm-33,0h7.06L342.229,5.477H335.17Zm-33,0h7.059L309.228,5.477H302.17Zm-33,0h7.059L276.229,5.477h-7.06Zm-33,0h7.06L243.229,5.477H236.17Zm-33,0h7.059L210.228,5.477H203.17Zm-33,0h7.059L177.229,5.477h-7.06Zm-33,0h7.06L144.229,5.477H137.17Zm-33,0h7.059L111.228,5.477H104.17Zm-33,0h7.059L78.229,5.477h-7.06Zm-33,0h7.06L45.229,5.477H38.17Zm-33,0h7.059L12.228,5.477H5.17Z" transform="translate(9.5 5.72)" fill="#060841" />
            </g>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_381)">
                <path id="Path_381-2" data-name="Path 381" d="M657.5,24.5H.5V.5h657l24,24ZM632.67,5.2,647.8,19.32h7.06L639.729,5.2Zm-33,0L614.8,19.32h7.059L606.729,5.2Zm-33,0L581.8,19.32h7.059L573.729,5.2Zm-33,0L548.8,19.32h7.06L540.729,5.2Zm-33,0L515.8,19.32h7.059L507.729,5.2Zm-33,0L482.8,19.32h7.059L474.729,5.2Zm-33,0L449.8,19.32h7.06L441.729,5.2Zm-33,0L416.8,19.32h7.059L408.729,5.2Zm-33,0L383.8,19.32h7.059L375.729,5.2Zm-33,0L350.8,19.32h7.06L342.729,5.2Zm-33,0L317.8,19.32h7.059L309.729,5.2Zm-33,0L284.8,19.32h7.059L276.729,5.2Zm-33,0L251.8,19.32h7.06L243.729,5.2Zm-33,0L218.8,19.32h7.059L210.729,5.2Zm-33,0L185.8,19.32h7.059L177.729,5.2Zm-33,0L152.8,19.32h7.06L144.729,5.2Zm-33,0L119.8,19.32h7.059L111.729,5.2Zm-33,0L86.8,19.32h7.059L78.729,5.2Zm-33,0L53.8,19.32h7.06L45.729,5.2Zm-33,0L20.8,19.32h7.059L12.729,5.2Z" transform="translate(9 6)" fill="none" stroke="#707070" stroke-width="1" />
            </g>
        </svg>

  return (
        <Progress_Bar>
            <svg className={`bar-slider`} xmlns="http://www.w3.org/2000/svg" width="100%" height="26.554" viewBox="0 0 683.613 26.554">
                <path id="Path_379" data-name="Path 379" d="M974.108,957.482l25.554,25.554H317.756V957.482Z" transform="translate(-317.256 -956.982)" stroke="#0000dc" stroke-width="1" />
            </svg>
            {bar_background}
        </Progress_Bar>
    )

}

export default {
    title: 'Progress Bar',
    component: Progress_Bar
}

export const Progress_Bar_Test = () => Progress_Bar_Component();