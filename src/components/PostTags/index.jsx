import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import spacing, { fontsize } from "../../tokens/dimensions";

const Container = styled.div`
  margin-top: ${spacing.xxl};
  text-align: center;
`;

const Heading = styled.h2`
  margin: 0 0 ${spacing.base};
  font-size: ${fontsize.md};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.grisLight};
`;

class PostTags extends Component {
  render() {
    const { tags, locale } = this.props;
    if (tags) {
      return (
        <Container>
          <Heading>
            <FormattedMessage id="post.tagsHeading" />
          </Heading>
          {tags.map((tag, index, arr) => (
            <span key={tag}>
              <StyledLink key={tag} to={`/${locale}/tags/${_.kebabCase(tag)}`}>
                {tag}
              </StyledLink>
              {index !== arr.length - 1 ? ", " : ""}
            </span>
          ))}
        </Container>
      );
    }
    return null;
  }
}

export default PostTags;
