import React from 'react'
import { getUserLangKey } from 'ptz-i18n'
import Cookies from 'universal-cookie'
import config from '../../data/SiteConfig'

const cookies = new Cookies()

class RedirectIndex extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { locales, defaultLangKey } = config
      const cookiedLang = cookies.get('lang')
      let homeUrl
      if (cookiedLang) {
        homeUrl = `/${cookiedLang}/`
      } else {
        const langKey = getUserLangKey(locales, defaultLangKey)
        cookies.set('lang', langKey, { path: '/' })
        homeUrl = `/${langKey}/`
      }

      // I don`t think this is the best solution
      // I would like to use Gatsby Redirects like:
      // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
      // But Gatsby Redirects are static, they need to be specified at build time,
      // This redirect is dynamic, It needs to know the user browser language.
      // Any ideias? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4

      window.___history.replace(homeUrl)
    }
  }
  render() {
    return <div />
  }
}

export default RedirectIndex
