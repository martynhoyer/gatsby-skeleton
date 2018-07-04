const config = require('./data/SiteConfig.json')

// Attempt at overriding Offline plugin options.
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-offline#overriding-options
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
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-react-helmet
    'gatsby-plugin-react-helmet',
    {
      // https://github.com/angeloocana/gatsby-plugin-i18n
      resolve: 'gatsby-plugin-i18n',
      options: {
        // langKeyForNull: lanKey added to page context and graphql when no lanKey specified. Default: any.
        langKeyForNull: 'any',
        // langKeyDefault: lanKey to use when no lanKey specified.
        langKeyDefault: config.defaultLangKey,
        // useLangKeyLayout:
        //  true: use a different layout for each langKey (src/layouts/en.js, src/layouts/pt.js, ...)
        //  false: use default layout (src/layouts/index.js)
        useLangKeyLayout: false,
      },
    },
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem
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
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json
    'gatsby-transformer-json',
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images
            resolve: 'gatsby-remark-images',
            options: {
              // The maxWidth in pixels of the div where the markdown will be displayed.
              // This value is used when deciding what the width of the various responsive
              // thumbnails should be.
              maxWidth: 710,
              // Add a link to each image to the original image. Sometimes people want to see
              // a full-sized version of an image e.g. to see extra detail on a part of the image
              // and this is a convenient and common pattern for enabling this.
              // Set this option to false to disable this behavior.
              linkImagesToOriginal: true,
              // Add a caption to each image with the contents of the title attribute, when this
              // is not empty. Set this option to true to enable this behavior.
              showCaptions: false,
              // Analyze images' pixel density to make decisions about target image size. This is
              // what GitHub is doing when embedding images in tickets. This is a useful setting
              // for documentation pages with a lot of screenshots. It can have unintended side
              // effects on high pixel density artworks.
              sizeByPixelDensity: false,
              // Set the background color of the image to match the background image of your design
              backgroundColor: `white`,
            },
          },
          {
            // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-responsive-iframe
            resolve: 'gatsby-remark-responsive-iframe',
          },
          // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-copy-linked-files
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      // https://github.com/benjaminhoffman/gatsby-plugin-mailchimp/
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        // Instructions on how to set this EndPoint value: https://github.com/benjaminhoffman/gatsby-plugin-mailchimp/#gatsby-config-instructions
        endpoint: config.mailchimpEndpoint,
      },
    },
    {
      // https://github.com/zabute/gatsby-plugin-svgr
      resolve: 'gatsby-plugin-svgr',
      options: {
        // All options: https://github.com/smooth-code/svgr#options
        // Only process this directory
        dir: '/src/svg',
        // Replace SVG "width" and "height" value by "1em" in order to make SVG size inherits from text size. Also remove title.
        icon: false,
        // Setting this to false will remove the viewBox property.
        viewBox: true,
      },
    },
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-nprogress
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Sets the loading bar color.
        color: '#ff57b6',
      },
    },
    // Deactivated GTM meanwhile Gymlib's GTM code is optimized.
    // {
    //   // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: {
    //     id: config.googleTagManagerId,
    //     // Include GTM in development.
    //     // Defaults to false meaning GTM will only be loaded in production.
    //     includeInDevelopment: false,
    //     // Specify optional GTM environment details.
    //     // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
    //     // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
    //   },
    // },
    {
      // https://github.com/Creatiwity/gatsby-plugin-favicon
      resolve: `gatsby-plugin-favicon`,
      options: {
        // The recommended size for the file is: 1500x1500px.
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
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp
    'gatsby-plugin-sharp',
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-sharp
    'gatsby-transformer-sharp',
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-catch-links
    'gatsby-plugin-catch-links',
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sitemap
    'gatsby-plugin-sitemap',
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-styled-components
    'gatsby-plugin-styled-components',
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify-cms
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        // One convention is to place your Netlify CMS customization code in a
        // `src/cms` directory.
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify
      resolve: `gatsby-plugin-netlify`,
      options: {
        // Add more headers.
        headers: {
          '/*': [
            // he X-Frame-Options HTTP response header can be used to indicate whether or not a
            // browser should be allowed to render a page in a <frame>, <iframe> or <object> .
            // Sites can use this to avoid clickjacking attacks, by ensuring that their content is
            // not embedded into other sites.
            // SAMEORIGIN: The page can only be displayed in a frame on the same origin as the page
            // itself. The spec leaves it up to browser vendors to decide whether this option applies
            // to the top level, the parent, or the whole chain, although it is argued that the option
            // is not very useful unless all ancestors are also in the same origin (see bug 725490).
            // Also see Browser compatibility for support details.
            'X-Frame-Options: SAMEORIGIN',
            // The HTTP X-XSS-Protection response header is a feature of Internet Explorer, Chrome and
            // Safari that stops pages from loading when they detect reflected cross-site scripting
            // (XSS) attacks. Although these protections are largely unnecessary in modern browsers when
            // sites implement a strong Content-Security-Policy that disables the use of inline JavaScript
            // ('unsafe-inline'), they can still provide protections for users of older web browsers that
            // don't yet support CSP.
            // 1; mode=block: Enables XSS filtering. Rather than sanitizing the page, the browser will
            // prevent rendering of the page if an attack is detected.
            'X-XSS-Protection: 1; mode=block',
            // The X-Content-Type-Options response HTTP header is a marker used by the server to indicate
            // that the MIME types advertised in the Content-Type headers should not be changed and be
            // followed. This allows to opt-out of MIME type sniffing, or, in other words, it is a way to
            // say that the webmasters knew what they were doing.
            // nosniff: Blocks a request if the requested type is "style" and the MIME type is not "text/css",
            // or "script" and the MIME type is not a JavaScript MIME type.
            'X-Content-Type-Options: nosniff',
            // The HTTP Strict-Transport-Security response header (often abbreviated as HSTS)  lets a web site
            // tell browsers that it should only be accessed using HTTPS, instead of using HTTP.
            // max-age=<expire-time>: The time, in seconds, that the browser should remember that a site is
            // only to be accessed using HTTPS.
            // includeSubDomains: If this optional parameter is specified, this rule applies to all of the site's
            // subdomains as well.
            'Strict-Transport-Security: max-age=31536000; includeSubdomains',
          ],
          // The Cache-Control general-header field is used to specify directives for caching mechanisms in both
          // requests and responses. Caching directives are unidirectional, meaning that a given directive in a
          // request is not implying that the same directive is to be given in the response.
          // public: Indicates that the response may be cached by any cache.
          // max-age=<seconds>: Specifies the maximum amount of time a resource will be considered fresh.
          // Contrary to Expires, this directive is relative to the time of the request.
          '/static/*': ['Cache-Control: public, max-age=1209600'],
          // The Expires header contains the date/time after which the response is considered stale.
          // Note: This header is completely ignored as 'max-age' is present, but required for GTMetrix.
          '/*.js': ['Expires: Mon, 30 Dec 2030 23:42:00 GMT'],
          '/static/*.woff': ['Cache-Control: public, max-age=1209600'],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: false, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers (disabled by default, until gzip is fixed for server push)
        mergeCachingHeaders: false, // boolean to turn off the default caching headers
      },
    },
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-offline
      // Must be the last plugin.
      resolve: 'gatsby-plugin-offline',
      // options: offlineOptions
    },
  ],
}
