import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import { injectIntl } from "react-intl";
import spacing from "../../tokens/dimensions";
import Navigation from "../Navigation";
import { ReactComponent as LogoSvg } from "../../svg/logo.svg";

const StyledHeader = styled.header`
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
  align-items: center;
  flex-wrap: wrap;

  max-width: 1440px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  flex-shrink: 0;

  width: ${424 / 2.5}px;
  height: ${88 / 2.5}px;
  & > svg {
    fill: white;
  }
`;

const ChildrenWrapper = styled.div`
  width: 100%;
`;

const Header = ({ intl, children }) => {
  const { locale } = intl;
  return (
    <StyledHeader>
      <Container>
        <Logo to={`/${locale}/`}>
          <LogoSvg />
        </Logo>
        <Navigation />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Container>
    </StyledHeader>
  );
};

export default injectIntl(Header);
