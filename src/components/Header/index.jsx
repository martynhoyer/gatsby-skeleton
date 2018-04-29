import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 300px;
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.palette.violet},
    ${props => props.theme.palette.rose} 200%
  );
  color: ${props => props.theme.palette.blanc};
`;

const Header = ({ children }) => <StyledHeader>{children}</StyledHeader>;

export default Header;
