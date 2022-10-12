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
import Loader from '../../../components/Loader';
import { StyledTableWrap, StyledBox } from './Styled';
import { DELETE_COLUMN_MAP__TEXT } from '../../../metaComponent';
import Dialogbox from '../../../components/DialogBox/Dialogbox';

interface MappingObj {
  uuid: number;
  data_source_id: number;
  csv_column: string;
  database_column: string;
  data_source: number;
}

function createData(
  uuid: number,
  data_source_id: number,
  csv_column: string,
  database_column: string,
  data_source: number
): MappingObj {
  return { uuid, data_source_id, csv_column, database_column, data_source };
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof MappingObj;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'csv_column', numeric: true, disablePadding: false, label: 'CSV COLUMN' },
  { id: 'database_column', numeric: true, disablePadding: false, label: 'DB COLUMN' },
  { id: 'uuid', numeric: true, disablePadding: false, label: 'Actions' }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MappingObj) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof MappingObj) => (event: React.MouseEvent<unknown>) => {
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
              active={headCell.id === 'uuid' ? false : orderBy === headCell.id}
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
  mappingList: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  updateColumnMap: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  deleteColumnMap: {
    message: {
      data?: string;
    };
    data: any;
    status: string;
  };
  columnList: {
    message: {
      data?: string;
    };
    data: any;
    status: string;
  };
  page: number;
  rowsPerPage: number;
  datasourceValue: string;
  getCsvColumnList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const IngestionMappingSection: React.FC<IProps> = ({
  mappingList,
  dispatch,
  updateColumnMap,
  deleteColumnMap,
  updateList,
  columnList,
  rowsPerPage,
  page,
  handleSortData,
  handlePaginationAndUpdateList,
  datasourceValue,
  getCsvColumnList
}: IProps) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof MappingObj>('uuid');
  const [open, setOpen] = useState<boolean>(false);
  const [deleteRevenueKey, setDeleteRevenueKey] = useState<any>();
  const [isEdit, setIsEdit] = useState<any>({});
  const [rows, setRows] = React.useState<any[]>([]);
  const isUpdateAndDelete = useRef({ isActive: false });
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  // Handle update revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        updateColumnMap.message.data ? updateColumnMap.message.data : updateColumnMap.message,
        {
          variant
        }
      );
    };
    if (isUpdateAndDelete.current.isActive && updateColumnMap?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setIsEdit({});
      setOpen(false);
      setDeleteRevenueKey('');
    }
    if (isUpdateAndDelete.current.isActive && updateColumnMap?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [updateColumnMap, updateList, enqueueSnackbar]);

  // Data updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [deleteColumnMap]);

  // updateRevenueSource updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [updateColumnMap]);

  // Handle delete revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        deleteColumnMap.message.data ? deleteColumnMap.message.data : deleteColumnMap.message,
        {
          variant
        }
      );
    };

    if (isUpdateAndDelete.current.isActive && deleteColumnMap?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setOpen(false);
      setDeleteRevenueKey('');
    }
    if (isUpdateAndDelete.current.isActive && deleteColumnMap?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [deleteColumnMap, updateList, enqueueSnackbar]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: MappingObj) => {
          newArray = [
            ...newArray,
            createData(
              data.uuid,
              data.data_source_id,
              data.csv_column,
              data.database_column,
              data.data_source
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (mappingList?.status === 'success') {
      generateTableData(mappingList.data.results);
    }
  }, [mappingList]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MappingObj) => {
    const isAsc = orderBy === property && order === 'asc';
    handleSortData(property, isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Toast function
  const handleToast = (variant: VariantType, msg: string) => {
    enqueueSnackbar(msg, {
      variant
    });
  };

  // Checking value boolean or not
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
        <TableCell component='th' id={labelId} scope='row' padding='none'>
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
    if (isEditable && type === 'csv_column' && getCsvColumnList?.data?.columns.length) {
      return (
        <TableCell align='center' component='th' id={labelId} scope='row' padding='none'>
          <FormControl className='selectClass'>
            {/* <InputLabel id='demo-simple-select-label'>Included</InputLabel> */}
            <Select
              labelId='demo-simple-select-label-getCsvColumnList'
              id='demo-simple-select-getCsvColumnList'
              value={getCsvColumnList?.data?.columns.length ? isEdit.csv_column : ''}
              name='currency'
              onChange={(e) => handleSelect(e, type)}
            >
              {getCsvColumnList?.status === 'success' &&
                getCsvColumnList?.data &&
                getCsvColumnList?.data?.columns.length &&
                getCsvColumnList.data?.columns.map((data: any) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'csv_column' && !getCsvColumnList?.data?.columns.length) {
      return (
        <TableCell
          align='center'
          component='th'
          id={labelId}
          scope='row'
          padding='none'
          style={{ color: 'red' }}
        >
          NO CSV COLUMN
        </TableCell>
      );
    }
    if (isEditable && type === 'database_column') {
      return (
        <TableCell align='center' component='th' id={labelId} scope='row' padding='none'>
          <FormControl className='selectClass'>
            {/* <InputLabel id='demo-simple-select-label'>Included</InputLabel> */}
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={columnList?.data.length ? isEdit.database_column : ''}
              name='currency'
              onChange={(e) => handleSelect(e, type)}
            >
              {columnList?.status === 'success' &&
                columnList?.data.length &&
                columnList?.data.map((data: any) => (
                  <MenuItem key={data} value={data}>
                    {data}
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
    const { csv_column, database_column, data_source } = isEdit;
    if (csv_column && database_column && data_source) {
      if (!getCsvColumnList?.data?.columns.length) {
        handleToast('warning', 'Please select CSV COLUMN');
      } else {
        dispatch({
          type: 'UPDATE_MAPPING',
          payload: isEdit
        });
      }
    } else {
      handleToast('warning', 'Please select all fields');
    }
  };

  // Handle delete api
  const handleDelete = () => {
    setIsLoading(true);
    isUpdateAndDelete.current.isActive = true;
    dispatch({
      type: 'DELETE_MAPPING',
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
        {isLoading && <Loader />}
        {!isLoading && (
          <TableContainer>
            <Table
              stickyHeader
              className=''
              aria-labelledby='tableTitle'
              size='small'
              aria-label='enhanced table'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {datasourceValue && rows.length
                  ? rows.map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isEditable =
                        Object.keys(isEdit).length && isEdit.uuid === row.uuid ? true : false;
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.uuid}>
                          {CustomTableCell(
                            row,
                            row.csv_column,
                            'csv_column',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.database_column,
                            'database_column',
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
        )}
        {datasourceValue && (
          <TablePagination
            rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
            component='div'
            count={mappingList?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Column Map Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {DELETE_COLUMN_MAP__TEXT}
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
          description={DELETE_COLUMN_MAP__TEXT}
          handleDelete={handleDelete}
        />
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  updateColumnMap: state.updateMapping.data,
  deleteColumnMap: state.deleteMapping.data
});

export default connect(mapStateToProps)(IngestionMappingSection);
