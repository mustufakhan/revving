/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
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
  invoice_id: string;
  created_at: string;
  lms_state: string;
  monthly_invoice: number;
  start_date: string;
  end_date: string;
  advance_date: string;
  aggregation_number: number;
  revenue_source: string;
  type: string;
  invoice_number: string;
  customer: number;
  notional_invoice_value: string;
  haircut_percent: string;
  haircut_amount: string;
  total_advance_fee: string | number;
  daily_advance_fee: string;
  expected_repayment_date: string;
  gross_invoice_value: string;
  purchase_value: string;
  advance_duration: string;
  currency: string;
  fee_setting: string;
  advance_amount: string;
  fee_amount: string;
  invoice_month_name: string;
  invoice_year: string | number;
  InvoiceMonth_month_end: string;
  customer_name: string;
  revenue_source_master_name: string;
  data_source: number;
  data_source_name: string;
  sent_to_lms: boolean;
  billing_month: string;
  revenue_source_name: string;
}

function createData(
  invoice_id: string,
  created_at: string,
  lms_state: string,
  monthly_invoice: number,
  start_date: string,
  end_date: string,
  advance_date: string,
  aggregation_number: number,
  revenue_source: string,
  type: string,
  invoice_number: string,
  customer: number,
  notional_invoice_value: string,
  haircut_percent: string,
  haircut_amount: string,
  total_advance_fee: string | number,
  expected_repayment_date: string,
  gross_invoice_value: string,
  purchase_value: string,
  daily_advance_fee: string,
  advance_duration: string,
  currency: string,
  fee_setting: string,
  advance_amount: string,
  fee_amount: string,
  invoice_month_name: string,
  invoice_year: string | number,
  InvoiceMonth_month_end: string,
  customer_name: string,
  revenue_source_master_name: string,
  data_source: number,
  data_source_name: string,
  sent_to_lms: boolean,
  billing_month: string,
  revenue_source_name: string
): Data {
  return {
    invoice_id,
    created_at,
    lms_state,
    monthly_invoice,
    start_date,
    end_date,
    advance_date,
    aggregation_number,
    revenue_source,
    type,
    invoice_number,
    customer,
    notional_invoice_value,
    haircut_percent,
    haircut_amount,
    total_advance_fee,
    expected_repayment_date,
    gross_invoice_value,
    purchase_value,
    daily_advance_fee,
    advance_duration,
    currency,
    fee_setting,
    advance_amount,
    fee_amount,
    invoice_month_name,
    invoice_year,
    InvoiceMonth_month_end,
    customer_name,
    revenue_source_master_name,
    data_source,
    data_source_name,
    sent_to_lms,
    billing_month,
    revenue_source_name
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
  { id: 'customer_name', numeric: true, disablePadding: false, label: 'CUSTOMER' },
  {
    id: 'revenue_source_master_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'LMS Date'
  },
  {
    id: 'lms_state',
    numeric: true,
    disablePadding: false,
    label: 'LMS Status'
  },
  {
    id: 'revenue_source_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE ALIAS'
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE TYPE'
  },
  {
    id: 'invoice_number',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE NUMBER'
  },
  { id: 'invoice_id', numeric: false, disablePadding: false, label: 'INVOICE ID' },
  {
    id: 'invoice_month_name',
    numeric: true,
    disablePadding: false,
    label: 'BILLING MONTH'
  },
  {
    id: 'invoice_year',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE YEAR'
  },

  // {
  //   id: 'InvoiceMonth_month_end',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'INVOICE MONTH END'
  // },
  { id: 'start_date', numeric: true, disablePadding: false, label: 'INVOICE START DATE' },
  { id: 'end_date', numeric: true, disablePadding: false, label: 'INVOICE END DATE' },
  { id: 'advance_date', numeric: true, disablePadding: false, label: 'ADVANCE DATE' },
  {
    id: 'expected_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'EXPECTED REPAYMENT DATE'
  },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },

  {
    id: 'gross_invoice_value',
    numeric: true,
    disablePadding: false,
    label: 'Gross Notional Invoice Value (Inc Tax)'
  },
  // {
  //   id: 'notional_invoice_value',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'NOTIONAL INVOICE VALUE (Exl Tax)'
  // },
  { id: 'haircut_amount', numeric: true, disablePadding: false, label: 'HAIRCUT AMOUNT' },
  { id: 'purchase_value', numeric: true, disablePadding: false, label: 'PURCHASE VALUE' },
  {
    id: 'advance_amount',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE AMOUNT'
  },

  // {
  //   id: 'fee_amount',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'FEE AMOUNT'
  // },
  // { id: 'haircut_percent', numeric: true, disablePadding: false, label: 'HAIRCUT (%)' },
  // { id: 'daily_advance_fee', numeric: true, disablePadding: false, label: 'DAILY ADVANCE FEE (%)' },
  // {
  //   id: 'advance_duration',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'ADVANCE DURATION (DAYS)'
  // },
  { id: 'total_advance_fee', numeric: true, disablePadding: false, label: 'FEE AMOUNT' },
  // {
  //   id: 'fee_setting',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'FEE TYPE'
  // },
  // { id: 'sent_to_lms', numeric: true, disablePadding: false, label: 'SENT TO LMS' },
  // { id: 'billing_month', numeric: true, disablePadding: false, label: 'BILLING MONTH' },

  { id: 'monthly_invoice', numeric: true, disablePadding: false, label: 'MONTHLY INVOICE' }
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
  lmsInvoiceHistory: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
}

