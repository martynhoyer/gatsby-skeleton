import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import spacing from "../../tokens/dimensions";

const StyledLink = styled(Link)`
  width: ${spacing.lg};
  height: ${spacing.lg};
  margin: ${spacing.sm};
  padding: ${spacing.sm};
  line-height: 1;
  border-radius: 50%;
  text-decoration: none;
  color: ${props => props.theme.palette.noir};
`;

class PaginationLink extends React.Component {
  render() {
    if (this.props.url) {
      return <StyledLink to={this.props.url}>{this.props.text}</StyledLink>;
    }
    return null;
  }
}

export default PaginationLink;
