import React, { useEffect, useState } from "react";
import "../../Css/loan/LoanApply.css";

const LoanApply = (props) => {
  const [loanList, setLoanList] = useState([
    {
      loan_id: 0,
      loan_name: "",
      loan_min_amount: 0,
      loan_max_amount: 0,
      interest_rate: 0.0,
      loan_term: 0,
      loan_info: "",
      loan_type: "",
    },
  ]);

  const [loanCnt, setLoanCnt] = useState(0);
  const [loan_name, setLoan_name] = useState("");
  const [searchResult, setSearchResult] = useState(false);

  const searchName = () => {
    fetch(
      `http://localhost:8081/api/loanNameSearch/?loan_name=${encodeURIComponent(
        loan_name
      )}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then((res) => {
        setLoanList(res);
        setSearchResult(res.length === 0);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
    fetch(
      `http://localhost:8081/api/loanNameCnt/?loan_name=${encodeURIComponent(
        loan_name
      )}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setLoanCnt(res);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  };

  const searchType = (e) => {
    const loan_type = e.target.value;
    if (loan_type === "전체") {
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
        });
      fetch("http://localhost:8081/api/loanCnt", {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          setLoanCnt(res);
        })
        .catch((error) => {
          console.error("데이터 가져오기 오류:", error);
        });
    } else {
      fetch(
        `http://localhost:8081/api/loanTypeSearch/?loan_type=${encodeURIComponent(
          loan_type
        )}`,
        {
          method: "GET",
        }
      )
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
        });
      fetch(
        `http://localhost:8081/api/loanTypeCnt/?loan_type=${encodeURIComponent(
          loan_type
        )}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          setLoanCnt(res);
        })
        .catch((error) => {
          console.error("데이터 가져오기 오류:", error);
        });
    }
  };

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
      });

    fetch("http://localhost:8081/api/loanCnt", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setLoanCnt(res);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  }, []);

  return (
    <div style={{ minHeight: 600 }} className="box">
      <div>
        <div className="LoanSearch">
          상품 검색 <br />
          <br />
          <div className="TextSearch">
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              style={{ width: "350px" }}
              onChange={(e) => {
                setLoan_name(e.target.value);
              }}
            />
            <button onClick={searchName}>검색</button>
          </div>
          <div className="BtnSearch">
            <div>
              <h3>상품 유형</h3>
            </div>
            <div className="TypeBtn">
              <button onClick={searchType} value={"전체"}>
                전체 상품
              </button>
              <button onClick={searchType} value={"신용 대출"}>
                신용대출
              </button>
              <button onClick={searchType} value={"예/적금 담보대출"}>
                예적금담보대출
              </button>
              <button onClick={searchType} value={"무보증무담보대출"}>
                무보증무담보대출
              </button>
            </div>
          </div>
          <hr />
        </div>

        <div>
          <div>
            {searchResult && <h2>해당되는 상품이 없습니다.</h2>}
            <h2>상품 목록 : {loanCnt}건 </h2>
          </div>
          {loanList.map((loan) => (
            <div className="container" key={loan.loan_id}>
              <div className="LoanDisplay">
                <div className="InfoArea">
                  <p>{loan.loan_type}</p>
                  <h2>{loan.loan_name}</h2>연 {loan.interest_rate}%<br />
                  {loan.loan_info}
                  <br />
                  대출 기간 : 최대 {loan.loan_term} 년 <br />
                </div>

                <div className="AmontArea">
                  대출 한도 <br />
                  {""}
                  {loan.loan_min_amount >= 10000
                    ? `${(loan.loan_min_amount / 10000).toLocaleString()} 억원` // 10,000만원 이상일 경우 억원 단위로 표기
                    : `${loan.loan_min_amount.toLocaleString()} 만원`}{" "}
                  ~
                  {loan.loan_max_amount >= 10000
                    ? `${(loan.loan_max_amount / 10000).toLocaleString()} 억원` // 10,000만원 이상일 경우 억원 단위로 표기
                    : `${loan.loan_max_amount.toLocaleString()} 만원`}{" "}
                  <br />
                </div>
                <div className="ButtonArea">
                  <button>신청하기</button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanApply;
