import React, { useState, useEffect } from "react";
import "../../Css/fund/Fund.css"; // 스타일 파일 추가

const FundProductManage = () => {
  const [dropdownFunds, setDropdownFunds] = useState([]); // 드롭다운에 표시할 펀드 목록
  const [formData, setFormData] = useState({
    fund_id: "", // 소문자로 변경
    fund_name: "",
    fund_company: "",
    fund_type: "",
    fund_grade: "",
    fund_fee_rate: "",
    return_1m: 0,
    return_3m: 0,
    return_6m: 0,
    return_12m: 0,
  });

  // 펀드 목록 조회
  const fetchFundsFromAPI = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/registeredFunds");
      if (!response.ok) {
        throw new Error("Failed to fetch fund list");
      }
      const data = await response.json();
      setDropdownFunds(data); // 드롭다운에 표시할 데이터 저장
    } catch (error) {
      console.error("Error fetching fund list:", error);
    }
  };

  // useEffect에서 API 호출
  useEffect(() => {
    fetchFundsFromAPI();
  }, []);

  // 드롭다운에서 펀드 선택
  const handleDropdownChange = (e) => {
    const selected = dropdownFunds.find((fund) => fund.fund_name === e.target.value);
    if (selected) {
      setFormData({
        fund_id: Number(selected.fund_id), // 숫자로 변환
        fund_name: selected.fund_name,
        fund_company: selected.fund_company,
        fund_type: selected.fund_type,
        fund_grade: selected.fund_grade,
        fund_fee_rate: selected.fund_fee_rate,
        return_1m: selected.return_1m,
        return_3m: selected.return_3m,
        return_6m: selected.return_6m,
        return_12m: selected.return_12m,
      });
    }
  };

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 펀드 수정
  const handleUpdateFund = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/fundUpdate/${formData.fund_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update fund");
      }

      console.log("펀드 수정 성공");
      fetchFundsFromAPI(); // 목록 갱신
    } catch (error) {
      console.error("Error updating fund:", error);
    }
  };

  // 펀드 삭제
  const handleDeleteFund = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/fund/${formData.fund_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete fund");
      }

      console.log("펀드 삭제 성공");
      fetchFundsFromAPI(); // 목록 갱신
      setFormData({
        fund_id: "",
        fund_name: "",
        fund_company: "",
        fund_type: "",
        fund_grade: "",
        fund_fee_rate: "",
        return_1m: 0,
        return_3m: 0,
        return_6m: 0,
        return_12m: 0,
      }); // 폼 초기화
    } catch (error) {
      console.error("Error deleting fund:", error);
    }
  };

  return (
    <div className="fund-product-manage-container">
      <h2>펀드 상품 관리</h2>

      {/* 펀드 수정/삭제 폼 */}
      <div className="fund-form-container">
        <h3>펀드 수정/삭제</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateFund();
          }}
        >
          <div>
            <label>펀드 ID:</label>
            <input
              type="text"
              name="fund_id"
              value={formData.fund_id}
              readOnly // fund_id는 읽기 전용
            />
          </div>

          <div>
            <label>펀드 선택:</label>
            <select onChange={handleDropdownChange} defaultValue="">
              <option value="" disabled>
                펀드를 선택하세요
              </option>
              {dropdownFunds.map((fund, index) => (
                <option key={index} value={fund.fund_name}>
                  {fund.fund_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>펀드 이름:</label>
            <input
              type="text"
              name="fund_name"
              value={formData.fund_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>운용사명:</label>
            <input
              type="text"
              name="fund_company"
              value={formData.fund_company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>펀드 유형:</label>
            <input
              type="text"
              name="fund_type"
              value={formData.fund_type}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>펀드 등급:</label>
            <input
              type="number"
              name="fund_grade"
              value={formData.fund_grade}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>
          <div>
            <label>총보수 (%):</label>
            <input
              type="number"
              name="fund_fee_rate"
              value={formData.fund_fee_rate}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div>
            <label>1개월 수익률 (%):</label>
            <input
              type="number"
              name="return_1m"
              value={formData.return_1m}
              readOnly
            />
          </div>
          <div>
            <label>3개월 수익률 (%):</label>
            <input
              type="number"
              name="return_3m"
              value={formData.return_3m}
              readOnly
            />
          </div>
          <div>
            <label>6개월 수익률 (%):</label>
            <input
              type="number"
              name="return_6m"
              value={formData.return_6m}
              readOnly
            />
          </div>
          <div>
            <label>12개월 수익률 (%):</label>
            <input
              type="number"
              name="return_12m"
              value={formData.return_12m}
              readOnly
            />
          </div>
          <button type="submit">수정</button>
          <button type="button" onClick={handleDeleteFund}>삭제</button>
        </form>
      </div>
    </div>
  );
};

export default FundProductManage;