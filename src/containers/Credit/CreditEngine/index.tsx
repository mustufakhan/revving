/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Typography,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Checkbox
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import { Edit, Flag, SyncDisabled, Done } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useSnackbar } from 'notistack';
import Validator from 'validator';
import Breadcumb from '../../../components/Breadcumb';
import { MainContentWrapper } from '../../Ingestion/Customers/Styled';
import {
  ContentBoxWrapper,
  FormBoxWrapper,
  StyledDialog,
  StyledFormControl,
  ButtonWrapper,
  FormControlWrapper
} from './Styled';

// User form style theme object
const useStyles = makeStyles(() => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  headingCont: {
    height: '35px',
    width: '100%',
    borderBottom: '1px solid black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  formBoxWrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '5px'
  },
  formBoxWrap1: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '5px',
    width: '35%'
  },
  InputLabels: {
    fontSize: '12px',
    width: '130px',
    padding: '5px',
    fontWeight: 'bold',
    color: 'black'
  },
  InputBases: {
    fontSize: '12px',
    border: '2px solid gray',
    padding: '5px',
    marginRight: '5px'
  },
  paper: {
    border: '1.5px solid gray',
    borderRadius: '0px',
    padding: '5px',
    fontSize: '12px'
  },
  InputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '35px',
    marginRight: '5px'
  },
  InputA_D: {
    fontSize: '12px',
    border: '2px solid gray',
    width: '100%',
    padding: '5px'
  },
  DemoInputLabel: {
    fontSize: '12px',
    width: '129px',
    padding: '5px',
    fontWeight: 'bold',
    color: 'black'
  },
  StyledFormBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '5px'
  },
  StyledSpan: {
    fontSize: '12px',
    fontWeight: 'bold',
    width: '50px',
    marginLeft: '10px'
  },
  StyledButton: {
    width: '25%',
    fontSize: '10px',
    textTransform: 'none',
    color: 'white'
    // background: 'rgb(14, 134, 212)'
  },
  MainButton: {
    background: '#0E86D4',
    color: 'white',
    width: '190px',
    marginLeft: '11px'
  },
  Divbox: {
    width: '23px',
    height: '30px',
    borderRadius: '50%',
    transform: 'rotate(90deg)',
    backgroundColor: 'red'
  },
  inputSelect: {
    width: '100px',
    height: '30px',
    marginTop: '5px',
    borderRadius: '0px',
    fontSize: '10px'
  },
  dropdownUl: {
    width: '100%',
    zIndex: 9999
  },
  dropdownScroll: {
    width: '100%',
    zIndex: 9999,
    minHeight: '150px',
    overflow: 'auto'
  },
  dropdownScrollModal: {
    width: '100%',
    zIndex: 9999,
    height: '150px',
    overflow: 'auto'
  },
  dropdownLi: {
    padding: '0.5rem',
    background: 'white',
    color: 'black',
    listStyle: 'none',
    borderBottom: '1px solid gray',
    cursor: 'pointer'
  }
}));

// Props Interface
interface IProps {
  dispatch: Function;
  retriveInfoReducer: {
    data: any;
    status: string;
    message: any;
  };
  obligorRetriveInfo: {
    data: any;
    status: string;
    message: any;
  };
  creditAssessmentReducer: {
    data: any;
    status: string;
  };
  cccListInfo: {
    data: any;
    status: string;
  };
  editCustomer: {
    data: any;
    status: string;
  };
  addCustomer: {
    data: any;
    status: string;
  };
  parentRetriveInfo: {
    data: any;
    status: string;
    message: any;
  };
  parentEditCustomer: {
    data: any;
    status: string;
  };
  parentAddCustomer: {
    data: any;
    status: string;
  };
  editObligor: {
    data: any;
    status: string;
  };
  addObligor: {
    data: any;
    status: string;
  };
  oblParRetrieveInfo: {
    data: any;
    status: string;
    message: any;
  };
  oblParEditReducer: {
    data: any;
    status: string;
  };
  categoriesList: {
    data: any;
    status: string;
  };
}

const CreditEngine: React.FC<IProps> = ({
  dispatch,
  retriveInfoReducer,
  obligorRetriveInfo,
  creditAssessmentReducer,
  cccListInfo,
  editCustomer,
  addCustomer,
  parentRetriveInfo,
  parentEditCustomer,
  parentAddCustomer,
  editObligor,
  addObligor,
  oblParRetrieveInfo,
  oblParEditReducer,
  categoriesList
}: IProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [parentAnchor, setParentAnchor] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [countryList, setCountryList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  console.log('categoryList', categoryList);
  const [companyNo, setCompanyNo] = useState(null);
  const [safeNo, setSafeNo] = useState(null);
  const [cusStatus, setCusStatus] = useState('');
  const [parCusStatus, setParCusStatus] = useState('');
  const [country, setCountry] = useState(null);
  const [parentCompanyNo, setParentCompanyNo] = useState('');
  const [parentSafeNo, setParentSafeNo] = useState(null);
  const [parentCountry, setParentCountry] = useState(null);
  const [riskTransChild, setRiskTransChild] = useState<any[]>([]);
  const [riskTransferParent, setRiskTransferParent] = useState<any>({});
  const [cuid, setCuid] = useState(null);
  const [parCuid, setParCuid] = useState(null);
  const [accStatus, setAccStatus] = useState('');
  console.log('accStatus', accStatus);
  const [realTime, setRealTime] = useState(false);
  const [disable, setDisable] = useState(true);
  const [errCompName, setErrCompName] = useState('');
  const [errCompAdd, setErrCompAdd] = useState('');
  const [errCompCat, setErrCompCat] = useState('');
  const [parName, setParName] = useState<any>(null);
  const [cusCurrency, setCusCurrency] = useState('GBP');
  const [cusDropdown, setCusDropDown] = useState(false);
  console.log('cusDropdown', cusDropdown);
  const [parCusDropdown, setParCusDropDown] = useState(false);
  const remove_parent = true;
  const [creditData, setCreditData] = useState<any>({
    creditSafeScore: '',
    accountingPeriod: '',
    creditSafeLimit: '',
    creditSafeCurrency: '',
    totalAssets: '',
    totalLiabilities: '',
    netIncome: '',
    inCorporationDate: '',
    operatingProfit: '',
    currency: '',
    directorCcj: '',
    fillingDate: '',
    freeCashflowLimit: '',
    operatingMargin: '',
    quickRatio: '',
    recoveryLimit: '',
    revenue: '',
    freeCashFlow: '',
    revvingLimit: '',
    turnover: '',
    lastUpdate: '',
    oblName: '',
    regNo: ''
  });
  console.log('creditData', creditData);
  // obl part
  const [oblCompanyName, setoblCompanyName] = useState(null);
  const [oblCountry, setOblCountry] = useState(null);
  const [oblSafeNo, setOblSafeNo] = useState(null);
  const [oblRiskTransChild, setOblRiskTransChild] = useState<any[]>([]);
  const [oblRiskTransferParent, setOblRiskTransferParent] = useState<any>({});
  console.log('oblRiskTransferParent', oblRiskTransferParent);
  const [oblUuid, setOblUuid] = useState(null);
  const [oblName, setOblName] = useState('');
  const [oblAddress, setOblAddress] = useState('');
  const [oblStatus, setOblStatus] = useState('');
  const [oblDisable, setOblDisable] = useState(true);
  const [oblCat, setOblCat] = useState('');
  const [oblAnchorEl, setOblAnchorEl] = React.useState(false);
  const [oblErrCompName, setOblErrCompName] = useState('');
  const [oblErrCompAdd, setOblErrCompAdd] = useState('');
  const [oblErrCompCat, setOblErrCompCat] = useState('');
  const [oblOpen, setOblOpen] = useState(false);
  const [oblParentName, setOblParentName] = useState('');
  const [oblParentCategory, setOblParentCategory] = useState('');
  const [oblParentAddress, setOblParentAddress] = useState('');
  const [oblParentCompanyNo, setOblParentCompanyNo] = useState('');
  const [oblParentSafeNo, setOblParentSafeNo] = useState(null);
  const [oblParentCountry, setOblParentCountry] = useState(null);
  const [oblParUuid, setOblParUuid] = useState(null);
  const [oblParentAnchor, setOblParentAnchor] = useState(false);
  const [oblParCusStatus, setOblParCusStatus] = useState('');
  const [oblChecked, setOblChecked] = React.useState(false);
  const [oblRealTime, setOblRealTime] = useState(false);
  const [oblHomeCurr, setOblHomeCurr] = useState('');
  const [oblCurrency, setOblCurrency] = useState('GBP');
  const [oblDropdown, setOblDropDown] = useState(false);
  const [oblParDrop, setOblParDrop] = useState(false);
  const [oblAccStatus, setOblAccStatus] = useState('');
  console.log('oblAccStatus', oblAccStatus);
  const [oblCreditData, setOblCreditData] = useState<any>({
    oblCreditSafeScore: '',
    oblAccountingPeriod: '',
    oblCreditSafeLimit: '',
    oblCreditSafeCurrency: '',
    OblTotalAssets: '',
    onlTotalLiabilities: '',
    oblNetIncome: '',
    oblInCorporationDate: '',
    oblOperatingProfit: '',
    oblCurrency: '',
    oblDirectorCcj: '',
    oblFillingDate: '',
    oblFreeCashflowLimit: '',
    oblOperatingMargin: '',
    oblQuickRatio: '',
    oblRecoveryLimit: '',
    oblRevenue: '',
    oblName: '',
    regNo: ''
  });
  console.log('oblCreditData', oblCreditData);
  const unknownstatus = 'registered';
  const is_risk_transfer = true;
  const is_transfer = false;

  const handleClose = () => {
    setParentAnchor(false);
    setOpen(false);
    setParentCompanyNo('');
    setParentAddress('');
    setParentName('');
    setParentCategory('');
    setParentCountry(null);
    setParCusStatus('');
  };

  const handleChecked = (event: any) => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      setRealTime(true);
    } else {
      setRealTime(false);
    }
  }, [checked]);

  useEffect(() => {
    if (retriveInfoReducer?.message?.code == 404) {
      setDisable(true);
    }
  }, [retriveInfoReducer?.message]);

  const hancleCompanyNo = (e: any) => {
    setCompanyNo(e.target.value);
  };

  const handleSafeNo = (e: any) => {
    setSafeNo(e.target.value);
  };

  const handleCountry = (event: any) => {
    setCountry(event.target.value);
  };

  const handleCountryName = (data: any) => {
    setCountry(data);
  };

  const handleParCompanyNo = (e: any) => {
    setParentCompanyNo(e.target.value);
  };

  const handleParSafeNo = (e: any) => {
    setParentSafeNo(e.target.value);
  };

  const handleParCountry = (e: any) => {
    setParentCountry(e.target.value);
  };

  const handleRetrive = () => {
    dispatch({
      type: 'RETRIVE_INFO',
      payload: {
        companyNo,
        country,
        safeNo
      }
    });
  };

  const handleParRetrive = () => {
    dispatch({
      type: 'PARENT_RETRIVE_INFO',
      payload: {
        parentCompanyNo,
        parentCountry,
        parentSafeNo
      }
    });
  };

  const handleAssessment = () => {
    const is_client = true;
    dispatch({
      type: 'PRE_ASSESSMENT',
      payload: {
        companyNo,
        country,
        is_client,
        realTime,
        safeNo
      }
    });
  };

  const handleOblAssessment = () => {
    const is_client = false;
    dispatch({
      type: 'PRE_ASSESSMENT',
      payload: {
        oblCompanyName,
        oblCountry,
        oblSafeNo,
        is_client,
        oblRealTime
      }
    });
  };

  const handleClick = () => {
    // eslint-disable-next-line no-constant-condition
    if (
      retriveInfoReducer?.data?.status == 'registered' ||
      retriveInfoReducer?.message?.code == 404
    )
      setAnchorEl(!anchorEl);
  };

  useEffect(() => {
    if (anchorEl) {
      Validator.isEmpty(name) ? setErrCompName('Enter Company Name') : setErrCompName('');
      Validator.isEmpty(address) ? setErrCompAdd('Enter Address') : setErrCompAdd('');
      Validator.isEmpty(category) ? setErrCompCat('Enter Category') : setErrCompCat('');
    }
  }, [anchorEl, name, errCompAdd, address, category, errCompCat]);

  useEffect(() => {
    if (retriveInfoReducer?.data) {
      setRiskTransChild(retriveInfoReducer?.data?.customer_risk_transfer_children);
      setRiskTransferParent(retriveInfoReducer?.data?.customer_risk_transfer);
      setParentName(retriveInfoReducer?.data?.customer_risk_transfer?.name);
      setName(retriveInfoReducer?.data?.name);
      setAddress(retriveInfoReducer?.data?.address_one);
      setCategory(retriveInfoReducer?.data?.company_category);
      setCuid(retriveInfoReducer?.data?.cuid);
    }
  }, [retriveInfoReducer?.data]);

  useEffect(() => {
    if (riskTransferParent) {
      setParentCompanyNo(riskTransferParent?.company_number);
      setParentCountry(riskTransferParent?.country_code);
      setParentSafeNo(riskTransferParent?.safe_number);
      // setParentName(riskTransferParent?.name);
      setParentAddress(riskTransferParent?.address_one);
      setParentCategory(riskTransferParent?.company_category);
      setParCusStatus(riskTransferParent?.status);
      setParCuid(riskTransferParent?.cuid);
    }
  }, [riskTransferParent]);

  useEffect(() => {
    if (retriveInfoReducer?.message?.code == 404) {
      setCusStatus('unknown');
      setName('');
      setAddress('');
      setCategory('');
      setRiskTransferParent({});
      setParentName('');
      setRiskTransChild([]);
    }
    if (retriveInfoReducer?.data) {
      setCusStatus(retriveInfoReducer?.data?.status);
      setDisable(false);
    }
  }, [retriveInfoReducer]);

  useEffect(() => {
    if (parentRetriveInfo?.message?.code == 404) {
      setParCusStatus('unknown');
      setParentName('');
      setParentAddress('');
      setParentCategory('');
      setParCuid(null);
    }
    if (parentRetriveInfo?.data) {
      setParCusStatus(parentRetriveInfo?.data?.status);
      setParentName(parentRetriveInfo?.data?.name);
      setParentAddress(parentRetriveInfo?.data?.address_one);
      setParentCategory(parentRetriveInfo?.data?.company_category);
      setParCuid(parentRetriveInfo?.data?.cuid);
    }
  }, [parentRetriveInfo]);

  useEffect(() => {
    if (
      creditAssessmentReducer?.status === 'success' &&
      creditAssessmentReducer?.data?.GBP?.entity?.accounting_data_output?.is_client === true
    ) {
      const data = creditAssessmentReducer?.data?.GBP?.entity;
      setCreditData({
        creditSafeScore: data?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score,
        accountingPeriod: data?.accounting_data_output?.accounting_period,
        creditSafeLimit: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.value,
        creditSafeCurrency: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.currency,
        totalAssets: data?.accounting_data_output?.total_assets,
        totalLiabilities: data?.accounting_data_output?.total_liabilities,
        netIncome: data?.accounting_data_output?.net_income,
        inCorporationDate: data?.accounting_data_output?.incorporation_date,
        operatingProfit: data?.accounting_data_output?.operating_profit,
        currency: data?.accounting_data_output?.home_currency,
        directorCcj: data?.accounting_data_output?.directors_ccj_summary?.exactRegistered,
        fillingDate: data?.accounting_data_output?.filing_date,
        freeCashflowLimit: data?.analysis_data_output?.free_cash_flow_limit,
        operatingMargin: data?.accounting_flags?.operating_margin?.operating_margin,
        quickRatio: data?.accounting_flags?.quick_ratio?.quick_ratio,
        recoveryLimit: data?.analysis_data_output?.recovery_limit,
        revenue: data?.analysis_data_output?.revenue,
        freeCashFlow: data?.accounting_data_output?.free_cash_flow,
        revvingLimit: data?.analysis_data_output?.implied_limit,
        turnover: data?.accounting_data_output?.turnover,
        lastUpdate: data?.analysis_data_output?.date_run,
        creditSafeColor: data?.cs_status_analysis_flags?.credit_safe_score?.color,
        accFlagColor: data?.accounting_flags?.is_data_complete,
        directorCcjColor: data?.cs_status_analysis_flags?.directors_ccj_flag?.color,
        netIncomeColor: data?.accounting_flags?.net_income?.color,
        oprMarginColor: data?.accounting_flags?.operating_margin?.color,
        quickRatioColor: data?.accounting_flags?.quick_ratio?.color,
        oblName: data?.accounting_data_output?.obligor_name,
        regNo: data?.accounting_data_output?.registration_number
      });
      setAccStatus(
        creditAssessmentReducer?.data?.GBP?.entity?.accounting_flags?.is_data_complete == 'Green'
          ? 'Complete'
          : 'Incomplete'
      );
    } else {
      const data1 = creditAssessmentReducer?.data?.GBP?.entity;
      setOblCreditData({
        oblCreditSafeScore: data1?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score,
        oblAccountingPeriod: data1?.accounting_data_output?.accounting_period,
        oblCreditSafeLimit: data1?.accounting_data_output?.cs_credit_limit?.creditLimit?.value,
        oblCreditSafeCurrency:
          data1?.accounting_data_output?.cs_credit_limit?.creditLimit?.currency,
        oblTotalAssets: data1?.accounting_data_output?.total_assets,
        oblTotalLiabilities: data1?.accounting_data_output?.total_liabilities,
        oblNetIncome: data1?.accounting_data_output?.net_income,
        oblInCorporationDate: data1?.accounting_data_output?.incorporation_date,
        oblOperatingProfit: data1?.accounting_data_output?.operating_profit,
        oblCurrency: data1?.accounting_data_output?.home_currency,
        oblDirectorCcj: data1?.accounting_data_output?.directors_ccj_summary?.exactRegistered,
        oblFillingDate: data1?.accounting_data_output?.filing_date,
        oblFreeCashflowLimit: data1?.analysis_data_output?.free_cash_flow_limit,
        oblOperatingMargin: data1?.accounting_flags?.operating_margin?.operating_margin,
        oblQuickRatio: data1?.accounting_flags?.quick_ratio?.quick_ratio,
        oblRecoveryLimit: data1?.analysis_data_output?.recovery_limit,
        oblRevenue: data1?.analysis_data_output?.revenue,
        oblLastUpdate: data1?.analysis_data_output?.date_run,
        oblCreditSafeColor: data1?.cs_status_analysis_flags?.credit_safe_score?.color,
        oblAccFlagColor: data1?.accounting_flags?.is_data_complete,
        oblDirectorCcjColor: data1?.cs_status_analysis_flags?.directors_ccj_flag?.color,
        oblNetIncomeColor: data1?.accounting_flags?.net_income?.color,
        oblOprMarginColor: data1?.accounting_flags?.operating_margin?.color,
        oblQuickRatioColor: data1?.accounting_flags?.quick_ratio?.color,
        oblRevvingLimit: data1?.analysis_data_output?.implied_limit,
        oblAccStatus: data1?.accounting_flags?.is_data_complete,
        oblFreeCashFlow: data1?.accounting_data_output?.free_cash_flow,
        oblName: data1?.accounting_data_output?.obligor_name,
        regNo: data1?.accounting_data_output?.registration_number
      });
      setOblAccStatus(
        creditAssessmentReducer?.data?.GBP?.entity?.accounting_flags?.is_data_complete == 'Green'
          ? 'Complete'
          : 'Incomplete'
      );
    }
  }, [creditAssessmentReducer]);

  const handleCusCurrency = (event: React.ChangeEvent<{ value: any }>) => {
    const currency = event.target.value;
    setCusCurrency(currency);

    if (
      creditAssessmentReducer?.status === 'success' &&
      creditAssessmentReducer?.data?.GBP?.entity?.accounting_data_output?.is_client === true &&
      event.target.value === 'GBP'
    ) {
      const data = creditAssessmentReducer?.data?.GBP?.entity;
      setCreditData({
        creditSafeScore: data?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score,
        accountingPeriod: data?.accounting_data_output?.accounting_period,
        creditSafeLimit: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.value,
        creditSafeCurrency: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.currency,
        totalAssets: data?.accounting_data_output?.total_assets,
        totalLiabilities: data?.accounting_data_output?.total_liabilities,
        netIncome: data?.accounting_data_output?.net_income,
        inCorporationDate: data?.accounting_data_output?.incorporation_date,
        operatingProfit: data?.accounting_data_output?.operating_profit,
        currency: data?.accounting_data_output?.home_currency,
        directorCcj: data?.accounting_data_output?.directors_ccj_summary?.exactRegistered,
        fillingDate: data?.accounting_data_output?.filing_date,
        freeCashflowLimit: data?.analysis_data_output?.free_cash_flow_limit,
        operatingMargin: data?.accounting_flags?.operating_margin?.operating_margin,
        quickRatio: data?.accounting_flags?.quick_ratio?.quick_ratio,
        recoveryLimit: data?.analysis_data_output?.recovery_limit,
        revenue: data?.analysis_data_output?.revenue,
        freeCashFlow: data?.accounting_data_output?.free_cash_flow,
        revvingLimit: data?.analysis_data_output?.implied_limit,
        turnover: data?.accounting_data_output?.turnover,
        lastUpdate: data?.analysis_data_output?.date_run,
        creditSafeColor: data?.cs_status_analysis_flags?.credit_safe_score?.color,
        accFlagColor: data?.accounting_flags?.is_data_complete,
        directorCcjColor: data?.cs_status_analysis_flags?.directors_ccj_flag?.color,
        netIncomeColor: data?.accounting_flags?.net_income?.color,
        oprMarginColor: data?.accounting_flags?.operating_margin?.color,
        quickRatioColor: data?.accounting_flags?.quick_ratio?.color,
        oblName: data?.accounting_data_output?.obligor_name,
        regNo: data?.accounting_data_output?.registration_number
      });
      setAccStatus(
        creditAssessmentReducer?.data?.GBP?.entity?.accounting_flags?.is_data_complete == 'Green'
          ? 'Complete'
          : 'Incomplete'
      );
    }
    if (
      creditAssessmentReducer?.status === 'success' &&
      creditAssessmentReducer?.data?.home_currency?.entity?.accounting_data_output?.is_client ===
        true &&
      event.target.value == 'home_currency'
    ) {
      const data1 = creditAssessmentReducer?.data?.home_currency?.entity;
      setCreditData({
        creditSafeScore: data1?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score,
        accountingPeriod: data1?.accounting_data_output?.accounting_period,
        creditSafeLimit: data1?.accounting_data_output?.cs_credit_limit?.creditLimit?.value,
        creditSafeCurrency: data1?.accounting_data_output?.cs_credit_limit?.creditLimit?.currency,
        totalAssets: data1?.accounting_data_output?.total_assets,
        totalLiabilities: data1?.accounting_data_output?.total_liabilities,
        netIncome: data1?.accounting_data_output?.net_income,
        inCorporationDate: data1?.accounting_data_output?.incorporation_date,
        operatingProfit: data1?.accounting_data_output?.operating_profit,
        currency: data1?.accounting_data_output?.home_currency,
        directorCcj: data1?.accounting_data_output?.directors_ccj_summary?.exactRegistered,
        fillingDate: data1?.accounting_data_output?.filing_date,
        freeCashflowLimit: data1?.analysis_data_output?.free_cash_flow_limit,
        operatingMargin: data1?.accounting_flags?.operating_margin?.operating_margin,
        quickRatio: data1?.accounting_flags?.quick_ratio?.quick_ratio,
        recoveryLimit: data1?.analysis_data_output?.recovery_limit,
        revenue: data1?.analysis_data_output?.revenue,
        freeCashFlow: data1?.accounting_data_output?.free_cash_flow,
        revvingLimit: data1?.analysis_data_output?.implied_limit,
        turnover: data1?.accounting_data_output?.turnover,
        lastUpdate: data1?.analysis_data_output?.date_run,
        creditSafeColor: data1?.cs_status_analysis_flags?.credit_safe_score?.color,
        accFlagColor: data1?.accounting_flags?.is_data_complete,
        directorCcjColor: data1?.cs_status_analysis_flags?.directors_ccj_flag?.color,
        netIncomeColor: data1?.accounting_flags?.net_income?.color,
        oprMarginColor: data1?.accounting_flags?.operating_margin?.color,
        quickRatioColor: data1?.accounting_flags?.quick_ratio?.color,
        oblName: data1?.accounting_data_output?.obligor_name,
        regNo: data1?.accounting_data_output?.registration_number
      });
      setAccStatus(
        creditAssessmentReducer?.data?.home_currency?.entity?.accounting_flags?.is_data_complete ==
          'Green'
          ? 'Complete'
          : 'Incomplete'
      );
    }
  };

  const handleOblCurrency = (event: React.ChangeEvent<{ value: any }>) => {
    setOblCurrency(event.target.value);
    if (
      creditAssessmentReducer?.status === 'success' &&
      creditAssessmentReducer?.data?.GBP?.entity?.accounting_data_output?.is_client === false &&
      event.target.value === 'GBP'
    ) {
      const data = creditAssessmentReducer?.data?.GBP?.entity;
      setOblCreditData({
        oblCreditSafeScore: data?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score,
        oblAccountingPeriod: data?.accounting_data_output?.accounting_period,
        oblCreditSafeLimit: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.value,
        oblCreditSafeCurrency: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.currency,
        oblTotalAssets: data?.accounting_data_output?.total_assets,
        oblTotalLiabilities: data?.accounting_data_output?.total_liabilities,
        oblNetIncome: data?.accounting_data_output?.net_income,
        oblInCorporationDate: data?.accounting_data_output?.incorporation_date,
        oblOperatingProfit: data?.accounting_data_output?.operating_profit,
        oblCurrency: data?.accounting_data_output?.home_currency,
        oblDirectorCcj: data?.accounting_data_output?.directors_ccj_summary?.exactRegistered,
        oblFillingDate: data?.accounting_data_output?.filing_date,
        oblFreeCashflowLimit: data?.analysis_data_output?.free_cash_flow_limit,
        oblOperatingMargin: data?.accounting_flags?.operating_margin?.operating_margin,
        oblQuickRatio: data?.accounting_flags?.quick_ratio?.quick_ratio,
        oblRecoveryLimit: data?.analysis_data_output?.recovery_limit,
        oblRevenue: data?.analysis_data_output?.revenue,
        oblLastUpdate: data?.analysis_data_output?.date_run,
        oblCreditSafeColor: data?.cs_status_analysis_flags?.credit_safe_score?.color,
        oblAccFlagColor: data?.accounting_flags?.is_data_complete,
        oblDirectorCcjColor: data?.cs_status_analysis_flags?.directors_ccj_flag?.color,
        oblNetIncomeColor: data?.accounting_flags?.net_income?.color,
        oblOprMarginColor: data?.accounting_flags?.operating_margin?.color,
        oblQuickRatioColor: data?.accounting_flags?.quick_ratio?.color,
        oblRevvingLimit: data?.analysis_data_output?.implied_limit,
        oblAccStatus: data?.accounting_flags?.is_data_complete,
        oblFreeCashFlow: data?.accounting_data_output?.free_cash_flow,
        oblName: data?.accounting_data_output?.obligor_name,
        regNo: data?.accounting_data_output?.registration_number
      });
      setOblAccStatus(
        creditAssessmentReducer?.data?.GBP?.entity?.accounting_flags?.is_data_complete == 'Green'
          ? 'Complete'
          : 'Incomplete'
      );
    }
    if (
      creditAssessmentReducer?.status === 'success' &&
      creditAssessmentReducer?.data?.home_currency?.entity?.accounting_data_output?.is_client ===
        false &&
      event.target.value === 'home_currency'
    ) {
      const data = creditAssessmentReducer?.data?.home_currency?.entity;
      setOblCreditData({
        oblCreditSafeScore: data?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score,
        oblAccountingPeriod: data?.accounting_data_output?.accounting_period,
        oblCreditSafeLimit: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.value,
        oblCreditSafeCurrency: data?.accounting_data_output?.cs_credit_limit?.creditLimit?.currency,
        oblTotalAssets: data?.accounting_data_output?.total_assets,
        oblTotalLiabilities: data?.accounting_data_output?.total_liabilities,
        oblNetIncome: data?.accounting_data_output?.net_income,
        oblInCorporationDate: data?.accounting_data_output?.incorporation_date,
        oblOperatingProfit: data?.accounting_data_output?.operating_profit,
        oblCurrency: data?.accounting_data_output?.home_currency,
        oblDirectorCcj: data?.accounting_data_output?.directors_ccj_summary?.exactRegistered,
        oblFillingDate: data?.accounting_data_output?.filing_date,
        oblFreeCashflowLimit: data?.analysis_data_output?.free_cash_flow_limit,
        oblOperatingMargin: data?.accounting_flags?.operating_margin?.operating_margin,
        oblQuickRatio: data?.accounting_flags?.quick_ratio?.quick_ratio,
        oblRecoveryLimit: data?.analysis_data_output?.recovery_limit,
        oblRevenue: data?.analysis_data_output?.revenue,
        oblLastUpdate: data?.analysis_data_output?.date_run,
        oblCreditSafeColor: data?.cs_status_analysis_flags?.credit_safe_score?.color,
        oblAccFlagColor: data?.accounting_flags?.is_data_complete,
        oblDirectorCcjColor: data?.cs_status_analysis_flags?.directors_ccj_flag?.color,
        oblNetIncomeColor: data?.accounting_flags?.net_income?.color,
        oblOprMarginColor: data?.accounting_flags?.operating_margin?.color,
        oblQuickRatioColor: data?.accounting_flags?.quick_ratio?.color,
        oblRevvingLimit: data?.analysis_data_output?.implied_limit,
        oblAccStatus: data?.accounting_flags?.is_data_complete,
        oblFreeCashFlow: data?.accounting_data_output?.free_cash_flow,
        oblName: data?.accounting_data_output?.obligor_name,
        regNo: data?.accounting_data_output?.registration_number
      });
      setOblAccStatus(
        creditAssessmentReducer?.data?.home_currency?.entity?.accounting_flags?.is_data_complete ==
          'Green'
          ? 'Complete'
          : 'Incomplete'
      );
    }
  };

  useEffect(() => {
    const data =
      creditAssessmentReducer?.data?.home_currency?.entity?.accounting_data_output?.home_currency;
    if (data == 'GBP') {
      setOblHomeCurr('Home Currency');
    } else {
      setOblHomeCurr(data);
    }
  }, [creditAssessmentReducer]);

  const handleCompChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handleCatChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleParCatChange = (e: any) => {
    setParentCategory(e.target.value);
  };

  const handleParCompName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setParentName(e.target.value);
  };

  const handleParAdd = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setParentAddress(e.target.value);
  };

  const handleUpdate = () => {
    setAnchorEl(!anchorEl);
    if (retriveInfoReducer?.message?.code == 404) {
      dispatch({
        type: 'ADD_CUSTOMER',
        payload: {
          name,
          address,
          category,
          companyNo,
          country,
          safeNo,
          unknownstatus,
          default_currency: 'GBP'
        }
      });
    }
    if (retriveInfoReducer?.data?.status == 'registered')
      dispatch({
        type: 'EDIT_CUSTOMER',
        payload: {
          name,
          address,
          category,
          cuid,
          is_transfer
        }
      });
  };

  const handleUpdatePar = () => {
    setOpen(false);
    setParentAnchor(false);
    if (parentRetriveInfo?.message?.code == 404) {
      dispatch({
        type: 'PAR_EDIT_CUSTOMER',
        payload: {
          parentName,
          parentAddress,
          parentCategory,
          parentCompanyNo,
          parentSafeNo,
          parentCountry,
          unknownstatus,
          cuid,
          is_risk_transfer,
          default_currency: 'GBP'
        }
      });
    }
    if (riskTransferParent?.cuid || parentRetriveInfo?.data) {
      dispatch({
        type: 'PAR_EDIT_CUSTOMER',
        payload: {
          parentName,
          parentAddress,
          parentCategory,
          cuid,
          parCuid,
          parentCompanyNo,
          parentCountry,
          parCusStatus,
          parentSafeNo,
          is_risk_transfer
        }
      });
    }
  };

  const handleParedit = () => {
    setParentAnchor(true);
  };

  const handleParBtn = () => {
    setParentAnchor(true);
  };

  const handleParDlt = () => {
    setOpen(false);
    setParentAnchor(false);
    if (riskTransferParent?.cuid) {
      dispatch({
        type: 'PAR_EDIT_CUSTOMER',
        payload: {
          parentName,
          parentAddress,
          parentCategory,
          cuid,
          parentCompanyNo,
          parentCountry,
          parCusStatus,
          parentSafeNo,
          is_risk_transfer,
          remove_parent
        }
      });
    }
  };

  useEffect(() => {
    if (country) {
      dispatch({
        type: 'CCCLIST_INFO',
        payload: {
          search: country
        }
      });
    }
    if (oblCountry) {
      dispatch({
        type: 'CCCLIST_INFO',
        payload: {
          search: oblCountry
        }
      });
    }
    if (parentCountry) {
      dispatch({
        type: 'CCCLIST_INFO',
        payload: {
          search: parentCountry
        }
      });
    }
    if (oblParentCountry) {
      dispatch({
        type: 'CCCLIST_INFO',
        payload: {
          search: oblParentCountry
        }
      });
    }
  }, [country, dispatch, oblCountry, parentCountry, oblParentCountry]);

  useEffect(() => {
    dispatch({
      type: 'CATEGORY_LIST'
    });
  }, [dispatch]);

  useEffect(() => {
    if (categoriesList?.status == 'success') {
      setCategoryList(categoriesList?.data?.category);
    }
  }, [categoriesList]);

  console.log('categoriesList', categoriesList);

  useEffect(() => {
    if (cccListInfo?.status === 'success') {
      setCountryList(cccListInfo?.data);
      // setCategoryList(cccListInfo?.data?.category);
    }
  }, [cccListInfo]);

  useEffect(() => {
    if (editCustomer?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('Successfully Updated', {
        variant
      });
    }
    if (editCustomer?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
    if (addCustomer?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('Company created successfully', {
        variant
      });
    }
    if (addCustomer?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
    if (parentAddCustomer?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('Company created successfully', {
        variant
      });
    }
    if (parentAddCustomer?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
    if (parentEditCustomer?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('successfully Updated', {
        variant
      });
    }
    if (parentEditCustomer?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
  }, [editCustomer, addCustomer, enqueueSnackbar, parentAddCustomer, parentEditCustomer]);

  useEffect(() => {
    if (parentEditCustomer?.status === 'success') {
      dispatch({
        type: 'RETRIVE_INFO',
        payload: {
          companyNo,
          country,
          safeNo
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentEditCustomer]);

  useEffect(() => {
    if (addCustomer?.status === 'success' || editCustomer?.status === 'success') {
      dispatch({
        type: 'RETRIVE_INFO',
        payload: {
          companyNo,
          country,
          safeNo
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCustomer, editCustomer]);

  useEffect(() => {
    if (retriveInfoReducer?.message?.code == 404) {
      const variant = 'error';
      enqueueSnackbar('Company not found', {
        variant
      });
    }
  }, [enqueueSnackbar, retriveInfoReducer]);

  useEffect(() => {
    if (parentName == undefined) {
      setParName('');
    } else {
      setParName(parentName);
    }
  }, [parentName]);

  // Obligor part

  const handleOblCompanyNo = (e: any) => {
    setoblCompanyName(e.target.value);
  };

  const handleOblSafeNo = (e: any) => {
    setOblSafeNo(e.target.value);
  };

  const handleOblRetrive = () => {
    dispatch({
      type: 'RETRIVE_INFO_OBLIGOR',
      payload: {
        oblCompanyName,
        oblCountry,
        oblSafeNo
      }
    });
  };

  useEffect(() => {
    if (obligorRetriveInfo?.data) {
      setOblRiskTransChild(obligorRetriveInfo?.data?.Obligor_risk_transfer_children);
      setOblRiskTransferParent(obligorRetriveInfo?.data?.risk_transfer);
      setOblName(obligorRetriveInfo?.data?.name);
      setOblAddress(obligorRetriveInfo?.data?.address_one);
      setOblCat(obligorRetriveInfo?.data?.obligor_category);
      setOblUuid(obligorRetriveInfo?.data?.uuid);
    }
  }, [obligorRetriveInfo?.data]);

  useEffect(() => {
    if (oblRiskTransferParent) {
      setOblParentCompanyNo(oblRiskTransferParent?.company_number);
      setOblParentCountry(oblRiskTransferParent?.country_code);
      setOblParentSafeNo(oblRiskTransferParent?.safe_number);
      setOblParentName(oblRiskTransferParent?.name);
      setOblParentAddress(oblRiskTransferParent?.address_one);
      setOblParentCategory(oblRiskTransferParent?.obligor_category);
      setOblParCusStatus(oblRiskTransferParent?.status);
      setOblParUuid(oblRiskTransferParent?.uuid);
    }
  }, [oblRiskTransferParent]);

  useEffect(() => {
    if (obligorRetriveInfo?.message?.code == 404) {
      setOblStatus('unknown');
      setOblName('');
      setOblAddress('');
      setOblCat('');
      setOblRiskTransferParent({});
      setOblRiskTransChild([]);
      setOblDisable(true);
    }
    if (obligorRetriveInfo?.data) {
      setOblStatus(obligorRetriveInfo?.data?.status);
      setOblDisable(false);
    }
  }, [obligorRetriveInfo]);

  useEffect(() => {
    if (oblParRetrieveInfo?.message?.code == 404) {
      setOblParCusStatus('unknown');
    }
    if (oblParRetrieveInfo?.data) {
      setOblParCusStatus(oblParRetrieveInfo?.data?.status);
      setOblParentName(oblParRetrieveInfo?.data?.name);
      setOblParentAddress(oblParRetrieveInfo?.data?.address_one);
      setOblParentCategory(oblParRetrieveInfo?.data?.obligor_category);
      setOblParUuid(oblParRetrieveInfo?.data?.uuid);
    }
  }, [oblParRetrieveInfo]);

  const handleOblClick = () => {
    // eslint-disable-next-line no-constant-condition
    if (
      obligorRetriveInfo?.data?.status == 'registered' ||
      obligorRetriveInfo?.message?.code == 404
    )
      setOblAnchorEl(!oblAnchorEl);
  };

  const handleOblUpdate = () => {
    console.log('hello====================>');
    setOblAnchorEl(!oblAnchorEl);
    if (obligorRetriveInfo?.message?.code == 404) {
      dispatch({
        type: 'ADD_OBLIGOR',
        payload: {
          oblName,
          oblAddress,
          oblCat,
          oblCompanyName,
          oblCountry,
          oblSafeNo,
          unknownstatus,
          default_currency: 'GBP'
        }
      });
    }
    if (obligorRetriveInfo?.data?.status == 'registered')
      dispatch({
        type: 'EDIT_OBLIGOR',
        payload: {
          oblName,
          oblAddress,
          oblCat,
          oblUuid,
          is_transfer
        }
      });
  };

  useEffect(() => {
    if (editObligor?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('Successfully Updated', {
        variant
      });
    }
    if (editObligor?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
    if (addObligor?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('Obligor created successfully', {
        variant
      });
    }
    if (addObligor?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
    if (oblParEditReducer?.status === 'success') {
      const variant = 'success';
      enqueueSnackbar('successfully Updated', {
        variant
      });
    }
    if (oblParEditReducer?.status === 'failure') {
      const variant = 'error';
      enqueueSnackbar('Something going wrong', {
        variant
      });
    }
  }, [editObligor, addObligor, enqueueSnackbar, oblParEditReducer]);

  useEffect(() => {
    if (addObligor?.status === 'success' || editObligor?.status === 'success') {
      dispatch({
        type: 'RETRIVE_INFO_OBLIGOR',
        payload: {
          oblCompanyName,
          oblCountry,
          oblSafeNo
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addObligor]);

  useEffect(() => {
    if (oblAnchorEl) {
      Validator.isEmpty(oblName) ? setOblErrCompName('Enter Company Name') : setOblErrCompName('');
      Validator.isEmpty(oblAddress) ? setOblErrCompAdd('Enter Address') : setOblErrCompAdd('');
      Validator.isEmpty(oblCat) ? setOblErrCompCat('Enter Category') : setOblErrCompCat('');
    }
  }, [oblAnchorEl, oblName, oblErrCompName, oblAddress, oblCat, oblErrCompAdd, oblErrCompCat]);

  const handleOblCompChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOblName(e.target.value);
  };

  const handleOblAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOblAddress(e.target.value);
  };

  const handleOblCatChange = (e: any) => {
    setOblCat(e.target.value);
  };

  useEffect(() => {
    if (obligorRetriveInfo?.message?.code == 404) {
      const variant = 'error';
      enqueueSnackbar('Company not found', {
        variant
      });
    }
  }, [enqueueSnackbar, obligorRetriveInfo]);

  const handleOblClose = () => {
    setOblOpen(false);
    setOblParentAnchor(false);
    setParentCompanyNo('');
    setParentAddress('');
    setParentName('');
    setParentCategory('');
    setParentCountry(null);
    setParCusStatus('');
  };

  const handleOblParCompanyNo = (e: any) => {
    setOblParentCompanyNo(e.target.value);
  };

  const handleOblParSafeNo = (e: any) => {
    setOblParentSafeNo(e.target.value);
  };

  const handleOblParCountry = (e: any) => {
    setOblParentCountry(e.target.value);
  };

  const handleOblParCountryName = (data: any) => {
    setOblParentCountry(data);
  };

  const handleOblParRetrive = () => {
    dispatch({
      type: 'OBL_PARENT_RETRIVE_INFO',
      payload: {
        oblParentCompanyNo,
        oblParentCountry,
        oblParentSafeNo
      }
    });
  };

  const handleOblParCatChange = (e: any) => {
    setOblParentCategory(e.target.value);
  };

  const handleOblUpdatePar = () => {
    setOblOpen(false);
    setOblParentAnchor(false);
    if (oblParRetrieveInfo?.message?.code == 404) {
      dispatch({
        type: 'OBL_PAR_EDIT_OBLIGOR',
        payload: {
          oblParentName,
          oblParentAddress,
          oblParentCategory,
          oblParentCompanyNo,
          oblParentSafeNo,
          oblParentCountry,
          unknownstatus,
          oblUuid,
          is_risk_transfer,
          default_currency: 'GBP'
        }
      });
    }
    if (oblRiskTransferParent?.uuid || oblParRetrieveInfo?.data) {
      dispatch({
        type: 'OBL_PAR_EDIT_OBLIGOR',
        payload: {
          oblParentName,
          oblParentAddress,
          oblParentCategory,
          oblUuid,
          oblParUuid,
          oblParentCompanyNo,
          oblParentCountry,
          oblParCusStatus,
          oblParentSafeNo,
          is_risk_transfer
        }
      });
    }
  };

  const handleOblParCompName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOblParentName(e.target.value);
  };

  const handleOblParAdd = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOblParentAddress(e.target.value);
  };

  const handleOblParedit = () => {
    setOblParentAnchor(true);
  };

  const handleOblParBtn = () => {
    setOblParentAnchor(true);
  };

  const handleOblChecked = (event: any) => {
    setOblChecked(!oblChecked);
  };

  useEffect(() => {
    if (oblChecked) {
      setOblRealTime(true);
    } else {
      setOblRealTime(false);
    }
  }, [oblChecked]);

  function numberWithCommas(x: any) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleOblParDlt = () => {
    setOblOpen(false);
    setOblParentAnchor(false);
    if (oblRiskTransferParent?.uuid) {
      dispatch({
        type: 'OBL_PAR_EDIT_OBLIGOR',
        payload: {
          oblParentName,
          oblParentAddress,
          oblParentCategory,
          oblUuid,
          oblParentCompanyNo,
          oblParentCountry,
          oblParCusStatus,
          oblParentSafeNo,
          is_risk_transfer,
          remove_parent
        }
      });
    }
  };

  const handleOblCountry = (event: any) => {
    setOblCountry(event.target.value);
  };

  const handleOblConName = (data: any) => {
    setOblCountry(data);
  };

  const handleParCountryName = (data: any) => {
    setParentCountry(data);
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Credit Engine',
            data: ['Credit Engine', 'Preliminary Credit Check']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={0} justify='space-around'>
            <Grid
              className={classes.gridItem}
              item
              xs={12}
              md={5}
              style={{ border: '1px solid blue', height: 'auto' }}
            >
              {' '}
              <div
                className={classes.headingCont}
                style={{
                  background: '#B2D2A4',
                  padding: '8px'
                }}
              >
                <span>Customer Preliminary Assessment</span>
              </div>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel id='demo-simple-select-outlined-label' className={classes.InputLabels}>
                  Input Fields
                </InputLabel>
                <div className={classes.InputContainer}>
                  <InputBase
                    placeholder='Enter Company Number'
                    className={classes.InputBases}
                    style={{ width: '30%' }}
                    onChange={(e) => hancleCompanyNo(e)}
                  />
                  <StyledFormControl
                    variant='outlined'
                    style={{ width: '35%', marginRight: '5px' }}
                  >
                    <InputLabel style={{ fontSize: '10px', paddingTop: '11px' }}>
                      Country Code
                    </InputLabel>
                    <InputBase
                      value={country}
                      className={classes.InputBases}
                      style={{ padding: '2px' }}
                      onChange={(event) => {
                        setCusDropDown(true);
                        handleCountry(event);
                      }}
                    />
                    <ul className={cusDropdown ? classes.dropdownScroll : classes.dropdownUl}>
                      {countryList &&
                        cusDropdown &&
                        countryList.map((item) => (
                          <li
                            className={classes.dropdownLi}
                            key={item?.country_code}
                            value={item?.country_code}
                            onClick={() => {
                              setCusDropDown(false);
                              handleCountryName(item?.country_code);
                            }}
                          >
                            {item?.country_code}
                          </li>
                        ))}
                    </ul>
                  </StyledFormControl>
                  <InputBase
                    placeholder='Safe No'
                    className={classes.InputBases}
                    style={{ width: '30%', padding: '10px' }}
                    onChange={(e) => handleSafeNo(e)}
                  />
                  <ButtonWrapper
                    variant='outlined'
                    className={classes.StyledButton}
                    style={{ backgroundColor: 'rgb(14, 134, 212)' }}
                    onClick={handleRetrive}
                  >
                    Retrive Info
                  </ButtonWrapper>
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Status
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputBases}
                    style={{
                      width: '200px'
                    }}
                    value={cusStatus}
                  />
                  {anchorEl ? (
                    <Paper style={{ display: 'flex', background: 'white' }}>
                      <SyncDisabled style={{ cursor: 'pointer' }} onClick={handleClick} />
                      <Done style={{ cursor: 'pointer' }} onClick={handleUpdate} />
                    </Paper>
                  ) : (
                    <Edit style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={handleClick} />
                  )}
                  {/* <Popover
                    id={id}
                    className='popOver'
                    anchorReference='anchorPosition'
                    anchorPosition={{ top: 350, left: 584 }}
                    open={open1}
                    // onClose={handleClosePopup}
                  >
                    <Typography>The content of the Popover.</Typography>
                  </Popover> */}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Company Name
                </InputLabel>
                <div style={{ alignItems: 'center', width: '200px' }}>
                  <InputBase
                    required
                    className={classes.InputBases}
                    style={errCompName ? { borderColor: 'red', width: '100%' } : { width: '100%' }}
                    value={name}
                    readOnly={anchorEl ? false : true}
                    onChange={(e) => {
                      handleCompChange(e);
                    }}
                  />
                  {errCompName && (
                    <Typography style={{ fontSize: '0.6rem', color: 'red' }}>
                      {errCompName}
                    </Typography>
                  )}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Registered Address
                </InputLabel>
                <div style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputBases}
                    style={errCompAdd ? { borderColor: 'red', width: '100%' } : { width: '100%' }}
                    value={address}
                    readOnly={anchorEl ? false : true}
                    onChange={(e) => {
                      handleAddChange(e);
                    }}
                  />
                  {errCompAdd && (
                    <Typography style={{ fontSize: '0.6rem', color: 'red' }}>
                      {errCompAdd}
                    </Typography>
                  )}
                </div>
              </FormBoxWrapper>
              {/* <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Category
                </InputLabel>
                <div className={classes.InputContainer}>
                  <InputBase
                    className={classes.InputA_D}
                    value={category}
                    readOnly={anchorEl ? false : true}
                    onChange={(e) => {
                      handleCatChange(e);
                    }}
                  />
                  <span>A-</span>
                </div>
              </FormBoxWrapper> */}
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Category
                </InputLabel>
                <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                  <StyledFormControl
                    variant='outlined'
                    style={{ width: '50%', marginRight: '5px' }}
                  >
                    <InputLabel
                      id='demo-simple-select-outlined-label'
                      style={{ fontSize: '10px', paddingTop: '12px', paddingLeft: '10px' }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      disabled={anchorEl ? false : true}
                      style={
                        errCompCat
                          ? { border: '0.5px solid red', borderRadius: '0px' }
                          : { border: '1px solid gray', borderRadius: '0px' }
                      }
                      onChange={(e) => handleCatChange(e)}
                      value={category}
                    >
                      {categoryList &&
                        categoryList?.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </StyledFormControl>
                  {errCompCat && (
                    <Typography style={{ fontSize: '0.6rem', color: 'red' }}>
                      {errCompCat}
                    </Typography>
                  )}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Risk Transfer Parent
                </InputLabel>
                <div
                  className={classes.gridItem}
                  style={{
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Typography style={{ fontSize: '0.6rem' }}>
                    Parent risk transfer entities
                  </Typography>
                  <InputBase
                    placeholder='Name1 (company number, country)'
                    className={classes.InputA_D}
                    style={{
                      width: '180px'
                    }}
                    value={parName}
                  />
                </div>
                <InputBase
                  placeholder='Country'
                  className={classes.InputA_D}
                  style={{
                    width: '60px',
                    marginTop: '14px',
                    marginLeft: '5px'
                  }}
                  value={
                    riskTransferParent?.country_code == undefined
                      ? ''
                      : riskTransferParent?.country_code
                  }
                />
                <Edit
                  style={{ marginTop: '15px', color: 'gray', cursor: 'pointer' }}
                  onClick={() => setOpen(true)}
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Risk Transfer Child
                </InputLabel>
                <div
                  className={classes.gridItem}
                  style={{
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Typography style={{ fontSize: '0.6rem' }}>
                    child risk transfer entities
                  </Typography>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: '240px',
                      marginRight: '20px',
                      height: '45px'
                    }}
                  >
                    {riskTransChild &&
                      riskTransChild.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <div style={{ display: 'flex' }}>
                          <Typography style={{ fontSize: '0.7rem' }}>{item.name}</Typography>
                          <Typography style={{ fontSize: '0.7rem' }}>
                            {`(${item.country_code} ${item.company_number})`}
                          </Typography>
                        </div>
                      ))}
                  </Paper>
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <div
                  style={{
                    justifyContent: 'flex-start',
                    display: 'flex',
                    flexWrap: 'wrap'
                  }}
                >
                  <span style={{ width: '116px' }} />
                  <ButtonWrapper
                    className={classes.MainButton}
                    variant='contained'
                    onClick={handleAssessment}
                    disabled={disable}
                    style={{ boxShadow: 'none !important' }}
                  >
                    <Typography style={{ fontSize: '0.6rem', boxShadow: 'none !important' }}>
                      Retrieve Credit Assessment
                    </Typography>
                  </ButtonWrapper>
                  <FormControlWrapper
                    style={{ fontSize: '0.7rem' }}
                    control={<Checkbox checked={checked} onChange={handleChecked} />}
                    label='Run new assessment '
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Name
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.oblName}
                  />
                </div>
                <StyledFormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label' style={{ padding: '9px' }}>
                    Currency
                  </InputLabel>
                  <Select
                    className={classes.inputSelect}
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    onChange={handleCusCurrency}
                    label='Invoice Type'
                    value={cusCurrency}
                  >
                    {/* {creditKeys &&
                      creditKeys.map((item) => (
                        <MenuItem key='no-value-ds' value={item} style={{ fontSize: '9px' }}>
                          {item}
                        </MenuItem>
                      ))} */}
                    <MenuItem key='no-value-ds' value='GBP' style={{ fontSize: '9px' }}>
                      GBP
                    </MenuItem>
                    <MenuItem key='no-value-ds' value='home_currency' style={{ fontSize: '9px' }}>
                      {oblHomeCurr ? oblHomeCurr : 'Home Currency'}
                    </MenuItem>
                  </Select>
                </StyledFormControl>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Registration No.
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.regNo}
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Last Update
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.lastUpdate}
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Creditsafe Score
                </InputLabel>
                {/* <div className={classes.InputContainer} style={{ alignItems: 'center' }}> */}
                <div>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.creditSafeScore)}
                  />
                  {/* <Typography
                    style={
                      creditData?.creditSafeColor
                        ? { color: creditData?.creditSafeColor }
                        : { color: 'black' }
                    }
                  >
                    {creditData?.creditSafeColor === 'red'
                      ? 'Bad'
                      : creditData?.creditSafeColor === 'green'
                      ? 'Good'
                      : 'Average'}
                  </Typography> */}
                </div>
                <span className={classes.StyledSpan} />
                <div>
                  {creditData?.creditSafeColor == 'Green' ? (
                    <Typography
                      style={
                        creditData?.creditSafeColor
                          ? { color: creditData?.creditSafeColor }
                          : { display: 'none' }
                      }
                    >
                      Good
                    </Typography>
                  ) : creditData?.creditSafeColor == 'Yellow' ? (
                    <Typography
                      style={
                        creditData?.creditSafeColor ? { color: 'orange' } : { display: 'none' }
                      }
                    >
                      Average
                    </Typography>
                  ) : creditData?.creditSafeColor == 'Red' ? (
                    <Typography
                      style={
                        creditData?.creditSafeColor ? { color: 'orange' } : { display: 'none' }
                      }
                    >
                      Bad
                    </Typography>
                  ) : null}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Creditsafe Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.creditSafeLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Revving Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='$24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.revvingLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
                {/* <Flag style={{ color: 'red' }} /> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Accounting Status
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='Complet/Incomplet'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={accStatus}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    creditData?.accFlagColor
                      ? { color: creditData?.accFlagColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Free Cashflow Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='$12,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.freeCashflowLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Recovery Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='$24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.recoveryLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Incorporation Date
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1/10/2021'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.inCorporationDate}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Director CCJ
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.directorCcj}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    creditData?.directorCcjColor
                      ? { color: creditData?.directorCcjColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Accounting Period
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1/2/2019'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.accountingPeriod}
                  />
                </div>
                <span />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Filling Date
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.fillingDate}
                  />
                </div>
                <span />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Revenue
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.turnover)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Operating Profit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.operatingProfit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Net Income
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='2,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.netIncome)}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    creditData?.netIncomeColor
                      ? { color: creditData?.netIncomeColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Operating Margin
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='12%'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.operatingMargin}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    creditData?.oprMarginColor
                      ? { color: creditData?.oprMarginColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Working Capital
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.freeCashFlow)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Total Assets
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='4,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.totalAssets)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Total Liabilities
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='2,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(creditData?.totalLiabilities)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Quick Ratio
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1:3'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.quickRatio}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    creditData?.quickRatioColor
                      ? { color: creditData?.quickRatioColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Home Currency
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='GBP'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={creditData?.currency}
                  />
                </div>
                <span />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Fix Rate Used
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1.1'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                  />
                </div>
                <span />
              </FormBoxWrapper>
            </Grid>
            <Grid
              className={classes.gridItem}
              item
              xs={12}
              md={5}
              style={{ border: '1px solid blue', height: 'auto' }}
            >
              {' '}
              <div
                className={classes.headingCont}
                style={{
                  background: 'gray',
                  padding: '8px'
                }}
              >
                <span>Obligor Preliminary Assessment</span>
              </div>
              {/* <FormBoxWrapper
                className={classes.StyledFormBoxWrapper}
                style={{ marginTop: '10px' }}
              >
                <InputLabel id='demo-simple-select-outlined-label' className={classes.InputLabels}>
                  Input Fields
                </InputLabel>
                <div className={classes.InputContainer}> */}
              {/* <InputBase
                    placeholder='Enter Company Number'
                    className={classes.InputBases}
                    style={{ width: '45%' }}
                    onChange={(e) => handleOblCompanyNo(e)}
                  />
                  <InputBase
                    placeholder='Country'
                    className={classes.InputBases}
                    style={{ width: '20%', padding: '10px' }}
                    onChange={(e) => handleOblCountry(e)}
                  /> */}
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel id='demo-simple-select-outlined-label' className={classes.InputLabels}>
                  Input Fields
                </InputLabel>
                <div className={classes.InputContainer}>
                  <InputBase
                    placeholder='Enter Company Number'
                    className={classes.InputBases}
                    style={{ width: '30%' }}
                    onChange={(e) => handleOblCompanyNo(e)}
                  />
                  <StyledFormControl
                    variant='outlined'
                    style={{ width: '35%', marginRight: '5px' }}
                  >
                    <InputLabel
                      id='demo-simple-select-outlined-label'
                      style={{ fontSize: '10px', paddingTop: '11px' }}
                    >
                      Country Code
                    </InputLabel>
                    <InputBase
                      value={oblCountry}
                      className={classes.InputBases}
                      style={{ padding: '2px' }}
                      onChange={(event) => {
                        setOblDropDown(true);
                        handleOblCountry(event);
                      }}
                    />
                    <ul className={oblDropdown ? classes.dropdownScroll : classes.dropdownUl}>
                      {countryList &&
                        oblDropdown &&
                        countryList.map((item) => (
                          <li
                            className={classes.dropdownLi}
                            key={item?.country_code}
                            value={item?.country_code}
                            onClick={() => {
                              setOblDropDown(false);
                              handleOblConName(item?.country_code);
                            }}
                          >
                            {item?.country_code}
                          </li>
                        ))}
                    </ul>
                  </StyledFormControl>
                  <InputBase
                    placeholder='Safe No'
                    className={classes.InputBases}
                    style={{ width: '30%', padding: '10px' }}
                    onChange={(e) => handleOblSafeNo(e)}
                  />
                  <ButtonWrapper
                    variant='outlined'
                    style={{ backgroundColor: 'rgb(14, 134, 212)' }}
                    className={classes.StyledButton}
                    onClick={handleOblRetrive}
                  >
                    Retrive Info
                  </ButtonWrapper>
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper
                className={classes.StyledFormBoxWrapper}
                style={{ marginTop: '10px' }}
              >
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Status
                </InputLabel>
                {/* <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    placeholder='Onboarded, Registered, Unknown'
                    style={{
                      fontSize: '12px',
                      border: '2px solid gray',
                      width: '200px',
                      padding: '5px'
                    }}
                  />
                  <Edit style={{ marginLeft: '20px', color: 'gray' }} />
                </div> */}
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputBases}
                    style={{
                      width: '200px'
                    }}
                    value={oblStatus}
                  />
                  {oblAnchorEl ? (
                    <Paper style={{ display: 'flex', background: 'white' }}>
                      <SyncDisabled style={{ cursor: 'pointer' }} onClick={handleOblClick} />
                      <Done style={{ cursor: 'pointer' }} onClick={handleOblUpdate} />
                    </Paper>
                  ) : (
                    <Edit
                      style={{ marginLeft: '20px', cursor: 'pointer' }}
                      onClick={handleOblClick}
                    />
                  )}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper
                className={classes.StyledFormBoxWrapper}
                style={{ marginTop: '10px' }}
              >
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Company Name
                </InputLabel>
                <div
                  className={classes.InputContainer}
                  style={{ width: '200px', flexDirection: 'column', marginBottom: '5px' }}
                >
                  <InputBase
                    required
                    className={classes.InputBases}
                    style={
                      oblErrCompName ? { borderColor: 'red', width: '100%' } : { width: '100%' }
                    }
                    value={oblName}
                    readOnly={oblAnchorEl ? false : true}
                    onChange={(e) => {
                      handleOblCompChange(e);
                    }}
                  />
                  {oblErrCompName && (
                    <Typography style={{ fontSize: '0.6rem', color: 'red' }}>
                      {oblErrCompName}
                    </Typography>
                  )}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper
                className={classes.StyledFormBoxWrapper}
                style={{ marginTop: '10px' }}
              >
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Registered Address
                </InputLabel>
                <div className={classes.InputContainer} style={{ flexDirection: 'column' }}>
                  <InputBase
                    required
                    className={classes.InputBases}
                    style={
                      oblErrCompAdd ? { borderColor: 'red', width: '100%' } : { width: '100%' }
                    }
                    value={oblAddress}
                    readOnly={oblAnchorEl ? false : true}
                    onChange={(e) => {
                      handleOblAddChange(e);
                    }}
                  />
                  {oblErrCompAdd && (
                    <Typography style={{ fontSize: '0.6rem', color: 'red' }}>
                      {oblErrCompAdd}
                    </Typography>
                  )}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Category
                </InputLabel>
                <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                  <StyledFormControl
                    variant='outlined'
                    style={{ width: '50%', marginRight: '5px' }}
                  >
                    <InputLabel
                      id='demo-simple-select-outlined-label'
                      style={{ fontSize: '10px', paddingTop: '12px', paddingLeft: '10px' }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      disabled={oblAnchorEl ? false : true}
                      style={
                        oblErrCompCat
                          ? { border: '0.5px solid red', borderRadius: '0px' }
                          : { border: '1px solid gray', borderRadius: '0px' }
                      }
                      onChange={(e) => handleOblCatChange(e)}
                      value={oblCat}
                    >
                      {categoryList &&
                        categoryList?.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </StyledFormControl>
                  {oblErrCompCat && (
                    <Typography style={{ fontSize: '0.6rem', color: 'red' }}>
                      {oblErrCompCat}
                    </Typography>
                  )}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Risk Transfer Parent
                </InputLabel>
                <div
                  className={classes.gridItem}
                  style={{
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Typography style={{ fontSize: '0.6rem' }}>
                    Parent risk transfer entities
                  </Typography>
                  <InputBase
                    placeholder='Name1 (company number, country)'
                    className={classes.InputA_D}
                    style={{
                      width: '180px'
                    }}
                    value={
                      oblRiskTransferParent?.name == undefined ? '' : oblRiskTransferParent?.name
                    }
                  />
                </div>
                <InputBase
                  placeholder='Country'
                  className={classes.InputA_D}
                  style={{
                    width: '60px',
                    marginTop: '14px',
                    marginLeft: '5px'
                  }}
                  value={
                    oblRiskTransferParent?.country_code == undefined
                      ? ''
                      : oblRiskTransferParent?.country_code
                  }
                />
                <Edit
                  style={{ marginTop: '15px', color: 'gray', cursor: 'pointer' }}
                  onClick={() => setOblOpen(true)}
                />
              </FormBoxWrapper>
              <FormBoxWrapper
                className={classes.StyledFormBoxWrapper}
                style={{ marginTop: '10px' }}
              >
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Risk Transfer Child
                </InputLabel>
                <div
                  className={classes.gridItem}
                  style={{
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Typography style={{ fontSize: '0.6rem' }}>
                    child risk transfer entities
                  </Typography>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: '240px',
                      marginRight: '20px',
                      height: '45px'
                    }}
                  >
                    {oblRiskTransChild &&
                      oblRiskTransChild.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <div style={{ display: 'flex' }}>
                          <Typography style={{ fontSize: '0.7rem' }}>{item.name}</Typography>
                          <Typography style={{ fontSize: '0.7rem' }}>
                            {`(${item.country_code} ${item.company_number})`}
                          </Typography>
                        </div>
                      ))}
                  </Paper>
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper
                className={classes.StyledFormBoxWrapper}
                style={{ marginTop: '10px' }}
              >
                <div
                  className={classes.gridItem}
                  style={{
                    justifyContent: 'flex-start',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                  }}
                >
                  <span style={{ width: '116px' }}> </span>
                  <ButtonWrapper
                    disabled={oblDisable}
                    onClick={handleOblAssessment}
                    className={classes.MainButton}
                    variant='contained'
                  >
                    <Typography style={{ fontSize: '0.6rem' }}>
                      Retrieve Credit Assessment
                    </Typography>
                  </ButtonWrapper>
                  <FormControlWrapper
                    style={{ fontSize: '0.7rem' }}
                    control={<Checkbox checked={oblChecked} onChange={handleOblChecked} />}
                    label='Run new assessment '
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Name
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblName}
                  />
                </div>
                <StyledFormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label' style={{ padding: '9px' }}>
                    Currency
                  </InputLabel>
                  <Select
                    className={classes.inputSelect}
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    onChange={handleOblCurrency}
                    label='Invoice Type'
                    value={oblCurrency}
                  >
                    <MenuItem key='no-value-ds' value='GBP' style={{ fontSize: '9px' }}>
                      GBP
                    </MenuItem>
                    <MenuItem key='no-value-ds' value='home_currency' style={{ fontSize: '9px' }}>
                      {oblHomeCurr ? oblHomeCurr : 'Home Currency'}
                    </MenuItem>
                  </Select>
                </StyledFormControl>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Registration No.
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.regNo}
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.formBoxWrap}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Last Update
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblLastUpdate}
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Creditsafe Score
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='Score'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblCreditSafeScore}
                  />
                </div>
                <span className={classes.StyledSpan} />
                {/* <div
                  className={classes.Divbox}
                  style={
                    oblCreditData?.oblCreditSafeColor
                      ? { background: oblCreditData?.oblCreditSafeColor }
                      : { display: 'none' }
                  }
                /> */}
                <div>
                  {oblCreditData?.oblCreditSafeColor == 'Green' ? (
                    <Typography
                      style={
                        oblCreditData?.oblCreditSafeColor
                          ? { color: oblCreditData?.oblCreditSafeColor }
                          : { display: 'none' }
                      }
                    >
                      Good
                    </Typography>
                  ) : oblCreditData?.oblCreditSafeColor == 'Yellow' ? (
                    <Typography
                      style={
                        oblCreditData?.oblCreditSafeColor
                          ? { color: 'orange' }
                          : { display: 'none' }
                      }
                    >
                      Average
                    </Typography>
                  ) : oblCreditData?.oblCreditSafeColor == 'Red' ? (
                    <Typography
                      style={
                        oblCreditData?.oblCreditSafeColor
                          ? { color: 'orange' }
                          : { display: 'none' }
                      }
                    >
                      Bad
                    </Typography>
                  ) : null}
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Creditsafe Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='$30,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblCreditSafeLimit}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Revving Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='$24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblRevvingLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Accounting Status
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='Complet/Incomplet'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblAccStatus}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    oblCreditData?.oblAccFlagColor
                      ? { color: oblCreditData?.oblAccFlagColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Free Cashflow Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblFreeCashflowLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Recovery Limit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblRecoveryLimit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Incorporation Date
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblInCorporationDate}
                  />
                </div>
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Director CCJ
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblDirectorCcj}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    oblCreditData?.oblDirectorCcjColor
                      ? { color: oblCreditData?.oblDirectorCcjColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Accounting Period
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1/2/2019'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblAccountingPeriod}
                  />
                </div>
                <span />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Filling Date
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblFillingDate}
                  />
                </div>
                <span />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Revenue
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblRevenue)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Operating Profit
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='24,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblOperatingProfit)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Net Income
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='2,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblNetIncome)}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    oblCreditData?.oblNetIncomeColor
                      ? { color: oblCreditData?.oblNetIncomeColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Operating Margin
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='12%'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblOperatingMargin}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    oblCreditData?.oblOprMarginColor
                      ? { color: oblCreditData?.oblOprMarginColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Working Capital
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblFreeCashFlow)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Total Assets
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='4,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblTotalAssets)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Total Liabilities
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='2,000,000'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={numberWithCommas(oblCreditData?.oblTotalLiabilities)}
                  />
                </div>
                {/* <span className={classes.StyledSpan}>$, GBP</span> */}
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Quick Ratio
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1:3'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblQuickRatio}
                  />
                </div>
                <span style={{ width: '50px', marginLeft: '10px' }} />
                <Flag
                  style={
                    oblCreditData?.oblQuickRatioColor
                      ? { color: oblCreditData?.oblQuickRatioColor }
                      : { display: 'none' }
                  }
                />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Home Currency
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='GBP'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                    value={oblCreditData?.oblCurrency}
                  />
                </div>
                <span />
              </FormBoxWrapper>
              <FormBoxWrapper className={classes.StyledFormBoxWrapper}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  className={classes.DemoInputLabel}
                >
                  Fix Rate Used
                </InputLabel>
                <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
                  <InputBase
                    // placeholder='1.1'
                    className={classes.InputA_D}
                    style={{ height: '30px' }}
                  />
                </div>
                <span />
              </FormBoxWrapper>
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
      <StyledDialog open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>Add or edit a risk transfer entity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1'>Create risk transfer entity</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputBase
                placeholder='Enter Company Number'
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                onChange={(e) => handleParCompanyNo(e)}
                value={parentCompanyNo}
              />
            </Grid>
            <Grid item xs={12} md={3} style={{ position: 'relative' }}>
              <StyledFormControl variant='outlined' style={{ width: '100%', marginRight: '5px' }}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  style={{
                    fontSize: '10px',
                    paddingTop: '11px'
                  }}
                >
                  Country Code
                </InputLabel>
                <InputBase
                  value={parentCountry}
                  className={classes.InputBases}
                  style={{ padding: '2px' }}
                  onChange={(event) => {
                    setParCusDropDown(true);
                    handleParCountry(event);
                  }}
                />
                <ul
                  className={parCusDropdown ? classes.dropdownScrollModal : classes.dropdownUl}
                  style={{ position: 'absolute', top: '100%', left: '0' }}
                >
                  {countryList &&
                    parCusDropdown &&
                    countryList.map((item) => (
                      <li
                        className={classes.dropdownLi}
                        key={item?.country_code}
                        value={item?.country_code}
                        onClick={() => {
                          setParCusDropDown(false);
                          handleParCountryName(item?.country_code);
                        }}
                      >
                        {item?.country_code}
                      </li>
                    ))}
                </ul>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputBase
                placeholder='Safe No'
                className={classes.InputBases}
                style={{ width: '100%' }}
                onChange={(e) => handleParSafeNo(e)}
                value={parentSafeNo}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <ButtonWrapper
                variant='outlined'
                style={{
                  fontSize: '10px',
                  width: '100%',
                  textTransform: 'none',
                  color: 'gray',
                  height: '100%'
                }}
                onClick={handleParRetrive}
              >
                Retrive Info
              </ButtonWrapper>
            </Grid>
            <Grid item xs={12} md={9}>
              <InputBase
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                readOnly={parentAnchor ? false : true}
                value={parCusStatus}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size='small' variant='outlined'>
                <InputLabel id='demo-simple-select-label'>Action</InputLabel>
                <Select
                  label='action'
                  name='action'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                >
                  <MenuItem value='remove_link' onClick={handleParDlt}>
                    Remove Link
                  </MenuItem>
                  <MenuItem value='edit' onClick={handleParedit}>
                    Edit
                  </MenuItem>
                  <MenuItem value='add' onClick={handleParBtn}>
                    Add
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={9}>
              <InputBase
                placeholder='Company Name'
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                value={parentName}
                readOnly={parentAnchor ? false : true}
                onChange={(e) => handleParCompName(e)}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <InputBase
                placeholder='Address'
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                value={parentAddress == undefined ? '' : parentAddress}
                readOnly={parentAnchor ? false : true}
                onChange={(e) => handleParAdd(e)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              {/* <FormControl fullWidth size='small' variant='outlined'>
                <InputLabel id='select-label-category'>Category</InputLabel>
                <Select
                  label='Category'
                  name='category'
                  labelId='select-label-category'
                  id='select-label-category'
                >
                  <MenuItem value='cat1'>Category 1</MenuItem>
                  <MenuItem value='cat2'>Category 2</MenuItem>
                </Select>
              </FormControl> */}
              <StyledFormControl variant='outlined' style={{ width: '50%', marginRight: '5px' }}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  style={{ fontSize: '10px', paddingTop: '12px', paddingLeft: '10px' }}
                >
                  Category
                </InputLabel>
                <Select
                  disabled={parentAnchor ? false : true}
                  style={{ border: '1px solid gray', borderRadius: '0px' }}
                  onChange={(e) => handleParCatChange(e)}
                  value={parentCategory == undefined ? '' : parentCategory}
                >
                  {categoryList &&
                    categoryList?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button color='primary' onClick={handleUpdatePar}>
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </StyledDialog>
      <StyledDialog
        open={oblOpen}
        onClose={handleOblClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>Add or edit a risk transfer entity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1'>Create risk transfer entity</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputBase
                placeholder='Enter Company Number'
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                onChange={(e) => handleOblParCompanyNo(e)}
                value={oblParentCompanyNo}
              />
            </Grid>
            <Grid item xs={12} md={3} style={{ position: 'relative' }}>
              <StyledFormControl variant='outlined' style={{ width: '100%', marginRight: '5px' }}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  style={{
                    fontSize: '10px',
                    paddingTop: '11px'
                  }}
                >
                  Country Code
                </InputLabel>
                <InputBase
                  value={oblParentCountry}
                  className={classes.InputBases}
                  style={{ padding: '2px' }}
                  onChange={(event) => {
                    setOblParDrop(true);
                    handleOblParCountry(event);
                  }}
                />
                <ul
                  className={oblParDrop ? classes.dropdownScrollModal : classes.dropdownUl}
                  style={{ position: 'absolute', top: '100%', left: '0' }}
                >
                  {countryList &&
                    oblParDrop &&
                    countryList.map((item) => (
                      <li
                        className={classes.dropdownLi}
                        key={item?.country_code}
                        value={item?.country_code}
                        onClick={() => {
                          setOblParDrop(false);
                          handleOblParCountryName(item?.country_code);
                        }}
                      >
                        {item?.country_code}
                      </li>
                    ))}
                </ul>
                {/* <Select onChange={(e) => handleOblParCountry(e)} value={oblParentCountry}>
                  {countryList &&
                    countryList.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select> */}
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputBase
                placeholder='Safe No'
                className={classes.InputBases}
                style={{ width: '100%' }}
                onChange={(e) => handleOblParSafeNo(e)}
                value={oblParentSafeNo}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant='outlined'
                style={{
                  fontSize: '10px',
                  width: '100%',
                  textTransform: 'none',
                  color: 'gray',
                  height: '100%'
                }}
                onClick={handleOblParRetrive}
              >
                Retrive Info
              </Button>
            </Grid>
            <Grid item xs={12} md={9}>
              <InputBase
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                readOnly={oblParentAnchor ? false : true}
                value={oblParCusStatus}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size='small' variant='outlined'>
                <InputLabel id='demo-simple-select-label'>Action</InputLabel>
                <Select
                  label='action'
                  name='action'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                >
                  <MenuItem value='remove_link' onClick={handleOblParDlt}>
                    Remove Link
                  </MenuItem>
                  <MenuItem value='edit' onClick={handleOblParedit}>
                    Edit
                  </MenuItem>
                  <MenuItem value='add' onClick={handleOblParBtn}>
                    Add
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={9}>
              <InputBase
                placeholder='Company Name'
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                value={oblParentName}
                readOnly={oblParentAnchor ? false : true}
                onChange={(e) => handleOblParCompName(e)}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <InputBase
                placeholder='Address'
                style={{
                  fontSize: '12px',
                  border: '2px solid gray',
                  padding: '5px',
                  width: '100%'
                }}
                value={oblParentAddress == undefined ? '' : oblParentAddress}
                readOnly={oblParentAnchor ? false : true}
                onChange={(e) => handleOblParAdd(e)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              {/* <FormControl fullWidth size='small' variant='outlined'>
                <InputLabel id='select-label-category'>Category</InputLabel>
                <Select
                  label='Category'
                  name='category'
                  labelId='select-label-category'
                  id='select-label-category'
                >
                  <MenuItem value='cat1'>Category 1</MenuItem>
                  <MenuItem value='cat2'>Category 2</MenuItem>
                </Select>
              </FormControl> */}
              <StyledFormControl variant='outlined' style={{ width: '50%', marginRight: '5px' }}>
                <InputLabel
                  id='demo-simple-select-outlined-label'
                  style={{ fontSize: '10px', paddingTop: '12px', paddingLeft: '10px' }}
                >
                  Category
                </InputLabel>
                <Select
                  disabled={oblParentAnchor ? false : true}
                  style={{ border: '1px solid gray', borderRadius: '0px' }}
                  onChange={(e) => handleOblParCatChange(e)}
                  value={oblParentCategory == undefined ? '' : oblParentCategory}
                >
                  {categoryList &&
                    categoryList?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button autoFocus onClick={handleOblClose} color='secondary'>
              Cancel
            </Button>
            <Button color='primary' onClick={handleOblUpdatePar}>
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </StyledDialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  retriveInfoReducer: state.retriveInfoReducer.data,
  obligorRetriveInfo: state.obligorRetriveInfo.data,
  creditAssessmentReducer: state.creditAssessmentReducer.data,
  cccListInfo: state.cccListInfo.data,
  editCustomer: state.editCustomer.data,
  addCustomer: state.addCustomer.data,
  parentRetriveInfo: state.parentRetriveInfo.data,
  parentEditCustomer: state.parentEditCustomer.data,
  parentAddCustomer: state.parentAddCustomer.data,
  editObligor: state.editObligor.data,
  addObligor: state.addObligor.data,
  oblParRetrieveInfo: state.oblParRetrieveInfo.data,
  oblParEditReducer: state.oblParEditReducer.data,
  categoriesList: state.categoriesList.data
});

export default connect(mapStateToProps)(CreditEngine);
