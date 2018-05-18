import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import config from "../../data/SiteConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostDate from "../components/PostDate";
import PostTags from "../components/PostTags";
import SingleColumn from "../components/Layouts/SingleColumn";
import media from "../tokens/breakpoints";
import PostFooterSubscribe from "../components/PostFooterSubscribe";
import PostCard from "../components/PostCard";
import PostAuthor from "../components/PostAuthor";
import SocialShare from "../components/SocialShare";
import SEO from "../components/SEO";
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
  position: relative;
  margin: 0 auto;

  @media (${media.md}) {
    font-size: 1.25em;
  }
`;

const SocialShareWrapper = styled.div`
  display: none;
  position: sticky;
  float: left;
  top: ${spacing.md};
  width: ${spacing.lg};

  @media (${media.sm}) {
    display: block;
  }

  @media (${media.md}) {
    width: ${spacing.xl};
  }
`;

const PostContent = styled.div`
  max-width: 70ch;
  margin: 0 auto;

  @media (${media.sm}) {
    padding: 0 calc(${spacing.lg} + ${spacing.md});
  }

  @media (${media.md}) {
    padding: 0 calc(${spacing.xl} + ${spacing.md});
  }
`;

const PostFooter = styled.footer`
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
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
    thumbnailArray: postEdge.node.thumbnailArray,
    categoriesArray: postEdge.node.categoriesArray
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
      alternateLangLinks
    } = postNode.frontmatter;
    const postUrl = `${config.siteUrl}${this.props.location.pathname}`;

    let relatedPostsList = [];

    if (this.props.data.relatedPosts) {
      const { edges: relatedPosts } = this.props.data.relatedPosts;

      relatedPostsList = getPostList(relatedPosts);
    }

    const thumbnail =
      postNode.thumbnailArray &&
      postNode.thumbnailArray.length > 0 &&
      postNode.thumbnailArray[0];

    const category =
      postNode.categoriesArray &&
      postNode.categoriesArray.length > 0 &&
      postNode.categoriesArray[0];

    // const authorData = AuthorModel.getAuthor(
    //   this.props.data.authors.edges,
    //   author,
    //   config.blogAuthorId
    // );

    const { author } = this.props.data;

    return (
      <Fragment>
        <Header />
        <SingleColumn>
          <SEO postSEO postNode={postNode} author={author} />
          <Helmet title={`${title} | ${config.siteTitle}`}>
            {alternateLangLinks &&
              alternateLangLinks.length > 0 &&
              alternateLangLinks.map(link => (
                <link
                  key={link.linkUrl}
                  rel="alternate"
                  href={link.linkUrl}
                  hrefLang={link.language}
                />
              ))}
          </Helmet>
          <Article>
            <header>
              {thumbnail && <Thumbnail sizes={thumbnail.sizes} />}
              <Meta>
                <CategoryLink
                  to={`/${locale}/categories/${_.kebabCase(category.title)}`}
                  color={category.color}
                >
                  {category.displayName}
                </CategoryLink>
                <StyledPostDate date={date} localDate={localDate} />
              </Meta>
              <Title>{title}</Title>
            </header>
            <Body>
              <SocialShareWrapper>
                <SocialShare url={postUrl} title={title} />
              </SocialShareWrapper>
              <PostContent
                dangerouslySetInnerHTML={{ __html: postNode.html }}
              />
            </Body>
            <PostFooter>
              <PostFooterSubscribe />
              <PostTags tags={tags} />
              <PostAuthor author={author} />
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
            </PostFooter>
          </Article>
        </SingleColumn>
        <Footer />
      </Fragment>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $locale: String!
    $category: String!
    $author: String!
  ) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
        date
        category
        image
        tags
        author
        locale
        alternateLangLinks {
          language
          linkUrl
        }
        seo {
          title
          ogTitle
          description
          ogDescription
          keywords
          ogImage
          ogArticleTags
          additional {
            content
            type
            typeValue
          }
        }
      }
      fields {
        slug
      }
      thumbnailArray: childrenImageSharp {
        sizes(maxWidth: 1600) {
          ...GatsbyImageSharpSizes_withWebp
          originalImg
        }
      }
      categoriesArray: childrenCategoriesJson {
        title
        displayName
        color
      }
    }
    # author
    author: authorsJson(title: { eq: $author }) {
      title
      displayName
      image: childImageSharp {
        resolutions(width: 96, height: 96) {
          ...GatsbyImageSharpResolutions_withWebp
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          category: { eq: $category }
          locale: { eq: $locale }
          isPublished: { eq: true }
        }
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
              ...GatsbyImageSharpSizes_withWebp
            }
          }
          categoriesArray: childrenCategoriesJson {
            title
            displayName
            color
          }
        }
      }
    }
  }
`;

export default PostTemplate;
