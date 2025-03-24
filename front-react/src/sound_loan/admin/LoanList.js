import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/loan/Loan.css";

const LoanList = (props) => {
  const [loanList, setLoanList] = useState([
    {
      loan_id: 0,
      loan_name: "",
      loan_min_amount: 0, // 최소 대출 금액
      loan_max_amount: 0, // 최대 대출 금액
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
    <div className="loan">
      {loanList.map((loan) => (
        <div key={loan.loan_id}>
          <p>대출 이름 : {loan.loan_name}</p>
          <p>대출 ID : {loan.loan_id}</p>
          <p>
            {" "}
            최소 대출 금액 :{" "}
            {loan.loan_min_amount >= 10000
              ? `${(loan.loan_min_amount / 10000).toLocaleString()} 억원` // 10,000만원 이상일 경우 억원 단위로 표기
              : `${loan.loan_min_amount.toLocaleString()} 만원`}
          </p>

          <p>
            {" "}
            최대 대출 금액 :{" "}
            {loan.loan_max_amount >= 10000
              ? `${(loan.loan_max_amount / 10000).toLocaleString()} 억원` // 10,000만원 이상일 경우 억원 단위로 표기
              : `${loan.loan_max_amount.toLocaleString()} 만원`}
          </p>
          <p>이자율 : {loan.interest_rate} %</p>
          <p>대출기간 : {loan.loan_term} 년</p>
          <p>대출 정보 : {loan.loan_info}</p>
          <Link to={"/loanDetail/" + loan.loan_id}>상세보기</Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default LoanList;
