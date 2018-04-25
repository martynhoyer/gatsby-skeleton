import React from "react";
import Link from "gatsby-link";
import _ from "lodash";

const CategoriesList = ({ categories = [] }) => {
  if (!categories.length) return null;
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(({ fieldValue: category, totalCount }) => (
          <li>
            <Link to={`categories/${_.kebabCase(category)}`}>
              {category} ({totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
