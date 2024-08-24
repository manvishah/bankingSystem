import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../features/authSlice";

const CreateAccount = () => {
  const [user, setUser] = useState({
    customerId: "",
    customerAccountNo: new Date().valueOf(),
    customerName: "",
    customerContact: "",
    customerEmail: "",
    customerPin: "",
    customerAccountBalance: 1000,
    customerAadhar: "",
    customerPan: "",
    customerAccountType: "savings",
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
    dispatch(createAccount(user));
  };

  // Check if all fields have values
  const isFormValid = () => {
    return Object.values(user).every((field) => field !== "");
  };

  return (
    <div className='container m-auto row mt-5 d-flex align-items-center col-lg-5'>
      <div className='col-8'>
        <h3 className='text-start'>Create Savings Account</h3>
      </div>

      <div id='about-areas' className='row col-auto'>
        <form className='row g-3'>
          <div className='col-12 mt-lg-3'>
            <label htmlFor='inputAddress3' className='form-label'>
              User ID
            </label>
            <input
              type='number'
              className='form-control'
              id='inputAddress3'
              name='customerId'
              value={user.customerId}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className='col-12 mt-lg-3'>
            <label htmlFor='inputAddress' className='form-label'>
              Account No
            </label>
            <input
              type='number'
              className='form-control'
              id='inputAddress'
              name='customerAccountNo'
              value={user.customerAccountNo}
              disabled
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className='col-12 mt-lg-4'>
            <label htmlFor='inputAddress2' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='inputAddress2'
              name='customerName'
              value={user.customerName}
              onChange={handleChange}
            />
          </div>
          <div className='col-md-6 mt-lg-4'>
            <label htmlFor='inputcustomerEmail4' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='inputEmail4'
              name='customerEmail'
              value={user.customerEmail}
              onChange={handleChange}
            />
          </div>
          <div className='col-md-6 mt-lg-4'>
            <label htmlFor='inputcustomerPin4' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword4'
              name='customerPin'
              value={user.customerPin}
              onChange={handleChange}
              autoComplete='true'
            />
          </div>
          <div className='col-md-6 mt-lg-4'>
            <div className='row '>
              <label htmlFor='customerContact' className='form-label'>
                Contact
              </label>
              <div className='input-group'>
                <input
                  type='number'
                  className='form-control'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                  id='contact'
                  name='customerContact'
                  value={user.customerContact}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                  maxLength={10}
                  minLength={6}
                />
              </div>
            </div>
          </div>
          <div className='col-md-6 mt-lg-4'>
            <label htmlFor='inputPassword4' className='form-label'>
              Account Balance
            </label>
            <input
              type='number'
              className='form-control'
              name='customerAccountBalance'
              value={user.customerAccountBalance}
              onChange={handleChange}
              autoComplete='true'
            />
          </div>
          <div className='col-md-6 mt-lg-4'>
            <label htmlFor='inputPassword4' className='form-label'>
              Aadhar Card Number
            </label>
            <input
              type='text'
              className='form-control'
              name='customerAadhar'
              value={user.customerAadhar}
              onChange={handleChange}
              autoComplete='true'
            />
          </div>{" "}
          <div className='col-md-6 mt-lg-4'>
            <label htmlFor='inputPassword4' className='form-label'>
              Pan Card Number
            </label>
            <input
              type='text'
              className='form-control'
              name='customerPan'
              value={user.customerPan}
              onChange={handleChange}
              autoComplete='true'
              required
            />
          </div>
          <div className='col-12 my-4 mt-lg-5 d-flex justify-content-between'>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Create account
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

export default CreateAccount;
