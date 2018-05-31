import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import spacing from '../../tokens/dimensions'

const StyledLink = styled(Link)`
  width: ${spacing.lg};
  height: ${spacing.lg};
  margin: ${spacing.sm};
  padding: ${spacing.sm};
  line-height: 1;
  border-radius: 50%;
  text-decoration: none;
  color: ${props => props.theme.palette.noir};
`



const PaginationLink = ({ url, text }) => {
  if (!url) return null
  return <StyledLink to={url}>{text}</StyledLink>
}

export default PaginationLink
