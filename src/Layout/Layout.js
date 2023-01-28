import React from 'react'
import Footer from './Footer'
import Header from './Header'
import '../css/Layout.css'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  )
}

export default Layout
