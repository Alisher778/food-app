import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/partials/Nav.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
// Static Pages
import Contact from "./components/static/Contact.jsx";
import ErrorPage from "./components/static/ErrorPage.jsx";
import HomePage from "./components/static/HomePage.jsx";
import "./assets/css/style.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Nav />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/contact" component={Contact} />
				<Route path="/sign-in" component={SignIn} />
				<Route path="/sign-up" component={SignUp} />
				<Route component={ErrorPage} />
			</Switch>
		</div>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
