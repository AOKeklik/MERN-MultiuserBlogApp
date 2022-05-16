import "bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/nprogress/nprogress.css"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
