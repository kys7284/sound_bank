import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/inquire/InquireTransfer.css'; // 스타일은 따로 관리

function CheckTx() {
  // === 상태 정의 ===
  const [accountList, setAccountList] = useState([]);       // 내 계좌 목록
  const [selectedAccount, setSelectedAccount] = useState(''); // 선택된 계좌번호
  const [startDate, setStartDate] = useState('');            // 조회 시작일
  const [endDate, setEndDate] = useState('');                // 조회 종료일
  const [txType, setTxType] = useState('전체');              // 거래유형(전체/입금/출금)
  const [txResultList, setTxResultList] = useState([]);      // 조회된 거래내역 목록
  const [customerId, setCustomerId] = useState('');          // 로그인된 고객 아이디

  // 날짜를 yyyy-MM-dd 형식으로 변환하는 함수
  const getFormattedDate = (dateObj) => dateObj.toISOString().slice(0, 10);

  // 날짜 버튼 클릭 시 조회 기간 자동 설정
  const handleDateRange = (days) => {
    const today = new Date();
    const fromDate = new Date();
    fromDate.setDate(today.getDate() - days + 1);

    setStartDate(getFormattedDate(fromDate));
    setEndDate(getFormattedDate(today));
  };

  // 컴포넌트가 처음 실행될 때: 고객 ID 확인하고 계좌목록 불러오기
  useEffect(() => {
    const id = localStorage.getItem('customer_id');

    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }

    setCustomerId(id);

    axios.get(`http://localhost:8081/api/accounts/allAccount/${id}`)
      .then((response) => {
        let list = [];

        // 응답이 배열이면 그대로 사용
        if (Array.isArray(response.data)) {
          list = response.data;
        } 
        // 객체로 올 경우 모든 값을 추출해 배열로 변환
        else if (typeof response.data === 'object') {
          list = Object.values(response.data).flat();
        }

        setAccountList(list);

        // 첫 번째 계좌를 기본 선택값으로 설정
        if (list.length > 0) {
          setSelectedAccount(list[0].account_number || list[0].dat_account_num);
        }
      })
      .catch((error) => {
        console.error('계좌 목록 불러오기 실패:', error);
        setAccountList([]);
      });
  }, []);

  // 날짜 + 시간까지 포맷하는 함수 (YYYY-MM-DD HH:mm:ss)
  const formatFullDate = (dateStr) => {
    const d = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // 거래내역 조회 함수 (서버로 요청)
  const fetchTransactions = () => {
    axios.get('http://localhost:8081/api/transactions', {
      params: {
        account_number: selectedAccount,
        start_date: startDate,
        end_date: endDate,
        transaction_type: txType,
      }
    })
    .then((response) => {
      setTxResultList(response.data);
    })
    .catch((error) => {
      console.error('거래내역 조회 실패:', error);
    });
  };

  return (
    <div className="checktx-wrap">
      <h2>{customerId}님의 거래내역 조회</h2>

      {/* 계좌 선택 */}
      <div className="input-group">
        <label>계좌:</label>
        <select value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)}>
          {accountList.map(account => (
            <option
              key={account.account_number || account.dat_account_num}
              value={account.account_number || account.dat_account_num}
            >
              {account.account_number || account.dat_account_num} ({account.account_type || account.dat_account_type})
            </option>
          ))}
        </select>
      </div>

      {/* 날짜 입력 + 버튼으로 기간 선택 */}
      <div className="input-group">
        <label>기간:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        ~
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <div className="range-buttons">
          <button onClick={() => handleDateRange(1)}>당일</button>
          <button onClick={() => handleDateRange(7)}>1주일</button>
          <button onClick={() => handleDateRange(30)}>1개월</button>
          <button onClick={() => handleDateRange(180)}>6개월</button>
        </div>
      </div>

      {/* 거래 유형 선택 */}
      <div className="input-group">
        <label>유형:</label>
        <select value={txType} onChange={e => setTxType(e.target.value)}>
          <option>전체</option>
          <option>입금</option>
          <option>출금</option>
        </select>
      </div>

      {/* 조회 버튼 */}
      <div className="search-button">
        <button onClick={fetchTransactions}>조회</button>
      </div>

      {/* 결과 테이블 */}
      <div className="result-area">
        <h3>조회 결과</h3>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>유형</th>
              <th>금액</th>
              <th>통화</th>
              <th>입금메모</th>
              <th>출금메모</th>
            </tr>
          </thead>
          <tbody>
            {txResultList.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">거래내역이 없습니다.</td>
              </tr>
            ) : (
              txResultList.map(tx => (
                <tr key={tx.transaction_id}>
                  <td>{formatFullDate(tx.transaction_date)}</td>
                  <td>{tx.transaction_type}</td>
                  <td>{tx.amount.toLocaleString()}원</td>
                  <td>{tx.currency}</td>
                  <td>{tx.comment_in}</td>
                  <td>{tx.comment_out}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckTx;
