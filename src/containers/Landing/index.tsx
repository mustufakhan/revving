import React from 'react';
import Typography from '@material-ui/core/Typography';
import { DashboardWrrapper } from './Styled';
import Breadcumb from '../../components/Breadcumb';

const Landing = () => (
  <>
    <DashboardWrrapper className='coommon-dashboardbg'>
      <Breadcumb breadCrumb={{ page: 'Dashboard', data: ['Dashboard'] }} />
      <Typography variant='body1' gutterBottom>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </Typography>
      <br />
      <Typography variant='body1' gutterBottom>
        Crafting welcome messages for new employees is a tedious task. They say, “You never get a
        second chance to make a first impression”. The quote holds true when we are talking about
        onboarding new employees to the company. Making every employee feel comfortable and familiar
        with their new working environment is the best way to start a healthy work relationship. And
        this crucial step can help you pave the path for boosting employee engagement and building a
        productive workforce. 69% of employees who undergo effective onboarding are more likely to
        stay with an employer for at least 3 years, and 58% are more likely to stay on for more than
        3 years. (Source: O.C Tanner)
      </Typography>
      <Typography variant='body1' gutterBottom>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </Typography>
      <br />
      <Typography variant='body1' gutterBottom>
        Crafting welcome messages for new employees is a tedious task. They say, “You never get a
        second chance to make a first impression”. The quote holds true when we are talking about
        onboarding new employees to the company. Making every employee feel comfortable and familiar
        with their new working environment is the best way to start a healthy work relationship. And
        this crucial step can help you pave the path for boosting employee engagement and building a
        productive workforce. 69% of employees who undergo effective onboarding are more likely to
        stay with an employer for at least 3 years, and 58% are more likely to stay on for more than
        3 years. (Source: O.C Tanner)
      </Typography>
    </DashboardWrrapper>
  </>
);

export default Landing;
