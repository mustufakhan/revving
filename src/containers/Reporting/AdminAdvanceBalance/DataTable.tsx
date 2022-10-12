/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { StyledTableWrap } from './Styled';

interface Data {
  data_source: number;
  principal_repayment: string;
  advance_salestax_repayments: string | number;
  revenue_source: number;
  currency: string;
  transaction_id: string;
  outstanding_fees: string | number;
  counterparty: string;
  outstanding_advances: string;
  revenuesource_name: string;
  advance_amount_closed: string;
  total_advances: string | number;
  overdue_advances: string | number;
  overdue_fees: string | number;
  total_repayment: string | number;
  closed_upfront_fee: string | number;
  gross_value_purchased_invoices: string | number;
  total_haircut_applied: string | number;
  gross_value_due_invoices: string | number;
  total_depreciation_fee: string | number;
  fee_generated: string | number;
  gross_value_overdue_invoices: string | number;
  total_upfront_fee: string | number;
}

function createData(
  data_source: number,
  principal_repayment: string,
  advance_salestax_repayments: string | number,
  revenue_source: number,
  currency: string,
  transaction_id: string,
  outstanding_fees: string | number,
  counterparty: string,
  outstanding_advances: string,
  revenuesource_name: string,
  advance_amount_closed: string,
  total_advances: string | number,
  overdue_advances: string | number,
  overdue_fees: string | number,
  total_repayment: string | number,
  closed_upfront_fee: string | number,
  gross_value_purchased_invoices: string | number,
  total_haircut_applied: string | number,
  gross_value_due_invoices: string | number,
  total_depreciation_fee: string | number,
  fee_generated: string | number,
  gross_value_overdue_invoices: string | number,
  total_upfront_fee: string | number
): Data {
  return {
    data_source,
    principal_repayment,
    advance_salestax_repayments,
    revenue_source,
    currency,
    transaction_id,
    outstanding_fees,
    counterparty,
    outstanding_advances,
    revenuesource_name,
    advance_amount_closed,
    total_advances,
    overdue_advances,
    overdue_fees,
    total_repayment,
    closed_upfront_fee,
    gross_value_purchased_invoices,
    total_haircut_applied,
    gross_value_due_invoices,
    total_depreciation_fee,
    fee_generated,
    gross_value_overdue_invoices,
    total_upfront_fee
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
  { id: 'counterparty', numeric: true, disablePadding: false, label: 'COUNTERPARTY' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  {
    id: 'gross_value_purchased_invoices',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE OF PURCHASED INVOICES'
  },
  { id: 'total_haircut_applied', numeric: true, disablePadding: false, label: 'HAIRCUTS APPLIED' },
  { id: 'total_advances', numeric: true, disablePadding: false, label: 'AMOUNT ADVANCED' },
  { id: 'total_upfront_fee', numeric: true, disablePadding: false, label: 'EXPECTED FEES' },
  { id: 'total_repayment', numeric: false, disablePadding: false, label: 'TOTAL REPAYMENTS' },
  {
    id: 'principal_repayment',
    numeric: false,
    disablePadding: false,
    label: 'PRINCIPAL REPAYMENTS'
  },
  { id: 'fee_generated', numeric: false, disablePadding: false, label: 'FEES  REPAID' },
  { id: 'total_depreciation_fee', numeric: true, disablePadding: false, label: 'DEPRECIATION' },
  {
    id: 'gross_value_due_invoices',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE OF DUE INVOICES'
  },
  {
    id: 'outstanding_advances',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCES DUE (inc Fees)'
  },
  {
    id: 'outstanding_fees',
    numeric: true,
    disablePadding: false,
    label: 'FEES DUE'
  },
  {
    id: 'gross_value_overdue_invoices',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE OF OVERDUE'
  },
  {
    id: 'outstanding_advances',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCES OVERDUE (inc Fees)'
  },
  { id: 'overdue_fees', numeric: false, disablePadding: false, label: 'FEES OVERDUE' }
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
  adminAdvanceBalance: {
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

const DataTableSection: React.FC<IProps> = ({
  adminAdvanceBalance,
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
              data.principal_repayment,
              data.advance_salestax_repayments,
              data.revenue_source,
              data.currency,
              data.transaction_id,
              data.outstanding_fees,
              data.counterparty,
              data.outstanding_advances,
              data.revenuesource_name,
              data.advance_amount_closed,
              data.total_advances,
              data.overdue_advances,
              data.overdue_fees,
              data.total_repayment,
              data.closed_upfront_fee,
              data.gross_value_purchased_invoices,
              data.total_haircut_applied,
              data.gross_value_due_invoices,
              data.total_depreciation_fee,
              data.fee_generated,
              data.gross_value_overdue_invoices,
              data.total_upfront_fee
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (adminAdvanceBalance?.status === 'success') {
      generateTableData(adminAdvanceBalance?.data?.results);
    }
  }, [adminAdvanceBalance]);

  function numberWithCommas(x: any) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    handleSortData(property, isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
                        {row.counterparty ? row.counterparty : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.gross_value_purchased_invoices
                          ? numberWithCommas(Number(row.gross_value_purchased_invoices).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.total_haircut_applied
                          ? numberWithCommas(Number(row.total_haircut_applied).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.total_advances
                          ? numberWithCommas(Number(row.total_advances).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {numberWithCommas(Number(row.total_upfront_fee).toFixed(2)) || '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.total_repayment
                          ? numberWithCommas(Number(row.total_repayment).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                        className='padd_lft_align'
                      >
                        {row.principal_repayment
                          ? numberWithCommas(Number(row.principal_repayment).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.fee_generated
                          ? numberWithCommas(Number(row.fee_generated).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {numberWithCommas(Number(row.total_depreciation_fee).toFixed(2)) || '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.gross_value_due_invoices
                          ? numberWithCommas(Number(row.gross_value_due_invoices).toFixed(2))
                          : ' - '}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.outstanding_advances
                          ? numberWithCommas(Number(row.outstanding_advances).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.outstanding_fees
                          ? numberWithCommas(Number(row.outstanding_fees).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {numberWithCommas(Number(row.gross_value_overdue_invoices).toFixed(2)) ||
                          '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.overdue_advances
                          ? numberWithCommas(Number(row.overdue_advances).toFixed(2))
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.overdue_fees
                          ? numberWithCommas(Number(row.overdue_fees).toFixed(2))
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(DataTableSection);
