import React from 'react';
import TestMain from "./components/TestMain";
import CtxtP_SingletonManager from './components/contexts/Ctxt_SingletonManager';
import './App.css';

const App = () => {
  return (
    <CtxtP_SingletonManager>
      <TestMain />
    </CtxtP_SingletonManager>
  )
}

export default App;