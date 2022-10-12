const addRevenueValidate = [
  {
    field: 'name',
    validations: ['required'],
    name: 'Revenue name'
  },
  // {
  //   field: 'revenueSource',
  //   validations: ['required'],
  //   name: 'Revenue Source'
  // },
  {
    field: 'impressionValue',
    validations: ['numeric'],
    name: 'Impression value'
  },
  {
    field: 'salesTax',
    validations: ['numeric'],
    name: 'Sales Tax value'
  },
  {
    field: 'selectMasterValue',
    validations: ['required'],
    name: 'Master Revenue value'
  }
];

export default addRevenueValidate;
