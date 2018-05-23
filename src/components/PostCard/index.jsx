import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'
import { FormattedMessage } from 'react-intl'
import spacing, { boxPadding } from '../../tokens/dimensions'
import media from '../../tokens/breakpoints'
import PostDate from '../PostDate'
import Box from '../Box'

const doubleWidthFirstPost = ({ isIndex }) =>
  isIndex &&
  css`
    &:first-child {
      @media (${media.sm}) {
        grid-column: span 2;
      }
    }
  `

const articleBg = ({ isBoxed }) =>
  isBoxed &&
  css`
    background-color: ${props => props.theme.palette.blanc};
  `

const Article = styled.article`
  ${doubleWidthFirstPost};
  ${articleBg};

  color: ${props => props.theme.palette.noir};
`

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;

  height: 100%;
  text-decoration: none;
  color: inherit;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`

const StyledBox = styled(Box)`
  flex-grow: 1;
`

const thumbnailNeedsNegativeMargin = ({ isBoxed }) =>
  isBoxed &&
  css`
    margin: -${boxPadding.default.xs.y} -${boxPadding.default.xs.x} 0;

    @media (${media.md}) {
      margin-right: -${boxPadding.default.md.x};
      margin-left: -${boxPadding.default.md.x};
    }
  `

const Thumbnail = styled(Img)`
  ${thumbnailNeedsNegativeMargin};
`

const Header = styled.header`
  margin-top: ${spacing.lg};
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Category = styled.span`
  margin-right: ${spacing.base};
  color: ${props => props.color};
`

const StyledPostDate = styled(PostDate)`
  white-space: nowrap;
  color: ${props => props.theme.palette.grisLight};
`

const Title = styled.h2`
  margin: ${spacing.base} 0 0;
`

const Body = styled.section`
  margin-top: ${spacing.base};
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;

  margin-top: ${spacing.md};
`

const ReadMore = styled.span`
  color: ${props => props.theme.palette.noir};
`

const Arrow = styled.span`
  display: inline-block;
  margin-left: ${spacing.base};
  color: ${props => props.theme.palette.rose};
  transition: transform 0.25s;

  ${CardLink}:hover &,
  ${CardLink}:focus & {
    transform: translateX(0.5em);
  }
`

const CardRoot = ({ post, isBoxed }) => {
  const { title, excerpt, localDate, date, thumbnailArray = [], categoriesArray = [] } = post
  const thumbnail = thumbnailArray && thumbnailArray.length > 0 && thumbnailArray[0]
  const category = categoriesArray && categoriesArray.length > 0 && categoriesArray[0]

  return (
    <Fragment>
      {thumbnail && <Thumbnail sizes={thumbnail.sizes} isBoxed={isBoxed} />}
      <Header>
        <Meta>
          <Category color={category.color}>{category.displayName}</Category>
          <StyledPostDate date={date} localDate={localDate} />
        </Meta>
        <Title>{title}</Title>
      </Header>
      <Body>
        <p>{excerpt}</p>
      </Body>
      <Footer>
        <ReadMore>
          <FormattedMessage id="blogList.readMoreLink" /> <Arrow>&rarr;</Arrow>
        </ReadMore>
      </Footer>
    </Fragment>
  )
}

const PostCard = ({ post, isIndex, isBoxed = false }) => {
  const { locale, path } = post
  const url = `/${locale}${path}`
  return isBoxed ? (
    <Article isIndex={isIndex} isBoxed>
      <CardLink to={url}>
        <StyledBox>
          <CardRoot post={post} isBoxed />
        </StyledBox>
      </CardLink>
    </Article>
  ) : (
    <Article isIndex={isIndex}>
      <CardLink to={url}>
        <CardRoot post={post} />
      </CardLink>
    </Article>
  )
}

export default PostCard
