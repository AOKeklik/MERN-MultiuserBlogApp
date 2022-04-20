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
                        <Nav.Item>
                            <Link href="/signin"><a className="nav-link text-white">Signin</a></Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href="/signup"><a className="nav-link text-white">Signup</a></Link>
                        </Nav.Item>
                    </>}
                    {checkAuth && (
                        <Nav.Item>
                            <Nav.Link onClick={() => signoutAction(() => Router.replace('/signin'))} className='text-white'>Signout</Nav.Link>
                        </Nav.Item>
                    )}
                    {checkAuth && checkAuth.user.role === 0 && (
                        <Nav.Item>
                            <Link href="/user"><a className="nav-link text-white"><span className='fw-bold'>{checkAuth.user.name}</span>'s Dashboard</a></Link>
                        </Nav.Item>
                    )}
                    {checkAuth && checkAuth.user.role === 1 && (
                        <Nav.Item>
                            <Link href="/admin"><a className="nav-link text-white"><span className='fw-bold'>{checkAuth.user.name}</span>'s Dashboard</a></Link>
                        </Nav.Item>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header