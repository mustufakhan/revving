/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint object-shorthand: "off" */
/* eslint prefer-arrow-callback: "off" */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination';
import {
  StyledTableWrap,
  StylesTableCell,
  StyledSnackbar,
  KeyboardDatePickerWrapper,
  MuiPickersUtilsProviderWrapper,
  StyledDialog
} from './Styled';

interface Data {
  comment_count: string | number;
  customer: string;
  type: string | number;
  invoice_number: string | number;
  assigment_status: string;
  customer_invoice_id: string | number;
  haircut_status: string;
  payment_status: string;
  revenue_source_name: string | number;
  currency: string;
  billing_gross_value: string | number;
  adjusted_billing_gross_value: string | number;
  notional_gross_value: string | number;
  month: string | number;
  year: string;
  invoice_month: string | number;
  advance_date: string;
  month_end: string;
  due_date: string;
  notional_purchase_value: string | number;
  notional_advance_amount: string | number;
  notional_haircut_value: string | number;
  advance_fee: string | number;
  gross_value_delta_percentage: string | number;
  gross_value_delta: string | number;
  haircut_balance: string | number;
  monthly_invoice_id: string | number;

  // invoice_id: string | number;
  issue_date: string;
  ingestion_date: string;
  approval_date: string;

  data_source: number;
  revenue_source: number;
  transaction_id: string;
  customer_due_date: string;
  advance_duration: string;
  customer_revenue_source_reference: string | number;
  payment_made: string | number;
  payment_date: string | number;
  paid_on_date: string | number;
  codat_id: string | number;
  action_status: string;
}

