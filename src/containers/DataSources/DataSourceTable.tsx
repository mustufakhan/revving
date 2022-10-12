/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import BlockIcon from '@material-ui/icons/Block';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckIcon from '@material-ui/icons/Check';
import Input from '@material-ui/core/Input';
import { useSnackbar, VariantType } from 'notistack';
import { StyledTableWrap, StyledBox } from './Styled';
import { DELETE_DATA_RESOURCE_TEXT } from '../../metaComponent';
import DialogBox from '../../components/DialogBox/Dialogbox';

interface IDataSource {
  uuid: number;
  source_name: string;
  from_email: string;
  api_source: string;
  customer_cuid: string;
  customer_name: string;
  subject: string;
  skip_rows: number;
  skip_footer: number;
  has_multi_revenue_sources: boolean;
}

function createData(
  uuid: number,
  source_name: string,
  from_email: string,
  api_source: string,
  customer_cuid: string,
  customer_name: string,
  subject: string,
  skip_rows: number,
  skip_footer: number,
  has_multi_revenue_sources: boolean
): IDataSource {
  return {
    uuid,
    source_name,
    from_email,
    api_source,
    customer_cuid,
    customer_name,
    subject,
    skip_rows,
    skip_footer,
    has_multi_revenue_sources
  };
}

type Order = 'asc' | 'desc';
interface HeadCell {
  disablePadding: boolean;
  id: keyof IDataSource;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'source_name', numeric: true, disablePadding: false, label: 'NAME' },
  { id: 'from_email', numeric: true, disablePadding: false, label: 'FROM EMAIL' },
  { id: 'api_source', numeric: true, disablePadding: false, label: 'API SOURCE' },
  { id: 'customer_name', numeric: true, disablePadding: false, label: 'CUSTOMER' },
  { id: 'subject', numeric: true, disablePadding: false, label: 'SUBJECT' },
  { id: 'skip_rows', numeric: true, disablePadding: false, label: 'SKIP ROWS' },
  { id: 'skip_footer', numeric: true, disablePadding: false, label: 'SKIP FOOTER' },
  {
    id: 'has_multi_revenue_sources',
    numeric: true,
    disablePadding: false,
    label: 'MULTIPLE REVENUE SOURCE'
  },
  {
    id: 'uuid',
    numeric: true,
    disablePadding: false,
    label: 'ACTIONS'
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IDataSource) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof IDataSource) => (event: React.MouseEvent<unknown>) => {
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
  dataSourceList: {
    data: any;
    status: string;
  };
  customerData: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  updateDataSource: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  deleteDataSource: {
    message: {
      data?: string;
    };
    data: any;
    status: string;
  };
  page: number;
  rowsPerPage: number;
}

