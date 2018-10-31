import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {
	constructor() {
		super();
		this.state = {}
	}

	logOutHandler = (e) => {
        e.preventDefault();
        console.log('clicked')
        axios.post('/api/restaurants/logout', {userId: this.props.authState.userId})
            .then(res => {
                window.localStorage.removeItem('token');
                window.location.href = '/'
            })
            .catch(err => console.log(err))
        
	}
	
	// Navbar toggle effect
	navBarHandler = () => {
		const dropDownMenu = document.getElementById('main-links');
		dropDownMenu.className = dropDownMenu.className?'':"mobile";
	}

	// navBarItemHandler = (e) => {
	// 	const dropDownMenu = document.getElementById('main-links');
	// 	dropDownMenu.className = dropDownMenu.className?'':"mobile";
	// }
	render() {

		const {staticLinks, authLinks, logOutHandler} = this.props;
		// Render Static Navbar links
		const navItem = staticLinks.map((item, i) => {
			return <Link to={item.url} key={i} className="nav-link">{item.title}</Link>
		});
		// Render Auth links
		const authItem = authLinks.map((item, i) => {
			if(item.url === '/log-out'){
				return <Link to={item.url} id={item.btnId} key={i} onClick={this.logOutHandler}>{item.title}</Link>

			} else {
				return <Link to={item.url} id={item.btnId} key={i} >{item.title}</Link>
			}
		})

		return (
			<header>
				<nav>
					<div id="logo"><Link to="/"><h1>Eatify</h1></Link></div>
					<div id="bars" onClick={this.navBarHandler}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div id="main-links" onClick={this.navBarHandler}>
						<div id="nav-links">
							{navItem}
						</div>
						<div id="auth-links">
							{authItem}
						</div>
					</div>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = state => {
    return {
        authState: state.authReducer
    }
}

export default withRouter(connect(mapStateToProps)(Nav));
