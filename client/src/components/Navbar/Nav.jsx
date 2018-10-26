import React, { Component } from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
	
	const {staticLinks, authLinks, logOutHandler} = props;
	console.log(props.authLinks)
	// Render Static Navbar links
	const navItem = staticLinks.map((item, i) => {
		return <Link to={item.url} key={i} className="nav-link">{item.title}</Link>
	});
	// Render Auth links
	const authItem = authLinks.map((item, i) => {
		return <Link to={item.url} id={item.url.slice(1)+'-btn'} key={i} onClick={item.logOutHandler}>{item.title}</Link>
	})

	return (
		<header>
			<nav>
				<div id="logo"><h1>Eatify</h1></div>
				<div id="nav-links">
					{navItem}
				</div>
				<div id="auth-link">
					{authItem}
				</div>
			</nav>
		</header>
	);
}


export default Nav;
