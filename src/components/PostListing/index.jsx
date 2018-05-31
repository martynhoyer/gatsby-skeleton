import React from 'react'
import styled, { css } from 'styled-components'
import media from '../../tokens/breakpoints'
import spacing from '../../tokens/dimensions'
import PostCard from '../PostCard/index'

const homeTemplateNegativeMargin = ({ isIndex }) =>
  isIndex &&
  css`
    margin-top: -${spacing.xxl};
  `

const PostList = styled.div`
  ${homeTemplateNegativeMargin};

  display: grid;
  grid-gap: ${spacing.base} ${spacing.md};

  @media (${media.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`

const getPostList = postEdges =>
  postEdges.map(postEdge => ({
    locale: postEdge.node.frontmatter.locale,
    path: postEdge.node.fields.slug,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.frontmatter.date,
    localDate: postEdge.node.frontmatter.localDate,
    category: postEdge.node.frontmatter.category,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
    thumbnailArray: postEdge.node.thumbnailArray,
    categoriesArray: postEdge.node.categoriesArray,
  }))

const PostListing = ({ isIndex, postEdges }) => {
  const postList = getPostList(postEdges)
  return (
    <PostList isIndex={isIndex}>
      {/* This is the post loop - each post will be output using this markup */}
      {postList.map(post => <PostCard post={post} isIndex={isIndex} isBoxed key={`${post.path}+${post.locale}`} />)}
    </PostList>
  )
}

export default PostListing
