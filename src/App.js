import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ConfContext from './context/ConfContext'
import Home from './components/Home';
import './App.css';

export default function App() {
  const [ca, setCa] = useState(162367);

  const confValue = {
    ca: ca,
    setCa: setCa,
  }

  return (
    <ConfContext.Provider value={confValue}>
      <div id='app'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ConfContext.Provider>
  );
}