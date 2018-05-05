import React from "react";
import Link from "gatsby-link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import PostDate from "../PostDate";
import { fontsize } from "../../tokens/dimensions";

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`;

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 1em 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-family: opensans;
  font-size: ${fontsize.base};
  font-weight: normal;
`;

const StyledPostDate = styled(PostDate)`
  color: ${props => props.theme.palette.grisLight};
`;

const PopularPosts = ({ popularPosts = [] }) => {
  if (!popularPosts.length) return null;
  return (
    <div>
      <Title>
        <FormattedMessage id="sidebar.popularPosts.heading" />
      </Title>
      <List>
        {popularPosts.map(({ node: popularPost }) => (
          <ListItem key={popularPost.id}>
            <StyledLink
              to={`/${popularPost.frontmatter.locale}${
                popularPost.fields.slug
              }`}
            >
              <PostTitle>{popularPost.frontmatter.title}</PostTitle>
              <StyledPostDate
                date={popularPost.frontmatter.date}
                localDate={popularPost.frontmatter.localDate}
              />
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PopularPosts;
