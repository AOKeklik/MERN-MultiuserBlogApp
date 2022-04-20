import Router from 'next/router'
import {useEffect} from 'react'
import {isAuth} from '../../actions/authActions'

const Private = ({children}) => {

    useEffect(() => {
        if (!isAuth()) Router.push('/signin')
        else if (isAuth().user.role !== 0) Router.push('/')
    }, [])

    return <>
        {children}
    </>
} 

export default Private