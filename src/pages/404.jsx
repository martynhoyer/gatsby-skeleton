import React, { Fragment } from 'react'
import styled from 'styled-components'
import Body from '../components/Layouts/Body'
import TwoColumn from '../components/Layouts/TwoColumn'
import { fontsize } from '../tokens/dimensions'

const Heading = styled.h1`
  font-size: ${fontsize.xxl};
  text-align: center;
  color: black;
`

class NotFoundPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Body>
          <TwoColumn>
            <div>
              <Heading>404: Page not found</Heading>
            </div>
          </TwoColumn>
        </Body>
      </Fragment>
    )
  }
}

export default NotFoundPage
