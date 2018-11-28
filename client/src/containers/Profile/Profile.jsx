import React, { Component } from "react";
import axios from 'axios';

class UserProfil extends Component {
    componentDidMount = () => {
        console.log(this.props)
        // axios.get('/api/users/')
    }
    render() {
        return(
            <h1>Hello User</h1>
        );
    }
};

export default UserProfil;

