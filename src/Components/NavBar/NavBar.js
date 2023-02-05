import { TweetModal } from "Components/Tweets/TweetForm"
import { useContext, useEffect, useRef, useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import settingsIcon from "../../assets/settings.png"
import settingsIconActive from "../../assets/settingsActive.png"
import { AuthContext } from "Components/UserAuth/AuthContext"
import "../../css/NavBar.css"

const NavBar = () => {
  const { token, userInfo, defaultImage, navigate } = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const [more, setMore] = useState(false)

  const navItems = [
    {
      path: '/',
      title: 'Home',
      icon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path></g></svg>,
      activeicon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path></g></svg>,
    },
/*     {
      path: '/explore',
      title: 'Explore',
      icon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.09 3.098L9.72 7h5.99l.39-4.089 1.99.187L17.72 7h3.78v2h-3.97l-.56 6h3.53v2h-3.72l-.38 4.089-1.99-.187.36-3.902H8.78l-.38 4.089-1.99-.187L6.77 17H2.5v-2h4.46l.56-6H3.5V7h4.21l.39-4.089 1.99.187zM14.96 15l.56-6H9.53l-.56 6h5.99z"></path></g></svg>,
      activeicon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.64 3.157l-.36 3.593h4.99l.38-3.892 2.99.299-.36 3.593h2.97v2.5h-3.22l-.55 5.5h2.77v2.5h-3.02l-.39 3.892-2.98-.299.36-3.593H9.23l-.39 3.892-2.98-.299.36-3.593H2.75v-2.5h3.72l.55-5.5H3.75v-2.5h3.52l.38-3.892 2.99.299zm3.83 11.593l.55-5.5h-4.99l-.55 5.5h4.99z"></path></g></svg>,
    }, */
    {
      path: '/messages',
      title: 'Messages',
      icon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>,
      activeicon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path></g></svg>,
    },
    {
      path: '/profile',
      title: 'Profile',
      icon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>,
      activeicon: <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path></g></svg>,
    },
    {
      path: '/settings',
      title: 'Settings',
      icon: <img src={settingsIcon} alt="Settings" />,
      activeicon: <img src={settingsIconActive} alt="Settings" />
    }
  ]  

  const userImage = userInfo?.image ? userInfo.image : defaultImage
  const navUserInfo = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navUserInfo.current && !navUserInfo.current.contains(e.target)) {
        setMore(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
    <ul className="nav-list">
    {
      navItems.map((nav, idx) => (
        <NavLink to={nav.path}
                 className={({ isActive }) => (isActive ? 'nav-list-active' : 'nav-list')}
                 key={idx}>
          {({ isActive }) => (<NavIcon isActive={isActive} {...nav} />)}
        </NavLink>
      ))
    }
    </ul>
    <div className="d-flex w-100 justify-content-center mt-4">
      {token && <button className="tw-blue-btn-lg" onClick={() => setShow(!show)}>Tweet</button>}
    </div>
    
    <TweetModal show={show} setShow={setShow} modal={true} />

    {
      token && (
        <div className="nav-user-info-cont" ref={navUserInfo}>
          <div className="nav-user-open"
              style={more ? {display:'block'} : {display:'none'}}
              onClick={() => { setMore(false); navigate('/signout') }}
          >
            <b>Log out @{userInfo?.username}</b>
          </div>
          <div className="nav-user-info" id="nav-user-button" onClick={() => setMore(!more)}>
            <div className="profile-icon">
              <img src={userImage} alt="Tweeter" />
            </div>
            <div style={{wordWrap:'break-word'}}>
              <b>{userInfo?.name}</b><br />
              <span style={{color:'#849099'}}>@{userInfo?.username}</span>
            </div>
            <div className="nav-user-more w-100">
              <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

const NavIcon = ({ isActive, icon, activeicon, title }) => {
  return (
    <li>
      {isActive ? activeicon : icon}
      {title}
    </li>
  )
}

export default NavBar
