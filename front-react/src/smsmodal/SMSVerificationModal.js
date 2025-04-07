// SMSVerificationModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import RefreshToken from "../jwt/RefreshToken";

// 모달 접근성을 위한 설정 (root 엘리먼트 id가 "root"라고 가정)
Modal.setAppElement("#root");

const SMSVerificationModal = ({ isOpen, onRequestClose, onVerified }) => {
  // 요청 단계: 고객 정보 입력 → 인증번호 요청
  // 검증 단계: 전송된 인증번호를 입력받아 검증
  const [step, setStep] = useState("request"); // "request" 또는 "verify"

  // 고객 정보 상태
  const [customer_name, setCustomer_name] = useState("");
  const [telecom, setTelecom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 인증번호 입력 상태
  const [verificationCode, setVerificationCode] = useState("");

  // 인증번호 요청 함수
  const requestVerificationCode = async () => {
    try {
      // RefreshToken 인스턴스를 사용해 API 호출하면,
      // localStorage에 저장된 토큰이 자동으로 헤더에 포함됩니다.
      const response = await RefreshToken.post("/sms/request", {
        customer_id: localStorage.getItem("customer_id"),
        customer_name,
        telecom,
        phoneNumber,
      });
      if (response.status === 200) {
        alert("인증번호가 전송되었습니다.");
        // 요청 성공 시, 인증번호 입력 단계로 전환
        setStep("verify");
      } else {
        alert("인증번호 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("인증번호 요청 에러:", error);
      alert("인증번호 요청 중 오류가 발생했습니다.");
    }
  };

  // 인증번호 확인 함수
  const verifyCode = async () => {
    try {
      const response = await RefreshToken.post("/sms/verify", {
        phoneNumber,
        code: verificationCode,
      });
      if (response.status === 200) {
        alert("인증이 완료되었습니다.");
        // 인증 성공 시 부모 컴포넌트에 성공 콜백 실행 후 모달 닫기
        onVerified();
        onRequestClose();
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("인증번호 확인 에러:", error);
      alert("인증번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="SMS Verification"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "300px",
          padding: "20px",
        },
      }}
    >
      {step === "request" ? (
        <div>
          <h2>SMS 인증 요청</h2>
          <div>
            <label>고객 이름:</label>
            <input
              type="text"
              value={customer_name}
              onChange={(e) => setCustomer_name(e.target.value)}
              placeholder="이름 입력"
            />
          </div>
          <div>
            <label>통신사:</label>
            <select
              value={telecom}
              onChange={(e) => setTelecom(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LG">LG</option>
              <option value="SKT 알뜰폰">SKT 알뜰폰</option>
              <option value="KT 알뜰폰">KT 알뜰폰</option>
              <option value="LG 알뜰폰">LG 알뜰폰</option>
            </select>
          </div>
          <div>
            <label>전화번호:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="전화번호 입력"
            />
          </div>
          <button onClick={requestVerificationCode}>인증번호 요청</button>
        </div>
      ) : (
        <div>
          <h2>인증번호 입력</h2>
          <div>
            <label>인증번호:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호 입력"
            />
          </div>
          <button onClick={verifyCode}>인증번호 확인</button>
        </div>
      )}
      <button style={{ marginTop: "10px" }} onClick={onRequestClose}>
        닫기
      </button>
    </Modal>
  );
};

export default SMSVerificationModal;
