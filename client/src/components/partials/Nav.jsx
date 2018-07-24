import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
	render() {
		return (
			<header>
				<nav>
					<div id="logo">
						<h1>Eatify</h1>
					</div>
					<div id="nav-links">
						<Link to="/" className="nav-link">
							Home
						</Link>
						<Link to="/services" className="nav-link">
							Services
						</Link>
						<Link to="/features" className="nav-link">
							Features
						</Link>
						<Link to="/contact" className="nav-link">
							Contact
						</Link>
					</div>
					<div id="auth-link">
						<Link to="/sign-in" id="sign-in-btn">
							Sign In
						</Link>
						<Link to="/sign-up" id="sign-up-btn">
							Sign Up
						</Link>
					</div>
				</nav>
			</header>
		);
	}
}

export default Nav;
