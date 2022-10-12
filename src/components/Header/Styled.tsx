import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  .MuiAppBar-colorPrimary {
    background: rgb(255, 255, 255);
    color: rgb(158, 158, 158);
    border-bottom: 1px solid #e1e6f1;
    box-shadow: -7.829px 11.607px 20px 0px rgb(144 143 160 / 9%);
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 260px);
    margin-left: 260px;
    z-index: 9;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0px;
    }
  }

  .makeStyles-search-8 {
    transition: all ease-in-out 0.2s;
    width: 35%;
  }

  .makeStyles-search-8:hover {
    background-color: rgb(242, 242, 242);
  }

  .makeStyles-inputInput-11 {
    color: rgb(66, 66, 66);
    padding: 10px 10px 10px 48px;
    font-size: 14px;
    font-weight: 300;
    color: #7081b9;
    width: 100%;
    :placeholder {
      color: #7081b9;
    }
  }

  .makeStyles-inputRoot-10 {
    width: 100%;
  }

  .makeStyles-searchIcon-9 svg {
    height: 20px;
    color: #7081b9;
  }

  .MuiIconButton-label {
    color: #7081b9;
  }
`;
