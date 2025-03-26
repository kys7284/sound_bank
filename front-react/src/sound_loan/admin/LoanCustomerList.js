import React from "react";
import "../../Css/loan/Loan.css";

const LoanCustomerList = () => {
  return (
    <div style={{ minHeight: 600 }} className="loanInsert">
      <table className="insertTable">
        <thead>
          <tr>
            <h2>대출 가입 고객 목록</h2>
          </tr>
          <tr>
            <th>고객 아이디</th>
            <th>대출 상품명</th>
            <th>대출 금액</th>
            <th>잔여 대출금</th>
            <th>상환 계좌번호</th>
            <th>대출 상환방식</th>
            <th>대출금 상환일</th>
            <th>대출 진행상황</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>minjong123</td>
            <td>직장인 신용대출</td>
            <td>2억원</td>
            <td>2억원</td>
            <td>111-1234-9999-250</td>
            <td>원리금 균등상환</td>
            <td>매달 27일</td>
            <td>대출 승인</td>
            <td>승인처리</td>
          </tr>
          <tr>
            <td>youngsuck123</td>
            <td>직장인 신용대출</td>
            <td>5억원</td>
            <td>2억 5천만원</td>
            <td>111-2244-7890-250</td>
            <td>원리금 균등상환</td>
            <td>매달 15일</td>
            <td>진행중</td>
            <td>승인처리</td>
          </tr>
          <tr>
            <td>daeyeol123</td>
            <td>직장인 신용대출</td>
            <td>3천만원</td>
            <td>0원</td>
            <td>111-4233-2222-250</td>
            <td>원리금 균등상환</td>
            <td>매달 1일</td>
            <td>만기</td>
            <td>승인처리</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoanCustomerList;
