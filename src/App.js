import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Card, Icon } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <>
        <h1>Convert Nationbuilder CSV to Useful Spreadsheets</h1>
        <Card
          image="https://placeimg.com/200/200/any"
          header="Elliot Baker"
          meta="Friend"
          description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        />
      </>
    )
  }
}

export default App