const DataSourceTableSection: React.FC<IProps> = ({
  dataSourceList,
  dispatch,
  updateDataSource,
  deleteDataSource,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  customerData
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [open, setOpen] = useState<boolean>(false);
  const [deleteRevenueKey, setDeleteRevenueKey] = useState<any>();
  const [isEdit, setIsEdit] = useState<any>({});
  const [rows, setRows] = React.useState<any[]>([]);
  const isUpdateAndDelete = useRef({ isActive: false });
  const { enqueueSnackbar } = useSnackbar();

  // Handle update revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        updateDataSource.message.data ? updateDataSource.message.data : updateDataSource.message,
        {
          variant
        }
      );
    };
    if (isUpdateAndDelete.current.isActive && updateDataSource?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setIsEdit({});
      setOpen(false);
      setDeleteRevenueKey('');
    }
    if (isUpdateAndDelete.current.isActive && updateDataSource?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [updateDataSource, updateList, enqueueSnackbar]);

  // Handle delete revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        deleteDataSource.message.data ? deleteDataSource.message.data : deleteDataSource.message,
        {
          variant
        }
      );
    };

    if (isUpdateAndDelete.current.isActive && deleteDataSource?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setOpen(false);
      setDeleteRevenueKey('');
    }
    if (isUpdateAndDelete.current.isActive && deleteDataSource?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [deleteDataSource, updateList, enqueueSnackbar]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: IDataSource) => {
          newArray = [
            ...newArray,
            createData(
              data.uuid,
              data.source_name,
              data.from_email,
              data.api_source,
              data.customer_cuid,
              data.customer_name,
              data.subject,
              data.skip_rows,
              data.skip_footer,
              data.has_multi_revenue_sources
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (dataSourceList?.status === 'success') {
      generateTableData(dataSourceList?.data.results);
    }
  }, [dataSourceList]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IDataSource) => {
    const isAsc = orderBy === property && order === 'asc';

    handleSortData(property, isAsc);

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
            <Input value={isEdit[type]} name={type} onChange={(e) => onChange(e, type)} />
          ) : isBoolean(value) ? (
            value.toString()
          ) : (
            value
          )}
        </TableCell>
      );
    }
    if (isEditable && type === 'has_multi_revenue_sources') {
      return (
        <TableCell align='center' component='th' id={labelId} scope='row'>
          <FormControl className='selectClass'>
            {/* <InputLabel id='demo-simple-select-label'>Included</InputLabel> */}
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={isEdit.has_multi_revenue_sources}
              name={type}
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem value='true'>YES</MenuItem>
              <MenuItem value='false'>NO</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'customer_name') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={isEdit.customer_cuid}
              onChange={(e) => handleSelect(e, type)}
              label='Customer'
              name='customer_cuid'
            >
              <MenuItem key='no-value-customer' value=''>
                All
              </MenuItem>
              {customerData?.status === 'success' &&
                customerData?.data &&
                customerData.data?.results.length &&
                customerData.data?.results.map((data: any) => (
                  <MenuItem key={data.cuid} value={data.cuid}>
                    {data.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </TableCell>
      );
    }

    return (
      <TableCell align='center'>
        {isEditable ? (
          <Input value={isEdit[type]} name={type} onChange={(e) => onChange(e, type)} />
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

  // Handle Select
  const handleSelect = (e: any, type: string) => {
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
      type: 'UPDATE_DATA_SOURCE',
      payload: isEdit
    });
  };

  // Handle delete api
  const handleDelete = () => {
    isUpdateAndDelete.current.isActive = true;
    dispatch({
      type: 'DELETE_DATA_SOURCE',
      payload: {
        id: deleteRevenueKey
      }
    });
  };

  // Handle Confirmation dialog close
  const handleClose = () => {
    setOpen(false);
    setDeleteRevenueKey('');
  };

  // Handle Confirmation dialog open
  const handleDeleteModal = (row: any) => {
    setDeleteRevenueKey(row.uuid);
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
                      Object.keys(isEdit).length && isEdit.uuid === row.uuid ? true : false;

                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
                        {CustomTableCell(
                          row,
                          row.source_name,
                          'source_name',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.from_email,
                          'from_email',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.api_source,
                          'api_source',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.customer_name,
                          'customer_name',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(row, row.subject, 'subject', labelId, false, isEditable)}
                        {CustomTableCell(
                          row,
                          row.skip_rows,
                          'skip_rows',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.skip_footer,
                          'skip_footer',
                          labelId,
                          false,
                          isEditable
                        )}
                        {CustomTableCell(
                          row,
                          row.has_multi_revenue_sources === true ? 'YES' : 'NO',
                          'has_multi_revenue_sources',
                          labelId,
                          false,
                          isEditable
                        )}
                        <TableCell align='right'>
                          {isEdit?.uuid !== row.uuid || Object.keys(isEdit).length === 0 ? (
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
        {dataSourceList?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={dataSourceList?.data?.count}
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
          <DialogTitle id='alert-dialog-title'>Data Source Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {DELETE_DATA_RESOURCE_TEXT}
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
        <DialogBox
          open={open}
          handleClose={handleClose}
          description={DELETE_DATA_RESOURCE_TEXT}
          handleDelete={handleDelete}
        />
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  updateDataSource: state.updateDataSource.data,
  deleteDataSource: state.deleteDataSource.data,
  apiDataSource: state.apiDataSource.state
});

export default connect(mapStateToProps)(DataSourceTableSection);
