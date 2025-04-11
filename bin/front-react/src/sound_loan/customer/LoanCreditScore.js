import React from "react";

const LoanCreditScore = () => {
  return (
    <div style={{ minHeight: 600 }}>
      {/* 고객의 예금 잔액을 기준으로 1000점 만점의 신용점수를 부여 (기존 점수 700점) 
      상위 1% 출력은 가입된 고객들의 신용점수를 기준으로 순위 책정 */}
      <img
        src="/Images/loan/LoanCreditScore.png"
        alt="벤치마킹화면"
        style={{
          display: "block",
          margin: "100px auto",
          width: "600px",
          height: "auto",
          border: "1px solid black",
          justifyContent: "center",
        }}
      />
    </div>
  );
};

export default LoanCreditScore;
