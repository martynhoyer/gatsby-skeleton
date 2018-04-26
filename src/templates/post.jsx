import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";
import Link from "gatsby-link";
import config from "../../data/SiteConfig";
import PostDate from "../components/PostDate";
import PostTags from "../components/PostTags";
import AuthorModel from "../models/author-model";
import CategoryModel from "../models/category-model";

class PostTemplate extends React.Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const {
      locale,
      title,
      date,
      tags,
      category,
      author
    } = postNode.frontmatter;

    const authorData = AuthorModel.getAuthor(
      this.props.data.authors.edges,
      author,
      config.blogAuthorId
    );

    const categoryData = CategoryModel.getCategory(
      this.props.data.categories.edges,
      _.kebabCase(category),
      config.blogAuthorId
    );

    return (
      <div>
        <Helmet title={`${title} | ${config.siteTitle}`} />
        <article>
          <header>
            <h1>{title}</h1>
            <Link to={`/${locale}/categories/${_.kebabCase(category)}`}>
              <span style={{ color: categoryData.color }}>{category}</span>
            </Link>
            <PostDate date={date} />
          </header>

          <section dangerouslySetInnerHTML={{ __html: postNode.html }} />

          <footer>
            <PostTags prefix="Tags" tags={tags} locale={locale} />
            <p>{authorData.name}</p>
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
    categories: allCategoriesJson {
      edges {
        node {
          id
          color
        }
      }
    }
  }
`;

export default PostTemplate;
