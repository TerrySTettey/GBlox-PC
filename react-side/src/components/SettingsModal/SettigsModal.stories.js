import React from 'react';

import SettingsModal from './';

export default {
    title: 'Production/SettingsModal',
    component: SettingsModal,
}

//Defining a template for ease
const Template = (args) => <SettingsModal {...args}/>

export const FirstTry = Template.bind({});
