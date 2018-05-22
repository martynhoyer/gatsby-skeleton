import React, { Component } from 'react'
import { navigateTo } from 'gatsby-link'
import { injectIntl } from 'react-intl'
import styled, { css } from 'styled-components'
import { hideVisually } from 'polished'
import { ReactComponent as MagnifyingGlass } from '../../svg/magnifying-glass.svg'
import SearchCategoriesDropdown from '../SearchCategoriesDropdown'
import spacing from '../../tokens/dimensions'
import media from '../../tokens/breakpoints'

const formBottomPadding = ({ needsToClearNegativeMargin }) =>
  needsToClearNegativeMargin &&
  css`
    padding-bottom: ${spacing.xxl};
  `

const Form = styled.form`
  ${formBottomPadding};

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  padding-top: 2em;
  font-weight: bold;
  color: ${props => props.theme.palette.blanc};

  & > * {
    flex-basis: 100%;
  }

  @media (${media.md}) {
    flex-wrap: nowrap;

    margin: 0 -${spacing.xs};
    padding-top: 8em;

    & > * {
      flex-basis: auto;
    }
  }
`

const LabelWrapper = styled.label`
  position: relative;
  margin-top: 1em;

  @media (${media.md}) {
    padding: 0 ${spacing.xs};
  }
`

const Wrapper = styled.div`
  margin-top: 1em;

  @media (${media.md}) {
    flex-shrink: 0;

    padding: 0 ${spacing.xs};
  }
`

const StyledMagnifyingGlass = styled(MagnifyingGlass)`
  position: absolute;
  top: 50%;
  left: ${spacing.base};
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  fill: currentColor;
`

const Label = styled.span`
  ${hideVisually};
`

const SearchInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0.5em 1em 0.5em ${spacing.lg};
  border: 1px solid currentColor;
  border-radius: 2em;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  color: currentColor;
`

const SubmitButton = styled.button`
  width: 100%;
  margin: 0;
  padding: 0.5em 1em;
  border: 1px solid currentColor;
  border-radius: 2em;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  color: currentColor;
`

class Search extends Component {
  state = {
    searchQuery: this.props.queries.query || '',
    searchCategory: this.props.queries.category || '',
  }

  handleChange = e => {
    if (e.target.id === 'searchInput') {
      this.setState({
        searchQuery: e.target.value === 'all' ? '' : e.target.value,
      })
    } else {
      this.setState({
        searchCategory: e.target.value === 'all' ? '' : e.target.value,
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    navigateTo(
      `/${this.props.intl.locale}/search?query=${this.state.searchQuery}&category=${this.state.searchCategory}`,
    )
  }

  render() {
    const { categories, needsToClearNegativeMargin, intl } = this.props
    return (
      <Form onSubmit={this.handleSubmit} needsToClearNegativeMargin={needsToClearNegativeMargin}>
        <LabelWrapper htmlFor="searchInput">
          <StyledMagnifyingGlass />
          <Label>
            {intl.formatMessage({
              id: 'search.searchInputLabel',
            })}
          </Label>
          <SearchInput
            id="searchInput"
            name="searchQuery"
            type="text"
            onChange={this.handleChange}
            value={this.state.searchQuery}
          />
        </LabelWrapper>
        <Wrapper>
          <SearchCategoriesDropdown
            categories={categories}
            onCategorySelect={this.handleChange}
            categoryQuery={this.state.searchCategory}
          />
        </Wrapper>
        <Wrapper>
          <SubmitButton type="submit">
            {intl.formatMessage({
              id: 'search.searchButtonText',
            })}
          </SubmitButton>
        </Wrapper>
      </Form>
    )
  }
}

export default injectIntl(Search)
