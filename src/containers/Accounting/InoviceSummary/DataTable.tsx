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
// import EditOutlinedIcon from '@material-ui/core/EditOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import TableCell from '@material-ui/core/TableCell';
// import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Select from '@material-ui/core/Select';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { useSnackbar } from 'notistack';
import { StyledTableWrap, StyledDialog } from './Styled';

interface Data {
  comments: string;
  type: string;
  invoice_status: string;
  issue_date: string;
  ingestion_date: string;
  decision_date: string;
  customer: string | Number;
  codat_invoice_no: string;
  revenue_source: string;
  gross_value: string;
  adjusted_amount_due: string;
  expected_repayment_date: string;
  adjusted_expected_repayment_date: string;
  codat_invoice_id: string;
  id: Number;
}

function createData(
  comments: string,
  type: string,
  invoice_status: string,
  issue_date: string,
  ingestion_date: string,
  decision_date: string,
  customer: string | Number,
  codat_invoice_no: string,
  revenue_source: string,
  gross_value: string,
  adjusted_amount_due: string,
  expected_repayment_date: string,
  adjusted_expected_repayment_date: string,
  codat_invoice_id: string,
  id: Number
): Data {
  return {
    comments,
    type,
    invoice_status,
    issue_date,
    ingestion_date,
    decision_date,
    customer,
    codat_invoice_no,
    revenue_source,
    gross_value,
    adjusted_amount_due,
    expected_repayment_date,
    adjusted_expected_repayment_date,
    codat_invoice_id,
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
    id: 'comments',
    numeric: true,
    disablePadding: false,
    label: 'COMMENTS'
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE TYPE'
  },
  {
    id: 'invoice_status',
    numeric: true,
    disablePadding: false,
    label: 'STATUS'
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
  },
  {
    id: 'decision_date',
    numeric: true,
    disablePadding: false,
    label: 'DECISION DATE'
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER'
  },
  {
    id: 'codat_invoice_no',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE NUMBER'
  },
  {
    id: 'revenue_source',
    numeric: true,
    disablePadding: false,
    label: 'REVENUE SOURCE'
  },
  {
    id: 'gross_value',
    numeric: true,
    disablePadding: false,
    label: 'GROSS VALUE'
  },
  {
    id: 'adjusted_amount_due',
    numeric: true,
    disablePadding: false,
    label: 'ADJUSTED GROSS REVENUE'
  },
  {
    id: 'expected_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'EXPECTED PAYMENT DATE'
  },
  {
    id: 'adjusted_expected_repayment_date',
    numeric: true,
    disablePadding: false,
    label: 'ADJUSTED EXPECTED PAYMENT DATE'
  },
  {
    id: 'codat_invoice_id',
    numeric: true,
    disablePadding: false,
    label: 'INVOICE ID'
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
  invoiceSummary: {
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
  mainAPI: Function;
}

const DataTable: React.FC<IProps> = ({
  dispatch,
  invoiceSummary,
  getCommentsCodat,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  deleteCommentsCodat,
  updateRevenueAcc,
  revenueSourceMasterList,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  // const [customerValue, setCustomer] = React.useState<string>('');
  // const [commentsState, setcommentsState] = React.useState<any[]>([]);
  const [codatinvoice, setcodatinvoice] = React.useState<any>('');
  const [commentset, setcommentset] = React.useState<any>('');
  const [codatuuid, setcodatuuid] = React.useState<any>('');
  const [cpmRowState, setcpmRow] = React.useState<any[]>([]);

  // const [index, setIndex] = React.useState<any>('');

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
              data.comments,
              data.type,
              data.invoice_status,
              data.issue_date,
              data.ingestion_date,
              data.decision_date,
              data.customer,
              data.codat_invoice_no,
              data.revenue_source,
              data.gross_value,
              data.adjusted_amount_due,
              data.expected_repayment_date,
              data.adjusted_expected_repayment_date,
              data.codat_invoice_id,
              data.id
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (invoiceSummary?.status === 'success') {
      generateTableData(invoiceSummary.data.results);
    }
  }, [invoiceSummary]);

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

  // Handle Comments
  const handleCommentRow = (row: any) => {
    console.log(row, 'row');
    // const codatinvoiceValue = row.comments.map((item: any) => item.codatinvoice);
    const codatinvoiceuuid = row.comments.map((item: any) => item.uuid);
    console.log(codatinvoiceuuid, 'codatinvoiceuuid');
    const codatVlaue = row.id;
    // const cpm = row.comments.map((item: any) => item.comment);
    const cpmRow = row.comments;
    // setcommentsState(cpm);
    setcpmRow(cpmRow);
    setcodatinvoice(codatVlaue);
    setcodatuuid(codatinvoiceuuid);
    setOpen(true);
    setcommentset('');
  };

  const onHandleChangeTextarea = (e: any) => {
    setcommentset(e.target.value);
    // console.log(codatinvoice, commentset, 'payload');
    // dispatch({
    //   type: 'CREATE_CODAT_COMMENT',
    //   payload: {
    //     codatinvoice: codatinvoice,
    //     comment: commentset
    //   }
    // });
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
                ? rows.map((row, i) => (
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
                      <TableCell align='center'>
                        {row.type === 'Factor' ? 'Factor' : 'Collateral'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.invoice_status === 'Rejected'
                          ? 'Purchase Rejected'
                          : row.invoice_status === 'Approve'
                          ? 'Pending'
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.issue_date ? row.issue_date : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.ingestion_date ? row.ingestion_date : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.decision_date ? row.decision_date : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.customer ? row.customer : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.codat_invoice_no ? row.codat_invoice_no : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.revenue_source ? row.revenue_source : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.gross_value ? Number(row.gross_value).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center' className='padd_lft_align'>
                        {row.adjusted_amount_due ? Number(row.adjusted_amount_due).toFixed(2) : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.expected_repayment_date ? row.expected_repayment_date : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.adjusted_expected_repayment_date
                          ? row.adjusted_expected_repayment_date
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.codat_invoice_id ? row.codat_invoice_id : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {invoiceSummary?.data?.results?.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={invoiceSummary?.data?.count}
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
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  updateRevenueAcc: state.updateRevenueAcc.data,
  getCommentsCodat: state.getCommentsCodat.data,
  deleteCommentsCodat: state.deleteCommentsCodat.data
});

export default connect(mapStateToProps)(DataTable);
