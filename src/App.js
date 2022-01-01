import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TranscriptPage from './components/TranscriptPage';
import InputPage from './components/InputPage';
import Buffer from './components/Buffer';

function App() {
  return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InputPage /> }/>
            <Route path="/transcript" element={<TranscriptPage /> }/>
            <Route path="/menu" element={ <Buffer /> }/>
            <Route path="/buffer" element={ <Buffer /> }/>
          </Routes>
        </BrowserRouter>
      </div>
      );
}

export default App;
