import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Breadcumb from '../../../components/Breadcumb';
import Loader from '../../../components/Loader';
import EmailDataTable from './BillingTable';
import validationRules from './BillingValidate';
import { validate } from '../../../utils/helper';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  StyledFormControl,
  StyledGrid,
  StyledTextField
} from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  billingMonthList: {
    data: any;
    status: string;
  };
  exportBillingMonthCsv: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

// Error Interface
interface IError {
  payoutTimes?: number;
  closingTime?: number;
}

const BillingMonth: React.FC<IProps> = ({
  dispatch,
  billingMonthList,
  exportBillingMonthCsv
}: IProps) => {
  const [billingMonth, setBillingMonth] = useState(1);
  const [frequency, setFrequency] = useState('daily');
  const [error, setError] = useState<IError>({});
  const [weekdays, setWeekDays] = useState(0);
  const [weekdayTwo, setWeekdayTwo] = useState('');
  const [payoutTimes, setPayoutTimes] = React.useState(1);
  const [closingTime, setClosingTime] = React.useState(1);
  const [biWeeklyStartDate, setBiWeeklyStartDate] = useState<Date | string | null>(
    moment().format('YYYY-MM-DD')
  );
  const [startDate, setStartDate] = useState<Date | string | null>(
    moment().subtract(1, 'months').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<Date | string | null>(moment().format('YYYY-MM-DD'));
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();
  const [calendar, setCalendar] = useState('');
  const newDate = new Date();
  const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  // const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

  const prevMonthFirstDate = new Date(
    newDate.getFullYear() - (newDate.getMonth() > 0 ? 0 : 1),
    (newDate.getMonth() - 1 + 12) % 12,
    1
  );
  const prevMonthLastDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // billingMonthList updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [billingMonthList]);

  // Calling Revenue list api
  useEffect(() => {
    // Calling api only if api return with success response
    // Call initial api when initial page load and set DataSource
    if (initialRender.current.initial) {
      // Get email metadata list api call
      dispatch({
        type: 'GET_BILLING_MONTHS',
        payload: {
          billingMonth,
          frequency,
          weekdays,
          payoutTimes,
          startDate,
          endDate,
          weekdayTwo,
          biWeeklyStartDate,
          closingTime
        }
      });
      setTimeout(() => {
        initialRender.current.initial = false;
      });
    } else {
      !initialRender.current.initial &&
        dispatch({
          type: 'GET_BILLING_MONTHS',
          payload: {
            billingMonth,
            frequency,
            weekdays,
            payoutTimes,
            startDate,
            endDate,
            weekdayTwo,
            biWeeklyStartDate,
            closingTime
          }
        });
    }
  }, [
    frequency,
    billingMonth,
    dispatch,
    endDate,
    startDate,
    weekdays,
    payoutTimes,
    weekdayTwo,
    biWeeklyStartDate,
    closingTime
  ]);

  // Handle handleCalendar
  const handleCalendar = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'month_to_date') {
      setStartDate(moment(firstDay).format('YYYY-MM-DD'));
      setEndDate(moment(newDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === 'last_month') {
      setStartDate(moment(prevMonthFirstDate).format('YYYY-MM-DD'));
      setEndDate(moment(prevMonthLastDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === '') {
      setStartDate(null);
      setEndDate(null);
    }
    setCalendar(event.target.value as string);
  };

  // Handle start Date
  const handleStartDate = (date: Date | null) => {
    setIsLoading(true);
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleEndDate = (date: Date | null) => {
    setIsLoading(true);
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle Bi Weekly Date
  const handleBiWeeklyDate = (date: Date | null) => {
    setIsLoading(true);
    setBiWeeklyStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle Data Source
  const handleChangeDatasource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setBillingMonth(event.target.value as number);
  };

  // Handle Frequency
  const handleChangeFrequency = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    if (event.target.value !== 'twice_a_week' && event.target.value !== 'two_weekly') {
      setWeekdayTwo('');
      setBiWeeklyStartDate(moment().format('YYYY-MM-DD'));
    } else if (event.target.value === 'twice_a_week') {
      setBiWeeklyStartDate(moment().format('YYYY-MM-DD'));
    } else {
      setWeekdayTwo('');
    }
    setFrequency(event.target.value as string);
  };

  // Handle handleChangeStatus
  const handleChangeStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setWeekDays(event.target.value as number);
  };

  // Handle handleChangeWeekDayTwoStatus
  const handleChangeWeekDayTwoStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setWeekdayTwo(event.target.value as any);
  };

  // Validation of user fields
  const handleValidate = (value: any) => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate({ payoutTimes: value }, validationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setPayoutTimes(e.target.value);
    if (handleValidate(e.target.value)) {
      // eslint-disable-next-line no-console
      console.log('');
    }
  };

  // Handle On Change
  const handleClosingTime = (e: any) => {
    setClosingTime(e.target.value);
    if (handleValidate(e.target.value)) {
      // eslint-disable-next-line no-console
      console.log('');
    }
  };

  // Handle handleExportCsv
  const handleExportCsv = () => {
    eventClick.current.value = 'export_billing_month_csv';
    dispatch({
      type: 'EXPORT_BILLING_MONTH_CSV',
      payload: {
        billingMonth,
        frequency,
        weekdays,
        payoutTimes,
        startDate,
        endDate,
        weekdayTwo,
        biWeeklyStartDate,
        closingTime
      }
    });
  };

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        exportBillingMonthCsv.message.data
          ? exportBillingMonthCsv.message.data
          : exportBillingMonthCsv.message,
        {
          variant
        }
      );
    };

    if (
      exportBillingMonthCsv?.status === 'success' &&
      eventClick.current.value === 'export_billing_month_csv'
    ) {
      window.location.href = exportBillingMonthCsv?.data?.file_path;
    }
    if (
      exportBillingMonthCsv?.status === 'failure' &&
      eventClick.current.value === 'export_billing_month_csv'
    ) {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [exportBillingMonthCsv, enqueueSnackbar, dispatch]);

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Transactional Invoices',
            data: ['Transactional Invoices', 'Billing Calender']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Calendar Settings</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={calendar}
                  onChange={handleCalendar}
                  label='Status'
                >
                  <MenuItem key='no-value-status-no' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-status' value='month_to_date'>
                    Month to date
                  </MenuItem>
                  <MenuItem key='no-value-status' value='last_month'>
                    Last month
                  </MenuItem>
                  <MenuItem key='no-value-status' value='custom'>
                    Custom
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            {calendar === 'month_to_date' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={firstDay}
                    onChange={handleStartDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='To'
                    format='dd/MM/yyyy'
                    value={newDate}
                    onChange={handleEndDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            {calendar === 'last_month' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={prevMonthFirstDate}
                    onChange={handleStartDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='To'
                    format='dd/MM/yyyy'
                    value={prevMonthLastDate}
                    onChange={handleEndDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            {calendar === 'custom' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={startDate}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='To'
                    format='dd/MM/yyyy'
                    value={endDate}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            <StyledGrid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Billing Month</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={billingMonth}
                  onChange={handleChangeDatasource}
                  label='Data Source'
                >
                  <MenuItem key='Separate-months' value={1}>
                    Calendar months
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
              </StyledFormControl>
            </StyledGrid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Frequency</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={frequency}
                  onChange={handleChangeFrequency}
                  label='Frequency'
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
              </StyledFormControl>
            </Grid>
            {frequency === 'twice_a_week' ? (
              <Grid item xs={12} sm={4}>
                <StyledFormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Weekday Two</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={weekdayTwo}
                    onChange={handleChangeWeekDayTwoStatus}
                    label='weekdayTwo'
                  >
                    <MenuItem key='no-value-status' value=''>
                      All
                    </MenuItem>
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
                </StyledFormControl>
              </Grid>
            ) : (
              ''
            )}
            {frequency === 'two_weekly' ? (
              <StyledGrid item xs={12} sm={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className='twoWeekly'
                    margin='normal'
                    id='date-picker-dialog'
                    label='Bi Weekly Start Date'
                    format='dd/MM/yyyy'
                    value={biWeeklyStartDate}
                    onChange={handleBiWeeklyDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </StyledGrid>
            ) : (
              ''
            )}
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>WeekDays</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={weekdays}
                  onChange={handleChangeStatus}
                  label='WeekDays'
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
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                id='outlined-textarea'
                label='Payout time in days'
                value={payoutTimes}
                placeholder='Payout Times in days'
                multiline
                variant='outlined'
                name='payoutTimes'
                onChange={(e) => handleChange(e)}
                error={error.payoutTimes ? true : false}
                helperText={error.payoutTimes ? error.payoutTimes : ''}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                id='outlined-textarea'
                label='Closing time in days'
                value={closingTime}
                placeholder='Closing Time in days'
                multiline
                variant='outlined'
                name='closingTime'
                onChange={(e) => handleClosingTime(e)}
                error={error.closingTime ? true : false}
                helperText={error.closingTime ? error.closingTime : ''}
              />
            </Grid>
            <StyledGrid item xs={12} sm={4}>
              <Button variant='contained' color='primary' onClick={handleExportCsv}>
                Export as a Csv
              </Button>
            </StyledGrid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? <Loader /> : <EmailDataTable billingMonthList={billingMonthList} />}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  billingMonthList: state.billingMonthList.data,
  exportBillingMonthCsv: state.exportBillingMonthCsv.data
});

export default connect(mapStateToProps)(BillingMonth);
