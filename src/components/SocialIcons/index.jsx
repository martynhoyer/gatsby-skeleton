import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Twitter } from "../../svg/twitter.svg";
import { ReactComponent as Instagram } from "../../svg/instagram.svg";
import { ReactComponent as Facebook } from "../../svg/facebook.svg";
import { ReactComponent as Linkedin } from "../../svg/linkedin.svg";

const backgroundColor = ({ providerName }) => {
  switch (providerName) {
    case "facebook":
      return css`
        background-color: ${props => props.theme.social.facebook};
      `;
    case "linkedin":
      return css`
        background-color: ${props => props.theme.social.linkedin};
      `;
    case "twitter":
      return css`
        background-color: ${props => props.theme.social.twitter};
      `;
    case "instagram":
      return css`
        background-color: ${props => props.theme.social.instagram};
      `;
    default:
      return css`
        background-color: ${props => props.theme.palette.rose};
      `;
  }
};

const Wrapper = styled.span`
  ${backgroundColor};

  display: block;
  padding: 24%;
  border-radius: 50%;

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.palette.blanc};
  }
`;

const SocialIcon = ({ children, providerName }) => (
  <Wrapper providerName={providerName}>{children}</Wrapper>
);

export const FacebookIcon = () => (
  <SocialIcon providerName="facebook">
    <Facebook />
  </SocialIcon>
);

export const TwitterIcon = () => (
  <SocialIcon providerName="twitter">
    <Twitter />
  </SocialIcon>
);

export const LinkedinIcon = () => (
  <SocialIcon providerName="linkedin">
    <Linkedin />
  </SocialIcon>
);

export const InstagramIcon = () => (
  <SocialIcon providerName="instagram">
    <Instagram />
  </SocialIcon>
);
