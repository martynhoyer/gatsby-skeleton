import React, { Fragment, Component } from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import queryString from 'query-string'
import { injectIntl } from 'react-intl'
import styled from 'styled-components';
import config from '../../data/SiteConfig.json'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Body from '../components/Layouts/Body'
import Footer from '../components/Footer'
import PostListing from '../components/PostListing'
import PaginatedContent from '../components/PaginatedContent'
import { SearchLayout, SearchResults } from '../components/Layouts/SearchLayout'
import Search from '../components/Search'
import {fontsize} from '../tokens/dimensions';

const Title = styled.h2`
  font-size: ${fontsize.lg};
  font-weight: normal;
  text-align: center;
`

const SearchQuery = styled.span`
  display: block;
  font-family: bergensans;
  font-size: ${fontsize.xxl};
  font-weight: bold;
  color: ${props => props.theme.palette.violet};
`

class SearchTemplate extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { search } = nextProps.location
    const { edges: postEdges } = nextProps.data.allMarkdownRemark
    const queries = queryString.parse(search)

    /*
    Create an array of the posts filtered by the search queries and inject it 
    into the state as the component mounts.
    */
    const filteredEdges = postEdges.filter(({ node }) => {
      /*
      Stringify the post tags array for easy query matching
      */
      const postTagsAsString = node.frontmatter.tags.toString()
      /*
      Normalise the queries
      */
      const queryLowerCased = queries.query && queries.query.toLowerCase()

      /* 
      If we have a search query in the querystring, see if its contents matches
      the post's body, title or tags
      */
      const bodyMatch = queries.query && node.html.toLowerCase().indexOf(queryLowerCased) > -1
      const titleMatch = queries.query && node.frontmatter.title.toLowerCase().indexOf(queryLowerCased) > -1
      const tagMatch = queries.query && postTagsAsString.toLowerCase().indexOf(queryLowerCased) > -1

      /*
      Also check for a match on the category from the querystring
      */
      const categoryMatch = node.frontmatter.category === queries.category

      /*
      If there's no search query, just return the posts matching the category
      */
      if (!queries.query) {
        return categoryMatch
      }

      /* 
      If there's no category set, just return the posts matching the search
      query
      */
      if (!queries.category) {
        return bodyMatch || titleMatch || tagMatch
      }

      /*
      Or if both were set, return a combined result set
      */
      return categoryMatch && (bodyMatch || titleMatch || tagMatch)
    })

    /*
    Add the filtered posts to the state and flag the search as "touched", i.e. 
    it has been interacted with so we know whether to show the "no results"
    message or not - we don't want to show "no results" if a user navigates to
    the search page with no queries.
    */
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
    const activeCategories = this.props.data.activeCategories.group
    const categoriesToList = categories.filter(cat =>
      activeCategories.find(activeCat => activeCat.fieldValue === cat.node.title),
    )
    const queries = queryString.parse(search)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem)
    const pageCountForResultSet = Math.ceil(results.length / itemsPerPage)

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
          <Search categories={categoriesToList} queries={queries} />
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
                    <Title>
                      {intl.formatMessage({ id: 'search.searchResultsLabel' })}
                      <SearchQuery>
                        {queries.query && queries.query}
                      </SearchQuery>
                    </Title>
                    <PostListing postEdges={currentItems} />
                  </PaginatedContent>
                </Fragment>
              ) : (
                <Fragment>
                  {!_.isEmpty(touched) ? (
                    <Title>
                      {intl.formatMessage({ id: 'search.noResultsLabel' })}
                      <SearchQuery>
                        {queries.query && queries.query}
                      </SearchQuery>
                    </Title>
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
      edges {
        node {
          frontmatter {
            title
            tags
            localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
            date
            category
            locale
          }
          fields {
            slug
          }
          excerpt
          html
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
    activeCategories: allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { isPublished: { eq: true }, locale: { eq: $locale } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        # totalCount
      }
    }
  }
`

export default injectIntl(SearchTemplate)
