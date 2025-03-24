import React from "react";

const LoanUpdate = () => {
  const changeValue = () => {};
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

      <div></div>
    </div>
  );
};

export default LoanUpdate;
