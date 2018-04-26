import React from "react";
import Link from "gatsby-link";
import styled, { css } from "styled-components";
import media from "../../tokens/breakpoints";

import PostDate from "../PostDate";

const PostList = styled.div`
  display: grid;
  grid-gap: 16px 24px;

  @media (${media.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const doubleWidthFirstPost = ({ isIndex }) =>
  isIndex &&
  css`
    &:first-child {
      @media (${media.sm}) {
        grid-column: span 2;
      }
    }
  `;

const Article = styled.article`
  ${doubleWidthFirstPost};

  padding: 32px 48px;
  box-shadow: 2.8px 2.8px 5.6px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
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
    const { isIndex } = this.props;

    return (
      <PostList>
        {/* This is the post loop - each post will be output using this markup */}
        {postList.map((post, index) => {
          const { locale, title, path, excerpt, date, category } = post;
          const url = `/${locale}${path}`;
          const mapKey = `${title}+${index}`;

          return (
            <Article key={mapKey} isIndex={isIndex}>
              <header>
                <h2>
                  <Link to={url}>{title}</Link>
                </h2>
                {category}
                <PostDate date={date} />
              </header>
              <section>
                <p>{excerpt}</p>
              </section>
              <footer>
                <Link to={url}>Read more &rarr;</Link>
              </footer>
            </Article>
          );
        })}
      </PostList>
    );
  }
}

export default PostListing;
