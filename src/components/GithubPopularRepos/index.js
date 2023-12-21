import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apisStatus = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    isActive: languageFiltersData[0].id,
    isTab: [],
    apiStatus: apisStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getSpecificTabData = data => {
    const updateData = data.popular_repos.map(each => ({
      id: each.id,
      name: each.name,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))

    this.setState(
      {isTab: updateData, apiStatus: apisStatus.success},
      this.getData,
    )
  }

  onClickActiveBtn = id => {
    const filterActiveBtn = languageFiltersData.filter(each => each.id === id)
    this.setState({isActive: filterActiveBtn[0].id})
  }

  getData = async () => {
    const {isActive} = this.state

    this.setState({apiStatus: apisStatus.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${isActive}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      this.getSpecificTabData(data)
    } else {
      this.setState({apiStatus: apisStatus.failure})
    }
  }

  getErrorImg = () => (
    <div className="error-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-img"
      />
    </div>
  )

  getLoadingData = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getLanguageData = () => {
    const {isTab} = this.state
    return (
      <ul className="repository-items">
        {isTab.map(each => (
          <RepositoryItem tabLanguageDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  getRenderDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apisStatus.success:
        return this.getLanguageData()
      case apisStatus.failure:
        return this.getErrorImg()
      case apisStatus.inProgress:
        return this.getLoadingData()
      default:
        return null
    }
  }

  render() {
    const {isActive} = this.state
    return (
      <div className="bg-container">
        <div className="bg-card">
          <h1 className="main-heading">Popular</h1>
          <ul className="language-items">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                languageItem={each}
                key={each.id}
                isActive={each.id === isActive}
                onClickActiveBtn={this.onClickActiveBtn}
              />
            ))}
          </ul>
          <div className="render-container">{this.getRenderDetails()}</div>
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
