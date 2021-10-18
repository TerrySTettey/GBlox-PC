import React from 'react';
import TestMain from "./components/TestMain";
import DeviceContextProvider from "./components/contexts/DeviceContext";


import './App.css';



//Default Workspace

const App = () => {
  return(
    <DeviceContextProvider>
      <TestMain/>
    </DeviceContextProvider>
  )
}

export default App;