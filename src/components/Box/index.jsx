import React from "react";
import styled from "styled-components";
import media from "../../tokens/breakpoints";

const StyledBox = styled.div`
  padding: 32px 24px;
  box-shadow: 2.8px 2.8px 5.6px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (${media.md}) {
    padding-right: 48px;
    padding-left: 48px;
  }
`;

const Box = ({ children }) => <StyledBox>{children}</StyledBox>;

export default Box;
