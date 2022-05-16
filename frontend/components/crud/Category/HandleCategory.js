import { useState } from "react"
import jscookie from "js-cookie"
import { createCategoryAction } from "../../../actions/categoryActions"

const HandleCategory = () => {
	const initialState = {
		name: "",
		loading: false,
		error: "",
		success: "",
		reload: false,
	}
	const [values, setValues] = useState(initialState)
	const handleChange = (value, name) =>
		setValues({
			...values,
			[name]: value,
			error: "",
			success: "",
			reload: false,
		})
	const token = jscookie.get("token")
	const handleSubmit = (e) => {
		e.preventDefault()
		setValues({
			...values,
			error: "",
			success: "",
			reload: false,
			loading: true,
		})

		const name = { name: values.name }

		createCategoryAction(name, token).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					success: "",
					reload: false,
					loading: false,
				})
			} else
				setValues({
					...values,
					name: "",
					error: "",
					success: data.message,
					reload: true,
					loading: false,
				})
		})
	}

	const isLoading = () =>
		values.loading ? <div className="alert alert-info">Loading..</div> : ""
	const isError = () =>
		values.error ? (
			<div className="alert alert-warning">{values.error}</div>
		) : (
			""
		)
	const success = () =>
		values.success ? (
			<div className="alert alert-success">{values.success}</div>
		) : (
			""
		)

	return {
		values,
		setValues,
		handleChange,
		handleSubmit,
		isLoading,
		isError,
		success,
	}
}

export default HandleCategory
