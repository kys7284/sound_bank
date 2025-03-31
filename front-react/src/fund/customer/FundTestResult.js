import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/fund/Fund.css"; // 스타일 파일 추가

const FundTestResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    const investmentTypes = ["안정형", "보수형", "위험중립형", "적극형", "공격형"];
    const investmentType = investmentTypes[result] || "알 수 없음";

    return (
        <div className="fund-test-result-container">
            <h1 className="fund-test-result-title">투자성향 분석 결과</h1>
            <table className="fund-test-result-table">
                <tbody>
                    <tr>
                        고객님의 투자성향은
                        <strong> {investmentType}</strong>입니다.
                    </tr>
                </tbody>
            </table>
            <div className="fund-test-result-buttons">
                <button
                    className="fund-test-result-button"
                    onClick={() => navigate("/fundRecommend")}
                >
                    나에게 맞는 <br>
                    </br>펀드 추천받기
                </button>
            </div>
        </div>
    );
};

export default FundTestResult;