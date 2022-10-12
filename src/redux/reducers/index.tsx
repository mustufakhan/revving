import { combineReducers } from 'redux';
import login from './Login/loginReducer';
import dataSource from './DataSource/DateSourceListReducer';
import addDataSource from './DataSource/AddDataSourceReducer';
import deleteDataSource from './DataSource/DeleteDataSourceReducer';
import updateDataSource from './DataSource/UpdateDataSourceReducer';
import revenueSourceList from './RevenueSource/RevenueSourceListReducer';
import revenueSourceMasterApi from './RevenueSource/RevenueSourceMasterList2';
import addRevenueSource from './RevenueSource/AddRevenueSourceReducer';
import updateRevenueSource from './RevenueSource/UpdateRevenueSourceReducer';
import deleteRevenueSource from './RevenueSource/DeleteRevenueSourceReducer';
import addMapping from './IngestionMapping/AddMappingReducer';
import updateMapping from './IngestionMapping/UpdateMappingReducer';
import getMappingList from './IngestionMapping/GetMappingListReducer';
import deleteMapping from './IngestionMapping/DeleteMappingReducer';
import getDBColumnList from './IngestionMapping/GetDBColumnReducer';
import getCsvColumnList from './IngestionMapping/GetCsvColumnListReducer';
import uploadCsvColumn from './IngestionMapping/UploadCSVColumnReducer';
import customerList from './Customer/CustomerListReducer';
import UserList from './Customer/GetCustomerUsersReducer';
import addCustomer from './Customer/AddCustomerReducer';
import statusList from './EmailMetaData/EmailStatusReducer';
import emailRecalculate from './EmailMetaData/ReCalculateReducer';
import emailMetaDataList from './EmailMetaData/EmailMetaDataListReducer';
import retrigger from './EmailMetaData/Retrigger';
import emailIgnore from './EmailMetaData/EmailIgnoreReducer';
import uploadCsvFile from './EmailMetaData/UploadCsvFileReducer';
import deleteCustomer from './Customer/DeleteCustomerReducer';
import updateCustomer from './Customer/UpdateCustomerReducer';
import editCustomer from './Customer/EditCustomerReducer';
import billingMonthList from './BillingMonths/BillingMonthListReducer';
import revenueDataList from './RevenueData/RevenueDataListReducer';
import notionalInvoiceList from './NotionalInvoice/NotionalInvoiceListReducer';
import exportCsv from './NotionalInvoice/ExportCsv';
import exportBillingMonthCsv from './BillingMonths/Export';
import exportRevenueDataCsv from './RevenueData/Export';
import bulkUpdateRevenueSource from './RevenueSource/BulkUpdateReducer';
import calculationTest from './RevenueSource/CalculationTest';
import revenueSourceMasterList from './RevenueSource/RevenueSourceMasterList';
import addRevenueSourceMaster from './RevenueSource/AddRevenueSourceMasterReducer';
import answerOptionsReducer from './AnswerOptionReducer';
import adminInvoiceleger from './Reporting/AdminInvoiceLedger';
import adminAdvanceBalance from './Reporting/AdminAdvanceBalance';
import adminTransactionLeger from './Reporting/AdminTransactionLedger';
import advanceReport from './Reporting/AdvanceReport';
import reportInvoiceLedger from './Reporting/AdvanceReport/ReportInvoiceLedger';
import reportInvoiceAdvanceLedger from './Reporting/AdvanceReport/ReportInvoiceAdvanceLedger';
import reportRevenueCollection from './Reporting/AdvanceReport/ReportRevenueCollection';
import workflowA from './Accounting/WorkflowA';
import recalculateWorkFlowA from './Accounting/WorkflowA/Recalculate';
import acceptWorkFlowA from './Accounting/WorkflowA/AcceptFlow';
import rejectWorkFlowA from './Accounting/WorkflowA/RejectFlow';
import CalculateBillingInvoice from './Accounting/WorkflowA/CalculateBillingInvoice';
import workflowB from './Accounting/WorkflowB';
import updateBillingInvoice from './Accounting/WorkflowB/Update';
import invoiceExcel from './Reporting/AdminInvoiceLedger/excel';
import transactionExcel from './Reporting/AdminTransactionLedger/excel';
import advanceExcel from './Reporting/AdminAdvanceBalance/excel';
import advanceReportExcel from './Reporting/AdvanceReport/excel';
import billingInvoice from './Accounting/WorkflowB/BillingInvoice';
import billingRecalculate from './Accounting/WorkflowB/Recalculate';
import userList from './Administration/UserList';
import userListAdd from './Administration/UserList/addCustomer';
import userAdd from './Administration/UserList/addUser';
import accountEdit from './Administration/AccountingEdit';
import accountingStatusEdit from './Administration/AccountingEdit/accountingStatusEdit';
import revenueSourceAcc from './Administration/RevenueSourceAcc';
import updateRevenueAcc from './Administration/RevenueSourceAcc/UpdateRevenue';
import apiDataSource from './IngestionMapping/ApiDataSource';
import adminTrasectionReport from './Reporting/AdvanceReport/AdminTransectionLedeger';
import addReportData from './Accounting/WorkflowA/AddReportData';
import invoiceSummary from './Accounting/InvoiceSummary';
import rejectedInvoiceTable from './Accounting/RejectedInvoiceTable';
import getCommentsCodat from './Accounting/InvoiceSummary/getComments';
import deleteCommentsCodat from './Accounting/InvoiceSummary/deleteComments';
import getNotionalComments from './Accounting/WorkflowB/getNotionalComments';
import createNotionalComments from './Accounting/WorkflowB/createNotionalComments';
import deleteNotionalComments from './Accounting/WorkflowB/deleteNotionalComments';
import addInvoiceData from './Accounting/WorkflowB/AddInvoiceData';
import lmsStaging from './Accounting/LmsStaging';
import stagingAction from './Accounting/LmsStaging/StagingAction';
import lmsInvoiceHistory from './Accounting/LmsInvoiceHistory';
import revenueSourceConnectFalse from './Administration/RevenueSourceConnectFalse';
import kantoxAccounts from './IngestionMapping/KontexReference';
import addkantoxAccounts from './IngestionMapping/AddKontexReference';
import kantoxCompanyReference from './IngestionMapping/KotntexCompanyReference';
import kantoxDeleteCustomer from './IngestionMapping/KontexCustomerDelete';
import kantoxEditCustomer from './IngestionMapping/KontexCustomerEdit';
import revMasterDetails from './RevMasterDetails';
import addNewRevMasterDetails from './RevMasterDetails/AddRevenueSourceNew';
import kantoxAvailableCustomer from './IngestionMapping/KontexAvailableCustomer';
import updateTransactionalInvoice from './Accounting/WorkflowB/UpdateTransactionalSet';
import getNotionalTransactionalInvoice from './NotionalInvoice/GetNotionalInvoice';
import transNotionalInvoice from './NotionalInvoice/TransNationalInvoice';
import downloadCSVFile from './IngestionMapping/DownloadCSVFIle';
import kantoxAvailableRevenueSource from './IngestionMapping/KontexAvailableRevenueSource';
import retriveInfoReducer from './CreditEngine/RetriveInfoReducer';
import creditAssessmentReducer from './CreditEngine/CreditAssessmentReducer';
import obligorRetriveInfo from './CreditEngine/ObligorRetriveInfoReducer';
import cccListInfo from './CreditEngine/CccListReducer';
import parentRetriveInfo from './CreditEngine/ParentRetriveInfoReducer';
import parentAddCustomer from './Customer/ParAddCustomerReducer';
import parentEditCustomer from './Customer/ParEditCustomerReducer';
import editObligor from './Obligor/EditObligorReducer';
import addObligor from './Obligor/AddObligorReducer';
import oblParRetrieveInfo from './Obligor/OblParRetrieveInfo';
import oblParEditReducer from './Obligor/EditOblParReducer';
import creditHistory from './CreditEngine/CreditHistory';
import checklist from './Administration/EligibilityCheckList';
import categoriesList from './CreditEngine/CategoryList';
import customerSearch from './CreditEngine/OnboardedCreditReducer';

