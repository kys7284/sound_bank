import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LoanList = (props) => {
  const [loanList, setLoanList] = useState([
    {
      loan_id: 0,
      loan_name: "",
      loan_amount: 0,
      interest_rate: 0.0,
      loan_term: 0,
      loan_info: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8081/api/loanList", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setLoanList(res);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
        // 사용자에게 오류 메시지를 표시하거나 다른 오류 처리 로직을 추가할 수 있습니다.
      });
  }, []);

  return (
    <div>
      {loanList.map((loan) => (
        <div key={loan.loan_id}>
          <p>대출 ID : {loan.loan_id}</p>
          <p>대출 이름 : {loan.loan_name}</p>
          <p>대출 금액 : {loan.loan_amount}</p>
          <p>이자율 : {loan.interest_rate}</p>
          <p>대출기간 : {loan.loan_term}</p>
          <p>대출 정보 : {loan.loan_info}</p>
          <Link to={"/loanDetail/" + loan.loan_id}>상세보기</Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default LoanList;
