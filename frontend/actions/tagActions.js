import { API } from "../config"

export const fetchTagsAction = () => {
	return fetch(`${API}/tags`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.catch((err) => console.error(err))
}

export const createTagAction = (name, token) => {
	return fetch(`${API}/tag`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(name),
	})
		.then((response) => response.json())
		.catch((err) => console.error(err))
}

export const removeTagAction = (slug, token) => {
	return fetch(`${API}/tag/${slug}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}
