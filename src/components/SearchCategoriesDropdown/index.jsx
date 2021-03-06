import React, { Component } from 'react'
import MenuButton from 'react-menu-button'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { transparentize } from 'polished'
import spacing from '../../tokens/dimensions'
import media from '../../tokens/breakpoints'
import { ReactComponent as Tick } from '../../svg/tick.svg'

const StyledMenuButton = styled(MenuButton)`
  position: relative;
  color: currentColor;

  & > button {
    width: 100%;
    margin: 0;
    padding: 0.25em 1em;
    border: 1px solid currentColor;
    border-radius: 2em;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    white-space: nowrap;
    background-color: inherit;
    color: inherit;

    & > span {
      display: none;
    }

    &::after {
      content: '▼';
      display: inline-block;
      margin-left: 1em;
      line-height: 1;
      font-size: 0.6em;
      vertical-align: middle;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 ${spacing.xs} ${props => transparentize(0.5, props.theme.palette.blanc)};

      &::-moz-focus-inner {
        border:0;
      }
    }
  }

  & > div {
    position: absolute;
    top: 100%;
    min-width: 100%;
    margin-top: 0.5em;
    border-radius: ${spacing.xs};
    box-shadow: ${props => props.theme.shadows.default};
    background-color: ${props => props.theme.palette.blanc};
    overflow: hidden;
    z-index: 1;
  }

  @media (${media.sm}) {
    & > button {
      padding: 0.5em 1.5em;
    }
  }

  @media (${media.md}) {
    flex-shrink: 0;

    & > button {
      padding: 1em 1.5em;
    }
  }
`

const ItemButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.75em 1.5em;
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
    transition: 250ms;

    &::-moz-focus-inner {
      border:0;
    }
  }
`

const StyledTick = styled(Tick)`
  position: absolute;
  display: block;
  right: ${spacing.sm};
  top: 50%;
  margin-top: -0.5em;
`

class SearchCategoriesDropdown extends Component {
  state = { choice: null }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside)
    this.menu.on('choose', choice => {
      this.setState({ choice: choice.innerText })
    })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  onCategorySelect = e => {
    this.props.onCategorySelect(e)
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
    const { categories, categoryQuery = null, intl } = this.props
    const allCategoriesLabel = intl.formatMessage({
      id: 'search.allCategoriesLabel',
    })

    const queriedCategory = categories.find(({ node: cat }) => cat.title === categoryQuery)

    let label = (queriedCategory && queriedCategory.node.displayName) || allCategoriesLabel

    if (this.state.choice) {
      label = this.state.choice
    }

    return (
      <StyledMenuButton id="categories" label={label} menuRef={this.saveMenuRef}>
        <ItemButton type="button" value="all" onClick={this.onCategorySelect}>
          {allCategoriesLabel}
        </ItemButton>
        {categories.map(({ node: category }) => (
          <ItemButton type="button" onClick={this.onCategorySelect} key={category.title} value={category.title}>
            {category.displayName}
            {this.state.choice === category.displayName && <StyledTick />}
          </ItemButton>
        ))}
      </StyledMenuButton>
    )
  }
}

export default injectIntl(SearchCategoriesDropdown)
