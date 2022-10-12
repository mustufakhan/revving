/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { IconButton } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { StyledTableWrap, StylesTableCell } from './Styled';

interface Data {
  data_source: number;
  period: string;
  type: string;
  disp_advanced_amount: string;
  invoice_date: string;
  revenue_source: number;
  disp_project_amount: string;
  disp_invoice_amt: number;
  currency: string;
  transaction_id: string;
  status: string;
  exp_repayment_date: string | number;
  disp_fee: string | number;
  year: string;
  invoice_number: number;
  disp_fee_adjustment: number | string;
  overall_repayment: number | string;
  disp_fee_repayment: number | string;
  disp_outstanding_amount: number | string;
  disp_collected: number | string;
  disp_surp_dist: number | string;
  payment_ref: number | string;
  monthly_invoice_id: string;
  revenue_source_uuid: string;
  customer: string;
  depreciation: string | number;
  billing_month_end: string | number;
  repayment_date: string | number;
  collection_date: string | number;
  customer_performance_value: number | string;
  customer_performance_timing: number | string;
  rev_source_performance_value: number | string;
  rev_source_performance_timing: number | string;
  customer_name: string;
}

function createData(
  data_source: number,
  period: string,
  type: string,
  disp_advanced_amount: string,
  invoice_date: string,
  revenue_source: number,
  disp_project_amount: string,
  disp_invoice_amt: number,
  currency: string,
  transaction_id: string,
  status: string,
  exp_repayment_date: string | number,
  disp_fee: string | number,
  year: string,
  invoice_number: number,
  disp_fee_adjustment: string | number,
  overall_repayment: string | number,
  disp_fee_repayment: number | string,
  disp_outstanding_amount: number | string,
  disp_collected: number | string,
  disp_surp_dist: number | string,
  payment_ref: number | string,
  monthly_invoice_id: string,
  revenue_source_uuid: string,
  customer: string,
  depreciation: string | number,
  billing_month_end: string | number,
  repayment_date: string | number,
  collection_date: string | number,
  customer_performance_value: number | string,
  customer_performance_timing: number | string,
  rev_source_performance_value: number | string,
  rev_source_performance_timing: number | string,
  customer_name: string
): Data {
  return {
    data_source,
    period,
    type,
    disp_advanced_amount,
    invoice_date,
    revenue_source,
    disp_project_amount,
    disp_invoice_amt,
    currency,
    transaction_id,
    status,
    exp_repayment_date,
    disp_fee,
    year,
    invoice_number,
    disp_fee_adjustment,
    overall_repayment,
    disp_fee_repayment,
    disp_outstanding_amount,
    disp_collected,
    disp_surp_dist,
    payment_ref,
    monthly_invoice_id,
    revenue_source_uuid,
    customer,
    depreciation,
    billing_month_end,
    repayment_date,
    collection_date,
    customer_performance_value,
    customer_performance_timing,
    rev_source_performance_value,
    rev_source_performance_timing,
    customer_name
  };
}

