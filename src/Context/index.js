import React, { useState, useReducer } from "react";
import { handleResponse } from "../server/handle-response";

let user = localStorage.getItem("currentUser")
	? JSON.parse(localStorage.getItem("currentUser")).userDetails
	: "";
let token = localStorage.getItem("currentUser")
	? JSON.parse(localStorage.getItem("currentUser")).token
	: "";

const initialState = {
	user: "" || user,
	token: "" || token,
	loading: false,
	errorMessage: null
};

// const AuthContext = React.createContext();
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case "REQUEST_LOGIN":
			return {
				...initialState,
				loading: true
			};
		case "LOGIN_SUCCESS":
			return {
				...initialState,
				user: action.payload.userDetails,
				token: action.payload.token,
				loading: false
			};
		case "LOGOUT":
			return {
				...initialState,
				user: "",
				token: ""
			};

		case "LOGIN_ERROR":
			return {
				...initialState,
				loading: false,
				errorMessage: action.error
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};

function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error("useAuthState must be used within a AuthProvider");
	}

	return context;
}

function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error("useAuthDispatch must be used within a AuthProvider");
	}

	return context;
}

async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(loginPayload)
	};
	dispatch({ type: "REQUEST_LOGIN" });
	return fetch(`/users/authenticate`, requestOptions)
		.then(handleResponse)
		.then(user => {
			console.log(user);
			dispatch({ type: "LOGIN_SUCCESS", payload: user });
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem("currentUser", JSON.stringify(user));
			return user;
		})
		.catch(e => {
			dispatch({ type: "LOGIN_ERROR", error: e });
			console.log(e);
		});
}

async function logout(dispatch) {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentUser");
	localStorage.removeItem("token");
}

export { AuthProvider, useAuthState, useAuthDispatch, loginUser, logout };
