import React from 'react'
import Pagination from '../../components/Pagination'

const PaginatedContent = ({ page, pages, prev, next, children, isSearchResults = false, handleButtonClick = null }) => {
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
    )
}

export default PaginatedContent
