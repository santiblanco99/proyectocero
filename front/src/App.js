import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import authService from './services/auth.service';
import eventsService from './services/events.service';

import Login from './components/login';
import Home from './components/home';
import Register from './components/register';


class App extends React.Component {

    state = {currentUser: null}

    componentDidMount() {
        const user = authService.getCurrentUser();
        console.log(user);
        this.setState({currentUser:user});
    }

    logout = () => {
        authService.logout();
    }

    render() {
        return (
            <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Cloud Events
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/events"} className="nav-link">
                  Home
                </Link>
              </li>
            </div>

            {this.state.currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logout}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/events"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
          </div>
          </Router>
        );
    }


}






export default App;