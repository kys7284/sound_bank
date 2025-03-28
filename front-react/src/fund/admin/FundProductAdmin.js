import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // CSV 파싱 라이브러리
import "../../Css/fund/Fund.css"; // 스타일 파일 추가

const FundProductAdmin = () => {
  const [funds, setFunds] = useState([]); // 테이블에 표시할 펀드 목록
  const [selectedFund, setSelectedFund] = useState(null); // 선택된 펀드
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

  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달 위치
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // 드래그 오프셋

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
          setFunds(results.data); // 테이블에 표시할 데이터 저장
        },
      });
    } catch (error) {
      console.error("Error fetching CSV file:", error); // 오류 발생 시 콘솔에 출력
    }
  };

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 펀드 선택 (수정 시 사용)
  const handleUpdateFund = (fund) => {
    setSelectedFund(fund);
    setFormData({
      FUND_ID: fund["펀드 ID"],
      FUND_NAME: fund["상품명"],
      FUND_COMPANY: fund["운용사명"],
      FUND_TYPE: fund["펀드유형"],
      FUND_GRADE: fund["펀드등급"],
      FUND_FEE_RATE: fund["총보수(퍼센트)"],
      RETURN_1M: fund["1개월누적수익률(퍼센트)"],
      RETURN_3M: fund["3개월누적수익률(퍼센트)"],
      RETURN_6M: fund["6개월누적수익률(퍼센트)"],
      RETURN_12M: fund["12개월누적수익률(퍼센트)"],
    });
  };

  // 펀드 삭제 함수
  const handleDeleteFund = (fundToDelete) => {
  // 선택된 펀드를 제외한 나머지 펀드 목록으로 상태 업데이트
    const updatedFunds = funds.filter((fund) => fund !== fundToDelete);
    setFunds(updatedFunds); // 상태 업데이트
  setModalPosition({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 150 }); // 모달 초기 위치 설정
  };  

  // 팝업 닫기 함수
  const handleClosePopup = () => {
    setSelectedFund(null); // 선택된 펀드 초기화
    setFormData({
      FUND_ID: 0,
      FUND_NAME: "",
      FUND_COMPANY: "",
      FUND_TYPE: "",
      FUND_GRADE: "",
      FUND_FEE_RATE: "",
      RETURN_1M: 0,
      RETURN_3M: 0,
      RETURN_6M: 0,
      RETURN_12M: 0,
    }); // 폼 초기화
  };

  const handleMouseDown = (e) => {
    // 입력 필드에서 발생한 이벤트는 무시
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 펀드 등록/수정
  const handleSaveFund = async () => {
    try {
      if (selectedFund) {
        const formattedData = {
          FUND_ID: formData.FUND_ID,
          FUND_NAME: formData.FUND_NAME,
          FUND_COMPANY: formData.FUND_COMPANY,
          FUND_TYPE: formData.FUND_TYPE,
          FUND_GRADE: formData.FUND_GRADE,
          FUND_FEE_RATE: formData.FUND_FEE_RATE,
          RETURN_1M: formData.RETURN_1M,
          RETURN_3M: formData.RETURN_3M,
          RETURN_6M: formData.RETURN_6M,
          RETURN_12M: formData.RETURN_12M,
        };
  
        const response = await fetch(`/api/fund/${selectedFund["FUND_ID"]}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });
  
        if (response.ok) {
          console.log("수정 성공");
          fetchFundsFromCSV(); // 수정 후 목록 갱신
          setSelectedFund(null); // 선택 초기화
          setFormData({
            FUND_ID: 0,
            FUND_NAME: "",
            FUND_COMPANY: "",
            FUND_TYPE: "",
            FUND_GRADE: "",
            FUND_FEE_RATE: "",
            RETURN_1M: 0,
            RETURN_3M: 0,
            RETURN_6M: 0,
            RETURN_12M: 0,
          }); // 폼 초기화
        } else {
          console.error("수정 실패");
        }
      }
    } catch (error) {
      console.error("Error saving fund:", error);
    }
  };

    return (
      <div className="fund-product-manage-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <h2>펀드 상품 관리</h2>

        {/* 펀드 목록 테이블 */}
        <table className="fund-table">
          <thead>
            <tr>
              <th>펀드ID</th>
              <th>펀드명</th>
              <th>운용사명</th>
              <th>펀드유형</th>
              <th>펀드등급</th>
              <th>총보수 (%)</th>
              <th>1개월 수익률 (%)</th>
              <th>3개월 수익률 (%)</th>
              <th>6개월 수익률 (%)</th>
              <th>12개월 수익률 (%)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={index}>
                <td>{fund["펀드 ID"]}</td>
                <td>{fund["상품명"]}</td>
                <td>{fund["운용사명"]}</td>
                <td>{fund["펀드유형"]}</td>
                <td>{fund["펀드등급"]}</td>
                <td>{fund["총보수(퍼센트)"]}</td>
                <td>{fund["1개월누적수익률(퍼센트)"]}</td>
                <td>{fund["3개월누적수익률(퍼센트)"]}</td>
                <td>{fund["6개월누적수익률(퍼센트)"]}</td>
                <td>{fund["12개월누적수익률(퍼센트)"]}</td>
                <td>
                <div className="action-buttons">
                  <button onClick={() => handleUpdateFund(fund)}>수정</button>
                  <button onClick={() => handleDeleteFund(fund)}>삭제</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 펀드 수정 팝업폼 */}
        {selectedFund && (
          <div
            className="fund-form-container"
            style={{
              position: "absolute",
              top: modalPosition.y,
              left: modalPosition.x,
              width: "400px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
          >
            {/* 닫기 버튼 */}
            <button
              className="close-button"
              onClick={handleClosePopup}
              style={{
                position: "relative",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontColor: "#61dafb",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <h3>펀드 수정</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveFund();
              }}
            >
              <div>
                <label>펀드 ID:</label>
                <input
                  type="number"
                  name="FUND_ID"
                  value={formData.FUND_ID}
                  onChange={handleChange}
                  disabled // 수정 시 펀드 ID는 읽기 전용
                />
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
              <button type="submit">저장</button>
            </form>
          </div>
        )}
      </div>
    );
  };            

export default FundProductAdmin;
