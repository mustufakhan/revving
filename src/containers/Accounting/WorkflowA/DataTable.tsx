/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint object-shorthand: "off" */
/* eslint prefer-arrow-callback: "off" */
/* eslint react/jsx-one-expression-per-line: "off" */
/* eslint @typescript-eslint/no-shadow: "off" */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination';
import {
  StyledTableWrap,
  KeyboardDatePickerWrapper,
  MuiPickersUtilsProviderWrapper,
  StyledDialog
} from './Styled';

interface Data {
  comments: string;
  data_source: number;
  customer_name: string;
  rev_source_master_name: string | number;
  revenue_source: number;
  codat_invoice_no: string;
  invoice_status: string;
  transaction_id: string;
  decision_date: string | number;
  type: string;
  ingestion_date: string;
  revenue_source_name: string;
  sent_to_lms: boolean;
  issue_date: string;
  billing_month: string;
  month_end: string;
  month: string | number;
  year: string;
  invoice_month: string | number;
  advance_date: string;
  expected_repayment_date: string;
  adjusted_expected_payment_date: string;
  customer_due_date: string;
  advance_duration: string;
  currency: string;
  gross_value: string | number;
  gross_value_due: string | number;
  adjusted_gross_value_due: string | number;
  notional_invoice_value: string | number;
  purchase_value: string | number;
  advance_amount: string | number;
  fee_amount: string | number;
  haircut_percent: string | number;
  haircut_amount: string | number;
  daily_advance_fee: string | number;
  fee_setting: string | number;
  rev_source: string | number;
  customer_status: string | number;
  customer_invoice_id: string | number;
  customer_revenue_source_reference: string | number;
  payment_made: string | number;
  payment_date: string | number;
  paid_on_date: string | number;
  codat_id: string | number;
  action_status: string;
}

