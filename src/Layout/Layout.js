import Footer from './Footer'
import Header from './Header'
import '../css/Layout.css'

const Layout = ({ children }) => {
  return (
    <div style={{width:'100%'}}>
      <Header />
        {children}
      <Footer />
    </div>
  )
}

export default Layout
