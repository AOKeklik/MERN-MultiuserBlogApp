import { useState } from "react"
import Router from 'next/router'
import { authenticate, isAuth, signinAction } from "../../actions/authActions"

const HandleSignin = () => {
	const initialState = {
		email: '',
		password: '',
		loading: false,
		error: '',
		message: '',
		showForm: true,
	}
	const [values,setValues] = useState(initialState)
	const handleChange = name => e => setValues({...values, error: false, [name]: e.target.value})
	const handleSubmit = e => {
		e.preventDefault()
		setValues({...values, error: false, loading: true})

		const user = {email: values.email,password: values.password}
		signinAction (user).then(data => {
			if (data.error)
				setValues({...values, error: data.error, loading: false})
			else {
				setValues({
					...values,
					email: '',
					password: '',
					loading: false,
					error: '',
					message: data.message,
					showForm: false,
				})
				authenticate(data, () => {
					if (isAuth() && isAuth().user.role === 1)
						Router.push('/admin')
					else	
						Router.push('/user')
				})
			}
		})
	}
	const isError = () => values.error ? <div className="alert alert-warning">{values.error}</div> : ''
	const isMessage = () => values.message ? <div className="alert alert-success">{values.message}</div> : ''
	const isLoading = () => values.loading ? <div className="alert alert-info">Loading...</div> : ''

	return {
		values,
		handleChange,
		handleSubmit,
		showForm: values.showForm,
		isLoading,
		isMessage,
		isError,
	}
}

export default HandleSignin