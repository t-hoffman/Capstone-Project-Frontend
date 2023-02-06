import React, { useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import '../css/Layout.css'
import SearchBar from 'Components/NavBar/SearchBar'
import { SettingsForm, SettingsRightBar } from 'Pages'
import { AuthContext } from 'Components/UserAuth/AuthContext'
import ShowMessages from 'Components/Messages/ShowMessages'

const Layout = ({ children }) => {
  const { location } = useContext(AuthContext)
  const optionalStyling = ['settings', 'messages']
                          .includes(location[1])
  const middleStyle = optionalStyling && 'settings-middle-bar',
        rightStyle = optionalStyling && 'settings-right-bar'

  return (
    <>
      <div className="main-container">
        <Header />
        <div className="right-side">
          <div className={`middle-bar ${middleStyle}`}>
            {children}
          </div>
          <div className={`right-bar ${rightStyle}`}>
            {!optionalStyling && <SearchBar />}
            <Routes>
              <Route path="/settings">
                <Route index element={<SettingsRightBar />} />
                <Route path="username" element={<SettingsForm type="username" />} />
                <Route path="name" element={<SettingsForm type="name" />} />
                <Route path="email" element={<SettingsForm type="email" />} />
                <Route path="image" element={<SettingsForm type="image" />} />
                <Route path="banner" element={<SettingsForm type="banner" />} />
                <Route path="password" element={<SettingsForm type="password" />} />
                <Route path="*" element={<Navigate to="/settings" />} />
              </Route>
              <Route path="/messages">
                <Route index element={<Outlet />} />
                <Route path=":user_id" element={<ShowMessages />} />
              </Route>
              <Route path="*" element={<Outlet />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout