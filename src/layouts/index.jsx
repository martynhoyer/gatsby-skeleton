import React from "react";
import Helmet from "react-helmet";

import { getCurrentLangKey } from "ptz-i18n";
import { IntlProvider, addLocaleData } from "react-intl";
import "intl";
import en from "react-intl/locale-data/en";
import "intl/locale-data/jsonp/en";
import fr from "react-intl/locale-data/fr";
import "intl/locale-data/jsonp/fr";

import Cookies from "universal-cookie";
import { navigateTo } from "gatsby-link";
import { ThemeProvider } from "styled-components";
import config from "../../data/SiteConfig";
import "./global.styles.css";
import GYMLIB from "../tokens/colours";
import Header from "../components/Header";
import Footer from "../components/Footer";

addLocaleData([...en, ...fr]);

const cookies = new Cookies();

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath.includes("posts")) {
      title = "Article";
    } else if (currentPath.includes("tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.includes("categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }

  handleLocaleClick = e => {
    cookies.set("lang", e.target.value, { path: "/" });
    navigateTo(`/${e.target.value}/`);
  };

  render() {
    const { children, location } = this.props;

    const url = location.pathname;
    const { locales, defaultLangKey } = config;
    const langKey = getCurrentLangKey(locales, defaultLangKey, url);

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    const i18nMessages = require(`../../data/translations/${langKey}.json`);

    function flattenMessages(nestedMessages, prefix = "") {
      return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string") {
          messages[prefixedKey] = value;
        } else {
          Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
      }, {});
    }

    const messages = flattenMessages(i18nMessages);

    return (
      <IntlProvider locale={langKey} messages={messages}>
        <ThemeProvider theme={GYMLIB}>
          <div>
            <Helmet>
              <title>{`${config.siteTitle} | ${this.getLocalTitle()}`}</title>
              <meta name="description" content={config.siteDescription} />
            </Helmet>
            <Header>
              {config.locales.map(locale => (
                <button
                  key={locale}
                  value={locale}
                  onClick={this.handleLocaleClick}
                >
                  {locale}
                </button>
              ))}
            </Header>
            {children()}
            <Footer>Footer</Footer>
          </div>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}
