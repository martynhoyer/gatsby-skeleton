import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";
import PopularPosts from "../components/PopularPosts";
import CategoriesList from "../components/CategoriesList";
import TwoColumn from "../components/Layouts/TwoColumn";
import Sidebar from "../components/Sidebar";
import SubSidebar from "../components/SubSidebar";
import SubscribeForm from "../components/SubscribeForm";
import Box from "../components/Box";
import About from "../components/About";
import SocialFollow from "../components/SocialFollow";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

class IndexTemplate extends React.Component {
  render() {
    const {
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next
    } = this.props.pathContext;
    const popularPosts = this.props.data.popularPosts.edges;
    const categories = this.props.data.categories.edges;

    return (
      <Fragment>
        <SEO />
        <Helmet title={`Home | ${config.siteTitle}`} />
        <Header />
        <TwoColumn>
          <PaginatedContent
            page={page}
            pages={pages}
            total={total}
            limit={limit}
            prev={prev}
            next={next}
          >
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
                <CategoriesList categories={categories} />
                <SocialFollow />
              </SubSidebar>
            </Box>
          </Sidebar>
        </TwoColumn>
        <Footer />
      </Fragment>
    );
  }
}

/* eslint no-undef: "off" */
export const indexPageQuery = graphql`
  query IndexPage($locale: String!) {
    popularPosts: allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          isPopular: { eq: true }
          locale: { eq: $locale }
          isPublished: { eq: true }
        }
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
  }
`;

export default IndexTemplate;
