import React from "react";
import { Link } from "react-router-dom";
import "../../Css/loan/Loan.css";

const LoanSideBar = () => {
  return (
    <div className="sideBar">
      <table className="sideTable">
        <thead>응애</thead>
        <tbody>
          <li>
            <Link to={"/loanList"}>대출상품목록</Link>
          </li>
          <li>
            <Link to={"/loanInsertForm"}>대출상품등록</Link>
          </li>
          <li>
            <Link to={"/loanCustomerList"}>대출고객목록</Link>
          </li>
        </tbody>
      </table>
    </div>
  );
};

export default LoanSideBar;
