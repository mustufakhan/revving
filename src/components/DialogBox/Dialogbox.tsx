import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

interface IProps {
  open: boolean;
  handleClose: () => void;
  description: string;
  handleDelete: () => void;
}

const Dialogbox: React.FC<IProps> = ({ open, handleClose, description, handleDelete }) => (
  <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Customer Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          N0
        </Button>
        <Button onClick={handleDelete} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </>
);

export default Dialogbox;