// Wrap all reducers in a container

export default combineReducers({
  login,
  dataSource,
  addMapping,
  statusList,
  addCustomer,
  emailIgnore,
  customerList,
  UserList,
  updateMapping,
  deleteMapping,
  addDataSource,
  uploadCsvFile,
  deleteCustomer,
  getMappingList,
  updateCustomer,
  emailRecalculate,
  getDBColumnList,
  revenueDataList,
  billingMonthList,
  addRevenueSource,
  deleteDataSource,
  getCsvColumnList,
  uploadCsvColumn,
  updateDataSource,
  revenueSourceList,
  notionalInvoiceList,
  updateRevenueSource,
  deleteRevenueSource,
  emailMetaDataList,
  retrigger,
  exportCsv,
  exportBillingMonthCsv,
  exportRevenueDataCsv,
  bulkUpdateRevenueSource,
  calculationTest,
  revenueSourceMasterList,
  addRevenueSourceMaster,
  answerOptionsReducer,
  adminInvoiceleger,
  adminAdvanceBalance,
  adminTransactionLeger,
  advanceReport,
  reportInvoiceLedger,
  reportInvoiceAdvanceLedger,
  workflowA,
  reportRevenueCollection,
  recalculateWorkFlowA,
  acceptWorkFlowA,
  rejectWorkFlowA,
  workflowB,
  invoiceExcel,
  transactionExcel,
  advanceExcel,
  advanceReportExcel,
  billingInvoice,
  billingRecalculate,
  userList,
  userListAdd,
  accountEdit,
  accountingStatusEdit,
  revenueSourceAcc,
  updateRevenueAcc,
  apiDataSource,
  adminTrasectionReport,
  addReportData,
  userAdd,
  invoiceSummary,
  rejectedInvoiceTable,
  getCommentsCodat,
  deleteCommentsCodat,
  CalculateBillingInvoice,
  getNotionalComments,
  createNotionalComments,
  deleteNotionalComments,
  addInvoiceData,
  lmsStaging,
  stagingAction,
  lmsInvoiceHistory,
  revenueSourceConnectFalse,
  kantoxAccounts,
  addkantoxAccounts,
  kantoxCompanyReference,
  kantoxDeleteCustomer,
  kantoxEditCustomer,
  revMasterDetails,
  addNewRevMasterDetails,
  kantoxAvailableCustomer,
  updateBillingInvoice,
  updateTransactionalInvoice,
  getNotionalTransactionalInvoice,
  transNotionalInvoice,
  downloadCSVFile,
  kantoxAvailableRevenueSource,
  revenueSourceMasterApi,
  retriveInfoReducer,
  creditAssessmentReducer,
  obligorRetriveInfo,
  editCustomer,
  cccListInfo,
  parentRetriveInfo,
  parentAddCustomer,
  parentEditCustomer,
  editObligor,
  addObligor,
  oblParRetrieveInfo,
  oblParEditReducer,
  creditHistory,
  checklist,
  categoriesList,
  customerSearch
});
