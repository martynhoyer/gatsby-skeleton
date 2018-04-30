import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";
import PaginatedContent from "../components/PaginatedContent";
import PopularPosts from "../components/PopularPosts";
import CategoriesList from "../components/CategoriesList";
import Sidebar from "../components/Sidebar";
import TwoColumn from "../components/Layouts/TwoColumn";

class TagTemplate extends React.Component {
  render() {
    const {
      tag,
      category,
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next,
      locale
    } = this.props.pathContext;
    const authorsEdges = this.props.data.authors.edges;
    const popularPosts = this.props.data.popularPosts.edges;
    const categories = this.props.data.categories.group;
    const pageTitle = category
      ? `Posts categorised with "${category}"`
      : `Posts tagged as "${tag}"`;
    return (
      <TwoColumn>
        <Helmet title={`${pageTitle} | ${config.siteTitle}`}>
          <html lang={locale} />
        </Helmet>
        <div>
          <h1>{category || tag}</h1>
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
          <PopularPosts popularPosts={popularPosts} />
          <CategoriesList categories={categories} locale={locale} />
        </Sidebar>
      </TwoColumn>
    );
  }
}

/* eslint no-undef: "off" */
export const tagPageQuery = graphql`
  query TagPage($locale: String!) {
    authors: allAuthorsJson {
      edges {
        node {
          id
          name
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

export default TagTemplate;
