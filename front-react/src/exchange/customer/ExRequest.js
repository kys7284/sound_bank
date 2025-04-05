import React, { useEffect, useState } from "react";
import axios from "axios";

const ExRequest = () => {
  const [rates, setRates] = useState([]); // 환율
  const [selectedCurrency, setSelectedCurrency] = useState(""); // 선택한 통화
  const [krwAmount, setKrwAmount] = useState("");  // 원화 금액
  const [exchangedAmount, setExchangedAmount] = useState(""); // 환전 금액
  const [result, setResult] = useState(null);  // 결과

  const [accounts, setAccounts] = useState([]); // 계좌 목록
  const [selectedAccount, setSelectedAccount] = useState(null); // 선택된 계좌 객체

  const customer_id = "milk"; // 로그인 정보로 대체 예정

  // 환율 데이터 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exchange/rates")
      .then((res) => setRates(res.data))
      .catch((err) => console.error("환율 불러오기 실패", err));
  }, []);

  // 사용자 계좌 목록 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/exchange/account/${customer_id}`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error("계좌 목록 불러오기 실패", err));
  }, [customer_id]);

  // 실시간 환전 금액 계산
  useEffect(() => {
    const selected = rates.find((r) => r.cur_unit === selectedCurrency);
    if (selected && krwAmount) {
      const rate = parseFloat(selected.deal_bas_r.replace(",", ""));
      const result = (parseFloat(krwAmount) / rate).toFixed(2);
      setExchangedAmount(result);
    } else {
      setExchangedAmount("");
    }
  }, [selectedCurrency, krwAmount, rates]);

  // 환전 신청
  const handleSubmit = () => {
    if (!selectedAccount) {
      alert("출금 계좌를 선택해주세요.");
      return;
    }

    const dto = {
      customer_id: customer_id,
      currency_code: selectedCurrency,
      request_amount: parseInt(krwAmount),
      exchanged_amount: parseFloat(exchangedAmount),
      withdraw_account_number: selectedAccount.account_number,
    };

    axios
      .post("http://localhost:8081/api/exchange/walletCharge", dto)
      .then((res) => {
        console.log("신청 결과:", res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.error("환전 신청 실패", err);
        alert("환전 신청에 실패했습니다.");
      });
  };

  return (
    <div style={{ maxWidth: "650px", margin: "40px auto", fontFamily: "sans-serif", minHeight: "570px" }}>
      <h2>💱 환전 신청</h2>

      {/* 계좌 선택 */}
      <label>출금 계좌</label>
      <select
        onChange={(e) => {
          const acc = accounts.find(a => a.account_number === e.target.value);
          setSelectedAccount(acc);
        }}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      >
        <option value="">-- 계좌 선택 --</option>
        {accounts.map((acc) => (
          <option key={acc.account_number} value={acc.account_number}>
            {acc.account_number}
          </option>
        ))}
      </select>

      {/* 선택된 계좌의 잔액 표시 */}
      {selectedAccount && (
        <p style={{ marginBottom: "1rem" }}>
          💰 <strong>잔액: ₩{Number(selectedAccount.balance).toLocaleString()}</strong>
        </p>
      )}

      {/* 통화 선택 */}
      <label>환전 대상 통화</label>
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      >
        <option value="">-- 통화 선택 --</option>
        {rates.map((r) => (
          <option key={r.cur_unit} value={r.cur_unit}>
            {r.cur_unit} ({r.cur_nm}) 살 때: {r.tts}
          </option>
        ))}
      </select>

      {/* 금액 입력 */}
      <label>환전할 금액 (KRW)</label>
      <input
        type="number"
        placeholder="예: 100000"
        value={krwAmount}
        onChange={(e) => setKrwAmount(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      {/* 실시간 환전 결과 */}
      {exchangedAmount && (
        <p>
          💵 예상 환전 금액: <strong>{exchangedAmount}</strong> {selectedCurrency}
        </p>
      )}

      {/* 신청 버튼 */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
        disabled={!selectedAccount || !selectedCurrency || !krwAmount}
      >
        환전 신청
      </button>

      {/* 결과 표시 */}
      {result && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
          <h3>✅ 신청 완료</h3>
          <p>환전 금액: {result.request_amount.toLocaleString()} KRW → {result.exchanged_amount} {result.to_currency}</p>
          <p>거래 시간: {new Date(result.exchange_transaction_date).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ExRequest;
