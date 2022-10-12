import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';

export const MainContentWrapper = styled(Box)`
  padding: 1.75rem 2rem 6rem 2rem;
  background: #f8f8fb;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 60px;
  .MuiTableCell-sizeSmall:last-child {
    text-align: right;
  }
`;

export const StyledBox = styled(Box)`
  .MuiTableCell-root {
    border-bottom: none;
    display: flex;
    align-items: flex-end;
  }
`;

export const StyledGridButton = styled(Grid)`
  .MuiButtonBase-root {
    margin-left: auto;
    margin-right: 16px;
    display: flex;
  }

  &.addColumn.flex-end {
    display: flex;
    margin-top: 13px;
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
    margin-top: 18px;
    width: 100%;
    height: 54px;
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

export const DialogContentWrapper = styled.div`
  .MuiFormControl-root {
    width: 100%;
    margin-top: 15px;
  }
`;

export const StyledErrorWrapper = styled(FormHelperText)`
  .MuiFormHelperText-root {
    color: red;
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 500px;
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const StyledLabel = styled.label`
  border: 1px solid #a0a5d9;
  padding: 10px 20px;
  border-radius: 4px;
  color: #4051b5;
  font-family: 'Roboto';
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
`;
