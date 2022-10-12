const addDataSourceValidate = [
  {
    field: 'sourceName',
    validations: ['required'],
    name: 'Source Name'
  },
  {
    field: 'fromEmail',
    validations: ['required, email'],
    name: 'From email'
  },
  {
    field: 'apiSource',
    validations: ['required'],
    name: 'Api Source'
  },
  {
    field: 'customer',
    validations: ['required'],
    name: 'Customer'
  },
  {
    field: 'subject',
    validations: ['required'],
    name: 'Subject'
  },
  {
    field: 'skipRows',
    validations: ['required', 'numeric'],
    name: 'Skip Rows'
  },
  {
    field: 'skipFooters',
    validations: ['required', 'numeric'],
    name: 'Skip Footer'
  }
];

export default addDataSourceValidate;
