import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-menu-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <AiFillHome size={20} />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/jobs" className="nav-link">
              <FaSuitcase size={20} />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-button-mobile"
              onClick={onClickLogout}
            >
              <FiLogOut size={20} />
            </button>
          </li>
        </ul>
        <ul className="nav-menu-desktop">
          <li className="nav-menu-item-desktop">
            <Link to="/" className="nav-link">
              Home{' '}
            </Link>
          </li>

          <li className="nav-menu-item-desktop">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-button-desktop"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