function createData(
  comments: string,
  data_source: number,
  customer_name: string,
  rev_source_master_name: string | number,
  revenue_source: number,
  codat_invoice_no: string,
  invoice_status: string,
  transaction_id: string,
  decision_date: string | number,
  type: string,
  ingestion_date: string,
  revenue_source_name: string,
  sent_to_lms: boolean,
  issue_date: string,
  billing_month: string,
  month_end: string,
  month: string | number,
  year: string,
  invoice_month: string | number,
  advance_date: string,
  expected_repayment_date: string,
  adjusted_expected_payment_date: string,
  customer_due_date: string,
  advance_duration: string,
  currency: string,
  gross_value: string | number,
  gross_value_due: string | number,
  adjusted_gross_value_due: string | number,
  notional_invoice_value: string | number,
  purchase_value: string | number,
  advance_amount: string | number,
  fee_amount: string | number,
  haircut_percent: string | number,
  haircut_amount: string | number,
  daily_advance_fee: string | number,
  fee_setting: string | number,
  rev_source: string | number,
  customer_status: string | number,
  customer_invoice_id: string | number,
  customer_revenue_source_reference: string | number,
  payment_made: string | number,
  payment_date: string | number,
  paid_on_date: string | number,
  codat_id: string | number,
  action_status: string
): Data {
  return {
    comments,
    data_source,
    customer_name,
    rev_source_master_name,
    revenue_source,
    codat_invoice_no,
    invoice_status,
    transaction_id,
    decision_date,
    type,
    ingestion_date,
    revenue_source_name,
    sent_to_lms,
    issue_date,
    billing_month,
    month_end,
    month,
    year,
    invoice_month,
    advance_date,
    expected_repayment_date,
    adjusted_expected_payment_date,
    customer_due_date,
    advance_duration,
    currency,
    gross_value,
    gross_value_due,
    adjusted_gross_value_due,
    notional_invoice_value,
    purchase_value,
    advance_amount,
    fee_amount,
    haircut_percent,
    haircut_amount,
    daily_advance_fee,
    fee_setting,
    rev_source,
    customer_status,
    customer_invoice_id,
    customer_revenue_source_reference,
    payment_made,
    payment_date,
    paid_on_date,
    codat_id,
    action_status
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
  { id: 'comments', numeric: true, disablePadding: false, label: 'COMMENTS' },
  { id: 'invoice_status', numeric: true, disablePadding: false, label: 'STATUS' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'ACTIONS' },
  { id: 'type', numeric: true, disablePadding: false, label: 'INVOICE TYPE' },
  { id: 'ingestion_date', numeric: true, disablePadding: false, label: 'INGESTED DATE' },
  {
    id: 'decision_date',
    numeric: true,
    disablePadding: false,
    label: 'DECISION DATE'
  },
  { id: 'customer_name', numeric: false, disablePadding: true, label: 'CUSTOMER' },
  { id: 'codat_invoice_no', numeric: true, disablePadding: false, label: 'INVOICE NUMBER' },
  {
    id: 'revenue_source_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE MASTER'
  },
  {
    id: 'rev_source_master_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE ALIAS'
  },
  {
    id: 'issue_date',
    numeric: true,
    disablePadding: false,
    label: 'ISSUE DATE'
  },
  { id: 'month', numeric: true, disablePadding: false, label: 'BILLING MONTH' },
  { id: 'year', numeric: true, disablePadding: false, label: 'BILLING YEAR' },
  { id: 'invoice_month', numeric: true, disablePadding: false, label: 'INVOICE MONTH END' },
  { id: 'advance_date', numeric: true, disablePadding: false, label: 'ADVANCE DATE' },
  {
    id: 'expected_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'EXPECTED PAYMENT DATE'
  },
  {
    id: 'adjusted_expected_payment_date',
    numeric: true,
    disablePadding: false,
    label: 'ADJUSTED EXPECTED PAYMENT DATE'
  },
  { id: 'customer_due_date', numeric: true, disablePadding: false, label: 'CUSTOMER PAYMENT DATE' },
  { id: 'advance_duration', numeric: true, disablePadding: false, label: 'DURATION' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  {
    id: 'gross_value',
    numeric: true,
    disablePadding: false,
    label: ' GROSS VALUE'
  },
  { id: 'gross_value_due', numeric: true, disablePadding: false, label: ' GROSS VALUE DUE' },
  {
    id: 'adjusted_gross_value_due',
    numeric: true,
    disablePadding: false,
    label: 'ADJUSTED GROSS VALUE DUE'
  },
  {
    id: 'notional_invoice_value',
    numeric: true,
    disablePadding: false,
    label: 'NET INVOICE VALUE'
  },
  { id: 'purchase_value', numeric: true, disablePadding: false, label: 'PURCHASE VALUE' },
  { id: 'advance_amount', numeric: true, disablePadding: false, label: 'ADVANCE AMOUNT' },
  { id: 'fee_amount', numeric: true, disablePadding: false, label: ' ADVANCE FEE' },
  { id: 'haircut_percent', numeric: true, disablePadding: false, label: 'HAIRCUT(%)' },
  { id: 'haircut_amount', numeric: true, disablePadding: false, label: 'HAIRCUT AMOUNT' },
  { id: 'daily_advance_fee', numeric: true, disablePadding: false, label: 'DAILY FEE(%)' },
  { id: 'fee_setting', numeric: true, disablePadding: false, label: 'FEE TYPE' },
  { id: 'rev_source', numeric: true, disablePadding: false, label: 'REVVING INVOICE ID' },
  { id: 'customer_status', numeric: true, disablePadding: false, label: ' CUSTOMER STATUS' },
  { id: 'customer_invoice_id', numeric: true, disablePadding: false, label: 'CUSTOMER INVOICE ID' },
  {
    id: 'customer_revenue_source_reference',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER REV SOURCE REPAYMENT'
  },
  { id: 'payment_made', numeric: true, disablePadding: false, label: ' PAYMENT MADE' },
  { id: 'payment_date', numeric: true, disablePadding: false, label: 'PAYMENT DATE' },
  { id: 'paid_on_date', numeric: true, disablePadding: false, label: 'PAID ON DATE' }
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
  workflowA: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  recalculateWorkFlowA: {
    data: any;
    status: string;
  };
  acceptWorkFlowA: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  rejectWorkFlowA: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  getCommentsCodat: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  deleteCommentsCodat: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  mainAPI: Function;
}

const DataTableSection: React.FC<IProps> = ({
  workflowA,
  dispatch,
  updateList,
  getCommentsCodat,
  deleteCommentsCodat,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  recalculateWorkFlowA,
  acceptWorkFlowA,
  rejectWorkFlowA,
  mainAPI
}: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [dates, setDates] = React.useState<any[]>([]);
  const [gross, setGross] = React.useState<any[]>([]);
  const [dateChanging, setDateChanging] = React.useState<any>(false);
  const [valueChanging, setValueChanging] = useState<any>('');
  const [showIndex, setShowIndex] = React.useState<any[]>([]);
  const [edit, setEdit] = React.useState<any>({ isEdit: false, id: '' });

  const [open, setOpen] = useState<boolean>(false);
  const [cpmRowState, setcpmRow] = React.useState<any[]>([]);
  const [codatinvoice, setcodatinvoice] = React.useState<any>('');
  const [commentset, setcommentset] = React.useState<any>('');
  const [codatuuid, setcodatuuid] = React.useState<any>('');
  const [approveBtn, setApproveBtn] = React.useState<any>('');
  // const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];

  useEffect(() => {
    if (
      recalculateWorkFlowA?.status == 'success' ||
      acceptWorkFlowA?.status == 'success' ||
      rejectWorkFlowA?.status == 'success'
    ) {
      setShowIndex([]);
      // mainAPI();
      setEdit({ isEdit: false, id: '' });
    }
  }, [recalculateWorkFlowA, acceptWorkFlowA, rejectWorkFlowA]);

  useEffect(() => {
    if (
      acceptWorkFlowA?.status === 'success' ||
      recalculateWorkFlowA?.status === 'success' ||
      rejectWorkFlowA?.status === 'success'
    ) {
      const newData: any = rows.map((item) => {
        if (item.codat_id == acceptWorkFlowA?.data?.codat_id) {
          return acceptWorkFlowA?.data;
        }
        if (item.codat_id == rejectWorkFlowA?.data?.codat_id) {
          return rejectWorkFlowA?.data;
        }
        if (item.codat_id == recalculateWorkFlowA?.data?.codat_id) {
          return recalculateWorkFlowA?.data;
        }
        return item;
      });
      setRows(newData);
    }
  }, [acceptWorkFlowA, recalculateWorkFlowA, rejectWorkFlowA]);

  useEffect(() => {
    if (acceptWorkFlowA?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar(acceptWorkFlowA?.message?.data, {
        variant
      });
    }
  }, [acceptWorkFlowA]);

  useEffect(() => {
    if (rejectWorkFlowA?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar(rejectWorkFlowA?.message?.data, {
        variant
      });
    }
  }, [rejectWorkFlowA]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];
    const newdata: any = [];
    const grossValue: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.comments,
              data.data_source,
              data.customer_name,
              data.rev_source_master_name,
              data.revenue_source,
              data.codat_invoice_no,
              data.invoice_status,
              data.transaction_id,
              data.decision_date,
              data.type,
              data.ingestion_date,
              data.revenue_source_name,
              data.sent_to_lms,
              data.issue_date,
              data.billing_month,
              data.month_end,
              data.month,
              data.year,
              data.invoice_month,
              data.advance_date,
              data.expected_repayment_date,
              data.adjusted_expected_payment_date,
              data.customer_due_date,
              data.advance_duration,
              data.currency,
              data.gross_value,
              data.gross_value_due,
              data.adjusted_gross_value_due,
              data.notional_invoice_value,
              data.purchase_value,
              data.advance_amount,
              data.fee_amount,
              data.haircut_percent,
              data.haircut_amount,
              data.daily_advance_fee,
              data.fee_setting,
              data.rev_source,
              data.customer_status,
              data.customer_invoice_id,
              data.customer_revenue_source_reference,
              data.payment_made,
              data.payment_date,
              data.paid_on_date,
              data.codat_id,
              data.action_status
            )
          ];
          grossValue.push(data.adjusted_gross_value_due);
          newdata.push(moment(data.adjusted_expected_payment_date).format('YYYY-MM-DD'));
          return '';
        });
      }

      !dateChanging && setDates(newdata);
      !dateChanging && setGross(grossValue);
      setRows(newArray);
    };
    if (workflowA?.status === 'success') {
      generateTableData(workflowA.data.results);
    }
  }, [workflowA, dateChanging, valueChanging]);

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

  // Handle Editable Dates
  const handleDates = (data: Date | null, index: any, row: any) => {
    const prevDate = dates;
    prevDate[index] = data ? moment(data).format('YYYY-MM-DD') : null;
    setDates(prevDate);
    setDateChanging(prevDate[index]);
    showIndex.indexOf(index) === -1 && setShowIndex([...showIndex, index]);
    handleRecalculate(row, index);
  };

  // handle Gross value
  const handleGross = (e: React.ChangeEvent<HTMLInputElement>, index: any, row: any) => {
    const newGross = gross;
    newGross[index] = e.target.value;
    setGross(newGross);
    setDateChanging(true);
    setValueChanging(newGross[index]);
    showIndex.indexOf(index) === -1 && setShowIndex([...showIndex, index]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: any, row: any) => {
    if (e.key === 'Enter') {
      handleRecalculate(row, index);
    }
  };

  const handleAccept = (row: any, index: any, edit: any) => {
    setApproveBtn(row.codat_id);
    dispatch({
      type: 'ACCOUNTING_ACCEPT',
      payload: {
        id: row.codat_id
      }
    });
    // setApproveBtn(false);
  };

  const handleReject = (row: any, index: any) => {
    dispatch({
      type: 'ACCOUNTING_REJECT',
      payload: {
        id: row.codat_id
      }
    });
  };
  const handleRecalculate = (row: any, index: any) => {
    const date = dates[index];
    const value = gross[index];
    dispatch({
      type: 'ACCOUNTING_RECALCULATE',
      payload: {
        id: row.codat_id,
        date,
        value
      }
    });
  };
  const handleEdit = (row: any, index: any, codat_id: any) => {
    setEdit({ isEdit: true, id: codat_id });
    setApproveBtn(false);
  };

  const handleCancel = (row: any, index: any, codat_id: any) => {
    setEdit({ isEdit: false, id: '' });
  };

  // Handle Comments
  const handleCommentRow = (row: any) => {
    const codatinvoiceuuid = row.comments.map((item: any) => item.uuid);
    const codatVlaue = row.codat_id;
    const cpmRow = row.comments;
    setcodatinvoice(codatVlaue);
    setcodatuuid(codatinvoiceuuid);
    setcpmRow(cpmRow);
    setOpen(true);
    setcommentset('');
  };

  const onHandleChangeTextarea = (e: any) => {
    setcommentset(e.target.value);
  };

  const onHandleSubmitTextarea = (e: any) => {
    dispatch({
      type: 'CREATE_CODAT_COMMENT',
      payload: {
        codatinvoice: codatinvoice,
        comment: commentset
      }
    });
    setcommentset('');
    setOpen(false);
    mainAPI();
  };

  const onHandleCross = (i: number) => {
    const found = codatuuid.find(function (element: any, id: number) {
      return id === i;
    });
    dispatch({
      type: 'DELETE_COMMENTS',
      payload: {
        uuid: found
      }
    });
    // setcommentset('');
    setOpen(false);
    mainAPI();
  };

  // Handle Modal close
  const handleClose = () => {
    setOpen(false);
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
                ? rows.map((row, i) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell align='center'>
                        {row?.comments?.length > 0 ? (
                          <IconButton aria-label='CreateIcon'>
                            <CreateIcon
                              style={{ color: 'red' }}
                              onClick={() => handleCommentRow(row)}
                            />
                          </IconButton>
                        ) : (
                          <IconButton aria-label='CreateIcon' onClick={() => handleCommentRow(row)}>
                            <CreateIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_status === 'Not Sent'
                          ? 'Rejected in Staging'
                          : row.invoice_status === 'Rejected'
                          ? 'Purchase Rejected'
                          : row.invoice_status
                          ? row.invoice_status
                          : '-'}
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: '23rem' }}>
                        {/* {row.action_status == 'pending' ? (
                          showIndex.indexOf(i) !== -1 ? (
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleRecalculate(row, i)}
                            >
                              Recalculate
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleAccept(row, i)}
                                style={{ marginRight: '10px', background: 'green' }}
                              >
                                Purchase
                              </Button>
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleReject(row, i)}
                                style={{ background: 'red' }}
                              >
                                Reject
                              </Button>
                            </>
                          )
                        ) : (
                          row.action_status
                        )} */}
                        {(row.invoice_status === 'Pending' ||
                          row.invoice_status === 'Not Sent' ||
                          (edit.isEdit && row.codat_id === edit.id)) && (
                          <>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleAccept(row, i, edit.id)}
                              className={
                                approveBtn === row.codat_id ? 'approve_btn bdr' : 'approve_btn'
                              }
                            >
                              Purchase
                            </Button>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleReject(row, i)}
                              className='reject_btn'
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {/* {(row.invoice_status === 'Not Sent' ||
                          (edit.isEdit && row.codat_id === edit.id)) && (
                            <>
                              {console.log(row.codat_id, edit.id, 'checkkkkk')}
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleAccept(row, i, edit.id)}
                                className={
                                  approveBtn && row.codat_id === edit.id
                                    ? 'approve_btn bdr'
                                    : 'approve_btn'
                                }
                              >
                                Purchase
                              </Button>
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleReject(row, i)}
                                className='reject_btn'
                              >
                                Reject
                              </Button>
                            </>
                          )} */}
                        {(row.invoice_status === 'Purchased' ||
                          row.invoice_status === 'Rejected') &&
                          !(edit.isEdit && row.codat_id === edit.id) &&
                          !row.sent_to_lms && (
                            <>
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleEdit(row, i, row?.codat_id)}
                                style={{ marginRight: '10px', background: 'gray' }}
                              >
                                Edit
                              </Button>
                            </>
                          )}
                        {edit.isEdit && row.codat_id === edit.id && (
                          <>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleCancel(row, i, row.codat_id)}
                              className='cancel_btn'
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell align='center'>{row.type}</TableCell>
                      <TableCell align='center'>
                        {row.ingestion_date ? moment(row.ingestion_date).format('DD/MM/YYYY') : '-'}
                        {/* {moment(row.ingestion_date).format('DD/MM/YYYY')} */}
                      </TableCell>
                      <TableCell align='center'>
                        {row.decision_date ? moment(row.decision_date).format('DD/MM/YYYY') : '-'}
                        {/* {moment(row.decision_date).format('DD/MM/YYYY')} */}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.customer_name}
                      </TableCell>
                      <TableCell align='center'>
                        {row.codat_invoice_no ? row.codat_invoice_no : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_name ? row.revenue_source_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.rev_source_master_name ? row.rev_source_master_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.issue_date ? moment(row.issue_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.month ? row.month : '-'}</TableCell>
                      <TableCell align='center'>{row.year ? row.year : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.month_end ? moment(row.month_end).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.advance_date ? moment(row.advance_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.expected_repayment_date
                          ? moment(row.expected_repayment_date).format('DD/MM/YYYY')
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        <MuiPickersUtilsProviderWrapper utils={DateFnsUtils} locale={locale}>
                          <KeyboardDatePickerWrapper
                            margin='normal'
                            id='from-picker-dialog'
                            label='From'
                            format='dd/MM/yyyy'
                            value={dates[i]}
                            onChange={(d) => handleDates(d, i, row)}
                            disabled={
                              !(
                                (edit.isEdit && row.codat_id === edit.id) ||
                                row.invoice_status === 'Pending'
                              )
                            }
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                          />
                        </MuiPickersUtilsProviderWrapper>
                      </TableCell>
                      <TableCell align='center'>
                        {row.customer_due_date
                          ? moment(row.customer_due_date).format('DD/MM/YYYY')
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_duration ? Number(row.advance_duration).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_value ? Number(row.gross_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_value_due ? Number(row.gross_value_due).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        <input
                          value={gross[i]}
                          type='text'
                          style={{
                            backgroundColor: 'white',
                            border: '2px solid rgb(238,238,238)',
                            padding: '2px',
                            height: '2rem'
                          }}
                          disabled={
                            !(
                              (edit.isEdit && row.codat_id === edit.id) ||
                              row.invoice_status === 'Pending'
                            )
                          }
                          onChange={(e) => handleGross(e, i, row)}
                          onKeyPress={(e) => handleKeyPress(e, i, row)}
                        />
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.notional_invoice_value
                          ? Number(row.notional_invoice_value).toFixed(2)
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.purchase_value ? Number(row.purchase_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_amount ? Number(row.advance_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.fee_amount ? Number(row.fee_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.haircut_percent ? `${Number(row.haircut_percent).toFixed(2)}%` : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.haircut_amount ? Number(row.haircut_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.daily_advance_fee
                          ? `${Number(row.daily_advance_fee).toFixed(2)}%`
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.fee_setting ? row.fee_setting : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.rev_source ? row.rev_source : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.customer_status ? row.customer_status : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.customer_invoice_id ? row.customer_invoice_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.customer_revenue_source_reference
                          ? row.customer_revenue_source_reference
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.payment_made ? Number(row.payment_made).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.payment_date ? moment(row.payment_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.paid_on_date ? moment(row.paid_on_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {workflowA?.data?.results?.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={workflowA?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )}
        <StyledDialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' style={{ borderBottom: '1px solid #ddd' }}>
            Comments
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <div className='comment_row'>
                <ul>
                  {cpmRowState.map((item: any, i: number) => (
                    <>
                      <li>
                        <span>
                          <p>{item.comment}</p>
                          <span>
                            {item.time} {item.first_name} {item.last_name}
                          </span>
                        </span>

                        <span>
                          <CancelOutlinedIcon
                            onClick={() => onHandleCross(i)}
                            style={{ color: 'red', cursor: 'pointer' }}
                          />
                        </span>
                      </li>
                    </>
                  ))}
                </ul>
                <TextareaAutosize
                  aria-label='minimum height'
                  placeholder='Enter new comment'
                  className='text_area'
                  defaultValue={commentset}
                  onChange={(e: any) => onHandleChangeTextarea(e)}
                />
                <button
                  type='submit'
                  onClick={(e: any) => onHandleSubmitTextarea(e)}
                  className='submit_btn'
                >
                  Submit Comment
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </StyledDialog>
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  recalculateWorkFlowA: state.recalculateWorkFlowA.data,
  acceptWorkFlowA: state.acceptWorkFlowA.data,
  rejectWorkFlowA: state.rejectWorkFlowA.data,
  getCommentsCodat: state.getCommentsCodat.data,
  deleteCommentsCodat: state.deleteCommentsCodat.data
});

export default connect(mapStateToProps)(DataTableSection);
