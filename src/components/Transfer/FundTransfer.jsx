import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  convertFunds
} from "../../features/authSlice";

const FundTransfer = () => {
  const [user, setUser] = useState({
    accountNo: "",
    amountToTransfer: "",
    transactionType: "USD",
  });
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(convertFunds(user));
  };

  // Check if all fields have values
  const isFormValid = () => {
    return Object.values(user).every((field) => field !== "");
  };

  return (
    <div className='container m-auto row mt-5 d-flex align-items-center col-lg-5'>
      <div className='col-8'>
        <h3 className='text-start'>Fund Transfer</h3>
      </div>

      <div id='about-areas' className='row col-auto'>
        <form className='row g-3'>
          <div className='col-12 mt-lg-3'>
            <label htmlFor='inputAddress' className='form-label'>
              Account No
            </label>
            <input
              type='number'
              className='form-control'
              id='inputAddress'
              name='accountNo'
              value={user.accountNo}
              onWheel={(e) => e.target.blur()}
              onChange={handleChange}
            />
          </div>
          <div className='col-12 mt-lg-3'>
            <label htmlFor='inputAddress3' className='form-label'>
              Amount
            </label>
            <input
              type='number'
              className='form-control'
              id='inputAddress3'
              name='amountToTransfer'
              value={user.amountToTransfer}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className='col-12 mt-lg-3'>
            <select
              name='transactionType'
              id=''
              className='form-select'
              onChange={handleChange}
            >
              <option hidden={true}>Type</option>
              <option value='USD'>USD</option>
              <option value='AUD'>AUD</option>
              <option value='PLN'>PLN</option>
              <option value='MXN'>MXN</option>
              <option value='CAD'>CAD</option> 
            </select>
          </div>
          <div className='col-12 my-4 mt-lg-5 d-flex justify-content-between'>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Transfer Fund
            </button>
            {error && (
              <p className='card-title text-center text-danger fw-semibold ms-2'>
                {error}
              </p>
            )}
            {message && (
              <p className='card-title text-center text-success fw-semibold ms-2'>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundTransfer;
