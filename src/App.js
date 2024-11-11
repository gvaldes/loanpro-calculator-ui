import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalculatorComponent from './components/CalculatorComponent/CalculatorComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/calculator" element={<CalculatorComponent />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
