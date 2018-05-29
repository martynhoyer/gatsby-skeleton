import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import { navigateTo } from 'gatsby-link'
import Cookies from 'universal-cookie'
import MenuButton from 'react-menu-button'
import { injectIntl } from 'react-intl'
import config from '../../../data/SiteConfig.json'
import { ReactComponent as Globe } from '../../svg/globe.svg'
import spacing from '../../tokens/dimensions'

const cookies = new Cookies()

const bottomButton = ({ isBottom }) =>
  isBottom
    ? css`
        & > button {
          &::after {
            content: '▲';
          }
        }

        & > div {
          bottom: 100%;
        }
      `
    : css`
        & > button {
          &::after {
            content: '▼';
          }
        }

        & > div {
          top: 100%;
        }
      `

const StyledMenuButton = styled(MenuButton)`
  ${bottomButton};

  position: relative;
  color: currentColor;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin: 0;
    padding: 0.5em 1em;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    border: 0;
    background-color: inherit;
    color: inherit;

    & > span {
      display: none;
    }

    &::after {
      display: inline-block;
      margin-left: 1em;
      line-height: 1;
      font-size: 0.6em;
    }
  }

  & > div {
    position: absolute;
    min-width: 100%;
    margin-top: 0.5em;
    border-radius: ${spacing.xs};
    box-shadow: ${props => props.theme.shadows.default};
    background-color: ${props => props.theme.palette.blanc};
    overflow: hidden;
    z-index: 1;
  }
`

const StyledGlobe = styled(Globe)`
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  vertical-align: middle;
  fill: currentColor;
`

const isCurrent = ({ current }) =>
  current &&
  css`
    &::after {
      content: '✓';
      position: absolute;
      display: block;
      right: ${spacing.sm};
      top: 50%;
      margin-top: -0.5em;
      line-height: 1;
    }
  `

const ItemButton = styled.button`
  ${isCurrent};

  position: relative;
  width: 100%;
  margin: 0;
  padding: 0.75em 1em;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  border: 0;
  text-align: center;
  background-color: inherit;
  color: ${props => props.theme.palette.grisLight};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.palette.rose};
    color: ${props => props.theme.palette.blanc};
    outline: none;
  }
`

class LanguageSelection extends Component {
  state = { choice: null }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside)
    this.menu.on('choose', choice => {
      this.setState({ choice: choice.value })
    })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleLocaleClick = e => {
    cookies.set('lang', e.target.value, {
      path: '/',
    })
    navigateTo(`/${this.state.choice}/`)
  }

  saveMenuRef = ref => {
    this.menu = ref
  }

  handleClickOutside = e => {
    if (this.menu.button === e.target) {
      return
    }
    this.menu.close()
  }

  render() {
    const { intl, isBottom, id } = this.props
    return (
      <StyledMenuButton
        isBottom={isBottom}
        id={id}
        label={
          <Fragment>
            <StyledGlobe />
            {intl.formatMessage({
              id: 'global.languagesLabel',
            })}
          </Fragment>
        }
        menuRef={this.saveMenuRef}>
        {config.locales.map(locale => (
          <ItemButton current={intl.locale === locale} key={locale} onClick={this.handleLocaleClick} value={locale}>
            {locale}
          </ItemButton>
        ))}
      </StyledMenuButton>
    )
  }
}

export default injectIntl(LanguageSelection)
