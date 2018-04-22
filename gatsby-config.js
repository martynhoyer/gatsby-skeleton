const config = require("./data/SiteConfig");

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/${config.blogPostDir}`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: `${__dirname}/content/${config.blogAuthorDir}`
      }
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 710
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe"
          },
          "gatsby-remark-copy-linked-files"
        ]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-netlify-cms"
  ]
};
