import React, { Fragment } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";
import styled, { css } from "styled-components";
import { ReactComponent as Twitter } from "../../svg/twitter.svg";
import { ReactComponent as Facebook } from "../../svg/facebook.svg";
import { ReactComponent as Linkedin } from "../../svg/linkedin.svg";
import spacing from "../../tokens/dimensions";

const buttonStyles = css`
  margin-top: ${spacing.sm};
  padding: 24%;
  border-radius: 50%;

  & > svg {
    display: block;
    fill: ${props => props.theme.palette.blanc};
  }
`;

const StyledFacebookShareButton = styled(FacebookShareButton)`
  ${buttonStyles};
  background-color: #6075f4;
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  ${buttonStyles};
  background-color: #3edfff;
`;

const StyledLinkedinShareButton = styled(LinkedinShareButton)`
  ${buttonStyles};
  background-color: #0073b1;
`;

const SocialShare = ({ url, title }) => (
  <Fragment>
    <StyledTwitterShareButton url={url} quote={title}>
      <Twitter />
    </StyledTwitterShareButton>
    <StyledFacebookShareButton url={url} quote={title}>
      <Facebook />
    </StyledFacebookShareButton>
    <StyledLinkedinShareButton url={url} quote={title}>
      <Linkedin />
    </StyledLinkedinShareButton>
  </Fragment>
);

export default SocialShare;
