import React, { Fragment } from "react";
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

const PageButton = styled.button`
  width: ${spacing.lg};
  height: ${spacing.lg};
  margin: ${spacing.sm};
  padding: ${spacing.sm};
  border: inherit;
  font-size: inherit;
  line-height: 1;
  border-radius: 50%;
  text-decoration: none;
  background-color: inherit;
  color: ${props => props.theme.palette.noir};
`;

class Pagination extends React.Component {
  render() {
    const {
      page,
      pages,
      prev,
      next,
      isSearchResults,
      handleButtonClick
    } = this.props;
    if (isSearchResults) {
      const pageAsNumber = Number(page);
      return (
        <Container>
          {pageAsNumber > 1 && (
            <Fragment>
              <PageButton onClick={handleButtonClick} value={pageAsNumber - 1}>
                &larr;
              </PageButton>

              {pageAsNumber > 2 && (
                <PageButton
                  onClick={handleButtonClick}
                  value={pageAsNumber - 2}
                >
                  {pageAsNumber - 2}
                </PageButton>
              )}
              <PageButton onClick={handleButtonClick} value={pageAsNumber - 1}>
                {pageAsNumber - 1}
              </PageButton>
            </Fragment>
          )}
          <CurrentPage>{page}</CurrentPage>
          {pageAsNumber < pages && (
            <Fragment>
              <PageButton onClick={handleButtonClick} value={pageAsNumber + 1}>
                {pageAsNumber + 1}
              </PageButton>
              {pageAsNumber < pages - 1 && (
                <PageButton
                  onClick={handleButtonClick}
                  value={pageAsNumber + 2}
                >
                  {pageAsNumber + 2}
                </PageButton>
              )}
              <PageButton onClick={handleButtonClick} value={pageAsNumber + 1}>
                &rarr;
              </PageButton>
            </Fragment>
          )}
        </Container>
      );
    }

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
