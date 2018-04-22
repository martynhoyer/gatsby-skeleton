import React from "react";
import Pagination from "../../components/Pagination";

class PaginatedContent extends React.Component {
  render() {
    const { page, pages, prev, next, children } = this.props;
    return (
      <main>
        {children}

        {/* Previous/next page links - displayed on every page */}
        <Pagination page={page} pages={pages} prev={prev} next={next} />
      </main>
    );
  }
}

export default PaginatedContent;
