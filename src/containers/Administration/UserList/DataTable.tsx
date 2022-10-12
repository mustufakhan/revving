/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-var */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';
import { StyledTableWrap } from './Styled';
import { Data, IProps } from './UserListConstants';

function createData(data: Data) {
  const {
    phone,
    monthly_invoice,
    start_date,
    end_date,
    advance_date,
    onboarded_at,
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
    action,
    data_source,
    data_source_name,
    sent_to_aptic,
    first_name,
    last_name,
    username,
    fullname,
    email,
    cust_id,
    pk,
    customer,
    status,
    customer_name
  } = data;
  return {
    phone,
    monthly_invoice,
    start_date,
    end_date,
    advance_date,
    onboarded_at,
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
    action,
    data_source,
    data_source_name,
    sent_to_aptic,
    first_name,
    last_name,
    username,
    fullname,
    email,
    cust_id,
    pk,
    customer,
    status,
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
  {
    id: 'customer_name',
    numeric: true,
    disablePadding: false,
    label: 'Customer'
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'fullname',
    numeric: true,
    disablePadding: false,
    label: 'Full Name'
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'EMAIL'
  },
  { id: 'phone', numeric: false, disablePadding: false, label: 'PHONE' },
  { id: 'onboarded_at', numeric: false, disablePadding: false, label: 'ONBOARDED AT' },
  { id: 'action', numeric: true, disablePadding: false, label: 'ACTION' }
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
// interface IProps {
//   userList: {
//     data: any;
//     status: string;
//   };
//   UserList: {
//     data: any;
//     status: string;
//   };
//   dispatch: Function;
//   handleSortData: Function;
//   handlePaginationAndUpdateList: Function;
//   page: number;
//   rowsPerPage: number;
// }

const DataTable: React.FC<IProps> = ({
  userList,
  dispatch,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [index1, setIndex1] = React.useState<any>('');
  const [index4, setIndex4] = React.useState<any>('');
  const [index5, setIndex5] = React.useState<any>('');
  const [phoneNum, setPhone] = React.useState<string>('');
  const [emailTxt, setemailTxt] = React.useState<string>('');
  const [fullName, setfullName] = React.useState<string>('');

  useEffect(() => {
    dispatch({
      type: 'GET_USERS_LIST',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy: 'name'
      }
    });
  }, [dispatch]);

  console.log('rowsdata', rows);
  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [...newArray, createData(data)];
          return '';
        });
      }
      setRows(newArray);
    };
    if (userList?.status === 'success') {
      generateTableData(userList?.data?.results);
    }
  }, [userList]);

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

  const handlePhone = (event: React.ChangeEvent<{ value: unknown }>, i: number) => {
    setPhone(event.target.value as string);
    setIndex1(i);
  };

  const handleemail = (event: React.ChangeEvent<{ value: unknown }>, i: number) => {
    setemailTxt(event.target.value as string);
    setIndex4(i);
  };

  const handlename = (event: React.ChangeEvent<{ value: unknown }>, i: number) => {
    setfullName(event.target.value as string);
    setIndex5(i);
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
              {rows?.length > 0
                ? rows?.map((row, i) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell align='center'>{row.customer_name || '-'}</TableCell>
                      <TableCell>{row.status || '-'}</TableCell>
                      <TableCell align='center'>
                        <input
                          value={i === index5 ? fullName : `${row.first_name}  ${row.last_name}`}
                          type='text'
                          style={{
                            backgroundColor: 'white',
                            border: '2px solid rgb(238,238,238)',
                            padding: '2px',
                            height: '2rem'
                          }}
                          onChange={(e) => handlename(e, i)}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <input
                          value={i === index4 ? emailTxt : row.email}
                          type='text'
                          style={{
                            backgroundColor: 'white',
                            border: '2px solid rgb(238,238,238)',
                            padding: '2px',
                            height: '2rem'
                          }}
                          onChange={(e) => handleemail(e, i)}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <input
                          value={i === index1 ? phoneNum : row.phone}
                          type='text'
                          style={{
                            backgroundColor: 'white',
                            border: '2px solid rgb(238,238,238)',
                            padding: '2px',
                            height: '2rem'
                          }}
                          onChange={(e) => handlePhone(e, i)}
                        />
                      </TableCell>

                      <TableCell align='center'>
                        {row.onboarded_at ? row.onboarded_at : '-'}
                      </TableCell>
                      <TableCell align='center'>-</TableCell>
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

const mapStateToProps = (state: any) => ({
  userListAdd: state.userListAdd.data,
  UserList: state.UserList.data
});

export default connect(mapStateToProps)(DataTable);
