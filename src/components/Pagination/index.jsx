import React from "react";
import styled from "styled-components";
import PaginationLink from "../PaginationLink";
import spacing from "../../tokens/dimensions";

const Container = styled.nav`
  display: grid;
  grid-gap: ${spacing.md};
  grid-template-columns: 1fr auto 1fr;

  margin-top: ${spacing.xxl};
  text-align: center;
  color: ${props => props.theme.palette.noir};
`;

class Pagination extends React.Component {
  render() {
    const { page, pages, prev, next } = this.props;
    return (
      <Container>
        <div>
          <PaginationLink url={prev} prev text="Newer posts" />
        </div>
        <span>
          Page {page} of {pages}
        </span>
        <div>
          <PaginationLink url={next} text="Older posts" />
        </div>
      </Container>
    );
  }
}

export default Pagination;
