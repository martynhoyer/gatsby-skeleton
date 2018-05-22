import React from 'react'
import styled from 'styled-components'
import spacing from '../../tokens/dimensions'

const StyledSubSidebar = styled.div`
  display: grid;
  grid-gap: ${spacing.lg};
  align-content: start;

  > * + * {
    padding-top: ${spacing.lg};
    border-top: 1px solid ${props => props.theme.palette.grisLight};
  }
`

const SubSidebar = ({ children }) => <StyledSubSidebar>{children}</StyledSubSidebar>

export default SubSidebar
