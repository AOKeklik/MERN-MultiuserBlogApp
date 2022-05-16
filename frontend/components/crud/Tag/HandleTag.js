import { useState } from "react"
import jscookie from "js-cookie"
import { createTagAction } from "../../../actions/tagActions"

const HandleTag = (props, ref) => {
	const initialState = {
		name: "",
		error: "",
		success: "",
		reload: false,
		loading: false,
	}
	const [values, setValues] = useState(initialState)
	const handleChange = (name, value) =>
		setValues({
			...values,
			[name]: value,
			error: "",
			success: "",
		})
	const handleSubmit = (e) => {
		e.preventDefault()

		setValues({
			...values,
			loading: true,
			reload: false,
			error: "",
			success: "",
		})

		const name = { name: values.name }
		const token = jscookie.get("token")

		createTagAction(name, token).then((data) => {
			if (data.error)
				setValues({
					...values,
					loading: false,
					reload: false,
					error: data.error,
					success: "",
					name: "",
				})
			else
				setValues({
					...values,
					loading: false,
					reload: true,
					error: "",
					success: `${data.name} is created successfully..`,
					name: "",
				})
		})
	}
	const isSuccess = () =>
		values.success ? (
			<div className="alert alert-success">{values.success}</div>
		) : (
			""
		)

	const isError = () =>
		values.error ? (
			<div className="alert alert-warning">{values.error}</div>
		) : (
			""
		)

	const isLoading = () =>
		values.loading ? <div className="alert alert-info">Loading...</div> : ""

	return {
		values,
		setValues,
		handleChange,
		handleSubmit,
		isLoading,
		isSuccess,
		isError,
	}
}

export default HandleTag
