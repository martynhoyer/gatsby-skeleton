import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";

class AuthorTemplate extends React.Component {
  render() {
    const { author } = this.props.pathContext;
    const postEdges =
      this.props.data.allMarkdownRemark &&
      this.props.data.allMarkdownRemark.edges
        ? this.props.data.allMarkdownRemark.edges
        : [];
    const authorsEdges =
      this.props.data.allAuthorsJson && this.props.data.allAuthorsJson.edges
        ? this.props.data.allAuthorsJson.edges
        : [];

    return (
      <div>
        <Helmet title={`Posts by "${author}" | ${config.siteTitle}`} />

        {/* PostListing component renders all the posts */}
        <PostListing postEdges={postEdges} postAuthors={authorsEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query AuthorPage($author: String, $locale: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author } } }
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
            localDate: date(locale: $locale, formatString: "DD MMMM YYYY")
            date
            author
            locale
          }
        }
      }
    }
    allAuthorsJson(filter: { id: { eq: $author } }) {
      edges {
        node {
          title
          displayName
        }
      }
    }
  }
`;

export default AuthorTemplate;
