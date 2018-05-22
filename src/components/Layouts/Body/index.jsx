import React from 'react'
import styled from 'styled-components'
import spacing from '../../../tokens/dimensions'

const StyledBody = styled.div`
  flex-grow: 1;

  padding-bottom: ${spacing.xxl};
`

const Body = ({ children }) => <StyledBody>{children}</StyledBody>

export default Body
