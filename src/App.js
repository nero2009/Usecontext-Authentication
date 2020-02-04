import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from "react-router-dom";

import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import { AuthProvider } from "./Context";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<PrivateRoute
						path="/dashboard"
						render={props => <Dashboard {...props} />}
					/>
					<PrivateRoute
						path="/*"
						render={props => (
							<div {...props}>
								<h3>Page not found</h3>
							</div>
						)}
					></PrivateRoute>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
