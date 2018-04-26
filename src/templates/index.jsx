import React, { Fragment } from "react";
import Script from "react-load-script";
import styled from "styled-components";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";
import PopularPosts from "../components/PopularPosts";
import CategoriesList from "../components/CategoriesList/index";
import media from "../tokens/breakpoints";
import Box from "../components/Box/index";

const BodyWrapper = styled.div`
  display: grid;
  grid-gap: 24px;

  @media (${media.md}) {
    grid-template-columns: 3fr 1fr;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  grid-gap: 16px;
  align-content: start;
`;

class IndexTemplate extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

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
    const categories = this.props.data.categories.group;

    return (
      <Fragment>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <BodyWrapper>
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
            <Box>
              <PopularPosts popularPosts={popularPosts} />
            </Box>
            <Box>
              <CategoriesList categories={categories} locale={locale} />
            </Box>
          </Sidebar>
        </BodyWrapper>
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
            date
          }
          fields {
            slug
          }
        }
      }
    }
    categories: allMarkdownRemark(
      filter: { frontmatter: { locale: { eq: $locale } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default IndexTemplate;
