import React from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import '../css/Layout.css'
import SearchBar from 'Components/NavBar/SearchBar'
import { SettingsForm, SettingsRightBar } from 'Pages'


export const LayoutContext = React.createContext()

const LayoutProvider = ({ children }) => {
  let location = useLocation().pathname.split('/') 

  return (
    <LayoutContext.Provider value={{location}}>
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
              <Route path="username" element={<SettingsForm type="username" />} />
              <Route path="name" element={<SettingsForm type="name" />} />
              <Route path="email" element={<SettingsForm type="email" />} />
              <Route path="password" element={<SettingsForm type="password" />} />
            </Route>
            <Route path="*" element={<Outlet />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </LayoutContext.Provider>
  )
}

export default LayoutProvider