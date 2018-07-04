import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import Link from 'gatsby-link'
import { injectIntl } from 'react-intl'
import spacing from '../../tokens/dimensions'
import Navigation from '../Navigation'
import { ReactComponent as LogoSvg } from '../../svg/logo.svg'
import MobileNavigation from '../MobileNavigation/index'
import media from '../../tokens/breakpoints';

const StyledHeader = styled.header`
  padding: ${spacing.sm} ${spacing.md} ${spacing.xl};
  background-color: ${props => props.theme.palette.violet};
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.palette.violet},
    ${props => props.theme.palette.rose} 200%
  );
  color: ${props => props.theme.palette.blanc};

  @media (${media.md}) {
    padding: ${spacing.md};
  }
`

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.2em;
`

const Logo = styled.a`
  max-width: ${424 / 2.8}px;
  margin-bottom: 5px; /* To align with baseline of menu text */
  margin-left: -${spacing.sm};
  padding: ${spacing.base} ${spacing.sm};
  color: inherit;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${spacing.xs} ${props => transparentize(0.5, props.theme.palette.blanc)};
  }

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  @media (${media.md}) {
    max-width: ${424 / 2.2}px;
    margin-bottom: 3px; /* To align with baseline of menu text */
  }
`

const ChildrenWrapper = styled.div`
  width: 100%;
`

const Header = ({ intl, children }) => {
  const { locale } = intl
  return (
    <StyledHeader>
      <Container>
        <TopBar>
          <Logo href={`https://www.gymlib.com`}>
            <LogoSvg />
          </Logo>
          <MobileNavigation />
          <Navigation />
        </TopBar>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Container>
    </StyledHeader>
  )
}

export default injectIntl(Header)
