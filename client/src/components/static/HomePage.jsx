import React, { Component } from "react";

class Home extends Component {
	componentDidMount() {
		const apiKey = "50c879ece92f2dfd0e0742a6d55e90b4";
		fetch(
			`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=50c879ece92f2dfd0e0742a6d55e90b4`
		)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
	}
	render() {
		return (
			<section id="home-page">
				<h1>Home Page</h1>
			</section>
		);
	}
}

export default Home;
