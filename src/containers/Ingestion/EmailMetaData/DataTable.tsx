/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSnackbar, VariantType } from 'notistack';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StyledTableWrap, StyledInput } from './Styled';

interface Data {
  uuid: number;
  data_source: number;
  customer_name: string;
  message_id: string;
  from_email: string;
  to_email: string;
  subject: string;
  date: string;
  csv_file: string;
  status: string;
  ignore: boolean;
}

function createData(
  uuid: number,
  customer_name: string,
  data_source: number,
  message_id: string,
  from_email: string,
  to_email: string,
  subject: string,
  date: string,
  csv_file: string,
  status: string,
  ignore: boolean
): Data {
  return {
    uuid,
    customer_name,
    data_source,
    message_id,
    from_email,
    to_email,
    subject,
    date,
    csv_file,
    status,
    ignore
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
  { id: 'customer_name', numeric: true, disablePadding: false, label: 'Customer' },
  { id: 'data_source', numeric: true, disablePadding: false, label: 'Data Source' },
  { id: 'from_email', numeric: true, disablePadding: false, label: 'From Email' },
  { id: 'to_email', numeric: true, disablePadding: false, label: 'To Email' },
  { id: 'subject', numeric: true, disablePadding: false, label: 'Subject' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'ignore', numeric: true, disablePadding: false, label: 'Ignore' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Reason' },
  { id: 'uuid', numeric: true, disablePadding: false, label: 'Actions' }
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
            align={headCell?.numeric ? 'center' : 'center'}
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
  emailMetaDatalist: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  uploadCsvFile: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  emailIgnore: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  emailRecalculate: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  downloadCSVFile: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
}

const RevenueSourceSection: React.FC<IProps> = ({
  emailMetaDatalist,
  dispatch,
  updateList,
  uploadCsvFile,
  rowsPerPage,
  page,
  handleSortData,
  emailIgnore,
  emailRecalculate,
  downloadCSVFile,
  handlePaginationAndUpdateList
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [activeLoading, setActiveLoading] = useState<any>('');
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = React.useState<number | ''>('');
  const { enqueueSnackbar } = useSnackbar();
  const isUpdateAndDelete = useRef({ isActive: false });
  const eventClick = useRef({ value: '' });

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.uuid,
              data.customer_name,
              data.data_source,
              data.message_id,
              data.from_email,
              data.to_email,
              data.subject,
              data.date,
              data.csv_file,
              data.status,
              data.ignore
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (emailMetaDatalist?.status === 'success') {
      generateTableData(emailMetaDatalist.data.results);
    }
  }, [emailMetaDatalist]);

  // Handle update revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        uploadCsvFile.message.data ? uploadCsvFile.message.data : uploadCsvFile.message,
        {
          variant
        }
      );
    };
    if (isUpdateAndDelete.current.isActive && uploadCsvFile?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setSelected('');
    }
    if (isUpdateAndDelete.current.isActive && uploadCsvFile?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [uploadCsvFile, updateList, enqueueSnackbar]);

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

  // Handle file upload handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPLOAD_CSV',
      payload: {
        files: event.target.files,
        id: selected
      }
    });
  };

  // handleSelect Row
  const handleSelectRow = (row: Data) => {
    setSelected(row.uuid);
  };

  // Handle email ignore response
  useEffect(() => {
    const handleSnack = (variant: VariantType, msg: string) => {
      enqueueSnackbar(msg, {
        variant
      });
    };
    if (emailIgnore?.status === 'success' && eventClick.current.value === 'ignore_metaData') {
      handleSnack('success', emailIgnore?.data?.detail);
      updateList();
    }
    if (emailIgnore?.status === 'failure' && eventClick.current.value === 'ignore_metaData') {
      handleSnack(
        'error',
        emailIgnore.message.data ? emailIgnore.message.data : emailIgnore.message
      );
    }
    eventClick.current.value = '';
  }, [emailIgnore, enqueueSnackbar, eventClick, updateList]);

  // Handle email recalculate response
  useEffect(() => {
    const handleSnack = (variant: VariantType, msg: string) => {
      enqueueSnackbar(msg, {
        variant
      });
    };
    if (
      emailRecalculate?.status === 'success' &&
      eventClick.current.value === 'email_recalculate'
    ) {
      handleSnack('success', emailRecalculate?.data?.detail);
      setActiveLoading('');
    }
    if (
      emailRecalculate?.status === 'failure' &&
      eventClick.current.value === 'email_recalculate'
    ) {
      handleSnack(
        'error',
        emailRecalculate.message.data ? emailRecalculate.message.data : emailRecalculate.message
      );
      setActiveLoading('');
    }
    eventClick.current.value = '';
  }, [emailRecalculate, enqueueSnackbar, eventClick]);

  // Handle Test Send
  const handleReCalculate = (row: Data) => {
    const { uuid } = row;
    eventClick.current.value = 'email_recalculate';
    setActiveLoading(uuid);
    dispatch({
      type: 'EMAIL_RECALCULATE',
      payload: {
        id: uuid
      }
    });
  };

  const handleDownloadCSV = (row: Data) => {
    console.log(row, 'row');
    dispatch({
      type: 'DOWNLOAD_CSV',
      payload: {
        donwloadlnk: row.csv_file
      }
    });
  };

  // Handle toggle
  const toggleChecked = (row: Data) => {
    const { uuid, ignore } = row;
    eventClick.current.value = 'ignore_metaData';
    dispatch({
      type: 'EMAIL_METADATA_IGNORE',
      payload: {
        ignore: !ignore,
        id: uuid
      }
    });
  };
  return (
    <>
      {console.log(downloadCSVFile?.data, 'downloadCSVFile')}
      <StyledTableWrap>
        <TableContainer>
          <Table
            stickyHeader
            className='report_data_tbl'
            aria-labelledby='tableTitle'
            size='small'
            aria-label='enhanced table'
          >
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows.length
                ? rows.map((row) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell align='center'>
                        {row.customer_name ? row.customer_name : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.data_source ? row.data_source : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.from_email ? row.from_email : '-'}</TableCell>
                      <TableCell align='center'>{row.to_email ? row.to_email : '-'}</TableCell>
                      <TableCell align='center'>{row.subject ? row.subject : '-'}</TableCell>
                      <TableCell align='center'>{moment(row.date).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align='center'>
                        {row.ignore !== '' ? (row.ignore ? 'Yes' : 'No') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.status
                          ? row.status == 'key_error' ||
                            row.status == 'type_error' ||
                            row.status == 'format' ||
                            row.status == 'rev_source_err' ||
                            row.status == 'queued' ||
                            row.status == 'impress_err' ||
                            row.status == 'calculation_err' ||
                            row.status == 'duplicacy_err'
                            ? 'Fail'
                            : 'Success'
                          : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.status == 'key_error'
                          ? 'Incorrect CSV Mapping'
                          : row.status == 'type_error'
                          ? 'Incorrect Model Field Mapping'
                          : row.status == 'format'
                          ? 'Incorrect File Format'
                          : row.status == 'rev_source_err'
                          ? 'Revenue Source Not Defined'
                          : row.status == 'queued'
                          ? 'Queued for retry populate Revenue Data'
                          : row.status == 'impress_err'
                          ? 'Impression value not present'
                          : row.status == 'calculation_err'
                          ? 'Error in Revenue Calculation'
                          : row.status == 'duplicacy_err'
                          ? 'Potential Duplicate'
                          : '-'}
                      </TableCell>
                      <TableCell align='center' className='d-flex'>
                        <a href={downloadCSVFile?.data?.url} target='_blank' rel='noreferrer'>
                          <IconButton
                            aria-label='CloudDownloadIcon'
                            onClick={() => handleDownloadCSV(row)}
                          >
                            <CloudDownloadIcon />
                          </IconButton>
                        </a>
                        <IconButton
                          aria-label='CloudUploadIcon'
                          onClick={() => handleSelectRow(row)}
                        >
                          <StyledInput
                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            id='contained-button-file'
                            type='file'
                            onChange={handleFileChange}
                          />
                          <label htmlFor='contained-button-file'>
                            <CloudUploadIcon />
                          </label>
                        </IconButton>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                size='small'
                                checked={row.ignore}
                                onChange={() => toggleChecked(row)}
                              />
                            }
                            label='Ignore'
                          />
                        </FormGroup>

                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => handleReCalculate(row)}
                        >
                          {activeLoading === row.uuid ? 'Loading.....!' : 'Re-Calculate'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
        {emailMetaDatalist?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={emailMetaDatalist?.data?.count}
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
  uploadCsvFile: state.uploadCsvFile.data,
  emailIgnore: state.emailIgnore.data,
  emailRecalculate: state.emailRecalculate.data,
  downloadCSVFile: state.downloadCSVFile.data
});

export default connect(mapStateToProps)(RevenueSourceSection);
