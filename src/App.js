import React, { Component } from 'react'
import { Main, Footer, PrivacyModal } from './components'
import { convertSpreadsheet } from './helpers'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewModal: false,
      csvContent: null,
      donorListCSVExport: '',
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

  checkSpreadsheet() {
    const rawData = this.state.csvContent
    const conversion = convertSpreadsheet({ rawData })
    if (conversion.success) {
      const { donorListCSVExport, success } = conversion
      this.setState({ donorListCSVExport, success })
    } else {
      const { errors, success } = conversion
      this.setState({ errors, success })
    }
  }

  handleCSVChange(e) {
    this.clearErrorMessages()
    console.log('Upload -> ', e.target.files[0])

    const reader = new FileReader()
    reader.onload = e => {
      const csvContent = e.target.result
      this.setState({ csvContent })
      this.checkSpreadsheet()
    }
    reader.readAsText(e.target.files[0])
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
          donorListCSVExport={this.state.donorListCSVExport}
          errors={this.state.errors}
          success={this.state.success}
        />
        <Footer toggleModal={this.toggleModal.bind(this)} />
      </>
    )
  }
}

export default App
