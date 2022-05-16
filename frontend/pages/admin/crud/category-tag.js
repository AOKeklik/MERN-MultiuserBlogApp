import React from "react"
import { Col, Row } from "react-bootstrap"
import Admin from "../../../components/auth/Admin"
import Category from "../../../components/crud/Category/"
import Tag from "../../../components/crud/Tag/"

const CategoryTag = () => {
	return (
		<Admin>
			<Row>
				<Col sm="12" className="p-5 text-center">
					<h2>Manage Categories and Tags</h2>
				</Col>
			</Row>
			<Row>
				<Col md="6">
					<Col sm="12" className="text-center">
						<h4>Categories</h4>
					</Col>
					<Category />
				</Col>
				<Col md="6">
					<Col sm="12" className="text-center">
						<h4>Tags</h4>
					</Col>
					<Tag />
				</Col>
			</Row>
		</Admin>
	)
}

export default CategoryTag
