import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const customer_id = "milk";

  useEffect(() => {
    const transactionList = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/exchange/transaction/${customer_id}`);
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("환전내역 조회 실패", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  })

  return (
    <div>
      <img src="/images/exchange/ex_request_list.png" alt="환전내역조회" />
      
  </div>
  )
};
export default ExList;
