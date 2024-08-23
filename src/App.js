import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Auth/Authentication';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import AccountList from './components/Dashboard/AccountList';
import CreateAccount from './components/Dashboard/CreateAccount';
import TransactionHistory from './components/Dashboard/TransactionHistory';
import './App.css'
import FundTransfer from './components/Transfer/FundTransfer';
import NotFound from './components/NotFound/NotFound';

function App() {
  const { isAdmin, isAuthenticated } = useSelector((state) => state.auth);

  return (

    <Router>
      {isAuthenticated && <Dashboard />}
      <Routes>
        <Route path="/" element={<Authentication />} />
        {isAdmin && (<Route path="/accountlist" element={<AccountList />} />)}
        {isAdmin && (<Route path="/createAccount" element={<CreateAccount />} />)}
        {isAuthenticated && <Route path="/transactionHistory/:id" element={<TransactionHistory />} />}
        {isAuthenticated && <Route path="/fundTransfer" element={<FundTransfer />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
