import React from 'react';

import Button from './';

export default {
    title: 'Production/Button',
    component: Button,
}

//Defining a template for ease
const Template = (args) => <Button {...args}/>

export const Default = Template.bind({});

export const SettingsColor = Template.bind({})
SettingsColor.args = {
    type: "SettingsColor",
    inColor: "#0000bc",
    outColor: "#FAC",
    hoverColor: "#0000bc",
    s_ButtonState: "Out",
    text: "Insert Text Here",
    hoverEffect: "border"
}

export const SettingsButton = Template.bind({})
SettingsButton.args = {
    type: "SettingsButton",
    inColor: "#0000bc",
    outColor: "#FAC",
    hoverColor: "#0000bc",
    s_ButtonState: "Out",
    text: "Insert Text Here",
    hoverEffect: "fill"
}

export const SettingsXButton = Template.bind({})
SettingsXButton.args = {
    type: "SettingsXButton",
    inColor: "#0000bc",
    outColor: "#FAC",
    hoverColor: "#0000bc",
    s_ButtonState: "Out",
    text: "Insert Text Here",
    hoverEffect: "fill"
}

export const LanguageMenuButton = Template.bind({})
LanguageMenuButton.args = {
    type: "LanguageMenuButton",
    inColor: "#0000bc",
    outColor: "#0b0533",
    hoverColor: "#0000bc",
    s_ButtonState: "Out",
    text: "Insert Text Here",
    hoverEffect: "fill"
}

export const LanguageContentButton = Template.bind({})
LanguageContentButton.args = {
    type: "LanguageContentButton",
    inColor: "#0000aa",
    outColor: "#0000bc",
    hoverColor: "#0000aa",
    s_ButtonState: "Out",
    text: "Insert Text Here",
    hoverEffect: "fill"
}
