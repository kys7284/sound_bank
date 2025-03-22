import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import DepositList from './Deposit/DepositList';
import AddDeposit from './Deposit/AddDeposit';
import DepositCalculator from './Deposit/DepositCalculator';
import FileDownLoader from './Deposit/FileDownLoader';

const App = () => {
  const [deposits, setDeposits] = useState([
    { id: 1, amount: 100000000, date: '2025-03-01' },
    { id: 2, amount: 200000000, date: '2025-03-05' },
  ]);

  const addDeposit = (amount, date) => {
    const newDeposit = {
      id: deposits.length + 1,
      amount: parseInt(amount),
      date: date,
    };
    setDeposits([...deposits, newDeposit]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/deposit/list" />} />
          <Route path="/deposit/list" element={<DepositList deposits={deposits} />} />
          <Route path="/deposit/add" element={<AddDeposit addDeposit={addDeposit} />} />
          <Route path="/deposit/calculator" element={<DepositCalculator />} />
        </Routes>
      </BrowserRouter>
      <FileDownLoader />
    </div>
  );
};

export default App;