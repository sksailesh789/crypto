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

export default function ExchangeDialog(props) {

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        props.points(e.target.value)
      };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        props.selectedOption(e.target.value)

      };
    

  const handleClose = () => {
    props.doClose();
  };

  const handleExchange = () => {
    props.doExchange();

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
          Exchange {props.name } with
        </DialogTitle>
        <DialogContent>
        <select value={selectedOption} onChange={handleOptionChange} className='exchange_select'> 
            <option value=''>please select </option>
            {props.all.data.data.map(each => (
                <option key={each._id} value={each._id}>
                  {each.name}
                </option>
            ))}
        </select>
        
        </DialogContent>
        
          <DialogContent>
            <DialogContentText className='dialogtext'>Amount of {props.name}</DialogContentText>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a value"
                className='dialoginput'
            />
          </DialogContent>
        {/* )} */}
        <DialogActions style={{ justifyContent: 'center' }}>
          <button
            className="btn-waft btn-red"
            onClick={handleExchange}
          >
            Exchange
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
