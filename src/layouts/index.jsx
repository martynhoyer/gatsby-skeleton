import React from "react";
import Helmet from "react-helmet";
import Cookies from "universal-cookie";
import { navigateTo } from "gatsby-link";
import config from "../../data/SiteConfig";
import "./global.styles.css";

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
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} | ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <header>
          {config.locales.map(locale => (
            <button
              key={locale}
              value={locale}
              onClick={this.handleLocaleClick}
            >
              {locale}
            </button>
          ))}
        </header>
        {children()}
        <footer>Footer</footer>
      </div>
    );
  }
}
