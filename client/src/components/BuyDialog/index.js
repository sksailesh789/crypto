import React,{useState} from 'react';
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

export default function BuyDialog(props) {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        props.points(e.target.value)
      };

  const handleClose = () => {
    props.doClose();
  };

  const handleBuy = () => {
    props.doBuy();

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
          Buy {props.name }
        </DialogTitle>
        {/* {props.msg && ( */}
          <DialogContent>
            <DialogContentText className='dialogtext'>{'Amount'}</DialogContentText>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className='dialoginput'
                placeholder="Enter a value"
            />
          </DialogContent>
        {/* )} */}
        <DialogActions style={{ justifyContent: 'center' }}>
          <button
            className="btn-waft btn-red"
            onClick={handleBuy}
          >
            Buy
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
