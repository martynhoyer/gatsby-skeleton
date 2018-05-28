import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import queryString from 'query-string'
import { injectIntl } from 'react-intl'
import config from '../../data/SiteConfig'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Body from '../components/Layouts/Body'
import Footer from '../components/Footer'
import PostListing from '../components/PostListing'
import PaginatedContent from '../components/PaginatedContent'
import { SearchLayout, SearchResults } from '../components/Layouts/SearchLayout'
import Search from '../components/Search'

class SearchTemplate extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { search } = nextProps.location
    const { edges: postEdges } = nextProps.data.allMarkdownRemark
    const queries = queryString.parse(search)

    const filteredEdges = postEdges.filter(({ node }) => {
      const bodyMatch = queries.query && node.html.toLowerCase().indexOf(queries.query.toLowerCase()) > -1
      const titleMatch = queries.query && node.frontmatter.title.toLowerCase().indexOf(queries.query.toLowerCase()) > -1
      const categoryMatch = node.frontmatter.category === queries.category
      if (!queries.query) {
        return categoryMatch
      }
      if (!queries.category) {
        return bodyMatch || titleMatch
      }
      return categoryMatch && (bodyMatch || titleMatch)
    })

    return {
      results: filteredEdges,
      touched: queries,
    }
  }

  state = {
    results: [],
    currentPage: 1,
    itemsPerPage: config.sitePaginationLimit,
    touched: false,
  }

  handleButtonClick = e => {
    this.setState({ currentPage: e.target.value })
  }

  render() {
    const { intl } = this.props
    const { results, currentPage, itemsPerPage, touched } = this.state
    const { search } = this.props.location
    const categories = this.props.data.categories.edges
    const queries = queryString.parse(search)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem)
    const pageCountForResultSet = Math.ceil(results.length / itemsPerPage)

    const searchedCategoryNode =
      !_.isEmpty(queries) &&
      queries.category &&
      categories.find(({ node: category }) => category.title === queries.category)

    const searchedCategory = searchedCategoryNode && searchedCategoryNode.node

    const globalSiteTitle =
      intl.messages['global.seo.siteTitle'] &&
      intl.formatMessage({
        id: 'global.seo.siteTitle',
      })

    const pageTitle = intl.formatMessage({
      id: 'global.pageTitles.search',
    })

    return (
      <Fragment>
        <SEO />
        <Helmet title={`${pageTitle} | ${globalSiteTitle}`} />
        <Header>
          <Search categories={categories} queries={queries} />
        </Header>
        <Body>
          <SearchLayout>
            <SearchResults>
              {results && results.length ? (
                <Fragment>
                  <PaginatedContent
                    page={this.state.currentPage}
                    pages={pageCountForResultSet}
                    isSearchResults
                    handleButtonClick={this.handleButtonClick}>
                    <h1>
                      {intl.formatMessage({ id: 'search.searchResultsLabel' })}{' '}
                      {queries.query &&
                        intl.formatMessage(
                          { id: 'search.queryPrefix' },
                          {
                            query: queries.query,
                          },
                        )}{' '}
                      {searchedCategory &&
                        intl.formatMessage(
                          { id: 'search.categoryPrefix' },
                          {
                            category: searchedCategory.displayName,
                          },
                        )}
                    </h1>
                    <PostListing postEdges={currentItems} />
                  </PaginatedContent>
                </Fragment>
              ) : (
                <Fragment>
                  {!_.isEmpty(touched) ? (
                    <h1>
                      {intl.formatMessage({ id: 'search.noResultsLabel' })}{' '}
                      {queries.query &&
                        intl.formatMessage(
                          { id: 'search.queryPrefix' },
                          {
                            query: queries.query,
                          },
                        )}{' '}
                      {searchedCategory &&
                        intl.formatMessage(
                          { id: 'search.categoryPrefix' },
                          {
                            category: searchedCategory.displayName,
                          },
                        )}
                    </h1>
                  ) : null}
                </Fragment>
              )}
            </SearchResults>
          </SearchLayout>
        </Body>
        <Footer />
      </Fragment>
    )
  }
}

/* eslint no-undef: "off" */
export const searchPageQuery = graphql`
  query SearchPage($locale: String!) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { locale: { eq: $locale } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            tags
            localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
            date
            category
            author
            locale
          }
          fields {
            slug
          }
          excerpt
          html
          timeToRead
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

export default injectIntl(SearchTemplate)
