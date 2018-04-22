import React from "react";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";

class IndexTemplate extends React.Component {
  render() {
    const {
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next
    } = this.props.pathContext;

    return (
      <div>
        <PaginatedContent
          page={page}
          pages={pages}
          total={total}
          limit={limit}
          prev={prev}
          next={next}
        >
          {/* PostListing component renders all the posts */}
          <PostListing postEdges={nodes} />
        </PaginatedContent>
      </div>
    );
  }
}

export default IndexTemplate;
