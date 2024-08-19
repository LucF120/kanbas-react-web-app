import React from 'react';
import logo from './logo.svg';
import Labs from "./Labs";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Kanbas from './Kanbas';
import Landing from './Landing';


function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Landing" />} />
          <Route path="/Landing/*" element={<Landing />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App;