type Order = 'asc' | 'desc';
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'status', numeric: true, disablePadding: false, label: 'STATUS' },
  { id: 'type', numeric: true, disablePadding: false, label: 'TYPE' },
  { id: 'revenue_source', numeric: true, disablePadding: false, label: 'REVENUE SOURCE' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  { id: 'period', numeric: false, disablePadding: false, label: 'DATE' },
  { id: 'invoice_number', numeric: true, disablePadding: false, label: 'DOCUMENT NUMBER' },
  { id: 'disp_advanced_amount', numeric: true, disablePadding: false, label: 'ADVANCE AMOUNT' },
  { id: 'disp_fee', numeric: true, disablePadding: false, label: 'ADVANCE FEE' },
  { id: 'disp_fee_adjustment', numeric: true, disablePadding: false, label: 'FEE ADJUSTMENT' },
  { id: 'disp_fee_repayment', numeric: true, disablePadding: false, label: 'ADVANCE REPAYMENT' },
  { id: 'depreciation', numeric: true, disablePadding: false, label: 'ADVANCE WRITE OFF' },
  {
    id: 'disp_outstanding_amount',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE OTSTANDING'
  },
  // {
  //   id: 'year',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'YEAR'
  // },
  {
    id: 'disp_project_amount',
    numeric: true,
    disablePadding: false,
    label: 'PROJECTED VALUE'
  },
  { id: 'disp_invoice_amt', numeric: true, disablePadding: false, label: 'INVOICED VALUE' },
  { id: 'disp_collected', numeric: true, disablePadding: false, label: 'COLLECTIONS' },
  { id: 'disp_surp_dist', numeric: true, disablePadding: false, label: 'SURPLUS DISTRIBUTION' },
  { id: 'billing_month_end', numeric: true, disablePadding: false, label: 'BILLING MONTH END' },
  {
    id: 'exp_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'EXPECTED REPAYMENT DATE'
  },
  { id: 'invoice_date', numeric: true, disablePadding: false, label: 'INVOICE DATE' },
  { id: 'collection_date', numeric: true, disablePadding: false, label: 'COLLECTION DATE' },
  { id: 'repayment_date', numeric: true, disablePadding: false, label: 'REPAYMENT DATE' },
  { id: 'payment_ref', numeric: true, disablePadding: false, label: 'PAYMENT REF' },
  {
    id: 'customer_performance_value',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER PERFORMANCE VALUE'
  },
  {
    id: 'customer_performance_timing',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER PERFORMANCE TIMING'
  },
  {
    id: 'rev_source_performance_value',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE PERFORMANCE VALUE'
  },
  {
    id: 'rev_source_performance_timing',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE PERFORMANCE TIMING'
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Props Interface
interface IProps {
  advanceReport: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  reportInvoiceLedger: {
    data: {
      results: any;
    };
    status: string;
  };
  reportInvoiceAdvanceLedger: {
    data: {
      results: any;
    };
    status: string;
  };
  reportRevenueCollection: {
    data: {
      results: any;
    };
    status: string;
  };
  adminTrasectionReport: {
    data: {
      results: any;
    };
    status: string;
  };
}

const RevenueDataTableSection: React.FC<IProps> = ({
  advanceReport,
  dispatch,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  reportInvoiceLedger,
  reportInvoiceAdvanceLedger,
  reportRevenueCollection,
  adminTrasectionReport
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [selectedMonthlyId, setSelectedMonthlyId] = useState<any>('');
  const [selectedRevenueSource, setSelectedRevenueSource] = useState<any>('');
  const [selectedRevenueCurrency, setSelectedRevenueCurrency] = useState<any>('');
  const [showInnerTable, setShowInnerTable] = useState<boolean>(false);
  const [showData, setShowData] = useState<boolean>(false);
  const [reportInvoiceData, setReportInvoiceData] = useState<any[]>([]);
  const [reportAdvanceInvoiceData, setReportAdvanceInvoiceData] = useState<any[]>([]);
  const [reportRevenueCollectionData, setReportRevenueCollectionData] = useState<any[]>([]);
  const [adminTrasectionReportData, setAdminTrasectionReport] = useState<any[]>([]);

  useEffect(() => {
    if (showData) {
      setTimeout(() => {
        setShowInnerTable(true);
      }, 1500);
      setShowData(false);
    }
  }, [showData, showInnerTable]);

  useEffect(() => {
    if (reportInvoiceLedger) {
      const result = reportInvoiceLedger?.data?.results;
      setReportInvoiceData(result);
    }
    if (reportInvoiceAdvanceLedger) {
      const result = reportInvoiceAdvanceLedger?.data?.results;
      setReportAdvanceInvoiceData(result);
    }
    if (reportRevenueCollection) {
      const result = reportRevenueCollection?.data?.results;
      setReportRevenueCollectionData(result);
    }
    if (adminTrasectionReport) {
      const result = adminTrasectionReport?.data?.results;
      setAdminTrasectionReport(result);
    }
  }, [
    reportInvoiceLedger,
    reportInvoiceAdvanceLedger,
    reportRevenueCollection,
    adminTrasectionReport
  ]);

  // Populated Table data based on response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.data_source,
              data.period,
              data.type,
              data.disp_advanced_amount,
              data.invoice_date,
              data.revenue_source,
              data.disp_project_amount,
              data.disp_invoice_amt,
              data.currency,
              data.transaction_id,
              data.status,
              data.exp_repayment_date,
              data.disp_fee,
              data.year,
              data.invoice_number,
              data.disp_fee_adjustment,
              data.overall_repayment,
              data.disp_fee_repayment,
              data.disp_outstanding_amount,
              data.disp_collected,
              data.disp_surp_dist,
              data.payment_ref,
              data.monthly_invoice_id,
              data.revenue_source_uuid,
              data.customer,
              data.depreciation,
              data.billing_month_end,
              data.repayment_date,
              data.collection_date,
              data.customer_performance_value,
              data.customer_performance_timing,
              data.rev_source_performance_value,
              data.rev_source_performance_timing,
              data.customer_name
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (advanceReport?.status === 'success') {
      generateTableData(advanceReport.data.results);
    }
  }, [advanceReport]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    handleSortData(property, isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle Page change
  const handleChangePage = (event: unknown, newPage: number) => {
    handlePaginationAndUpdateList('page', newPage);
  };

  // Handle Row per page change handler
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePaginationAndUpdateList('rowsPerpage', parseInt(event.target.value, 10));
  };

  const handleOpenRow = (itemRow: any, isOpen: boolean) => {
    setShowInnerTable(false);
    setSelectedMonthlyId(itemRow?.monthly_invoice_id);
    setSelectedRevenueSource(itemRow?.revenue_source_uuid);
    setSelectedRevenueCurrency(itemRow?.currency);
    if (!isOpen) {
      setShowData(true);
      dispatch({
        type: 'REPORT_INVOICE_LEDGER',
        payload: {
          currency: itemRow?.currency,
          monthlyId: itemRow?.monthly_invoice_id,
          revenueSource: itemRow?.revenue_source,
          revenueSourceId: itemRow?.revenue_source_uuid,
          customer: itemRow?.customer
        }
      });
      dispatch({
        type: 'REPORT_REVENUE_COLLECTION',
        payload: {
          currency: itemRow?.currency,
          monthlyId: itemRow?.monthly_invoice_id,
          revenueSource: itemRow?.revenue_source,
          revenueSourceId: itemRow?.revenue_source_uuid,
          customer: itemRow?.customer
        }
      });
      dispatch({
        type: 'REPORT_INVOICE_ADVANCE_LEDGER',
        payload: {
          currency: itemRow?.currency,
          monthlyId: itemRow?.monthly_invoice_id,
          revenueSource: itemRow?.revenue_source,
          revenueSourceId: itemRow?.revenue_source_uuid,
          customer: itemRow?.customer
        }
      });
      dispatch({
        type: 'REPORT_ADMIN_TRANSECTION_LEDGER',
        payload: {
          currency: itemRow?.currency,
          monthlyId: itemRow?.monthly_invoice_id,
          revenueSource: itemRow?.revenue_source,
          revenueSourceId: itemRow?.revenue_source_uuid,
          customer: itemRow?.customer_name
        }
      });
    }
  };

  return (
    <>
      <StyledTableWrap>
        <TableContainer>
          <Table
            stickyHeader
            className='report_data_tbl'
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows.length
                ? rows.map((row) => (
                    <>
                      <TableRow hover tabIndex={-1} key={row.message_id}>
                        <StylesTableCell align='center' className='adv_arrow'>
                          <p className='arrow'>{row.status}</p>
                          <IconButton
                            aria-label='expand row'
                            size='small'
                            onClick={() =>
                              handleOpenRow(
                                row,
                                selectedMonthlyId === row?.monthly_invoice_id &&
                                  selectedRevenueSource === row?.revenue_source_uuid &&
                                  selectedRevenueCurrency === row?.currency &&
                                  showInnerTable
                                  ? true
                                  : false
                              )
                            }
                          >
                            {selectedMonthlyId === row?.monthly_invoice_id &&
                            selectedRevenueSource === row?.revenue_source_uuid &&
                            selectedRevenueCurrency === row?.currency &&
                            showInnerTable ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.type ? row.type : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.revenue_source ? row.revenue_source : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.currency ? row.currency : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' component='th' id='row-name' scope='row'>
                          {row.period}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.invoice_number ? row.invoice_number : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_advanced_amount ? row.disp_advanced_amount : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_fee ? row.disp_fee : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_fee_adjustment ? row.disp_fee_adjustment : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.overall_repayment ? Number(row.overall_repayment).toFixed(2) : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.depreciation ? Number(row.depreciation).toFixed(2) : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_outstanding_amount ? row.disp_outstanding_amount : '-'}
                        </StylesTableCell>
                        {/* <StylesTableCell align='center'>
                          {row.year ? row.year : '-'}
                        </StylesTableCell> */}
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_project_amount ? row.disp_project_amount : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_invoice_amt ? row.disp_invoice_amt : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_collected ? row.disp_collected : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' className='padd_lft_align'>
                          {row.disp_surp_dist ? row.disp_surp_dist : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.billing_month_end ? row.billing_month_end : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.exp_repayment_date ? `${row.exp_repayment_date}` : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.invoice_date ? row.invoice_date : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.collection_date ? row.collection_date : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center'>
                          {row.repayment_date ? row.repayment_date : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                          {row.payment_ref ? row.payment_ref : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                          {row.customer_performance_value ? row.customer_performance_value : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                          {row.customer_performance_timing ? row.customer_performance_timing : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                          {row.rev_source_performance_value
                            ? row.rev_source_performance_value
                            : '-'}
                        </StylesTableCell>
                        <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                          {row.rev_source_performance_timing
                            ? row.rev_source_performance_timing
                            : '-'}
                        </StylesTableCell>
                      </TableRow>
                      {selectedMonthlyId === row?.monthly_invoice_id &&
                        selectedRevenueSource === row?.revenue_source_uuid &&
                        selectedRevenueCurrency === row?.currency &&
                        reportInvoiceData &&
                        showInnerTable &&
                        reportInvoiceData.map((item: any, i) => (
                          <TableRow hover tabIndex={-1} key={item.message_id}>
                            <StylesTableCell align='center'>{item.status}</StylesTableCell>
                            <StylesTableCell align='center'>{`Advance ${i + 1}`}</StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.revenue_source_name ? item.revenue_source_name : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.currency ? item.currency : '-'}
                            </StylesTableCell>
                            <StylesTableCell
                              align='center'
                              component='th'
                              id='row-name'
                              scope='row'
                              padding='none'
                            >
                              {item.advance_date}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.document_number ? item.document_number : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.advance_amount
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.advance_amount ? Number(item.advance_amount).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.fee_amount
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.fee_amount ? Number(item.fee_amount).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.fee_adjustment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.fee_adjustment ? Number(item.fee_adjustment).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {/* {item.overall_repayment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''} */}
                              {item.overall_repayment
                                ? Number(item.overall_repayment).toFixed(2)
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.depreciation ? Number(item.depreciation).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.outstanding_amount
                                ? Number(item.outstanding_amount).toFixed(2)
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.year ? item.year : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.disp_project_amount ? item.disp_project_amount : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.disp_invoice_amt ? item.disp_invoice_amt : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.disp_collected ? item.disp_collected : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.disp_surp_dist ? item.disp_surp_dist : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.billing_month_end ? item.billing_month_end : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.exp_repayment_date ? `${item.exp_repayment_date}` : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.invoice_date ? item.invoice_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.collection_date ? item.collection_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.repayment_date ? item.repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item.outgoing_payment_reference
                                ? item.outgoing_payment_reference
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item.customer_performance_value
                                ? item.customer_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item.customer_performance_timing
                                ? item.customer_performance_timing
                                : '-'}
                            </StylesTableCell>

                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item.rev_source_performance_timing
                                ? item.rev_source_performance_timing
                                : '-'}
                            </StylesTableCell>
                          </TableRow>
                        ))}
                      {selectedMonthlyId === row?.monthly_invoice_id &&
                        selectedRevenueSource === row?.revenue_source_uuid &&
                        selectedRevenueCurrency === row?.currency &&
                        reportAdvanceInvoiceData &&
                        showInnerTable &&
                        reportAdvanceInvoiceData.map((item: any, i: any) => (
                          <TableRow hover tabIndex={-1} key={item.monthly_invoice_id}>
                            <StylesTableCell align='center'>
                              {row?.status ? row?.status : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {`Issued Invoiced ${i + 1}`}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.revenue_source_name ? item?.revenue_source_name : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.currency ? item?.currency : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.period ? item?.period : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.invoice_number ? item?.invoice_number : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.advanced_amount ? item?.advanced_amount : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.fee ? item?.fee : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.fee_adjustment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.fee_adjustment
                                ? Number(item.fee_adjustment)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {/* {item.overall_repayment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''} */}
                              {item.overall_repayment
                                ? Number(item.overall_repayment)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.depreciation ? Number(item?.depreciation).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.outstanding_amount
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.outstanding_amount
                                ? Number(item.outstanding_amount)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            {/* <StylesTableCell align='center'>
                              {item?.year ? item?.year : '-'}
                            </StylesTableCell> */}
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.project_amount ? item?.project_amount : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.invoice_amt ? item?.invoice_amt : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.collected ? item?.collected : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.surp_dist ? item?.surp_dist : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.billing_month_end ? item?.billing_month_end : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.exp_repayment_date ? item?.exp_repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.invoice_date ? item?.invoice_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.collection_date ? item?.collection_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.repayment_date ? item?.repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '25rem' }}>
                              {item?.payment_ref ? item?.payment_ref : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.customer_performance_value
                                ? item?.customer_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.customer_performance_timing
                                ? item?.customer_performance_timing
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.rev_source_performance_value
                                ? item?.rev_source_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.rev_source_performance_timing
                                ? item?.rev_source_performance_timing
                                : '-'}
                            </StylesTableCell>
                          </TableRow>
                        ))}
                      {selectedMonthlyId === row?.monthly_invoice_id &&
                        selectedRevenueSource === row?.revenue_source_uuid &&
                        selectedRevenueCurrency === row?.currency &&
                        reportRevenueCollectionData &&
                        showInnerTable &&
                        reportRevenueCollectionData.map((item: any, i) => (
                          <TableRow hover tabIndex={-1} key={item.monthly_invoice_id}>
                            <StylesTableCell align='center'>
                              {item?.type ? item?.type : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {`Collection ${i + 1}`}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.revenue_source ? item?.revenue_source : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.currency ? item?.currency : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.date ? item?.date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.document_number ? item?.document_number : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.amount
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item?.amount ? Number(item?.amount).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.fee ? item?.fee : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.fee_adjustment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.fee_adjustment
                                ? Number(item.fee_adjustment)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {/* {item.overall_repayment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''} */}
                              {item.overall_repayment
                                ? Number(item.overall_repayment)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.depreciation ? Number(item?.depreciation).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.outstanding_amount
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.outstanding_amount
                                ? Number(item.outstanding_amount)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            {/* <StylesTableCell align='center'>
                              {item?.year ? item?.year : '-'}
                            </StylesTableCell> */}
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.project_amount ? item?.project_amount : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.invoice_amt ? item?.invoice_amt : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.amount ? Number(item.amount).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.surp_dist ? item?.surp_dist : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.billing_month_end ? item?.billing_month_end : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.exp_repayment_date ? item?.exp_repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.invoice_date ? item?.invoice_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.date ? item?.date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.repayment_date ? item?.repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '25rem' }}>
                              {item?.payment_ref ? item?.payment_ref : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.customer_performance_value
                                ? item?.customer_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.customer_performance_timing
                                ? item?.customer_performance_timing
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.rev_source_performance_value
                                ? item?.rev_source_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.rev_source_performance_timing
                                ? item?.rev_source_performance_timing
                                : '-'}
                            </StylesTableCell>
                          </TableRow>
                        ))}
                      {selectedMonthlyId === row?.monthly_invoice_id &&
                        selectedRevenueSource === row?.revenue_source_uuid &&
                        selectedRevenueCurrency === row?.currency &&
                        adminTrasectionReportData &&
                        showInnerTable &&
                        adminTrasectionReportData.map((item: any, i) => (
                          <TableRow hover tabIndex={-1} key={item.monthly_invoice_id}>
                            <StylesTableCell align='center'>
                              {item?.status ? item?.status : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.type ? item?.type : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.revenue_source_name ? item?.revenue_source_name : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.currency ? item?.currency : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.period ? item?.period : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.invoice_number ? item?.invoice_number : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.advanced_amount ? item?.advanced_amount : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.fee ? item?.fee : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item.fee_adjustment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.fee_adjustment
                                ? Number(item.fee_adjustment)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {/* {item.overall_repayment
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''} */}
                              {item.overall_repayment
                                ? Number(item.overall_repayment)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.depreciation ? Number(item?.depreciation).toFixed(2) : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item.outstanding_amount
                                ? row.currency == 'USD'
                                  ? '$ '
                                  : row.currency == 'GBP'
                                  ? '£'
                                  : '€'
                                : ''}
                              {item.outstanding_amount
                                ? Number(item.outstanding_amount)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                : '-'}
                            </StylesTableCell>
                            {/* <StylesTableCell align='center'>
                              {item?.year ? item?.year : '-'}
                            </StylesTableCell> */}
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.project_amount ? item?.project_amount : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.invoice_amt ? item?.invoice_amt : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.collected ? item?.collected : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' className='padd_lft_align'>
                              {item?.surp_dist ? item?.surp_dist : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.billing_month_end ? item?.billing_month_end : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.exp_repayment_date ? item?.exp_repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.invoice_date ? item?.invoice_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.collection_date ? item?.collection_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center'>
                              {item?.repayment_date ? item?.repayment_date : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '25rem' }}>
                              {item?.payment_ref ? item?.payment_ref : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.customer_performance_value
                                ? item?.customer_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.customer_performance_timing
                                ? item?.customer_performance_timing
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.rev_source_performance_value
                                ? item?.rev_source_performance_value
                                : '-'}
                            </StylesTableCell>
                            <StylesTableCell align='center' style={{ minWidth: '380px' }}>
                              {item?.rev_source_performance_timing
                                ? item?.rev_source_performance_timing
                                : '-'}
                            </StylesTableCell>
                          </TableRow>
                        ))}
                    </>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {advanceReport?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={advanceReport?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )}
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  reportInvoiceLedger: state.reportInvoiceLedger.data,
  reportInvoiceAdvanceLedger: state.reportInvoiceAdvanceLedger.data,
  reportRevenueCollection: state.reportRevenueCollection.data,
  adminTrasectionReport: state.adminTrasectionReport.data
});

export default connect(mapStateToProps)(RevenueDataTableSection);
