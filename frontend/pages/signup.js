import { 
    Row,
    Col
} from 'react-bootstrap'
import SignupComponent from '../components/auth/SignupComponent'

const signup = () => {
    return <>
        <h1 className='text-center p-4'>Signup</h1>
        <Row>
            <Col className="col-md-6 offset-md-3">
                <SignupComponent />
            </Col>
        </Row>
    </>
}

export default signup