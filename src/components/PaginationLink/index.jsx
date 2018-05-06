import React from "react";
import Link from "gatsby-link";
import styled, { css } from "styled-components";
import spacing from "../../tokens/dimensions";

const arrowDirection = ({ prev }) =>
  prev
    ? css`
        &::before {
          content: "\u2190";
          margin-right: ${spacing.md};
        }
      `
    : css`
        &::after {
          content: "\u2192";
          margin-left: ${spacing.md};
        }
      `;

const StyledLink = styled(Link)`
  ${arrowDirection};

  text-decoration: none;
  color: ${props => props.theme.palette.noir};

  &::before,
  &::after {
    color: ${props => props.theme.palette.rose};
  }
`;

class PaginationLink extends React.Component {
  render() {
    if (this.props.url) {
      return (
        <StyledLink prev={this.props.prev} to={this.props.url}>
          {this.props.text}
        </StyledLink>
      );
    }
    return null;
  }
}

export default PaginationLink;
