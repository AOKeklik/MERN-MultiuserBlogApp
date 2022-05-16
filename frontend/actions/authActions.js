import jscookie from "js-cookie"
import { API } from "../config"

/* signup */
export const signupAction = (user) => {
	return fetch(`${API}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}

/* signin */
export const signinAction = (user) => {
	return fetch(`${API}/auth/signin`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}

/* signout */
export const signoutAction = (next) => {
	localStorage.removeItem("user")
	jscookie.remove("token")
	next()

	return fetch(`${API}/auth/signout`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}

/* authenticate */
export const authenticate = (data, next) => {
	jscookie.set("token", data.token, {
		sameSite: "strict",
		expires: 1,
		path: "/",
	})
	localStorage.setItem("user", JSON.stringify(data))
	next()
}

/* isauth */
export const isAuth = () => {
	if (jscookie.get("token")) {
		if (localStorage.getItem("user"))
			return JSON.parse(localStorage.getItem("user"))
	} else return false
}
