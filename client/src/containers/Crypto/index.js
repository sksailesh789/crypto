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
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectAll, makeSelectLoading,makeSelectQuery } from './selectors';
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
    all: {
      data: { data },
      page,
      size,
      totaldata,
      sort,
    },
    loadAllRequest,
    deleteOneRequest,
    clearOne,
    clearQuery,
    setQueryValue,
    query,
    loading,
  } = props;

  const navigate = useNavigate()

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    clearQuery();
    setCleared(true);
  }, []);

  useEffect(() => {
    if (cleared) {
      setCleared(false);
      loadAllRequest(query);
    }
  }, [cleared]);
 
  useEffect(() => {
    loadAllRequest(query);
  }, [ query.page, query.size]);


  const handleEdit = id => {
    navigate(`/admin/crypto-manage/edit/${id}`);
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
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

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };




  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
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
        <Fab
          color="primary"
          aria-label="Add"
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab>
      </div>
      <PageContent loading={loading}>
        
        <Table
          tableHead={[
            <span
              className="cursor-pointer flex items-center justify-between"
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
          pagination={tablePagination}
          handlePagination={handlePagination}
          emptyDataMsg="No Crypto Found"
          isSN
          ispublic
        />
      </PageContent>
    </>
  );
};





const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),

});


const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps },
);

export default compose(
  withConnect,
)(Crypto);
