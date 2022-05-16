import { Form, Button } from "react-bootstrap"
import HandleCategory from "./HandleTag"
import ListTags from "./ListTags"

const Tag = () => {
	const {
		values,
		setValues,
		handleChange,
		handleSubmit,
		isLoading,
		isError,
		isSuccess,
	} = HandleCategory()
	const Forms = (
		<Form>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Tag Name</Form.Label>
				<Form.Control
					onChange={(e) => handleChange("name", e.target.value)}
					value={values.name}
					type="text"
				/>
			</Form.Group>
			<Form.Group>
				<Button onClick={handleSubmit} variant="primary" type="submit">
					Submit
				</Button>
			</Form.Group>
		</Form>
	)

	return (
		<>
			{isSuccess()}
			{isError()}
			{isLoading()}
			{Forms}
			<div className="my-4">
				<ListTags values={values} setValues={setValues} />
			</div>
		</>
	)
}

export default Tag
