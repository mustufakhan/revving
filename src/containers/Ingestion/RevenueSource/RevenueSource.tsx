/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';
import { withStyles, useTheme, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import Input from '@material-ui/core/Input';
// import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useSnackbar, VariantType } from 'notistack';
import { Grid, InputLabel } from '@material-ui/core';
import masterValidationRules from './MasterRevenueValidate';
import { validate } from '../../../utils/helper';
import {
  StyledTableWrap,
  StyledBox,
  DialogContentWrapper,
  ModalTextBox,
  StyledDialog
} from './Styled';
import Loader from '../../../components/Loader';
import { DELETE_REVENUE_TEXT } from '../../../metaComponent';
import Dialogbox from '../../../components/DialogBox/Dialogbox';

interface RevenueObject {
  uuid: number;
  // customer: number;
  customer_name: string;
  investigation_days: string | number;
  invoice_matching_rule: string | number;
  name: string;
  impression_value: any;
  currency: string;
  included: boolean;
  data_source: number;
  created_at: string;
  deleted_at: string | null;
  revenue_calculations: string | null;
  api_revenue_calculations: string | null;
  daily_advance_fee: string | null;
  haircut: string | null;
  payment_terms: number;
  fee_setting: string | null;
  advance_frequency: string | null;
  billing_month: number;
  week_start_day: number;
  week_start_day_two: number;
  bi_weekly_start_date: Date | string | null;
  payout_time: number;
  closing_days: number;
  sales_tax: string;
  master: number;
  master_name: string;
  data_source_name: string;
}

function createData(
  uuid: number,
  // customer: number,
  customer_name: string,
  investigation_days: string | number,
  invoice_matching_rule: string | number,
  name: string,
  impression_value: any,
  currency: string,
  included: boolean,
  data_source: number,
  created_at: string,
  deleted_at: string | null,
  revenue_calculations: string | null,
  api_revenue_calculations: string | null,
  daily_advance_fee: string | null,
  haircut: string | null,
  payment_terms: number,
  fee_setting: string | null,
  advance_frequency: string | null,
  billing_month: number,
  week_start_day: number,
  week_start_day_two: number,
  bi_weekly_start_date: Date | string | null,
  payout_time: number,
  closing_days: number,
  sales_tax: string,
  master: number,
  master_name: string,
  data_source_name: string
): RevenueObject {
  return {
    uuid,
    // customer,
    customer_name,
    investigation_days,
    invoice_matching_rule,
    name,
    impression_value,
    currency,
    included,
    data_source,
    created_at,
    deleted_at,
    revenue_calculations,
    api_revenue_calculations,
    daily_advance_fee,
    haircut,
    payment_terms,
    fee_setting,
    advance_frequency,
    billing_month,
    week_start_day,
    week_start_day_two,
    bi_weekly_start_date,
    payout_time,
    closing_days,
    sales_tax,
    master,
    master_name,
    data_source_name
  };
}

type Order = 'asc' | 'desc';
interface HeadCell {
  disablePadding: boolean;
  id: keyof RevenueObject;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'customer_name', numeric: true, disablePadding: false, label: 'Customer' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'master_name', numeric: true, disablePadding: false, label: 'Master' },
  { id: 'data_source_name', numeric: true, disablePadding: false, label: 'Data Source' },
  { id: 'currency', numeric: true, disablePadding: false, label: 'Currency' },
  { id: 'impression_value', numeric: true, disablePadding: false, label: 'Impression Value' },
  { id: 'included', numeric: true, disablePadding: false, label: 'Include in Advances' },
  { id: 'created_at', numeric: true, disablePadding: false, label: 'Created At' },
  {
    id: 'revenue_calculations',
    numeric: true,
    disablePadding: false,
    label: 'Revenue Calculations (CSV)'
  },
  {
    id: 'api_revenue_calculations',
    numeric: true,
    disablePadding: false,
    label: 'Revenue Calculations (API)'
  },
  { id: 'sales_tax', numeric: true, disablePadding: false, label: 'Sales Tax (%)' },
  { id: 'daily_advance_fee', numeric: true, disablePadding: false, label: 'Daily Advance Fee (%)' },
  { id: 'haircut', numeric: true, disablePadding: false, label: 'Haircut (%)' },
  { id: 'payment_terms', numeric: true, disablePadding: false, label: 'Payment Terms (days)' },
  { id: 'payout_time', numeric: true, disablePadding: false, label: 'Payout Time (days)' },
  { id: 'closing_days', numeric: true, disablePadding: false, label: 'Closing Days' },
  { id: 'fee_setting', numeric: true, disablePadding: false, label: 'Fee Setting' },
  { id: 'advance_frequency', numeric: true, disablePadding: false, label: 'Advance Frequency' },
  {
    id: 'invoice_matching_rule',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Matching Rules From Month-end'
  },
  { id: 'investigation_days', numeric: true, disablePadding: false, label: 'Flag Invoice Delay' },
  { id: 'billing_month', numeric: true, disablePadding: false, label: 'Billing Month' },
  { id: 'week_start_day', numeric: true, disablePadding: false, label: 'Week Start Day' },
  { id: 'week_start_day_two', numeric: true, disablePadding: false, label: 'Midweek Start Day' },
  {
    id: 'bi_weekly_start_date',
    numeric: true,
    disablePadding: false,
    label: 'Two Weekly Start Date'
  },
  { id: 'uuid', numeric: true, disablePadding: false, label: 'Actions' }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RevenueObject) => void;
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount } = props;
  const createSortHandler =
    (property: keyof RevenueObject) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all Revenue' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#222528',
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

