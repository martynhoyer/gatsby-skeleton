import React from "react";
import styled from "styled-components";
import media from "../../../tokens/breakpoints";

const StyledTwoColumn = styled.div`
  display: grid;
  grid-gap: 24px;

  margin-right: auto;
  margin-left: auto;
  padding: 24px 24px;

  @media (${media.md}) {
    grid-template-columns: 3fr 1fr;

    max-width: 1024px;
  }
`;

const TwoColumn = ({ children }) => (
  <StyledTwoColumn>{children}</StyledTwoColumn>
);

export default TwoColumn;
