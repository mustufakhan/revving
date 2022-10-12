import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { FormikWrapper, SalesCardWrapper } from './Styled';

const RowCard = () => (
  <>
    <FormikWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <SalesCardWrapper>
            <Card>
              <CardContent className='bg-premium-dark'>
                <div className='dFlexWrapper'>
                  <div className='leftcontent'>
                    <Typography variant='body2' gutterBottom>
                      New Accounts
                    </Typography>
                    <Typography variant='caption'>586,356</Typography>
                  </div>
                  <div className='roundedCircle '>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='far'
                      data-icon='building'
                      className='text-success svg-inline--fa fa-building fa-w-14 '
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 448 512'
                    >
                      <path
                        fill='currentColor'
                        d='M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='bottomContent'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='arrow-up'
                    className='svg-inline--fa fa-arrow-up fa-w-14 text-success'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path
                      fill='currentColor'
                      d='M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z'
                    />
                  </svg>
                  <Typography variant='caption' className='text-success'>
                    15.4%
                  </Typography>
                  <Typography variant='body2' className='text-white-50'>
                    increase this month
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </SalesCardWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SalesCardWrapper>
            <Card>
              <CardContent className='bg-night-sky'>
                <div className='dFlexWrapper'>
                  <div className='leftcontent'>
                    <Typography variant='body2' gutterBottom>
                      SALES
                    </Typography>
                    <Typography variant='caption'>23,274</Typography>
                  </div>
                  <div className='roundedCircle '>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='far'
                      data-icon='dot-circle'
                      className='text-primary svg-inline--fa fa-dot-circle fa-w-16 '
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='currentColor'
                        d='M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='bottomContent'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='arrow-up'
                    className='svg-inline--fa fa-arrow-up fa-w-14 text-success'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path
                      fill='currentColor'
                      d='M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z'
                    />
                  </svg>
                  <Typography variant='caption' className='text-success'>
                    12.65%
                  </Typography>
                  <Typography variant='body2' className='text-white-50'>
                    same as before
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </SalesCardWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SalesCardWrapper>
            <Card>
              <CardContent className='bg-midnight-bloom'>
                <div className='dFlexWrapper'>
                  <div className='leftcontent'>
                    <Typography variant='body2' gutterBottom>
                      ORDERS
                    </Typography>
                    <Typography variant='caption'>345</Typography>
                  </div>
                  <div className='roundedCircle '>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='far'
                      data-icon='keyboard'
                      className='text-danger svg-inline--fa fa-keyboard fa-w-18 '
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 576 512'
                    >
                      <path
                        fill='currentColor'
                        d='M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm8 336c0 4.411-3.589 8-8 8H48c-4.411 0-8-3.589-8-8V112c0-4.411 3.589-8 8-8h480c4.411 0 8 3.589 8 8v288zM170 270v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm-336 82v-28c0-6.627-5.373-12-12-12H82c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm384 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zM122 188v-28c0-6.627-5.373-12-12-12H82c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm-98 158v-16c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v16c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='bottomContent'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='arrow-up'
                    className='text-danger svg-inline--fa fa-arrow-up fa-w-14 text-success'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path
                      fill='currentColor'
                      d='M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z'
                    />
                  </svg>
                  <Typography variant='caption' className='text-danger'>
                    4.2%
                  </Typography>
                  <Typography variant='body2' className='text-white-50'>
                    lower order numbers
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </SalesCardWrapper>
        </Grid>
      </Grid>
    </FormikWrapper>
  </>
);

export default RowCard;
