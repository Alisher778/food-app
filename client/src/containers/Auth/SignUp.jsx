import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import axios from 'axios';
import './Auth.css';
import chef from '../../assets/img/chef-green.png';

class SignUp extends Component{
    constructor() {
        super();
        this.state = {email: '', password: '', name: '', msg: '', msgType: ''}
    }

    nameHandler = (e) => {
        const name = e.target.value;
        this.setState({ name });
    }
    tokenHandler = (e) => {
        const token = e.target.value;
        this.setState({ token });
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
        axios.post('/api/restaurants/', this.state)
            .then(res => {
                const {userToken, userId, userName, isLogged} = res.data;
                    if(isLogged && userToken) {
                        window.localStorage.setItem('token', JSON.stringify(res.data.userToken))
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
                        this.props.signUp(this.state);
                        this.props.history.push('/')
                    } else {
                        this.setState({msg: res.data.msg, msgType: res.data.msgType});
                    }
                    
                
            })
            .catch(err => console.log(err))
    }
    render() {
        let errorMsg = [];
        if(Array.isArray(this.state.msg)) {
            this.state.msg.forEach((item,i) => errorMsg.push(<li key={i}>{item}</li>))
        } else {
            errorMsg = this.state.msg;
        }
        return(
            <section>
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
                        <div className={`alert-msg ${this.state.msgType}`}><p>{errorMsg}</p></div>
                        <h3>Sign Up</h3>
                        <div>
                            <FiUser />
                            <input 
                                type="text" 
                                name="name" 
                                value={this.state.name}
                                onChange={this.nameHandler}
                                placeholder="Restaurant Name"
                            />
                        </div>
                        <div>
                            <FiMail />
                            <input 
                                type="email" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.emailHandler}
                                placeholder="Your Email"
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
                        <button>Sign Up</button>
                        <div className="extra-auth-links">
                            Do you have an account already?<Link to="/sign-in">Sign In</Link>
                        </div>
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
        signUp: (data) => dispatch({type: 'SIGN_UP', data})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));