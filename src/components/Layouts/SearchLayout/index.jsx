import React from 'react'
import styled from 'styled-components'
import media from '../../../tokens/breakpoints'
import spacing from '../../../tokens/dimensions'

const StyledSearchLayout = styled.div`
  display: grid;
  grid-gap: ${spacing.md};

  margin-right: auto;
  margin-left: auto;
  padding: ${spacing.md} ${spacing.md} ${spacing.xxl};

  @media (${media.md}) {
    grid-template-columns: 1fr 5fr 1fr;

    max-width: 1200px;
  }
`

export const SearchResults = styled.div`
  @media (${media.md}) {
    grid-column-start: 2;
  }
`

export const SearchLayout = ({ children }) => <StyledSearchLayout>{children}</StyledSearchLayout>
