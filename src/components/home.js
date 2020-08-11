import Layout from "./layout"
import React from "react"

const home = ({ pageContext, location }) => {
  return (
    <Layout lang={pageContext.lang} url={location.pathname}>
      <h1>
        {pageContext.data.title}
      </h1>
      <h4>
        {pageContext.data.subtitle}
      </h4>
      <p>
        {pageContext.data.paragraph}
      </p>
      <p>
        {pageContext.data.content}
      </p>
    </Layout>
  )
}
export default home
