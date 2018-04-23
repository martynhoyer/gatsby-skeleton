import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";
import config from "../../../data/SiteConfig";

const urlFormatter = (locale, tag) => {
  if (locale === config.defaultLangKey) return `/tags/${_.kebabCase(tag)}`;
  return `/${locale}/tags/${_.kebabCase(tag)}`;
};

class PostTags extends Component {
  render() {
    const { prefix, tags, locale } = this.props;

    if (tags) {
      return (
        <div>
          <h4>{prefix}</h4>
          {tags.map((tag, index, arr) => (
            <span key={tag}>
              <Link key={tag} to={urlFormatter(locale, tag)}>
                {tag}
              </Link>
              {index !== arr.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      );
    }
    return null;
  }
}

export default PostTags;
