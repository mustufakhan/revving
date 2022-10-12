import { all } from 'redux-saga/effects';
import { LOGIN_USER_SAGA } from './Login/loginSaga';
import { DATA_SOURCE_SAGA } from './DataSource/GetDataSourceListSaga';
import { REVENUE_SOURCE_LIST_SAGA } from './RevenueSource/RevenueSourceListSaga';
import { ADD_REVENUE_SOURCE_SAGA } from './RevenueSource/AddRevenueSourceSaga';
import { UPDATE_REVENUE_SOURCE_SAGA } from './RevenueSource/UpdateRevenueSourceSaga';
import { DELETE_REVENUE_SOURCE_SAGA } from './RevenueSource/DeleteRevenueSourceSaga';
import { GET_DB_COLUMN_SAGA } from './IngestionMapping/GetDBColumnSaga';
import { ADD_MAPPING_SAGA } from './IngestionMapping/AddMappingSaga';
import { DELETE_MAPPING_SAGA } from './IngestionMapping/DeleteMappingSaga';
import { MAPPING_LIST_SAGA } from './IngestionMapping/GetMappingListSaga';
import { UPDATE_MAPPING_SAGA } from './IngestionMapping/UpdateMappingSaga';
import { GET_STATUS_LIST_SAGA } from './EmailMetaData/EmailStatusListSaga';
import { UPLOAD_CSV_SAGA } from './EmailMetaData/CsvUploadSaga';
import { EMAIL_RECALCULATE_SAGA } from './EmailMetaData/ReCalculateSaga';
import { GET_EMAIL_METADATA_LIST_SAGA } from './EmailMetaData/EmailMetaDataListSaga';
import { EMAIL_METADATA_IGNORE_SAGA } from './EmailMetaData/EmailIgnoreSaga';
import { ADMIN_INVOICE_LEDGER_SAGA } from './Reporting/AdminInvoiceLedger';
import { ADMIN_ADVANCE_BALANCE_SAGA } from './Reporting/AdminAdvanceBalance';
import { ADMIN_TRANSACTION_LEDGER_SAGA } from './Reporting/AdminTransactionLedger';
import { ADVANCE_REPORT_SAGA } from './Reporting/AdvanceReport';
import { GET_RETRIGGER_SAGA } from './EmailMetaData/RetriggerSaga';
import { GET_CUSTOMER_LIST_SAGA } from './Customer/CustomerListSaga';
import { GET_USERS_LIST_SAGA } from './Customer/GetCustomerUsers';
import { ADD_CUSTOMER_SAGA } from './Customer/AddCustomerSaga';
import { DELETE_CUSTOMER_SAGA } from './Customer/DeleteCustomerSaga';
import { UPDATE_CUSTOMER_SAGA } from './Customer/UpdateCustomerSaga';
import { EDIT_CUSTOMER_SAGA } from './Customer/EditCustomerSaga';
import { ADD_DATA_SOURCE_SAGA } from './DataSource/AddDataSourceSaga';
import { DELETE_DATA_SOURCE_SAGA } from './DataSource/DeleteDataSourceSaga';
import { UPDATE_DATA_SOURCE_SAGA } from './DataSource/UpdateDataSourceSaga';
import { GET_BILLING_MONTHS_SAGA } from './BillingMonth/BillingMonthList';
import { GET_REVENUE_DATA_LIST_SAGA } from './RevenueData/RevenueDataListSaga';
import { GET_NOTIONAL_INVOICE_SAGA } from './NotionalInvoice/NotionalInvoiceList';
import { EXPORT_CSV_SAGA } from './NotionalInvoice/ExportCsv';
import { EXPORT_BILLING_MONTH_CSV_SAGA } from './BillingMonth/Export';
import { EXPORT_REVENUE_DATA_CSV_SAGA } from './RevenueData/Export';
import { GET_CSV_COLUMN_SAGA } from './IngestionMapping/CsvColumnSheetSaga';
import { UPLOAD_CSV_COLUMN_SAGA } from './IngestionMapping/UploadCsvColumnSaga';
import { BULK_UPDATE_REVENUE_SOURCE_SAGA } from './RevenueSource/BulkUpdateSaga';
import { REVENUE_SOURCE_CALCULATION_TEST_SAGA } from './RevenueSource/CalculationTestSaga';
import { REVENUE_SOURCE_MASTER_LIST_SAGA } from './RevenueSource/RevenueSourceMasterListSaga';
import { REVENUE_SOURCE_MASTER_LIST2_SAGA } from './RevenueSource/RevenueSourceMasterListSaga2';
import { ADD_REVENUE_SOURCE_MASTER_SAGA } from './RevenueSource/AddRevenueSourceMasterSaga';
import { OPTIONS_LIST_SAGA } from './AnswerOptionsSaga';
import { REPORT_INVOICE_SAGA } from './Reporting/AdvanceReport/ReportInvoiceLedger';
import { REPORT_REVENUE_COLLECTION_SAGA } from './Reporting/AdvanceReport/ReportRevenueCollection';
import { REPORT_INVOICE_ADVANCE_LEDGER_SAGA } from './Reporting/AdvanceReport/ReportInvoiceAdvanceLedger';
import { ACCOUNTING_DETAILS_SAGA } from './Accounting/WorkflowA';
import { ACCOUNTING_RECALCULATE_SAGA } from './Accounting/WorkflowA/Recalculate';
import { ACCOUNTING_REJECT_SAGA } from './Accounting/WorkflowA/RejectFlow';
import { ACCOUNTING_ACCEPT_SAGA } from './Accounting/WorkflowA/AcceptFlow';
import { NATIONAL_INVOICE_SAGA } from './Accounting/WorkflowB';
import { EXPORT_INVOICE_CSV_SAGA } from './Reporting/AdminInvoiceLedger/excel';
import { EXPORT_TRANSECTION_CSV_SAGA } from './Reporting/AdminTransactionLedger/excel';
import { EXPORT_ADVANCE_CSV_SAGA } from './Reporting/AdminAdvanceBalance/excel';
import { EXPORT_ADVANCE_REPORT_CSV_SAGA } from './Reporting/AdvanceReport/excel';
import { BILLING_INVOICE_SAGA } from './Accounting/WorkflowB/BillingInvoice';
import { CALCULATE_BILLING_INVOICE_SAGA } from './Accounting/WorkflowA/CalculateBillingInvoice';
import { UPDATE_BILLING_INVOICE_SAGA } from './Accounting/WorkflowB/Update';
import { BILLING_RECALCULATE_SAGA } from './Accounting/WorkflowB/Recalculate';
import { USER_LIST_SAGA } from './Administration/UserList';
import { ADD_CUSTOMER_VALUE_SAGA } from './Administration/UserList/addCustomer';
import { ADD_USER_SAGA } from './Administration/UserList/addUser';
import { ACCOUNTING_EDIT_SAGA } from './Administration/AccountingEdit';
import { ACCOUNTING_STATUS_EDIT_SAGA } from './Administration/AccountingEdit/accountingApprove';
import { REVENUE_ACCOUNT_LIST_SAGA } from './Administration/RevenueSourceAcc';
import { REVENUE_SOURCE_MASTER_UPDATE_SAGA } from './Administration/RevenueSourceAcc/UpdateRevenue';
import { API_SOURCE_DATA_SAGA } from './IngestionMapping/ApiDataSource';
import { REPORT_ADMIN_TRANSECTION_LEDGER_SAGA } from './Reporting/AdvanceReport/AdminTransectionLedger';
import { ADD_REPORT_DATA_SOURCE_SAGA } from './Accounting/WorkflowA/AddReportData';
import { INVOICE_SUMMARY_SAGA } from './Accounting/InvoiceSummary';
import { REJECTED_INVOICE_TABLE_SAGA } from './Accounting/RejectedInvoiceTable';
import { CREATE_CODAT_COMMENT_SAGA } from './Accounting/InvoiceSummary/getComments';
import { DELETE_COMMENTS_SAGA } from './Accounting/InvoiceSummary/deleteComments';
import { GET_NOTIONAL_COMMENTS_SAGA } from './Accounting/WorkflowB/getNotionalComments';
import { CREATE_NOTIONAL_COMMENT_SAGA } from './Accounting/WorkflowB/createNotionalComments';
import { DELETE_NOTIONAL_COMMENTS_SAGA } from './Accounting/WorkflowB/deleteNotionalComments';
import { ADD_INVOICE_DATA_SOURCE_SAGA } from './Accounting/WorkflowB/AddInvoiceData';
import { LMS_STAGING_SAGA } from './Accounting/LmsStaging';
import { STAGING_ACTION_SAGA } from './Accounting/LmsStaging/StagingAction';
import { LMS_INVOICE_HISTORY_SAGA } from './Accounting/LmsInvoiceHistory';
import { REVENUE_SOURCE_CONNECT_FALSE_SAGA } from './Administration/RevenueSourceConnectFalse';
import { KANTOX_ACCOUNTS_SAGA } from './IngestionMapping/KontexReference';
import { ADD_KANTOX_SAGA } from './IngestionMapping/AddKontexReference';
import { KONTEX_COMPANY_REFERENCE_SAGA } from './IngestionMapping/KotntexCompanyReference';
import { DELETE_KONTEX_CUSTOMER_SAGA } from './IngestionMapping/KontexCustomerDelete';
import { EDIT_KONTEX_ACCOUNT_SAGA } from './IngestionMapping/KontexCustomerEdit';
import { REV_MASTER_DETAILS_SAGA } from './RevMasterDetails';
import { ADD_REVENUE_SOURCE_NEW_SAGA } from './RevMasterDetails/AddRevenueMaster';
import { KANTOX_AVAILABLE_CUSTOMER_SAGA } from './IngestionMapping/KontexAvailableCustomer';
import { UPDATE_TRANSACTIONAL_INVOICE_SAGA } from './Accounting/WorkflowB/UpdateTransactionalSet';
import { GET_NOTIONAL_TRANS_INVOICE_SAGA } from './NotionalInvoice/GetNotionalInvoice';
import { TRANS_NOTIONAL_INVOICE_SAGA } from './NotionalInvoice/TransNotionalInvoice';
import { DOWNLOAD_CSV_SAGA } from './IngestionMapping/DownloadCSVFIle';
import { KANTOX_AVAILABLE_REVENUE_SOURCE_SAGA } from './IngestionMapping/KontexAvailableRevenueSource';
import { CREDET_RETRIVE_INFO_SAGA } from './CreditEngine/RetriveInfo';
import { GET_PRE_ASSESSMENT } from './CreditEngine/CreditAssesment';
import { CREDET_OBLIGOR_RETRIVE_INFO_SAGA } from './CreditEngine/RetriveInfoObligor';
import { CCCLIST_INFO_SAGA } from './CreditEngine/Category';
import { PARENT_RETRIVE_INFO_SAGA } from './CreditEngine/ParentRetriveInfo';
import { PAR_ADD_CUSTOMER_SAGA } from './Customer/AddParCustomerData';
import { PAR_EDIT_CUSTOMER_SAGA } from './Customer/EditParCustomerSaga';
import { EDIT_OBLIGOR_SAGA } from './Obligor/EditObligorSaga';
import { ADD_OBLIGOR_SAGA } from './Obligor/AddObligorSaga';
import { OBL_PARENT_RETRIVE_INFO_SAGA } from './Obligor/OblParRetriveInfo';
import { OBL_PAR_EDIT_OBLIGOR_SAGA } from './Obligor/EditParOblSaga';
import { CREDIT_HISTORY_SAGA } from './CreditEngine/CreditHistory';
import { CHECK_LIST_SAGA } from './Administration/EligibilityCheckListSaga';
import { CUSTOMER_SEARCH_SAGA } from './CreditEngine/OnboardedCreditSaga';
import { CATEGORY_LIST_SAGA } from './CreditEngine/CategoryList';

