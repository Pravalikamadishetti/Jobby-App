import {Link} from 'react-router-dom'

import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    id,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="link-item">
        <div>
          <div className="company-logo-and-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-and-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar size={20} color="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-job-type-and-package-container">
            <div className="location-and-job-type-container">
              <div className="location-container">
                <MdLocationOn color="white" size={25} />
                <p className="location">{location}</p>
              </div>
              <div className="job-type-container">
                <FaSuitcase color="white" size={23} />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <h1 className="description-title">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
