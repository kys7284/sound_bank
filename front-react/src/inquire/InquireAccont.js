import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/inquire/InquireAccount.css';

function AccountCheck() {
  const [data, setData] = useState({});
  const [type, setType] = useState(null);
  const [accNum, setAccNum] = useState(null);
  const [customer_id, setCustomerId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('customer_id');
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }

    setCustomerId(id);

    axios.get(`http://localhost:8081/api/accounts/allAccount/${id}`)
      .then(res => {
        console.log("받은 계좌 목록:", res.data);  // 🔍 확인
        setData(res.data);
      })
      .catch(err => {
        console.error('계좌 불러오기 실패:', err);
        setData({});
      });
  }, []);

  const clickCard = (num) => {
    setAccNum(num);
  };

  const Card = ({ item, type, index }) => {
    let num = '';
    let name = '';

    if (type === '입출금') {
      num = item.customer_account_number;  // ✅ 정확한 필드명
      name = item.account_name;
    } else if (type === '예금') {
      num = item.dat_account_num;
      name = item.dat_product_name;
    } else if (type === '적금') {
      num = item.ist_account_num;
      name = `적금 (${item.ist_id})`;
    } else if (type === '외환') {
      num = item.exchange_account_number;
      name = item.exchange_account_name || '외환계좌';
    }

    return (
      <div
        key={index}
        onClick={() => clickCard(num)}
        className={`account-card ${accNum === num ? 'selected' : ''}`}
      >
        <div><strong>{name}</strong></div>
        <div>{num}</div>
      </div>
    );
  };

  const Detail = ({ item, type }) => {
    let num = '';
    let name = '';
    let money = 0;
    let date = '';

    if (type === '입출금') {
      num = item.customer_account_number;
      name = item.account_name;
      money = item.balance || 0;
      date = item.open_date;
    } else if (type === '예금') {
      num = item.dat_account_num;
      name = item.dat_product_name;
      money = item.dat_balance || 0;
      date = item.dat_open_date;
    } else if (type === '적금') {
      num = item.ist_account_num;
      name = `적금 (${item.ist_id})`;
      money = item.ist_monthly_amount || 0;
      date = item.ist_start_date;
    } else if (type === '외환') {
      num = item.exchange_account_number;
      name = item.exchange_account_name || '외환계좌';
      money = item.balance || 0;
      date = item.created_at;
    }

    return (
      <div className="account-detail">
        <h4>상세 정보</h4>
        <p><b>이름:</b> {name}</p>
        <p><b>계좌번호:</b> {num}</p>
        <p><b>금액:</b> {money.toLocaleString()}원</p>
        <p><b>개설일:</b> {new Date(date).toLocaleString()}</p>
      </div>
    );
  };

  const selectedItem = data[type]?.find(item => {
    const itemNum =
      item.customer_account_number ||
      item.dat_account_num ||
      item.ist_account_num ||
      item.exchange_account_number;

    return String(itemNum) === String(accNum);
  });

  return (
    <div className="account-wrapper">
      <h2 className="account-title">{customer_id}님의 계좌 조회</h2>

      <div className="account-type-buttons">
        {Object.keys(data).map(t => (
          <button
            key={t}
            onClick={() => {
              setType(t);
              setAccNum(null);
            }}
            className={type === t ? 'active' : ''}
          >
            {t} ({data[t].length})
          </button>
        ))}
      </div>

      {type && data[type] && (
        <div>
          <h3>{type} 계좌</h3>
          {data[type].map((item, idx) => (
            <Card key={idx} item={item} type={type} index={idx} />
          ))}
        </div>
      )}

      {type && accNum && selectedItem && (
        <Detail item={selectedItem} type={type} />
      )}
    </div>
  );
}

export default AccountCheck;
