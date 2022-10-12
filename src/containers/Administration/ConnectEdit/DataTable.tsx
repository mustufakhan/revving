/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { StyledTableWrap, StyledFormControlTable } from './Styled';

interface Data {
  phone: string;
  monthly_invoice: number;
  start_date: string;
  end_date: string;
  advance_date: string;
  approved: Boolean;
  is_owner: Boolean;
  notional_invoice_value: string;
  haircut_percent: string;
  haircut_amount: string;
  advance_fee: string;
  daily_advance_fee: string;
  expected_repayment_date: string;
  gross_revenue: string;
  advance_duration: string;
  currency: string;
  fee_setting: string;
  advance_amount: string;
  fee_amount: string;
  InvoiceMonth_month: number;
  InvoiceMonth_year: number;
  InvoiceMonth_month_end: string;
  customer: string;
  data_source: number;
  data_source_name: string;
  sent_to_aptic: boolean;
  eligible: Boolean;
}

function createData(
  phone: string,
  monthly_invoice: number,
  start_date: string,
  end_date: string,
  advance_date: string,
  approved: Boolean,
  is_owner: Boolean,
  notional_invoice_value: string,
  haircut_percent: string,
  haircut_amount: string,
  advance_fee: string,
  expected_repayment_date: string,
  gross_revenue: string,
  daily_advance_fee: string,
  advance_duration: string,
  currency: string,
  fee_setting: string,
  advance_amount: string,
  fee_amount: string,
  InvoiceMonth_month: number,
  InvoiceMonth_year: number,
  InvoiceMonth_month_end: string,
  customer: string,
  data_source: number,
  data_source_name: string,
  sent_to_aptic: boolean,
  eligible: Boolean
): Data {
  return {
    phone,
    monthly_invoice,
    start_date,
    end_date,
    advance_date,
    approved,
    is_owner,
    notional_invoice_value,
    haircut_percent,
    haircut_amount,
    advance_fee,
    expected_repayment_date,
    gross_revenue,
    daily_advance_fee,
    advance_duration,
    currency,
    fee_setting,
    advance_amount,
    fee_amount,
    InvoiceMonth_month,
    InvoiceMonth_year,
    InvoiceMonth_month_end,
    customer,
    data_source,
    data_source_name,
    sent_to_aptic,
    eligible
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
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER'
  },
  {
    id: 'eligible',
    numeric: true,
    disablePadding: false,
    label: 'ELIGIBLE'
  },
  {
    id: 'is_owner',
    numeric: true,
    disablePadding: false,
    label: 'OWNER'
  },
  { id: 'phone', numeric: false, disablePadding: false, label: 'PHONE' },
  { id: 'approved', numeric: true, disablePadding: false, label: 'APPROVED' },
  { id: 'customer', numeric: true, disablePadding: false, label: 'CUSTOMER SELECT' },
  { id: 'approved', numeric: true, disablePadding: false, label: 'ACTION' }
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
  userList: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  customerData: any;
}

const DataTable: React.FC<IProps> = ({
  userList,
  dispatch,
  updateList,
  rowsPerPage,
  page,
  customerData,
  handleSortData,
  handlePaginationAndUpdateList
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [customerValue, setCustomer] = React.useState<string>('');
  const [index, setIndex] = React.useState<any>('');

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.phone,
              data.monthly_invoice,
              data.start_date,
              data.end_date,
              data.advance_date,
              data.approved,
              data.is_owner,
              data.notional_invoice_value,
              data.haircut_percent,
              data.haircut_amount,
              data.advance_fee,
              data.expected_repayment_date,
              data.gross_revenue,
              data.daily_advance_fee,
              data.advance_duration,
              data.currency,
              data.fee_setting,
              data.advance_amount,
              data.fee_amount,
              data.InvoiceMonth_month,
              data.InvoiceMonth_year,
              data.InvoiceMonth_month_end,
              data.customer,
              data.data_source,
              data.data_source_name,
              data.sent_to_aptic,
              data.eligible
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (userList?.status === 'success') {
      generateTableData(userList.data.results);
    }
  }, [userList]);

  const handleApproveButton = (row: any, i: any) => {};

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

  // Handle Customer
  const handleChangeCustomer = (event: React.ChangeEvent<{ value: unknown }>, i: number) => {
    setCustomer(event.target.value as string);
    setIndex(i);
  };

  return (
    <>
      <StyledTableWrap>
        <TableContainer>
          <Table
            stickyHeader
            className=''
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows.length
                ? rows.map((row, i) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell align='center'>{row.customer ? row.customer : '-'}</TableCell>
                      <TableCell align='center'>{row.eligible ? 'true' : 'false'}</TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.is_owner ? 'true' : 'false'}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.phone ? row.phone : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.approved ? 'true' : 'false'}</TableCell>
                      <TableCell align='center'>
                        <StyledFormControlTable variant='outlined'>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            value={i === index ? customerValue : ''}
                            onChange={(e) => handleChangeCustomer(e, i)}
                          >
                            {customerData?.status === 'success' &&
                              customerData.data &&
                              customerData.data?.results.length &&
                              customerData.data?.results.map((data: any) => (
                                <MenuItem key={data.cuid} value={data.name}>
                                  {data.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </StyledFormControlTable>
                      </TableCell>
                      <TableCell align='center'>
                        {index === i ? (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleApproveButton(row, i)}
                          >
                            Aprrove
                          </Button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {userList?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={userList?.data?.count}
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

export default connect(mapStateToProps)(DataTable);
