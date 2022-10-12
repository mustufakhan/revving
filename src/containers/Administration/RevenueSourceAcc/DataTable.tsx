/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { useSnackbar } from 'notistack';
import { StyledTableWrap, StyledFormControlTable } from './Styled';

interface Data {
  id: string;
  monthly_invoice: number;
  start_date: string;
  end_date: string;
  advance_date: string;
  approved: Boolean;
  master_name: Boolean;
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
  name: string;
  data_source: number;
  data_source_name: string;
  sent_to_aptic: boolean;
  reference_number: Boolean;
}

function createData(
  id: string,
  monthly_invoice: number,
  start_date: string,
  end_date: string,
  advance_date: string,
  approved: Boolean,
  master_name: Boolean,
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
  name: string,
  data_source: number,
  data_source_name: string,
  sent_to_aptic: boolean,
  reference_number: Boolean
): Data {
  return {
    id,
    monthly_invoice,
    start_date,
    end_date,
    advance_date,
    approved,
    master_name,
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
    name,
    data_source,
    data_source_name,
    sent_to_aptic,
    reference_number
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
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'NAME'
  },
  {
    id: 'reference_number',
    numeric: true,
    disablePadding: false,
    label: 'REFRENCE NUMBER'
  },
  {
    id: 'master_name',
    numeric: true,
    disablePadding: false,
    label: 'MASTER NAME'
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
  revenueSourceAcc: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  revenueSourceMasterList: {
    option: any;
    data: [
      {
        uuid: number;
        name: string;
      }
    ];
    status: string;
    message: {
      data?: string;
    };
  };
  updateRevenueAcc: {
    data: any;
    status: string;
    message: {
      data?: string;
      code?: number;
    };
  };
  mainAPI: Function;
}

const DataTable: React.FC<IProps> = ({
  revenueSourceAcc,
  dispatch,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  updateRevenueAcc,
  revenueSourceMasterList,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [customerValue, setCustomer] = React.useState<string>('');
  const [index, setIndex] = React.useState<any>('');

  const { enqueueSnackbar } = useSnackbar();

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.id,
              data.monthly_invoice,
              data.start_date,
              data.end_date,
              data.advance_date,
              data.approved,
              data.master_name,
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
              data.name,
              data.data_source,
              data.data_source_name,
              data.sent_to_aptic,
              data.reference_number
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (revenueSourceAcc?.status === 'success') {
      generateTableData(revenueSourceAcc.data.results);
    }
  }, [revenueSourceAcc]);

  useEffect(() => {
    if (updateRevenueAcc?.status == 'success') {
      mainAPI();
    } else if (updateRevenueAcc?.status) {
      const variant = 'error';
      enqueueSnackbar('This Revenue is already selected', {
        variant
      });
    }
  }, [updateRevenueAcc, mainAPI, enqueueSnackbar]);

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
  const handleChangeCustomer = (
    event: React.ChangeEvent<{ value: unknown }>,
    i: number,
    row: any
  ) => {
    setCustomer(event.target.value as string);
    setIndex(i);
    dispatch({
      type: 'REVENUE_SOURCE_MASTER_UPDATE',
      payload: {
        id: event.target.value as string,
        mainId: row.id
      }
    });
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
                      <TableCell align='center'>{row.name ? row.name : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.reference_number ? row.reference_number : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        <StyledFormControlTable variant='outlined'>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            value={
                              i === index ? customerValue : row.master_name ? row.master_name : ''
                            }
                            onChange={(e) => handleChangeCustomer(e, i, row)}
                          >
                            {revenueSourceMasterList?.status === 'success' &&
                              revenueSourceMasterList?.data &&
                              revenueSourceMasterList?.data.length &&
                              revenueSourceMasterList.data.map((data: any) => (
                                <MenuItem key={data.uuid} value={data.id}>
                                  {data.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </StyledFormControlTable>
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {revenueSourceAcc?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={revenueSourceAcc?.data?.count}
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
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  updateRevenueAcc: state.updateRevenueAcc.data
});

export default connect(mapStateToProps)(DataTable);
