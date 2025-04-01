import axios from "axios";
import React, { useEffect, useState } from "react";

const ExCreateAccount = () => {
  const [step, setStep] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const customerId = "milk"; // 👉 실제 로그인 사용자 ID로 대체할 것
  const goToNext = () => setStep((prev) => prev + 1);

  useEffect(() => {
    if (step === 2) {
      axios
        .get(`http://localhost:8081/api/exchange/account/${customerId}`)
        .then((res) => setAccounts(res.data))
        .catch((err) => console.error("계좌 목록 조회 실패", err));
    }
  }, [step, customerId]);

  return (
    <div className="ex-create-account" style={{ minHeight: "590px", textAlign: "center" }}>
      {step === 1 && (
        <div>
          <h2>실명 인증</h2>
          <p>신분증 실명인증페이지 (진행 중)</p>
          <button onClick={goToNext}>다음</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>출금 계좌 선택</h2>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            style={{ padding: "0.5rem", width: "60%" }}
          >
            <option value="">-- 계좌 선택 --</option>
            {accounts.map((acc) => (
              <option key={acc.customer_id} value={acc.customer_id}>
                {acc.account_number}
              </option>
            ))}
          </select>
          <br />
          <button onClick={goToNext} style={{ marginTop: "1rem" }} disabled={!selectedAccount}>
            다음
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>비밀번호 확인</h2>
          <input type="password" placeholder="계좌 비밀번호 입력" />
          <br />
          <button onClick={goToNext} style={{ marginTop: "1rem"}}>
            다음
          </button>
        </div>
      )}

      {/* 이후 단계들도 step === 4, 5...로 추가해 나가면 됨 */}
    </div>
  );
};

export default ExCreateAccount;
