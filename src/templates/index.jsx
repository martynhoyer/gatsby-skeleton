import React from "react";
import Script from "react-load-script";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";

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
      next
    } = this.props.pathContext;
    const popularPosts = this.props.data.popularPosts.edges;

    return (
      <div>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <PaginatedContent
          page={page}
          pages={pages}
          total={total}
          limit={limit}
          prev={prev}
          next={next}
        >
          {/* PostListing component renders all the posts */}
          <PostListing postEdges={nodes} />
        </PaginatedContent>
        <aside>
          {popularPosts.map(({ node: popularPost }) => (
            <a
              key={popularPost.id}
              href={`/${popularPost.frontmatter.locale}${
                popularPost.fields.slug
              }`}
            >
              {popularPost.frontmatter.title}
            </a>
          ))}
        </aside>
      </div>
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
