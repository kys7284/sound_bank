import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanInsertForm = (props) => {
  //const navigate = useNavigate();
  const [loan, setLoan] = useState({
    loan_name: "", // 대출 상품명
    loan_amount: 0, // 대출 금액
    interest_rate: 0.0, // 연 이자율
    loan_term: 0, // 최대 대출 기간
    loan_info: "", // 대출 정보
  });

  const changeValue = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value,
    });
  };

  const submitLoan = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/api/loanInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(loan),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res != null) {
          alert("등록");
        } else {
          alert("실패");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("서버 오류 발생!");
      });
  };

  return (
    <div>
      <div>
        <label>
          {" "}
          대출 상품명 :
          <input type="text" name="loan_name" onChange={changeValue} />
        </label>
      </div>
      <div>
        <label>
          최대 대출 금액 :
          <input type="number" name="loan_amount" onChange={changeValue} />
          {""} 만원
        </label>
      </div>
      <div>
        <label>
          연 이자율 :
          <input type="float" name="interest_rate" onChange={changeValue} />
        </label>
      </div>
      <div>
        <label>
          최대 대출기간 (년) :
          <input type="number" name="loan_term" onChange={changeValue} />
        </label>
      </div>
      <div>
        <label>
          대출 정보 :
          <input type="text" name="loan_info" onChange={changeValue} />
        </label>
      </div>

      <div>
        <button onClick={submitLoan}>등록</button>
      </div>
    </div>
  );
};

export default LoanInsertForm;
