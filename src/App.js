import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DayView from './components/DayView';
import EditList from './components/EditList';
import Users from './components/Users';
import Footer from './components/Footer';


import './App.scss';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  state = {
      weekArray: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      users: '',
      swapped: null,
      choreLists: null
  }

componentDidMount() {
  this.getChores()
  this.getUsers()
  // console.log(this.getChores())
  // console.log(this.getUsers())
}

getChores = async () => {
  try {
    const res = await axios.get('/lists')
    const choreLists = res.data.data
  
    this.setState({
      choreLists
    })
  } catch(e) {
    console.log(e)
  }
}

getUsers = async () => {
  const res = await axios.get('/users')
  const users = res.data.data

  this.setState({
    users
  })
}

  getUserList() {
    const userList = this.props.choreLists.filter(list => list.user.name === "Meghan")
    console.log(userList)
  }

render() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Navbar />    
        </header>
        <main className="container py-5">
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/DayView" render={() =>
            <DayView 
              choreLists={this.state.choreLists} 
              weekArray={this.state.weekArray}
              users={this.state.users}
              />}
          /> */}
          <Route path="/EditList" component={EditList} />
          {/* <Route 
            path="/Users" 
            render={() => <Users />}
          /> */}
        </main>
        <Footer />
      </div>
    </Router>
  )
}
}

export default App;
