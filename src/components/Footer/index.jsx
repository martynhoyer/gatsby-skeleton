import React from "react";
import styled from "styled-components";
import spacing from "../../tokens/dimensions";
import Copyright from "../Copyright";
import LanguageSelection from "../LanguageSelection";

const StyledFooter = styled.footer`
  padding: 24px 0;
  background-color: ${props => props.theme.palette.violet};
  color: ${props => props.theme.palette.blanc};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.md};
`;

const Footer = () => (
  <StyledFooter>
    <Container>
      <Copyright />
      <LanguageSelection />
    </Container>
  </StyledFooter>
);

export default Footer;
