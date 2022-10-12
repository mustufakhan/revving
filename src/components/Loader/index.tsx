import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

import { LoaderWrapper } from './Styled';

export default function Loader() {
  return (
    <LoaderWrapper>
      <Box className='loading'>
        <Typography variant='body2'>loading</Typography>
        <span />
      </Box>
    </LoaderWrapper>
  );
}
