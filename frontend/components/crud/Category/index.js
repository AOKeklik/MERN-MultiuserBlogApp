import { Button, Form } from "react-bootstrap"
import HandleCategory from "./HandleCategory"
import ListCategories from "./ListCategories"

const Category = () => {
	const {
		values,
		setValues,
		handleChange,
		handleSubmit,
		isLoading,
		isError,
		success,
	} = HandleCategory()

	const Forms = () => (
		<Form>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Category Name</Form.Label>
				<Form.Control
					onChange={(e) => handleChange(e.target.value, "name")}
					value={values.name}
					type="text"
				/>
			</Form.Group>
			<Button onClick={handleSubmit} variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	)

	return (
		<>
			{isLoading()}
			{isError()}
			{success()}
			{Forms()}
			<div className="my-4">
				{<ListCategories values={values} setValues={setValues} />}
			</div>
		</>
	)
}

export default Category
