import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FundTestResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    const investmentTypes = ["안정형", "보수형", "위험중립형", "적극형", "공격형"];
    const investmentType = investmentTypes[result] || "알 수 없음";

    return (
        <div>
            <h1>투자성향 분석 결과</h1>
            <p>고객님의 투자 성향은 <strong>{investmentType}</strong> 입니다.</p>
            <button onClick={() => navigate("/")}>홈으로</button>
        </div>
    );
};

export default FundTestResult;
