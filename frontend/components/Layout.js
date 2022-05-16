import { Container } from "react-bootstrap"
import Header from "../components/Header"

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<Container>
				<main>{children}</main>
			</Container>
		</>
	)
}

export default Layout
