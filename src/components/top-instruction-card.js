import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default () => (
  <Card fluid>
    <a href="/export-finances.jpg" target="_blank">
      <Image src="/export-finances.jpg" />
    </a>
    <Card.Content>
      <Card.Header>1. Export your finance CSV from Medallion</Card.Header>

      <Card.Description>
        Download the spreadsheet in csv straight from your medallion site
        without any changes
      </Card.Description>
    </Card.Content>
  </Card>
)
