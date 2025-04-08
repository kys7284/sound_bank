// TransAutoDelete.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { getCustomerID } from '../../jwt/AxiosToken';

function TransAutoDelete() {
  const [list, setList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const id = getCustomerID();
    const t = localStorage.getItem('auth_token');
    if (!id || !t) {
      alert('로그인이 필요합니다.');
      return;
    }
    setToken(t);

    axios.get(`http://localhost:8081/api/transAuto/list/${id}`, {
      headers: { Authorization: `Bearer ${t}` }
    })
    .then(res => setList(res.data))
    .catch(err => {
      console.error('조회 실패:', err);
      alert('자동이체 목록 조회 실패');
    });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios.delete(`http://localhost:8081/api/transAuto/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert("삭제 완료");
      setList(prev => prev.filter(item => item.transfer_id !== id));
    })
    .catch(err => {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류 발생");
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '600px' }}>
      <Sidebar />

      <div className="auto-delete-wrap">
        <h2>자동이체 삭제</h2>

        {list.length === 0 ? (
          <p>삭제할 자동이체가 없습니다.</p>
        ) : (
          <table className="delete-table">
            <thead>
              <tr>
                <th>출금계좌</th>
                <th>입금계좌</th>
                <th>금액</th>
                <th>시간</th>
                <th>메모</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.transfer_id}>
                  <td>{item.out_account_number}</td>
                  <td>{item.in_account_number}</td>
                  <td>{item.amount}원</td>
                  <td>{item.schedule_time}</td>
                  <td>{item.memo}</td>
                  <td><button onClick={() => handleDelete(item.transfer_id)}>삭제</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TransAutoDelete;