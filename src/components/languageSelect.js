import React from "react"
import { Link } from "gatsby"
import { navigate } from "@reach/router"

const LanguageSelect = ({ url, lang }) => {
  if (lang !== "") {
    url = url.slice(3)
  }
  const uaLink = `/ua${url}`
  const ruLink = `/ru${url}`

  const change = (ev) => {
    navigate(ev.target.value)
  }

  return (
    <select onChange={change}>
      <option selected={lang === "default"} value={url}>
        EN
      </option>
      <option selected={lang === "ua"} value={uaLink}>
        UA
      </option>
      <option selected={lang === "ru"} value={ruLink}>
        RU
      </option>
    </select>
  )
}
export default LanguageSelect
