import React from 'react'
import styled from '@emotion/styled'
import { NoMobileSupport, TopInstructionCard } from '.'
import { Card, Icon, Label, Form } from 'semantic-ui-react'

const MainSection = styled.section`
  position: fixed;
  width: 100vw;
  height: calc(100vh - 50px);
  background: whitesmoke;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .container {
    width: 80%;
    margin: 0 auto;
  }
`

const PreventMobileSupport = styled('div')`
  @media (max-width: 520px) {
    display: none;
  }
`

const Main = () => (
  <MainSection>
    <div className="container">
      <NoMobileSupport />

      <PreventMobileSupport>
        <h2>Convert your nationbuilder exports to ... in two easy steps</h2>
        <TopInstructionCard />

        <Card fluid>
          <Card.Content>
            <Card.Header>Upload the CSV here</Card.Header>

            <Card.Description>
              <Form>
                <Form.Group widths="equal">
                  <Label width="4" as="label" htmlFor="file" size="big">
                    <Icon name="file" />
                    CSV File
                  </Label>
                  <input id="file" hidden type="file" />
                </Form.Group>

                <Form.Button>Submit</Form.Button>
              </Form>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>Be sure to allow downloads!</Card.Content>
        </Card>
      </PreventMobileSupport>
    </div>
  </MainSection>
)

export default Main
