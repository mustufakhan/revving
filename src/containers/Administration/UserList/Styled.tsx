import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const MainContentWrapper = styled(Box)`
  padding: 1.75rem 2rem 6rem 2rem;
  background: #f8f8fb;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 60px;
`;
export const StyledButton = styled(Button)`
  &.MuiButton-outlined {
    margin-left: 15px;
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

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 500px;
  }
`;

export const DialogContentWrapper = styled.div`
  .MuiFormControl-root {
    width: 100%;
    margin-top: 15px;
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
    max-height: 740px;
  }
  .userlist_tbl {
    .MuiTableCell-root {
      white-space: nowrap;
    }
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

export const StyledInput = styled.input`
  display: none;
`;
