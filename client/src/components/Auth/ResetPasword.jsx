import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { FiMail, FiLock, FiClock } from "react-icons/fi";
import axios from 'axios';
import chef from '../../assets/img/chef-green.png';
import '../../containers/Auth/Auth.css';

class ResetPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {password: '', msg: '', msgType: '', status: false, redirectTime: 100000, timer: 10};
    }

    componentDidMount = () => {
        const {email, token} = this.props.match.params;
        axios.post('/api/restaurants/verify-password-reset', {email, token})
            .then(res => {
                const {status, msg, msgType} = res.data;
                this.setState({status, msg, msgType});
            }).catch(err => console.log(err));
    }
    emailHandler = (e) => {
        const email = e.target.value;
        this.setState({ email });
    }
    emailHandler = (e) => {
        const email = e.target.value;
        this.setState({ email });
    }
    
    formHandler = (e) => {
        e.preventDefault();
        axios.post('/api/restaurants/forgot-password', this.state)
            .then(res => {
                   this.setState({msg: res.data.msg, msgType: res.data.msgType});  
            })
            .catch(err => console.log(err))
    }
    redirectNow = () => {
        setTimeout(() => {
            this.props.history.push('/');
        },this.state.redirectTime);
    }

    render() {
        console.log(this.state.status, this.state);
        let resetPasswordUI = '';
        if(this.state.status){
            return resetPasswordUI = (<section id="sign-in-sec">
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
                                <FiLock />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.passwordHandler}
                                    placeholder="New Password"
                                />
                            </div>
                            <div>
                                <FiLock />
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={this.state.confirmPassword}
                                    onChange={this.confirmPasswordHandler}
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <button>Sign In</button>
                        </form>
                    </div>
                </section>)
        } else {
           return resetPasswordUI =  (<section id="sign-in-sec">
                    <div className="sec-container">
                        <div className="col-left">
                        <div className={`alert-msg ${this.state.msgType}`}><h3>{this.state.msg}</h3></div>
                            <img src={chef} alt=""/>
                            <h3>{this.state.status}</h3>
                            <p>You will be redirected to the main page in 10's</p>
                            {this.redirectNow()}
                            <p><strong><em>Foodify Team</em></strong></p>
                        </div>
                    </div>
                </section>)
        }
        return resetPasswordUI;
    }
}

export default ResetPassword;