import React, { Fragment, Component } from 'react'
import Helmet from 'react-helmet'
import Cookies from 'universal-cookie'
import { getCurrentLangKey } from 'ptz-i18n'
import { IntlProvider, addLocaleData } from 'react-intl'
import 'intl'

/* 
These files need to be manually imported if more languages are added
*/
import en from 'react-intl/locale-data/en'
import 'intl/locale-data/jsonp/en'
import fr from 'react-intl/locale-data/fr'
import 'intl/locale-data/jsonp/fr'

import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import config from '../../data/SiteConfig.json'
import './global.styles.css'
import GYMLIB from '../tokens/colours'
import media from '../tokens/breakpoints'

const cookies = new Cookies()

/* 
This will need updating manually if more languages are added
*/
addLocaleData([...en, ...fr])

injectGlobal`
 html {
   font-size: 14px;

   @media (${media.sm}) {
     font-size: 16px;
   }

   @media (${media.md}) {
     font-size: 14px;
   }
 }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

export default class MainLayout extends Component {
  render() {
    const { children, location } = this.props

    const url = location.pathname
    const { locales, defaultLangKey } = config

    let langKey
    const cookiedLang = cookies.get('lang')
    if (cookiedLang) {
      langKey = cookiedLang
    } else {
      langKey = getCurrentLangKey(locales, defaultLangKey, url)
    }

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    const i18nMessages = require(`../../data/translations/${langKey}.json`)

    /*
    Copied from https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object 
    This flattens the JSON languages file before passing it to the IntlProvider
    This allows us to used a nested syntax for translations making grouping a
    little bit easier to see in Netlify CMS
    */
    function flattenMessages(nestedMessages, prefix = '') {
      return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key]
        const prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'string') {
          messages[prefixedKey] = value
        } else {
          Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages
      }, {})
    }

    const messages = flattenMessages(i18nMessages)

    return (
      <IntlProvider locale={langKey} messages={messages}>
        <ThemeProvider theme={GYMLIB}>
          <Fragment>
            <Helmet>
              <html lang={langKey} />
            </Helmet>
            <PageWrapper>{children()}</PageWrapper>
          </Fragment>
        </ThemeProvider>
      </IntlProvider>
    )
  }
}
