import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

const StyledHeader = styled.header`
  height: 300px;
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.palette.violet},
    ${props => props.theme.palette.rose} 200%
  );
  color: ${props => props.theme.palette.blanc};
`;

const Header = ({ children }) => (
  <StyledHeader>
    <h1>
      <FormattedMessage id="hello" />
    </h1>
    <h1>
      <FormattedMessage id="header.test" />
    </h1>
    {children}
  </StyledHeader>
);

export default Header;
