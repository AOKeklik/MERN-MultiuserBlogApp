import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import jscookie from "js-cookie"
import { fetchTagsAction, removeTagAction } from "../../../actions/tagActions"

const ListTags = ({ values, setValues }) => {
	const [list, setList] = useState([])

	useEffect(() => {
		fetchTagsAction().then((data) => {
			setList(data)
		})
	}, [values.reload])

	return list.length > 0 ? (
		list.map((item) => (
			<ListTagsComp
				key={item._id}
				tag={item}
				values={values}
				setValues={setValues}
			/>
		))
	) : (
		<div className="alert alert-warning">No any tag yet!</div>
	)
}

const ListTagsComp = ({ tag, values, setValues }) => {
	const handleRemove = () => {
		if (confirm(`Are you sure you want to delete ${tag.name}!`)) {
			setValues({
				...values,
				error: "",
				success: "",
				reload: false,
				loading: true,
			})
			const slug = tag.slug
			const token = jscookie.get("token")
			removeTagAction(slug, token).then((data) => {
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
						success: `${data.name} is deleted successfully!`,
						reload: true,
						loading: false,
					})
			})
		}
	}
	return (
		<Button
			onDoubleClick={handleRemove}
			className="m-1"
			variant="outline-primary"
		>
			{tag.name}
		</Button>
	)
}

export default ListTags
