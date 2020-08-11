exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const query = graphql(`{
  allEvent {
    edges {
      node {
        locale
        data {
          path
          description
          title
          children {
            id
            eventName
            eventDescription
          }
        }
      }
    }
  }
}

`).then(query => {

    const nodes = query.data.allEvent.edges
    const path = require("path")
    for (const node of nodes) {
      let lang = `${node.node.locale}`
      createPage({
        path: `${lang}/${node.node.data.path}`,
        component: path.resolve(`./src/components/eventPage.js`),
        context: {
          data: node.node.data,
          lang: node.node.locale
        }
      })
    }
  })
}
