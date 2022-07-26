import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: [],
    apiStatus: apiStatusConstants.initial,
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: fetchedData.job_details.title,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => ({
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          id: eachSimilarJob.id,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        }),
      )
      this.setState({
        jobItemDetails: updatedData,
        similarJobDetails: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickJobsRetry = () => {
    this.getJobDetails()
  }

  renderJobDetailsSuccessView = () => {
    const {jobItemDetails, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      title,
      location,
      packagePerAnnum,
      rating,
    } = jobItemDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-details-and-similar-jobs-container">
        <div className="job-item-details-container">
          <div className="company-logo-and-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-details-company-logo"
            />
            <div className="title-and-rating-container">
              <h1 className="job-item-details-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar size={23} color="#fbbf24" />
                <p className="job-item-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-job-type-and-package-container">
            <div className="location-and-job-type-container">
              <div className="location-container">
                <MdLocationOn color="white" size={25} />
                <p className="job-item-details-location">{location}</p>
              </div>
              <div className="job-type-container">
                <FaSuitcase color="white" size={22} />
                <p className="job-item-details-employment-type">
                  {employmentType}
                </p>
              </div>
            </div>
            <p className="job-item-details-package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="job-item-details-description-link-container">
            <h1 className="job-item-details-description-title">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit
              <FiExternalLink className="link-icon" />
            </a>
          </div>
          <p className="job-item-details-job-description">{jobDescription}</p>
          <h1 className="skills-title">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skill-item">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-title">Life at Company</h1>
          <div className="life-at-company-description-and-image-container">
            <p className="life-at-company-description">{description}</p>
            <div className="life-at-company-img-container">
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-title">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobDetails.map(eachSimilarJob => (
            <SimilarJobItem
              key={eachSimilarJob.id}
              similarJobDetails={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-background-container">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
