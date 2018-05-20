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

const StyledCopyright = styled(Copyright)`
  padding: 0.5em 0;
`;

const Footer = () => (
  <StyledFooter>
    <Container>
      <StyledCopyright />
      <LanguageSelection isBottom id="footerLangSelection" />
    </Container>
  </StyledFooter>
);

export default Footer;
