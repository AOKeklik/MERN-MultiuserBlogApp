import Router from "next/router"
import { useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { isAuth } from "../../actions/authActions"
import HandleSignup from './HandleSignup'

const SignupComponent = () => {
    const {
        values,
        handleChange,
        handleSubmit,
        showForm,
        isLoading,
        isError,
        isMessage,
    } = HandleSignup()
    
    useEffect (() => {
        isAuth() && Router.push('/')
    },[])

    const form = () => <Form>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                onChange={handleChange('name')}
                value={values.name}
                type="text"
            />
        </Form.Group>
    
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
        {isError()}
        {isMessage()}
        {showForm && form()}
    </>
}

export default SignupComponent