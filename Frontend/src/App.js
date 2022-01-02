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
        <div>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<TranscriptPage/>}/>
            <Route path="/input" element={<InputPage /> }/>
            <Route path="/menu" element={ <Buffer />}/>
          </Routes>
        </BrowserRouter>
      </div>
      );
}

export default App;
