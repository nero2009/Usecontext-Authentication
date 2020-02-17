export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(loginPayload)
	};
	dispatch({ type: "REQUEST_LOGIN" });
	return fetch(
		"https://secret-hamlet-03431.herokuapp.com/login",
		requestOptions
	)
		.then(response => {
			return response.json();
		})
		.then(res => {
			console.log(res);
			dispatch({ type: "LOGIN_SUCCESS", payload: res });
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem("currentUser", JSON.stringify(res));
			return res;
		})
		.catch(e => {
			dispatch({ type: "LOGIN_ERROR", error: e });
			console.log(e);
		});
}

export async function logout(dispatch) {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentUser");
	localStorage.removeItem("token");
}
