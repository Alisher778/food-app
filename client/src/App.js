import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Nav.jsx';
import Home from './components/Home/Home.jsx'
import Secret from './components/Secret/Secret.jsx';
import AuthError from './components/Auth/AuthError';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            authUrls: [
                {url: '/sign-up', title: 'Sign Up'},
                {url: '/sign-in', title: 'Sign In'},
            ]
        }
    }

    render() {
        const authRoutes = () => {
            const {authenticated} = this.state;
            if(authenticated){
                return( 
                    <div>
                        <Route path="/about" exact component={Secret} />
                        <Route path="/contact" exact component={Secret} />
                    </div>
                )
            } else {
                return <Route path={window.location.pathname}  exact component={AuthError} />
            }
        }
        return (
            <div>
                <Navbar links={
                    [   {url: '/', title: 'Home'}, 
                        {url: '/about', title: 'About'}, 
                        {url: '/contact', title: 'Contact'}
                    ]} 
                    
                    authLinks = {this.state.authUrls}
                />
                    
                <main>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        {authRoutes()}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
