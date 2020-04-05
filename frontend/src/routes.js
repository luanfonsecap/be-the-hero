import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Logon from "./Pages/Logon";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import NewIncident from "./Pages/NewIncident";
import Edit from "./Pages/Edit";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon} />
				<Route path="/register" component={Register} />
				<Route path="/profile" component={Profile} />
				<Route path="/incidents/new" component={NewIncident} />
				<Route path="/edit/:id" component={Edit} />
			</Switch>
		</BrowserRouter>
	);
}
