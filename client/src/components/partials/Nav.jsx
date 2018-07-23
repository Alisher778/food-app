import React, { Component } from "react";

class Nav extends Component {
	render() {
		return (
			<header>
				<nav>
					<div id="logo">
						<h1>Eatify</h1>
					</div>
					<div id="nav-links">
						<a href="#" className="nav-link">
							Home
						</a>
						<a href="#" className="nav-link">
							Services
						</a>
						<a href="#" className="nav-link">
							Features
						</a>
						<a href="#" className="nav-link">
							Contact
						</a>
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
