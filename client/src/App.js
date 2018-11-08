import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

// ***********  Pages ****************** //
import Home from './components/Home/Home.jsx'
import Secret from './components/Secret/Secret.jsx';
import Contact from './components/Contact/Contact.jsx';

// ***********  AUTH Components ****************** //
import AuthError from './components/Auth/AuthError.jsx';
import ForgotPassword from './components/Auth/ForgotPassword';
// ***********  AUTH Containers ****************** //
import Navbar from './containers/Navbar/Nav.jsx';
import ResetPassword from './components/Auth/ResetPasword.jsx';
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
                {url: '/sign-up', title: 'Sign Up', btnId: 'sign-up-btn'},
                {url: '/sign-in', title: 'Sign In', btnId: 'sign-in-btn'},
            ]
        }
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
                                {url: '/log-out', title: 'Log Out', logOutHandler: this.logOutHandler, btnId: 'log-out-btn'},
                                {url: '/profile', title: 'My Profile', btnId: 'user-profile-btn'}
                            ]
                        });
                        this.props.verifyToken(this.state);
                    }
                    
                })
                .catch(err => console.log(err));
        }
    }

    render() {
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
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/sign-in" exact component={SignIn} />
                        <Route path="/sign-up" exact component={SignUp} />
                        <Route path="/forgot-password" exact component={ForgotPassword} />
                        <Route path="/reset-password/*" exact component={ResetPassword} />
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
