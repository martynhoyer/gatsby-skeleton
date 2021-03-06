import React from 'react'
import styled from 'styled-components'
import config from '../../../data/SiteConfig.json'

const Container = styled.p`
  margin: 0;
`

const Copyright = ({ className }) => (
  <Container className={className}>
    &copy; {config.copyright.startYear} - {new Date().getFullYear()} {config.copyright.label}
  </Container>
)

export default Copyright
