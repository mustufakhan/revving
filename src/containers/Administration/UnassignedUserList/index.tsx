/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Breadcumb from '../../../components/Breadcumb';
import { MainContentWrapper } from '../../Ingestion/Customers/Styled';
import Loader from '../../../components/Loader';
import DataTable from './DataTable';
import { ContentBoxWrapper } from './Styled';
import { IProps } from './Constant';

const UnassignedUserList: React.FC<IProps> = ({ dispatch, userList, checklist }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log('checklist', checklist);
  const page = 1;
  useEffect(() => {
    dispatch({
      type: 'USER_LIST',
      payload: {
        page
      }
    });
    dispatch({
      type: 'CHECK_LIST'
    });
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Unassigned Users',
            data: ['Unassigned Users', 'unassigned-users']
          }}
        />
        <ContentBoxWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-around' }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  userList={{
                    data: userList,
                    status: ''
                  }}
                  checklist={{
                    data: checklist,
                    status: ''
                  }}
                />
              )}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  retriveInfoReducer: state.retriveInfoReducer.data,
  userList: state.userList.data,
  checklist: state.checklist.data
});
export default connect(mapStateToProps)(UnassignedUserList);
