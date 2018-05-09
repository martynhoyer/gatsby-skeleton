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
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "any",
        langKeyDefault: config.defaultLangKey,
        useLangKeyLayout: false
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cmsimages",
        path: `${__dirname}/static/img`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: `${__dirname}/content/${config.blogAuthorDir}`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "categories",
        path: `${__dirname}/content/categories`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cmsimages",
        path: `${__dirname}/static/img`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/${config.blogPostDir}`
      }
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [{
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
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: config.mailchimpEndpoint
      }
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        dir: "/src/svg", // only process this directory
        // svgr options
        icon: false,
        viewBox: true
        // see https://github.com/smooth-code/svgr for a list of all options
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-netlify"
  ]
};