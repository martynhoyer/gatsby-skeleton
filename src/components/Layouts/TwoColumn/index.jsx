import React from 'react'
import styled, { css } from 'styled-components'
import media from '../../../tokens/breakpoints'
import spacing from '../../../tokens/dimensions'

const hasHorizontalPadding = ({ noHorizontalPadding }) =>
  noHorizontalPadding
    ? css`
        padding: ${spacing.md} 0 0;
      `
    : css`
        padding: ${spacing.md} ${spacing.md} 0;
      `

const StyledTwoColumn = styled.div`
  ${hasHorizontalPadding};

  display: grid;
  grid-gap: ${spacing.md};

  margin-right: auto;
  margin-left: auto;

  @media (${media.md}) {
    grid-template-columns: 5fr 2fr;

    max-width: 1200px;
  }
`

const TwoColumn = ({ children, noHorizontalPadding }) => (
  <StyledTwoColumn noHorizontalPadding={noHorizontalPadding}>{children}</StyledTwoColumn>
)

export default TwoColumn
