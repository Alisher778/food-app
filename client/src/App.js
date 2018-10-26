import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import Navbar from './components/Navbar/Nav.jsx';
import Home from './components/Home/Home.jsx'
import Secret from './components/Secret/Secret.jsx';
import Contact from './components/Contact/Contact.jsx';
// ***********  AUTH Components ****************** //
import AuthError from './components/Auth/AuthError.jsx';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            userToken:     null,
            isLogged:      null,
            userName:      null,
            userId:        null,
            authUrls: [
                {url: '/sign-up', title: 'Sign Up'},
                {url: '/sign-in', title: 'Sign In'},
            ]
        }
    }

    logOutHandler = (e) => {
        e.preventDefault();
        axios.post('/api/restaurants/logout', {userId: this.state.userId})
            .then(res => {
                window.localStorage.removeItem('token');
                window.location.href = '/'
            })
            .catch(err => console.log(err))
        
    }
    componentDidMount() {
        const userToken = window.localStorage.token;

        if(userToken && userToken !== '') {
            axios.post('/api/restaurants/verify-token', {token: JSON.parse(localStorage.token)})
                .then(res => {
                    const {userToken, userId, userName, isLogged} = res.data;
                    if(isLogged) {
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
                        this.props.verifyToken(this.state);
                    }
                    
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        console.log(this.props.authState)
        console.log("{USER}---",this.props.authState.userName)
        const authRoutes = () => {
            const {authenticated} = this.props.authState;
            if(authenticated){
                return( 
                    <Switch>
                        <Route path="/about" exact component={Secret} />
                        <Route path="/contact" exact component={Contact} />
                    </Switch>
                );
            } else {
                return <Route path={window.location.pathname}  exact component={AuthError} />
            }
        }
        return (
            <div>
                <Navbar 
                    staticLinks={[{url: '/', title: 'Home'}, {url: '/about', title: 'About'}, {url: '/contact', title: 'Contact'}]} 
                    authLinks = {this.props.authState.authLinks}
                />
                    
                <main>
                    <h1>{this.props.authState.userName}</h1>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/sign-in" exact component={SignIn} />
                        <Route path="/sign-up" exact component={SignUp} />
                        {authRoutes()}
                    </Switch>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authState: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyToken: (data) => dispatch({type: 'VERIFY_TOKEN', data})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