// Props Interface
interface IProps {
  revenueSourceList: {
    data: any;
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  updateRevenueSource: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  calculationTest: {
    status: string;
    message: {
      data?: any;
    };
    data: {
      calculation: string;
      revenue: number;
      column: [
        {
          key: string;
          value: string;
        }
      ];
    };
  };
  deleteRevenueSource: {
    message: {
      data?: string;
    };
    data: any;
    status: string;
  };
  page: number;
  rowsPerPage: number;
  updateSelectedCheckbox: Function;
  selected: Array<string>;
  setSelected: Function;
  revenueSourceMasterList: {
    option: any;
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  customerData: {
    option: any;
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  dataSource: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };

  addRevenueSourceMaster: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  answerOptionsReducer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}
// Error Interface
// interface IError {
//   name?: string;
//   revenueSource?: string;
//   revenueCalculations?: string;
//   impressionValue?: number;
//   dailyAdvanceFee?: number;
//   haircut?: number;
//   paymentTerms?: number;
//   feeSetting?: string;
//   advanceFrequency?: string | number;
//   billingMonth?: number;
//   weekStartDay?: number;
//   weekStartDayTwo?: number;
//   biWeeklyStartDate?: Date | string | null;
//   payoutTime?: number;
//   salesTax?: string;
//   closingDay?: number;
//   selectMasterValue?: string;
// }

const RevenueSourceSection: React.FC<IProps> = ({
  revenueSourceList,
  dispatch,
  updateRevenueSource,
  calculationTest,
  deleteRevenueSource,
  updateList,
  rowsPerPage,
  page,
  handleSortData,
  updateSelectedCheckbox,
  handlePaginationAndUpdateList,
  selected,
  setSelected,
  revenueSourceMasterList,
  customerData,
  dataSource,
  addRevenueSourceMaster,
  answerOptionsReducer
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [error, setError] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isMasterModal, setIsMasterModal] = useState(false);
  // const [selectMasterValue, setSelectMasterValue] = useState<any>('');
  const [inputValue, setInputValue] = useState('');
  // const [dataSrcValue, setDataSrcValue] = useState('');
  // const [error, setError] = useState<IError>({});
  const [isMasterLoader, setIsMasterLoader] = useState(false);
  const [deleteRevenueKey, setDeleteRevenueKey] = useState<any>();
  const [isEdit, setIsEdit] = useState<any>({});
  const [rows, setRows] = React.useState<any[]>([]);
  const isUpdateAndDelete = useRef({ isActive: false });
  const [masterRevenue, setMasterRevenue] = useState({
    masterName: '',
    countryCode: '',
    city: '',
    addressOne: '',
    addressTwo: '',
    postcode: '',
    companyNo: ''
  });

  // const [selected, setSelected] = React.useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const eventClick = useRef({ value: '' });

  // Handle update revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        updateRevenueSource.message.data
          ? updateRevenueSource.message.data
          : updateRevenueSource.message,
        {
          variant
        }
      );
    };
    if (isUpdateAndDelete.current.isActive && updateRevenueSource?.status === 'success') {
      handleSnack('success');
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setIsEdit({});
      setOpen(false);
      setDeleteRevenueKey('');
    }
    if (isUpdateAndDelete.current.isActive && updateRevenueSource?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [updateRevenueSource, updateList, enqueueSnackbar]);

