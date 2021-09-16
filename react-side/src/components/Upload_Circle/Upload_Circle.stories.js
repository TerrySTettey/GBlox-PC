import React from 'react';
import { useState, useEffect } from 'react'
import Upload_Circle from './Upload_Circle'
import './Upload_Circle.scss'

function Upload_Circle_Component() {
    const get_origin = event => {
        var test = document.getElementById("Circle SVG");
        var origin = window.getComputedStyle(test, null).getPropertyValue("transform-origin");
        var inner = document.getElementById("Inner_Circle")
        console.log(window.getComputedStyle(inner, null).getPropertyValue("transform-origin"));
    }

    return (
        <Upload_Circle>
        </Upload_Circle>

    )
}

export default {
    title: 'Upload Circle',
    component: Upload_Circle
}

export const Upload_Circle_Test = () => Upload_Circle_Component();