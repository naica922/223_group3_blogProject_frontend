import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import './App.css';

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<div>Not Found</div>} />
      </Routes>
  );
}

export default App;
