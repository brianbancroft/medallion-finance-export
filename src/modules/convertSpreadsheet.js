const fs = require('fs')

const {
  deductionAmountCents,
  depositedAmountCents,
  stringAmountDollars,
} = require('../helpers')

module.exports = ({ sourceFile } = {}) => {
  const contents = fs.readFileSync(sourceFile, 'utf8').split('\n')

  let header
  const rows = []
  const fullRecords = []
  const csvExport = []

  const desiredColumns = [
    'signup_full_name',
    'signup_email',
    'address1',
    'city',
    'state',
    'zip',
    'amount_in_cents',
  ]

  const fullAddress = (address, city, state, zip) =>
    `${address}, ${city} ${state}, ${zip}`

  // Break content into rows and header
  for (let i = 0; i < contents.length; i++) {
    if (i === 0) {
      header = contents[i].split(',')
    } else {
      if (contents[i].split(',').length > 1) {
        rows.push(contents[i].split(','))
      }
    }
  }

  // Get the column index for the desired content
  for (let i = 0; i < desiredColumns.length; i++) {
    const itemIndex = header.indexOf(desiredColumns[i])

    for (let j = 0; j < rows.length; j++) {
      if (fullRecords[j] === undefined) {
        fullRecords.push({})
      }
      fullRecords[j][desiredColumns[i]] = rows[j][itemIndex]
    }
  }

  // Loop through each item and build converts
  for (let i = 0; i < fullRecords.length; i++) {
    fullRecords[i]['processor_deduction_amount_cents'] = deductionAmountCents(
      fullRecords[i]['amount_in_cents']
    )
    fullRecords[i]['processor_deduction_amount_dollars'] = stringAmountDollars(
      fullRecords[i]['processor_deduction_amount_cents']
    )
    fullRecords[i]['deposited_amount_cents'] = depositedAmountCents(
      fullRecords[i]['amount_in_cents']
    )
    fullRecords[i]['deposited_amount_dollars'] = stringAmountDollars(
      fullRecords[i]['deposited_amount_cents']
    )
    fullRecords[i]['full_text_address'] = fullAddress(
      fullRecords[i]['address1'],
      fullRecords[i]['city'],
      fullRecords[i]['state'],
      fullRecords[i]['zip']
    )
  }

  // Export
  const exportableRecords = fullRecords.map(i => ({
    name: i.signup_full_name,
    address: i.full_text_address,
    donated_amount: stringAmountDollars(i.amount_in_cents),
    processor_deducation: i.processor_deduction_amount_dollars,
    deposited_amount: i.deposited_amount_dollars,
  }))

  csvExport.push(Object.keys(exportableRecords[0]).join(', '))
  exportableRecords.forEach(i => csvExport.push(Object.values(i).join(', ')))

  fs.writeFile('export.csv', csvExport.join('\n'), function(err) {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
}
