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
// import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Grid } from '@material-ui/core';
// import EditOutlinedIcon from '@material-ui/core/EditOutlined';
// import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Select from '@material-ui/core/Select';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { useSnackbar } from 'notistack';
import { StyledTableWrap, StyledDialog, DialogContentWrapper } from './Styled';

interface Data {
  customer: string | Number;
  customer_name: string;
  revenue_source: string;
  company_reference: string;
  GBP_advance_beneficiary_ref: string;
  GBP_collectionI_BAN_number: string;
  GBP_repayment_beneficiary_ref: string;
  GBP_surplus_beneficiary_ref: string;
  USD_advance_beneficiary_ref: string;
  USD_collectionI_BAN_number: string;
  USD_repayment_beneficiary_ref: string;
  USD_surplus_beneficiary_ref: string;
  EUR_advance_beneficiary_ref: string;
  EUR_collectionI_BAN_number: string;
  EUR_repayment_beneficiary_ref: string;
  EUR_surplus_beneficiary_ref: string;
  id: string | number;
  action: string | number;
  customer_cuid: string;
}

function createData(
  customer: string | Number,
  customer_name: string,
  revenue_source: string,
  company_reference: string,
  GBP_advance_beneficiary_ref: string,
  GBP_collectionI_BAN_number: string,
  GBP_repayment_beneficiary_ref: string,
  GBP_surplus_beneficiary_ref: string,
  USD_advance_beneficiary_ref: string,
  USD_collectionI_BAN_number: string,
  USD_repayment_beneficiary_ref: string,
  USD_surplus_beneficiary_ref: string,
  EUR_advance_beneficiary_ref: string,
  EUR_collectionI_BAN_number: string,
  EUR_repayment_beneficiary_ref: string,
  EUR_surplus_beneficiary_ref: string,
  id: string | number,
  action: string | number,
  customer_cuid: string
): Data {
  return {
    customer,
    customer_name,
    revenue_source,
    company_reference,
    GBP_advance_beneficiary_ref,
    GBP_collectionI_BAN_number,
    GBP_repayment_beneficiary_ref,
    GBP_surplus_beneficiary_ref,
    USD_advance_beneficiary_ref,
    USD_collectionI_BAN_number,
    USD_repayment_beneficiary_ref,
    USD_surplus_beneficiary_ref,
    EUR_advance_beneficiary_ref,
    EUR_collectionI_BAN_number,
    EUR_repayment_beneficiary_ref,
    EUR_surplus_beneficiary_ref,
    id,
    action,
    customer_cuid
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
  // {
  //   id: 'send',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'SEND'
  // },
  // {
  //   id: 'reject',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'REJECT'
  // },
  {
    id: 'customer_name',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER NAME'
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'CUSTOMER ID'
  },
  {
    id: 'company_reference',
    numeric: true,
    disablePadding: false,
    label: 'COMPANY REFERENCE'
  },
  {
    id: 'GBP_advance_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'GBP ADVANCE BENEFICIARY REF'
  },
  {
    id: 'GBP_collectionI_BAN_number',
    numeric: true,
    disablePadding: false,
    label: 'GBP COLLECTION IBAN NUMBER'
  },
  {
    id: 'GBP_repayment_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'GBP REPAYMENT BENEFICIARY REF'
  },
  {
    id: 'GBP_surplus_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'GBP SURPLUS BENEFICIARY REF'
  },
  {
    id: 'USD_advance_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'USD ADVANCE BENEFICIARY REF'
  },
  {
    id: 'USD_collectionI_BAN_number',
    numeric: true,
    disablePadding: false,
    label: 'USD COLLECTION IBAN NUMBER'
  },
  {
    id: 'USD_repayment_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'USD REPAYMENT BENEFICIARY REF'
  },
  {
    id: 'USD_surplus_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'USD SURPLUS BENEFICIARY REF'
  },
  {
    id: 'EUR_advance_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'EUR ADVANCE BENEFICIARY REF'
  },
  {
    id: 'EUR_collectionI_BAN_number',
    numeric: true,
    disablePadding: false,
    label: 'EUR COLLECTION IBAN NUMBER'
  },
  {
    id: 'EUR_repayment_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'EUR REPAYMENT BENEFICIARY REF'
  },
  {
    id: 'EUR_surplus_beneficiary_ref',
    numeric: true,
    disablePadding: false,
    label: 'EUR SURPLUS BENEFICIARY REF'
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'ACTIONS'
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  //   allChecked: boolean;
  //   allRejectChecked: boolean;
  //   onSendAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //   onRejectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    onRequestSort
    // onSendAllClick,
    // allChecked,
    // allRejectChecked,
    // onRejectAllClick
  } = props;
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
  kantoxAccounts: {
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
  kantoxDeleteCustomer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  kantoxEditCustomer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  kantoxCompanyReference: {
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
  kantoxAccounts,
  kantoxEditCustomer,
  getCommentsCodat,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  kantoxCompanyReference,
  handlePaginationAndUpdateList,
  kantoxDeleteCustomer,
  updateRevenueAcc,
  revenueSourceMasterList,
  stagingAction,
  mainAPI
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [editpopform, editsetpopform] = useState<any>({
    editGbpPaymentReference: '',
    editUsdPaymentReference: '',
    editEurPaymentReference: '',
    editGbpCollection: '',
    editUsdCollection: '',
    editEurCollection: '',
    editGbpRepaymentReference: '',
    editUsdRepaymentReference: '',
    editEurRepaymentReference: '',
    editGbpSurplusDistribution: '',
    editUsdSurplusDistribution: '',
    editEurSurplusDistribution: ''
  });
  const [customerCustId, setCustomerCustId] = useState('');
  const [rowId, setrowId] = useState('');
  const [editCompanyRef, seteditCompanyRef] = useState('');
  const [customerCUID, setCustomerCUID] = useState('');

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
              data.customer,
              data.customer_name,
              data.revenue_source,
              data.company_reference,
              data.GBP_advance_beneficiary_ref,
              data.GBP_collectionI_BAN_number,
              data.GBP_repayment_beneficiary_ref,
              data.GBP_surplus_beneficiary_ref,
              data.USD_advance_beneficiary_ref,
              data.USD_collectionI_BAN_number,
              data.USD_repayment_beneficiary_ref,
              data.USD_surplus_beneficiary_ref,
              data.EUR_advance_beneficiary_ref,
              data.EUR_collectionI_BAN_number,
              data.EUR_repayment_beneficiary_ref,
              data.EUR_surplus_beneficiary_ref,
              data.id,
              data.action,
              data.customer_cuid
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (kantoxAccounts?.status === 'success') {
      generateTableData(kantoxAccounts.data.results);
    }
  }, [kantoxAccounts]);

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

  // Handle Modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnacbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleDeleteModal = (row: any, e: any) => {
    dispatch({
      type: 'DELETE_KONTEX_CUSTOMER',
      payload: {
        id: row.id
      }
    });
    setTimeout(() => {
      mainAPI();
    }, 1000);

    setOpenSnackbar(true);
  };

  const handleEditRow = (row: any) => {
    setOpen(true);
    setCustomerCustId(row.customer);
    setCustomerCUID(row.customer_cuid);
    seteditCompanyRef(row.company_reference);
    setrowId(row.id);
    editsetpopform({
      editGbpPaymentReference: row.GBP_advance_beneficiary_ref,
      editUsdPaymentReference: row.USD_advance_beneficiary_ref,
      editEurPaymentReference: row.EUR_advance_beneficiary_ref,
      editGbpCollection: row.GBP_collectionI_BAN_number,
      editUsdCollection: row.USD_collectionI_BAN_number,
      editEurCollection: row.EUR_collectionI_BAN_number,
      editGbpRepaymentReference: row.GBP_repayment_beneficiary_ref,
      editUsdRepaymentReference: row.USD_repayment_beneficiary_ref,
      editEurRepaymentReference: row.EUR_repayment_beneficiary_ref,
      editGbpSurplusDistribution: row.GBP_surplus_beneficiary_ref,
      editUsdSurplusDistribution: row.USD_surplus_beneficiary_ref,
      editEurSurplusDistribution: row.EUR_surplus_beneficiary_ref
    });
  };

  const editHandleChange = (e: any) => {
    editsetpopform((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleCompanyRefChange = (e: any) => {
    seteditCompanyRef(e.target.value);
  };

  const handleEditSubmit = () => {
    dispatch({
      type: 'EDIT_KONTEX_ACCOUNT',
      payload: { ...editpopform, customer: customerCustId, id: rowId }
    });
    dispatch({
      type: 'KONTEX_COMPANY_REFERENCE',
      payload: {
        cuid: customerCUID,
        company_reference: editCompanyRef
      }
    });
    mainAPI();
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
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align='center'>
                        {row.customer_name ? row.customer_name : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.customer ? row.customer : '-'}</TableCell>
                      <TableCell align='center'>
                        {row.company_reference ? row.company_reference : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.GBP_advance_beneficiary_ref ? row.GBP_advance_beneficiary_ref : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.GBP_collectionI_BAN_number ? row.GBP_collectionI_BAN_number : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.GBP_repayment_beneficiary_ref
                          ? row.GBP_repayment_beneficiary_ref
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.GBP_surplus_beneficiary_ref ? row.GBP_surplus_beneficiary_ref : '-'}
                      </TableCell>
                      <TableCell align='center' className=''>
                        {row.USD_advance_beneficiary_ref ? row.USD_advance_beneficiary_ref : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.USD_collectionI_BAN_number ? row.USD_collectionI_BAN_number : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.USD_repayment_beneficiary_ref
                          ? row.USD_repayment_beneficiary_ref
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.USD_surplus_beneficiary_ref ? row.USD_surplus_beneficiary_ref : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.EUR_advance_beneficiary_ref ? row.EUR_advance_beneficiary_ref : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.EUR_collectionI_BAN_number ? row.EUR_collectionI_BAN_number : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.EUR_repayment_beneficiary_ref
                          ? row.EUR_repayment_beneficiary_ref
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.EUR_surplus_beneficiary_ref ? row.EUR_surplus_beneficiary_ref : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        <Box>
                          <IconButton
                            aria-label='delete'
                            onClick={(e) => handleDeleteModal(row, e)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                          <IconButton aria-label='CreateIcon' onClick={() => handleEditRow(row)}>
                            <CreateIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {kantoxAccounts?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={kantoxAccounts?.data?.count}
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
            <DialogTitle id='responsive-dialog-title'>Edit Kantox Integration</DialogTitle>
            <DialogContent>
              <Grid item xs={12} sm={12}>
                <div className='wrap_colmn'>
                  <label className='lbl_head'>Control Account Company Ref</label>
                  <TextField
                    variant='outlined'
                    id='Company-Ref'
                    label='Company Ref'
                    value={editCompanyRef}
                    onChange={(e) => handleCompanyRefChange(e)}
                  />
                </div>
              </Grid>

              <div className='pop_tbl'>
                <table>
                  <tr>
                    <th>&nbsp;</th>
                    <th>GBP</th>
                    <th>USD</th>
                    <th>EUR</th>
                  </tr>
                  <tr>
                    <td className='lbl'>Advance Payment</td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editGbpPaymentReference'
                        value={editpopform.editGbpPaymentReference}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editUsdPaymentReference'
                        value={editpopform.editUsdPaymentReference}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editEurPaymentReference'
                        value={editpopform.editEurPaymentReference}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='lbl'>Collection</td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='IBAN Number'
                        name='editGbpCollection'
                        value={editpopform.editGbpCollection}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='IBAN Number'
                        name='editUsdCollection'
                        value={editpopform.editUsdCollection}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='IBAN Number'
                        name='editEurCollection'
                        value={editpopform.editEurCollection}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='lbl'>Advance Repayment</td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editGbpRepaymentReference'
                        value={editpopform.editGbpRepaymentReference}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editUsdRepaymentReference'
                        value={editpopform.editUsdRepaymentReference}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editEurRepaymentReference'
                        value={editpopform.editEurRepaymentReference}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='lbl'>Surplus Distribution</td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editGbpSurplusDistribution'
                        value={editpopform.editGbpSurplusDistribution}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editUsdSurplusDistribution'
                        value={editpopform.editUsdSurplusDistribution}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                    <td>
                      <TextField
                        variant='outlined'
                        id='outlined-name'
                        label='Beneficiary Reference'
                        name='editEurSurplusDistribution'
                        value={editpopform.editEurSurplusDistribution}
                        onChange={(e) => editHandleChange(e)}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color='secondary'>
                Cancel
              </Button>
              <Button color='primary' autoFocus onClick={handleEditSubmit}>
                Confirm
              </Button>
            </DialogActions>
          </DialogContentWrapper>
        </StyledDialog>
      </StyledTableWrap>

      {kantoxDeleteCustomer?.status === 'success' && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnacbarClose}
          message='Customer removed'
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  updateRevenueAcc: state.updateRevenueAcc.data,
  getCommentsCodat: state.getCommentsCodat.data,
  kantoxDeleteCustomer: state.kantoxDeleteCustomer.data,
  stagingAction: state.stagingAction.data,
  kantoxEditCustomer: state.kantoxEditCustomer.data,
  kantoxCompanyReference: state.kantoxCompanyReference
});

export default connect(mapStateToProps)(DataTable);
