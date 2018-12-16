import React from 'react'
import { Modal } from 'semantic-ui-react'
import styled from '@emotion/styled'
const ModalPoint = styled.h4`
  margin-left: 30px;
`

const PrivacyModal = ({ viewModal, toggleModal }) => (
  <Modal
    open={viewModal}
    onClose={toggleModal}
    header="We don't collect your member data"
    content={
      <>
        <ModalPoint>
          The conversion process is client-side. It's all on your browser
        </ModalPoint>
        <ModalPoint>
          We collect cookies to monitor usage (using Google Analytics). Not the
          csv.
        </ModalPoint>
        <ModalPoint>
          This is an open-source tool.{' '}
          <a
            href="https://github.com/brianbancroft/medallion-finance-export"
            target="_blank"
          >
            See the code for yourself.
          </a>
        </ModalPoint>
      </>
    }
    actions={[{ key: 'done', content: 'Got it!', positive: true }]}
  />
)

export default PrivacyModal
