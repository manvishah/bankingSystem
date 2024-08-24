import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated, user, userId } = useSelector(
    (state) => state.auth
  );

  const handleSignOut = () => {
    navigate("/");
    dispatch(logout());
  };
  return (
    <nav className='navbar navbar-primary bg-dark'>
      <div className='container-fluid'>
        <p className='navbar-brand mx-3 mx-lg-5 text-light'>
          {isAuthenticated && user !=="-" ? `Hello ${user}` : `Banking System`}
        </p>
        <form className='d-flex'>
          <Link
            className='btn btn-outline-light mx-3 mx-lg-5'
            type='button'
            to={isAdmin ? `/createAccount` : `/transactionHistory/${userId}`}
          >
            {isAdmin ? "Create Account" : "Transaction History"}
          </Link>
        </form>

        <form className='d-flex'>
          <Link
            className='btn btn-outline-light mx-3 mx-lg-5'
            type='button'
            to={isAdmin ? `/accountlist` : "/fundTransfer"}
          >
            {isAdmin ? "Account List" : "Fund Transfer"}
          </Link>
        </form>

        <form className='d-flex'>
          <button
            className='btn btn-outline-light mx-3 mx-lg-5'
            type='button'
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
}
