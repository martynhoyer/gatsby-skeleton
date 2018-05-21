import React from 'react'
import styled from 'styled-components'
import media from '../../tokens/breakpoints'
import spacing from '../../tokens/dimensions'
import Box from '../Box'
import SubscribeForm from '../SubscribeForm'

const Container = styled.div`
  display: grid;
  grid-gap: ${spacing.md};

  @media (${media.md}) {
    grid-template-columns: 1fr 1fr;
  }
`

const PostFooterSubscribe = () => (
  <Container>
    <Box>
      <SubscribeForm whitepaper />
    </Box>
    <Box>
      <SubscribeForm />
    </Box>
  </Container>
)

export default PostFooterSubscribe
