import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";
import PaginatedContent from "../components/PaginatedContent";

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
      next
    } = this.props.pathContext;
    const authorsEdges = this.props.data.authors.edges;
    const pageTitle = category
      ? `Posts categorised with "${category}"`
      : `Posts tagged as "${tag}"`;
    return (
      <div>
        <Helmet title={`${pageTitle} | ${config.siteTitle}`} />
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
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            locale
          }
        }
      }
    }
    # authors
    authors: allAuthorsJson {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export default TagTemplate;
