/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint object-shorthand: "off" */
/* eslint prefer-arrow-callback: "off" */
/* eslint react/jsx-one-expression-per-line: "off" */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import locale from 'date-fns/locale/en-US';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
// import Select from '@material-ui/core/Select';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
// import { useSnackbar } from 'notistack';
import {
  StyledTableWrap,
  MuiPickersUtilsProviderWrapper,
  KeyboardDatePickerWrapper,
  StyledDialog
} from './Styled';

interface Data {
  comments: string;
  customer: string | Number;
  invoice_status: string;
  revenue_source_name: string;
  month: string | Number;
  year: string | Number;
  edited_billing_month: string;
  edited_billing_year: string;
  month_end: string;
  due_date: string;
  currency: string;
  billing_gross_value: string;
  adjusted_billing_gross_value: string;
  invoice_number: string;
  invoice_id: string;
  issue_date: string;
  ingestion_date: string;
  id: number;
  notional_id: number;
}

function createData(
  comments: string,
  customer: string | Number,
  invoice_status: string,
  revenue_source_name: string,
  month: string | Number,
  year: string | Number,
  edited_billing_month: string,
  edited_billing_year: string,
  month_end: string,
  due_date: string,
  currency: string,
  billing_gross_value: string,
  adjusted_billing_gross_value: string,
  invoice_number: string,
  invoice_id: string,
  issue_date: string,
  ingestion_date: string,
  id: number,
  notional_id: number
): Data {
  return {
    comments,
    customer,
    invoice_status,
    revenue_source_name,
    month,
    year,
    edited_billing_month,
    edited_billing_year,
    month_end,
    due_date,
    currency,
    billing_gross_value,
    adjusted_billing_gross_value,
    invoice_number,
    invoice_id,
    issue_date,
    ingestion_date,
    id,
    notional_id
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
    id: 'comments',
    numeric: true,
    disablePadding: false,
    label: 'COMMENTS'
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER'
  },
  {
    id: 'invoice_status',
    numeric: true,
    disablePadding: false,
    label: 'ASSIGNMENT STATUS'
  },
  {
    id: 'ingestion_date',
    numeric: true,
    disablePadding: false,
    label: 'ACTIONS'
  },
  {
    id: 'revenue_source_name',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  {
    id: 'month',
    numeric: true,
    disablePadding: false,
    label: 'BILLING MONTH'
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'BILLING YEAR'
  },
  {
    id: 'edited_billing_month',
    numeric: true,
    disablePadding: false,
    label: 'EDIT BILLING MONTH'
  },
  {
    id: 'edited_billing_year',
    numeric: true,
    disablePadding: false,
    label: 'EDIT BILLING YEAR'
  },
  {
    id: 'month_end',
    numeric: true,
    disablePadding: false,
    label: 'END MONTH'
  },
  {
    id: 'due_date',
    numeric: true,
    disablePadding: false,
    label: 'DUE DATE'
  },
  {
    id: 'currency',
    numeric: true,
    disablePadding: false,
    label: 'CURRENCY'
  },
  {
    id: 'billing_gross_value',
    numeric: true,
    disablePadding: false,
    label: 'BILLING GROSS VALUE'
  },
  {
    id: 'adjusted_billing_gross_value',
    numeric: true,
    disablePadding: false,
    label: 'ADJUST BILLING GROSS VALUE'
  },
  {
    id: 'invoice_number',
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
    id: 'issue_date',
    numeric: true,
    disablePadding: false,
    label: 'ISSUE DATE'
  },
  {
    id: 'ingestion_date',
    numeric: true,
    disablePadding: false,
    label: 'INGESTION DATE'
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
  rejectedInvoiceTable: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  billingRecalculate: {
    data: any;
    status: string;
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
  mainAPI: Function;
}

const DataTable: React.FC<IProps> = ({
  dispatch,
  rejectedInvoiceTable,
  deleteCommentsCodat,
  getCommentsCodat,
  billingRecalculate,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [edit, setEdit] = React.useState<any>({ isEdit: false, id: '' });
  // const [adjBilling, setAdjBilling] = React.useState<any[]>([]);
  const [gross, setGross] = React.useState<any[]>([]);
  const [yearChanging, setYearChanging] = React.useState<any>(false);
  const [monthChanging, setMonthChanging] = React.useState<boolean>(false);
  const [valueChanging, setValueChanging] = useState<any>('');
  const [showIndex, setShowIndex] = React.useState<any[]>([]);
  const [months, setMonths] = React.useState<any[]>([]);
  const [year, setYear] = React.useState<any[]>([]);
  // const [commentsState, setcommentsState] = React.useState<any[]>([]);
  const [cpmRowState, setcpmRow] = React.useState<any[]>([]);
  const [codatinvoice, setcodatinvoice] = React.useState<any>('');
  const [commentset, setcommentset] = React.useState<any>('');
  const [codatuuid, setcodatuuid] = React.useState<any>('');
  const [open, setOpen] = useState<boolean>(false);

  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (billingRecalculate?.status == 'success') {
      setShowIndex([]);
      mainAPI();
      setEdit({ isEdit: false, id: '' });
    }
  }, [billingRecalculate, mainAPI]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];
    const newdataMonth: any = [];
    const newdataYear: any = [];
    const grossValue: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.comments,
              data.customer,
              data.invoice_status,
              data.revenue_source_name,
              data.month,
              data.year,
              data.edited_billing_month,
              data.edited_billing_year,
              data.month_end,
              data.due_date,
              data.currency,
              data.billing_gross_value,
              data.adjusted_billing_gross_value,
              data.invoice_number,
              data.invoice_id,
              data.issue_date,
              data.ingestion_date,
              data.id,
              data.notional_id
            )
          ];
          grossValue.push(data.adjusted_billing_gross_value);
          newdataMonth.push(moment(data.edited_billing_month).format('MM'));
          newdataYear.push(moment(data.edited_billing_year).format('YYYY'));

          return '';
        });
      }
      !monthChanging && setMonths(newdataMonth);
      !yearChanging && setYear(newdataYear);
      !yearChanging && setGross(grossValue);
      setRows(newArray);
    };
    if (rejectedInvoiceTable?.status === 'success') {
      generateTableData(rejectedInvoiceTable.data.results);
    }
  }, [rejectedInvoiceTable, valueChanging, monthChanging, yearChanging]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    handleSortData(property, isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEdit = (row: any) => {
    setEdit({ isEdit: true, id: row.id });
  };

  const handleCancel = () => {
    setEdit({ isEdit: false, id: '' });
  };

  const handleAdjBilling = (e: React.ChangeEvent<HTMLInputElement>, index: any, row: any) => {
    const newGross = gross;
    newGross[index] = e.target.value;
    setGross(newGross);
    setYearChanging(true);
    setMonthChanging(true);
    setValueChanging(newGross[index]);
    showIndex.indexOf(index) == -1 && setShowIndex([...showIndex, index]);
  };

  // Handle Editable Dates
  const handleMonth = (data: Date | null, index: any) => {
    const prevDate = months;
    prevDate[index] = data ? moment(data).format('MM') : null;
    setMonths(prevDate);
    setMonthChanging(prevDate[index]);
    setYearChanging(prevDate[index]);
    showIndex.indexOf(index) == -1 && setShowIndex([...showIndex, index]);
  };

  // Handle Editable Dates
  const handleYear = (data: Date | null, index: any) => {
    const prevDate = year;
    prevDate[index] = data ? moment(data).format('yyyy') : null;
    setYear(prevDate);
    setMonthChanging(prevDate[index]);
    setYearChanging(prevDate[index]);
    showIndex.indexOf(index) == -1 && setShowIndex([...showIndex, index]);
  };

  const handleRecalculate = (row: any, index: any) => {
    const month: number = Number(months[index]);
    const value = gross[index];
    const yearD: number = Number(year[index]);

    dispatch({
      type: 'BILLING_RECALCULATE',
      payload: {
        id: row.notional_id,
        month,
        value,
        year: yearD
      }
    });
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
  const handleCommentRow = (row: any) => {
    const codatinvoiceuuid = row.comments.map((item: any) => item.uuid);
    const codatVlaue = row.id;
    const cpmRow = row.comments;
    setcpmRow(cpmRow);
    setcodatinvoice(codatVlaue);
    setcodatuuid(codatinvoiceuuid);
    setOpen(true);
    setcommentset('');
  };

  const onHandleChangeTextarea = (e: any) => {
    setcommentset(e.target.value);
  };

  const onHandleSubmitTextarea = (e: any) => {
    dispatch({
      type: 'CREATE_CODAT_COMMENT',
      payload: {
        codatinvoice: codatinvoice,
        comment: commentset
      }
    });
    setcommentset('');
    setOpen(false);
    mainAPI();
  };

  const onHandleCross = (i: number) => {
    const found = codatuuid.find(function (element: any, id: number) {
      return id === i;
    });
    dispatch({
      type: 'DELETE_COMMENTS',
      payload: {
        uuid: found
      }
    });
    // setcommentset('');
    setOpen(false);
    mainAPI();
  };

  // Handle Modal close
  const handleClose = () => {
    setOpen(false);
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
                ? rows.map((row: any, index: number) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell align='center'>
                        {row.comments.length > 0 ? (
                          <IconButton aria-label='CreateIcon'>
                            <CreateIcon
                              style={{ color: 'red' }}
                              onClick={() => handleCommentRow(row)}
                            />
                          </IconButton>
                        ) : (
                          <IconButton aria-label='CreateIcon' onClick={() => handleCommentRow(row)}>
                            <CreateIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell align='center'>{row.customer ? row.customer : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.invoice_status ? row.invoice_status : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {/* {row.id ? row.id : '-'} */}

                        {(row.invoice_status === 'Unassigned' ||
                          row.invoice_status === 'Assigned' ||
                          row.invoice_status === 'Purchased' ||
                          row.invoice_status === 'Approve' ||
                          row.invoice_status === 'Pending' ||
                          row.invoice_status === 'Rejected') &&
                          !(edit.isEdit && edit.id === row.id) && (
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleEdit(row)}
                              style={{ background: 'green' }}
                            >
                              Edit
                            </Button>
                          )}
                        {edit.isEdit && edit.id === row.id && (
                          <>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleRecalculate(row, index)}
                              style={{ marginRight: '10px', background: 'gray' }}
                            >
                              Recalculate
                            </Button>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleCancel()}
                              style={{ background: 'red' }}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source_name ? row.revenue_source_name : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.month ? row.month : '-'}</TableCell>
                      <TableCell align='center'>{row.year ? row.year : '-'}</TableCell>
                      <TableCell align='center'>
                        {/* {row.edited_billing_month ? row.edited_billing_month : '-'} */}
                        <MuiPickersUtilsProviderWrapper utils={DateFnsUtils} locale={locale}>
                          <KeyboardDatePickerWrapper
                            margin='normal'
                            id='from-picker-dialog'
                            label='From'
                            format='MM'
                            views={['month']}
                            value={months[index]}
                            onChange={(d) => handleMonth(d, index)}
                            disabled={!(edit.isEdit && row.id === edit.id)}
                          />
                        </MuiPickersUtilsProviderWrapper>
                      </TableCell>
                      <TableCell align='center'>
                        {/* {row.edited_billing_year ? row.edited_billing_year : '-'} */}
                        <MuiPickersUtilsProviderWrapper utils={DateFnsUtils} locale={locale}>
                          <KeyboardDatePickerWrapper
                            margin='normal'
                            id='from-picker-dialog'
                            label='From'
                            format='yyyy'
                            views={['year']}
                            value={year[index]}
                            onChange={(d) => handleYear(d, index)}
                            disabled={!(edit.isEdit && row.id === edit.id)}
                          />
                        </MuiPickersUtilsProviderWrapper>
                      </TableCell>
                      <TableCell align='center'>{row.month_end ? row.month_end : '-'}</TableCell>
                      <TableCell align='center'>{row.due_date ? row.due_date : '-'}</TableCell>
                      <TableCell align='center'>{row.currency ? row.currency : '-'}</TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.billing_gross_value ? Number(row.billing_gross_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {/* {row.adjusted_billing_gross_value
                          ? Number(row.adjusted_billing_gross_value).toFixed(2)
                          : '-'} */}
                        <input
                          value={gross[index]}
                          type='number'
                          style={{
                            backgroundColor: 'white',
                            border: '2px solid rgb(238,238,238)',
                            padding: '2px',
                            height: '2rem'
                          }}
                          disabled={!(edit.isEdit && row.id === edit.id)}
                          onChange={(e) => handleAdjBilling(e, index, row)}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_number ? row.invoice_number : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.invoice_id ? row.invoice_id : '-'}</TableCell>
                      <TableCell align='center'>{row.issue_date ? row.issue_date : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.ingestion_date ? row.ingestion_date : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {rejectedInvoiceTable?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rejectedInvoiceTable?.data?.count}
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
          <DialogTitle id='alert-dialog-title' style={{ borderBottom: '1px solid #ddd' }}>
            Comments
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <div className='comment_row'>
                <ul>
                  {cpmRowState.map((item: any, i: number) => (
                    <>
                      <li>
                        <span>
                          <p>{item.comment}</p>
                          <span>
                            {item.time} {item.first_name} {item.last_name}
                          </span>
                        </span>

                        <span>
                          <CancelOutlinedIcon
                            onClick={() => onHandleCross(i)}
                            style={{ color: 'red', cursor: 'pointer' }}
                          />
                        </span>
                      </li>
                    </>
                  ))}
                </ul>
                <TextareaAutosize
                  aria-label='minimum height'
                  placeholder='Enter new comment'
                  className='text_area'
                  defaultValue={commentset}
                  onChange={(e: any) => onHandleChangeTextarea(e)}
                />
                <button
                  type='submit'
                  onClick={(e: any) => onHandleSubmitTextarea(e)}
                  className='submit_btn'
                >
                  Submit Comment
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </StyledDialog>
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  billingRecalculate: state.billingRecalculate.data,
  getCommentsCodat: state.getCommentsCodat.data,
  deleteCommentsCodat: state.deleteCommentsCodat.data
});

export default connect(mapStateToProps)(DataTable);
