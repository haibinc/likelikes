import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route index element={<Home/>}/>
              <Route path="/home" element={<Home/>} />
              <Route path="/loginpage" element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
