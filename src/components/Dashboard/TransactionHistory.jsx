import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, transactionHistoryData } from "../../features/authSlice";

const TransactionHistory = () => {
  const {
    transactionHistoryData: [userTransaction],
    isAdmin,
    userId,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    !isAdmin && dispatch(transactionHistoryData( userId ));
    dispatch(clearError());

  }, [userTransaction]);
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <table className='table text-center w-75 m-auto mt-3 shadow border '>
        <thead className='bg-light'>
          <tr>
            <th scope='col'>Transaction Id</th>
            <th scope='col'>Transaction Date</th>
            <th scope='col'>Transaction Amount</th>
            <th scope='col'>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {userTransaction?.customerTransactions?.map((data) => (
            <tr>
              <td>{data.transactionId}</td>
              <td>{data.transactionDate}</td>
              <td>{data.transactionAmount}</td>
              <td>{data.transactionType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <button
          type='button'
          className='btn btn-outline-danger btn-small action-btn'
          onClick={() => navigate(`/accountlist`)}
        >
          Back to Account Lists
        </button>
      )}
    </div>
  );
};

export default TransactionHistory;
