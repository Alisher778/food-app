import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignIn from "../auth/SignIn.jsx";

class Nav extends Component {
	render() {
		return (
			<header>
				<nav>
					<div id="logo">
						<h1>Eatify</h1>
					</div>
					<div id="nav-links">
						<Link href="#" className="nav-link">
							Home
						</Link>
						<Link href="#" className="nav-link">
							Services
						</Link>
						<Link href="#" className="nav-link">
							Features
						</Link>
						<Link href="#" className="nav-link">
							Contact
						</Link>
					</div>
					<div id="auth-link">
						<button id="sign-in">Sign In</button>
						<button id="sign-up">Sign Up</button>
					</div>
				</nav>
			</header>
		);
	}
}

export default Nav;
