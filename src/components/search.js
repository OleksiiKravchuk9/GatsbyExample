import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import styles from "../pages/css/event-css-modules.module.css"

const ru = require("convert-layout/ru")
const ua = require("convert-layout/uk")
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: []
    }
  }

  /*
  * page.locale
                page.path
                page.routeId*/
  render() {
//${"/" + this.props.lang}/${page.path}${page.routeId != null ? "#" + page.routeId : ""}`
    return (
      <div>
        <input type="text" value={this.state.query} onChange={this.search}/>
        <div>
          <ul className={styles.list}>
            {this.state.results.filter(page => page.locale === this.props.lang).map(page => (
              <li key={page.id}>
                <Link
                  to={ (this.props.lang !== ''? '/' + this.props.lang : '') +  "/" + page.path + (page.routeId == null ? "" : '#' + page.routeId)}>{this.translateFromEN(this.props.lang, page.title)} - </Link>
                {this.translateFromEN(this.props.lang, page.description)}
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    const queryT = this.translateToEn(this.props.lang, query)
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(queryT, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
    })

  }

  translateToEn = (lang, data) => {
    if (lang === "ru") {
      return ru.toEn(data)
    } else if (lang === "ua") {
      return ua.toEn(data)
    }
    return data
  }

  translateFromEN = (lang, data) => {
    if (lang === "ru") {
      return ru.fromEn(data)
    } else if (lang === "ua") {
      return ua.fromEn(data)
    }
    return data
  }
}
