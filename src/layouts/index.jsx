import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import { getCurrentLangKey } from 'ptz-i18n'
import { IntlProvider, addLocaleData } from 'react-intl'
import 'intl'
import en from 'react-intl/locale-data/en'
import 'intl/locale-data/jsonp/en'
import fr from 'react-intl/locale-data/fr'
import 'intl/locale-data/jsonp/fr'

import { ThemeProvider } from 'styled-components'
import config from '../../data/SiteConfig'
import './global.styles.css'
import GYMLIB from '../tokens/colours'

addLocaleData([...en, ...fr])

export default class MainLayout extends React.Component {
  render() {
    const { children, location } = this.props

    const url = location.pathname
    const { locales, defaultLangKey } = config
    const langKey = getCurrentLangKey(locales, defaultLangKey, url)

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    const i18nMessages = require(`../../data/translations/${langKey}.json`)

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
            {children()}
          </Fragment>
        </ThemeProvider>
      </IntlProvider>
    )
  }
}
