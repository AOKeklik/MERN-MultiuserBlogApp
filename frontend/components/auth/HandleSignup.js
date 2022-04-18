import { useState } from "react"
import { signupAction } from "../../actions/authActions"

const HandleSignup = () => {
    const initialState = {
        name: '',
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

        const user = {name: values.name,email: values.email,password: values.password}
        signupAction (user).then (data => {
            if (data.error)
                setValues({...values, error: data.error, loading: false})
            else    
            setValues({
                ...values, 
                name: '',
                email: '',
                password: '',
                loading: false,
                error: '',
                message: data.message,
                showForm: false,
            })
        })
    }
    const isLoading = () =>  values.loading ? <div className="alert alert-info">Loading..</div> : ''
    const isError = () => values.error ? <div className="alert alert-warning">{values.error}</div> : ''
    const isMessage = () => values.message ? <div className="alert alert-success">{values.message}</div> : ''

    // console.log(values)

    return {
        values,
        handleChange,
        handleSubmit,
        showForm: values.showForm,
        isLoading,
        isError,
        isMessage,
    }
}

export default HandleSignup