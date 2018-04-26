import React from "react";
import Link from "gatsby-link";
import _ from "lodash";

const CategoriesList = ({ categories = [], locale }) => {
  if (!categories.length) return null;
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(({ fieldValue: category, totalCount }, index) => (
          <li key={`${category}+${index}`}>
            <Link to={`/${locale}/categories/${_.kebabCase(category)}`}>
              {category} ({totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
