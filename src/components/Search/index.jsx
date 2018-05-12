import React, { Component } from "react";
import { navigateTo } from "gatsby-link";
import { injectIntl } from "react-intl";

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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="searchInput">
            Search term
            <input
              id="searchInput"
              name="searchQuery"
              type="text"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="categorySelect">
            Category
            <select
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
            </select>
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default injectIntl(Search);
