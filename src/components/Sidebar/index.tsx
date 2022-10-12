import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { SidebarWrapper, ListStyled, ListItemStyled } from './Styled';

const Sidebar = () => {
  const [open, setOpen] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { location } = history;
    if (location.pathname.includes('ingestion')) {
      setOpen('ingestion');
    }
    if (location.pathname.includes('invoicing')) {
      setOpen('invoicing');
    }
  }, [history]);

  // Handle expand open
  const handleClick = (type: string) => {
    type !== open ? setOpen(type) : setOpen('');
  };

  // Handle sidebar click
  const handleSideBarClick = (ingestion: string) => {
    setActiveTab(ingestion);
    history.push(`/${ingestion}`);
    window.localStorage.removeItem('search');
  };

  const locationUrl = history.location.pathname;
  return (
    <>
      <SidebarWrapper>
        <Box height='100%' display='flex' flexDirection='column' className={activeTab}>
          <ScrollBar>
            <Box>
              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('customers')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Customers' />
                  {open === 'customers' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'customers'} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('customers-list') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('customers/customers-list')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Customer List' />
                    </ListItem>
                  </List>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('user-list') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('customers/user-list')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='User List' />
                    </ListItem>
                  </List>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('unassigned-users') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('customers/unassigned-users')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Unassigned Users' />
                    </ListItem>
                  </List>

                  <ListItem
                    className={
                      locationUrl.includes('kantox-beneficiary-references') ? 'active' : ''
                    }
                    button
                    onClick={() => handleSideBarClick('customers/kantox-beneficiary-references')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Kantox Beneficiary References' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('revenue-source-pricing') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('customers/revenue-source-pricing')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Revenue Source Pricing' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('revenue-source-status') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('customers/revenue-source-status')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Revenue Source Status' />
                  </ListItem>
                </Collapse>
              </ListStyled>

              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('revenueSources')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Revenue Sources' />
                  {open === 'revenueSources' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'revenueSources'} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('revenue-source-masters') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('revenuesources/revenue-source-masters')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Revenue Source Masters' />
                    </ListItem>
                  </List>
                  <ListItem
                    className={locationUrl.includes('codat-name-mapping') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('revenuesources/codat-name-mapping')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Codat Name Mapping' />
                  </ListItem>
                </Collapse>
              </ListStyled>

              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('dataIngestion')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Data Ingestion' />
                  {open === 'dataIngestion' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'dataIngestion'} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('data-source-setup') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('dataingestion/data-source-setup')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Data Source Setup' />
                    </ListItem>
                  </List>
                  <ListItem
                    className={locationUrl.includes('file-data-mapping') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('dataingestion/file-data-mapping')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='File Data Mapping' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('file-ingestion') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('dataingestion/file-ingestion')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='File Ingestion' />
                  </ListItem>
                </Collapse>
              </ListStyled>

              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('transectionalInvoice')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Transactional Invoices' />
                  {open === 'transectionalInvoice' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'transectionalInvoice'} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('billing-month') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('transactionalInvoices/billing-calender')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Billing Calendar' />
                    </ListItem>
                  </List>
                  <ListItem
                    className={locationUrl.includes('revenue-data') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('transactionalInvoices/revenue-data')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Revenue Data' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('transactional-invoices') ? 'active' : ''}
                    button
                    onClick={() =>
                      handleSideBarClick('transactionalInvoices/transactional-invoices')
                    }
                  >
                    <ListItemIcon />
                    <ListItemText primary='Transactional Invoices' />
                  </ListItem>
                </Collapse>
              </ListStyled>

              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('monthEndInvoice')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Month-End Invoices' />
                  {open === 'monthEndInvoice' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'monthEndInvoice'} timeout='auto' unmountOnExit>
                  <ListItem
                    className={locationUrl.includes('month-end-invoices') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('monthEndInvoices/month-end-invoices')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='All Month-End Invoices' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('factor-invoices-to-purchase') ? 'active' : ''}
                    button
                    onClick={() =>
                      handleSideBarClick('monthEndInvoices/factor-invoices-to-purchase')
                    }
                  >
                    <ListItemIcon />
                    <ListItemText primary='Factor Invoices to Purchase' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('unmatched-invoices') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('monthEndInvoices/unmatched-invoices')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Unmatched Collateral Invoices' />
                  </ListItem>

                  <ListItem
                    className={
                      locationUrl.includes('matched-transactional-invoice') ? 'active' : ''
                    }
                    button
                    onClick={() =>
                      handleSideBarClick('monthEndInvoices/matched-transactional-invoice')
                    }
                  >
                    <ListItemIcon />
                    <ListItemText primary='Matched Transactional Invoices' />
                  </ListItem>
                </Collapse>
              </ListStyled>

              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('sendToLms')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Send to LMS' />
                  {open === 'sendToLms' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'sendToLms'} timeout='auto' unmountOnExit>
                  <ListItem
                    className={locationUrl.includes('lms-staging') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('sendToLms/lms-staging')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='LMS Staging' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('lms-invoice-history') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('sendToLms/lms-invoice-history')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='LMS Invoice History' />
                  </ListItem>
                </Collapse>
              </ListStyled>

              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('reportingList')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Reporting' />
                  {open === 'reportingList' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'reportingList'} timeout='auto' unmountOnExit>
                  <ListItem
                    className={locationUrl.includes('advance-balance-per-customer') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('reporting/advance-balance-per-customer')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Advance Balance per Customer' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('advances-per-billing-invoice') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('reporting/advances-per-billing-invoice')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Advances per Billing Invoice' />
                  </ListItem>

                  <ListItem
                    className={
                      locationUrl.includes('sent-transactional-invoices-status') ? 'active' : ''
                    }
                    button
                    onClick={() =>
                      handleSideBarClick('reporting/sent-transactional-invoices-status')
                    }
                  >
                    <ListItemIcon />
                    <ListItemText primary='Sent Transactional Invoices Status' />
                  </ListItem>

                  <ListItem
                    className={locationUrl.includes('event-history') ? 'active' : ''}
                    button
                    onClick={() => handleSideBarClick('reporting/event-history')}
                  >
                    <ListItemIcon />
                    <ListItemText primary='Event History' />
                  </ListItem>
                </Collapse>
              </ListStyled>
              <ListStyled aria-labelledby='nested-list-subheader'>
                <ListItemStyled button onClick={() => handleClick('creditEngine')}>
                  <ListItemIcon>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                      <line x1='3' y1='9' x2='21' y2='9' />
                      <line x1='9' y1='21' x2='9' y2='9' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary='Credit Engine' />
                  {open === 'creditEngine' ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyled>
                <Collapse in={open === 'creditEngine'} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem
                      className={locationUrl.includes('preliminary-credit-check') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('creditEngine/preliminary-credit-check')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Preliminary Credit Check' />
                    </ListItem>
                    <ListItem
                      className={locationUrl.includes('credit-score-history') ? 'active' : ''}
                      button
                      onClick={() => handleSideBarClick('creditEngine/credit-score-history')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Credit Score History' />
                    </ListItem>
                    <ListItem
                      className={
                        locationUrl.includes('Onboarded-Credit-assessment') ? 'active' : ''
                      }
                      button
                      onClick={() => handleSideBarClick('creditEngine/Onboarded-Credit-assessment')}
                    >
                      <ListItemIcon />
                      <ListItemText primary='Onboarded Credit assessment ' />
                    </ListItem>
                  </List>
                </Collapse>
              </ListStyled>
            </Box>
          </ScrollBar>
        </Box>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
