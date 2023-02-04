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
  const divStyle = optionalStyling && 'settings-middle-bar'

  return (
    <>
      <div className="d-flex w-75 m-auto z1">
        <Header />
        <div className={`middle-bar ${divStyle}`}>
          {children}
        </div>
        <div className={`right-bar ${divStyle}`}>
          {!optionalStyling && <SearchBar />}
          <Routes>
            <Route path="/settings">
              <Route index element={<SettingsRightBar />} />
              <Route path="username" element={<SettingsForm type="username" />} />
              <Route path="name" element={<SettingsForm type="name" />} />
              <Route path="email" element={<SettingsForm type="email" />} />
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
      <Footer />
    </>
  )
}

export default Layout