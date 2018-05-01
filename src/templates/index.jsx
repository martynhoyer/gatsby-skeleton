import React, { Fragment } from "react";
import Script from "react-load-script";
import { Helmet } from "react-helmet";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";
import PopularPosts from "../components/PopularPosts";
import CategoriesList from "../components/CategoriesList/index";
import TwoColumn from "../components/Layouts/TwoColumn";
import Sidebar from "../components/Sidebar";
import SubscribeForm from "../components/SubscribeForm/index";
import Box from "../components/Box/index";

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
        <Helmet>
          <html lang={locale} />
        </Helmet>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
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
            <Box>
              <SubscribeForm locale={locale} whitepaper />
            </Box>
            <Box>
              <SubscribeForm locale={locale} />
            </Box>
            <Box>
              <PopularPosts popularPosts={popularPosts} />
              <CategoriesList categories={categories} locale={locale} />
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
