import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled, { css } from "styled-components";
import media from "../../tokens/breakpoints";

import PostDate from "../PostDate";
import Box from "../Box";

const homeTemplateNegativeMargin = ({ isIndex }) =>
  isIndex &&
  css`
    margin-top: -72px;
  `;

const PostList = styled.div`
  ${homeTemplateNegativeMargin};

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
`;

const Thumbnail = styled(Img)`
  margin: -32px -24px 0;

  @media (${media.md}) {
    margin-right: -48px;
    margin-left: -48px;
  }
`

const getPostList = postEdges =>
  postEdges.map(postEdge => ({
    locale: postEdge.node.frontmatter.locale,
    path: postEdge.node.fields.slug,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.frontmatter.date,
    localDate: postEdge.node.frontmatter.localDate,
    category: postEdge.node.frontmatter.category,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
    thumbnailArray: postEdge.node.thumbnailArray
  }));

class PostListing extends React.Component {
  render() {
    const postList = getPostList(this.props.postEdges);
    const { isIndex } = this.props;

    return (
      <PostList isIndex={isIndex}>
        {/* This is the post loop - each post will be output using this markup */}
        {postList.map((post, index) => {
          const {
            locale,
            title,
            path,
            excerpt,
            localDate,
            date,
            category,
            thumbnailArray = []
          } = post;
          const url = `/${locale}${path}`;
          const mapKey = `${title}+${index}`;
          const thumbnail = thumbnailArray && thumbnailArray.length && thumbnailArray[0]

          return (
            <Article key={mapKey} isIndex={isIndex}>
              <Box>
                {thumbnail && <Thumbnail sizes={thumbnail.sizes} />}
                <header>
                  <h2>
                    <Link to={url}>{title}</Link>
                  </h2>
                  {category}
                  <PostDate date={date} localDate={localDate} />
                </header>
                <section>
                  <p>{excerpt}</p>
                </section>
                <footer>
                  <Link to={url}>Read more &rarr;</Link>
                </footer>
              </Box>
            </Article>
          );
        })}
      </PostList>
    );
  }
}

export default PostListing;
