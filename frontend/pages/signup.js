import SignupComponent from '../components/auth/SignupComponent'

const signup = () => {
    return <>
        <h1 className='text-center p-4'>Signup</h1>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <SignupComponent />
            </div>
        </div>
    </>
}

export default signup