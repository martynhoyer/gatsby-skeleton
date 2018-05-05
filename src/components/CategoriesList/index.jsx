import React from "react";
import Link from "gatsby-link";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

const CategoriesList = ({ categories = [], locale }) => {
  if (!categories.length) return null;
  return (
    <div>
      <h2>
        <FormattedMessage id="sidebar.categories.heading" />
      </h2>
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
