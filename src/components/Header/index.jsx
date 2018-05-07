import React from "react";
import styled from "styled-components";
import spacing from "../../tokens/dimensions";
import Navigation from "../Navigation";

const StyledHeader = styled.header`
  height: 300px;
  padding: ${spacing.xl} ${spacing.md};
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.palette.violet},
    ${props => props.theme.palette.rose} 200%
  );
  color: ${props => props.theme.palette.blanc};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 1440px;
  margin: 0 auto;
`;

const Logo = styled.div``;

const Header = () => (
  <StyledHeader>
    <Container>
      <Logo>Gymlib</Logo>
      <Navigation />
    </Container>
  </StyledHeader>
);

export default Header;