// Wrap all sagas in a container sagas
const rootSaga = function* rootSaga() {
  yield all([
    LOGIN_USER_SAGA(),
    UPLOAD_CSV_SAGA(),
    DATA_SOURCE_SAGA(),
    ADD_MAPPING_SAGA(),
    MAPPING_LIST_SAGA(),
    GET_DB_COLUMN_SAGA(),
    ADD_CUSTOMER_SAGA(),
    UPDATE_MAPPING_SAGA(),
    DELETE_MAPPING_SAGA(),
    GET_STATUS_LIST_SAGA(),
    DELETE_CUSTOMER_SAGA(),
    UPDATE_CUSTOMER_SAGA(),
    ADD_DATA_SOURCE_SAGA(),
    GET_CSV_COLUMN_SAGA(),
    EMAIL_RECALCULATE_SAGA(),
    GET_NOTIONAL_INVOICE_SAGA(),
    UPLOAD_CSV_COLUMN_SAGA(),
    GET_CUSTOMER_LIST_SAGA(),
    GET_BILLING_MONTHS_SAGA(),
    UPDATE_DATA_SOURCE_SAGA(),
    DELETE_DATA_SOURCE_SAGA(),
    ADD_REVENUE_SOURCE_SAGA(),
    REVENUE_SOURCE_LIST_SAGA(),
    UPDATE_REVENUE_SOURCE_SAGA(),
    DELETE_REVENUE_SOURCE_SAGA(),
    GET_REVENUE_DATA_LIST_SAGA(),
    GET_EMAIL_METADATA_LIST_SAGA(),
    GET_RETRIGGER_SAGA(),
    EXPORT_CSV_SAGA(),
    OPTIONS_LIST_SAGA(),
    EXPORT_BILLING_MONTH_CSV_SAGA(),
    EMAIL_METADATA_IGNORE_SAGA(),
    EXPORT_REVENUE_DATA_CSV_SAGA(),
    BULK_UPDATE_REVENUE_SOURCE_SAGA(),
    REVENUE_SOURCE_CALCULATION_TEST_SAGA(),
    REVENUE_SOURCE_MASTER_LIST_SAGA(),
    REVENUE_SOURCE_MASTER_LIST2_SAGA(),
    ADD_REVENUE_SOURCE_MASTER_SAGA(),
    ADMIN_INVOICE_LEDGER_SAGA(),
    ADMIN_ADVANCE_BALANCE_SAGA(),
    ADMIN_TRANSACTION_LEDGER_SAGA(),
    ADVANCE_REPORT_SAGA(),
    REPORT_INVOICE_SAGA(),
    REPORT_REVENUE_COLLECTION_SAGA(),
    REPORT_INVOICE_ADVANCE_LEDGER_SAGA(),
    ACCOUNTING_DETAILS_SAGA(),
    ACCOUNTING_RECALCULATE_SAGA(),
    ACCOUNTING_REJECT_SAGA(),
    ACCOUNTING_ACCEPT_SAGA(),
    NATIONAL_INVOICE_SAGA(),
    EXPORT_INVOICE_CSV_SAGA(),
    EXPORT_TRANSECTION_CSV_SAGA(),
    EXPORT_ADVANCE_CSV_SAGA(),
    EXPORT_ADVANCE_REPORT_CSV_SAGA(),
    BILLING_INVOICE_SAGA(),
    CALCULATE_BILLING_INVOICE_SAGA(),
    UPDATE_BILLING_INVOICE_SAGA(),
    BILLING_RECALCULATE_SAGA(),
    USER_LIST_SAGA(),
    ADD_CUSTOMER_VALUE_SAGA(),
    ACCOUNTING_EDIT_SAGA(),
    ACCOUNTING_STATUS_EDIT_SAGA(),
    REVENUE_ACCOUNT_LIST_SAGA(),
    REVENUE_SOURCE_MASTER_UPDATE_SAGA(),
    API_SOURCE_DATA_SAGA(),
    REPORT_ADMIN_TRANSECTION_LEDGER_SAGA(),
    ADD_REPORT_DATA_SOURCE_SAGA(),
    ADD_USER_SAGA(),
    INVOICE_SUMMARY_SAGA(),
    REJECTED_INVOICE_TABLE_SAGA(),
    CREATE_CODAT_COMMENT_SAGA(),
    DELETE_COMMENTS_SAGA(),
    GET_NOTIONAL_COMMENTS_SAGA(),
    CREATE_NOTIONAL_COMMENT_SAGA(),
    DELETE_NOTIONAL_COMMENTS_SAGA(),
    ADD_INVOICE_DATA_SOURCE_SAGA(),
    LMS_STAGING_SAGA(),
    STAGING_ACTION_SAGA(),
    LMS_INVOICE_HISTORY_SAGA(),
    REVENUE_SOURCE_CONNECT_FALSE_SAGA(),
    KANTOX_ACCOUNTS_SAGA(),
    ADD_KANTOX_SAGA(),
    KONTEX_COMPANY_REFERENCE_SAGA(),
    DELETE_KONTEX_CUSTOMER_SAGA(),
    EDIT_KONTEX_ACCOUNT_SAGA(),
    REV_MASTER_DETAILS_SAGA(),
    ADD_REVENUE_SOURCE_NEW_SAGA(),
    KANTOX_AVAILABLE_CUSTOMER_SAGA(),
    UPDATE_TRANSACTIONAL_INVOICE_SAGA(),
    GET_NOTIONAL_TRANS_INVOICE_SAGA(),
    TRANS_NOTIONAL_INVOICE_SAGA(),
    DOWNLOAD_CSV_SAGA(),
    KANTOX_AVAILABLE_REVENUE_SOURCE_SAGA(),
    CREDET_RETRIVE_INFO_SAGA(),
    GET_PRE_ASSESSMENT(),
    CREDET_OBLIGOR_RETRIVE_INFO_SAGA(),
    EDIT_CUSTOMER_SAGA(),
    CCCLIST_INFO_SAGA(),
    PARENT_RETRIVE_INFO_SAGA(),
    PAR_ADD_CUSTOMER_SAGA(),
    PAR_EDIT_CUSTOMER_SAGA(),
    EDIT_OBLIGOR_SAGA(),
    ADD_OBLIGOR_SAGA(),
    OBL_PARENT_RETRIVE_INFO_SAGA(),
    OBL_PAR_EDIT_OBLIGOR_SAGA(),
    GET_USERS_LIST_SAGA(),
    CREDIT_HISTORY_SAGA(),
    CHECK_LIST_SAGA(),
    CUSTOMER_SEARCH_SAGA(),
    CATEGORY_LIST_SAGA()
  ]);
};

export default rootSaga;
