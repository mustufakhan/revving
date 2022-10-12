/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint object-shorthand: "off" */
/* eslint prefer-arrow-callback: "off" */
/* eslint react/jsx-one-expression-per-line: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */
/* eslint consistent-return: "off" */
/* eslint react/jsx-boolean-value: "off" */

import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import EditOutlinedIcon from '@material-ui/core/EditOutlined';
// import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import IconButton from '@material-ui/core/IconButton';
// import CreateIcon from '@material-ui/icons/Create';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
// import { useSnackbar, VariantType } from 'notistack';
import { StyledTableWrap, StyledDialog, Styledbutton, DialogContentWrapper } from './Styled';

interface Data {
  id: number;
  master_name: string;
  currency: string;
  num_active_cust: string | number;
  num_paused_cust: string | number;
  total_advances: string | number;
  current_open_advances: string | number;
  lowest_fee_daily: number;
  highest_fee_daily: string | number;
  lowest_haircut: string | number;
  highest_haircut: string | number;
  uuid: string;
  on_board_status: string;
  onboard_date: string;
  website: string;
  company_id: string;
  country: string;
  city: string;
  post_code: string;
  address: string;
  sub_address: string;
}

function createData(
  id: number,
  master_name: string,
  currency: string,
  num_active_cust: string | number,
  num_paused_cust: string | number,
  total_advances: string | number,
  current_open_advances: string | number,
  lowest_fee_daily: number,
  highest_fee_daily: string | number,
  lowest_haircut: string | number,
  highest_haircut: string | number,
  uuid: string,
  on_board_status: string,
  onboard_date: string,
  website: string,
  company_id: string,
  country: string,
  city: string,
  post_code: string,
  address: string,
  sub_address: string
): Data {
  return {
    id,
    master_name,
    currency,
    num_active_cust,
    num_paused_cust,
    total_advances,
    current_open_advances,
    lowest_fee_daily,
    highest_fee_daily,
    lowest_haircut,
    highest_haircut,
    uuid,
    on_board_status,
    onboard_date,
    website,
    company_id,
    country,
    city,
    post_code,
    address,
    sub_address
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
    id: 'master_name',
    numeric: true,
    disablePadding: false,
    label: 'Revenue Source Master Name'
  },
  {
    id: 'currency',
    numeric: true,
    disablePadding: false,
    label: 'Currency'
  },
  {
    id: 'num_active_cust',
    numeric: true,
    disablePadding: false,
    label: 'Nb Active Customers'
  },
  {
    id: 'num_paused_cust',
    numeric: true,
    disablePadding: false,
    label: 'Nb Paused Customers'
  },
  {
    id: 'total_advances',
    numeric: true,
    disablePadding: false,
    label: 'Total Advances'
  },
  {
    id: 'current_open_advances',
    numeric: true,
    disablePadding: false,
    label: 'Current Open Advances'
  },
  {
    id: 'lowest_fee_daily',
    numeric: true,
    disablePadding: false,
    label: 'Lowest Fee'
  },
  {
    id: 'highest_fee_daily',
    numeric: true,
    disablePadding: false,
    label: 'Highest Fee'
  },
  {
    id: 'lowest_haircut',
    numeric: true,
    disablePadding: false,
    label: 'Lowest Haircut'
  },
  {
    id: 'highest_haircut',
    numeric: true,
    disablePadding: false,
    label: 'Highest Haircut'
  },
  {
    id: 'uuid',
    numeric: true,
    disablePadding: false,
    label: 'Uuid'
  },
  {
    id: 'on_board_status',
    numeric: true,
    disablePadding: false,
    label: 'Onboard Status'
  },
  {
    id: 'onboard_date',
    numeric: true,
    disablePadding: false,
    label: 'Onboard Date'
  },
  {
    id: 'website',
    numeric: true,
    disablePadding: false,
    label: 'Website'
  },
  {
    id: 'company_id',
    numeric: true,
    disablePadding: false,
    label: 'Company ID'
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'Country'
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'City'
  },
  {
    id: 'post_code',
    numeric: true,
    disablePadding: false,
    label: 'Postcode'
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address'
  },
  {
    id: 'sub_address',
    numeric: true,
    disablePadding: false,
    label: 'Sub Address'
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
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  revMasterDetails: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  // updateRevenueAcc: {
  //   data: any;
  //   status: string;
  //   message: {
  //     data?: string;
  //     code?: number;
  //   };
  // };
  // getCommentsCodat: {
  //   data: any;
  //   status: string;
  //   message: {
  //     data?: string;
  //   };
  // };
  // deleteCommentsCodat: {
  //   data: any;
  //   status: string;
  //   message: {
  //     data?: string;
  //   };
  // };
  // stagingAction: {
  //   data: any;
  //   status: string;
  //   message: {
  //     data?: string;
  //   };
  // };
  answerOptionsReducer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  addNewRevMasterDetails: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  mainAPI: Function;
}

const DataTable: React.FC<IProps> = ({
  dispatch,
  // getCommentsCodat,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  addNewRevMasterDetails,
  // deleteCommentsCodat,
  // updateRevenueAcc,
  revMasterDetails,
  answerOptionsReducer,
  // stagingAction,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  //   const [sendallChecked, setsendallChecked] = useState(false);
  // const [checkloading, setcheckloading] = useState(true);
  //   const [rejectallChecked, setrejectallChecked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [popAddRevenueSource, setpopAddRevenueSource] = useState<any>({
    masterRevenue: '',
    country: '',
    currency: '',
    city: '',
    companyNumber: '',
    address: '',
    subAddress: '',
    postCode: ''
  });
  const currency = ['USD', 'EUR', 'GBP'];

  // console.log(revMasterDetails, 'rev');

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
              data.master_name,
              data.currency,
              data.num_active_cust,
              data.num_paused_cust,
              data.total_advances,
              data.current_open_advances,
              data.lowest_fee_daily,
              data.highest_fee_daily,
              data.lowest_haircut,
              data.highest_haircut,
              data.uuid,
              data.on_board_status,
              data.onboard_date,
              data.website,
              data.company_id,
              data.country,
              data.city,
              data.post_code,
              data.address,
              data.sub_address
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (revMasterDetails?.status === 'success') {
      generateTableData(revMasterDetails.data.results);
    }
  }, [revMasterDetails]);

  // useEffect(() => {
  //   if (updateRevenueAcc?.status == 'success') {
  //     mainAPI();
  //   } else if (updateRevenueAcc?.status) {
  //     const variant = 'error';
  //     enqueueSnackbar('This Revenue is already selected', {
  //       variant
  //     });
  //   }
  // }, [updateRevenueAcc, mainAPI, enqueueSnackbar]);

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

  // Handle Comments
  //   const handleCommentRow = (row: any) => {

  //     const codatinvoiceuuid = row.comments.map((item: any) => item.uuid);
  //     const codatVlaue = row.id;
  //     const cpmRow = row.comments;
  //     setcpmRow(cpmRow);
  //     setcodatinvoice(codatVlaue);
  //     setcodatuuid(codatinvoiceuuid);
  //     setOpen(true);
  //     setcommentset('');
  //   };

  //   const onHandleSubmitTextarea = (e: any) => {
  //     dispatch({
  //       type: 'CREATE_CODAT_COMMENT',
  //       payload: {

  //         comment: commentset
  //       }
  //     });
  //     setcommentset('');
  //     setOpen(false);
  //     mainAPI();
  //   };

  //   const onHandleCross = (i: number) => {
  //     const found = codatuuid.find(function (element: any, id: number) {
  //       return id === i;
  //     });
  //     dispatch({
  //       type: 'DELETE_COMMENTS',
  //       payload: {
  //         uuid: found
  //       }
  //     });

  //     setOpen(false);
  //     mainAPI();
  //   };

  // Handle Modal close
  const handleClose = () => {
    setOpen(false);
    setpopAddRevenueSource({
      masterRevenue: '',
      country: '',
      currency: '',
      city: '',
      companyNumber: '',
      address: '',
      subAddress: '',
      postCode: ''
    });
  };

  //   const handleSendCheck = (e: any, id: any) => {
  //     const ids = [...isChecked];
  //     if (isChecked.includes(id)) {
  //       ids.splice(isChecked.indexOf(id), 1);
  //     } else {
  //       ids.push(id);
  //     }
  //     setIsChecked(ids);
  //   };

  //   const handleRejectCheck = (e: any, id: any) => {
  //     const ids = [...isRejectChecked];
  //     if (isRejectChecked.includes(id)) {
  //       ids.splice(isRejectChecked.indexOf(id), 1);
  //     } else {
  //       ids.push(id);
  //     }
  //     console.log(ids, 'ids');
  //     setisRejectChecked(ids);
  //   };

  //   const handleConfirmSelection = (e: any) => {
  //     setOpenSnackbar(true);
  //     dispatch({
  //       type: 'STAGING_ACTION',
  //       payload: {
  //         acceptArr: isChecked,
  //         rejectArr: isRejectChecked
  //       }
  //     });
  //     setsendallChecked(false);
  //     setrejectallChecked(false);
  //     mainAPI();
  //   };

  //   const handlesendAllClick = (e: any) => {
  //     if (isChecked.length === lmsStaging?.data?.results.length || !e.target.checked) {
  //       setIsChecked([]);
  //     } else {
  //       const getAllId = lmsStaging?.data?.results
  //         .filter(function (res: any) {
  //           return !isRejectChecked.includes(res.id);
  //         })
  //         .map((res: any) => res.id);
  //       setIsChecked(getAllId);
  //       console.log(getAllId, 'getAllId');
  //     }
  //     setsendallChecked(e.target.checked);
  //   };

  //   const handlerejectAllClick = (e: any) => {
  //     if (isRejectChecked.length === lmsStaging?.data?.results.length || !e.target.checked) {
  //       setisRejectChecked([]);
  //     } else {
  //       const getAllId1 = lmsStaging?.data?.results
  //         .filter(function (res: any) {
  //           return !isChecked.includes(res.id);
  //         })
  //         .map((res: any) => res.id);
  //       setisRejectChecked(getAllId1);
  //     }
  //     setrejectallChecked(e.target.checked);
  //   };
  // Calling answerOptionsReducer api for customer
  // useEffect(() => {
  //   const handleSnack = (variant: VariantType) => {
  //     enqueueSnackbar(
  //       answerOptionsReducer.message.data
  //         ? answerOptionsReducer.message.data
  //         : answerOptionsReducer.message,
  //       {
  //         variant
  //       }
  //     );
  //   };

  //   if (answerOptionsReducer?.status === 'failure' && eventClick.current.value === 'initialLoad') {
  //     handleSnack('error');
  //   }
  // }, [dispatch, answerOptionsReducer, enqueueSnackbar]);

  const handleSnacbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAddRevenueMaster = (e: any) => {
    console.log('cccc');
    setOpen(true);
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setpopAddRevenueSource((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleConfirm = () => {
    dispatch({
      type: 'ADD_REVENUE_SOURCE_NEW',
      payload: popAddRevenueSource
    });
    mainAPI();
    setOpen(false);
    setOpenSnackbar(true);
    setpopAddRevenueSource({
      masterRevenue: '',
      country: '',
      currency: '',
      city: '',
      companyNumber: '',
      address: '',
      subAddress: '',
      postCode: ''
    });
  };

  useEffect(() => {
    dispatch({
      type: 'OPTIONS_LIST'
    });
  }, [dispatch]);

  return (
    <>
      {console.log(revMasterDetails, 'revMasterDetails')}

      <Styledbutton>
        <Button color='primary' variant='outlined' onClick={handleAddRevenueMaster}>
          Add Revenue Master
        </Button>
      </Styledbutton>

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
                ? rows.map((row, i) => (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align='center'>
                        {row.master_name ? row.master_name : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.num_active_cust ? row.num_active_cust : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.num_paused_cust ? row.num_paused_cust : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.total_advances ? Number(row.total_advances).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.current_open_advances
                          ? Number(row.current_open_advances).toFixed(2)
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        <p>
                          {row.lowest_fee_daily
                            ? `${Number(row.lowest_fee_daily).toFixed(4)}% / day`
                            : '-'}
                        </p>
                        <p>
                          {row.lowest_fee_daily
                            ? `${((Number(row.lowest_fee_daily) * 365) / 12).toFixed(4)}% / month`
                            : '-'}
                        </p>
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        <p>
                          {row.highest_fee_daily
                            ? `${Number(row.highest_fee_daily).toFixed(4)}% / day`
                            : '-'}
                        </p>
                        <p>
                          {row.highest_fee_daily
                            ? `${((Number(row.highest_fee_daily) * 365) / 12).toFixed(4)}% / month`
                            : '-'}
                        </p>
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.lowest_haircut ? `${Number(row.lowest_haircut).toFixed(2)}%` : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.highest_haircut ? `${Number(row.highest_haircut).toFixed(2)}%` : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.uuid ? row.uuid : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.on_board_status ? row.on_board_status : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.onboard_date ? row.onboard_date : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.website ? row.website : '-'}</TableCell>
                      <TableCell align='center'>{row.company_id ? row.company_id : '-'}</TableCell>
                      <TableCell align='center'>{row.country ? row.country : '-'}</TableCell>
                      <TableCell align='center'>{row.city ? row.city : '-'}</TableCell>
                      <TableCell align='center'>{row.post_code ? row.post_code : '-'}</TableCell>
                      <TableCell align='center'>{row.address ? row.address : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.sub_address ? row.sub_address : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {revMasterDetails?.data?.results?.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={revMasterDetails?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )}

        <StyledDialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContentWrapper>
            <DialogTitle id='responsive-dialog-title'> Add New Revenue Source</DialogTitle>
            <DialogContent>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  label='Master Revenue'
                  name='masterRevenue'
                  value={popAddRevenueSource.masterRevenue}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Country'
                    name='country'
                    value={popAddRevenueSource.country}
                    onChange={(e) => handleChange(e)}
                  >
                    {answerOptionsReducer?.data?.COUNTRY_CODES
                      ? Object.keys(answerOptionsReducer?.data?.COUNTRY_CODES).map((data) => (
                          <MenuItem key={data} value={data}>
                            {answerOptionsReducer.data.COUNTRY_CODES[data]}
                          </MenuItem>
                        ))
                      : ''}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Currency</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label1'
                    id='demo-simple-select-outlined1'
                    variant='outlined'
                    label='Currency'
                    name='currency'
                    value={popAddRevenueSource.currency}
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem key='no-value-ds' value=''>
                      All
                    </MenuItem>
                    {currency.map((data: any) => (
                      <MenuItem key={data} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  label='City'
                  name='city'
                  value={popAddRevenueSource.city}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  label='Company Number'
                  name='companyNumber'
                  value={popAddRevenueSource.companyNumber}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  label='Address'
                  name='address'
                  value={popAddRevenueSource.address}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  label='Sub address'
                  name='subAddress'
                  value={popAddRevenueSource.subAddress}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  label='Post Code'
                  name='postCode'
                  value={popAddRevenueSource.postCode}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color='secondary'>
                Cancel
              </Button>
              <Button
                color='primary'
                onClick={handleConfirm}
                disabled={popAddRevenueSource.masterRevenue ? false : true}
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </DialogContentWrapper>
        </StyledDialog>
      </StyledTableWrap>

      {addNewRevMasterDetails?.data?.status === 'success' && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='Successfuly add revenue source'
          />
        </>
      )}
      {addNewRevMasterDetails?.data?.status === 'failure' && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='Something went wrong'
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  // revenueSourceMasterList: state.revenueSourceMasterList.data,
  // updateRevenueAcc: state.updateRevenueAcc.data,
  // getCommentsCodat: state.getCommentsCodat.data,
  // deleteCommentsCodat: state.deleteCommentsCodat.data,
  // stagingAction: state.stagingAction.data,
  answerOptionsReducer: state.answerOptionsReducer.data,
  addNewRevMasterDetails: state.addNewRevMasterDetails.data
});

export default connect(mapStateToProps)(DataTable);
