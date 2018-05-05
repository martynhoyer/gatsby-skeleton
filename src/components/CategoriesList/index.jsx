import React from "react";
import Link from "gatsby-link";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { fontsize } from "../../tokens/dimensions";

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`;

const List = styled.ul`
  margin: 0;
  padding: 0 0 0 1em;
  text-indent: -0.25em;
`;

const ListItem = styled.li`
  margin: 1em 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CategoriesList = ({ categories = [], locale }) => {
  if (!categories.length) return null;
  return (
    <div>
      <Title>
        <FormattedMessage id="sidebar.categories.heading" />
      </Title>
      <List>
        {categories.map(({ fieldValue: category, totalCount }, index) => (
          <ListItem key={`${category}+${index}`}>
            <StyledLink to={`/${locale}/categories/${_.kebabCase(category)}`}>
              {category}
              {/* ({totalCount}) */}
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoriesList;
