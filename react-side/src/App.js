import React from 'react';
import TestMain from "./components/TestMain";
import DeviceContextProvider from "./components/contexts/DeviceContext";
import ThemeContextProvider from "./components/contexts/ThemeContext";


import './App.css';



//Default Workspace

const App = () => {
  return (
    <ThemeContextProvider>
      <DeviceContextProvider>
        <TestMain />
      </DeviceContextProvider>
    </ThemeContextProvider>
  )
}

export default App;