import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Css/transfer/TransAutoList.css';
import Sidebar from './Sidebar';
import { getCustomerID } from '../../jwt/AxiosToken';

function TransAutoList() {
  const [list, setList] = useState([]); // 자동이체 목록 상태

  useEffect(() => {
    const id = getCustomerID();
    const token = localStorage.getItem('auth_token');

    if (!id || !token) {
      alert('로그인이 필요합니다.');
      return;
    }

    axios.get(`http://localhost:8081/api/transAuto/list/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error('자동이체 목록 조회 실패:', err);
        alert('조회에 실패했습니다.');
      });
  }, []);

  return (
    <div style={{ display: 'flex' , minHeight: '610px'}}>
      <Sidebar />

      <div className="auto-list-wrap">
        <h2>자동이체 조회</h2>

        {list.length === 0 ? (
          <p>등록된 자동이체가 없습니다.</p>
        ) : (
          <table className="auto-table">
            <thead>
              <tr>
                <th>출금계좌</th>
                <th>받는계좌</th>
                <th>이름</th>
                <th>금액</th>
                <th>방식</th>
                <th>시간</th>
                <th>메모</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{item.out_account_number}</td>
                  <td>{item.in_account_number}</td>
                  <td>{item.in_name}</td>
                  <td>{Number(item.amount).toLocaleString()}원</td>
                  <td>
                    {item.schedule_mode === 'day'
                      ? `매주 ${['월','화','수','목','금','토','일'][item.schedule_day - 1]}요일`
                      : `매월 ${item.schedule_month_day}일`}
                  </td>
                  <td>{item.schedule_time}</td>
                  <td>{item.memo || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TransAutoList;