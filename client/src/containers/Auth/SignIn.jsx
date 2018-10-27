import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class SignIn extends Component{
    constructor() {
        super();
        this.state = {email: '', password: '', name: ''}
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
                        this.props.signIn(this.state);
                        this.props.history.push('/');
                    }
                
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <section>
                <div>
                    <form action="" onSubmit={this.formHandler}>
                        <div>
                            <input 
                                type="text" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.emailHandler}
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.passwordHandler}
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