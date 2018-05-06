import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import config from "../../data/SiteConfig";
import PostDate from "../components/PostDate";
import PostTags from "../components/PostTags";
import AuthorModel from "../models/author-model";
import CategoryModel from "../models/category-model";
import SingleColumn from "../components/Layouts/SingleColumn";
import media from "../tokens/breakpoints";
import PostFooterSubscribe from "../components/PostFooterSubscribe";
import PostCard from "../components/PostCard";
import spacing, { fontsize } from "../tokens/dimensions";

const Article = styled.article`
  padding-bottom: ${spacing.lg};
`;

const Thumbnail = styled(Img)`
  margin-top: -${24 + 32}px;
  margin-right: -${spacing.md};
  margin-left: -${spacing.md};

  @media (${media.sm}) {
    margin-right: 0;
    margin-left: 0;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;

  margin-top: ${spacing.xxl};
`;

const CategoryLink = styled(Link)`
  margin-right: ${spacing.sm};
  margin-left: ${spacing.sm};
  text-decoration: none;
  color: ${props => props.color};
`;

const StyledPostDate = styled(PostDate)`
  margin-right: ${spacing.sm};
  margin-left: ${spacing.sm};
  color: ${props => props.theme.palette.grisLight};
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;

  @media (${media.sm}) {
    font-size: 48px;
  }

  @media (${media.md}) {
    font-size: 64px;
  }
`;

const Body = styled.section`
  max-width: 70ch;
  margin: 0 auto;

  @media (${media.md}) {
    font-size: 1.25em;
  }
`;

const Footer = styled.footer`
  margin-top: ${spacing.xxl};
`;

const RelatedPostsWrapper = styled.div`
  margin-top: ${spacing.xl};
  padding-top: ${spacing.xl};
  border-top: 1px solid ${props => props.theme.palette.grisLight};
`;

const RelatedPostsHeading = styled.h2`
  margin: 0;
  font-size: ${fontsize.xl};
  text-align: center;
`;

const RelatedPosts = styled.div`
  display: grid;
  grid-gap: ${spacing.base} ${spacing.md};

  margin-top: ${spacing.xxl};

  @media (${media.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

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

class PostTemplate extends React.Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const {
      locale,
      title,
      localDate,
      date,
      tags,
      category,
      author
    } = postNode.frontmatter;

    let relatedPostsList = [];

    if (this.props.data.relatedPosts) {
      const { edges: relatedPosts } = this.props.data.relatedPosts;

      relatedPostsList = getPostList(relatedPosts);
    }

    const thumbnail =
      postNode.thumbnailArray &&
      postNode.thumbnailArray.length > 0 &&
      postNode.thumbnailArray[0];

    const authorData = AuthorModel.getAuthor(
      this.props.data.authors.edges,
      author,
      config.blogAuthorId
    );

    const categoryData = CategoryModel.getCategory(
      this.props.data.categories.edges,
      _.kebabCase(category),
      config.blogAuthorId
    );

    return (
      <SingleColumn>
        <Helmet title={`${title} | ${config.siteTitle}`}>
          <html lang={locale} />
        </Helmet>
        <Article>
          <header>
            {thumbnail && <Thumbnail sizes={thumbnail.sizes} />}
            <Meta>
              <CategoryLink
                to={`/${locale}/categories/${_.kebabCase(category)}`}
                color={categoryData.color}
              >
                {category}
              </CategoryLink>
              <StyledPostDate date={date} localDate={localDate} />
            </Meta>
            <Title>{title}</Title>
          </header>

          <Body dangerouslySetInnerHTML={{ __html: postNode.html }} />

          <Footer>
            <PostFooterSubscribe />
            <PostTags prefix="Tags" tags={tags} locale={locale} />
            <p>{authorData.name}</p>
            {relatedPostsList &&
              relatedPostsList.length > 0 && (
                <RelatedPostsWrapper>
                  <RelatedPostsHeading>
                    <FormattedMessage id="post.relatedArticlesHeading" />
                  </RelatedPostsHeading>
                  <RelatedPosts>
                    {relatedPostsList.map(post => (
                      <PostCard
                        post={post}
                        key={`${post.path}+${post.locale}`}
                      />
                    ))}
                  </RelatedPosts>
                </RelatedPostsWrapper>
              )}
          </Footer>
        </Article>
      </SingleColumn>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $locale: String!, $category: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
        date
        category
        tags
        author
        locale
      }
      fields {
        slug
      }
      thumbnailArray: childrenImageSharp {
        sizes(maxWidth: 1600) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          originalName
        }
      }
    }
    # authors
    authors: allAuthorsJson {
      edges {
        node {
          id
          name
        }
      }
    }
    categories: allCategoriesJson {
      edges {
        node {
          id
          color
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category }, locale: { eq: $locale } }
        fields: { slug: { ne: $slug } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            locale
            localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
            date
            category
          }
          fields {
            slug
          }
          excerpt
          thumbnailArray: childrenImageSharp {
            sizes(maxWidth: 560) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalName
            }
          }
        }
      }
    }
  }
`;

export default PostTemplate;
