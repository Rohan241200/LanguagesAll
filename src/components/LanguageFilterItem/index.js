import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, isActive, onClickActiveBtn} = props
  const {id, language} = languageItem

  const activeBtn = isActive ? 'active-btn' : ''

  const onClickBtn = () => {
    onClickActiveBtn(id)
  }

  return (
    <li className="language-lists">
      <button
        type="button"
        className={`language-button ${activeBtn}`}
        onClick={onClickBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
