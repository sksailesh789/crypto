import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   <Slide direction="up" ref={ref} {...props} />;
// });

export default function DeleteDialog(props) {
  const handleClose = () => {
    props.doClose();
  };

  const handleDialogDelete = () => {
    props.doDelete();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title || 'Do you really want to delete this item??'}
        </DialogTitle>
        {props.msg && (
          <DialogContent>
            <DialogContentText>{props.msg}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions style={{ justifyContent: 'center' }}>
          <button
            className="btn-waft btn-red"
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="btn-waft btn-green"
            onClick={handleDialogDelete}
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
