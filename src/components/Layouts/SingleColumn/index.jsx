import React from "react";
import styled from "styled-components";
import media from "../../../tokens/breakpoints";

const StyledSingleColumn = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 24px 24px;

  @media (${media.md}) {
    max-width: 1024px;
  }
`;

const SingleColumn = ({ children }) => (
  <StyledSingleColumn>{children}</StyledSingleColumn>
);

export default SingleColumn;
