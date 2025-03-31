import React, { useEffect, useState } from "react";
import axios from "axios";

const ExRequest = () => {
  const [rates, setRates] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [krwAmount, setKrwAmount] = useState("");
  const [exchangedAmount, setExchangedAmount] = useState("");
  const [result, setResult] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const customerId = "milk"; // 추후 로그인 정보로 대체 가능

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
      .get(`http://localhost:8081/api/exchange/account/${customerId}`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error("계좌 목록 불러오기 실패", err));
  }, [customerId]);

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
    const dto = {
      customer_id: customerId,
      exchange_account_id: parseInt(selectedAccountId),
      from_currency: "KRW",
      to_currency: selectedCurrency,
      requested_amount: parseInt(krwAmount),
    };

    axios
      .post("http://localhost:8080/api/exchange/requestEx", dto)
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
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>💱 환전 신청</h2>

      {/* 계좌 선택 */}
      <label>출금 계좌</label>
      <select
        value={selectedAccountId}
        onChange={(e) => setSelectedAccountId(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      >
        <option value="">-- 계좌 선택 --</option>
        {accounts.map((acc) => (
          <option key={acc.customer_id} value={acc.customer_id}>
            {acc.account_number}
          </option>
        ))}
      </select>

      {/* 선택된 계좌의 잔액 표시 */}
      {selectedAccountId && (() => {
        const selectedAccount = accounts.find(
          (acc) => acc.customer_id.toString() === selectedAccountId.toString()
        );
        return selectedAccount ? (
          <p style={{ marginBottom: "1rem" }}>
            💰 <strong>잔액: ₩{Number(selectedAccount.balance).toLocaleString()}</strong>
          </p>
        ) : null;
      })()}

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
            {r.cur_unit} ({r.cur_nm})
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
        disabled={!selectedAccountId || !selectedCurrency || !krwAmount}
      >
        환전 신청
      </button>

      {/* 결과 표시 */}
      {result && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
          <h3>✅ 신청 완료</h3>
          <p>신청 ID: {result.exchange_request_id}</p>
          <p>신청 시간: {new Date(result.request_date).toLocaleString()}</p>
          <p>
            {result.requested_amount.toLocaleString()} KRW → {result.to_currency}
          </p>
          <p>신청 상태: {result.status}</p>
        </div>
      )}
    </div>
  );
};

export default ExRequest;
