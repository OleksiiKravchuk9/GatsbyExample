import Layout from "./layout"
import React from "react"


const EventPage = ({ pageContext, location }) => {

  return (
    <Layout lang={pageContext.lang} url={location.pathname}>
      <h1>
        {pageContext.data.title}
      </h1>
      <h4>
        {pageContext.data.description}
      </h4>

      {pageContext.data.children.map(x => {
        return (
          <div>
            <h1>{x.eventName}</h1>
            <div id={x.id}>{x.eventDescription}</div>
          </div>
        )
      })}

    </Layout>
  )
}

export default EventPage
