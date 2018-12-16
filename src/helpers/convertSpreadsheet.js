import {
  deductionAmountCents,
  depositedAmountCents,
  stringAmountDollars,
} from '.'

import { compact } from 'lodash'

export default ({ rawData } = {}) => {
  let header
  const rows = []
  const fullRecords = []
  const csvExport = []
  const errors = []

  const desiredColumns = [
    'signup_full_name',
    'signup_email',
    'billing_address1',
    'billing_city',
    'billing_state',
    'billing_zip',
    'amount_in_cents',
  ]

  const data = compact(rawData.split('\n'))

  const fullAddress = (address, city, state, zip) =>
    `${address}, ${city} ${state}, ${zip}`

  // Break content into rows and header
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      header = data[i].split(',')
    } else {
      if (data[i].split(',').length > 1) {
        const row = data[i].split(',')
        if (compact(row).length > 0) rows.push(data[i].split(','))
      }
    }
  }

  // Check if there's more than one content row. Exit if no.
  if (rows.length === 0) {
    return {
      success: false,
      errors: [
        {
          title: 'No data present',
          message: "Verify the CSV file. We can't find any records here.",
        },
      ],
    }
  }

  // Get the column index for the desired content
  for (let i = 0; i < desiredColumns.length; i++) {
    const itemIndex = header.indexOf(desiredColumns[i])
    if (itemIndex !== -1) {
      for (let j = 0; j < rows.length; j++) {
        if (fullRecords[j] === undefined) {
          fullRecords.push({})
        }
        fullRecords[j][desiredColumns[i]] = rows[j][itemIndex]
      }
    } else {
      errors.push({
        title: `Missing column: ${desiredColumns[i]}`,
        message: `The column ${
          desiredColumns[i]
        } is missing. This is likely due to an upgrade of the nationbuilder app. Please contact the author of the app at the bottom`,
      })
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

  return errors.length > 0
    ? {
        success: false,
        errors,
      }
    : {
        success: true,
        data: csvExport,
      }
}
