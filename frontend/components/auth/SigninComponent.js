import {useRouter} from 'next/router'
import { useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import { isAuth } from '../../actions/authActions'
import HandleSignin from './HandleSignin'

const SigninComponent = () => {
	const router = useRouter()

	const {
		values,
		handleChange,
		handleSubmit,
		showForm, 
		isLoading,
		isMessage,
		isError,
	} = HandleSignin()

	useEffect(() => {
		isAuth() && router.push('/')
	},[])

	const form = () => <Form>
		<Form.Group className="mb-3" controlId="email">
			<Form.Label>Email</Form.Label>
			<Form.Control
				onChange={handleChange('email')}
				value={values.email}
				type="text"
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="password">
			<Form.Label>Password</Form.Label>
			<Form.Control 
				onChange={handleChange('password')}
				value={values.password}
				type="text"
			/>
		</Form.Group>
		<Button 
			onClick={handleSubmit}
			variant="primary" 
			type="submit"
		>Submit</Button>
	</Form>

	return <>
		{isLoading()}
		{isMessage()}
		{isError()}
		{showForm && form()}
	</>
}

export default SigninComponent