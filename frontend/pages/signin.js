import SigninComponent from '../components/auth/SigninComponent'


const signin = () => {
    return <>
        <h1 className="text-center p-4">Signin</h1>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <SigninComponent />
            </div>
        </div>
    </>
}

export default signin