/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcumb from '../../../components/Breadcumb';
import { MainContentWrapper } from '../../Ingestion/Customers/Styled';
import Loader from '../../../components/Loader';
import { ContentBoxWrapper } from '../CreditEngine/Styled';
import DataTable from './DataTable';
import { StyledFormControl } from './Styled';
// Props Interface
interface IProps {
  dispatch: Function;
}
const CreditHistory: React.FC<IProps> = ({ dispatch }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cusCurrency, setCusCurrency] = useState('GBP');
  const [creditType, setCreditType] = useState('');
  console.log('cusCurrency', cusCurrency);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleCusCurrency = (event: React.ChangeEvent<{ value: any }>) => {
    const currency = event.target.value;
    setCusCurrency(currency);
  };

  const handleCreditType = (event: React.ChangeEvent<{ value: any }>) => {
    const credittype = event.target.value;
    setCreditType(credittype);
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Credit Engine',
            data: ['Credit Engine', 'Credit Score History']
          }}
        />
        <ContentBoxWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Grid item xs={12} sm={4} lg={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Credit Type Filter</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={creditType}
                  onChange={handleCreditType}
                  label='Credittypefilter'
                >
                  <MenuItem key='no-value-ds' value='customer'>
                    Customer
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='obligor'>
                    Obligor
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Currency Filter</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  onChange={handleCusCurrency}
                  label='Invoice Type'
                  value={cusCurrency}
                >
                  <MenuItem key='no-value-ds' value='GBP'>
                    GBP
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='home_currency'>
                    Home Currency
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable cusCurrency={cusCurrency} creditType={creditType} />
              )}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  retriveInfoReducer: state.retriveInfoReducer.data
});
export default connect(mapStateToProps)(CreditHistory);
