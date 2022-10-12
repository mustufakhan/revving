import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

export const MainContentWrapper = styled(Box)`
  padding: 1.75rem 2rem 6rem 2rem;
  background: #f8f8fb;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 60px;
`;

export const StyledFormControlTable = styled(FormControl)`
  width: 100%;
  &.MuiFormControl-root {
    margin-bottom: 15px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228 / 20%);
  }

  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228);
    box-shadow: unset;
  }
`;

export const StyledGrid = styled(Grid)`
  .MuiFormControl-root {
    width: 100%;
    box-shadow: rgb(145 158 171 / 22%) 0px 0px 1px 0px, rgb(145 158 171 / 22%) 0px 14px 20px -4px;
    background: #fff;
    padding-top: 12px;
  }
  .MuiInputLabel-formControl {
    padding-top: 8px;
  }
  .MuiInputLabel-formControl,
  .MuiInputBase-input {
    padding-left: 12px;
  }
  .MuiButton-root {
    width: 100%;
    height: 54px;
  }
  .MuiFormControl-marginNormal {
    margin-top: 0px;
  }

  .MuiFormControl-marginNormal {
    margin-top: 0px;
  }
`;

export const StyledTableWrap = styled(Box)`
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  box-shadow: rgb(145 158 171 / 22%) 0px 0px 1px 0px, rgb(145 158 171 / 22%) 0px 14px 20px -4px;
  margin: 30px 0;
  overflow: hidden;
  border-radius: 6px;
  .cstm_pagination {
    display: none;
  }
  .MuiTableRow-root.MuiTableRow-head {
    background: #f0f0f5;
  }

  .MuiTableContainer-root {
    max-height: 740px;
  }
  .report_data_tbl {
    .MuiTableCell-body {
      padding-right: 44px;
      &.padd_lft_align {
        text-align: right;
      }
    }
  }
`;

export const ContentBoxWrapper = styled(Box)`
  padding: 1.75rem 2rem 6rem 2rem;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 5px 11px 0px rgb(36 49 67 / 9%);
  margin-top: 30px;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
  &.MuiFormControl-root {
    margin-bottom: 15px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228 / 20%);
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228);
    box-shadow: unset;
  }
`;

export const StyledInput = styled.input`
  display: none;
`;
export const DialogContentWrapper = styled.div`
  .MuiFormControl-root {
    width: 100%;
    margin-top: 15px;
  }
`;
export const Styledbutton = styled.div`
  .confirm_btn {
    padding: 14px 16px;
    font-size: 14px;
    background: green;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      background: #085b08;
    }
  }
  .MuiButton-root.Mui-disabled {
    color: rgba(0, 0, 0, 0.26);
    background: #ccc;
  }
`;
export const StyledDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 500px;
  }
  .comment_row {
    ul {
      li {
        list-style: none;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 11px 0;
      }
    }
  }
  .text_area {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    resize: none;
    border: 1px solid #ddd;
    min-height: 100px;
    font-family: 'Roboto';
    padding: 8px;
  }
  .submit_btn {
    background: #2b6df6;
    padding: 12px 10px;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;
