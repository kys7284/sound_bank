import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FundRecommend = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // 로그인 여부 확인
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // 예시로 로컬 스토리지 사용
//   const result = location.state?.result; // 투자성향 테스트 결과

//   useEffect(() => {
//     if (!isLoggedIn) {
//       // 로그인이 되어 있지 않은 경우
//       alert("로그인을 해주세요.");
//       navigate("/login"); // 로그인 페이지로 이동
//     } else if (result === undefined) {
//       // 투자성향 테스트 결과가 없는 경우
//       alert("투자성향 테스트를 먼저 진행해주세요.");
//       navigate("/fundTest"); // 투자성향 테스트 페이지로 이동
//     }
//   }, [isLoggedIn, result, navigate]);

//   return (
//     <div className="fund-recommend-container">
//       <h1 className="fund-recommend-title">추천 펀드 목록</h1>
//       {/* 추천 펀드 목록 표시 로직 추가 */}
//     </div>
//   );
 };

export default FundRecommend;