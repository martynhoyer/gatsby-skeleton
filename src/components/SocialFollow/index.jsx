import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import styled, { css } from "styled-components";
import { hideVisually } from "polished";
import { ReactComponent as Twitter } from "../../svg/twitter.svg";
import { ReactComponent as Instagram } from "../../svg/instagram.svg";
import { ReactComponent as Facebook } from "../../svg/facebook.svg";
import { ReactComponent as Linkedin } from "../../svg/linkedin.svg";
import config from "../../../data/SiteConfig";
import spacing, { fontsize } from "../../tokens/dimensions";

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`;

export const List = styled.dl`
  display: flex;
  justify-content: flex-start;
`;

export const DefinitionTitle = styled.dt`
  ${hideVisually};
`;

export const DefinitionData = styled.dd`
  margin: 0 ${spacing.base} 0 0;
`;

const backgroundColor = ({ providerName }) => {
  switch (providerName) {
    case "facebook":
      return css`
        background-color: #6075f4;
      `;
    case "linkedin":
      return css`
        background-color: #0073b1;
      `;
    case "twitter":
      return css`
        background-color: #3edfff;
      `;
    case "instagram":
      return css`
        background-color: #e4228c;
      `;
    default:
      return css`
        background-color: ${props => props.theme.palette.rose};
      `;
  }
};

export const Link = styled.a`
  ${backgroundColor};
  display: block;
  max-width: ${spacing.xl};
  padding: 24%;
  border-radius: 50%;
  color: white;

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export const DisplayName = styled.span`
  ${hideVisually};
`;

const SocialItem = ({
  url,
  providerDisplayName,
  profileDisplayName,
  providerName
}) => {
  const icons = {
    facebook: <Facebook />,
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkedin: <Linkedin />
  };
  return (
    <Fragment>
      <DefinitionTitle>{providerDisplayName}</DefinitionTitle>
      <DefinitionData>
        <Link href={url} providerName={providerName}>
          {icons[providerName]}
          <DisplayName>{profileDisplayName}</DisplayName>
        </Link>
      </DefinitionData>
    </Fragment>
  );
};

const SocialFollow = () => (
  <div>
    <Title>
      <FormattedMessage id="sidebar.socialMedia.heading" />
    </Title>
    <List>
      {config.social.map(profile => (
        <SocialItem key={profile.providerName} {...profile} />
      ))}
    </List>
  </div>
);

export default SocialFollow;
