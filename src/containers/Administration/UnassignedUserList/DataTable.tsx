/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import { StyledTableWrap } from './Styled';
import { Data } from './Constant';

function createData(data: Data) {
  const {
    company_name,
    country_code,
    website,
    sector,
    business_type,
    trading_duration,
    reg_number,
    employees,
    turnover,
    funding_needs,
    revenue_sources,
    action,
    user
  } = data;
  return {
    onboarded_at: user?.onboarded_at,
    first_name: `${user?.first_name} ${user?.last_name}`,
    email: user?.email,
    phone: user?.phone,
    company_name,
    country_code,
    website,
    sector,
    business_type,
    trading_duration,
    reg_number,
    employees,
    turnover,
    funding_needs,
    revenue_sources,
    action
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
  { id: 'onboarded_at', numeric: true, disablePadding: false, label: 'CREATED DATE' },
  { id: 'first_name', numeric: true, disablePadding: false, label: 'FULL NAME' },
  { id: 'email', numeric: true, disablePadding: false, label: 'EMAIL' },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'PHONE'
  },
  { id: 'company_name', numeric: true, disablePadding: false, label: 'COMPANY' },
  { id: 'country_code', numeric: true, disablePadding: false, label: 'COUNTRY' },
  { id: 'website', numeric: false, disablePadding: false, label: 'WEBSITE' },
  {
    id: 'sector',
    numeric: true,
    disablePadding: false,
    label: 'SECTOR'
  },
  { id: 'business_type', numeric: true, disablePadding: false, label: 'TYPE' },
  {
    id: 'trading_duration',
    numeric: false,
    disablePadding: false,
    label: 'TRADING TIME'
  },
  {
    id: 'reg_number',
    numeric: false,
    disablePadding: false,
    label: 'COMPANY NB'
  },
  {
    id: 'employees',
    numeric: false,
    disablePadding: false,
    label: 'NB EMPLOYEES'
  },
  {
    id: 'turnover',
    numeric: false,
    disablePadding: false,
    label: 'TURNOVER / MONTH'
  },
  {
    id: 'funding_needs',
    numeric: false,
    disablePadding: false,
    label: 'FUNDING NEEDS / MONTH'
  },
  { id: 'revenue_sources', numeric: false, disablePadding: false, label: 'REVENUE SOURCES' },
  { id: 'action', numeric: false, disablePadding: false, label: 'ACTION' }
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
    <>
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
    </>
  );
}

// Props Interface
interface IProps {
  dispatch: Function;
  userList: {
    data: any;
    status: string;
  };
  checklist: {
    data: any;
    status: string;
  };
}

const DataTableSection: React.FC<IProps> = ({ dispatch, userList, checklist }: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const page = 1;
  useEffect(() => {
    dispatch({
      type: 'USER_LIST',
      payload: {
        page
      }
    });
    dispatch({
      type: 'CHECK_LIST'
    });
  }, [dispatch]);

  useEffect(() => {
    let newArray: any = [];
    const generateTableData = (list: any) => {
      if (list && list?.length) {
        list.forEach((data: any) => {
          if (!data?.user?.has_customer) {
            newArray = [...newArray, createData(data)];
          }
        });
      }
      setRows(newArray);
    };
    if (checklist?.data?.status === 'success') {
      generateTableData(checklist?.data?.data?.results);
    }
  }, [checklist]);
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
              {rows?.length
                ? rows.map((row) => (
                    <TableRow hover tabIndex={-1} key={row}>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.onboarded_at ? row.onboarded_at.slice(0, 10) : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.first_name ? row.first_name : '-'}</TableCell>
                      <TableCell align='center'>{row.email ? row.email : '-'}</TableCell>
                      <TableCell align='center'>{row.phone ? row.phone : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.company_name ? row.company_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.country_code ? row.country_code : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.website ? row.website : '-'}</TableCell>
                      <TableCell align='center'>{row.sector ? row.sector : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.business_type ? row.business_type : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.trading_duration ? row.trading_duration : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.reg_number ? row.reg_number : '-'}</TableCell>
                      <TableCell align='center'>{row.employees ? row.employees : '-'}</TableCell>
                      <TableCell align='center'>{row.turnover ? row.turnover : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.funding_needs ? row.funding_needs : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row?.revenue_sources?.length > 1
                          ? row.revenue_sources.map((item: any) => (
                            <div>
                              {item.name}
                              -
                              {item.currency ? item.currency : ' '}
                            </div>
                          ))
                          : '-'}
                        {console.log('rs--', row?.revenue_sources?.length)}
                      </TableCell>
                      <TableCell align='center'>{row.action ? '-' : '-'}</TableCell>
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
