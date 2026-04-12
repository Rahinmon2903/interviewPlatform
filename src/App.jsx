import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <BrowserRouter>
       <ToastContainer />
    <Routes>
      <Route path="/" element={<Login />} />
           <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
    </BrowserRouter>
    
    </>
     
      
    
  );
};

export default App;