import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";
import Link from "gatsby-link";
import config from "../../data/SiteConfig";
import PostDate from "../components/PostDate";
import PostTags from "../components/PostTags";

function parsePost(post, slug) {
  const result = post;
  if (!result.id) {
    result.id = slug;
  }
  if (!result.id) {
    result.category_id = config.postDefaultCategoryID;
  }
  return result;
}

class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.markdownRemark;
    const post = parsePost(postNode.frontmatter, slug);
    const { locale, title, date, tags, category } = post;

    return (
      <div>
        <Helmet title={`${title} | ${config.siteTitle}`} />
        <article>
          <header>
            <h1 className="post-title">{title}</h1>
            <Link to={`/${locale}/categories/${_.kebabCase(category)}`}>
              {category}
            </Link>
            <PostDate date={date} />
          </header>

          <section
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />

          <footer>
            <PostTags prefix="Tags" tags={tags} locale={locale} />
            Author
          </footer>
        </article>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
        author
        locale
      }
      fields {
        slug
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

export default PostTemplate;
