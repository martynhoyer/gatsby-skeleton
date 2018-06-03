import React, { Fragment, Component } from 'react'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import Header from '../components/Header'
import Body from '../components/Layouts/Body'
import Footer from '../components/Footer'
import PostListing from '../components/PostListing'
import PaginatedContent from '../components/PaginatedContent'
import PopularPosts from '../components/PopularPosts'
import CategoriesList from '../components/CategoriesList'
import TwoColumn from '../components/Layouts/TwoColumn'
import Sidebar from '../components/Sidebar'
import SubSidebar from '../components/SubSidebar'
import SubscribeForm from '../components/SubscribeForm'
import Box from '../components/Box'
import About from '../components/About'
import SocialFollow from '../components/SocialFollow'
import SEO from '../components/SEO'
import Search from '../components/Search'

class IndexTemplate extends Component {
  render() {
    const { intl } = this.props
    const { nodes, page, pages, limit, prev, next } = this.props.pathContext
    const popularPosts = this.props.data.popularPosts.edges
    const categories = this.props.data.categories.edges
    const activeCategories = this.props.data.activeCategories.group
    const categoriesToList = categories.filter(cat =>
      activeCategories.find(activeCat => activeCat.fieldValue === cat.node.title),
    )

    const globalSiteTitle =
      intl.messages['global.seo.siteTitle'] &&
      intl.formatMessage({
        id: 'global.seo.siteTitle',
      })

    const pageTitle = intl.formatMessage({
      id: 'global.pageTitles.home',
    })

    return (
      <Fragment>
        <SEO />
        <Helmet title={`${pageTitle} | ${globalSiteTitle}`} />
        <Header>
          <TwoColumn noHorizontalPadding>
            <Search categories={categoriesToList} needsToClearNegativeMargin />
          </TwoColumn>
        </Header>
        <Body>
          <TwoColumn>
            <PaginatedContent page={page} pages={pages} limit={limit} prev={prev} next={next}>
              {/* PostListing component renders all the posts */}
              <PostListing postEdges={nodes} isIndex />
            </PaginatedContent>
            <Sidebar>
              <Box compact>
                <SubscribeForm formId="form-subscribe" />
              </Box>
              <Box compact>
                <SubscribeForm whitepaper formId="form-subscribe-whitepaper" />
              </Box>
              <Box compact>
                <SubSidebar>
                  <About />
                  <PopularPosts popularPosts={popularPosts} />
                  <CategoriesList categories={categoriesToList} />
                  <SocialFollow />
                </SubSidebar>
              </Box>
            </Sidebar>
          </TwoColumn>
        </Body>
        <Footer />
      </Fragment>
    )
  }
}

/* eslint no-undef: "off" */
export const indexPageQuery = graphql`
  query IndexPage($locale: String!) {
    popularPosts: allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { isPopular: { eq: true }, locale: { eq: $locale }, isPublished: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            locale
            localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
            date
          }
          fields {
            slug
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

export default injectIntl(IndexTemplate)
