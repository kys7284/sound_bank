import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/exchange/ExRate.css";

const ExRate = () => {
  
  const [exchange, setExchange] = useState([]); // 환율데이터
  const [date, setDate] = useState(""); // 선택된 날짜 상태

     // 날짜 변경 핸들러
     const handleDateChange = (e) => {
        setDate(e.target.value); // 선택된 날짜를 상태에 저장
    };

    // 날짜별 환율 조회 함수
    const fetchExchangeRates = (selectedDate) => {
      axios.get("http://localhost:8081/api/exchange/rates", {
          params: { date: selectedDate } // API 요청에 날짜를 파라미터로 전달
      })
      .then((res) => {
          console.log("api데이터", res.data);
          setExchange(res.data); // 응답 데이터를 상태에 저장
      })
      .catch((err) => {
          console.log("에러", err);
      });
  };

  // 날짜가 변경될 때마다 API 호출
  useEffect(() => {
    if (date) {
        fetchExchangeRates(date); // 선택된 날짜로 API 호출
    }
    }, [date]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/exchange/rates")
    .then((res) => {
        console.log("api데이터", res.data);
        setExchange(res.data);
    })
    .catch((err) => {
        console.log("에러", err);
    });
  }, []);


  return (
    <div className="container"> 

        {/* 날짜 입력 필드 */}
        <div className="date-input">
            <label htmlFor="date">날짜 선택: </label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
            />
            <h5> * 주말&공휴일 환율은 조회되지 않습니다. </h5>
        </div>

        <table border="1" >
            <thead>
                <tr>
                <th>통화 코드</th>
                    <th>국가/통화명</th>
                    <th>전신환(송금) 받으실 때</th>
                    <th>전신환(송금) 보내실 때</th>
                    <th>매매 기준율</th>
                    <th>장부가격</th>
                    <th>서울외국환중개 매매기준율</th>
                    <th>서울외국환중개 장부가격</th>
                </tr>
            </thead>
            <tbody>
                {exchange.map((item, index) => (
                    <tr key={index}>
                        <td>{item.cur_unit}</td> {/* 필드 이름이 소문자일 경우 */}
                        <td>{item.cur_nm}</td>
                        <td>{item.ttb}</td>
                        <td>{item.tts}</td>
                        <td>{item.deal_bas_r}</td>
                        <td>{item.bkpr}</td>
                        <td>{item.kftc_deal_bas_r}</td>
                        <td>{item.kftc_bkpr}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default ExRate;
