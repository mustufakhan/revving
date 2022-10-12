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
  amount: string;
  event_date: string;
  revenue_source: number;
  revenue_source_name: string;
  payor_name: string;
  payment_reference: number;
  currency: string;
  transaction_id: string;
  monthly_invoice_id: number;
  document_number: string | number;
  revving_customer_name: string;
  type: string;
  payment_id: string | number;
  transaction_type: string | number;
  collection_reference: string | number;
  sales_tax: string | number;
  is_recovery: any;
}

function createData(
  data_source: number,
  amount: string,
  event_date: string,
  revenue_source: number,
  revenue_source_name: string,
  payor_name: string,
  payment_reference: number,
  currency: string,
  transaction_id: string,
  monthly_invoice_id: number,
  document_number: string | number,
  revving_customer_name: string,
  type: string,
  payment_id: string | number,
  transaction_type: string | number,
  collection_reference: string | number,
  sales_tax: string | number,
  is_recovery: string
): Data {
  return {
    data_source,
    amount,
    event_date,
    revenue_source,
    revenue_source_name,
    payor_name,
    payment_reference,
    currency,
    transaction_id,
    monthly_invoice_id,
    document_number,
    revving_customer_name,
    type,
    payment_id,
    transaction_type,
    collection_reference,
    sales_tax,
    is_recovery
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
  { id: 'event_date', numeric: true, disablePadding: false, label: 'EVENT DATE' },
  { id: 'type', numeric: true, disablePadding: false, label: 'TYPE' },
  { id: 'revving_customer_name', numeric: true, disablePadding: false, label: 'CUSTOMER' },
  {
    id: 'revenue_source_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE NAME'
  },
  { id: 'payor_name', numeric: false, disablePadding: false, label: 'PAYOR NAME' },
  { id: 'document_number', numeric: true, disablePadding: false, label: 'DOCUMENT NUMBER' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'AMOUNT' },
  { id: 'payment_id', numeric: true, disablePadding: false, label: 'PAYMENT ID' },
  { id: 'payment_reference', numeric: true, disablePadding: false, label: 'PAYMENT REFERENCE' },
  {
    id: 'collection_reference',
    numeric: false,
    disablePadding: false,
    label: 'COLLECTION REFERENCE'
  },
  { id: 'transaction_id', numeric: false, disablePadding: false, label: 'TRANSACTION ID' },
  { id: 'monthly_invoice_id', numeric: true, disablePadding: false, label: 'MONTHLY ID' },
  { id: 'is_recovery', numeric: false, disablePadding: false, label: 'REPAYMENT STATUS' }
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
  adminTransactionLeger: {
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
  adminTransactionLeger,
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
              data.amount,
              data.event_date,
              data.revenue_source,
              data.revenue_source_name,
              data.payor_name,
              data.payment_reference,
              data.currency,
              data.transaction_id,
              data.monthly_invoice_id,
              data.document_number,
              data.revving_customer_name,
              data.type,
              data.payment_id,
              data.transaction_type,
              data.collection_reference,
              data.sales_tax,
              data.is_recovery
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (adminTransactionLeger?.status === 'success') {
      generateTableData(adminTransactionLeger.data.results);
    }
  }, [adminTransactionLeger]);

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
                        {moment(row.event_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>{row.type ? row.type : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.revving_customer_name ? row.revving_customer_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_name ? row.revenue_source_name : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.payor_name ? row.payor_name : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.document_number ? row.document_number : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                        className='padd_lft_align'
                      >
                        {row.amount ? Number(row.amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.payment_id ? row.payment_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.payment_reference ? row.payment_reference : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.collection_reference ? row.collection_reference : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.transaction_id ? row.transaction_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.monthly_invoice_id ? row.monthly_invoice_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.is_recovery === 'True'
                          ? 'Recovery'
                          : row.is_recovery === 'False'
                          ? 'Normal'
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {adminTransactionLeger?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={adminTransactionLeger?.data?.count}
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

export default connect(mapStateToProps)(DataTableSection);