function createData(
  comment_count: string | number,
  customer: string,
  type: string | number,
  invoice_number: string | number,
  assigment_status: string,
  customer_invoice_id: string | number,
  haircut_status: string,

  payment_status: string,
  revenue_source_name: string | number,
  currency: string,
  billing_gross_value: string | number,
  adjusted_billing_gross_value: string | number,
  notional_gross_value: string | number,
  month: string | number,
  year: string,
  invoice_month: string | number,
  advance_date: string,
  month_end: string,
  due_date: string,
  notional_purchase_value: string | number,
  notional_advance_amount: string | number,
  notional_haircut_value: string | number,
  advance_fee: string | number,
  gross_value_delta_percentage: string | number,
  gross_value_delta: string | number,
  haircut_balance: string | number,
  monthly_invoice_id: string | number,

  // invoice_id: string | number,
  issue_date: string,
  ingestion_date: string,
  approval_date: string,

  data_source: number,
  revenue_source: number,
  transaction_id: string,
  customer_due_date: string,
  advance_duration: string,
  customer_revenue_source_reference: string | number,
  payment_made: string | number,
  payment_date: string | number,
  paid_on_date: string | number,
  codat_id: string | number,
  action_status: string
): Data {
  return {
    comment_count,
    customer,
    type,
    invoice_number,
    assigment_status,
    customer_invoice_id,
    haircut_status,
    payment_status,
    revenue_source_name,
    currency,
    billing_gross_value,
    adjusted_billing_gross_value,
    notional_gross_value,
    month,
    year,
    invoice_month,
    advance_date,
    month_end,
    due_date,
    notional_purchase_value,
    notional_advance_amount,
    notional_haircut_value,
    advance_fee,
    gross_value_delta_percentage,
    gross_value_delta,
    haircut_balance,
    monthly_invoice_id,

    // invoice_id,
    issue_date,
    ingestion_date,
    approval_date,

    data_source,
    revenue_source,
    transaction_id,
    customer_due_date,
    advance_duration,
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
  { id: 'comment_count', numeric: false, disablePadding: true, label: 'COMMENTS' },
  { id: 'customer', numeric: false, disablePadding: true, label: 'CUSTOMER' },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'TYPE'
  },
  { id: 'monthly_invoice_id', numeric: true, disablePadding: false, label: 'INVOICE NUMBER' },
  { id: 'assigment_status', numeric: true, disablePadding: false, label: 'ASSIGMENT STATUS' },
  { id: 'customer_invoice_id', numeric: true, disablePadding: false, label: 'ACTION' },
  { id: 'haircut_status', numeric: true, disablePadding: false, label: 'COLLATERAL STATUS' },
  {
    id: 'payment_status',
    numeric: true,
    disablePadding: false,
    label: 'PAYMENT STATUS'
  },
  {
    id: 'revenue_source_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  { id: 'billing_gross_value', numeric: true, disablePadding: false, label: 'BILLING GROSS VALUE' },
  {
    id: 'adjusted_billing_gross_value',
    numeric: true,
    disablePadding: false,
    label: ' ADJUSTED BILLING GROSS VALUE'
  },
  {
    id: 'notional_gross_value',
    numeric: true,
    disablePadding: false,
    label: 'NOTIONAL GROSS VALUE'
  },
  { id: 'month', numeric: true, disablePadding: false, label: 'BILLING MONTH' },
  { id: 'year', numeric: true, disablePadding: false, label: 'BILLING YEAR' },
  { id: 'invoice_month', numeric: true, disablePadding: false, label: 'EDITED BILLING MONTH' },
  { id: 'advance_date', numeric: true, disablePadding: false, label: 'EDITED BILLING YEAR' },
  {
    id: 'month_end',
    numeric: true,
    disablePadding: false,
    label: 'END OF MONTH'
  },
  {
    id: 'due_date',
    numeric: true,
    disablePadding: false,
    label: 'DUE DATE'
  },
  {
    id: 'notional_purchase_value',
    numeric: true,
    disablePadding: false,
    label: 'NOTIONAL PURCHASE VALUE'
  },
  {
    id: 'notional_advance_amount',
    numeric: true,
    disablePadding: false,
    label: 'NOTIONAL ADVANCE AMOUNT'
  },
  {
    id: 'notional_haircut_value',
    numeric: true,
    disablePadding: false,
    label: 'NOTIONAL HAIRCUT VALUE'
  },
  { id: 'advance_fee', numeric: true, disablePadding: false, label: 'ADVANCE FEE' },
  { id: 'gross_value_delta', numeric: true, disablePadding: false, label: 'GROSS VALUE DELTA' },
  {
    id: 'gross_value_delta_percentage',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE DELTA%'
  },
  { id: 'haircut_balance', numeric: true, disablePadding: false, label: 'HAIRCUT BALANCE' },
  { id: 'monthly_invoice_id', numeric: true, disablePadding: false, label: 'MONTHLY INVOICE ID' },
  { id: 'issue_date', numeric: true, disablePadding: false, label: 'ISSUE DATE' },
  { id: 'ingestion_date', numeric: true, disablePadding: false, label: 'INGESTED DATE' },
  { id: 'approval_date', numeric: true, disablePadding: false, label: 'APPROVAL DATE' }
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
          <StylesTableCell
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
          </StylesTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Props Interface
interface IProps {
  workflowB: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  billingInvoice: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  billingRecalculate: {
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
  getNotionalComments: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  createNotionalComments: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  addInvoiceData: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  deleteNotionalComments: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  updateBillingInvoice: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  updateTransactionalInvoice: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  mainAPI: Function;
}

const DataTableSection: React.FC<IProps> = ({
  workflowB,
  dispatch,
  deleteCommentsCodat,
  getCommentsCodat,
  updateList,
  deleteNotionalComments,
  createNotionalComments,
  updateBillingInvoice,
  updateTransactionalInvoice,
  addInvoiceData,
  getNotionalComments,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  billingInvoice,
  billingRecalculate,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [year, setYear] = React.useState<any[]>([]);
  const [yearChanging, setYearChanging] = React.useState<any>(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | string>('');
  const [selectedMonthlyId, setSelectedMonthlyId] = React.useState<number | string>('');
  const [valueChanging, setValueChanging] = useState<any>('');
  const [showInnerTable, setShowInnerTable] = React.useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState<any>('');
  const [showData, setShowData] = React.useState<boolean>(false);
  const [showIndex, setShowIndex] = React.useState<any[]>([]);
  const [billingData, setBillingData] = React.useState<any[]>([]);
  const [adjBilling, setAdjBilling] = React.useState<any[]>([]);
  const [months, setMonths] = React.useState<any[]>([]);
  const [monthChanging, setMonthChanging] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<any>({ isEdit: false, id: '' });

  const [open, setOpen] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);
  // const [commentsState, setcommentsState] = React.useState<any[]>([]);
  const [codatinvoice, setcodatinvoice] = React.useState<any>('');
  const [commentset, setcommentset] = React.useState<any>('');
  const [codatuuid, setcodatuuid] = React.useState<any>('');
  const [notionalCurrency, setnotionalCurrency] = React.useState<any>('');
  const [cpmRowState, setcpmRow] = React.useState<any[]>([]);
  const [notionalCommentSet, setnotionalCommentSet] = React.useState<any>('');
  const [invoiceMonth, setinvoiceMonth] = React.useState<any>('');
  const [approveBtn, setApproveBtn] = React.useState<any>('');
  const [dropCurrency, setDropCurrency] = React.useState<any>('');
  const [recaluclateState, setRecalculateState] = React.useState<any>('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [itemRowState, setitemRowState] = React.useState<any>({});
  console.log('itemRowState', itemRowState);
  const [hitStatus, sethitStatus] = React.useState<any>('');
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  useEffect(() => {
    if (billingRecalculate?.status == 'success') {
      if (!recaluclateState) {
        dispatch({
          type: 'UPDATE_BILLING_INVOICE',
          payload: {
            id: approveBtn,
            action_status: hitStatus,
            currency: dropCurrency
          }
        });
        if (itemRowState && Object.keys(itemRowState).length > 0) {
          dispatch({
            type: 'BILLING_INVOICE',
            payload: {
              currency: itemRowState?.currency,
              monthlyId: itemRowState?.monthly_invoice_id,
              revenueSource: itemRowState?.revenue_source,
              revenueSourceId: itemRowState?.transaction_id,
              customer: itemRowState?.customer
            }
          });
        }
      }
    }
  }, [billingRecalculate?.data]);

  useEffect(() => {
    if (addInvoiceData?.status === 'success') {
      const newData: any = rows?.map((item: any) => {
        for (let i = 0; i < addInvoiceData?.data?.set_details?.length; i++) {
          if (item.monthly_invoice_id == addInvoiceData?.data?.set_details[i].monthly_invoice_id) {
            return addInvoiceData?.data?.set_details[i];
          }
        }
        return item;
      });
      setRows(newData);
      console.log('newData', newData);
    }
  }, [addInvoiceData]);

  useEffect(() => {
    if (!recaluclateState && updateBillingInvoice?.status == 'success') {
      // setitemRowState('');
      sethitStatus('');
      setRecalculateState('');
    }
  }, [updateBillingInvoice?.data]);

  useEffect(() => {
    const adjBillingData: any = [];
    const editedMonth: any = [];
    const editedYear: any = [];
    if (billingInvoice?.status == 'success' && billingInvoice) {
      const result = billingInvoice?.data?.result;
      setBillingData(result);
      result.forEach((res: any) => {
        adjBillingData.push({ [res?.id]: res?.adjusted_billing_gross_value });
        editedMonth.push({ [res?.id]: res?.edited_billing_month.toString() });
        editedYear.push({ [res?.id]: res?.edited_billing_year.toString() });
      });

      setAdjBilling(adjBillingData);
      setMonths(editedMonth);
      setYear(editedYear);
    }
  }, [billingInvoice?.data]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];
    const newdata: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.comment_count,
              data.customer,
              data.type,
              data.invoice_number,
              data.assigment_status,
              data.customer_invoice_id,
              data.haircut_status,
              data.payment_status,
              data.revenue_source_name,
              data.currency,
              data.billing_gross_value,
              data.adjusted_billing_gross_value,
              data.notional_gross_value,
              data.month,
              data.year,
              data.invoice_month,
              data.advance_date,
              data.month_end,
              data.due_date,
              data.notional_purchase_value,
              data.notional_advance_amount,
              data.notional_haircut_value,
              data.advance_fee,
              data.gross_value_delta_percentage,
              data.gross_value_delta,
              data.haircut_balance,
              data.monthly_invoice_id,
              data.issue_date,
              data.ingestion_date,
              data.approval_date,
              data.data_source,
              data.revenue_source,
              data.transaction_id,
              data.customer_due_date,
              data.advance_duration,
              data.customer_revenue_source_reference,
              data.payment_made,
              data.payment_date,
              data.paid_on_date,
              data.codat_id,
              data.action_status
            )
          ];
          newdata.push(moment(data.due_date).format('YYYY-MM-DD'));
          return '';
        });
      }
      setRows(newArray);
    };
    if (workflowB?.status === 'success') {
      generateTableData(workflowB.data.results);
    }
  }, [workflowB]);

  useEffect(() => {
    if (showData) {
      setTimeout(() => {
        setShowInnerTable(true);
      }, 1500);
      setShowData(false);
    }
  }, [showData, showInnerTable]);

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
  const handleMonth = (data: Date | null, index: any) => {
    const prevDate = months;
    const monthList: any = prevDate?.map((item, ind) => (item[index] ? ind : ''));
    const x = monthList?.filter((item1: any) => item1 != '')?.[0];
    const monthListNew = x ? x : 0;
    prevDate[monthListNew][index] = data ? moment(data).format('MM') : null;
    setMonths(prevDate);
    setMonthChanging(prevDate[monthListNew][index]);
    setYearChanging(prevDate[monthListNew][index]);
    showIndex.indexOf(monthListNew) == -1 && setShowIndex([...showIndex, monthListNew]);
  };

  // Handle Editable Dates
  const handleYear = (data: Date | null, index: any) => {
    const prevDate = year;
    const yearList: any = prevDate?.map((item, ind) => (item[index] ? ind : ''));
    const x = yearList?.filter((item1: any) => item1 != '')?.[0];
    const yearListNew = x ? x : 0;
    prevDate[yearListNew][index] = data ? moment(data).format('yyyy') : null;
    setYear(prevDate);
    setMonthChanging(prevDate[yearListNew][index]);
    setYearChanging(prevDate[yearListNew][index]);
    showIndex.indexOf(yearListNew) == -1 && setShowIndex([...showIndex, yearListNew]);
  };

  // handle Gross value
  const handleAdjBilling = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    const newBilling = adjBilling;
    const indexList: any = newBilling?.map((item, ind) => (item[index] ? ind : ''));
    const x = indexList?.filter((item1: any) => item1 != '')?.[0];
    const indexListNew = x ? x : 0;
    newBilling[indexListNew][index] = Number(e.target.value);
    setAdjBilling(newBilling);
    setYearChanging(true);
    setMonthChanging(true);
    setValueChanging(newBilling[indexListNew][index]);
    showIndex.indexOf(indexListNew) == -1 && setShowIndex([...showIndex, indexListNew]);
  };

  const handleOpenRow = (itemRow: any, isOpen: boolean) => {
    setShowInnerTable(false);
    setSelectedMonthlyId(itemRow?.monthly_invoice_id);
    setSelectedTransactionId(itemRow?.transaction_id);
    setSelectedCurrency(itemRow?.currency);
    if (!isOpen) {
      setShowData(true);
      dispatch({
        type: 'BILLING_INVOICE',
        payload: {
          currency: itemRow?.currency,
          monthlyId: itemRow?.monthly_invoice_id,
          revenueSource: itemRow?.revenue_source,
          revenueSourceId: itemRow?.transaction_id,
          customer: itemRow?.customer
        }
      });
    }
  };

  const handleRecalculate = (row: any, index: any, itemRow: any) => {
    const adjBillingNewValue = adjBilling?.filter((item) => item?.[row.id])?.[0];
    const monthNewValue = months?.filter((item) => item?.[row.id])?.[0];
    const yearNewValue = year?.filter((item) => item?.[row.id])?.[0];
    const month: number = Number(monthNewValue[row.id]);
    const value = adjBillingNewValue ? adjBillingNewValue[row.id] : 0;
    const yearD: number = Number(yearNewValue[row.id]);
    setRecalculateState(row.notional_id);
    dispatch({
      type: 'BILLING_RECALCULATE',
      payload: {
        id: row.notional_id,
        month,
        value,
        year: yearD
      }
    });
    dispatch({
      type: 'BILLING_INVOICE',
      payload: {
        currency: itemRow?.currency,
        monthlyId: itemRow?.monthly_invoice_id,
        revenueSource: itemRow?.revenue_source,
        revenueSourceId: itemRow?.transaction_id,
        customer: itemRow?.customer
      }
    });
    setEdit({ isEdit: false, id: '' });
    if (billingRecalculate?.status == 'failure') {
      setOpenSnackbar(true);
    }
  };

  const handleUpdate = (row: any, index: any, status: any, itemRow: any) => {
    const adjBillingNewValue = adjBilling?.filter((item) => item?.[row.id])?.[0];
    const monthNewValue = months?.filter((item) => item?.[row.id])?.[0];
    const yearNewValue = year?.filter((item) => item?.[row.id])?.[0];
    setRecalculateState(
      !recaluclateState || recaluclateState !== row.notional_id ? '' : row.notional_id
    );
    setApproveBtn(row.id);
    setDropCurrency(row?.currency);
    setitemRowState(itemRow);
    sethitStatus(status);
    if (!recaluclateState || recaluclateState !== row.notional_id) {
      const month: number = Number(monthNewValue[row.id]);
      const value = adjBillingNewValue ? adjBillingNewValue[row.id] : 0;
      const yearD: number = Number(yearNewValue[row.id]);

      dispatch({
        type: 'BILLING_RECALCULATE',
        payload: {
          id: row.notional_id,
          month,
          value,
          year: yearD
        }
      });
    } else {
      setRecalculateState('');
      dispatch({
        type: 'UPDATE_BILLING_INVOICE',
        payload: {
          id: row.id,
          action_status: status,
          currency: row?.currency
        }
      });
      setOpenSnackbar(true);
      dispatch({
        type: 'BILLING_INVOICE',
        payload: {
          currency: itemRow?.currency,
          monthlyId: itemRow?.monthly_invoice_id,
          revenueSource: itemRow?.revenue_source,
          revenueSourceId: itemRow?.transaction_id,
          customer: itemRow?.customer
        }
      });
    }

    if (updateBillingInvoice?.status == 'failure') {
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (res: any) => {
    setEdit({ isEdit: true, id: res.id });
  };

  const handleCancel = () => {
    setEdit({ isEdit: false, id: '' });
    const adjBillingData: any = [];
    const editedMonth: any = [];
    const editedYear: any = [];
    const result = billingInvoice?.data?.result;
    setBillingData(result);
    result.forEach((res: any) => {
      // adjBillingData.push(res.adjusted_billing_gross_value);
      // editedMonth.push(res.edited_billing_month.toString());
      // editedYear.push(res.edited_billing_year.toString());
      adjBillingData.push({ [res?.id]: res?.adjusted_billing_gross_value });
      editedMonth.push({ [res?.id]: res?.edited_billing_month.toString() });
      editedYear.push({ [res?.id]: res?.edited_billing_year.toString() });
    });
    setAdjBilling(adjBillingData);
    setMonths(editedMonth);
    setYear(editedYear);
  };

  const handleCommentRow = (res: any) => {
    const codatinvoiceuuid = res.comments.map((item: any) => item.uuid);
    const codatVlaue = res.id;
    const cpmRow = res.comments;
    setcpmRow(cpmRow);
    setcodatinvoice(codatVlaue);
    setcodatuuid(codatinvoiceuuid);
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
    mainAPI();
    setOpen(false);
  };

  // Handle Modal close
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleCommentRow1 = (row: any) => {
    setnotionalCurrency(row.currency);
    setinvoiceMonth(row.monthly_invoice_id);
    dispatch({
      type: 'GET_NOTIONAL_COMMENTS',
      payload: {
        currency: row.currency,
        monthly_invoice_id: row.monthly_invoice_id
      }
    });
    setOpen1(true);
  };

  const onHandleChangeTextarea1 = (e: any) => {
    setnotionalCommentSet(e.target.value);
  };

  const onHandleSubmitTextarea1 = (e: any) => {
    dispatch({
      type: 'CREATE_NOTIONAL_COMMENT',
      payload: {
        currency: notionalCurrency,
        comment: notionalCommentSet,
        invoicemonth: invoiceMonth
      }
    });
    setnotionalCommentSet('');
    mainAPI();
    setOpen1(false);
  };

  const onHandleCross1 = (i: number, item: any) => {
    const found = item.uuid;
    dispatch({
      type: 'DELETE_NOTIONAL_COMMENTS',
      payload: {
        uuid: found
      }
    });
    mainAPI();

    setOpen1(false);
  };

  const handleSnacbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  function splitId(str: any) {
    const first5 = str && `${str.substring(0, 8)}...`;
    return first5;
  }

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
                ? rows.map((row, i) => {
                    const checkCondntion =
                      approveBtn &&
                      `${updateBillingInvoice?.data?.set_info?.monthly_invoice_id}/${updateBillingInvoice?.data?.set_info?.currency}` ==
                        `${row?.monthly_invoice_id}/${row?.currency}`;

                    const checkCondntion2 =
                      recaluclateState &&
                      billingRecalculate?.data?.set_details?.filter(
                        (item: any) =>
                          `${item?.monthly_invoice_id}/${item?.currency}` ==
                          `${row?.monthly_invoice_id}/${row?.currency}`
                      );

                    return (
                      <>
                        <TableRow hover tabIndex={-1} key={row.message_id}>
                          <StylesTableCell align='center' style={{ minWidth: '15rem' }}>
                            {row.comment_count > 0 ? (
                              <IconButton aria-label='CreateIcon' style={{ padding: '0px' }}>
                                <CreateIcon
                                  style={{ color: 'red' }}
                                  onClick={() => handleCommentRow1(row)}
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label='CreateIcon'
                                style={{ padding: '0px' }}
                                onClick={() => handleCommentRow1(row)}
                              >
                                <CreateIcon />
                              </IconButton>
                            )}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='adv_arrow'>
                            <p className='arrow'>{row.customer}</p>
                            {row.assigment_status === '1' || row.assigment_status === '3' ? (
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() =>
                                  handleOpenRow(
                                    row,
                                    selectedMonthlyId === row?.monthly_invoice_id &&
                                      selectedTransactionId === row?.transaction_id &&
                                      selectedCurrency === row?.currency &&
                                      showInnerTable
                                      ? true
                                      : false
                                  )
                                }
                              >
                                {selectedMonthlyId === row?.monthly_invoice_id &&
                                selectedTransactionId === row?.transaction_id &&
                                selectedCurrency === row?.currency &&
                                showInnerTable ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            ) : (
                              ''
                            )}
                          </StylesTableCell>
                          <StylesTableCell align='center' style={{ minWidth: '15rem' }}>
                            {row.type === 'Billing Invoice'
                              ? 'Collateral Invoice'
                              : row.type === 'Notional Invoice Set'
                              ? 'Transactional Invoice Set'
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.invoice_number
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.invoice_number
                              : row.invoice_number
                              ? row.invoice_number
                              : '-'} */}
                            {splitId(row.monthly_invoice_id)}
                            {/* {checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.invoice_number
                              : row.invoice_number
                              ? row.invoice_number
                              : '-'} */}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.assigment_status ? row.assigment_status : '-'} */}

                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.assigment_status === '0'
                                ? 'Investigate'
                                : checkCondntion2?.[0]?.assigment_status === '1'
                                ? 'Pending'
                                : checkCondntion2?.[0]?.assigment_status === '2'
                                ? 'Unassigned'
                                : checkCondntion2?.[0]?.assigment_status === '3'
                                ? 'Assigned'
                                : ''
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.assigment_status === '0'
                                ? 'Investigate'
                                : updateBillingInvoice?.data?.set_info?.assigment_status === '1'
                                ? 'Pending'
                                : updateBillingInvoice?.data?.set_info?.assigment_status === '2'
                                ? 'Unassigned'
                                : updateBillingInvoice?.data?.set_info?.assigment_status === '3'
                                ? 'Assigned'
                                : ''
                              : row.assigment_status
                              ? row.assigment_status === '0'
                                ? 'Investigate'
                                : row.assigment_status === '1'
                                ? 'Pending'
                                : row.assigment_status === '2'
                                ? 'Unassigned'
                                : row.assigment_status === '3'
                                ? 'Assigned'
                                : ''
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>-</StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.haircut_status ? row.haircut_status : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.haircut_status
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.haircut_status
                              : row.haircut_status
                              ? row.haircut_status
                              : '-'}
                            {/* {checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.haircut_status
                              : row.haircut_status
                              ? row.haircut_status
                              : '-'} */}
                          </StylesTableCell>

                          <StylesTableCell align='center'>
                            {/* {row.payment_status ? row.payment_status : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.payment_status
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.payment_status
                              : row.payment_status
                              ? row.payment_status
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.revenue_source_name ? row.revenue_source_name : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.revenue_source_name
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.revenue_source_name
                              : row.revenue_source_name
                              ? row.revenue_source_name
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {row.currency ? row.currency : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.billing_gross_value
                          ? Number(row.billing_gross_value).toFixed(2)
                          : '-'} */}

                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.billing_gross_value
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.billing_gross_value
                              : row.billing_gross_value
                              ? Number(row.billing_gross_value).toFixed(2)
                              : '-'}
                            {/* {checkCondntion
                            //   ? updateBillingInvoice?.data?.set_info?.billing_gross_value
                            //   : row.billing_gross_value
                            //   ? Number(row.billing_gross_value).toFixed(2)
                            //   : '-'} */}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.adjusted_billing_gross_value
                          ? Number(row.adjusted_billing_gross_value).toFixed(2)
                          : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.adjusted_billing_gross_value
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.adjusted_billing_gross_value
                              : row.adjusted_billing_gross_value
                              ? Number(row.adjusted_billing_gross_value).toFixed(2)
                              : '-'}
                            {/* { checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.adjusted_billing_gross_value
                              : row.adjusted_billing_gross_value
                              ? Number(row.adjusted_billing_gross_value).toFixed(2)
                              : '-'} */}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.notional_gross_value
                          ? Number(row.notional_gross_value).toFixed(2)
                          : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.notional_gross_value
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.notional_gross_value
                              : row.notional_gross_value
                              ? Number(row.notional_gross_value).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.month ? monthArr[Number(row.month) - 1] : '-'} */}
                            {checkCondntion2?.length > 0
                              ? monthArr[Number(checkCondntion2?.[0]?.month) - 1]
                              : checkCondntion
                              ? monthArr[Number(updateBillingInvoice?.data?.set_info?.month) - 1]
                              : row.month
                              ? monthArr[Number(row.month) - 1]
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.year ? row.year : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.year
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.year
                              : row.year
                              ? row.year
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.invoice_month ? row.invoice_month : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.invoice_month
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.invoice_month
                              : row.invoice_month
                              ? row.invoice_month
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.advance_date ? moment(row.advance_date).format('DD/MM/YYYY') : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.advance_date
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.advance_date
                              : row.advance_date
                              ? moment(row.advance_date).format('DD/MM/YYYY')
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {moment(row.month_end).format('DD/MM/YYYY')} */}
                            {checkCondntion2?.length > 0
                              ? moment(checkCondntion2?.[0]?.month_end).format('DD/MM/YYYY')
                              : checkCondntion
                              ? moment(updateBillingInvoice?.data?.set_info?.month_end).format(
                                  'DD/MM/YYYY'
                                )
                              : row.month_end
                              ? moment(row.month_end).format('DD/MM/YYYY')
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {moment(row.due_date).format('DD/MM/YYYY')} */}
                            {checkCondntion2?.length > 0
                              ? moment(checkCondntion2?.[0]?.due_date).format('DD/MM/YYYY')
                              : checkCondntion
                              ? moment(updateBillingInvoice?.data?.set_info?.due_date).format(
                                  'DD/MM/YYYY'
                                )
                              : row.due_date
                              ? moment(row.due_date).format('DD/MM/YYYY')
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.notional_purchase_value
                          ? Number(row.notional_purchase_value).toFixed(2)
                          : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.notional_purchase_value
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.notional_purchase_value
                              : row.notional_purchase_value
                              ? Number(row.notional_purchase_value).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.notional_advance_amount
                              ? Number(row.notional_advance_amount).toFixed(2)
                              : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.notional_advance_amount
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.notional_advance_amount
                              : row.notional_advance_amount
                              ? Number(row.notional_advance_amount).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.notional_haircut_value
                              ? Number(row.notional_haircut_value).toFixed(2)
                              : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.notional_haircut_value
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.notional_haircut_value
                              : row.notional_haircut_value
                              ? Number(row.notional_haircut_value).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.advance_fee ? Number(row.advance_fee).toFixed(2) : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.advance_fee
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.advance_fee
                              : row.advance_fee
                              ? Number(row.advance_fee).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.gross_value_delta ? Number(row.gross_value_delta).toFixed(2) : '-'} */}
                            {checkCondntion2?.length > 0
                              ? checkCondntion2?.[0]?.gross_value_delta
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.gross_value_delta
                              : row.gross_value_delta
                              ? Number(row.gross_value_delta).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.gross_value_delta_percentage
                              ? `${Number(row.gross_value_delta_percentage).toFixed(2)}%`
                              : '-'} */}

                            {checkCondntion2?.length > 0
                              ? `${Number(
                                  checkCondntion2?.[0]?.gross_value_delta_percentage
                                ).toFixed(2)}%`
                              : checkCondntion
                              ? `${updateBillingInvoice?.data?.set_info?.gross_value_delta_percentage}%`
                              : row.gross_value_delta_percentage
                              ? `${Number(row.gross_value_delta_percentage).toFixed(2)}%`
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center' className='padd_lft_align'>
                            {/* {row.haircut_balance ? Number(row.haircut_balance).toFixed(2) : '-'} */}
                            {checkCondntion2?.length > 0
                              ? Number(checkCondntion2?.[0]?.haircut_balance).toFixed(2)
                              : checkCondntion
                              ? Number(
                                  updateBillingInvoice?.data?.set_info?.haircut_balance
                                ).toFixed(2)
                              : row.haircut_balance
                              ? Number(row.haircut_balance).toFixed(2)
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {row.monthly_invoice_id ? row.monthly_invoice_id : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.issue_date ? moment(row.issue_date).format('DD/MM/YYYY') : '-'} */}
                            {checkCondntion2?.length > 0
                              ? moment(checkCondntion2?.[0]?.issue_date).format('DD/MM/YYYY')
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.issue_date
                              : row.issue_date
                              ? moment(row.issue_date).format('DD/MM/YYYY')
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.ingestion_date
                              ? moment(row.ingestion_date).format('DD/MM/YYYY')
                              : '-'} */}
                            {checkCondntion2?.length > 0
                              ? moment(checkCondntion2?.[0]?.ingestion_date).format('DD/MM/YYYY')
                              : checkCondntion
                              ? updateBillingInvoice?.data?.set_info?.ingestion_date
                              : row.ingestion_date
                              ? moment(row.ingestion_date).format('DD/MM/YYYY')
                              : '-'}
                          </StylesTableCell>
                          <StylesTableCell align='center'>
                            {/* {row.approval_date ? moment(row.approval_date).format('DD/MM/YYYY') : '-'} */}
                            {checkCondntion2?.length > 0
                              ? moment(checkCondntion2?.[0]?.approval_date).format('DD/MM/YYYY')
                              : checkCondntion
                              ? moment(updateBillingInvoice?.data?.set_info?.approval_date).format(
                                  'DD/MM/YYYY'
                                )
                              : row.approval_date
                              ? moment(row.approval_date).format('DD/MM/YYYY')
                              : '-'}
                          </StylesTableCell>
                        </TableRow>
                        {selectedMonthlyId === row?.monthly_invoice_id &&
                          selectedTransactionId === row?.transaction_id &&
                          selectedCurrency === row?.currency &&
                          showInnerTable &&
                          billingData &&
                          billingData.map((res: any, index: number) => {
                            const adjBillingNewValue = adjBilling?.filter(
                              (item) => item?.[res.id]
                            )?.[0];
                            const monthNewValue = months?.filter((item) => item?.[res.id])?.[0];
                            const yearNewValue = year?.filter((item) => item?.[res.id])?.[0];

                            return (
                              <TableRow hover tabIndex={-1} key={res.message_id}>
                                <StylesTableCell align='center' style={{ minWidth: '15rem' }}>
                                  {res.comments.length > 0 ? (
                                    <IconButton aria-label='CreateIcon'>
                                      <CreateIcon
                                        style={{ color: 'red' }}
                                        onClick={() => handleCommentRow(res)}
                                      />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      aria-label='CreateIcon'
                                      onClick={() => handleCommentRow(res)}
                                    >
                                      <CreateIcon />
                                    </IconButton>
                                  )}
                                </StylesTableCell>
                                <StylesTableCell align='center'>{res.customer}</StylesTableCell>
                                <StylesTableCell align='center' style={{ minWidth: '15rem' }}>
                                  {/* {res.type ? res.type : '-'} */}
                                  {res.type === 'Billing Invoice'
                                    ? 'Collateral Invoice'
                                    : res.type === 'Notional Invoice Set'
                                    ? 'Transactional Invoice Set'
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.monthly_invoice_id ? splitId(res.monthly_invoice_id) : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.invoice_status ? res.invoice_status : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.invoice_status === 'Approve' && (
                                    <>
                                      <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleUpdate(res, index, 'approved', row)}
                                        // className='approve_btn'
                                        className={
                                          approveBtn === res.id ? 'approve_btn bdr' : 'approve_btn'
                                        }
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleUpdate(res, index, 'rejected', row)}
                                        className='reject_btn'
                                      >
                                        Reject
                                      </Button>
                                      <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleRecalculate(res, index, row)}
                                        className='recalculate'
                                      >
                                        Recalculate
                                      </Button>
                                    </>
                                  )}
                                  {res.invoice_status === 'Assigned' &&
                                    !(edit.isEdit && edit.id === res.id) && (
                                      <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleEdit(res)}
                                        style={{ marginRight: '10px', background: 'gray' }}
                                      >
                                        Edit
                                      </Button>
                                    )}
                                  {edit.isEdit &&
                                    edit.id === res.id &&
                                    res.invoice_status === 'Assigned' && (
                                      <>
                                        <Button
                                          variant='contained'
                                          color='primary'
                                          // onClick={() => handleUpdate(res, index, 'pending', row)}
                                          onClick={() => handleRecalculate(res, index, row)}
                                          className='unassign_btn'
                                        >
                                          Unassign
                                        </Button>
                                        <Button
                                          variant='contained'
                                          color='primary'
                                          onClick={() => handleRecalculate(res, index, row)}
                                          className='recalculate'
                                        >
                                          Recalculate
                                        </Button>
                                        <Button
                                          variant='contained'
                                          color='primary'
                                          onClick={() => handleCancel()}
                                          className='cancel_btn'
                                        >
                                          Cancel
                                        </Button>
                                      </>
                                    )}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.haircut_status ? res.haircut_status : '-'}
                                </StylesTableCell>

                                <StylesTableCell align='center'>
                                  {res.payment_status ? res.payment_status : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.revenue_source_name ? res.revenue_source_name : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.currency ? res.currency : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.billing_gross_value
                                    ? Number(res.billing_gross_value).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  <input
                                    value={adjBillingNewValue ? adjBillingNewValue[res.id] : null}
                                    // defaultValue={res.adjusted_billing_gross_value}
                                    type='number'
                                    style={{
                                      backgroundColor: 'white',
                                      border: '2px solid rgb(238,238,238)',
                                      padding: '2px',
                                      height: '2rem'
                                    }}
                                    onChange={(e) => handleAdjBilling(e, res.id)}
                                  />
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.notional_gross_value
                                    ? Number(res.notional_gross_value).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.month ? monthArr[Number(res.month) - 1] : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.year ? res.year : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  <MuiPickersUtilsProviderWrapper
                                    utils={DateFnsUtils}
                                    locale={locale}
                                  >
                                    <KeyboardDatePickerWrapper
                                      margin='normal'
                                      id='from-picker-dialog'
                                      label='From'
                                      type='month'
                                      format='yyyy-MM'
                                      value={monthNewValue ? monthNewValue[res.id] : null}
                                      onChange={(d) => handleMonth(d, res.id)}
                                      views={['month']}
                                    />
                                  </MuiPickersUtilsProviderWrapper>
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  <MuiPickersUtilsProviderWrapper
                                    utils={DateFnsUtils}
                                    locale={locale}
                                  >
                                    <KeyboardDatePickerWrapper
                                      margin='normal'
                                      id='from-picker-dialog'
                                      label='From'
                                      type='year'
                                      format='yyyy'
                                      value={yearNewValue ? yearNewValue[res.id] : null}
                                      onChange={(d) => handleYear(d, res.id)}
                                      views={['year']}
                                    />
                                  </MuiPickersUtilsProviderWrapper>
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.month_end ? moment(res.month_end).format('DD/MM/YYYY') : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.due_date ? moment(res.due_date).format('DD/MM/YYYY') : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.notional_purchase_value
                                    ? Number(res.notional_purchase_value).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.notional_advance_amount
                                    ? Number(res.notional_advance_amount).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.notional_haircut_value
                                    ? Number(res.notional_haircut_value).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.advance_fee ? Number(res.advance_fee).toFixed(2) : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.gross_value_delta
                                    ? Number(res.gross_value_delta).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.gross_value_delta_percentage
                                    ? `${Number(res.gross_value_delta_percentage).toFixed(2)}%`
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center' className='padd_lft_align'>
                                  {res.haircut_balance
                                    ? Number(res.haircut_balance).toFixed(2)
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.monthly_invoice_id ? res.monthly_invoice_id : '-'}
                                </StylesTableCell>

                                {/* <StylesTableCell align='center'>
                              {res.invoice_id ? res.invoice_id : '-'}
                            </StylesTableCell> */}
                                <StylesTableCell align='center'>
                                  {res.issue_date
                                    ? moment(res.issue_date).format('DD/MM/YYYY')
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {res.ingestion_date
                                    ? moment(res.ingestion_date).format('DD/MM/YYYY')
                                    : '-'}
                                </StylesTableCell>
                                <StylesTableCell align='center'>
                                  {/* {res.approval_date ? res.approval_date : '-'} */}
                                  {res.approval_date
                                    ? moment(res.approval_date).format('DD/MM/YYYY')
                                    : '-'}
                                </StylesTableCell>
                                {/* <StylesTableCell align='center' style={{ minWidth: '23rem' }}>
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleRecalculate(res, index)}
                                style={{ marginRight: '10px' }}
                              >
                                Recalculate
                              </Button>
                            </StylesTableCell> */}
                              </TableRow>
                            );
                          })}
                      </>
                    );
                  })
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {workflowB?.data?.results?.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={workflowB?.data?.count}
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
                      <li key={item}>
                        <span>
                          <p>{item.comment}</p>
                          <span>{`${item.time}  ${item.first_name} ${item.last_name}`}</span>
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
        <StyledDialog
          open={open1}
          onClose={handleClose1}
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
                  {getNotionalComments?.data?.results?.map((item: any, i: number) => (
                    <>
                      <li key={item}>
                        <span>
                          <p>{item.comment}</p>
                          <span>{`${item.time}  ${item.first_name} ${item.last_name}`}</span>
                        </span>
                        <span>
                          <CancelOutlinedIcon
                            onClick={() => onHandleCross1(i, item)}
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
                  onChange={(e: any) => onHandleChangeTextarea1(e)}
                />
                <button
                  type='submit'
                  onClick={(e: any) => onHandleSubmitTextarea1(e)}
                  className='submit_btn'
                >
                  Submit Comment
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </StyledDialog>
      </StyledTableWrap>

      {updateBillingInvoice?.status === 'failure' && (
        <>
          <StyledSnackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={openSnackbar}
            autoHideDuration={3000}
            className='cstm_snackbar'
            onClose={handleSnacbarClose}
            message={updateBillingInvoice?.message?.data}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  billingInvoice: state.billingInvoice.data,
  billingRecalculate: state.billingRecalculate.data,
  getCommentsCodat: state.getCommentsCodat.data,
  deleteCommentsCodat: state.deleteCommentsCodat.data,
  getNotionalComments: state.getNotionalComments.data,
  createNotionalComments: state.createNotionalComments.data,
  deleteNotionalComments: state.deleteNotionalComments.data,
  updateBillingInvoice: state.updateBillingInvoice.data,
  addInvoiceData: state.addInvoiceData.data,
  updateTransactionalInvoice: state.updateTransactionalInvoice.data
});

export default connect(mapStateToProps)(DataTableSection);
