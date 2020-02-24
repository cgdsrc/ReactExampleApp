import React, { Component } from 'react';
import Brand from '../images/avikonLogoWhite.png';
import '../css/custom.css';
import axios from 'axios';
import axiosError from 'axios-error';
import { connect } from 'react-redux';
import { onSubmitLogin, setIsAuth, setIsLoading } from '../actions';
import Loader from '../components/Loader/Loader'

class Login extends Component {

  constructor(props) {
    super(props)
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      username: '',
      password: ''
    }
  }


  onChangeInput = (key, value) => {
    console.log(key, value)
    this.setState({
      [key]: value
    })
  }

  onSubmit = async (e) => {
    console.log(this.props)
    const { username, password } = this.state
    e.preventDefault();
    try {
      const msg = {
        id: 456123,
        username,
        password
      };
      const response = await axios.post('http://127.0.0.1:1040/login', msg);
      // console.log("devam")
      if (response.data.token) {
        // Token yerel depolamaya kaydet
        // input alanlarını temizle
        const data = {
          Errors: "",
          isAuth: true
        };
        localStorage.setItem("token", response.data.token);
        this.props.onSubmitLogin(data);
      }
    } catch (e) {
      var err = new axiosError(e);
      // console.log(err.response.data.errors.form)
      const data = {
        Errors: err.response.data.errors.form,
        isAuth: false
      };
      this.props.onSubmitLogin(data);
    }


  }
  render() {
    const { username, password } = this.state
    if (this.props.IsLoading) {
      return (
        <form className="Loader-Form d-flex justify-content-center">
          <Loader />
        </form>
      );
    }
    else {
      return (

        <form className="Login" >

          <div className="av-width">
            <img className="av-card-img" src={Brand} alt="BrandLogo"></img>
            <h1 className="h3 mb-3 font-weight-normal">GİRİŞ</h1>
            {
              Object.keys(this.props.Errors).length !== 0 ? <div className="alert alert-danger" role="alert">{this.props.Errors}</div> : ""
            }

            <input
              type="text"
              value={username}
              name="username"
              onChange={(e) => { this.onChangeInput('username', e.target.value) }}
              className="form-control mb-2"
              placeholder="Kullanıcı Adı" />
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => { this.onChangeInput('password', e.target.value) }}
              className="form-control mb-2"
              placeholder="Şifre " />
            <div className="checkbox mt-3 mb-3">
              <label>
                <input type="checkbox" value="remember-me" />
                Unutma bunu sorucam sonra
              </label>
            </div >
            <button type="button" onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block">Giriş yap</button>
            <p className="mt-5 mb-3 av-text-muted">&copy; 2019-2020</p>
          </div>
        </form>
      );
    }
  }

  componentDidMount() {
    // isLoading set et
    this.props.setIsLoading(false);

  }


}

// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
  return {
    isAuthenticated: state.LoginReducer.isAuth,
    Errors: state.LoginReducer.Errors,
    IsLoading: state.LoginReducer.IsLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitLogin: (data) => { dispatch(onSubmitLogin(data)) },
    setIsAuth: (data) => { dispatch(setIsAuth(data)) },
    setIsLoading: (data) => { dispatch(setIsLoading(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);