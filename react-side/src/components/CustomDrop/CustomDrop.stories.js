import React from 'react';

import CustomDrop from './';

export default {
    title: 'Production/CustomDrop',
    component: CustomDrop,
}

//Defining a template for ease
const Template = (args) => <CustomDrop {...args}/>

export const FirstTry = Template.bind({});
