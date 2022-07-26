import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item-container">
      <div className="company-logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-and-rating-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar size={24} color="#fbbf24" />
            <p className="job-item-details-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-title">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-and-job-type-container">
        <div className="location-container">
          <MdLocationOn color="white" size={25} />
          <p className="job-item-details-location">{location}</p>
        </div>
        <div className="job-type-container">
          <FaSuitcase color="white" size={22} />
          <p className="job-item-details-employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
