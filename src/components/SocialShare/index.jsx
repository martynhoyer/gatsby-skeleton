import React, { Fragment } from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import styled, { css } from 'styled-components'
import spacing from '../../tokens/dimensions'
import { FacebookIcon, TwitterIcon, LinkedinIcon } from '../SocialIcons'

const buttonStyles = css`
  margin-top: ${spacing.sm};

  &:first-child {
    margin-top: 0;
  }
`

const StyledFacebookShareButton = styled(FacebookShareButton)`
  ${buttonStyles};
`

const StyledTwitterShareButton = styled(TwitterShareButton)`
  ${buttonStyles};
`

const StyledLinkedinShareButton = styled(LinkedinShareButton)`
  ${buttonStyles};
`

const SocialShare = ({ url, title }) => (
  <Fragment>
    <StyledTwitterShareButton url={url} quote={title}>
      <TwitterIcon />
    </StyledTwitterShareButton>
    <StyledFacebookShareButton url={url} quote={title}>
      <FacebookIcon />
    </StyledFacebookShareButton>
    <StyledLinkedinShareButton url={url} quote={title}>
      <LinkedinIcon />
    </StyledLinkedinShareButton>
  </Fragment>
)

export default SocialShare
