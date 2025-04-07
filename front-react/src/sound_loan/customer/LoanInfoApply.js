import axios from "axios";
import React, { useEffect, useState } from "react";

const LoanInfoApply = () => {
  axios.defaults.baseURL = "http://localhost:8081/api/";
  axios.defaults.headers = "application/json;charset=utf-8";
  const [loanStatus, setLoanStatus] = useState([
    {
      customer_id: null,
      loan_name: null,
      loan_id: null,
      interest_rate: null,
      customer_income: null,
      coustomer_credit_score: null,
      loan_amount: null,
      balance: null,
      repayment_accont: null,
      repayment_method: null,
      repayment_date: null,
      loan_type: null,
      loan_progress: null,
    },
  ]);

  const [loanList, setLoanList] = useState([{}]);

  return (
    <div>
      <table>
        <tr>
          <th>신청 고객ID</th>
          <td></td>
        </tr>
        <tr>
          <th>대출 상품명</th>
          <td></td>
        </tr>
        <tr>
          <th>대출한도</th>
          <td></td>
        </tr>
        <tr>
          <th>적용 금리</th>
          <td></td>
        </tr>
        <tr>
          <th>연소득</th>
          <td></td>
        </tr>
        <tr>
          <th>신용점수</th>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default LoanInfoApply;
