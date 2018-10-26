import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class SignUp extends Component{
    constructor() {
        super();
        this.state = {email: '', password: '', name: ''}
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
                    if(isLogged) {
                        window.localStorage.setItem('token', JSON.stringify(res.data.userToken))
                        this.setState({
                            authenticated: isLogged,
                            isLogged: isLogged,
                            userToken,
                            userId,
                            userName,
                            authUrls: [
                                {url: '/log-out', title: 'Log Out', logOutHandler: this.logOutHandler},
                                {url: '/profile', title: 'My Profile'}
                            ]
                        });
                        this.props.signUp(this.state);
                    }
                
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state)
        return(
            <section>
                <div>
                    <form action="" onSubmit={this.formHandler}>
                        <div>
                            <input 
                                type="text" 
                                name="name" 
                                value={this.state.name}
                                onChange={this.nameHandler}
                            />
                        </div>
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
                        <button>Sign Up</button>
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