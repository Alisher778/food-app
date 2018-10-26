import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component{
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
                window.localStorage.setItem('token', JSON.stringify(res.data.userToken))
                console.log(res.data);
                console.log(window.localStorage.token)
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

export default SignIn;