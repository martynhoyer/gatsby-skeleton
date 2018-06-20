import React, { Component } from 'react'
import { navigateTo } from 'gatsby-link'
import { injectIntl } from 'react-intl'
import styled, { css } from 'styled-components'
import { hideVisually, transparentize } from 'polished'
import { ReactComponent as MagnifyingGlass } from '../../svg/magnifying-glass.svg'
// import SearchCategoriesDropdown from '../SearchCategoriesDropdown'
import spacing from '../../tokens/dimensions'
import media from '../../tokens/breakpoints'

const formBottomPadding = ({ needsToClearNegativeMargin }) =>
  needsToClearNegativeMargin &&
  css`
    padding-bottom: ${spacing.md};

    @media (${media.md}) {
      padding-bottom: ${spacing.xxl};
    }
  `

const Form = styled.form`
  ${formBottomPadding};

  width: 80%;
  max-width: 24rem;
  margin: 0 auto;
  padding-top: 2em;
  color: ${props => props.theme.palette.blanc};

  @media (${media.md}) {
    max-width: 40rem;
    padding-top: 8em;
  }
`

const ErrorMessage = styled.p`
  margin: 0.5em 0 0;
  font-weight: normal;
`

const FormElementsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;

  font-size: 0.857rem;

  @media (${media.sm}) {
    font-weight: bold;
  }

  @media (${media.md}) {
    & > * {
      flex-basis: auto;
    }
  }
`

const LabelWrapper = styled.label`
  flex-grow: 1;
  position: relative;
  margin-top: 1em;
`

const Wrapper = styled.div`
  flex-shrink: 0;

  margin-top: 1em;

  /*
  &:last-child {
    margin-left: 0.5em;
  }
  */
`

const Label = styled.span`
  ${hideVisually};
`

const SearchInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0.25em 1em;
  border: 1px solid currentColor;
  border-radius: 2em 0 0 2em;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  color: currentColor;

  &:focus {
    border-color: ${props => props.theme.palette.rose};
    outline: none;

    &::-moz-focus-inner {
      border:0;
    }
  }

  &::placeholder {
    color: currentColor;
    opacity: 0.7;
  }

  &:-ms-input-placeholder {
    color: currentColor;
    opacity: 0.7;
  }

  &::-ms-input-placeholder {
    color: currentColor;
    opacity: 0.7;
  }

  @media (${media.sm}) {
    padding: 0.5em 1.5em;
  }

  @media (${media.md}) {
    padding: 1em 1.5em;
  }
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0.25em 1em;
  border-width: 1px 1px 1px 0;
  border-style: solid;
  border-color: currentColor;
  border-radius: 0 2em 2em 0;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  color: currentColor;

  &:focus {
    border-color: ${props => props.theme.palette.rose};
    outline: none;
    color: ${props => props.theme.palette.rose};

    &::-moz-focus-inner {
      border:0;
    }
  }

  @media (${media.sm}) {
    padding: 0.5em 1.5em;
  }

  @media (${media.md}) {
    padding: 1em 1.5em;
  }
`

const SubmitButtonText = styled.span`
  ${hideVisually};
`

const StyledMagnifyingGlass = styled(MagnifyingGlass)`
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
`

class Search extends Component {
  state = {
    searchQuery: (this.props.queries && this.props.queries.query) || '',
    searchCategory: (this.props.queries && this.props.queries.category) || '',
    error: false,
  }

  handleChange = e => {
    if (e.target.id === 'searchInput') {
      this.setState({
        error: false,
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
    if (this.state.searchQuery === '' && this.state.searchCategory === '') {
      this.setState({
        error: true,
      })
      this.searchInput.focus()
      return
    }
    this.setState({
      error: false,
    })
    navigateTo(
      `/${this.props.intl.locale}/search?query=${this.state.searchQuery}&category=${this.state.searchCategory}`,
    )
  }

  render() {
    const { 
      // categories, 
      needsToClearNegativeMargin, 
      intl
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit} needsToClearNegativeMargin={needsToClearNegativeMargin}>
        <FormElementsWrapper>
          <LabelWrapper htmlFor="searchInput">
            <Label>
              {intl.formatMessage({
                id: 'search.searchInputLabel',
              })}
            </Label>
            <SearchInput
              type="text"
              id="searchInput"
              name="searchQuery"
              innerRef={el => {
                this.searchInput = el
              }}
              placeholder={intl.formatMessage({
                id: 'search.searchInputPlaceholder',
              })}
              onChange={this.handleChange}
              value={this.state.searchQuery}
              error={this.state.error}
            />
          </LabelWrapper>
          <Wrapper>
            <SubmitButton type="submit">
              <StyledMagnifyingGlass />
              <SubmitButtonText>
                {intl.formatMessage({
                  id: 'search.searchButtonText',
                })}
              </SubmitButtonText>
            </SubmitButton>
          </Wrapper>
          {/* <Wrapper>
            <SearchCategoriesDropdown
              categories={categories}
              onCategorySelect={this.handleChange}
              categoryQuery={this.state.searchCategory}
            />
          </Wrapper> */}
        </FormElementsWrapper>
        {this.state.error && (
          <ErrorMessage>
            {intl.formatMessage({
              id: 'search.emptyQueryWarning',
            })}
          </ErrorMessage>
        )}
      </Form>
    )
  }
}

export default injectIntl(Search)
