import { API } from "../config"

export const createCategoryAction = (form, token) => {
	return fetch(`${API}/category`, {
		method: "post",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(form),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}

export const fetchCategoriesAction = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}

export const fetchCategoryAction = (slug) => {
	return fetch(`${API}/category/${slug}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}

export const removeCatogoryAction = (slug, token) => {
	return fetch(`${API}/category/${slug}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err))
}
