import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../Css/loan/Loan.css";

const LoanDetail = (props) => {
  const { loan_id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState([
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
    fetch("http://localhost:8081/api/loanDetail/" + loan_id)
      .then((res) => res.json())
      .then((res) => {
        setLoan(res);
      });
  }, [loan_id]);

  const updateForm = () => {
    navigate("/loanUpdate/" + loan_id);
  };

  const deleteForm = () => {
    fetch("http://localhost:8081/api/loanDelete/" + loan_id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          alert("삭제 되었습니다.");
          navigate("/loanList");
        } else {
          alert("삭제 실패");
          navigate("/loanList");
        }
      });
  };

  return (
    <div className="loan">
      <p>대출상품 번호 :{loan.loan_id}</p>
      <p>대출상품 이름 :{loan.loan_name} </p>
      <p>대출상품 금리 :{loan.interest_rate}</p>
      <p>대출상품 기간 :{loan.loan_term}</p>
      <p>대출상품 한도 :{loan.loan_amount}</p>
      <p>대출상품 정보 :{loan.loan_info}</p>
      <button onClick={updateForm}>수정하기</button>
      <button onClick={deleteForm}>삭제하기</button>
    </div>
  );
};

export default LoanDetail;
