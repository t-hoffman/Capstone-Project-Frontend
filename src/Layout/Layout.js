import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import '../css/Layout.css'
import SearchBar from 'Components/NavBar/SearchBar'
import { SettingsForm, SettingsRightBar } from 'Pages'
import { AuthContext } from 'Components/UserAuth/AuthContext'

const Layout = ({ children }) => {
  const { location } = useContext(AuthContext)
  
  return (
    <>
      <div className="d-flex w-75 m-auto z1">
        <Header />
        <div className={`middle-bar ${location[1] === 'settings' && 'settings-middle-bar'}`}>
          {children}
        </div>
        <div className={`right-bar ${location[1] === 'settings' && 'settings-right-bar'}`}>
          {location[1] !== 'settings' && <SearchBar />}
          <Routes>
            <Route path="/settings">
              <Route index element={<SettingsRightBar />} />
              <Route path="/settings/username" element={<SettingsForm type="username" />} />
              <Route path="/settings/name" element={<SettingsForm type="name" />} />
              <Route path="/settings/email" element={<SettingsForm type="email" />} />
              <Route path="/settings/password" element={<SettingsForm type="password" />} />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout