/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { Flag } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Breadcumb from '../../../components/Breadcumb';
import { MainContentWrapper } from '../../Ingestion/Customers/Styled';
import Loader from '../../../components/Loader';
import DataTable from './DataTable';
import {
  ContentBoxWrapper,
  FormBoxWrapper,
  //   StyledDialog,
  StyledFormControl,
  ButtonWrapper
  //   FormControlWrapper
} from '../CreditEngine/Styled';

const useStyles = makeStyles(() => ({
  MainButton: {
    color: 'white',
    width: '288px',
    background: '#3f51b5',
    marginLeft: '11px',
    marginTop: '30px',
    marginBottom: '30px',
    boxShadow: 'none',
    '&:hover': {
      // filter: 'drop-shadow(8px 8px 5px #B5B4B4)',
      background: '#3f51b5',
      boxShadow: 'none'
    }
  },
  formBoxWrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '5px'
  },
  DemoInputLabel: {
    fontSize: '12px',
    width: '129px',
    padding: '5px',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.87);'
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
  Divbox: {
    width: '23px',
    height: '30px',
    borderRadius: '50%',
    transform: 'rotate(90deg)',
    backgroundColor: 'Yellow'
  },
  StyledSpan: {
    fontSize: '12px',
    fontWeight: 'bold',
    width: '50px',
    marginLeft: '10px'
  },
  dropdownUl: {
    width: '100%',
    zIndex: 9999
  },
  dropdownLi: {
    padding: '0.5rem',
    background: 'white',
    color: 'black',
    listStyle: 'none',
    // borderBottom: '1px solid gray',
    cursor: 'pointer'
  }
}));
// Props Interface
interface IProps {
  dispatch: Function;
  customerSearch: {
    data: any;
    status: string;
  };
}
const CreditOnboard: React.FC<IProps> = ({ dispatch, customerSearch }: IProps) => {
  const classes = useStyles();
  const [custName, setCustName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cusDropdown, setCusDropDown] = useState(false);
  const [cnData, setCnData] = useState<any>([]);
  const [buttonCase, setButtonCase] = useState(false);
  // const [safeNumber, setSafeNumber] = useState(false);
  // const [companyCode, setComapnyCode] = useState(false);
  console.log('cusDropdown', cusDropdown);
  const handleCustomerName = (event: any) => {
    setCustName(event.target.value);
  };
  const handleCn = (data: any) => {
    console.log('item', data);
    setCustName(data?.name);
    setButtonCase(true);
    // setSafeNumber(data?.);
    // setComapnyCode(dta?.);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dispatch({
      type: 'CUSTOMER_SEARCH',
      payload: {
        search: custName
      }
    });
  }, [dispatch, custName]);

  useEffect(() => {
    // console.log('hello', customerSearch);
    setCnData(customerSearch?.data?.results);
  }, [customerSearch]);

  console.log('hello', customerSearch);
  // console.log('cnData', cnData);
  // console.log('data', customerSearch);
  // console.log(
  //   'apidata---',
  //   customerSearch?.data?.results?.map((item: any) => {
  //     console.log('hey', item.name);
  //   })
  // );
  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Credit Engine',
            data: ['Credit Engine', 'Onboarded Credit assessment ']
          }}
        />
        <ContentBoxWrapper>
          <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              Select Customer
            </InputLabel>
            <StyledFormControl variant='outlined' style={{ width: '12.8%', marginRight: '5px' }}>
              <InputLabel
                id='demo-simple-select-outlined-label'
                style={{ fontSize: '10px', paddingTop: '11px' }}
              >
                Select Customer
              </InputLabel>
              {/* <Select onChange={(e) => handleCustomerName(e)} value={custName}> */}
              <InputBase
                value={custName}
                // className={classes.InputBases}
                style={{ padding: '1px', border: '2px solid gray' }}
                onChange={(event: any) => {
                  setCusDropDown(true);
                  handleCustomerName(event);
                }}
              />
              <ul className={classes.dropdownUl}>
                {cusDropdown &&
                  cnData?.map((item: any) => (
                    <li
                      className={classes.dropdownLi}
                      key={item?.name}
                      value={item?.name}
                      onClick={() => {
                        setCusDropDown(false);
                        handleCn(item);
                      }}
                    >
                      {item?.name}
                    </li>
                  ))}
              </ul>
              {/* </Select> */}
            </StyledFormControl>
            {/* <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div> */}
          </FormBoxWrapper>
          <ButtonWrapper
            className={classes.MainButton}
            variant='contained'
            disabled={!buttonCase}
            // onClick={handleAssessment}
            // disabled={disable}
            // style={disable ? { background: '#3e9edc' } : { background: '#0E86D4' }}
          >
            <Typography style={{ fontSize: '12px' }}>Run Credit Assessment</Typography>
          </ButtonWrapper>
          <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              Revenue Sources
            </InputLabel>
            <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div>
            <span className={classes.StyledSpan} />
            <p
              style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '20px', color: 'Black' }}
            >
              Flags
            </p>
          </FormBoxWrapper>
          <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              CreditSafe Score
            </InputLabel>
            <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div>
            <span className={classes.StyledSpan} />
            <div
              className={classes.Divbox}
              //   style={
              //     creditData?.creditSafeColor
              //       ? { color: creditData?.creditSafeColor }
              //       : { display: 'none' }
              //   }
            />
          </FormBoxWrapper>
          <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              CreditSafe Limit
            </InputLabel>
            <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div>
            <span className={classes.StyledSpan}>$, GBP</span>
          </FormBoxWrapper>
          {/* <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              Revving Limit
            </InputLabel>
            <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div>
            <span className={classes.StyledSpan}>$, GBP</span>
          </FormBoxWrapper> */}
          <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              Incorporation Date
            </InputLabel>
            <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div>
            <span className={classes.StyledSpan}>$, GBP</span>
            <Flag style={{ color: 'red' }} />
          </FormBoxWrapper>
          <FormBoxWrapper className={classes.formBoxWrap}>
            <InputLabel id='demo-simple-select-outlined-label' className={classes.DemoInputLabel}>
              Director CCJ
            </InputLabel>
            <div className={classes.InputContainer} style={{ alignItems: 'center' }}>
              <InputBase
                className={classes.InputA_D}
                style={{ height: '30px' }}
                // value={creditData?.lastUpdate}
              />
            </div>
            <span className={classes.StyledSpan} />
            <Flag style={{ color: 'red' }} />
          </FormBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? <Loader /> : <DataTable />}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  //   retriveInfoReducer: state.retriveInfoReducer.data
  customerSearch: state.customerSearch.data
});
export default connect(mapStateToProps)(CreditOnboard);
