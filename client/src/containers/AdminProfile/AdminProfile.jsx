import React, { Component } from "react";
import axios from 'axios';

class AdminProfil extends Component {
    state = {userName: 'Alisher'}
    componentDidMount = () => {
        console.log(this.props)
        // axios.get('/api/users/')
    }
    render() {
        console.log(this.props)
        return(
            <section id="admin-profile">
                    <h1>{this.state.userName}</h1>
            </section>
        );
    }
};

export default AdminProfil;

