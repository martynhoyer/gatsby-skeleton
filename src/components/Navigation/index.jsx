import React from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import Link from 'gatsby-link'
import LanguageSelection from '../LanguageSelection'
import media from '../../tokens/breakpoints'

const Container = styled.nav`
  display: none;

  @media (${media.md}) {
    display: block;
  }
`

const NavList = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;
  list-style: none;
`

const NavItem = styled.li`
  margin-left: 1em;
`

const ExternalLink = styled.a`
  display: flex;
  align-items: center;

  padding: 0.5em;
  text-decoration: none;
  white-space: nowrap;
  color: ${props => props.theme.palette.blanc};
`

const Navigation = ({ intl }) => {
  const { messages } = intl
  return (
    <Container>
      <NavList>
        <NavItem>
          <ExternalLink href={messages['navigation.home.linkUrl']}>{messages['navigation.home.linkText']}</ExternalLink>
        </NavItem>
        <NavItem>
          <ExternalLink href={messages['navigation.offers.linkUrl']}>
            {messages['navigation.offers.linkText']}
          </ExternalLink>
        </NavItem>
        <NavItem>
          <LanguageSelection id="topbarLangSelection" />
        </NavItem>
      </NavList>
    </Container>
  )
}

export default injectIntl(Navigation)
