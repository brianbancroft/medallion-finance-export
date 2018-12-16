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
  overflow-y: scroll;

  .container {
    width: 65vw;
    margin: 0 auto;

    @media (min-width: 900px) {
      width: 700px;
    }
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

const instructions = ({ success, errors }) =>
  !success && errors.length === 0 ? (
    <span>
      Submit that CSV file here to convert it to a useful format from the
      convenience of the browser
    </span>
  ) : (
    <></>
  )

const Main = ({ handleCSVChange, errors, success } = {}) => (
  <MainSection>
    <div className="container">
      <NoMobileSupport />

      <PreventMobileSupport>
        <h2>
          Clean your mEDAllion finance file - in <em>three</em> easy steps
        </h2>
        <TopInstructionCard />

        <Card fluid>
          <Card.Content>
            <Card.Header>2. Submit the CSV for Conversion</Card.Header>

            <Card.Description>
              <Form success={success} error={errors.length > 0}>
                <Form.Group style={{ width: '100%', marginLeft: '0px' }}>
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
              </Form>
              {instructions({ success, errors })}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Make sure you're using the exact file submitted by your Medallion
            app!
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>3. Download your Files!</Card.Header>

            <Card.Description>
              <Button.Group size="large" fluid>
                <Button color="teal" disabled={!success}>
                  Donor List
                </Button>
                <Button.Or />
                <Button color="blue" disabled={!success}>
                  The other list...
                </Button>
              </Button.Group>
              <br />
              <br />
              Here, we have one output format useful when you have to build tax
              recipets, and another format suitable for your own records.
              Download either or both!
            </Card.Description>
          </Card.Content>
          <Card.Content extra>Be sure to allow downloads!</Card.Content>
        </Card>
      </PreventMobileSupport>
    </div>
  </MainSection>
)

export default Main
