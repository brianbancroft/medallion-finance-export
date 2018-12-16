import React, { Component } from 'react'
import { Main, Footer, PrivacyModal } from './components'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewModal: false,
      csvContent: null,
      errors: [],
      success: false,
    }
  }

  toggleModal() {
    this.setState({ viewModal: !this.state.viewModal })
  }

  clearErrorMessages() {
    this.setState({ errors: [] })
  }

  addErrorMessage({ title, message }) {
    this.setState({ errors: this.state.errors.push({ title, message }) })
  }

  async handleCSVChange(e) {
    const fileReader = new FileReader()
    const upload = e.target.files[0]
    await fileReader.readAsText(upload)
    this.setState({ csvContent: fileReader.result })
  }

  render() {
    return (
      <>
        <PrivacyModal
          toggleModal={this.toggleModal.bind(this)}
          viewModal={this.state.viewModal}
        />
        <Main
          handleCSVChange={this.handleCSVChange.bind(this)}
          errors={this.state.errors}
          success={this.state.success}
        />
        <Footer toggleModal={this.toggleModal.bind(this)} />
      </>
    )
  }
}

export default App
