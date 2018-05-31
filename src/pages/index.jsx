import React, { Component } from 'react'
import { getUserLangKey } from 'ptz-i18n'
import Cookies from 'universal-cookie'
import config from '../../data/SiteConfig.json'

const cookies = new Cookies()

class RedirectIndex extends Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      /*
      Don't redirect if the user is trying to access the CMS
      */
      if (window.location.hash || window.location.href.indexOf('admin') > -1) {
        return
      }

      const { locales, defaultLangKey } = config
      /*
      Check first if the user has a language cookie set already
      */
      const cookiedLang = cookies.get('lang')
      let homeUrl

      /* 
      If the user has a language cookie, send them straight to that language
      */
      if (cookiedLang) {
        homeUrl = `/${cookiedLang}/`
      } else {
        /* 
        If there's no cookie, see if they set their preferred language in the
        browser. If it matches one of the supported languages set `langKey` as
        that, if not, use the `defaultLangKey` from the config.
        */
        const langKey = getUserLangKey(locales, defaultLangKey)
        /*
        Set the cookie for the future so we don't have to go through this
        process again
        */
        cookies.set('lang', langKey, { path: '/' })
        /* 
        Format the URL to redirect to and then navigate to it below
        */
        homeUrl = `/${langKey}/`
      }

      // I don`t think this is the best solution
      // I would like to use Gatsby Redirects like:
      // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
      // But Gatsby Redirects are static, they need to be specified at build time,
      // This redirect is dynamic, It needs to know the user browser language.
      // Any ideas? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4

      window.___history.replace(homeUrl)
    }
  }
  render() {
    return <div />
  }
}

export default RedirectIndex
