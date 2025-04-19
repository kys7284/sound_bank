import React, { useEffect, useState } from 'react';
import { getCustomerID } from '../../jwt/AxiosToken';
import RefreshToken from '../../jwt/RefreshToken';
import styles from '../../Css/exchange/ExList.module.css';

const ExList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [period, setPeriod] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const customer_id = getCustomerID();

  useEffect(() => {
    const transactionList = async () => {
      try {
        const response = await RefreshToken.get(`http://localhost:8081/api/exchange/exchangeList/${customer_id}`);
        setTransactions(response.data);
      } catch (error) {
        console.error("환전내역 조회 실패", error);
        setError('환전 내역을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    transactionList();
  }, [customer_id]);

  const isSameDate = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const isWithinPeriod = (dateString) => {
    if (!period || period === 'all') return true;
    const today = new Date();
    const txDate = new Date(dateString.replace(" ", "T"));

    switch (period) {
      case 'today':
        return isSameDate(today, txDate);
      case '1w':
        return txDate >= new Date(today.setDate(today.getDate() - 7));
      case '1m':
        return txDate >= new Date(today.setMonth(today.getMonth() - 1));
      case '6m':
        return txDate >= new Date(today.setMonth(today.getMonth() - 6));
      default:
        return true;
    }
  };

  const isWithinRange = (dateString) => {
    if (!startDate && !endDate) return true;
    if (!dateString) return false;
    const txDate = new Date(dateString.replace(" ", "T"));
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    return (!from || txDate >= from) && (!to || txDate <= to);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchType = filter === 'all' || tx.transaction_type === filter;
    const matchDate = !selectedDate || tx.exchange_transaction_date?.startsWith(selectedDate);
    const matchPeriod = !tx.exchange_transaction_date || isWithinPeriod(tx.exchange_transaction_date);
    const matchRange = isWithinRange(tx.exchange_transaction_date);
    return matchType && matchDate && matchPeriod && matchRange;
  });

  if (loading) return <div>환전 내역을 불러오는 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>환전 내역 조회</h2>

      <div className={styles.filterSection}>
        <button onClick={() => setFilter('all')}>전체</button>
        <button onClick={() => setFilter('buy')}>구매 (Buy)</button>
        <button onClick={() => setFilter('sell')}>판매 (Sell)</button>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      <div className={styles.periodButtons}>
        <button onClick={() => setPeriod('all')}>전체</button>
        <button onClick={() => setPeriod('today')}>당일</button>
        <button onClick={() => setPeriod('1w')}>1주일</button>
        <button onClick={() => setPeriod('1m')}>1개월</button>
        <button onClick={() => setPeriod('6m')}>6개월</button>
      </div>

      <div className={styles.dateRangeSection}>
        <label>시작일: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>종료일: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>거래 일시</th>
            <th className={styles.th}>요청 금액</th>
            <th className={styles.th}>환전 금액</th>
            <th className={styles.th}>거래유형</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="4" className={styles.noData}>환전 내역이 없습니다.</td>
            </tr>
          ) : (
            filteredTransactions.map((tx, index) => (
              <tr key={index}>
                <td className={styles.td}>
                  {tx.exchange_transaction_date
                    ? new Date(tx.exchange_transaction_date.replace(" ", "T")).toLocaleString('ko-KR')
                    : "거래 시간 없음"}
                </td>
                <td className={styles.td}>
                  {tx.request_amount?.toLocaleString()} {tx.from_currency}
                </td>
                <td className={styles.td}>
                  {tx.exchanged_amount?.toLocaleString()} {tx.to_currency}
                </td>
                <td className={styles.td}>{tx.transaction_type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExList;
