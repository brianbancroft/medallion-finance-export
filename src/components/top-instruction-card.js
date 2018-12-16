import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default () => (
  <Card fluid>
    <Image src="/export-finances.jpg" />
    <Card.Content>
      <Card.Header>Export your finance CSV</Card.Header>

      <Card.Description>
        Download the spreadsheet in csv straight from your medallion site
        without any changes
      </Card.Description>
    </Card.Content>
  </Card>
)
