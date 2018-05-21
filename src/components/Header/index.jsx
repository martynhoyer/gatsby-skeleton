import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { injectIntl } from 'react-intl'
import spacing from '../../tokens/dimensions'
import Navigation from '../Navigation'
import { ReactComponent as LogoSvg } from '../../svg/logo.svg'
import MobileNavigation from '../MobileNavigation/index'

const StyledHeader = styled.header`
  padding: ${spacing.xl} ${spacing.md};
  background-color: ${props => props.theme.palette.violet};
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.palette.violet},
    ${props => props.theme.palette.rose} 200%
  );
  color: ${props => props.theme.palette.blanc};
`

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  max-width: ${424 / 2.5}px;
  color: inherit;

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
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
          <Logo to={`/${locale}/`}>
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
