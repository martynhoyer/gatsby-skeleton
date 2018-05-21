import React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.aside`
  display: grid;
  grid-gap: 16px;
  align-content: start;
`

const Sidebar = ({ children }) => <StyledSidebar>{children}</StyledSidebar>

export default Sidebar
