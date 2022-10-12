import { FormControl, FormControlLabel } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const ContentBoxWrapper = styled(Box)`
  padding: 1.75rem 0.5rem 5rem 0.5rem;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 5px 11px 0px rgb(36 49 67 / 9%);
  margin-top: 30px;
`;
export const FormBoxWrapper = styled(Box)`
display: flex,
align-items: center,
margin-top: 10px,
margin-bottom: 5px
`;

export const ButtonWrapper = styled(Button)`
  &:hover {
    background: none;
  }
  .MuiButtonBase-root.Mui-disabled {
    background-color: #3e9edc !important;
  }
`;

export const FormControlWrapper = styled(FormControlLabel)`
  .MuiTypography-body1 {
    font-size: 0.6rem;
  }
  .MuiSvgIcon-root {
    fill: black;
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

export const StyledFormControl = styled(FormControl)`
  width: 20%;
  &.MuiFormControl-root {
    margin-bottom: 5px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: grey;
    box-shadow: rgb(145 158 171 / 22%) 0px 0px 1px 0px, rgb(145 158 171 / 22%) 0px 14px 20px -4px;
  }
  .MuiSelect-selectMenu {
    min-height: 0px !important;
  }
  .MuiOutlinedInput-input {
    padding: 8.5px 14px !important;
  }
  .MuiOutlinedInput-root,
  .MuiOutlinedInput-notchedOutline {
    transition: all ease-in-out 0.3ss;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgb(218 222 228);
    box-shadow: unset;
  }
  .MuiInputLabel-outlined {
    transform: translate(0px, 1px) scale(1);
  }
`;
