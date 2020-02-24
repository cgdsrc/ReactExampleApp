import React, { Component } from 'react';

import Login from './pages/LoginPage';
import About from './pages/AboutPage';
import Home from './pages/HomePage';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


import { connect } from 'react-redux';

import { setIsAuth, setIsLoading } from './actions';

import axios from 'axios';
import axiosError from 'axios-error';
import SocketPage from './pages/SocketPage/SocketPage';
import './App.css';
import PrivateRoute from './components/PrivateRoute';




class App extends Component {

  state = {
    redirectHome: false,
    redirectAbout: false
  }


  async componentWillReceiveProps() {
    console.log("willreceivePRops")
    await this.checkAuthentication()
  }

  async componentWillMount() {
    await this.checkAuthentication()
  }

  logKey = (e) => {

    if (e.altKey && e.keyCode === 49) {
      console.log("acıatiümabi");

      this.setState({
        redirectHome: true
      })
    }

    if (e.altKey && e.keyCode === 50) {
      console.log("acıatiümabi");

      this.setState({
        redirectAbout: true
      })
    }

  }
  renderRedirectAbout = () => {
    if (this.state.redirectAbout) {
      this.setState({
        redirectAbout: false
      })
      return <Redirect to='/about' />

    }
  }

  renderRedirectHome = () => {
    if (this.state.redirectHome) {
      this.setState({
        redirectHome: false
      })
      return <Redirect to='/' />

    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.logKey);


  }
  checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    this.props.setIsLoading(true);
    if (token && token.length > 0) {
      var data = {};
      try {
        const header = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': token
          }
        };
        console.log(header)
        const response = await axios.get('http://127.0.0.1:1040/mood', header);
        console.log(response.data)

        data = {
          isAuth: true
        };
        this.props.setIsLoading(false);

      } catch (e) {
        this.props.setIsLoading(false);
        var err = new axiosError(e);
        console.log(err.response)
        data = {
          isAuth: false
        };
        localStorage.removeItem('token');
      }
      this.props.setIsAuth(data);
    }
  }

  render() {
    const { isAuthenticated } = this.props
    console.log("this.props", this.props, isAuthenticated)
    return (

      <Router >
        <Switch>
          <div className="text-center av-full-body">
            <Route exact path="/login" render={(props) => (
              isAuthenticated === true
                ? <Redirect to="/" {...props} />
                : <Login />
            )} />
            <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={Home} />
            <PrivateRoute exact path="/about" isAuthenticated={isAuthenticated} component={About} />
            <PrivateRoute exact path="/socket" isAuthenticated={isAuthenticated} component={SocketPage} />
            {this.renderRedirectHome()}
            {this.renderRedirectAbout()}
          </div>

        </Switch>

      </Router>
    );
  }

}

// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
  return {
    isAuthenticated: state.LoginReducer.isAuth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setIsAuth: (data) => { dispatch(setIsAuth(data)) },
    setIsLoading: (data) => { dispatch(setIsLoading(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);