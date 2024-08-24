import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, transactionHistoryData } from "../../features/authSlice";
import Contact from "./Contact";

const TransactionHistory = () => {
  const {
    transactionHistoryData: [userTransaction],
    isAdmin,
    userId,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    !isAdmin && dispatch(transactionHistoryData(userId));
    dispatch(clearError());
  }, [userTransaction]);
  const navigate = useNavigate();

  return (
    <div className='container m-auto row mt-5 d-flex align-items-center col-lg-5'>
      {userTransaction?.status == "inactive" ? (
        <Contact/>
      ) : Array.isArray(userTransaction.customerTransactions) &&
        userTransaction.customerTransactions.length > 0 ? (
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
              <tr key={data.transactionId}>
                <td>{data.transactionId}</td>
                <td>{data.transactionDate}</td>
                <td>{data.transactionAmount}</td>
                <td>{data.transactionType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='col-8'>
          <h3 className='text-start'>No Transaction History available.</h3>
        </div>
      )}
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
