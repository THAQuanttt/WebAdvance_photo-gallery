import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetails from './components/PhotoDetails';
import './App.css'
const App = () => {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<PhotoList />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;