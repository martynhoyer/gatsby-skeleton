import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
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

class IndexTemplate extends React.Component {
  render() {
    const {
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next,
      locale
    } = this.props.pathContext;
    const popularPosts = this.props.data.popularPosts.edges;
    const categories = this.props.data.categories.edges;

    return (
      <Fragment>
        <Helmet>
          <html lang={locale} />
        </Helmet>
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
              <SubscribeForm locale={locale} formId="form-subscribe" />
            </Box>
            <Box compact>
              <SubscribeForm
                locale={locale}
                whitepaper
                formId="form-subscribe-whitepaper"
              />
            </Box>
            <Box compact>
              <SubSidebar>
                <About />
                <PopularPosts popularPosts={popularPosts} locale={locale} />
                <CategoriesList categories={categories} locale={locale} />
                <SocialFollow />
              </SubSidebar>
            </Box>
          </Sidebar>
        </TwoColumn>
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
        frontmatter: { isPopular: { eq: true }, locale: { eq: $locale } }
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