const NotionalInvoiceTableSection: React.FC<IProps> = ({
  lmsInvoiceHistory,
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

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.invoice_id,
              data.created_at,
              data.lms_state,
              data.monthly_invoice,
              data.start_date,
              data.end_date,
              data.advance_date,
              data.aggregation_number,
              data.revenue_source,
              data.type,
              data.invoice_number,
              data.customer,
              data.notional_invoice_value,
              data.haircut_percent,
              data.haircut_amount,
              data.total_advance_fee,
              data.expected_repayment_date,
              data.gross_invoice_value,
              data.purchase_value,
              data.daily_advance_fee,
              data.advance_duration,
              data.currency,
              data.fee_setting,
              data.advance_amount,
              data.fee_amount,
              data.invoice_month_name,
              data.invoice_year,
              data.InvoiceMonth_month_end,
              data.customer_name,
              data.revenue_source_master_name,
              data.data_source,
              data.data_source_name,
              data.sent_to_lms,
              data.billing_month,
              data.revenue_source_master_name
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (lmsInvoiceHistory?.status === 'success') {
      generateTableData(lmsInvoiceHistory.data.results);
    }
  }, [lmsInvoiceHistory]);

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
                        {row.customer_name ? row.customer_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_master_name ? row.revenue_source_master_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.created_at ? moment(row.created_at).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.lms_state ? row.lms_state : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_name ? row.revenue_source_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.type ? row.type : '-'}
                        {/* {row.type === null
                          ? '-'
                          : row.type === 'Transactional'
                          ? 'Transactional'
                          : 'Factor'} */}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_number ? row.invoice_number : '-'}
                      </TableCell>
                      {/* <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.revenue_source ? row.revenue_source : '-'}
                      </TableCell> */}
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.invoice_id ? row.invoice_id : '-'}
                      </TableCell>
                      {/* <TableCell align='center' className='padd_lft_align'>
                        {row.aggregation_number ? row.aggregation_number : '-'}
                      </TableCell> */}
                      <TableCell align='center'>
                        {row.invoice_month_name ? row.invoice_month_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_year ? row.invoice_year : '-'}
                      </TableCell>

                      {/* <TableCell align='center'>
                        {row.InvoiceMonth_month_end ? row.InvoiceMonth_month_end : '-'}
                      </TableCell> */}
                      <TableCell align='center'>
                        {row.start_date ? moment(row.start_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.end_date ? moment(row.end_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.advance_date ? moment(row.advance_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.expected_repayment_date
                          ? moment(row.expected_repayment_date).format('DD/MM/YYYY')
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>

                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_invoice_value ? Number(row.gross_invoice_value).toFixed(2) : '-'}
                      </TableCell>
                      {/* <TableCell align='center' className='padd_lft_align'>
                        {row.notional_invoice_value
                          ? Number(row.notional_invoice_value).toFixed(2)
                          : '-'}
                      </TableCell> */}
                      <TableCell align='center' className='padd_lft_align'>
                        {row.haircut_amount ? Number(row.haircut_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.purchase_value ? Number(row.purchase_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_amount ? Number(row.advance_amount).toFixed(2) : '-'}
                      </TableCell>

                      {/* <TableCell align='center' className='padd_lft_align'>
                        {row.fee_amount ? Number(row.fee_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                       
                        {row.haircut_percent ? `${Number(row.haircut_percent).toFixed(2)}%` : '-'}
                      </TableCell>

                      <TableCell align='center' className='padd_lft_align'>
                      
                        {row.daily_advance_fee
                          ? `${Number(row.daily_advance_fee).toFixed(2)}%`
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_duration ? Number(row.advance_duration).toFixed(2) : '-'}
                      </TableCell> */}
                      <TableCell align='center' className='padd_lft_align'>
                        {row.total_advance_fee ? Number(row.total_advance_fee).toFixed(2) : '-'}
                      </TableCell>
                      {/* <TableCell align='center'>
                        {row.fee_setting ? row.fee_setting : '-'}
                      </TableCell>
                      
                      <TableCell align='center'>
                        {row.sent_to_lms !== '' ? `${row.sent_to_lms}` : '-'}
                      </TableCell> */}
                      {/* <TableCell align='center'>
                        {row.billing_month ? `${Number(row.billing_month).toFixed(2)}%` : '-'}
                      </TableCell> */}
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.monthly_invoice ? row.monthly_invoice : '-'}
                      </TableCell>

                      {/* <TableCell align='center'>{row.fee_setting ? row.fee_setting : '-'}</TableCell> */}
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {lmsInvoiceHistory?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={lmsInvoiceHistory?.data?.count}
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

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(NotionalInvoiceTableSection);
