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
// import withStyles from '@material-ui/core/styles/withStyles';
// import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
// import Fab from '@mui/material/Fab';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectAll, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import DeleteDialog from '../../components/DeleteDialog';
import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import Table from '../../components/Table/Table.js';

const key = 'crypto';

export const Crypto = props => {
  const {
    all,
    loadAllRequest,
    deleteOneRequest,
    clearOne,
    loading,
  } = props;

  const navigate = useNavigate()

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');

  
  useEffect(() => {
    loadAllRequest();
  }, []);


  const handleEdit = id => {
    navigate(`/admin/crypto-manage/edit/${id}`);
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleAdd = () => {
    clearOne();
    navigate('/admin/crypto-manage/add');
  };

  




  const tableData = all.data.map(
    (each) => {
      return([
      each.name,
      <div >
        {<img
              className="h-12"
              src={`${IMAGE_BASE}${each.image[0].path}`}
            />}</div>,
      <>
        <div className="flex justify-center">
          <button
            type="button"
            aria-label="Edit"
            className=" px-1 text-center leading-none"
            onClick={() => handleEdit(each._id)}
          >
            <i className="material-icons text-base text-indigo-500 hover:text-indigo-700">
              edit
            </i>
          </button>
          <button
            type="button"
            className="ml-2 px-1 text-center leading-none"
            onClick={() => handleOpen(each._id)}
          >
            <i className="material-icons text-base text-red-400 hover:text-red-600">
              delete
            </i>
          </button>
        </div>
      </>,
    ])},
  );

  return (
    <>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Crypto Manage</PageHeader>
        {/* <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab> */}
        <p onClick={handleAdd} className='text-lg'
        >Add</p>
      </div>
      <PageContent loading={loading}>
        
        <Table
          tableHead={[
            <span
              className="cursor-pointer flex items-center justify-between"
              // onClick={() => handleSortChange('title')}
            >
              Name
            </span>,
            <span
              className="cursor-pointer flex items-center justify-between"
            >
              Image
            </span>,
            <div className="text-center">Action</div>,
          ]}
          tableData={tableData}
          // pagination={tablePagination}
          // handlePagination={handlePagination}
          emptyDataMsg="No Crypto Found"
          isSN
          ispublic
        />
      </PageContent>
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
)(Crypto);
