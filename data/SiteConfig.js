module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  blogAuthorDir: "authors", // The name of directory that contains your 'authors' folder.
  blogAuthorId: "martyn", // The default and fallback author ID used for blog posts without a defined author.
  siteTitle: "Gymlib blog", // Site title.
  siteUrl: "https://blog.gymlib.com",
  siteNavigation: true, // If navigation is enabled the Menu button will be visible
  sitePaginationLimit: 6, // The max number of posts per page.
  locales: ["fr", "en"],
  defaultLangKey: "fr",
  // Copyright string for the footer of the website and RSS feed.
  copyright: {
    label: "Gymlib.com", // Label used after the year
    startYear: "2014" // optional, set specific copyright year or range of years, defaults to current year
    // url: "https://www.gatsbyjs.org/" // optional, set link address of copyright, defaults to site root
  },
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
  mailchimpEndpoint:
    "https://corseconcierge.us18.list-manage.com/subscribe/post?u=a4f682a765cb09bfe2f975137&amp;id=1e22875e0a",
  social: [
    {
      providerName: "twitter",
      providerDisplayName: "Twitter",
      url: "https://twitter.com/gymlib",
      profileDisplayName: "@Gymlib"
    },
    {
      providerName: "facebook",
      providerDisplayName: "Facebook",
      url: "https://facebook.com/gymlib",
      profileDisplayName: "Gymlib"
    },
    {
      providerName: "linkedin",
      providerDisplayName: "LinkedIn",
      url: "https://linkedin.com/gymlib",
      profileDisplayName: "Gymlib"
    },
    {
      providerName: "instagram",
      providerDisplayName: "Instagram",
      url: "https://instagram.com/gymlib",
      profileDisplayName: "Gymlib"
    }
  ]
};
