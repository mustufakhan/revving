/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { StyledTableWrap } from './Styled';

interface Data {
  notional_invoice_id: string;
  monthly_invoice: number;
  start_date: string;
  end_date: string;
  advance_date: string;
  sales_tax: number;
  revenue_source: string;
  customer: number;
  gross_value_net_tax: string;
  haircut_percent: string;
  haircut_amount: string;
  daily_advance_fee: string;
  expected_repayment_date: string;
  gross_value: string;
  advance_duration: string;
  currency: string;
  fee_setting: string;
  advance_amount: string;
  purchase_value: string | number;
  fee_amount: string;
  InvoiceMonth_month: number;
  InvoiceMonth_month_end: string;
  invoice_status: string;
  resend: string;
  customer_name: string;
  revenue_source_master_name: string;
  data_source: number;
  data_source_name: string;
}

function createData(
  notional_invoice_id: string,
  monthly_invoice: number,
  start_date: string,
  end_date: string,
  advance_date: string,
  sales_tax: number,
  revenue_source: string,
  customer: number,
  gross_value_net_tax: string,
  haircut_percent: string,
  haircut_amount: string,
  expected_repayment_date: string,
  gross_value: string,
  daily_advance_fee: string,
  advance_duration: string,
  currency: string,
  fee_setting: string,
  advance_amount: string,
  purchase_value: string | number,
  fee_amount: string,
  InvoiceMonth_month: number,
  InvoiceMonth_month_end: string,
  invoice_status: string,
  resend: string,
  customer_name: string,
  revenue_source_master_name: string,
  data_source: number,
  data_source_name: string
): Data {
  return {
    notional_invoice_id,
    monthly_invoice,
    start_date,
    end_date,
    advance_date,
    sales_tax,
    revenue_source,
    customer,
    gross_value_net_tax,
    haircut_percent,
    haircut_amount,
    expected_repayment_date,
    gross_value,
    daily_advance_fee,
    advance_duration,
    currency,
    fee_setting,
    advance_amount,
    purchase_value,
    fee_amount,
    InvoiceMonth_month,
    InvoiceMonth_month_end,
    invoice_status,
    resend,
    customer_name,
    revenue_source_master_name,
    data_source,
    data_source_name
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
  { id: 'invoice_status', numeric: true, disablePadding: false, label: 'STATUS' },
  { id: 'resend', numeric: true, disablePadding: false, label: 'RESEND' },
  { id: 'customer_name', numeric: true, disablePadding: false, label: 'CUSTOMER' },
  {
    id: 'revenue_source_master_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  {
    id: 'notional_invoice_id',
    numeric: true,
    disablePadding: false,
    label: 'DOCUMENT NUMBER'
  },
  { id: 'monthly_invoice', numeric: true, disablePadding: false, label: 'MONTHLY ID' },
  { id: 'start_date', numeric: true, disablePadding: false, label: 'INVOICE START DATE' },
  { id: 'end_date', numeric: true, disablePadding: false, label: 'INVOICE END DATE' },
  {
    id: 'InvoiceMonth_month',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE MONTH'
  },
  {
    id: 'InvoiceMonth_month_end',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE MONTH END'
  },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  {
    id: 'gross_value',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE'
  },
  { id: 'sales_tax', numeric: true, disablePadding: false, label: 'SALES TAX' },
  {
    id: 'gross_value_net_tax',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE NET TAX'
  },
  { id: 'haircut_amount', numeric: true, disablePadding: false, label: 'HAIRCUT AMOUNT' },
  {
    id: 'purchase_value',
    numeric: true,
    disablePadding: false,
    label: 'PURCHASE VALUE'
  },
  {
    id: 'fee_amount',
    numeric: true,
    disablePadding: false,
    label: 'FEE AMOUNT'
  },
  {
    id: 'advance_amount',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE AMOUNT'
  },
  { id: 'advance_date', numeric: true, disablePadding: false, label: 'ADVANCE DATE' },
  {
    id: 'expected_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'EXPECTED REPAYMENT DATE'
  },
  {
    id: 'advance_duration',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE DURATION (DAYS)'
  },
  { id: 'haircut_percent', numeric: true, disablePadding: false, label: 'HAIRCUT (%)' },
  {
    id: 'daily_advance_fee',
    numeric: true,
    disablePadding: false,
    label: 'MONTHLY ADVANCE FEE (%)'
  },
  {
    id: 'fee_setting',
    numeric: true,
    disablePadding: false,
    label: 'FEE TYPE'
  },
  { id: 'notional_invoice_id', numeric: false, disablePadding: false, label: 'TRANSACTIONAL ID' },
  {
    id: 'revenue_source',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE ID'
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
  transNotionalInvoice: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  getNotionalTransactionalInvoice: {
    data: any;
    status: string;
  };
}

const NotionalInvoiceTableSection: React.FC<IProps> = ({
  transNotionalInvoice,
  getNotionalTransactionalInvoice,
  dispatch,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  console.log('rows', rows);
  const [notionInvoice, setnotionInvoice] = React.useState<any>('');

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.notional_invoice_id,
              data.monthly_invoice,
              data.start_date,
              data.end_date,
              data.advance_date,
              data.sales_tax,
              data.revenue_source,
              data.customer,
              data.gross_value_net_tax,
              data.haircut_percent,
              data.haircut_amount,
              data.expected_repayment_date,
              data.gross_value,
              data.daily_advance_fee,
              data.advance_duration,
              data.currency,
              data.fee_setting,
              data.advance_amount,
              data.purchase_value,
              data.fee_amount,
              data.InvoiceMonth_month,
              data.InvoiceMonth_month_end,
              data.invoice_status,
              data.resend,
              data.customer_name,
              data.revenue_source_master_name,
              data.data_source,
              data.data_source_name
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (transNotionalInvoice?.status === 'success') {
      generateTableData(transNotionalInvoice.data.results);
    }
  }, [transNotionalInvoice]);

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

  const handleResendInvoice = (row: any) => {
    setnotionInvoice(row.notional_invoice_id);
    dispatch({
      type: 'GET_NOTIONAL_TRANS_INVOICE',
      payload: {
        notional_invoice_id: row.notional_invoice_id,
        lms_status: 'pending'
      }
    });
    // setborder('resend bdr_black');
    // if (getNotionalTransactionalInvoice?.status == 'success') {
    //   setborder('');
    // }
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
                ? rows.map((row) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell align='center'>
                        {row.invoice_status === 'success'
                          ? 'Sent'
                          : row.invoice_status
                          ? row.invoice_status
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_status === 'rejected' ? (
                          <button
                            type='button'
                            className={
                              notionInvoice === row.notional_invoice_id
                                ? 'resend bdr_black'
                                : 'resend'
                            }
                            onClick={() => handleResendInvoice(row)}
                          >
                            Resend
                          </button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {row.customer_name ? row.customer_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_master_name ? row.revenue_source_master_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.notional_invoice_id ? splitId(row.notional_invoice_id) : '-'}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.monthly_invoice ? row.monthly_invoice : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.start_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.end_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {row.InvoiceMonth_month ? row.InvoiceMonth_month : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.InvoiceMonth_month_end
                          ? moment(row.InvoiceMonth_month_end).format('DD/MM/YYYY')
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_value ? Number(row.gross_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.sales_tax ? row.sales_tax : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_value_net_tax ? Number(row.gross_value_net_tax).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.haircut_amount ? Number(row.haircut_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.purchase_value ? Number(row.purchase_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.fee_amount ? Number(row.fee_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_amount ? Number(row.advance_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.advance_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.expected_repayment_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_duration ? Number(row.advance_duration).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {/* {row.haircut_percent ? `${row.haircut_percent}(%)` : '-'} */}
                        {row.haircut_percent ? `${Number(row.haircut_percent).toFixed(2)}%` : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {/* {row.daily_advance_fee ? `${row.daily_advance_fee}(%)` : '-'} */}
                        {row.daily_advance_fee
                          ? `${Number(row.daily_advance_fee).toFixed(2)}%`
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.fee_setting ? row.fee_setting : '-'}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.notional_invoice_id ? row.notional_invoice_id : '-'}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.revenue_source ? row.revenue_source : '-'}
                      </TableCell>
                      {/* <TableCell align='center'>{row.fee_setting ? row.fee_setting : '-'}</TableCell> */}
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {transNotionalInvoice?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={transNotionalInvoice?.data?.count}
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
  getNotionalTransactionalInvoice: state.getNotionalTransactionalInvoice.data
});

export default connect(mapStateToProps)(NotionalInvoiceTableSection);
