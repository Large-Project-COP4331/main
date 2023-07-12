import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from './pages/Welcome';
import LoginPage from './pages/LoginPage';
import ForgotPage from './pages/ForgotPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function App() 
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<Welcome />} />
      <Route path="/loginpage" index element={<LoginPage />} />
      <Route path="/forgotpage" index element={<ForgotPage />} />
      <Route path="/registerpage" index element={<RegisterPage />} />
      <Route path="/homepage" index element={<HomePage/>} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
