import React from "react";
import { Link } from "react-router-dom";

const LoanComponent = () => {
  return (
    <div>
      <Link to="/loanList">대출 상품 목록</Link>
      <Link to="/loanCal">대출 계산기</Link>
      <Link to="/loanInsert">대출 상품 등록</Link>
    </div>
  );
};

export default LoanComponent;
