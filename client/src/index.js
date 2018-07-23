import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Nav from "./components/partials/Nav.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import "./assets/css/style.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route component={Nav} />
			<Route component={SignIn} path="/sign-in" />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
