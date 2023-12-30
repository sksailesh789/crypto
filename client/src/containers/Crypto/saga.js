import {
    takeLatest,
    cancel,
    take,
    call,
    put,
    fork,
    select,
  } from 'redux-saga/effects';
  // import { push, LOCATION_CHANGE } from 'connected-react-router';
  
  import * as types from './constants';
  import * as actions from './actions';
  import { makeSelectToken,makeSelectUser } from '../App/selectors';
  import Api from '../../utils/Api';
  import {  enqueueSnackbar } from 'notistack'

  import { makeSelectOne } from './selectors';
  
  function* loadAll(action) {
    const token = yield select(makeSelectToken());
    let query = '';
    if (action.payload) {
      Object.keys(action.payload).map(each => {
        query = `${query}&${each}=${action.payload[each]}`;
        return null;
      });
    }
    yield call(
        Api.get(
          `crypto/allcrypto?${query}`,
          actions.loadAllSuccess,
          actions.loadAllFailure,
          token,
        ),
      );
  }
  
 
  function* loadOne(action) {
    const token = yield select(makeSelectToken());
    yield call(
      Api.get(
        `crypto/detail/${action.payload}`,
        actions.loadOneSuccess,
        actions.loadOneFailure,
        token,
      ),
    );
  }
  
  
  
//   function* redirectOnSuccess() {
//     const action = yield take(types.ADD_EDIT_SUCCESS);
//     const user = yield select(makeSelectUser());
  
//     if (user && user.isAdmin && window.location.pathname.includes('admin')) {
//       if (action.payload.errors && Object.keys(action.payload.errors).length) {
//         yield put(
//           push(`/admin/product-manage/edit/${action.payload.data._id}`, {
//             errors: action.payload.errors,
//           }),
//         );
//         yield put(loadOneRequest(action.payload.data._id));
//       } else {
//         yield put(push(`/admin/product-manage`));
//       }
//     } else if (
//       action.payload.errors &&
//       Object.keys(action.payload.errors).length
//     ) {
//       yield put(
//         push(`/seller/product-manage/edit/${action.payload.data._id}`, {
//           errors: action.payload.errors,
//         }),
//       );
//       yield put(loadOneRequest(action.payload.data._id));
//     } else {
//       yield put(push(`/seller/product-manage`));
//     }
//   }
  
  function* addEdit() {
    // const successWatcher = yield fork(redirectOnSuccess);
    const token = yield select(makeSelectToken());
    const data = yield select(makeSelectOne());
    // const user = yield select(makeSelectUser());
    console.log(data,'888')
      yield fork(
        Api.multipartPost(
          'crypto',
          actions.addEditSuccess,
          actions.addEditFailure,
          data,
           data.image,
          token,
        ),
      );
  
    // yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
    // yield cancel(successWatcher);
  }
  
 
  
  
  
  function* addEditFailureFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Something went wrong',
      options: {
        variant: 'warning',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})
  }
  
  function* addEditSuccessFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Update Success!!!',
      options: {
        variant: 'success',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})
  }
  
  function* deleteCrypto(action) {
    const token = yield select(makeSelectToken());
  
    yield call(
      Api.delete(
        `crypto/delete/${action.payload}`,
        actions.deleteOneSuccess,
        actions.deleteOneFailure,
        
        token,
      ),
    );
  }

 
  
  function* deleteSuccessFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Crypto delete success!!!',
      options: {
        variant: 'success',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})
    
  }
  
  function* deleteFailureFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Something went wrong',
      options: {
        variant: 'warning',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'warning'})

  }

  export function* getCryptoAction(action) {
    const token = yield select(makeSelectToken());

    yield call(
      Api.get(
        `user`,
        actions.getCryptoSuccess,
        actions.getCryptoFailure,
        token,
      ),
    );
  }
  export function* exchangeOneAction(action) {
    const token = yield select(makeSelectToken());
    let fromCryptoId = action.payload.id
    let toCryptoId = action.payload.exchangeOption
    let points = action.payload.parentInputValue

    yield call(
      Api.post(
        `user/exchangecrypto`,
        actions.exchangeOneSuccess,
        actions.exchangeOneFailure,
        {fromCryptoId,toCryptoId,points},
        token
      ),
    );
  }
  function* exchangeSuccessFunc(action) {
    console.log(action,'988888')

    const snackbarData = {
      message: action.payload.msg || 'Crypto exchange success!!!',
      options: {
        variant: 'success',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})
    yield put(actions.getCryptoRequest());

  }
  
  function* exchangeFailureFunc(action) {
    console.log(action,'988888')

    const snackbarData = {
      message: action.payload.error || 'Something went wrong',
      options: {
        variant: 'warning',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'warning'})

  }

  function* buyCrypto(action) {
    const token = yield select(makeSelectToken());
    let id = action.payload.id
    let point = action.payload.parentInputValue
    yield call(
      Api.post(
        `user/buycrypto`,
        actions.buyOneSuccess,
        actions.buyOneFailure,
        {id,point},
        token
      ),
    );
  }

  function* buySuccessFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Crypto buy success!!!',
      options: {
        variant: 'success',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})

  }
  
  function* buyFailureFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Something went wrong',
      options: {
        variant: 'warning',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'warning'})

  }
  
  
  export default function* cryptoSaga() {
    yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
    yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
    yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
    yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
    yield takeLatest(types.DELETE_ONE_REQUEST, deleteCrypto);
    yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
    yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
    yield takeLatest(types.BUY_ONE_REQUEST, buyCrypto);
    yield takeLatest(types.BUY_ONE_FAILURE, buyFailureFunc);
    yield takeLatest(types.BUY_ONE_SUCCESS, buySuccessFunc);
    yield takeLatest(types.GET_CRYPTO_REQUEST, getCryptoAction);
    yield takeLatest(types.EXCHANGE_ONE_REQUEST, exchangeOneAction);
    yield takeLatest(types.EXCHANGE_ONE_FAILURE, exchangeFailureFunc);
    yield takeLatest(types.EXCHANGE_ONE_SUCCESS, exchangeSuccessFunc);
    
    yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
    // yield takeLatest(types.LOAD_ONE_SUCCESS, exchangeFailureFunc);
    // yield takeLatest(types.LOAD_ONE_SUCCESS, exchangeSuccessFunc);
    

  }
  