import { compact } from 'lodash'

var STRIPE_DEDUCTION_PCNT = 2.9 / 100
var STRIPE_DEDUCTION_CENTS = 30

const depositedAmountCents = amount => amount - deductionAmountCents(amount)
const deductionAmountCents = amount =>
  Math.round(amount * STRIPE_DEDUCTION_PCNT + STRIPE_DEDUCTION_CENTS)
const stringAmountDollars = amountInCents =>
  `$${Math.round(amountInCents) / 100}`
const fullAddress = (address, city, state, zip) =>
  `${address} - ${city} ${state} - ${zip}`

function csvToArray(text) {
  let p = '',
    row = [''],
    ret = [row],
    i = 0,
    r = 0,
    s = !0,
    l
  for (l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l
      s = !s
    } else if (',' === l && s) l = row[++i] = ''
    else if ('\n' === l && s) {
      if ('\r' === p) row[i] = row[i].slice(0, -1)
      row = ret[++r] = [(l = '')]
      i = 0
    } else row[i] += l
    p = l
  }
  return ret
}

export default ({ rawData } = {}) => {
  const fullRecords = []
  let donorListCSVExport = ''
  let summaryListCSVExport = ''
  const errors = []

  const desiredColumns = [
    'signup_full_name',
    'signup_email1',
    'address1',
    'city',
    'state',
    'zip',
    'amount_in_cents',
  ]

  const data = compact(csvToArray(rawData))
  const [header, ...rows] = data
  rows.pop()

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
  // TODO: Readability refactor
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

  donorListCSVExport += Object.keys(exportableRecords[0]).join(', ') + '\n'
  exportableRecords.forEach(
    i =>
      (donorListCSVExport += `${i.name},${i.address},${i.donated_amount},${
        i.processor_deducation
      },${i.deposited_amount}\n`)
  )

  return errors.length > 0
    ? {
        success: false,
        errors,
      }
    : {
        success: true,
        donorListCSVExport,
        summaryListCSVExport,
      }
}
