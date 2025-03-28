import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // CSV 파싱 라이브러리
import "../../Css/fund/Fund.css"; // 스타일 파일 추가

const FundProductManage = () => {
  const [dropdownFunds, setDropdownFunds] = useState([]); // 드롭다운에 표시할 펀드 목록
  const [formData, setFormData] = useState({
    FUND_ID: 1, // 펀드 ID는 자동 생성
    FUND_NAME: "",
    FUND_COMPANY: "",
    FUND_TYPE: "",
    FUND_GRADE: "",
    FUND_FEE_RATE: "",
    RETURN_1M: 0,
    RETURN_3M: 0,
    RETURN_6M: 0,
    RETURN_12M: 0,
  }); // 등록/수정 폼 데이터

  // 컴포넌트가 처음 렌더링될 때 CSV 파일에서 펀드 목록을 가져옴
  useEffect(() => {
    fetchFundsFromCSV();
  }, []);

  // CSV 파일에서 펀드 목록 가져오기
  const fetchFundsFromCSV = async () => {
    try {
      const response = await fetch("/data/fundList.csv"); // public 디렉토리의 CSV 파일 경로
      const csvText = await response.text(); // CSV 파일의 텍스트 데이터 가져오기

      // CSV 데이터를 파싱하여 JSON 형식으로 변환
      Papa.parse(csvText, {
        header: true, // 첫 번째 행을 헤더로 사용
        skipEmptyLines: true, // 빈 줄 건너뛰기
        complete: (results) => {
          console.log("CSV Data:", results.data); // 파싱된 데이터 확인
          // CSV 데이터의 컬럼 순서에 맞게 매핑
          const mappedData = results.data.map((fund, index) => ({
            FUND_ID: index + 1,
            FUND_NAME: fund["상품명"],
            FUND_COMPANY: fund["운용사명"],
            FUND_TYPE: fund["펀드유형"],
            FUND_GRADE: fund["펀드등급"],
            FUND_FEE_RATE: fund["총보수(퍼센트)"],
            RETURN_1M: fund["1개월누적수익률(퍼센트)"],
            RETURN_3M: fund["3개월누적수익률(퍼센트)"],
            RETURN_6M: fund["6개월누적수익률(퍼센트)"],
            RETURN_12M: fund["12개월누적수익률(퍼센트)"],
          }));
          setDropdownFunds(mappedData); // 드롭다운에 표시할 데이터 저장
        },
      });
    } catch (error) {
      console.error("Error fetching CSV file:", error); // 오류 발생 시 콘솔에 출력
    }
  };

  // 드롭다운에서 펀드 선택
  const handleDropdownChange = (e) => {
    const selected = dropdownFunds.find((fund) => fund.FUND_NAME === e.target.value);
    if (selected) {
      setFormData({
        FUND_ID: selected.FUND_ID,
        FUND_NAME: selected.FUND_NAME,
        FUND_COMPANY: selected.FUND_COMPANY,
        FUND_TYPE: selected.FUND_TYPE,
        FUND_GRADE: selected.FUND_GRADE,
        FUND_FEE_RATE: selected.FUND_FEE_RATE,
        RETURN_1M: selected.RETURN_1M,
        RETURN_3M: selected.RETURN_3M,
        RETURN_6M: selected.RETURN_6M,
        RETURN_12M: selected.RETURN_12M,
      });
    }
  };

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 펀드 등록/수정
  const handleSaveFund = async () => {
    try {
      console.log("저장할 펀드 데이터:", formData);
      // 등록/수정 로직 추가 (예: API 호출)
      setFormData({
        FUND_ID: "",
        FUND_NAME: "",
        FUND_COMPANY: "",
        FUND_TYPE: "",
        FUND_GRADE: "",
        FUND_FEE_RATE: "",
        RETURN_1M: 0,
        RETURN_3M: 0,
        RETURN_6M: 0,
        RETURN_12M: 0,
        return12M: 0,
      }); // 폼 초기화
    } catch (error) {
      console.error("Error saving fund:", error);
    }
  };

  return (
    <div className="fund-product-manage-container">
      <h2>펀드 상품 관리</h2>

      {/* 펀드 등록/수정 폼 */}
      <div className="fund-form-container">
        <h3>펀드 등록/수정</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveFund();
          }}
        >
          <div>
            <label>펀드 ID:</label>
            <input
              type="text"
              name="fundId"
              value={formData.fundId}
              readOnly // FUND_ID는 읽기 전용
            />
          </div>

          <div>
            <label>펀드 선택:</label>
            <select onChange={handleDropdownChange} defaultValue="">
              <option value="" disabled>
                펀드를 선택하세요
              </option>
              {dropdownFunds.map((fund, index) => (
                <option key={index} value={fund.FUND_NAME}>
                  {fund.FUND_NAME}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>펀드 이름:</label>
            <input
              type="text"
              name="FUND_NAME"
              value={formData.FUND_NAME}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>운용사명:</label>
            <input
              type="text"
              name="FUND_COMPANY"
              value={formData.FUND_COMPANY}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>펀드 유형:</label>
            <input
              type="text"
              name="FUND_TYPE"
              value={formData.FUND_TYPE}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>펀드 등급:</label>
            <input
              type="number"
              name="FUND_GRADE"
              value={formData.FUND_GRADE}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>
          <div>
            <label>총보수 (%):</label>
            <input
              type="number"
              name="FUND_FEE_RATE"
              value={formData.FUND_FEE_RATE}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div>
            <label>1개월 수익률 (%):</label>
            <input
              type="number"
              name="RETURN_1M"
              value={formData.RETURN_1M}
              readOnly
            />
          </div>
          <div>
            <label>3개월 수익률 (%):</label>
            <input
              type="number"
              name="RETURN_3M"
              value={formData.RETURN_3M}
              readOnly
            />
          </div>
          <div>
            <label>6개월 수익률 (%):</label>
            <input
              type="number"
              name="RETURN_6M"
              value={formData.RETURN_6M}
              readOnly
            />
          </div>
          <div>
            <label>12개월 수익률 (%):</label>
            <input
              type="number"
              name="RETURN_12M"
              value={formData.RETURN_12M}
              readOnly
            />
          </div>
          <button type="submit">저장</button>
        </form>
      </div>
    </div>
  );
};

export default FundProductManage;