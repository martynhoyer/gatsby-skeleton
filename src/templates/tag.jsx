import React, { Fragment } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import config from "../../data/SiteConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";
import PopularPosts from "../components/PopularPosts";
import CategoriesList from "../components/CategoriesList";
import Sidebar from "../components/Sidebar";
import TwoColumn from "../components/Layouts/TwoColumn";
import Box from "../components/Box";
import SubscribeForm from "../components/SubscribeForm";
import About from "../components/About";
import SocialFollow from "../components/SocialFollow";
import SubSidebar from "../components/SubSidebar";
import { fontsize } from "../tokens/dimensions";

const Heading = styled.h1`
  font-size: ${fontsize.xxl};
  text-align: center;
  color: ${props =>
    props.color === "default" ? props.theme.palette.noir : props.color};
`;

class TagTemplate extends React.Component {
  render() {
    const {
      tag,
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next
    } = this.props.pathContext;
    const authorsEdges = this.props.data.authors.edges;
    const popularPosts = this.props.data.popularPosts.edges;
    const categories = this.props.data.categories.edges;
    const { category } = this.props.data;

    const pageTitle = tag
      ? `Posts tagged as "${tag}"`
      : `Posts categorised with "${category.displayName}"`;

    const pageTitleColor = (tag && "default") || (category && category.color);
    return (
      <Fragment>
        <Header />
        <TwoColumn>
          <Helmet title={`${pageTitle} | ${config.siteTitle}`} />
          <div>
            <Heading color={pageTitleColor}>
              {tag || (category && category.displayName)}
            </Heading>
            <PaginatedContent
              page={page}
              pages={pages}
              total={total}
              limit={limit}
              prev={prev}
              next={next}
            >
              {/* PostListing component renders all the posts */}
              <PostListing postEdges={nodes} postAuthors={authorsEdges} />
            </PaginatedContent>
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
        <Footer />
      </Fragment>
    );
  }
}

/* eslint no-undef: "off" */
export const tagPageQuery = graphql`
  query TagPage($locale: String!, $category: String) {
    authors: allAuthorsJson {
      edges {
        node {
          title
          displayName
        }
      }
    }
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
    category: categoriesJson(
      title: { eq: $category }
      locale: { eq: $locale }
    ) {
      displayName
      color
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

export default TagTemplate;
