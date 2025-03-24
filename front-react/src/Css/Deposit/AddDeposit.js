import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDeposit = ({ addDeposit }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDeposit(amount, date);
    navigate('/deposit/list');
  };

  return (
    <div>
      <h2>예금 추가</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>금액:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>날짜:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default AddDeposit;