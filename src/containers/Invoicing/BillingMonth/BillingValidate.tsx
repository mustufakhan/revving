const billingValidate = [
  {
    field: 'payoutTimes',
    validations: ['required', 'numeric'],
    name: 'Payout Times'
  },
  {
    field: 'closingTime',
    validations: ['required', 'numeric'],
    name: 'Closing Time'
  }
];

export default billingValidate;
