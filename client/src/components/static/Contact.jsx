import React, { Component } from "react";
import axios from "axios";

class Contact extends Component {
	constructor() {
		super();
		this.state = { data: [] };
	}
	componentDidMount() {
		axios("/api/restaurants/all")
			.then(data => {
				console.log("data ", data);
				if (!data.data || data.data.msg) {
					console.log("If statement");
					this.setState({ data: [{ email: "You need To Login" }] });
				} else {
					this.setState({ data: data.data });
				}
			})
			.catch(err => err.message);
	}

	render() {
		console.log(this.state.data);
		return (
			<section id="contact-page">
				<h1>Contact</h1>
				<ul>
					{this.state.data.map((item, i) => {
						return <li key={i}>{item.email}</li>;
					})}
				</ul>
			</section>
		);
	}
}

export default Contact;
