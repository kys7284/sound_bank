import React, { useEffect, useState } from "react";
import RefreshToken from "../../jwt/RefreshToken";
import "../../Css/loan/MyLoanStatus.css";

const MyLoanStatus = () => {
  const [myLoanStatus, setMyLoanStatus] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식
  };

  const earlyRepayment = (my) => {
    if (window.confirm("중도상환 하시겠습니까?")) {
      const prepaymentRequest = {
        loanStatusNo: my.loanStatusNo,
        balance: my.balance,
        loanDate: my.loanDate,
        prepayment_penalty: my.prepayment_penalty,
      };
      RefreshToken.post("/calculatePrepaymentPenalty", prepaymentRequest)
        .then(alert("중도상환 처리가 완료되었습니다."))
        .catch((error) => {
          console.log(error);
          alert("중도상환 처리가 되지 않았습니다.");
        });
    }
  };

  useEffect(() => {
    RefreshToken.get("/myLoanStatus", {
      params: {
        customerId: localStorage.getItem("customerId"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setMyLoanStatus(res.data);
      })
      .catch((error) => {
        console.error("서버 통신 에러: ", error);
        alert("서버 통신 중 에러 발생!");
      });
  }, [setMyLoanStatus]);
  return (
    <div className="totalArea">
      {myLoanStatus.length > 0 ? (
        <table className="tableArea">
          <thead className="theadArea">
            <th>나의 대출 현황</th>
          </thead>

          <tbody className="tbodyArea">
            <tr>
              <th>no</th>
              <th>대출 상품명</th>
              <th>적용 금리</th>
              <th>대출 금액</th>
              <th>잔여 대출금</th>
              <th>총 상환횟수</th>
              <th>잔여 상환횟수</th>
              <th>상환 계좌번호</th>
              <th>대출 상환방식</th>
              <th>대출금 상환일</th>
              <th>대출 유형</th>
              <th>대출 신청일</th>
              <th>대출 진행상황</th>
              <th>중도 상환 수수료(율)</th>
              <th>중도 상환 신청</th>
            </tr>
            {myLoanStatus.map((my) => (
              <tr key={my.no}>
                <td>{my.no}</td>
                <td>{my.loanName}</td>
                <td>{my.interestRate}%</td>
                <td>{my.loanAmount.toLocaleString("ko-KR")}원</td>
                <td>{my.balance.toLocaleString("ko-KR")}원</td>
                <td>{my.loanTerm}회</td>
                <td>{my.remainingTerm}회</td>
                <td>{my.accountNumber}</td>
                <td>{my.repaymentMethod}</td>
                <td>매달 {my.repaymentDate}일</td>
                <td>{my.loanType}</td>
                <td>{formatDate(my.loanDate)}</td>
                <td>{my.loanProgress}</td>
                <td>{my.prepayment_penalty}%</td>
                <td>
                  <button onClick={() => earlyRepayment(my)}>중도상환</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="noDataMessage">
          <p>진행 중인 대출이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyLoanStatus;
