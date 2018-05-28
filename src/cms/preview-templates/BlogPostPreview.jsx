import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  outline: 10px solid red;
`

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <Container>
      <div>{entry.getIn(['data', 'category'])}</div>
      <div>{entry.getIn(['data', 'date'])}</div>
      <div>{entry.getIn(['data', 'title'])}</div>
      <div>{widgetFor('body')}</div>
      <div>{entry.getIn(['data', 'tags'])}</div>
    </Container>
  )
}

export default BlogPostPreview
