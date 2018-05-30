const config = require('./data/SiteConfig.json')

// const rootDir = 'public'

// const offlineOptions = {
//   staticFileGlobs: [
//     `${rootDir}/**/*.{js,woff2,svg,png}`,
//     `${rootDir}/commons-*js`,
//     `${rootDir}/app-*js`,
//     `${rootDir}/index.html`,
//     `${rootDir}/manifest.json`,
//     `${rootDir}/manifest.webmanifest`,
//     `${rootDir}/offline-plugin-app-shell-fallback/index.html`,
//     `${rootDir}/admin`,
//     `${rootDir}/admin/`,
//     `${rootDir}/admin/index.html`,
//   ],
//   stripPrefix: rootDir,
//   navigateFallback: `/offline-plugin-app-shell-fallback/index.html`,
//   navigateFallbackWhitelist: [/^.*(?!\.\w?$)/],
//   cacheId: `gatsby-plugin-offline`,
//   dontCacheBustUrlsMatching: /(.\w{8}.woff2)/, //|-\w{20}.js)/,
//   runtimeCaching: [{
//     urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif|tiff)$/,
//     handler: `fastest`,
//   }, ],
//   skipWaiting: false,
// };

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: config.defaultLangKey,
        useLangKeyLayout: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'cmsimages',
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'authors',
        path: `${__dirname}/content/${config.blogAuthorDir}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'categories',
        path: `${__dirname}/content/categories`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/${config.blogPostDir}`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [{
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 710,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: config.mailchimpEndpoint,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        dir: '/src/svg', // only process this directory
        // svgr options
        icon: false,
        viewBox: true,
        // see https://github.com/smooth-code/svgr for a list of all options
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#ff57b6',
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: config.googleTagManagerId,
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: false,
          firefox: true,
          twitter: true,
          yandex: true,
          windows: true,
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-styled-components",
    {
      resolve: 'gatsby-plugin-offline',
      // options: offlineOptions
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: SAMEORIGIN',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Strict-Transport-Security: max-age=31536000; includeSubdomains',
          ],
          '/static/*': ['Cache-Control: public, max-age=1209600'],
          '/*.js': ['Expires: Mon, 30 Dec 2030 23:42:00 GMT'], // ignored as max-age is present, but required for GTMetrix
          '/static/*.woff': ['Cache-Control: public, max-age=1209600'],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: false, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers (disabled by default, until gzip is fixed for server push)
        mergeCachingHeaders: false, // boolean to turn off the default caching headers
      },
    }
  ],
}