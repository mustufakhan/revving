/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { ChangeEvent, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
// import { useSnackbar } from 'notistack';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { StyledTableWrap, StyledFormControl } from './Styled';

interface Data {
  duration: string;
  status: Boolean;
  revenue: Boolean;
  currency: string;
  name: string;
  request: string | number;
  uuid: string | number;
  customer_name: string;
  user: string;
  revenue_source_name: string;
  current_state: string;
  revenue_source: number | string;
}

function createData(
  duration: string,
  status: Boolean,
  revenue: Boolean,
  currency: string,
  name: string,
  request: string | number,
  uuid: string | number,
  customer_name: string,
  user: string,
  revenue_source_name: string,
  current_state: string,
  revenue_source: number | string
): Data {
  return {
    duration,
    status,
    revenue,
    currency,
    name,
    request,
    uuid,
    customer_name,
    user,
    revenue_source_name,
    current_state,
    revenue_source
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
    numeric: false,
    disablePadding: false,
    label: 'CUSTOMER NAME'
  },

  {
    id: 'user',
    numeric: false,
    disablePadding: false,
    label: 'USER'
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'REVENUE SOURCE ALIAS' },
  {
    id: 'revenue_source_name',
    numeric: false,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  {
    id: 'currency',
    numeric: false,
    disablePadding: false,
    label: 'REVENUE CURRENCY'
  },

  // { id: 'duration', numeric: false, disablePadding: false, label: 'DURATION' },
  { id: 'current_state', numeric: false, disablePadding: false, label: 'CURRENT STATUS' },
  { id: 'request', numeric: false, disablePadding: false, label: 'OUTSTANDING REQUEST' },
  { id: 'status', numeric: false, disablePadding: false, label: 'ACTION' }
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
  accountEdit: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  dispatch: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  customerData: any;
  accountingStatusEdit: {
    data: any;
    status: string;
  };
  // revenueSourceList: any;
  revenueSourceConnectFalse: any;
  mainAPI: Function;
  customerValue: number | string;
}

const DataTable: React.FC<IProps> = ({
  accountEdit,
  dispatch,
  rowsPerPage,
  page,
  customerData,
  // revenueSourceList,
  revenueSourceConnectFalse,
  handleSortData,
  handlePaginationAndUpdateList,
  accountingStatusEdit,
  mainAPI,
  customerValue
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [revenueSource, setRevenueSource] = useState('');
  const [index, setIndex] = React.useState<any>('');
  const [submitIndex, setsubmitIndex] = React.useState<any>('');
  const [selectValue, setselectValue] = useState<any>('');
  // const [drpOpen, setDrpOpen] = useState<boolean>(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  // const [submitBtn, setsubmitBtn] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (accountingStatusEdit?.status == 'success') {
      mainAPI();
    }
  }, [accountingStatusEdit, mainAPI]);

  // useEffect(() => {
  //     dispatch({
  //       type: 'REVENUE_SOURCE_LIST'
  //     });
  // }, [dispatch]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.duration,
              data.status,
              data.revenue,
              data.currency,
              data.name,
              data.request,
              data.uuid,
              data.customer_name,
              data.user,
              data.revenue_source_name,
              data.current_state,
              data.revenue_source
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (accountEdit?.status === 'success') {
      generateTableData(accountEdit.data.results);
    }
  }, [accountEdit]);

  const handleApproveButton = (row: any, i: any) => {
    dispatch({
      type: 'ACCOUNTING_STATUS_EDIT',
      payload: {
        id: row.uuid,
        status: 'approved',
        // current_state: row.current_state,
        revenue_source: parseInt(revenueSource, 10)
      }
    });
  };

  const handleDenyButton = (row: any, i: any) => {
    dispatch({
      type: 'ACCOUNTING_STATUS_EDIT',
      payload: {
        id: row.uuid,
        status: 'deny',
        current_state: row.current_state,
        revenue_source: revenueSourceConnectFalse?.data?.results?.filter(
          (item: any) => item.name == row.revenue_source_name
        ).pk
      }
    });
  };

  const handleSubmitButton = (row: any, i: any) => {
    dispatch({
      type: 'ACCOUNTING_STATUS_EDIT',
      payload: {
        id: row.uuid,
        current_state: selectValue,
        revenue_source: revenueSourceConnectFalse?.data?.results?.filter(
          (item: any) => item.name == row.revenue_source_name
        ).pk
      }
    });
  };

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

  const handleRevenueSource = (event: ChangeEvent<{ value: unknown }>, i: number, row: any) => {
    setRevenueSource(event.target.value as string);
    console.log(event.target.value, 'event.target.value');
    setIndex(i);
    dispatch({
      type: 'ACCOUNTING_STATUS_EDIT',
      payload: {
        id: row.uuid,
        revenue_source: event.target.value
      }
    });
  };

  const handleSubmitBtn = (event: ChangeEvent<{ value: unknown }>, i: number) => {
    // setsubmitBtn('slect_btn show_btn');
    setselectValue(event.target.value as string);
    setsubmitIndex(i);
  };

  const handleDropDownOpen = () => {
    console.log('aaaaa');
    dispatch({
      type: 'REVENUE_SOURCE_CONNECT_FALSE',
      payload: {
        page: 1,
        rowsPerPage: 100,
        customer: customerValue
      }
    });
  };

  // const handledrpClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setDrpOpen(true);
  //   setAnchorEl(event.currentTarget);
  // };
  // const handledrpClose = (e: any) => {
  //   console.log(e, 'event');

  //   setAnchorEl(null);
  //   setRevenueSource('');
  // };

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
                ? rows.map((row, i) => {
                    const x = revenueSourceConnectFalse?.data?.results
                      ?.filter(
                        (item: any) =>
                          item?.name?.toUpperCase() == row?.revenue_source_name?.toUpperCase()
                      )[0]
                      ?.pk?.toString();
                    return (
                      <TableRow hover tabIndex={-1} key={row.message_id}>
                        <TableCell align='center'>
                          {row.customer_name ? row.customer_name : '-'}
                        </TableCell>
                        <TableCell align='center'>{row.user ? row.user : '-'}</TableCell>
                        <TableCell align='center'>{row.name ? row.name : '-'}</TableCell>
                        <TableCell align='center'>
                          <StyledFormControl variant='outlined'>
                            {revenueSourceConnectFalse?.data?.results.length > 0 ? (
                              <Select
                                className='revenue_drp'
                                labelId='demo-simple-select-outlined-label'
                                id='demo-simple-select-outlined'
                                disabled={row.current_state === 'activate_advances' ? true : false}
                                value={
                                  i === index
                                    ? revenueSource
                                    : row.revenue_source_name
                                    ? x
                                      ? x
                                      : row.revenue_source_name
                                    : ''
                                }
                                // value={i === index ? revenueSource : row.revenue_source_name}
                                onOpen={handleDropDownOpen}
                                onChange={(e) => handleRevenueSource(e, i, row)}
                              >
                                {!x && row?.revenue_source_name && (
                                  <MenuItem key='apple' value={row.revenue_source_name}>
                                    {row.revenue_source_name}
                                  </MenuItem>
                                )}
                                {revenueSourceConnectFalse?.status === 'success' &&
                                  revenueSourceConnectFalse?.data &&
                                  revenueSourceConnectFalse?.data?.results.length &&
                                  revenueSourceConnectFalse.data?.results.map((data: any) => (
                                    <MenuItem key={data.pk} value={data.pk?.toString()}>
                                      {data.name}
                                      &nbsp;-&nbsp;
                                      {data.currency}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : (
                              '-'
                            )}
                          </StyledFormControl>
                        </TableCell>
                        <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>

                        {/* <TableCell align='center' component='th' id='row-name' scope='row'>
                        {row.duration ? row.duration : '-'}
                      </TableCell> */}
                        <TableCell align='center'>
                          {row.current_state === 'activate_advances'
                            ? 'Active'
                            : row.current_state === 'pause_advances'
                            ? 'Paused'
                            : row.current_state === 'delete'
                            ? 'Removed'
                            : row.current_state === 'pending'
                            ? 'Pending'
                            : '-'}
                        </TableCell>

                        <TableCell align='center'>
                          {row.request === 'activate_advances'
                            ? 'Activate'
                            : row.request === 'pause_advances'
                            ? 'Pause'
                            : row.request === 'delete'
                            ? 'Remove'
                            : row.request === 'create'
                            ? 'Create'
                            : '-'}
                        </TableCell>
                        <TableCell align='center'>
                          {(row.current_state === 'activate_advances' &&
                            row.request === 'pause_advances') ||
                          (row.current_state === 'pause_advances' &&
                            row.request === 'activate_advances') ||
                          (row.current_state === 'pending' &&
                            row.request === 'activate_advances') ? (
                            <span className='btn_grp'>
                              <Button
                                className='btn_approve'
                                variant='contained'
                                onClick={() => handleApproveButton(row, i)}
                                disabled={row.revenue_source_name === null ? true : false}
                              >
                                Approve
                              </Button>
                              <Button
                                className='btn_deny'
                                variant='outlined'
                                onClick={() => handleDenyButton(row, i)}
                              >
                                Deny
                              </Button>
                            </span>
                          ) : (row.current_state === 'activate_advances' ||
                              row.current_state === 'pause_advances' ||
                              row.current_state === 'pending') &&
                            row.request === 'create' ? (
                            <span className='btn_grp'>
                              <Button
                                className='btn_approve'
                                variant='contained'
                                onClick={() => handleApproveButton(row, i)}
                                disabled={row.revenue_source_name === null ? true : false}
                              >
                                Approve
                              </Button>
                              <Button
                                className='btn_deny'
                                variant='outlined'
                                onClick={() => handleDenyButton(row, i)}
                              >
                                Deny
                              </Button>
                            </span>
                          ) : row.current_state === 'delete' && row.request === null ? (
                            '-'
                          ) : row.current_state === 'activate_advances' && row.request === null ? (
                            <span
                              className={i === submitIndex ? 'slect_btn show_btn' : 'slect_btn'}
                            >
                              <StyledFormControl variant='outlined'>
                                {/* <InputLabel id='demo-simple-select-label'>Select</InputLabel> */}
                                <Select
                                  className='revenue_drp'
                                  variant='outlined'
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={i === submitIndex ? selectValue : 'Please Select'}
                                  placeholder='select'
                                  onChange={(e) => handleSubmitBtn(e, i)}
                                >
                                  <MenuItem value='delete'>Remove</MenuItem>
                                  <MenuItem value='pause_advances'>Pause</MenuItem>
                                </Select>
                              </StyledFormControl>
                              <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                onClick={() => handleSubmitButton(row, i)}
                              >
                                Submit
                              </Button>
                            </span>
                          ) : row.current_state === 'pause_advances' && row.request === null ? (
                            <span
                              className={i === submitIndex ? 'slect_btn show_btn' : 'slect_btn'}
                            >
                              <StyledFormControl variant='outlined'>
                                {/* <InputLabel id='demo-simple-select-label'>Select</InputLabel> */}
                                <Select
                                  className='revenue_drp'
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={i === submitIndex ? selectValue : 'Please Select'}
                                  placeholder='select'
                                  onChange={(e) => handleSubmitBtn(e, i)}
                                >
                                  <MenuItem value='activate_advances'>Activate</MenuItem>
                                  <MenuItem value='delete'>Remove</MenuItem>
                                </Select>
                              </StyledFormControl>
                              <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                onClick={() => handleSubmitButton(row, i)}
                              >
                                Submit
                              </Button>
                            </span>
                          ) : row.current_state === 'pending' && row.request === null ? (
                            <span
                              className={i === submitIndex ? 'slect_btn show_btn' : 'slect_btn'}
                            >
                              <StyledFormControl variant='outlined'>
                                <Select
                                  className='revenue_drp'
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={i === submitIndex ? selectValue : 'Please Select'}
                                  placeholder='select'
                                  onChange={(e) => handleSubmitBtn(e, i)}
                                >
                                  <MenuItem value='activate_advances'>Activate</MenuItem>
                                  <MenuItem value='delete'>Remove</MenuItem>
                                  <MenuItem value='pause_advances'>Pause</MenuItem>
                                </Select>
                              </StyledFormControl>
                              <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                onClick={() => handleSubmitButton(row, i)}
                              >
                                Submit
                              </Button>
                            </span>
                          ) : (
                            // '-'
                            <span
                              className={i === submitIndex ? 'slect_btn show_btn' : 'slect_btn'}
                            >
                              <StyledFormControl variant='outlined'>
                                <Select
                                  className='revenue_drp'
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={i === submitIndex ? selectValue : 'Please Select'}
                                  placeholder='select'
                                  onChange={(e) => handleSubmitBtn(e, i)}
                                >
                                  <MenuItem value='activate_advances'>Activate</MenuItem>
                                  <MenuItem value='delete'>Remove</MenuItem>
                                  <MenuItem value='pause_advances'>Pause</MenuItem>
                                </Select>
                              </StyledFormControl>
                              <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                onClick={() => handleSubmitButton(row, i)}
                              >
                                Submit
                              </Button>
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {accountEdit?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={accountEdit?.data?.count}
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
  // revenueSourceList: state.revenueSourceList.data,
  accountingStatusEdit: state.accountingStatusEdit.data
});

export default connect(mapStateToProps)(DataTable);
