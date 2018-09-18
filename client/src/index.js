import React from "react";
import ReactDOM from "react-dom";
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./App";

// *************  Others  *************************
import "./assets/css/style.css";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<App />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
