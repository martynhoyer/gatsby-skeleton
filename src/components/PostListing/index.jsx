import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import PostDate from "../PostDate";

const Article = styled.article`
  width: 380px;
  padding: 32px 48px;
  box-shadow: 2.8px 2.8px 5.6px 0 rgba(0, 0, 0, 0.1);
`;

const getPostList = postEdges =>
  postEdges.map(postEdge => ({
    locale: postEdge.node.frontmatter.locale,
    path: postEdge.node.fields.slug,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.frontmatter.date,
    category: postEdge.node.frontmatter.category,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead
  }));

class PostListing extends React.Component {
  render() {
    const postList = getPostList(this.props.postEdges);

    return (
      <div>
        {/* This is the post loop - each post will be output using this markup */}
        {postList.map(post => {
          const { locale, title, path, excerpt, date, category } = post;
          const url = `/${locale}${path}`;

          return (
            <Article key={title}>
              <header>
                <h2>
                  <Link to={url}>{title}</Link>
                </h2>
                {category}
                <PostDate date={date} />
              </header>
              <section>
                {/* TODO limit excerpt to 26 words */}
                <p>{excerpt}</p>
              </section>
              <footer>
                <Link to={url}>Read more &rarr;</Link>
              </footer>
            </Article>
          );
        })}
      </div>
    );
  }
}

export default PostListing;
