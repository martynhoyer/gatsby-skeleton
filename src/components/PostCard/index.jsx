import React, { Fragment } from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import spacing, { boxPadding } from "../../tokens/dimensions";
import media from "../../tokens/breakpoints";
import PostDate from "../PostDate";
import Box from "../Box";

const doubleWidthFirstPost = ({ isIndex }) =>
  isIndex &&
  css`
    &:first-child {
      @media (${media.sm}) {
        grid-column: span 2;
      }
    }
  `;

const Article = styled.article`
  ${doubleWidthFirstPost};

  color: ${props => props.theme.palette.noir};
`;

const thumbnailNeedsNegativeMargin = ({ isBoxed }) =>
  isBoxed &&
  css`
    margin: -${boxPadding.xs.y} -${boxPadding.xs.x} 0;

    @media (${media.md}) {
      margin-right: -${boxPadding.md.x};
      margin-left: -${boxPadding.md.x};
    }
  `;

const Thumbnail = styled(Img)`
  ${thumbnailNeedsNegativeMargin};
`;

const Header = styled.header`
  margin-top: ${spacing.lg};
`;

const Meta = styled.div``;

const Category = styled.span`
  margin-right: ${spacing.base};
  color: ${props => props.color};
`;

const StyledPostDate = styled(PostDate)`
  color: ${props => props.theme.palette.grisLight};
`;

const Title = styled.h2`
  margin: ${spacing.md} 0 0;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus {
    color: ${props => props.theme.palette.rose};
  }
`;

const Body = styled.section`
  margin-top: ${spacing.base};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;

  margin-top: ${spacing.md};
`;

const ReadMoreLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.noir};

  &:hover,
  &:focus {
    color: ${props => props.theme.palette.rose};
  }
`;

const Arrow = styled.span`
  margin-left: ${spacing.base};
  color: ${props => props.theme.palette.rose};
`;

const CardRoot = ({ post, isBoxed }) => {
  const {
    locale,
    title,
    path,
    excerpt,
    localDate,
    date,
    thumbnailArray = [],
    categoriesArray = []
  } = post;
  const url = `/${locale}${path}`;
  const thumbnail =
    thumbnailArray && thumbnailArray.length > 0 && thumbnailArray[0];
  const category =
    categoriesArray && categoriesArray.length > 0 && categoriesArray[0];

  return (
    <Fragment>
      {thumbnail && <Thumbnail sizes={thumbnail.sizes} isBoxed={isBoxed} />}
      <Header>
        <Meta>
          <Category color={category.color}>{category.displayName}</Category>
          <StyledPostDate date={date} localDate={localDate} />
        </Meta>
        <Title>
          <TitleLink to={url}>{title}</TitleLink>
        </Title>
      </Header>
      <Body>
        <p>{excerpt}</p>
      </Body>
      <Footer>
        <ReadMoreLink to={url}>
          <FormattedMessage id="blogList.readMoreLink" /> <Arrow>&rarr;</Arrow>
        </ReadMoreLink>
      </Footer>
    </Fragment>
  );
};

const PostCard = ({ post, isIndex, isBoxed = false }) =>
  isBoxed ? (
    <Article isIndex={isIndex}>
      <Box>
        <CardRoot post={post} isBoxed />
      </Box>
    </Article>
  ) : (
    <Article isIndex={isIndex}>
      <CardRoot post={post} />
    </Article>
  );

export default PostCard;
