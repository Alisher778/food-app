import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { FiMail, FiLock } from "react-icons/fi";
import axios from 'axios';
import chef from '../../assets/img/chef-green.png';
import '../../containers/Auth/Auth.css';

class ForgotPassword extends Component{
    constructor() {
        super();
        this.state = {email: '', password: '', name: '', msg: '', msgType: ''};
    }

    emailHandler = (e) => {
        const email = e.target.value;
        this.setState({ email });
    }
    
    formHandler = (e) => {
        e.preventDefault();
        axios.post('/api/restaurants/forgot-password', this.state)
            .then(res => {
                    console.log(res.data.msgType);

                   this.setState({msg: res.data.msg, msgType: res.data.msgType});  
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
                        <h3>Recovery Your Password</h3>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));