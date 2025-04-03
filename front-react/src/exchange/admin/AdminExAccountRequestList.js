import React,{useEffect, useState} from "react";
import axios from "axios";

const AdminExAccountRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // 관리자 여부 확인

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exAdmin/account/list")
      .then((res) => {
        setRequests(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("계좌 신청 목록 조회 실패", err);
      });
  }, []);

  const handleApprove = (requestId) => {
    axios
      .post("http://localhost:8081/api/exAdmin/account/approve")
      .then((res) => {
        
      })
    alert(`승인처리 되었습니다 : ${requestId}`);
  };

  const handleReject = (requestId) => {
    // 추후 구현
    alert(`거절: ${requestId}`);
  };

  return (
    <div style={{ padding: "2rem" , minHeight: 650}}>
      <h2>외환 계좌 신청 현황</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>신청자 ID</th>
            <th>출금계좌</th>
            <th>통화</th>
            <th>신청일</th>
            <th>상태</th>
            {isAdmin && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
              <td>{req.CUSTOMER_ID}</td>
              <td>{req.WITHDRAW_ACCOUNT_NUMBER}</td>
              <td>{req.CURRENCY_TYPE}</td>
              <td>{req.REQUEST_DATE?.slice(0, 10)}</td>
              <td>{req.STATUS}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => handleApprove(req.request_id)}>승인</button>{" "}
                  <button onClick={() => handleReject(req.request_id)}>거절</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExAccountRequestList;
