import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { BreadcrumbWrapper } from './Styled';

interface IBreadCrumb {
  page: string;
  data: Array<string>;
}
export default function Breadcrumb({ breadCrumb }: { breadCrumb: IBreadCrumb }) {
  const { page, data } = breadCrumb;
  return (
    <BreadcrumbWrapper>
      <Typography variant='h5'>{page}</Typography>
      <Breadcrumbs aria-label='breadcrumb'>
        {data.map((value) => (
          <Link key={Math.random() + 10} color='inherit' href='#'>
            {value}
          </Link>
        ))}
      </Breadcrumbs>
      <Divider />
    </BreadcrumbWrapper>
  );
}
