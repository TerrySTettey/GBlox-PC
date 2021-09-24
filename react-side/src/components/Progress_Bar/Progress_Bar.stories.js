import React from 'react';
import { useState, useEffect } from 'react'
import Progress_Bar from './Progress_Bar'
import './Progress_Bar.scss'

function Progress_Bar_Component() {
  return (
        <Progress_Bar>

        </Progress_Bar>
    )

}

export default {
    title: 'Progress Bar',
    component: Progress_Bar
}

export const Progress_Bar_Test = () => Progress_Bar_Component();