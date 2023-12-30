import React from 'react';
// import PropTypes from 'prop-types';
// @material-ui/core components
import TablePagination from '@mui/material/TablePagination';
import style from './table.css';
import Loader from '../../assets/img/loading_transparent.gif';

// core components

/* eslint-disable react/no-array-index-key */
function CustomTable({ ...props }) {
  const {
    ispublic,
    isscrollable,
    isTblsm,
    isSN,
    isDashboard,
    isReview,
    isOrderlist,
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    pagination,
    handlePagination,
    emptyDataMsg,
    loading,
    activeData,
  } = props;

  return (
    <div
      className={`bg-white overflow-hidden mt-2 ${`${
        isDashboard ? 'shadow-none' : 'shadow'
      }`} 
      ${`${isOrderlist ? 'shadow-none' : 'shadow'}`}
      ${`${isReview ? 'shadow-none' : 'shadow'}`} ${`${
        ispublic ? 'shadow-none' : 'shadow'
      }`}`}
    >
      <table
        className={`w-full block md:table overflow-auto table-auto 
        ${`${isReview ? 'table' : ''}`}
        ${`${isscrollable ? 'x-scroll' : ''}`}
        ${isTblsm ? 'tblsm' : ''}`}
      >
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {isSN && (
                <th
                  className={`text-center ${
                    ispublic
                      ? 'border px-2 py-1'
                      : 'py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300'
                  }`}
                  key="SerialNo."
                >
                  S.N.
                </th>
              )}
              {tableHead.map((prop, key) => (
                <th
                  className={`${
                    ispublic
                      ? 'border px-2 py-1'
                      : 'py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300'
                  }`}
                  // ""
                  key={key}
                >
                  {prop}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}

        {tableData.length > 0 ? (
          <tbody>
            {tableData.map((prop, key) => (
              <tr
                key={key}
                className={`${
                  activeData &&
                  activeData.length > 0 &&
                  activeData[key][0] === false
                    ? 'tblactive'
                    : ''
                }`}
              >
                {isSN && (
                  <td
                    className={`text-center  ${
                      ispublic
                        ? 'border px-2 py-1'
                        : 'px-2 py-1 text-sm border-gray-300 text-gray-800'
                    }  `}
                    key="SN"
                  >
                    {pagination && pagination.page
                      ? pagination.page * pagination.size +
                        (key + 1) -
                        pagination.size
                      : key + 1}
                  </td>
                )}

                {prop.map((each, index) => (
                  <td
                    className={`
                    ${`${isReview ? 'Review' : ''}`}
                    ${`${isOrderlist? 'orderlisttd' : ''}`}
                    ${
                      ispublic
                        ? 'border px-2 py-1'
                        : 'px-2 py-1 text-sm border-gray-300 text-gray-800'
                    }`}
                    key={index}
                  >
                    {each}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          loading && (
            <tbody>
              <tr>
                <td colSpan={tableHead.length} className="py-2 text-center">
                  <img
                    src={Loader}
                    alt="loading"
                    className="inline-block w-8 h-8"
                  />
                </td>
              </tr>
            </tbody>
          )
        )}
      </table>
      {tableData.length < 1 && loading === false && (
        <p
          className={`${
            ispublic
              ? ' text-center border-t-0 border px-2 py-1'
              : 'px-2 py-1 text-sm border-gray-300 text-gray-800'
          }`}
        >
          {emptyDataMsg || 'No Data Found'}
        </p>
      )}
      <table
        className={`w-full 
       ${`${isReview ? 'Review' : ''}`}
       ${`${isOrderlist? 'orderlistPagination' : ''}`}
      ${ispublic ? '' : 'border-t'}`}
      >
        <tbody>
          <tr>
            {pagination && handlePagination && (
              <TablePagination
                className={`${isReview ? 'ReviewPagination' : ''}`}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  padding: 0,
                }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                colSpan={3}
                count={pagination.totaldata}
                rowsPerPage={pagination.size}
                page={pagination.page - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onPageChange ={(e, page) =>
                  handlePagination({ ...pagination, page: page + 1 })
                }
                onRowsPerPageChange={e =>
                  handlePagination({ ...pagination, size: e.target.value })
                }
              />
            )}
          </tr>
        </tbody>
      </table>{' '}
    </div>
  );
}

// CustomTable.defaultProps = {
//   tableHeaderColor: 'gray',
//   handlePagination: () =>
//     console.log('todo: make handlePagination function!!!'),
// };

// CustomTable.propTypes = {
//   classes: PropTypes.object,
//   tableHeaderColor: PropTypes.oneOf([
//     'warning',
//     'primary',
//     'danger',
//     'success',
//     'info',
//     'rose',
//     'gray',
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
//   ),
//   pagination: PropTypes.shape({
//     page: PropTypes.number.isRequired,
//     size: PropTypes.number.isRequired,
//     totaldata: PropTypes.number.isRequired,
//   }),
//   handlePagination: PropTypes.func,
// };

export default CustomTable;
