import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
// **************  AUTH Components **********************
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import App from "./App";
// *************  Static Pages  *************************
import Nav from "./components/partials/Nav.jsx";
import Contact from "./components/static/Contact.jsx";
import ErrorPage from "./components/static/ErrorPage.jsx";
import HomePage from "./components/static/HomePage.jsx";
// *************  Others  *************************
import "./assets/css/style.css";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducers";

const store = createStore(reducers);
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/contact" component={Contact} />
					<Route path="/sign-in" component={SignIn} />
					<Route path="/sign-up" component={SignUp} />
					<Route component={ErrorPage} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
