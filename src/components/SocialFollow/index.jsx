import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { hideVisually, transparentize } from 'polished'
import config from '../../../data/SiteConfig.json'
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '../SocialIcons'
import spacing, { fontsize } from '../../tokens/dimensions'

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`

export const List = styled.dl`
  display: flex;
  justify-content: flex-start;
`

export const DefinitionTitle = styled.dt`
  ${hideVisually};
`

export const DefinitionData = styled.dd`
  margin: 0 ${spacing.base} 0 0;
`

export const Link = styled.a`
  display: block;
  max-width: ${spacing.xl};
  border-radius: 50%;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${spacing.xs} ${props => transparentize(0.5, props.theme.palette.grisLight)};
  }
`

export const DisplayName = styled.span`
  ${hideVisually};
`

const SocialItem = ({ url, providerDisplayName, profileDisplayName, providerName }) => {
  const icons = {
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
  }
  return (
    <Fragment>
      <DefinitionTitle>{providerDisplayName}</DefinitionTitle>
      <DefinitionData>
        <Link href={url} target="_blank" rel="noopener" providerName={providerName}>
          {icons[providerName]}
          <DisplayName>{profileDisplayName}</DisplayName>
        </Link>
      </DefinitionData>
    </Fragment>
  )
}

const SocialFollow = () => (
  <div>
    <Title>
      <FormattedMessage id="sidebar.socialMedia.heading" />
    </Title>
    <List>{config.social.map(profile => <SocialItem key={profile.providerName} {...profile} />)}</List>
  </div>
)

export default SocialFollow
