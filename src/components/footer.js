import React from 'react'

import styled from '@emotion/styled'
import { Icon } from 'semantic-ui-react'

const FooterSection = styled.footer`
  position: fixed;
  width: 100vw;
  height: 50px;
  bottom: 0;
  background: white;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .left-matter {
    align-items: center;
  }

  .right-matter {
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .separator {
    margin: 0 9px;
  }

  .item {
    user-select: none;
    cursor: pointer;
  }
  a .item {
    color: #222;
  }
`

const Footer = ({ toggleModal } = {}) => (
  <FooterSection>
    <div className="left-matter">
      <a href="//www.mississauga-lakeshoreconservative.com/" target="_blank">
        <div className="item">Built in Mississauga-Lakeshore</div>
      </a>
    </div>
    <div className="right-matter">
      <a
        href="https://github.com/brianbancroft/medallion-finance-export"
        target="_blank"
      >
        <div className="item">
          <Icon name="github" />
        </div>
      </a>

      <div className="separator">|</div>
      <a href="mailto:hello@brianbancroft.ca">
        <div className="item">Contact</div>{' '}
      </a>
      <div className="separator">|</div>

      <div className="item" onClick={toggleModal}>
        Privacy
      </div>
    </div>
  </FooterSection>
)

export default Footer
