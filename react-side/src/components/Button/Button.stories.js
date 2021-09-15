import React from 'react';

import Button from './';

export default {
    title: 'Production/Button',
    component: Button,
}

//Defining a template for ease
const Template = (args) => <Button {...args}/>

export const FirstTry = Template.bind({});
