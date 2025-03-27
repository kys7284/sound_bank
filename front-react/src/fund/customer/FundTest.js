import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/fund/Fund.css"; // 스타일 파일 추가

const questions = [
  {
    question: "1. 금융투자상품에 대한 이해도는 어느 정도인가요?",
    options: [
      "투자상품 설명서를 읽고 스스로 상품의 특징과 위험을 이해함",
      "투자상품 설명을 들으면 특징과 위험을 이해함",
      "예금과 펀드의 차이점을 알고 구별할 수 있음",
      "투자상품에 대해 스스로 결정을 해 본적이 없음",
    ],
  },
  {
    question: "2. 고객님의 수입원은 어떻게 되시나요?",
    options: [
      "현재 일정한 수입이 있고, 향후 유지 또는 증가 예상",
      "현재 일정한 수입이 발생하나 향후 불안정 또는 감소 예상",
      "현재 일정한 수입이 없거나, 연금 등이 주 수입원임",
    ],
  },
  {
    question: "3. 고객님의 연간 소득은 어떻게 되시나요?",
    options: ["2천만원 이하", "5천만원 이하", "1억원 이하", "1억원 초과"],
  },
  {
    question: "4. 고객님이 주로 투자한 금융상품은 어느 것인가요?",
    options: [
      "주식형펀드, 파생상품펀드, 주식, ELW, 선물옵션 등",
      "인덱스 주식형펀드,원금 비보존 ELS(DLS), 신용도 낮은 회사채 등",
      "혼합형펀드, 원금 일부 보존추구 ELS(DLS), 신용도 중간등급 회사채 등",
      "채권형 펀드, 원금 보존추구 ELB(DLB), 금융채, 신용도 높은 회사채 등",
      "은행 예적금, 국채, 지방채, 보증채, MMF, CMA 등",
    ],
  },
  {
    question: "5. 총 자산대비 투자상품의 비중은 어떻게 되시나요?",
    options: ["10% 이하", "15% 이하", "20% 이하", "25% 이하", "25% 초과"],
  },
  {
    question: "6. 파생상품, 파생결합증권, 파생상품 투자펀드에 투자한 기간은 어떻게 되시나요?",
    options: ["3년 초과", "3년 이하", "1년 이하", "투자 경험 없음"],
  },
  {
    question: "7. 투자금에 대한 기대수익 대비 감내 가능한 손실 수준은 어떻게 되시나요?",
    options: [
      "30% 초과 또는 원금 전액 손실 감내 가능",
      "30% 이내 손실 감내 가능",
      "10% 이내 손실 감내 가능",
      "반드시 투자원금은 보존되어야 함",
    ],
  },
  {
    question: "8. 현재 금융투자상품에 가입하는 목적은 어떻게 되시나요?",
    options: [
      "자산 증식(여유 자금 투자)",
      "목적자금 마련(결혼, 교육, 노후자금 등)",
      "퇴직금 운용",
      "사용예정자금(전세금, 임대차 보증금) 단기운용",
    ],
  },
  {
    question: "9. 투자하려는 자금의 투자기간은 얼마나 되시나요?",
    options: ["투자기간 상관없음", "3년 이상", "2년 이상", "1년 이상", "1년 미만"],
  },
];

const FundTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", { answers });
      navigate("/test-result", { state: { result: response.data.investment_type } });
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  return (
    <div className="fund-test-container">
      <h2 className="fund-test-title">투자성향 분석</h2>
      <div className="fund-test-card">
        {questions.map((question, index) => (
          <div key={index} className="fund-test-question">
            <p className="fund-test-question-title">{question.question}</p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="fund-test-option">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleChange(index, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="fund-test-submit" onClick={handleSubmit}>
        결과 확인
      </button>
      {result !== null && <h3 className="fund-test-result">예측된 투자 성향: {result}</h3>}
    </div>
  );
};

export default FundTest;