import React, { Component } from "react";
import { navigateTo } from "gatsby-link";
import { injectIntl } from "react-intl";
import styled, { css } from "styled-components";
import { hideVisually } from "polished";
import SearchCategoriesDropdown from "../SearchCategoriesDropdown";
import spacing from "../../tokens/dimensions";
import media from "../../tokens/breakpoints";

const formBottomPadding = ({ needsToClearNegativeMargin }) =>
  needsToClearNegativeMargin &&
  css`
    padding-bottom: ${spacing.xxl};
  `;

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
`;

const LabelWrapper = styled.label`
  @media (${media.md}) {
    padding: 0 ${spacing.xs};
  }
`;

const Wrapper = styled.div`
  @media (${media.md}) {
    flex-shrink: 0;

    padding: 0 ${spacing.xs};
  }
`;

const Label = styled.span`
  ${hideVisually};
`;

const SearchInput = styled.input`
  width: 100%;
  margin-top: 1em;
  padding: 0.5em 1em;
  border: 1px solid currentColor;
  border-radius: 2em;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  color: currentColor;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1em;
  padding: 0.5em 1em;
  border: 1px solid currentColor;
  border-radius: 2em;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  color: currentColor;
`;

class Search extends Component {
  state = {
    searchQuery: "",
    searchCategory: ""
  };

  handleChange = e => {
    if (e.target.id === "searchInput") {
      this.setState({
        searchQuery: e.target.value === "all" ? "" : e.target.value
      });
    } else {
      this.setState({
        searchCategory: e.target.value === "all" ? "" : e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    navigateTo(
      `/${this.props.intl.locale}/search?query=${
        this.state.searchQuery
      }&category=${this.state.searchCategory}`
    );
  };

  render() {
    const { categories, needsToClearNegativeMargin } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmit}
        needsToClearNegativeMargin={needsToClearNegativeMargin}
      >
        <LabelWrapper htmlFor="searchInput">
          <Label>Search term</Label>
          <SearchInput
            id="searchInput"
            name="searchQuery"
            type="text"
            onChange={this.handleChange}
          />
        </LabelWrapper>
        <Wrapper>
          <SearchCategoriesDropdown
            categories={categories}
            onCategorySelect={this.handleChange}
          />
        </Wrapper>
        <Wrapper>
          <SubmitButton type="submit">Search</SubmitButton>
        </Wrapper>
      </Form>
    );
  }
}

export default injectIntl(Search);
