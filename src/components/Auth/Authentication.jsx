import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  logIn,
  register,
  transactionHistoryData,
} from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const [login, setLogin] = useState({
    userId: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [disableLogin, setDisableLogin] = useState(true);
  const dispatch = useDispatch();
  const { error, isAdmin, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const checkLogin = () => {
    if (isLogin) {
      dispatch(logIn(login));
    } else {
      dispatch(register(login));
    }
  };

  useEffect(() => {
    login.password.length > 0 && login.userId.length > 0
      ? setDisableLogin(false)
      : setDisableLogin(true);
  }, [login]);

  const handleTransactionData =  () => {
    try {
      const result = dispatch(transactionHistoryData(login.userId));
      result && navigate(`/transactionHistory/${login.userId}`)
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    isAuthenticated
      ? isAdmin
        ? navigate("/createAccount")
        : handleTransactionData()
      : navigate("/");

      setLogin({ userId: "", password: "" });
  }, [isAdmin,isAuthenticated,isLogin]);

  const handleClick = () => {
    setIsLogin(!isLogin);
    setLogin({ userId: "", password: "" });
    dispatch(clearError());
  };
  
  return (
    <div
      style={{
        background: "#007bff",
        background: "linear-gradient(to right, #0062E6, #33AEFF)",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <p
        className='fs-1 text-light text-center mt-5'
        style={{ fontFamily: "Tilt Prism", textShadow: "3px 2px 3px blue" }}
      >
        Welcome to Banking System
      </p>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-6 col-xl-4 m-auto px-5'>
          <div className='card border-0 shadow rounded-3 my-3 bg-light'>
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

            <div className='card-body'>
              <h5 className='card-title text-center mb-5 fw-light fs-5 fw-semibold'>
                {!isLogin ? "Register" : "Login"}
              </h5>
              <form>
                <div className='form-floating mb-3'>
                  <input
                    type='number'
                    className='form-control'
                    id='floatingInput'
                    placeholder='Email address'
                    value={login.userId}
                    onChange={handleChange}
                    name='userId'
                  />
                  <label htmlFor='floatingInput'>User ID</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    id='floatingPassword'
                    placeholder='Password'
                    autoComplete='true'
                    value={login.password}
                    onChange={handleChange}
                    name='password'
                  />
                  <label htmlFor='floatingPassword'>User PIN</label>
                </div>
                <div className='d-grid mt-4'>
                  <button
                    className='btn btn-primary text-uppercase fw-semibold'
                    type='button'
                    onClick={checkLogin}
                    disabled={disableLogin}
                  >
                    {!isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </div>
                <div className='d-grid mt-4'>
                  <button
                    button
                    className='btn btn-primary text-uppercase fw-semibold'
                    type='button'
                    onClick={handleClick}
                  >
                    {!isLogin ? " Already a user? Sign In" : "   Sign Up?"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
