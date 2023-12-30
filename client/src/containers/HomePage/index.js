/**
 *
 * Brand
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {IMAGE_BASE} from '../App/constants.js'
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectCryptoList, makeSelectLoading,makeSelectAll,makeSelectPoint } from '../Crypto/selectors.js';
// import { makeSelectAll } from '../Crypto/selectors.js';
import reducer from '../Crypto/reducer';
import saga from '../Crypto/saga';
import * as mapDispatchToProps from '../Crypto/actions';
// import * as newmapDispatchToProps from '../Crypto/actions';

import ExchangeDialog from '../../components/ExchangeDialog';
import Loading from '../../components/Loading';

const key = 'crypto';

export const Home= props => {
  const {
    getCryptoRequest,
    cryptoList,
    loadAllRequest,
    exchangeOneRequest,
    loading,
    all,
    totalpoint
  } = props;


  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [parentInputValue, setParentInputValue] = useState('');
  const [exchangeOption , setExchangedOption] = useState('')

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });


  
  useEffect(() => {

    getCryptoRequest();
    loadAllRequest();
  }, []);

  const showExchangeDialog = (each) => {
    setOpen(true)
    setName(each.crypto.name)
    setId(each.crypto._id)
  }

  const handleExchange = () => {
    console.log(id,parentInputValue,exchangeOption,'ppp')
    exchangeOneRequest({id,parentInputValue,exchangeOption})
    setOpen(false)
  }
  const handleSelectedOptionChange = (value) =>{
    setExchangedOption(value)
  }

  const handleChildInputChange = (childInputValue) => {
    setParentInputValue(childInputValue);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const cryptolists = cryptoList && cryptoList.map(
    (each) => {
      return(
        <div className='crypto_wrap flex justify-between items-center'>
          <div className="image_wrap">
              <img className="img-fluid" src={`${IMAGE_BASE}${each.crypto.image[0].path}`} />
          </div>
          <div className='crypto_name'>{each.crypto.name}</div>
          <div className='crypto_Point'>{each.point}</div>
          <button onClick={() => showExchangeDialog(each)}>Exchange</button>
        </div>
        // <div className='flex justify-between'>
        //     <div>
        //         {<img className="img-fluid"src={`${IMAGE_BASE}${each.crypto.image[0].path}`}/>}
        //     </div>
        //     <div>{each.crypto.name}</div>
        //     <div>{each.point}</div>
        //     <div onClick={() => showExchangeDialog(each)}>Exchange</div>
        // </div>
    )}
  );

  return (
    <>
      <ExchangeDialog
        open={open}
        name={name}
        doClose={handleClose}
        doExchange={  handleExchange}
        points = {handleChildInputChange}
        all={all}
        selectedOption={handleSelectedOptionChange}
      />
      
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        
      </div>
      <div className="home_point">
        <div className="flex justify-between">
          <div className="crypto_type">
            <p>Number of Crypto Coins Type</p>
            <p className='text-center'>{cryptoList.length}</p>
          </div>
          <div className="crypto_type">
            <p>Total Number of Crypto Coins </p>
            <p  className='text-center'>{totalpoint}</p>
          </div>
        </div>
      </div>
      {cryptoList ? cryptolists : 'no crypto in your wallet'}
    </>
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
  cryptoList: makeSelectCryptoList(),
  loading: makeSelectLoading(),
  all: makeSelectAll(),
  totalpoint : makeSelectPoint()
});

// const withStyle = withStyles(styles);

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps  },
);

export default compose(
  withConnect,
//   withStyle,
)(Home);
