import React, { Fragment } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Body from '../components/Layouts/Body'
import Footer from '../components/Footer'
import PopularPosts from '../components/PopularPosts'
import CategoriesList from '../components/CategoriesList'
import TwoColumn from '../components/Layouts/TwoColumn'
import Sidebar from '../components/Sidebar'
import SubSidebar from '../components/SubSidebar'
import SubscribeForm from '../components/SubscribeForm'
import Box from '../components/Box'
import About from '../components/About'
import SocialFollow from '../components/SocialFollow'
import Search from '../components/Search'
import { fontsize } from '../tokens/dimensions'

const Heading = styled.h1`
  font-size: ${fontsize.xxl};
  text-align: center;
  color: ${props => props.theme.palette.noir};
`

class NotFoundPage extends React.Component {
  render() {
    const popularPosts = this.props.data.popularPosts.edges
    const categories = this.props.data.categories.edges
    return (
      <Fragment>
        <Header>
          <TwoColumn noHorizontalPadding />
          <Search categories={categories} needsToClearNegativeMargin />
        </Header>
        <Body>
          <TwoColumn>
            <div>
              <Heading>404: Page not found</Heading>
            </div>
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
                  <CategoriesList categories={categories} />
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
export const notFoundPageQuery = graphql`
  query NotFoundPage {
    popularPosts: allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { isPopular: { eq: true }, locale: { eq: "fr" }, isPublished: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            locale
            localDate: date(locale: "fr", formatString: "DD MMMM YYYY")
            date
          }
          fields {
            slug
          }
        }
      }
    }
    categories: allCategoriesJson(filter: { locale: { eq: "fr" } }) {
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

export default NotFoundPage
