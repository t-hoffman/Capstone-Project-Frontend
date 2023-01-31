import NavBar from "Components/NavBar/NavBar"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="left-bar">
      <Link to="/">
        <div className="tw-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/292px-Twitter-logo.svg.png" width="30px" alt="Tweeter" />
        </div>
      </Link>
      <NavBar />
    </div>
  )
}

export default Header
