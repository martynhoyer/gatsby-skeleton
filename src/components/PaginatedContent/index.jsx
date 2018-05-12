import React from "react";
import Pagination from "../../components/Pagination";

class PaginatedContent extends React.Component {
  render() {
    const {
      page,
      pages,
      prev,
      next,
      children,
      isSearchResults = false,
      handleButtonClick = null
    } = this.props;
    return (
      <main>
        {children}

        {/* Previous/next page links - displayed on every page */}
        <Pagination
          page={page}
          pages={pages}
          prev={prev}
          next={next}
          isSearchResults={isSearchResults}
          handleButtonClick={handleButtonClick}
        />
      </main>
    );
  }
}

export default PaginatedContent;
