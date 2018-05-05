import React from "react";
import styled from "styled-components";
import media from "../../tokens/breakpoints";
import { boxPadding } from "../../tokens/dimensions";

const StyledBox = styled.div`
  padding: ${boxPadding.xs.y} ${boxPadding.xs.x};
  box-shadow: ${props => props.theme.shadows.default};
  background-color: ${props => props.theme.palette.blanc};

  @media (${media.md}) {
    padding-right: ${boxPadding.md.x};
    padding-left: ${boxPadding.md.x};
  }
`;

const Box = ({ children }) => <StyledBox>{children}</StyledBox>;

export default Box;
