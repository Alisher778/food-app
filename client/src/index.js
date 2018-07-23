import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Nav from "./components/partials/Nav.jsx";
import "./assets/css/style.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<div>
		<Nav />
	</div>,
	document.getElementById("root")
);
registerServiceWorker();
