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
  data_source: number;
  advance_date: string;
  invoice_month: string;
  outstanding_amount: string | number;
  revenue_source: number;
  outgoing_payment_reference: number;
  currency: string;
  transaction_id: string;
  document_number: string | number;
  notional_invoice_id: string | number;
  customer_name: string;
  sales_tax: string | number;
  gross_value: string | number;
  revenue_source_name: string;
  status: string;
  haircut_amount: string | number;
  fee_amount: number;
  advance_amount: number;
  fee_adjustment: number;
  // fee_repayment: number;
  overall_repayment: number;
  advance_repayment: number;
  exp_repayment_date: string;
  repayment_date: string;
  days_overdue: string | number;
  fee_type: string;
  invoice_year: string;
  depreciation: string | number;
  daily_fee: string | number;
  purchase_amount: number;
  upfront_fee: string | number;
  payment_id: string | number;
  latest_collection_reference: string | number;
  latest_collection_id: string | number;
  is_recovery: any;
  monthly_invoice: string | number;
}

function createData(
  data_source: number,
  advance_date: string,
  invoice_month: string,
  outstanding_amount: string | number,
  revenue_source: number,
  outgoing_payment_reference: number,
  currency: string,
  transaction_id: string,
  document_number: string | number,
  notional_invoice_id: string | number,
  customer_name: string,
  sales_tax: string | number,
  gross_value: string | number,
  revenue_source_name: string,
  status: string,
  haircut_amount: string | number,
  fee_amount: number,
  advance_amount: number,
  fee_adjustment: number,
  // fee_repayment: number,
  overall_repayment: number,
  advance_repayment: number,
  exp_repayment_date: string,
  repayment_date: string,
  days_overdue: string | number,
  fee_type: string,
  invoice_year: string,
  depreciation: string | number,
  daily_fee: string | number,
  purchase_amount: number,
  upfront_fee: string | number,
  payment_id: string | number,
  latest_collection_reference: string | number,
  latest_collection_id: string | number,
  is_recovery: string,
  monthly_invoice: string | number
): Data {
  return {
    data_source,
    advance_date,
    invoice_month,
    outstanding_amount,
    revenue_source,
    outgoing_payment_reference,
    currency,
    transaction_id,
    document_number,
    notional_invoice_id,
    customer_name,
    sales_tax,
    gross_value,
    revenue_source_name,
    status,
    haircut_amount,
    fee_amount,
    advance_amount,
    fee_adjustment,
    // fee_repayment,
    overall_repayment,
    advance_repayment,
    exp_repayment_date,
    repayment_date,
    days_overdue,
    fee_type,
    invoice_year,
    depreciation,
    daily_fee,
    purchase_amount,
    upfront_fee,
    latest_collection_reference,
    latest_collection_id,
    payment_id,
    is_recovery,
    monthly_invoice
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
  { id: 'revenue_source_name', numeric: true, disablePadding: false, label: 'REVENUE SOURCE' },
  { id: 'invoice_month', numeric: true, disablePadding: false, label: 'BILLING MONTH' },
  { id: 'invoice_year', numeric: true, disablePadding: false, label: 'YEAR' },
  { id: 'status', numeric: true, disablePadding: false, label: 'INVOICE STATUS' },
  { id: 'is_recovery', numeric: false, disablePadding: false, label: 'REPAYMENT STATUS' },
  { id: 'advance_date', numeric: true, disablePadding: false, label: 'ADVANCE DATE' },
  { id: 'document_number', numeric: true, disablePadding: false, label: 'DOCUMENT NUMBER' },
  { id: 'notional_invoice_id', numeric: true, disablePadding: false, label: 'INVOICE ID' },
  { id: 'monthly_invoice', numeric: true, disablePadding: false, label: 'MONTHLY INVOICE ID' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  { id: 'gross_value', numeric: true, disablePadding: false, label: 'GROSS VALUE' },
  { id: 'sales_tax', numeric: true, disablePadding: false, label: 'SALES TAX' },
  { id: 'haircut_amount', numeric: true, disablePadding: false, label: 'HAIRCUT AMOUNT' },
  { id: 'purchase_amount', numeric: true, disablePadding: false, label: 'PURCHASE AMOUNT' },
  { id: 'fee_amount', numeric: true, disablePadding: false, label: 'FEE AMOUNT' },
  { id: 'advance_amount', numeric: true, disablePadding: false, label: 'ADVANCE AMOUNT' },
  { id: 'fee_adjustment', numeric: true, disablePadding: false, label: 'FEE ADJUSTMENT' },
  // { id: 'fee_repayment', numeric: true, disablePadding: false, label: 'FEE REPAYMENT' },

  // { id: 'daily_fee', numeric: true, disablePadding: false, label: 'DAILY TYPE' },
  { id: 'overall_repayment', numeric: true, disablePadding: false, label: 'ADVANCE REPAYMENT' },
  { id: 'depreciation', numeric: true, disablePadding: false, label: 'DEPRECIATION AMOUNT' },
  { id: 'outstanding_amount', numeric: true, disablePadding: false, label: 'OUTSTANDING AMOUNT' },
  {
    id: 'exp_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'EXPECTED REPAYMENT DATE'
  },
  { id: 'repayment_date', numeric: true, disablePadding: false, label: 'REPAYMENT DATE' },

  { id: 'days_overdue', numeric: true, disablePadding: false, label: 'DAYS OVERDUE' },
  { id: 'daily_fee', numeric: true, disablePadding: false, label: 'DAILY FEE' },
  { id: 'fee_type', numeric: true, disablePadding: false, label: 'FEE TYPE' },
  { id: 'outgoing_payment_reference', numeric: true, disablePadding: false, label: 'PAYMENT REF' },
  { id: 'payment_id', numeric: true, disablePadding: false, label: 'OUTGOING PAYMENT ID' },
  { id: 'latest_collection_id', numeric: true, disablePadding: false, label: 'COLLECTION ID' },
  {
    id: 'latest_collection_reference',
    numeric: true,
    disablePadding: false,
    label: 'COLLECTION REFERENCE'
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
  adminInvoiceleger: {
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

const RevenueDataTableSection: React.FC<IProps> = ({
  adminInvoiceleger,
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
              data.data_source,
              data.advance_date,
              data.invoice_month,
              data.outstanding_amount,
              data.revenue_source,
              data.outgoing_payment_reference,
              data.currency,
              data.transaction_id,
              data.document_number,
              data.notional_invoice_id,
              data.customer_name,
              data.sales_tax,
              data.gross_value,
              data.revenue_source_name,
              data.status,
              data.haircut_amount,
              data.fee_amount,
              data.advance_amount,
              data.fee_adjustment,
              // data.fee_repayment,
              data.overall_repayment,
              data.advance_repayment,
              data.exp_repayment_date,
              data.repayment_date,
              data.days_overdue,
              data.fee_type,
              data.invoice_year,
              data.depreciation,
              data.daily_fee,
              data.purchase_amount,
              data.upfront_fee,
              data.payment_id,
              data.latest_collection_reference,
              data.latest_collection_id,
              data.is_recovery,
              data.monthly_invoice
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (adminInvoiceleger?.status === 'success') {
      generateTableData(adminInvoiceleger.data.results);
    }
  }, [adminInvoiceleger]);

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
                        {row.revenue_source_name ? row.revenue_source_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_month ? row.invoice_month : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_year ? row.invoice_year : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.status ? row.status : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.is_recovery === 'True'
                          ? 'Recovery'
                          : row.is_recovery === 'False'
                          ? 'Normal'
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.advance_date).format('DD/MM/YYYY')}
                      </TableCell>

                      <TableCell align='center'>
                        {row.document_number ? row.document_number : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.notional_invoice_id ? row.notional_invoice_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.monthly_invoice ? row.monthly_invoice : '-'}
                      </TableCell>

                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_value ? Number(row.gross_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.sales_tax ? Number(row.sales_tax).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.haircut_amount ? Number(row.haircut_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.purchase_amount ? Number(row.purchase_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.fee_amount ? Number(row.fee_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_amount ? Number(row.advance_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.fee_adjustment ? Number(row.fee_adjustment).toFixed(2) : '-'}
                      </TableCell>
                      {/* <TableCell align='center' className='padd_lft_align'>
                        {row.fee_repayment ? Number(row.fee_repayment).toFixed(2) : '-'}
                      </TableCell> */}

                      <TableCell align='center' className='padd_lft_align'>
                        {row.overall_repayment ? Number(row.overall_repayment).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.depreciation ? Number(row.depreciation).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.outstanding_amount ? Number(row.outstanding_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.exp_repayment_date
                          ? moment(row.exp_repayment_date).format('DD/MM/YYYY')
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.repayment_date ? moment(row.repayment_date).format('DD/MM/YYYY') : '-'}
                      </TableCell>

                      <TableCell align='center' className='padd_lft_align'>
                        {row.days_overdue ? Number(row.days_overdue).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.daily_fee ? Number(row.daily_fee).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.fee_type ? row.fee_type : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.outgoing_payment_reference ? row.outgoing_payment_reference : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.payment_id ? row.payment_id : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.latest_collection_id ? row.latest_collection_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.latest_collection_reference ? row.latest_collection_reference : '-'}
                      </TableCell>
                      {/* <TableCell align='center'>
                        {row.is_recovery === 'True' ? 'Recovery' : row.is_recovery === 'False' ? 'Normal' : '-'}
                      </TableCell> */}
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {adminInvoiceleger?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={adminInvoiceleger?.data?.count}
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

export default connect(mapStateToProps)(RevenueDataTableSection);
