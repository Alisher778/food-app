import React, { Component } from "react";
import axios from 'axios';
import avatar from './chef.svg';

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
    fileHandler = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        
    }
    componentDidMount = () => {
        console.log(this.props)
        // axios.get('/api/users/')
    }
    inputHandler = (e) => {
        e.preventDefault();
        const {name, value}  = e.target;

        this.setState({[name]: value});

    }
    render() {
        console.log(this.state)
        return(
            <section id="admin-profile">
                <form>
                    <img src={avatar} alt="" id="admin-avatar"/>
                    <div className="">
                        <label htmlFor="restaurant name">Restaurant Name</label>
                        <input type="text" defaultValue={this.state.name} name="name" onChange={this.inputHandler}/>
                    </div>
                    <div className="">
                        <label htmlFor="restaurant email">Email</label>
                        <input type="email" defaultValue={this.state.email} name="email" onChange={this.inputHandler}/>
                    </div>
                    <div className="">
                        <label htmlFor="restaurant phone">Phone</label>
                        <input type="text" defaultValue={this.state.phone} name="phone" onChange={this.inputHandler}/>
                    </div>
                    <div className="">
                        <select name="type" value={this.state.type} onChange={this.inputHandler}>
                            <option value="Cafe">cafe</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Bar">Bar</option>
                            <option value="Choyxona">Choyxona</option>
                        </select>
                    </div>
                    <input type="file" onChange={this.fileHandler}/>
                    <div className="">
                        <textarea name="info" id="" cols="30" rows="10">{this.state.info}</textarea>
                    </div>
                    <hr/>
                    <h3>Admin Info</h3>
                    <div className="">
                        <label htmlFor="admin name">Admin Name</label>
                        <input type="text" defaultValue={this.state.admin_name} name="admin_name" onChange={this.inputHandler}/>
                    </div>
                    <div className="">
                        <label htmlFor="admin email">Admin Email</label>
                        <input type="text" defaultValue={this.state.admin_email} name="admin_email" onChange={this.inputHandler}/>
                    </div>
                    <div className="">
                        <label htmlFor="admin phone">Admin Phone</label>
                        <input type="text" defaultValue={this.state.admin_phone} name="admin_phone" onChange={this.inputHandler}/>
                    </div>
                    <div className="">
                        <label htmlFor="admin language">Admin Language</label>
                        <input type="text" defaultValue={this.state.admin_lang} name="admin_lang" onChange={this.inputHandler}/>
                    </div>
                    <button>Save</button>
                </form>
            </section>
        );
    }
};

export default AdminProfil;

