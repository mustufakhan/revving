import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export const KeyboardDatePickerWrapper = styled(KeyboardDatePicker)`
  .MuiFormLabel-root {
    display: none;
  }
  .MuiInput-underline:before {
    display: none;
    border-bottom: none;
  }
  .MuiInput-underline:after {
    display: none;
    border-bottom: none;
  }
  .MuiInputBase-input {
    font-size: 0.875rem;
    margin-top: 0px;
    width: 80px;
  }
  .MuiFormControl-marginNormal {
    margin-top: 0px;
    width: 130px;
  }
  label + .MuiInput-formControl {
    margin-top: -8px;
  }
`;
export const MuiPickersUtilsProviderWrapper = styled(MuiPickersUtilsProvider)`
  .MuiFormControl-marginNormal {
    margin-top: 0px;
    width: 130px;
  }
  .MuiInputBase-root {
    display: inline-flex;
  }
  .MuiFormLabel-root {
    display: none;
  }
`;

export const MainContentWrapper = styled(Box)`
  padding: 1.75rem 2rem 6rem 2rem;
  background: #f8f8fb;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 60px;
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
    margin-top: opx;
    width: 100%;
    height: 54px;
  }

  .MuiFormControl-marginNormal {
    margin-top: 0px;
  }

  .MuiFormControl-marginNormal {
    margin-top: 0px;
    margin-bottom: 8px;
  }
`;

export const StyledTableWrap = styled(Box)`
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  box-shadow: rgb(145 158 171 / 22%) 0px 0px 1px 0px, rgb(145 158 171 / 22%) 0px 14px 20px -4px;
  margin: 30px 0;
  overflow: hidden;
  border-radius: 6px;

  .MuiTableRow-root.MuiTableRow-head {
    background: #f0f0f5;
  }

  .MuiTableContainer-root {
    max-height: 741px;
  }
  .report_data_tbl {
    .MuiTableCell-body {
      padding-right: 44px;
      &.padd_lft_align {
        text-align: right;
      }
    }
  }
  .approve_btn {
    background: green;
    color: #fff;
    margin: 0 4px;
    border: 3px solid transparent;
    &:hover {
      background: #055b05;
      border: 3px solid transparent;
    }
    &.bdr {
      border: 3px solid #000;
    }
  }
  .reject_btn {
    background: red;
    color: #fff;
    margin: 0 4px;
    border: 3px solid transparent;
    &:hover {
      background: #c70404;
      border: 3px solid transparent;
    }
  }
  .cancel_btn {
    background: blue;
    color: #fff;
    margin: 0 4px;
    border: 3px solid transparent;
  }
`;

export const ContentBoxWrapper = styled(Box)`
  padding: 1.75rem 2rem 6rem 2rem;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 5px 11px 0px rgb(36 49 67 / 9%);
  margin-top: 30px;
  .auto_drop {
    .MuiOutlinedInput-notchedOutline {
      border-color: rgb(218 222 228 / 20%);
      box-shadow: rgb(145 158 171 / 22%) 0px 0px 1px 0px, rgb(145 158 171 / 22%) 0px 14px 20px -4px;
    }

    .MuiOutlinedInput-root,
    .MuiOutlinedInput-notchedOutline {
      transition: all ease-in-out 0.3ss;
    }
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgb(218 222 228);
      box-shadow: unset;
    }
    .MuiAutocomplete-clearIndicator {
      display: none;
    }
  }
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
  &.MuiFormControl-root {
    margin-bottom: 15px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228 / 20%);
    box-shadow: rgb(145 158 171 / 22%) 0px 0px 1px 0px, rgb(145 158 171 / 22%) 0px 14px 20px -4px;
  }

  .MuiOutlinedInput-root,
  .MuiOutlinedInput-notchedOutline {
    transition: all ease-in-out 0.3ss;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228);
    box-shadow: unset;
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const StyledButton = styled(Button)`
  &.MuiButton-outlined {
    margin-left: 15px;
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
export const DialogContentWrapper = styled.div`
  .MuiFormControl-root {
    width: 100%;
    margin-top: 15px;
  }
  .selectClass {
  }
`;
