import React, { useState, useEffect } from "react";
import BlurText from "./BlurText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../Css/Common/Main.css";

const Main = () => {
  //  배너에 사용할 이미지/텍스트 데이터 배열
  const data = [
    {
      image: "./Images/main1.png",
      title: "음성 AI로 혁신하는 뱅킹",
      desc: "효율성과 편의를 극대화한 차세대 금융 경험. 음성 AI로 모든 서비스를 정밀하게 관리하세요.",
    },
    {
      image: "./Images/main2.png",
      title: "사운드뱅크, 새로운 대출 상품 출시",
      desc: "간편한 대출 심사와 낮은 이자로 새로운 금융 서비스를 만나보세요.",
    },
    {
      image: "./Images/main3.png",
      title: "예적금 금리 인상! 지금 가입하세요",
      desc: "높은 금리의 예적금을 지금 바로 확인하고 가입해 보세요.",
    },
  ];

  //  현재 보여질 슬라이드 index 상태
  const [index, setIndex] = useState(0);

  //  배너 자동 전환 로직 (4.5초마다 다음 배너로 전환)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length); // 0 → 1 → 2 → 0 반복
    }, 4500);

    // 컴포넌트가 사라질 때 interval 제거 (메모리 누수 방지)
    return () => clearInterval(interval);
  }, [data.length]);

  // 애니메이션 종료 시 (디버깅용 로그)
  const onAnimEnd = () => console.log("Animation Done!");

  //  수동으로 다음 슬라이드로 넘기기
  const next = () => setIndex((prev) => (prev + 1) % data.length);

  //  수동으로 이전 슬라이드로 넘기기
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  return (
    <div className="home">
      <header
        className="banner"
        style={{
          backgroundImage: `url(${data[index].image})`, // 현재 index에 해당하는 배경 이미지
          backgroundSize: "cover", // 배경이 영역을 꽉 채우도록
          backgroundPosition: "center", // 이미지 중앙 정렬
          height: "115vh", // 화면보다 약간 크게
        }}
      >
        {/* 어두운 반투명 배경 오버레이 */}
        <div className="overlay"></div>

        {/* 텍스트 콘텐츠 부분 */}
        <div className="content">
          {/* 제목 - BlurText로 애니메이션 효과 적용 */}
          <BlurText
            text={data[index].title}
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={onAnimEnd}
            className="title"
          />

          {/* 설명 - BlurText로 애니메이션 효과 적용 */}
          <BlurText
            text={data[index].desc}
            delay={150}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={onAnimEnd}
            className="desc"
          />

          {/* 좌우 이동 버튼 */}
          <div className="buttons">
            <button onClick={prev} className="nav">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={next} className="nav">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Main;