  // Calling calculationTest api for calculationTest list response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        calculationTest.message.data ? calculationTest.message.data : calculationTest.message,
        {
          variant
        }
      );
    };
    if (eventClick.current.value === 'revenue_test' && calculationTest?.status === 'success') {
      setOpenModal(true);
      eventClick.current.value = '';
    }
    if (eventClick.current.value === 'revenue_test' && calculationTest?.status === 'failure') {
      handleSnack('error');
      eventClick.current.value = '';
    }
  }, [calculationTest, updateList, enqueueSnackbar, setOpenModal]);

  //

  // const [updateCustomer, setUpdateCustomer] = useState('');

  // useEffect(()=>{
  //    setUpdateCustomer(updateRevenueSource?.data?.customer);
  // }, [updateRevenueSource?.data?.customer]);

  // Data updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [deleteRevenueSource]);

  // updateRevenueSource updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [updateRevenueSource]);

  // Handle delete revenue source api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        deleteRevenueSource.message.data
          ? deleteRevenueSource.message.data
          : deleteRevenueSource.message,
        {
          variant
        }
      );
    };

    if (isUpdateAndDelete.current.isActive && deleteRevenueSource?.status === 'success') {
      isUpdateAndDelete.current.isActive = false;
      updateList();
      setOpen(false);
      setDeleteRevenueKey('');
    }
    if (isUpdateAndDelete.current.isActive && deleteRevenueSource?.status === 'failure') {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [deleteRevenueSource, updateList, enqueueSnackbar]);

  // Calling add revenue master api.
  useEffect(() => {
    const handleSnack = (variant: VariantType, msg: string) => {
      enqueueSnackbar(msg, {
        variant
      });
    };

    const handleError = (variant: VariantType) => {
      enqueueSnackbar(
        addRevenueSourceMaster.message.data
          ? addRevenueSourceMaster.message.data
          : addRevenueSourceMaster.message,
        {
          variant
        }
      );
    };

    if (
      addRevenueSourceMaster?.status === 'success' &&
      eventClick.current.value === 'add_master_revenue'
    ) {
      handleSnack('success', 'Master Revenue Source Added!');
      setIsMasterLoader(false);
      handleMasterClose();
      dispatch({
        type: 'REVENUE_SOURCE_MASTER_LIST',
        payload: {}
      });
      eventClick.current.value = '';
    }
    if (
      addRevenueSourceMaster?.status === 'failure' &&
      eventClick.current.value === 'add_master_revenue'
    ) {
      handleError('error');
      setIsMasterLoader(false);
      eventClick.current.value = '';
    }
  }, [addRevenueSourceMaster, dispatch, enqueueSnackbar]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: RevenueObject) => {
          newArray = [
            ...newArray,
            createData(
              // data.customer,
              data.uuid,
              data.customer_name,
              data.investigation_days,
              data.invoice_matching_rule,
              data.name,
              data.impression_value,
              data.currency,
              data.included,
              data.data_source,
              data.created_at,
              data.deleted_at,
              data.revenue_calculations,
              data.api_revenue_calculations,
              data.daily_advance_fee,
              data.haircut,
              data.payment_terms,
              data.fee_setting,
              data.advance_frequency,
              data.billing_month,
              data.week_start_day,
              data.week_start_day_two,
              data.bi_weekly_start_date,
              data.payout_time,
              data.closing_days,
              data.sales_tax,
              data.master,
              data.master_name,
              data.data_source_name
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (revenueSourceList?.status === 'success') {
      generateTableData(revenueSourceList.data.results);
    }
  }, [revenueSourceList]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof RevenueObject) => {
    const isAsc = orderBy === property && order === 'asc';

    handleSortData(property, isAsc);

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle Close Master Modal
  const handleMasterClose = () => {
    eventClick.current.value = '';
    setIsMasterModal(false);
    setMasterRevenue({
      masterName: '',
      countryCode: '',
      city: '',
      addressOne: '',
      addressTwo: '',
      postcode: '',
      companyNo: ''
    });
    setError({});
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
        <TableCell component='th' id={labelId} scope='row' align='center'>
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
    if (isEditable && type === 'closing_days') {
      return (
        <TableCell align='center'>
          <TextField
            id='closing_days'
            type='number'
            value={isEdit[type]}
            name={type}
            onChange={(e) => onChange(e, type)}
            InputLabelProps={{
              shrink: true
            }}
            variant='standard'
          />
        </TableCell>
      );
    }
    if (isEditable && type === 'sales_tax') {
      return (
        <TableCell align='center'>
          <TextField
            id='sales_tax'
            type='text'
            value={isEdit[type]}
            name={type}
            onChange={(e) => onChange(e, type)}
            InputLabelProps={{
              shrink: true
            }}
            variant='standard'
          />
        </TableCell>
      );
    }
    if (isEditable && type === 'master') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass' style={{ display: 'flex', flexDirection: 'row' }}>
            <Autocomplete
              value={revenueSourceMasterList?.data.find((r: any) => r.uuid === isEdit.master)}
              getOptionLabel={(option) => option?.name}
              onChange={(event: any, newValue: string | null) => {
                // setSelectMasterValue(newValue);
              }}
              debug
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                setMasterRevenue({ ...masterRevenue, masterName: newInputValue });
              }}
              id='controllable-states-demo'
              options={revenueSourceMasterList?.data || []}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label='Master Revenue Source' variant='outlined' />
              )}
            />
            {revenueSourceMasterList?.data.find((r: any) => r.name === inputValue) ? (
              ''
            ) : (
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddRevenueMaster}
                style={{ marginLeft: '6px' }}
              >
                {isMasterLoader ? 'Loading.....!' : 'Add'}
              </Button>
            )}
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'data_source_name') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass' style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={isEdit.data_source_name}
              name='currency'
              onChange={(e) => handleSelect(e, type)}
            >
              {dataSource?.data?.results?.map((data: any) => (
                <MenuItem key={data?.source_name} value={data?.source_name}>
                  {data?.source_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (!isEditable && type === 'master') {
      return <TableCell align='center'>{row.master_name}</TableCell>;
    }
    if (isEditable && type === 'included') {
      return (
        <TableCell align='center' component='th' id={labelId} scope='row'>
          <FormControl className='selectClass'>
            {/* <InputLabel id='demo-simple-select-label'>Included</InputLabel> */}
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={isEdit.included}
              name='currency'
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem value='true'>YES</MenuItem>
              <MenuItem value='false'>NO</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'currency') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={isEdit.currency}
              name='currency'
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem value='CAD'>CAD</MenuItem>
              <MenuItem value='EUR'>EUR</MenuItem>
              <MenuItem value='GBP'>GBP</MenuItem>
              <MenuItem value='INR'>INR</MenuItem>
              <MenuItem value='USD'>USD</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'impression_value') {
      return (
        <TableCell align='center'>
          <TextField
            id='impression'
            type='number'
            value={isEdit[type]}
            name={type}
            onChange={(e) => onChange(e, type)}
            InputLabelProps={{
              shrink: true
            }}
            variant='standard'
          />
        </TableCell>
      );
    }
    if (isEditable && type === 'fee_setting') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select-fee_setting'
              value={isEdit[type]}
              name={type}
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem value='fixed'>FIXED</MenuItem>
              <MenuItem value='variable'>VARIABLE</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'billing_month') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select-fee_setting'
              value={isEdit[type]}
              name={type}
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem key='Separate-months' value={1}>
                Separate months
              </MenuItem>
              <MenuItem key='first-monday' value={2}>
                1st monday to next month 1st sunday
              </MenuItem>
              <MenuItem key='first-sunday' value={3}>
                1st sunday to next month 1st saturday
              </MenuItem>
              <MenuItem key='last sunday' value={4}>
                Last month last monday to last sunday
              </MenuItem>
              <MenuItem key='last saturday' value={5}>
                Last month last sunday to last saturday
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'advance_frequency') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select-fee_setting'
              value={isEdit[type]}
              name={type}
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem key='no-value-daily' value='daily'>
                Daily
              </MenuItem>
              <MenuItem key='no-value-twice_a_week' value='twice_a_week'>
                Twice a week
              </MenuItem>
              <MenuItem key='no-value-weekly' value='weekly'>
                Weekly
              </MenuItem>
              <MenuItem key='no-value-two_weekly' value='two_weekly'>
                Two Weekly
              </MenuItem>
              <MenuItem key='no-value-monthly' value='monthly'>
                Monthly
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'week_start_day') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select-fee_setting'
              value={isEdit[type]}
              name={type}
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem key='no-value-status' value={0}>
                Monday
              </MenuItem>
              <MenuItem key='no-value-status' value={5}>
                Saturday
              </MenuItem>
              <MenuItem key='no-value-status' value={6}>
                Sunday
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'week_start_day_two') {
      return (
        <TableCell align='center'>
          <FormControl className='selectClass'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select-fee_setting'
              value={isEdit[type]}
              name={type}
              onChange={(e) => handleSelect(e, type)}
            >
              <MenuItem key='no-value-status' value={1}>
                Tuesday
              </MenuItem>
              <MenuItem key='no-value-status' value={2}>
                Wednesday
              </MenuItem>
              <MenuItem key='no-value-status' value={3}>
                Thursday
              </MenuItem>
              <MenuItem key='no-value-status' value={4}>
                Friday
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      );
    }
    if (isEditable && type === 'bi_weekly_start_date') {
      return (
        <TableCell align='center' style={{ minWidth: '100px' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className='twoWeekly'
              margin='normal'
              id='date-picker-dialog'
              format='dd/MM/yyyy'
              value={isEdit[type]}
              onChange={(e) => handleDate(e, type)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </TableCell>
      );
    }

    return (
      <TableCell align='center'>
        {isEditable ? (
          <TextField
            id='outlined-number'
            type='text'
            value={isEdit[type]}
            name={type}
            onChange={(e) => onChange(e, type)}
            InputLabelProps={{
              shrink: true
            }}
            variant='standard'
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
    setSelected([]);
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
    console.log('block pressed');
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
    console.log('check pressed');
    isUpdateAndDelete.current.isActive = true;
    dispatch({
      type: 'UPDATE_REVENUE_SOURCE',
      payload: {
        ...isEdit,
        master: revenueSourceMasterList?.data.find((r: any) => r.name === inputValue)
          ? revenueSourceMasterList?.data.find((r: any) => r.name === inputValue).uuid
          : isEdit.master,
        customer: updateRevenueSource?.data?.customer
      }
    });
  };

  // Handle delete api
  const handleDelete = () => {
    setIsLoading(true);
    isUpdateAndDelete.current.isActive = true;
    dispatch({
      type: 'DELETE_REVENUE_SOURCE',
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
    setSelected([]);
    setOpen(true);
  };

  // Handle Test Send
  const handleTest = (row: any, id: number) => {
    eventClick.current.value = 'revenue_test';
    dispatch({
      type: 'REVENUE_SOURCE_CALCULATION_TEST',
      payload: {
        id: row.uuid
      }
    });
  };

  // Handle handleMasterChange On Change
  const handleMasterChange = (e: any) => {
    setMasterRevenue({
      ...masterRevenue,
      [e.target.name]: e.target.value
    });
  };

  // Handle checkbox select
  const handleCheckbox = (id: string) => {
    let newArray = [...selected];
    if (!newArray.includes(id)) {
      newArray = [...newArray, id];
      setSelected(newArray);
    } else {
      const index = newArray.indexOf(id);
      newArray.splice(index, 1);
      setSelected(newArray);
    }
    updateSelectedCheckbox(newArray);
  };

  // Handle all select Checkbox
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uuid);
      updateSelectedCheckbox(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    updateSelectedCheckbox([]);
  };

  // Handle all select Checkbox
  const handleDate = (date: Date | null, type: any) => {
    const item = {
      ...isEdit,
      [type]: date ? moment(date).format('YYYY-MM-DD') : null
    };
    setIsEdit(item);
  };

  // handle handleCloseModal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // // handleAddRevenueMaster
  // const handleAddRevenueMaster = () => {
  //   setIsMasterLoader(true);
  //   eventClick.current.value = 'add_master_revenue';
  //   dispatch({
  //     type: 'ADD_REVENUE_SOURCE_MASTER',
  //     payload: {
  //       name: inputValue
  //     }
  //   });
  // };

  // Validation of master fields
  const handleMasterValidate = () => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate({ ...masterRevenue }, masterValidationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // handleAddRevenueMaster
  const handleAddRevenueMaster = () => {
    setIsMasterModal(true);
  };

  // handleMasterRevenueConfirm confirm button
  const handleMasterRevenueConfirm = () => {
    if (handleMasterValidate()) {
      setIsMasterLoader(true);
      eventClick.current.value = 'add_master_revenue';
      dispatch({
        type: 'ADD_REVENUE_SOURCE_MASTER',
        payload: masterRevenue
      });
    }
  };

  const classes = useStyles();
  return (
    <>
      <StyledTableWrap>
        {isLoading && <Loader />}
        {!isLoading && (
          <TableContainer>
            <Table
              stickyHeader
              aria-labelledby='tableTitle'
              size='small'
              aria-label='enhanced table'
            >
              <EnhancedTableHead
                numSelected={selected.length}
                rowCount={rows.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {rows.length
                  ? rows.map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isEditable =
                        Object.keys(isEdit).length && isEdit.uuid === row.uuid ? true : false;
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={selected.includes(row.uuid)}
                              onChange={() => handleCheckbox(row.uuid)}
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                          </TableCell>

                          {CustomTableCell(
                            row,
                            row.customer_name ? row.customer_name : '-',
                            'customer_name',
                            labelId,
                            true,
                            isEditable
                          )}

                          {CustomTableCell(
                            row,
                            row.name ? row.name : '-',
                            'name',
                            labelId,
                            true,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.master ? row.master : '-',
                            'master',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.data_source_name ? row.data_source_name : 'Factor Invoice',
                            'data_source_name',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.currency ? row.currency : '-',
                            'currency',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.impression_value ? Number(row.impression_value).toFixed(2) : '-',
                            'impression_value',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.included ? (row.included === true ? 'YES' : 'NO') : '-',
                            'included',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.created_at ? moment(row.created_at).format('DD/MM/YYYY') : '-',
                            'created_at',
                            labelId,
                            false,
                            false
                          )}
                          {CustomTableCell(
                            row,
                            row.revenue_calculations ? row.revenue_calculations : '-',
                            'revenue_calculations',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.api_revenue_calculations ? row.api_revenue_calculations : '-',
                            'api_revenue_calculations',
                            labelId,
                            false,
                            isEditable
                          )}

                          {CustomTableCell(
                            row,
                            row.sales_tax ? `${Number(row.sales_tax).toFixed(2)} %` : '-',

                            'sales_tax',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.daily_advance_fee
                              ? `${Number(row.daily_advance_fee).toFixed(2)} %`
                              : '-',
                            'daily_advance_fee',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.haircut ? `${Number(row.haircut).toFixed(2)} %` : '-',
                            'haircut',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.payment_terms ? row.payment_terms : '-',
                            'payment_terms',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.payout_time ? row.payout_time : '-',
                            'payout_time',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.closing_days ? row.closing_days : '-',
                            'closing_days',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.fee_setting ? row.fee_setting : '-',
                            'fee_setting',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.advance_frequency ? row.advance_frequency : '-',
                            'advance_frequency',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.invoice_matching_rule ? row.invoice_matching_rule : '-',
                            'invoice_matching_rule',
                            labelId,
                            true,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.investigation_days ? row.investigation_days : '-',
                            'investigation_days',
                            labelId,
                            true,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.billing_month ? row.billing_month : '-',
                            'billing_month',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.week_start_day ? row.week_start_day : '-',
                            'week_start_day',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.week_start_day_two ? row.week_start_day_two : '-',
                            'week_start_day_two',
                            labelId,
                            false,
                            isEditable
                          )}
                          {CustomTableCell(
                            row,
                            row.bi_weekly_start_date
                              ? moment(row.bi_weekly_start_date).format('DD/MM/YYYY')
                              : '-',
                            'bi_weekly_start_date',
                            labelId,
                            false,
                            isEditable
                          )}
                          <TableCell align='center'>
                            {isEdit?.uuid !== row.uuid || Object.keys(isEdit).length === 0 ? (
                              <StyledBox>
                                <TableCell align='right'>
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
                                  <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleTest(row, row.id)}
                                  >
                                    Test
                                  </Button>
                                </TableCell>
                              </StyledBox>
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
        {revenueSourceList?.data?.results.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={revenueSourceList?.data?.count}
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
          <DialogTitle id='alert-dialog-title'>Revenue Source Delete Confirmation</DialogTitle>
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
        <StyledDialog
          fullScreen={fullScreen}
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogContentWrapper>
            <DialogTitle id='responsive-dialog-title'>Calculation Test Data</DialogTitle>
            <DialogContent>
              <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    {calculationTest && calculationTest?.data?.column
                      ? calculationTest.data.column.map((item: any) => (
                          // eslint-disable-next-line react/jsx-indent
                          <StyledTableCell key={item}>{item.key}</StyledTableCell>
                          // eslint-disable-next-line @typescript-eslint/indent
                        ))
                      : ''}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {calculationTest && calculationTest?.data?.column
                      ? calculationTest.data.column.map((item: any) => (
                          // eslint-disable-next-line react/jsx-indent
                          <StyledTableCell key={item}>{item.value}</StyledTableCell>
                          // eslint-disable-next-line @typescript-eslint/indent
                        ))
                      : ''}
                  </StyledTableRow>
                </TableBody>
              </Table>
              <Typography>
                <ModalTextBox>
                  <p>
                    <span>Calculation:</span>
                    {calculationTest && calculationTest?.data?.calculation
                      ? calculationTest.data.calculation
                      : ''}
                  </p>
                  <p>
                    <span>Revenue:</span>
                    {calculationTest && calculationTest?.data?.revenue
                      ? calculationTest.data.revenue
                      : ''}
                  </p>
                </ModalTextBox>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseModal} color='secondary'>
                Close
              </Button>
            </DialogActions>
          </DialogContentWrapper>
        </StyledDialog>
      </StyledTableWrap>
      <StyledDialog
        fullScreen={fullScreen}
        open={isMasterModal}
        onClose={handleMasterClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentWrapper>
          <DialogTitle id='responsive-dialog-title'>Add New Master Revenue Source</DialogTitle>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Master Revenue'
                  value={masterRevenue.masterName}
                  placeholder='Enter master revenue name'
                  multiline
                  variant='outlined'
                  name='masterName'
                  onChange={(e) => handleMasterChange(e)}
                  error={error.masterName ? true : false}
                  helperText={error.masterName ? error.masterName : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={masterRevenue.countryCode}
                    onChange={(e) => handleMasterChange(e)}
                    label='Country'
                    name='countryCode'
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
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='City'
                  value={masterRevenue.city}
                  placeholder='Enter city name'
                  multiline
                  variant='outlined'
                  name='city'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Company Number'
                  value={masterRevenue.companyNo}
                  placeholder='Enter Company number'
                  multiline
                  variant='outlined'
                  name='companyNo'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Address'
                  value={masterRevenue.addressOne}
                  placeholder='Enter address'
                  multiline
                  variant='outlined'
                  name='addressOne'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Sub address'
                  value={masterRevenue.addressTwo}
                  placeholder='Enter sub address'
                  multiline
                  variant='outlined'
                  name='addressTwo'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Post Code'
                  value={masterRevenue.postcode}
                  placeholder='Enter postcode'
                  multiline
                  variant='outlined'
                  name='postcode'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMasterClose} color='primary' autoFocus>
              Cancel
            </Button>
            <Button onClick={handleMasterRevenueConfirm} color='primary' autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </DialogContentWrapper>
      </StyledDialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  updateRevenueSource: state.updateRevenueSource.data,
  deleteRevenueSource: state.deleteRevenueSource.data,
  calculationTest: state.calculationTest.data,
  customerData: state.customerList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  addRevenueSourceMaster: state.addRevenueSourceMaster.data,
  dataSource: state.dataSource.data
});

export default connect(mapStateToProps)(RevenueSourceSection);
