import React from 'react'
import styled from '@emotion/styled'
import { NoMobileSupport, TopInstructionCard } from '.'
import { Card, Input, Form, Message, Button } from 'semantic-ui-react'

const MainSection = styled.section`
  position: fixed;
  width: 100vw;
  height: calc(100vh - 50px);
  background: whitesmoke;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .container {
    width: 65vw;
    margin: 0 auto;
  }
`

const PreventMobileSupport = styled('div')`
  @media (max-width: 520px) {
    display: none;
  }
`

const ErrorItem = (error, key) => (
  <Message error key={key} header={error.title} content={error.message} />
)
const errorList = errors => errors.map(ErrorItem)

const SuccessMessage = () => (
  <Message
    success
    header="All Good!"
    content="You can now download the converted files"
  />
)

const Main = ({ handleCSVChange, errors, success } = {}) => (
  <MainSection>
    <div className="container">
      <NoMobileSupport />

      <PreventMobileSupport>
        <h2>
          Clean your mEDAllion finance exports - in <em>two</em> easy steps
        </h2>
        <TopInstructionCard />

        <Card fluid>
          <Card.Content>
            <Card.Header>Upload the CSV here</Card.Header>

            <Card.Description>
              <Form success={success} error={errors.length > 0}>
                <Form.Group widths="equal">
                  {' '}
                  <Input
                    fluid
                    type="file"
                    name="file"
                    icon="file text outline"
                    iconPosition="left"
                    placeholder="UploadCSV..."
                    onChange={handleCSVChange}
                  />
                  <input id="file" hidden type="file" />
                </Form.Group>
                {errorList(errors)}
                <SuccessMessage />

                <Button>Submit</Button>
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
