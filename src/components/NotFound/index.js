import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div className="jobs-background-container">
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we&#39;re sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
