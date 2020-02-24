import React, { Component } from 'react'
import '../../css/MenuBar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setIsAuth } from '../../actions/index';

import axios from 'axios';

class MenuBar extends Component {
    onClick = async (e) => {
        try {
            const header = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Auth-Token': localStorage.getItem("token")
                }
            };
            const response = await axios.delete('http://127.0.0.1:1040/logout', header);
            console.log(response)

            const data = {
                isAuth: false
            };
            localStorage.removeItem('token');
            this.props.setIsAuth(data);
        } catch (e) {
            const data = {
                isAuth: false
            };
            localStorage.removeItem('token');
            this.props.setIsAuth(data);
        }
    }


    render() {
        return (
            <div className="MenuBar">
                <div className="row mr-0 ml-0">
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <h1>Avikon</h1>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to="/">
                            MySQL
                        </Link>

                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to="/about">
                            Mongo
                        </Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to="/socket">
                            Socket
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 av-input">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" className="form-control" placeholder="Search..."></input>
                        </div>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        {
                            console.log('isAuthenticated', this.props.isAuthenticated) && this.props.isAuthenticated === false
                                ? null
                                : <i onClick={this.onClick} className="fa fa-sign-out fa-2x av-sign-out" aria-hidden="true"></i>}
                    </div>
                </div>
            </div>
        )
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
        setIsAuth: (data) => { dispatch(setIsAuth(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);