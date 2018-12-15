const { deductionAmountCents } = require('.')

module.exports = amount => amount - deductionAmountCents(amount)
