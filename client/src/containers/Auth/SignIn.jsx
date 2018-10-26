import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component{
    constructor() {
        super();
        this.state = {email: '', password: ''}
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
            .then(res => console.log(res.data))
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

export default SignIn;