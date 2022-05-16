import Head from "next/head"
import { Row, Col } from "react-bootstrap"
import SigninComponent from "../components/auth/SigninComponent"

const signin = () => {
	return (
		<>
			<Head>
				<title>Signin</title>
			</Head>
			<h1 className="text-center p-4">Signin</h1>
			<Row>
				<Col className="col-md-6 offset-md-3">
					<SigninComponent />
				</Col>
			</Row>
		</>
	)
}

export default signin
