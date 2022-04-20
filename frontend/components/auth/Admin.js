import {useEffect} from 'react'
import Router from 'next/router'
import {isAuth} from '../../actions/authActions'

const Admin = ({children}) => {
    
    useEffect(() => {
        !isAuth() && Router.push('/signin')
        isAuth() && isAuth().user.role !== 1 && Router.push('/')
    },[])

    return <>
        {children}
    </>
}

export default Admin