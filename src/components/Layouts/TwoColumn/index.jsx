import React from "react";
import styled from "styled-components";
import media from "../../../tokens/breakpoints";
import spacing from "../../../tokens/dimensions";

const StyledTwoColumn = styled.div`
  display: grid;
  grid-gap: ${spacing.md};

  margin-right: auto;
  margin-left: auto;
  padding: ${spacing.md} ${spacing.md} 0;

  @media (${media.md}) {
    grid-template-columns: 5fr 2fr;

    max-width: 1200px;
  }
`;

const TwoColumn = ({ children }) => (
  <StyledTwoColumn>{children}</StyledTwoColumn>
);

export default TwoColumn;
