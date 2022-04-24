import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/nprogress/nprogress.css'


function MyApp({ Component, pageProps }) {
    return <Layout>
      <Component {...pageProps} />
    </Layout>
  }
  
export default MyApp
  