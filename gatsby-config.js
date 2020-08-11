module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-source-umbraco",
      options: {
        url: "http://localhost:44323",
        lng: ["", "ua", "ru"],
        endpoints: [""]
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `description`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          SearchData: {
            title: node => node.data.searchTitle,
            description: node => node.data.searchDescription,
            locale: node => node.locale,
            path: node => node.data.path,
            routeId: node => node.data.id
          }
        }
        // Optional filter to limit indexed nodes
        //filter: (node, getNode) => node.frontmatter.tags !== "exempt"
      }
    },
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: "en",
        langKeyForNull: "en",
        prefixDefault: false,
        useLangKeyLayout: false
      }
    }
  ]
}
