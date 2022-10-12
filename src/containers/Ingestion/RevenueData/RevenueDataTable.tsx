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
  data_source_name: string;
  date: string;
  external_id: number;
  sale_units: string;
  adjusted_revenue: string;
  revenue_source: number;
  revenue_source_name: string;
  invoide_id: number;
  transaction_currency: string;
  transaction_id: string;
  customer_name: string;
  gross_revenue: string | number;
  revenue_source_master_name: string;
}

function createData(
  data_source: number,
  data_source_name: string,
  date: string,
  external_id: number,
  sale_units: string,
  adjusted_revenue: string,
  revenue_source: number,
  revenue_source_name: string,
  invoide_id: number,
  transaction_currency: string,
  transaction_id: string,
  customer_name: string,
  gross_revenue: string | number,
  revenue_source_master_name: string
): Data {
  return {
    data_source,
    data_source_name,
    date,
    external_id,
    sale_units,
    adjusted_revenue,
    revenue_source,
    revenue_source_name,
    invoide_id,
    transaction_currency,
    transaction_id,
    customer_name,
    gross_revenue,
    revenue_source_master_name
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
  { id: 'date', numeric: true, disablePadding: false, label: 'TRANSACTION DATE' },
  { id: 'external_id', numeric: true, disablePadding: false, label: 'External ID' },
  { id: 'data_source_name', numeric: false, disablePadding: false, label: 'DATA SOURCE NAME' },
  {
    id: 'revenue_source_master_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE NAME'
  },
  {
    id: 'revenue_source_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE ALIAS NAME'
  },
  { id: 'sale_units', numeric: true, disablePadding: false, label: 'Sale Units' },
  { id: 'transaction_currency', numeric: true, disablePadding: false, label: 'CURRENCY' },
  { id: 'gross_revenue', numeric: true, disablePadding: false, label: 'Input Revenue' },
  { id: 'adjusted_revenue', numeric: true, disablePadding: false, label: 'Adjusted Revenue' },
  { id: 'invoide_id', numeric: true, disablePadding: false, label: 'Invoice ID' }
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
  revenueDataList: {
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
  revenueDataList,
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
              data.data_source_name,
              data.date,
              data.external_id,
              data.sale_units,
              data.adjusted_revenue,
              data.revenue_source,
              data.revenue_source_name,
              data.invoide_id,
              data.transaction_currency,
              data.transaction_id,
              data.customer_name,
              data.gross_revenue,
              data.revenue_source_master_name
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (revenueDataList?.status === 'success') {
      generateTableData(revenueDataList.data.results);
    }
  }, [revenueDataList]);

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
                      <TableCell align='center'>{moment(row.date).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align='center'>
                        {row.external_id ? row.external_id : '-'}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.data_source_name}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_master_name ? row.revenue_source_master_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_name ? row.revenue_source_name : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.sale_units ? Number(row.sale_units).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.transaction_currency ? row.transaction_currency : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_revenue ? Number(row.gross_revenue).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.adjusted_revenue ? Number(row.adjusted_revenue).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.invoide_id ? row.invoide_id : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {revenueDataList?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={revenueDataList?.data?.count}
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
