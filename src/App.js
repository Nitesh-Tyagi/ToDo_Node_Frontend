import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import MainComponent from './components/MainComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
        <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        <Route path="/home" element={<MainComponent />}/>
        </Routes>
    </div>
    
  );
}

export default App;
