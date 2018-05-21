import React from 'react'
import styled, { css } from 'styled-components'
import media from '../../tokens/breakpoints'
import { boxPadding } from '../../tokens/dimensions'

const getBoxPadding = ({ compact }) =>
  compact
    ? css`
        padding: ${boxPadding.compact.xs.y} ${boxPadding.compact.xs.x};

        @media (${media.md}) {
          padding-right: ${boxPadding.compact.md.x};
          padding-left: ${boxPadding.compact.md.x};
        }
      `
    : css`
        padding: ${boxPadding.default.xs.y} ${boxPadding.default.xs.x};

        @media (${media.md}) {
          padding-right: ${boxPadding.default.md.x};
          padding-left: ${boxPadding.default.md.x};
        }
      `

const StyledBox = styled.div`
  ${getBoxPadding};

  box-shadow: ${props => props.theme.shadows.default};
  background-color: ${props => props.theme.palette.blanc};
`

const Box = ({ children, compact }) => <StyledBox compact={compact}>{children}</StyledBox>

export default Box
