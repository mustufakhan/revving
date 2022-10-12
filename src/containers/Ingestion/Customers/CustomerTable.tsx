/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { FormControl, Select } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckIcon from '@material-ui/icons/Check';
import Input from '@material-ui/core/Input';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar, VariantType } from 'notistack';
import { StyledTableWrap, StyledBox } from './Styled';
import { DELETE_REVENUE_TEXT } from '../../../metaComponent';
import { CustomerObj, HeadCell, EnhancedTableProps, IProps } from './customerInterface';
import Dialogbox from '../../../components/DialogBox/Dialogbox';

function createData(data: CustomerObj) {
  const { cuid, name, company_number, country_code, vat_number, no_of_users } = data;
  return { cuid, name, company_number, country_code, vat_number, no_of_users };
}

const headCells: HeadCell[] = [
  { id: 'cuid', numeric: true, disablePadding: false, label: 'Customer’s ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'country_code', numeric: true, disablePadding: false, label: 'Country' },
  { id: 'no_of_users', numeric: true, disablePadding: false, label: 'Number of Users' },
  { id: 'company_number', numeric: true, disablePadding: false, label: 'Company Number' },
  { id: 'vat_number', numeric: true, disablePadding: false, label: 'VAT Number' },
  { id: 'cuid', numeric: true, disablePadding: false, label: 'Actions' }
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof CustomerObj) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
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

const CustomerTableSection: React.FC<IProps> = ({
  customerList,
  dispatch,
  updateCustomer,
  deleteCustomer,
  updateList,
  rowsPerPage,
  page,
  answerOptionsReducer,
  handleSortData,
  handlePaginationAndUpdateList
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [open, setOpen] = useState<boolean>(false);
  const [deleteCustomerKey, setDeleteCustomerkey] = useState<any>();
  const [isEdit, setIsEdit] = useState<any>({});
  const [rows, setRows] = React.useState<any[]>([]);
  const isUpdateAndDelete = useRef({ isActive: false });
  const { enqueueSnackbar } = useSnackbar();

  // Handle update revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        updateCustomer.message.data ? updateCustomer.message.data : updateCustomer.message,
        {
          variant
        }
      );
    };
    if (isUpdateAndDelete.current.isActive && updateCustomer?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setIsEdit({});
      setOpen(false);
      setDeleteCustomerkey('');
    }
    if (isUpdateAndDelete.current.isActive && updateCustomer?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [updateCustomer, updateList, enqueueSnackbar]);

  // Handle delete revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        deleteCustomer.message.data ? deleteCustomer.message.data : deleteCustomer.message,
        {
          variant
        }
      );
    };

    if (isUpdateAndDelete.current.isActive && deleteCustomer?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setOpen(false);
      setDeleteCustomerkey('');
    }
    if (isUpdateAndDelete.current.isActive && deleteCustomer?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [deleteCustomer, updateList, enqueueSnackbar]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: CustomerObj) => {
          newArray = [...newArray, createData(data)];
          return '';
        });
      }
      setRows(newArray);
    };
    if (customerList?.status === 'success') {
      generateTableData(customerList.data.results);
    }
  }, [customerList]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CustomerObj) => {
    const isAsc = orderBy === property && order === 'asc';

    handleSortData(property, isAsc);

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle Select
  const handleSelect = (e: any, type: string) => {
    const item = {
      ...isEdit,
      [type]: e.target.value
    };
    setIsEdit(item);
  };

  const isBoolean = (val: any) => typeof val === 'boolean';

  const CustomTableCell = (
    row: any,
    value: string | number,
    type: string,
    labelId: string,
    isPadding: boolean,
    isEditable: boolean
  ) => {
    if (isPadding) {
      return (
        <TableCell component='th' id={labelId} scope='row'>
          {isEditable ? (
            <Input
              value={isEdit[type]}
              name={type}
              onChange={(e) => onChange(e, type)}
              className='hhhhhhhhh'
            />
          ) : isBoolean(value) ? (
            value.toString()
          ) : (
            value
          )}
        </TableCell>
      );
    }
    if (isEditable && type === 'country_code') {
      return (
        <TableCell align='center' component='th' id={labelId} scope='row'>
          <FormControl className='selectClass'>
            {/* <InputLabel id='demo-simple-select-label'>Included</InputLabel> */}
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={isEdit.country_code}
              name='currency'
              onChange={(e) => handleSelect(e, type)}
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
        </TableCell>
      );
    }

    return (
      <TableCell align='center'>
        {isEditable ? (
          <Input
            value={isEdit[type]}
            name={type}
            onChange={(e) => onChange(e, type)}
            className='ttttttttttt'
          />
        ) : isBoolean(value) ? (
          value.toString()
        ) : (
          value
        )}
      </TableCell>
    );
  };

  const handleEditRow = (row: any) => {
    setIsEdit(row);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const item = {
      ...isEdit,
      [type]: e.target.value
    };
    setIsEdit(item);
  };

  // Handle Edit Close
  const handleCloseSelectedRow = () => {
    setIsEdit({});
  };

  // Handle Page change
  const handleChangePage = (event: unknown, newPage: number) => {
    handlePaginationAndUpdateList('page', newPage);
  };

  // Handle Row per page change handler
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePaginationAndUpdateList('rowsPerpage', parseInt(event.target.value, 10));
  };

  // Handle edit Row Check
  const handleEditRowCheck = () => {
    isUpdateAndDelete.current.isActive = true;
    dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: isEdit
    });
  };

  // Handle delete api
  const handleDelete = () => {
    isUpdateAndDelete.current.isActive = true;
    dispatch({
      type: 'DELETE_CUSTOMER',
      payload: {
        id: deleteCustomerKey
      }
    });
  };

  // Handle Confirmation dialog close
  const handleClose = () => {
    setOpen(false);
    setDeleteCustomerkey('');
  };

  // Handle Confirmation dialog open
  const handleDeleteModal = (row: any) => {
    setDeleteCustomerkey(row.cuid);
    setOpen(true);
  };

  return (
    <>
      <StyledTableWrap>
        <TableContainer>
          <Table
            stickyHeader
            className=''
            aria-labelledby='tableTitle'
            size='small'
            aria-label='enhanced table'
          >
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows.length
                ? rows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const isEditable =
                      Object.keys(isEdit).length && isEdit.cuid === row.cuid ? true : false;
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
                        <TableCell
                          align='center'
                          component='th'
                          id='row-name'
                          scope='row'
                          padding='none'
                        >
                          {row.cuid}
                        </TableCell>
                        {CustomTableCell(row, row.name, 'name', labelId, false, isEditable)}
                        {CustomTableCell(
                          row,
                          row.country_code ? row.country_code : '-',
                          'country_code',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.no_of_users ? row.no_of_users : '-',
                          'no_of_users',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.company_number ? row.company_number : '-',
                          'company_number',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.vat_number ? row.vat_number : '-',
                          'vat_number',
                          labelId,
                          false,
                          isEditable
                        )}
                        <TableCell align='right'>
                          {isEdit?.cuid !== row.cuid || Object.keys(isEdit).length === 0 ? (
                            <Box>
                              <IconButton
                                aria-label='delete'
                                onClick={() => handleDeleteModal(row)}
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                              <IconButton
                                aria-label='CreateIcon'
                                onClick={() => handleEditRow(row)}
                              >
                                <CreateIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <StyledBox>
                              <TableCell align='right'>
                                <IconButton
                                  aria-label='CheckIcon'
                                  onClick={() => handleEditRowCheck()}
                                >
                                  <CheckIcon />
                                </IconButton>

                                <IconButton
                                  aria-label='BlockIcon'
                                  onClick={() => handleCloseSelectedRow()}
                                >
                                  <BlockIcon />
                                </IconButton>
                              </TableCell>
                            </StyledBox>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {customerList?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={customerList?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )}
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Customer Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {DELETE_REVENUE_TEXT}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              N0
            </Button>
            <Button onClick={handleDelete} color='primary' autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog> */}
        <Dialogbox
          open={open}
          handleClose={handleClose}
          description={DELETE_REVENUE_TEXT}
          handleDelete={handleDelete}
        />
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  updateCustomer: state.updateCustomer.data,
  deleteCustomer: state.deleteCustomer.data
});

export default connect(mapStateToProps)(CustomerTableSection);
