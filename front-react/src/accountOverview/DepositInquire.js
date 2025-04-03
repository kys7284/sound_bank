import React, { useEffect } from 'react';

const DepositInquire = () => {


  const[deposits, setDeposits] = React.useState([]);

// Spring Boot API 호출
useEffect(() => {

   const fetchDeposits = async () => {
      try{
        const response = await fetch('http://localhost:8080/deposits'); // Spring Boot API 엔드포인트
        const data = await response.json();
        setDeposits(data);
      }catch(error){
        console.log('Error fetching deposits', error);
      }
   };
        fetchDeposits();
},[]);


return (
  <div style={{ minHeight: 600, padding: '20px' }}>
    <h1 style={{ textAlign: 'center' }}>예금/적금 계좌조회</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '10px' }}>계좌번호</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>고객이름</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>잔액</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>계좌유형</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>개설일자</th>
        </tr>
      </thead>
      <tbody>
        {deposits.map((deposit, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '10px' }}>{deposit.datAccountNum}</td>
            <td style={{ border: '1px solid black', padding: '10px' }}>{deposit.datCustomerName}</td>
            <td style={{ border: '1px solid black', paddiㅛng: '10px' }}>{deposit.datBalance.toLocaleString()}원</td>
            <td style={{ border: '1px solid black', padding: '10px' }}>{deposit.datAccountType}</td>
            <td style={{ border: '1px solid black', padding: '10px' }}>{deposit.datOpenDate}</td>
          </tr>
        ))}
      </tbody>
    </table>

    
    
  </div>
);

};

export default DepositInquire;