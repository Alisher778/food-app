import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { FiMail, FiLock } from "react-icons/fi";
import axios from 'axios';
import chef from '../../assets/img/chef-green.png';
import './Auth.css';

class SignIn extends Component{
    constructor() {
        super();
        this.state = {email: '', password: '', name: '', msg: '', msgType: ''};
    }

    emailHandler = (e) => {
        const email = e.target.value;
        this.setState({ email });
    }
    passwordHandler = (e) => {
        const password = e.target.value;
        this.setState({ password });
    }
    formHandler = (e) => {
        e.preventDefault();
        axios.post('/api/restaurants/login', this.state)
            .then(res => {
                const {userToken, userId, userName, isLogged} = res.data;
                    if(isLogged && userToken) {
                        window.localStorage.setItem('token', JSON.stringify(res.data.userToken));
                        this.setState({
                            authenticated: isLogged,
                            isLogged: isLogged,
                            userToken,
                            userId,
                            userName,
                            authUrls: [
                                {url: '/log-out', title: 'Log Out', logOutHandler: this.logOutHandler, btnId: 'log-out-btn'},
                                {url: '/profile', title: 'My Profile', btnId: 'user-profile-btn'}
                            ]
                        });
                        this.props.signIn(this.state);
                        this.props.history.push('/');
                    } else {
                        this.setState({msg: res.data.msg, msgType: 'danger'});
                    }
                
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <section id="sign-in-sec">
                <div className="sec-container">
                    <div className="col-left">
                        <img src={chef} alt=""/>
                        <h3>Do you love cooking?</h3>
                        <p>
                        If you want to become a great chef, you have to work with great chefs. And that's exactly what I did.
                        </p>
                        <p><strong><em>Gordon Ramsay</em></strong></p>
                    </div>
                    <form action="" onSubmit={this.formHandler} id="sign-in-form">
                        <div className={`alert-msg ${this.state.msgType}`}><p>{this.state.msg}</p></div>
                        <h3>Sign In</h3>
                        <div>
                            <FiMail />
                            <input 
                                type="email" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.emailHandler}
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <FiLock />
                            <input 
                                type="password" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.passwordHandler}
                                placeholder="Password"
                            />
                        </div>
                        <button>Sign In</button>
                    </form>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        authState: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (data) => dispatch({type: 'SIGN_IN', data})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));