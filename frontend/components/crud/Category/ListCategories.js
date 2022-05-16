import {
	fetchCategoriesAction,
	removeCatogoryAction,
} from "../../../actions/categoryActions"
import { useEffect, useState } from "react"
import jscookie from "js-cookie"
import { Button } from "react-bootstrap"

const ListCategories = ({ values, setValues }) => {
	const [categories, setCategories] = useState([])

	const handleDoubleClick = (slug) => {
		const query = window.confirm(
			"Are you sure you want to delete this category?"
		)
		if (query) {
			setValues({
				...values,
				error: "",
				success: "",
				reload: false,
				loading: true,
			})

			const token = jscookie.get("token")
			removeCatogoryAction(slug, token).then((data) => {
				if (data.error)
					setValues({
						...values,
						error: data.error,
						success: "",
						reload: false,
						loading: false,
					})
				else
					setValues({
						...values,
						error: "",
						// reload: !values.reload,
						reload: true,
						success: data.message,
						loading: false,
					})
			})
		}
	}

	useEffect(() => {
		fetchCategoriesAction().then((data) => setCategories(data))
	}, [values.reload, values.removed])

	// console.log(categories)

	return categories?.length ? (
		categories.map((category, n) => (
			<CategoriesComp
				key={category._id}
				category={category}
				handleDoubleClick={handleDoubleClick}
			/>
		))
	) : (
		<div className="alert alert-warning">No any Category yet!</div>
	)
}

const CategoriesComp = ({ category, handleDoubleClick }) => {
	return (
		<>
			<Button
				onDoubleClick={() => handleDoubleClick(category.slug)}
				className="m-1"
				variant="outline-primary"
			>
				{category.name}
			</Button>
		</>
	)
}

export default ListCategories
