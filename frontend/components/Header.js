import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { isAuth, signoutAction } from '../actions/authActions'
import { APP_NAME } from '../config'

const Header = () => {
    const [checkAuth,setCheckAuth] = useState()

    useEffect(() => {
        setCheckAuth(isAuth())
    },[isAuth()])

    return <Navbar bg="success" expand="lg" className='bg-gradient'>
        <Container>
            <Link href="/"><Navbar.Brand role="button" className='text-white fw-bold'>{APP_NAME}</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {!checkAuth && <>
                        <Link href="/signin"><Nav.Link as="span" role="button" className='text-white'>Signin</Nav.Link></Link>
                        <Link href="/signup"><Nav.Link as="span" role="button" className='text-white'>Signup</Nav.Link></Link>
                    </>}
                    {checkAuth && (
                        <Nav.Link onClick={() => signoutAction(() => Router.replace('/signin'))}>Signout</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header