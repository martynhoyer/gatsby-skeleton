module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  blogAuthorDir: "authors", // The name of directory that contains your 'authors' folder.
  blogAuthorId: "martyn", // The default and fallback author ID used for blog posts without a defined author.
  siteTitle: "Gatsby blog", // Site title.
  siteUrl: "https://martynhoyer.co.uk",
  siteNavigation: true, // If navigation is enabled the Menu button will be visible
  sitePaginationLimit: 6, // The max number of posts per page.
  googleAnalyticsID: "", // GA tracking ID.
  locales: ["fr", "en"],
  defaultLangKey: "fr",
  // Copyright string for the footer of the website and RSS feed.
  copyright: {
    label: "Gymlib.com", // Label used after the year
    startYear: "2014" // optional, set specific copyright year or range of years, defaults to current year
    // url: "https://www.gatsbyjs.org/" // optional, set link address of copyright, defaults to site root
  },
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};