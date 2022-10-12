import styled from 'styled-components';

export const FormikWrapper = styled.div`
  .bg-premium-dark {
    background-image: linear-gradient(90deg, #434343 0, #000);
    color: #fff;
  }
`;

export const SalesCardWrapper = styled.div`
  &.bg-premium-dark {
    background-image: linear-gradient(90deg, #434343 0, #000);
  }

  .bg-night-sky {
    background-image: linear-gradient(0deg, #1e3c72 0, #1e3c72 1%, #2a5298) !important;
  }

  .bg-midnight-bloom {
    background-image: linear-gradient(-20deg, #2b5876, #4e4376) !important;
  }

  .MuiCardContent-root {
  }

  .MuiCard-root {
    border-radius: 0.75rem;
  }

  .dFlexWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .MuiTypography-body2 {
    color: hsla(0, 0%, 100%, 0.5) !important;
    text-transform: uppercase !important;
  }

  .MuiTypography-caption {
    color: #f4f5fd !important;
    font-weight: 700 !important;
    font-size: 22px;
  }

  .roundedCircle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    text-align: center;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    width: 50px;
    border-radius: 50%;
    .text-success {
      color: #1bc943;
    }
    svg {
      width: 20px;
    }
  }

  .bottomContent {
    margin-top: 10px;
    display: flex;
    align-items: center;
    svg {
      width: 16px;
    }
    .MuiTypography-caption {
      font-size: 16px;
      margin: 0 6px;
    }

    .MuiTypography-body2 {
      font-size: 14px;
      font-weight: 300;
    }
  }

  .text-primary {
    color: #3c44b1 !important;
  }

  .text-success {
    color: #1bc943 !important;
  }

  .text-danger {
    color: #f83245 !important;
  }

  .text-white-50 {
    color: hsla(0, 0%, 100%, 0.5) !important;
  }
`;
