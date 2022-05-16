import Admin from "../../components/auth/Admin"
import { Col, ListGroup, Row } from "react-bootstrap"
import Link from "next/link"

const AdminIndex = () => {
	return (
		<Admin>
			<Row>
				<Col className="p-5 text-center">
					<h1>Admin Dasboard</h1>
				</Col>
			</Row>
			<Row>
				<Col md="4">
					<ListGroup>
						<ListGroup.Item className="text-decoration-none fw-bold" active>
							Actions
						</ListGroup.Item>
						<ListGroup.Item action>
							<Link href="/admin/crud/category-tag">
								<a className="text-decoration-none text-success fw-bold">
									Create Ctategory
								</a>
							</Link>
						</ListGroup.Item>
						<ListGroup.Item action>
							<Link href="/admin/crud/category-tag">
								<a className="text-decoration-none text-success fw-bold">
									Create Tag
								</a>
							</Link>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md="8"></Col>
			</Row>
		</Admin>
	)
}

export default AdminIndex
