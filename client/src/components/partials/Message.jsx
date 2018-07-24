import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = { msg: [] };
	}

	msgFilter() {
		const msg = this.props.message.split(",");

		msg.map((str, i) => {
			let text = str.slice(str.indexOf("%") + 1);
			console.log(text);
			return this.setState({ msg: [...this.state.msg, text] });
		});
	}
	render() {
		console.log(this.state.msg);
		return (
			<div id="error-msg">
				{this.state.msg.map(item => <b>{item ? "hey" : "ba"}</b>)}
			</div>
		);
	}
}

export default Nav;
