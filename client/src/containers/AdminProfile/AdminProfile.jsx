import React, { Component } from "react";
import axios from 'axios';

class AdminProfil extends Component {
    state = {
        name: 'My restaurant',
        info: 'Cozy and finest',
        location: 'hello man',
        type: "Restaurant",
        email: "admin@gmail.com",
        phone: '+998 99 555 88 77',
        password: 'alisher',
        admin_name: 'Admin Name',
        admin_email: 'Admin Email',
        admin_avatar: 'IMg Url',
        admin_phone: 'Admin cell',
        admin_lang: 'En, Ru, Uz',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    componentDidMount = () => {
        console.log(this.props)
        // axios.get('/api/users/')
    }
    render() {
        console.log(this.props)
        return(
            <section id="admin-profile">
                <form>
                    <div className="">
                        <label htmlFor="restaurant name">Restaurant Name</label>
                        <input type="text" defaultValue={this.state.name} name="name"/>
                    </div>
                    <div className="">
                        <label htmlFor="restaurant email">Email</label>
                        <input type="email" defaultValue={this.state.email} name="email"/>
                    </div>
                    <div className="">
                        <label htmlFor="restaurant phone">Phone</label>
                        <input type="text" defaultValue={this.state.phone} name="phone"/>
                    </div>
                    <div className="">
                        <select name="type">
                            <option value="Restaurant">Restaurant</option>
                            <option value="Cafe">cafe</option>
                            <option value="Bar">Bar</option>
                            <option value="Choyxona">Choyxona</option>
                        </select>
                    </div>
                    <div className="">
                        <textarea name="info" id="" cols="30" rows="10">{this.state.info}</textarea>
                    </div>
                </form>
            </section>
        );
    }
};

export default AdminProfil;

