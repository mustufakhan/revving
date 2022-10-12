import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Layout from './Layout';
import requireAuth from '../hoc/withAuth';

const Landing = lazy(() => import('../containers/Landing'));
const PageNotFound = lazy(() => import('../containers/PageNotFound'));
const Login = lazy(() => import('../containers/SignIn'));
const EmailMetaData = lazy(() => import('../containers/Ingestion/EmailMetaData'));
const Mapping = lazy(() => import('../containers/Ingestion/Mapping'));
const RevenueSource = lazy(() => import('../containers/Ingestion/RevenueSource'));
const Customers = lazy(() => import('../containers/Ingestion/Customers'));
const DataSources = lazy(() => import('../containers/DataSources'));
const BillingMonth = lazy(() => import('../containers/Invoicing/BillingMonth'));
const RevenueData = lazy(() => import('../containers/Ingestion/RevenueData'));
const NotionalInvoice = lazy(() => import('../containers/Invoicing/NotionalInvoice'));
const AdminInvoiceLedger = lazy(() => import('../containers/Reporting/AdminInvoiceLedger'));
const AdminAdvanceBalance = lazy(() => import('../containers/Reporting/AdminAdvanceBalance'));
const AdminTransactionLedger = lazy(() => import('../containers/Reporting/AdminTransactionLedger'));
const AdvanceReport = lazy(() => import('../containers/Reporting/AdvanceReport'));
const WorkflowA = lazy(() => import('../containers/Accounting/WorkflowA'));
const WorkFlowB = lazy(() => import('../containers/Accounting/WorkflowB'));
const InvoiceSummary = lazy(() => import('../containers/Accounting/InoviceSummary'));
const LmsStaging = lazy(() => import('../containers/Accounting/LMSStagingTable'));
const LmsInvoiceHistory = lazy(() => import('../containers/Accounting/LMSInvoiceHistory'));
const KontexReference = lazy(() => import('../containers/Ingestion/KontexReference'));
const RejectedInvoiceTable = lazy(() => import('../containers/Accounting/RejectedInvoiceTable'));
const UserList = lazy(() => import('../containers/Administration/UserList'));
const UnassignedUserList = lazy(() => import('../containers/Administration/UnassignedUserList'));
const RevenueSourceMasters = lazy(() => import('../containers/RevenueSourceMasters'));

const AccountingAdminEdit = lazy(() => import('../containers/Administration/AccountingEdit'));
const ConnectedRevenueAdminEdit = lazy(() => import('../containers/Administration/ConnectEdit'));
const RevenueSourceAccount = lazy(() => import('../containers/Administration/RevenueSourceAcc'));
const ApiRevenueSource = lazy(() => import('../containers/Administration/ApiRevenuSource'));

const AdminCreditEngine = lazy(() => import('../containers/Credit/CreditEngine'));

const AdminCreditHistory = lazy(() => import('../containers/Credit/CreditHistory'));

const AdminCreditOnboard = lazy(() => import('../containers/Credit/CreditOnboard/index'));

const Routes = () => (
  <Router>
    <Suspense
      fallback={
        <Box className='loader'>
          <Box className='bar' />
          <Box className='bar' />
          <Box className='bar' />
        </Box>
      }
    >
      <Switch>
        {/*  Public Route  */}
        <Route exact path='/login' component={Login} />

        {/*  Auth Route  */}
        <Layout>
          {/*  Landing Route  */}
          <Route exact path='/' component={requireAuth(Landing)} />

          {/*  Ingestion Route  */}
          <Route exact path='/dataingestion/file-data-mapping' component={requireAuth(Mapping)} />
          <Route
            exact
            path='/customers/revenue-source-pricing'
            component={requireAuth(RevenueSource)}
          />
          <Route
            exact
            path='/dataingestion/file-ingestion'
            component={requireAuth(EmailMetaData)}
          />
          <Route exact path='/customers/customers-list' component={requireAuth(Customers)} />
          <Route
            exact
            path='/dataingestion/data-source-setup'
            component={requireAuth(DataSources)}
          />
          <Route
            exact
            path='/transactionalInvoices/revenue-data'
            component={requireAuth(RevenueData)}
          />
          <Route
            exact
            path='/customers/kantox-beneficiary-references'
            component={requireAuth(KontexReference)}
          />
          {/*  Invoicing Route  */}
          <Route
            exact
            path='/transactionalInvoices/billing-calender'
            component={requireAuth(BillingMonth)}
          />
          <Route
            exact
            path='/transactionalInvoices/transactional-invoices'
            component={requireAuth(NotionalInvoice)}
          />

          {/* Reporting Route */}
          <Route
            exact
            path='/reporting/sent-transactional-invoices-status'
            component={requireAuth(AdminInvoiceLedger)}
          />
          <Route
            exact
            path='/reporting/advance-balance-per-customer'
            component={requireAuth(AdminAdvanceBalance)}
          />
          <Route
            exact
            path='/reporting/event-history'
            component={requireAuth(AdminTransactionLedger)}
          />
          <Route
            exact
            path='/reporting/advances-per-billing-invoice'
            component={requireAuth(AdvanceReport)}
          />

          {/* month End Invoices */}
          <Route
            exact
            path='/monthEndInvoices/factor-invoices-to-purchase'
            component={requireAuth(WorkflowA)}
          />
          <Route
            exact
            path='/monthEndInvoices/matched-transactional-invoice'
            component={requireAuth(WorkFlowB)}
          />
          <Route
            exact
            path='/monthEndInvoices/month-end-invoices'
            component={requireAuth(InvoiceSummary)}
          />
          <Route
            exact
            path='/monthEndInvoices/unmatched-invoices'
            component={requireAuth(RejectedInvoiceTable)}
          />

          {/* send To Lms */}

          <Route exact path='/sendToLms/lms-staging' component={requireAuth(LmsStaging)} />
          <Route
            exact
            path='/sendToLms/lms-invoice-history'
            component={requireAuth(LmsInvoiceHistory)}
          />

          {/* Administartion Route */}
          <Route exact path='/customers/user-list' component={requireAuth(UserList)} />
          <Route
            exact
            path='/customers/unassigned-users'
            component={requireAuth(UnassignedUserList)}
          />
          <Route
            exact
            path='/customers/revenue-source-status'
            component={requireAuth(AccountingAdminEdit)}
          />
          <Route
            exact
            path='/administration/ConnectedRevenueAdminEdit'
            component={requireAuth(ConnectedRevenueAdminEdit)}
          />
          <Route
            exact
            path='/revenuesources/codat-name-mapping'
            component={requireAuth(RevenueSourceAccount)}
          />
          <Route
            exact
            path='/administration/ApiRevenueSource'
            component={requireAuth(ApiRevenueSource)}
          />
          <Route
            exact
            path='/revenuesources/revenue-source-masters'
            component={requireAuth(RevenueSourceMasters)}
          />
          <Route
            exact
            path='/creditEngine/preliminary-credit-check'
            component={requireAuth(AdminCreditEngine)}
          />
          <Route
            exact
            path='/creditEngine/credit-score-history'
            component={requireAuth(AdminCreditHistory)}
          />
          <Route
            exact
            path='/creditEngine/Onboarded-Credit-assessment'
            component={requireAuth(AdminCreditOnboard)}
          />
        </Layout>
        <Route path='*' component={PageNotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
