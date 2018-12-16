import React from 'react'

import styled from '@emotion/styled'
import { Card, Image } from 'semantic-ui-react'

const NoMobileSupport = styled('div')`
  display: none;
  @media (max-width: 520px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0 0 0;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }
`
export default () => (
  <NoMobileSupport>
    <Card>
      <Image src="/no-phone.png" />
      <Card.Content>
        <Card.Header>Medallion Finance Converter</Card.Header>
        <Card.Meta>Not Functional for Mobile</Card.Meta>
        <Card.Description>
          Sorry, this is a desktop conversion tool...
        </Card.Description>
      </Card.Content>
    </Card>
  </NoMobileSupport>
)
