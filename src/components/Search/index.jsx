import React, { Component } from "react";
import { navigateTo } from "gatsby-link";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import { hideVisually } from "polished";
import spacing from "../../tokens/dimensions";

const Form = styled.form`
  display: flex;

  padding: 0 0 ${spacing.lg};
`;

const Label = styled.span`
  ${hideVisually};
`;

const SearchInput = styled.input`
  padding: 1em;
  border: 1px solid ${props => props.theme.palette.noir};
  border-radius: ${spacing.xs};
  background-color: transparent;
`;

const CategoryInput = styled.select`
  height: 2.3em;
  padding: 1em;
  border: 1px solid ${props => props.theme.palette.noir};
  font-size: inherit;
  border-radius: ${spacing.xs};
  background-color: transparent;
`;

class Search extends Component {
  state = {
    searchQuery: "",
    searchCategory: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value === "all" ? "" : e.target.value
    });
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
    const { categories } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor="searchInput">
          <Label>Search term</Label>
          <SearchInput
            id="searchInput"
            name="searchQuery"
            type="text"
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="categorySelect">
          <Label>Category</Label>
          <CategoryInput
            onChange={this.handleChange}
            id="categorySelect"
            name="searchCategory"
          >
            <option value="all">All categories</option>
            {categories.map(({ node: category }) => (
              <option key={category.title} value={category.title}>
                {category.displayName}
              </option>
            ))}
          </CategoryInput>
        </label>
        <button type="submit">Search</button>
      </Form>
    );
  }
}

export default injectIntl(Search);
