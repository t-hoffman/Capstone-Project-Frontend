import Footer from './Footer'
import Header from './Header'
import SearchBar from 'Components/NavBar/SearchBar'
import '../css/Layout.css'

const Layout = ({ children }) => {
  return (
    <>
    <div className="d-flex w-75 m-auto z1">
      <Header />
      <div className="middle-bar">
        {children}
      </div>
      <SearchBar />
    </div>
    <Footer />
    </>
  )
}

export default Layout
