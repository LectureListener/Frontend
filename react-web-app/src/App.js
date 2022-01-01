import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TranscriptPage from './components/TranscriptPage';
import InputPage from './components/InputPage';

function App() {
  return (
    <Router>
        <div className="app">
          <Route path="/" exact render={() => <InputPage></InputPage> }></Route>
          <Route path="/transcript" exact render={() => <TranscriptPage></TranscriptPage> }></Route>
          <Route path="/menu" exact render={() => "I guess this is a Menu" }></Route>
        </div>
    </Router>
  );
}

export default App;
