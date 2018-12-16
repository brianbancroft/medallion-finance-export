import React, { Component } from 'react'
import { Main, Footer, PrivacyModal } from './components'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewModal: false,
    }
  }

  toggleModal() {
    this.setState({ viewModal: !this.state.viewModal })
  }

  render() {
    return (
      <>
        <PrivacyModal
          toggleModal={this.toggleModal.bind(this)}
          viewModal={this.state.viewModal}
        />
        <Main />
        <Footer toggleModal={this.toggleModal.bind(this)} />
      </>
    )
  }
}

export default App
