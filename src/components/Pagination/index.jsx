import React from "react";
import styled from "styled-components";
import PaginationLink from "../PaginationLink";
import spacing from "../../tokens/dimensions";

const Container = styled.nav`
  display: flex;
  justify-content: center;

  margin-top: ${spacing.xxl};
  text-align: center;
  color: ${props => props.theme.palette.noir};
`;

const CurrentPage = styled.span`
  width: ${spacing.lg};
  height: ${spacing.lg};
  margin: ${spacing.sm};
  padding: ${spacing.sm};
  line-height: 1;
  border-radius: 50%;
  background-color: ${props => props.theme.palette.rose};
  color: ${props => props.theme.palette.blanc};
`;

class Pagination extends React.Component {
  render() {
    const { page, pages, prev, next } = this.props;

    const getUrlRoot = string => {
      if (string === undefined) return null;
      const arrayFromString = string.split("/");
      arrayFromString.pop();
      const urlRoot = arrayFromString.join("/");
      return urlRoot;
    };

    const urlRoot = getUrlRoot(next || prev);
    const nextAsNumber = next && Number(next.split("/").pop());
    const prevAsNumber = prev && Number(prev.split("/").pop());
    const nextPlusOneUrl =
      nextAsNumber < pages && `${urlRoot}/${nextAsNumber + 1}`;
    const prevMinusOneUrl =
      prevAsNumber > 1 &&
      `${urlRoot}/${prevAsNumber - 1 === 1 ? "" : prevAsNumber - 1}`;

    return (
      <Container>
        <PaginationLink url={prev} prev text="&larr;" />
        <PaginationLink url={prevMinusOneUrl} text={page - 2} />
        <PaginationLink url={prev} prev text={page - 1} />
        <CurrentPage>{page}</CurrentPage>
        <PaginationLink url={next} text={page + 1} />
        <PaginationLink url={nextPlusOneUrl} text={page + 2} />
        <PaginationLink url={next} text="&rarr;" />
      </Container>
    );
  }
}

export default Pagination;
