import React from 'react'
import styled from 'styled-components'
import media from '../../../tokens/breakpoints'
import spacing from '../../../tokens/dimensions'

const StyledSingleColumn = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: ${spacing.md} ${spacing.md} 0;

  @media (${media.md}) {
    max-width: 1024px;
  }
`

const SingleColumn = ({ children }) => <StyledSingleColumn>{children}</StyledSingleColumn>

export default SingleColumn
