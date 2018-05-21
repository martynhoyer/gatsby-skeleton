import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import Img from 'gatsby-image'
import spacing, { fontsize } from '../../tokens/dimensions'

const Container = styled.div`
  margin-top: ${spacing.xl};
  text-align: center;
  color: ${props => props.theme.palette.noir};
`

const StyledImg = styled(Img)`
  width: 96px;
  height: 96px;
  margin: 0 auto;
  border-radius: 50%;
`

const Heading = styled.h2`
  font-family: opensans;
  font-size: inherit;
  font-weight: normal;
`

const Name = styled.span`
  font-family: bergensans;
  font-size: ${fontsize.md};
  font-weight: bold;
`

const PostAuthor = ({ author }) => {
  return (
    <Container>
      <StyledImg resolutions={author.image.resolutions} />
      <Heading>
        <FormattedMessage id="post.authorHeading" />
      </Heading>
      <Name>{author.displayName}</Name>
    </Container>
  )
}

export default PostAuthor
