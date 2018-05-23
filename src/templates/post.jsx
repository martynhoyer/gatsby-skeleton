import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import config from '../../data/SiteConfig'
import Header from '../components/Header'
import Body from '../components/Layouts/Body'
import Footer from '../components/Footer'
import Search from '../components/Search'
import PostDate from '../components/PostDate'
import PostTags from '../components/PostTags'
import SingleColumn from '../components/Layouts/SingleColumn'
import media from '../tokens/breakpoints'
import PostFooterSubscribe from '../components/PostFooterSubscribe'
import PostCard from '../components/PostCard'
import PostAuthor from '../components/PostAuthor'
import SocialShare from '../components/SocialShare'
import SEO from '../components/SEO'
import spacing, { fontsize } from '../tokens/dimensions'

const Article = styled.article`
  padding-bottom: ${spacing.lg};
`

const Thumbnail = styled(Img)`
  margin-top: -${spacing.xxl};
  margin-right: -${spacing.md};
  margin-left: -${spacing.md};
  background-color: ${props => props.theme.palette.grisLight};

  @media (${media.sm}) {
    margin-right: 0;
    margin-left: 0;
  }
`

const Meta = styled.div`
  display: flex;
  justify-content: center;

  margin-top: ${spacing.xxl};
`

const CategoryLink = styled(Link)`
  margin-right: ${spacing.sm};
  margin-left: ${spacing.sm};
  text-decoration: none;
  color: ${props => props.color};
`

const StyledPostDate = styled(PostDate)`
  margin-right: ${spacing.sm};
  margin-left: ${spacing.sm};
  color: ${props => props.theme.palette.grisLight};
`

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;

  @media (${media.sm}) {
    font-size: 3.4285em;
  }

  @media (${media.md}) {
    font-size: 4.8em;
  }
`

const PostBody = styled.section`
  position: relative;
  margin: 0 auto;

  @media (${media.md}) {
    font-size: 1.25em;
  }
`

const SocialShareWrapper = styled.div`
  display: none;
  position: sticky;
  float: left;
  top: ${spacing.md};
  width: ${spacing.lg};

  @media (${media.sm}) {
    display: block;

    /* 
    Kinda hacky... this just pushes it down to line up with the post title.
    Having the title inside the <header> makes the most sense semantically which
    is why I haven't just put the <h1> (and social wrapper) inside the post 
    body.
    */
    margin-top: 4.5rem;
  }

  @media (${media.md}) {
    width: ${spacing.xl};
    margin-top: 6rem;
  }
`

const PostContent = styled.div`
  max-width: 70ch;
  margin: 0 auto;

  & a {
    font-weight: 600;
    text-decoration: none;
    color: ${props => props.theme.palette.violet};

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  & blockquote {
    display: block;
    margin: 2em auto;
    line-height: 1.2;
    font-family: bergensans;
    font-size: 2.5em;
    font-style: italic;
    text-align: center;
    color: ${props => props.theme.palette.violet};
  }

  & pre {
    white-space: pre-wrap;
  }

  & table {
    width: 100%;
    border: 1px solid ${props => props.theme.palette.grisLight};
    border-collapse: collapse;

    & th,
    & td {
      padding: 0.25em 0.5em;
      border: 1px solid ${props => props.theme.palette.grisLight};
    }
  }

  @media (${media.sm}) {
    /* Min height to match social buttons */
    min-height: 120px;

    padding: 0 calc(${spacing.lg} + ${spacing.md});
  }

  @media (${media.md}) {
    /* Min height to match social buttons */
    min-height: 168px;

    padding: 0 calc(${spacing.xl} + ${spacing.md});
  }
`

const PostFooter = styled.footer`
  margin-top: ${spacing.xxl};
`

const RelatedPostsWrapper = styled.div`
  margin-top: ${spacing.xl};
  padding-top: ${spacing.xl};
  border-top: 1px solid ${props => props.theme.palette.grisLight};
`

const RelatedPostsHeading = styled.h2`
  margin: 0;
  font-size: ${fontsize.xl};
  text-align: center;
`

const RelatedPosts = styled.div`
  display: grid;
  grid-gap: ${spacing.base} ${spacing.md};

  margin-top: ${spacing.xxl};

  @media (${media.md}) {
    grid-template-columns: 1fr 1fr 1fr;
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
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
    thumbnailArray: postEdge.node.thumbnailArray,
    categoriesArray: postEdge.node.categoriesArray,
  }))

class PostTemplate extends React.Component {
  render() {
    const { intl } = this.props
    const postNode = this.props.data.markdownRemark
    const { locale, title, localDate, date, tags, alternateLangLinks } = postNode.frontmatter
    const postUrl = `${config.siteUrl}${this.props.location.pathname}`
    const categories = this.props.data.categories.edges

    let relatedPostsList = []

    if (this.props.data.relatedPosts) {
      const { edges: relatedPosts } = this.props.data.relatedPosts

      relatedPostsList = getPostList(relatedPosts)
    }

    const thumbnail = postNode.thumbnailArray && postNode.thumbnailArray.length > 0 && postNode.thumbnailArray[0]

    const category = postNode.categoriesArray && postNode.categoriesArray.length > 0 && postNode.categoriesArray[0]

    const { author } = this.props.data

    const globalSiteTitle =
      intl.messages['global.seo.siteTitle'] &&
      intl.formatMessage({
        id: 'global.seo.siteTitle',
      })

    return (
      <Fragment>
        <SEO postSEO postNode={postNode} author={author} />
        <Helmet title={`${title} | ${globalSiteTitle}`}>
          {alternateLangLinks &&
            alternateLangLinks.length > 0 &&
            alternateLangLinks.map(link => (
              <link key={link.linkUrl} rel="alternate" href={link.linkUrl} hrefLang={link.language} />
            ))}
        </Helmet>
        <Header>
          <Search categories={categories} needsToClearNegativeMargin />
        </Header>
        <Body>
          <SingleColumn>
            <Article>
              {thumbnail && <Thumbnail sizes={thumbnail.sizes} />}
              <div>
                <SocialShareWrapper>
                  <SocialShare url={postUrl} title={title} />
                </SocialShareWrapper>
                <header>
                  <Meta>
                    <CategoryLink to={`/${locale}/categories/${_.kebabCase(category.title)}`} color={category.color}>
                      {category.displayName}
                    </CategoryLink>
                    <StyledPostDate date={date} localDate={localDate} />
                  </Meta>
                  <Title>{title}</Title>
                </header>
                <PostBody>
                  <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
                </PostBody>
              </div>
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
                        {relatedPostsList.map(post => <PostCard post={post} key={`${post.path}+${post.locale}`} />)}
                      </RelatedPosts>
                    </RelatedPostsWrapper>
                  )}
              </PostFooter>
            </Article>
          </SingleColumn>
        </Body>
        <Footer />
      </Fragment>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $locale: String!, $category: String!, $author: String!) {
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
        frontmatter: { category: { eq: $category }, locale: { eq: $locale }, isPublished: { eq: true } }
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
    categories: allCategoriesJson(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          displayName
          color
        }
      }
    }
  }
`

export default injectIntl(PostTemplate)
