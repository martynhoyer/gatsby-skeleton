import React from "react";
import Link from "gatsby-link";
import { FormattedMessage } from "react-intl";
import PostDate from "../PostDate";

const PopularPosts = ({ popularPosts = [] }) => {
  if (!popularPosts.length) return null;
  return (
    <div>
      <h2>
        <FormattedMessage id="sidebar.popularPosts.heading" />
      </h2>
      <ol>
        {popularPosts.map(({ node: popularPost }) => (
          <li key={popularPost.id}>
            <Link
              to={`/${popularPost.frontmatter.locale}${
                popularPost.fields.slug
              }`}
            >
              <div>{popularPost.frontmatter.title}</div>
              <PostDate
                date={popularPost.frontmatter.date}
                localDate={popularPost.frontmatter.localDate}
              />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PopularPosts;
