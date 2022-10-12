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
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import TablePagination from '@material-ui/core/TablePagination';
import { useSnackbar } from 'notistack';
import { StyledTableWrap, StyledDialog, Styledbutton } from './Styled';

interface Data {
  send: string;
  reject: string;
  customer: string;
  revenue_source: string;
  type: string;
  invoice_no: string | number;
  invoice_id: string | number;
  advance_date: string;
  adjusted_expected_repayment_date: string;
  currency: string;
  adjusted_gross_value: string | number;
  purchase_value: string | number;
  advance_amount: string | number;
  advance_fee: string | number;
  billing_month: string | number;
  monthly_invoice_id: string | number;
  daily_advance_fee: string | number;
  lms_status: string;
  id: string | number;
}

function createData(
  send: string,
  reject: string,
  customer: string,
  revenue_source: string,
  type: string,
  invoice_no: string | number,
  invoice_id: string | number,
  advance_date: string,
  adjusted_expected_repayment_date: string,
  currency: string,
  adjusted_gross_value: string | number,
  purchase_value: string | number,
  advance_amount: string | number,
  advance_fee: string | number,
  billing_month: string | number,
  monthly_invoice_id: string | number,
  daily_advance_fee: string | number,
  lms_status: string,
  id: string | number
): Data {
  return {
    send,
    reject,
    customer,
    revenue_source,
    type,
    invoice_no,
    invoice_id,
    advance_date,
    adjusted_expected_repayment_date,
    currency,
    adjusted_gross_value,
    purchase_value,
    advance_amount,
    advance_fee,
    billing_month,
    monthly_invoice_id,
    daily_advance_fee,
    lms_status,
    id
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
    id: 'lms_status',
    numeric: true,
    disablePadding: false,
    label: 'LMS STATUS'
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER'
  },
  {
    id: 'revenue_source',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE TYPE'
  },
  {
    id: 'invoice_no',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE NUMBER'
  },
  {
    id: 'invoice_id',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE ID'
  },
  {
    id: 'advance_date',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE DATE'
  },
  {
    id: 'adjusted_expected_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'REPAYMENT DATE'
  },
  {
    id: 'currency',
    numeric: true,
    disablePadding: false,
    label: 'CURRENCY'
  },
  {
    id: 'adjusted_gross_value',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE'
  },
  {
    id: 'purchase_value',
    numeric: true,
    disablePadding: false,
    label: 'PURCHASE VALUE'
  },
  {
    id: 'advance_amount',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE AMOUNT'
  },
  {
    id: 'advance_fee',
    numeric: true,
    disablePadding: false,
    label: 'FEE AMOUNT'
  },
  {
    id: 'billing_month',
    numeric: true,
    disablePadding: false,
    label: 'BILLING MONTH'
  },
  {
    id: 'monthly_invoice_id',
    numeric: true,
    disablePadding: false,
    label: 'MONTHLY INVOICE ID'
  },
  {
    id: 'daily_advance_fee',
    numeric: true,
    disablePadding: false,
    label: 'DAILY ADVANCE FEE'
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  allChecked: boolean;
  allRejectChecked: boolean;
  onSendAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRejectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    onRequestSort,
    onSendAllClick,
    allChecked,
    allRejectChecked,
    onRejectAllClick
  } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            disabled={allRejectChecked ? true : false}
            checked={allChecked}
            onChange={onSendAllClick}
            inputProps={{ 'aria-label': 'select all Revenue' }}
          />
          <label>SEND</label>
        </TableCell>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            disabled={allChecked ? true : false}
            checked={allRejectChecked}
            onChange={onRejectAllClick}
            inputProps={{ 'aria-label': 'select all Revenue' }}
          />
          <label>REJECT</label>
        </TableCell>
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
  lmsStaging: {
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
  getCommentsCodat: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  deleteCommentsCodat: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  stagingAction: {
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
  lmsStaging,
  getCommentsCodat,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  deleteCommentsCodat,
  updateRevenueAcc,
  revenueSourceMasterList,
  stagingAction,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [commentset, setcommentset] = React.useState<any>('');
  const [isChecked, setIsChecked] = React.useState<any>([]);
  const [isRejectChecked, setisRejectChecked] = React.useState<any>([]);
  const [sendallChecked, setsendallChecked] = useState(false);
  const [rejectallChecked, setrejectallChecked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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
              data.send,
              data.reject,
              data.customer,
              data.revenue_source,
              data.type,
              data.invoice_no,
              data.invoice_id,
              data.advance_date,
              data.adjusted_expected_repayment_date,
              data.currency,
              data.adjusted_gross_value,
              data.purchase_value,
              data.advance_amount,
              data.advance_fee,
              data.billing_month,
              data.monthly_invoice_id,
              data.daily_advance_fee,
              data.lms_status,
              data.id
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (lmsStaging?.status === 'success') {
      generateTableData(lmsStaging.data.results);
    }
  }, [lmsStaging]);

  useEffect(() => {
    if (updateRevenueAcc?.status == 'success') {
      mainAPI();
    } else if (updateRevenueAcc?.status) {
      const variant = 'error';
      enqueueSnackbar('This Revenue is already selected', {
        variant
      });
    }
  }, [updateRevenueAcc, mainAPI, stagingAction?.status, enqueueSnackbar]);

  useEffect(() => {
    if (stagingAction?.status == 'success') {
      mainAPI();
    }
  }, [stagingAction]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    handleSortData(property, isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle Page change
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   handlePaginationAndUpdateList('page', newPage);
  // };

  // Handle Row per page change handler
  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   handlePaginationAndUpdateList('rowsPerpage', parseInt(event.target.value, 10));
  // };

  const onHandleChangeTextarea = (e: any) => {
    setcommentset(e.target.value);
  };

  // Handle Modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleSendCheck = (e: any, id: any) => {
    const ids = [...isChecked];
    if (isChecked.includes(id)) {
      ids.splice(isChecked.indexOf(id), 1);
    } else {
      ids.push(id);
    }
    setIsChecked(ids);
  };

  const handleRejectCheck = (e: any, id: any) => {
    const ids = [...isRejectChecked];
    if (isRejectChecked.includes(id)) {
      ids.splice(isRejectChecked.indexOf(id), 1);
    } else {
      ids.push(id);
    }
    console.log(ids, 'ids');
    setisRejectChecked(ids);
  };

  const handleConfirmSelection = (e: any) => {
    setOpenSnackbar(true);
    dispatch({
      type: 'STAGING_ACTION',
      payload: {
        acceptArr: isChecked,
        rejectArr: isRejectChecked
      }
    });
    setsendallChecked(false);
    setrejectallChecked(false);
  };

  const handlesendAllClick = (e: any) => {
    if (isChecked.length === lmsStaging?.data?.results.length || !e.target.checked) {
      setIsChecked([]);
    } else {
      const getAllId = lmsStaging?.data?.results
        .filter(function (res: any) {
          return !isRejectChecked.includes(res.id);
        })
        .map((res: any) => res.id);
      setIsChecked(getAllId);
      console.log(getAllId, 'getAllId');
    }
    setsendallChecked(e.target.checked);
  };

  const handlerejectAllClick = (e: any) => {
    if (isRejectChecked.length === lmsStaging?.data?.results.length || !e.target.checked) {
      setisRejectChecked([]);
    } else {
      const getAllId1 = lmsStaging?.data?.results
        .filter(function (res: any) {
          return !isChecked.includes(res.id);
        })
        .map((res: any) => res.id);
      setisRejectChecked(getAllId1);
    }
    setrejectallChecked(e.target.checked);
  };

  const handleSnacbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setisRejectChecked('');
    setIsChecked('');
    setOpenSnackbar(false);
  };

  return (
    <>
      <Styledbutton>
        <Button
          onClick={handleConfirmSelection}
          disabled={isChecked.length > 0 || isRejectChecked.length > 0 ? false : true}
          className='confirm_btn'
        >
          Confirm Selection
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
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSendAllClick={handlesendAllClick}
              allChecked={sendallChecked}
              onRejectAllClick={handlerejectAllClick}
              allRejectChecked={rejectallChecked}
            />
            <TableBody>
              {rows.length
                ? rows.map((row, i) => (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align='center'>
                        <Checkbox
                          // name={row.id}
                          disabled={isRejectChecked?.includes(row.id) ? true : false}
                          checked={isChecked?.includes(row.id) ? true : false}
                          onChange={(e) => handleSendCheck(e, row.id)}
                          color='primary'
                          inputProps={{ 'aria-label': 'expert checkbox' }}
                        />

                        {/* {console.log(isChecked?.includes(row.id), isChecked, row.id, 'nnn')} */}
                      </TableCell>
                      <TableCell align='center'>
                        <Checkbox
                          // name={row.id}
                          // checked={isRejectChecked[row.id]}
                          disabled={isChecked?.includes(row.id) ? true : false}
                          checked={isRejectChecked?.includes(row.id) ? true : false}
                          onChange={(e) => handleRejectCheck(e, row.id)}
                          color='primary'
                          inputProps={{ 'aria-label': 'expert checkbox' }}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        {row.lms_status === 'failed'
                          ? 'Failed'
                          : row.lms_status === 'pending'
                          ? 'Pending'
                          : row.lms_status === 'success'
                          ? 'Success'
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.customer ? row.customer : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.revenue_source ? row.revenue_source : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.type ? row.type : '-'}</TableCell>
                      <TableCell align='center'>{row.invoice_no ? row.invoice_no : '-'}</TableCell>
                      <TableCell align='center'>{row.invoice_id ? row.invoice_id : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.advance_date ? row.advance_date : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.adjusted_expected_repayment_date
                          ? row.adjusted_expected_repayment_date
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.adjusted_gross_value
                          ? Number(row.adjusted_gross_value).toFixed(2)
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.purchase_value ? Number(row.purchase_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_amount ? Number(row.advance_amount).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.advance_fee ? Number(row.advance_fee).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.billing_month ? row.billing_month : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.monthly_invoice_id ? row.monthly_invoice_id : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.daily_advance_fee ? Number(row.daily_advance_fee).toFixed(2) : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {lmsStaging?.data?.results.length ? (
          <TablePagination
            className='cstm_pagination'
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={lmsStaging?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )} */}

        <StyledDialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' style={{ borderBottom: '1px solid #ddd' }}>
            Comments
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <div className='comment_row'>
                <TextareaAutosize
                  aria-label='minimum height'
                  placeholder='Enter new comment'
                  className='text_area'
                  defaultValue={commentset}
                  onChange={(e: any) => onHandleChangeTextarea(e)}
                />
                <button type='submit' className='submit_btn'>
                  Submit Comment
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </StyledDialog>
      </StyledTableWrap>

      {isChecked.length > 0 && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='Sending approved invoices to LMS'
          />
        </>
      )}
      {isRejectChecked.length > 0 && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='Rejected invoices removed from table'
          />
        </>
      )}
      {isChecked.length > 0 && isRejectChecked.length > 0 && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='Sending approved invoices to LMS and removing rejected invoices'
          />
        </>
      )}
      {/* {stagingAction?.status == 'success' && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message={stagingAction?.data?.accept_status[0]?.detail}
          />
        </>
      )} */}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  updateRevenueAcc: state.updateRevenueAcc.data,
  getCommentsCodat: state.getCommentsCodat.data,
  deleteCommentsCodat: state.deleteCommentsCodat.data,
  stagingAction: state.stagingAction.data
});

export default connect(mapStateToProps)(DataTable);
