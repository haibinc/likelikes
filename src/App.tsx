import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Create from "./pages/Create";
import PasswordRecovery from "./pages/PasswordRecovery"
import ImageView from "./pages/ImageView";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route index element={<Home/>}/>
              <Route path="/home" element={<Home/>} />
              <Route path="/create" element={<Create/>}/>
              <Route path="/forgot-password" element={<PasswordRecovery/>}/>
              <Route path="/image/:imageName" element={<ImageView/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
