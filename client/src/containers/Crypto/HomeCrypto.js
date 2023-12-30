/**
 *
 * Brand
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {useNavigate} from 'react-router-dom'
import {IMAGE_BASE} from '../App/constants.js'
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectAll, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import BuyDialog from '../../components/BuyDialog';
import Loading from '../../components/Loading';

const key = 'crypto';

export const HomeCrypto = props => {
  const {
    all,
    loadAllRequest,
    buyOneRequest,
    loading,
  } = props;


  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [parentInputValue, setParentInputValue] = useState('');


  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });


  
  useEffect(() => {
    loadAllRequest();
  }, []);

  const showBuyDialog = (each) => {
    setOpen(true)
    setName(each.name)
    setId(each._id)
  }

  const handleBuy = (id) => {
    console.log(id,parentInputValue,'ppp')
    buyOneRequest({id,parentInputValue})
    setOpen(false)
  }

  const handleChildInputChange = (childInputValue) => {
    setParentInputValue(childInputValue);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const cryptolist = all.data.data.map(
    (each) => {
      return(
        <div className='crypto_wrap flex justify-between items-center' key={each._id}>
          <div className="image_wrap">
              <img className="img-fluid" src={`${IMAGE_BASE}${each.image[0].path}`} />
          </div>
          <div className='crypto_name'>{each.name}</div>
          <button onClick={() => showBuyDialog(each)}>Buy</button>
        </div>
       
    )}
  );

  return (
    <div className='home_wrap'>
      <div className='container'>
      <BuyDialog
        open={open}
        name={name}
        doClose={handleClose}
        doBuy={() => handleBuy(id)}
        points = {handleChildInputChange}
      />
      
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        
      </div>
      {cryptolist}
    </div>
    </div>
  );
};



// Brand.propTypes = {
//   loadAllRequest: PropTypes.func.isRequired,
//   all: PropTypes.shape({
//     data: PropTypes.shape({
//       data: PropTypes.array.isRequired,
//     }),
//     page: PropTypes.number.isRequired,
//     size: PropTypes.number.isRequired,
//     totaldata: PropTypes.number.isRequired,
//   }),
//   deleteOneRequest: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
});

// const withStyle = withStyles(styles);

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps },
);

export default compose(
  withConnect,
//   withStyle,
)(HomeCrypto);
