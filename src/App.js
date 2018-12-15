import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DayView from './components/DayView';
import EditList from './components/EditList';
import Footer from './components/Footer';


import './App.scss';

class App extends Component {

render() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Navbar />    
        </header>
        <main className="container py-5">
          <Route exact path="/" component={HomePage} />
          <Route path="/DayView" component={DayView} />
          <Route path="/EditList" component={EditList} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}
}

export default App;
