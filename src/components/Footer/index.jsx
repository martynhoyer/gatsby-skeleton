import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

const StyledFooter = styled.footer`
  padding: 24px 0;
  background-color: ${props => props.theme.palette.violet};
  color: ${props => props.theme.palette.blanc};
`;

const Footer = ({ children }) => <StyledFooter>{children}</StyledFooter>;

export default Footer;
