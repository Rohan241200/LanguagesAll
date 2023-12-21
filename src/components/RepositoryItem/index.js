import './index.css'

const RepositoryItem = props => {
  const {tabLanguageDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = tabLanguageDetails

  return (
    <li className="repository-lists">
      <img src={avatarUrl} alt={name} className="language-img" />
      <p className="language-name">{name}</p>
      <div className="language-desc-card">
        <div className="language-count-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="language-logo"
          />
          <p className="language-text">{starsCount}</p>
        </div>
        <div className="language-count-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="language-logo"
          />
          <p className="language-text">{forksCount}</p>
        </div>
        <div className="language-count-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="language-logo"
          />
          <p className="language-text">{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
