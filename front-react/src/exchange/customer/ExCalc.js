import React, { useState, useEffect } from "react";
import styles from "../../Css/exchange/ExCalc.module.css";

const ExCalc = ({ isOpen, onClose, exchange }) => {
    const [amount, setAmount] = useState(0);                //입력받을 금액
    const [fromCurrency, setFromCurrency] = useState("");   //입력받을 통화
    const [toCurrency, setToCurrency] = useState("");       //변환할 통화
    const [convertedAmount, setConvertedAmount] = useState(null);   //변환된 금액

    const getExchangeRate = (currency) => {
        const item = exchange.find(item => item.cur_unit === currency); //입력받은 통화와 일치하는 통화 찾기
        if (!item) return null; //일치하는 통화가 없으면 null 반환

        const rate = parseFloat(item.deal_bas_r.replace(/,/g, '')); //환율을 숫자로 변환
        
        return rate; //환율 반환

        // const unit = (item.cur_unit.includes("JPY") || item.cur_unit.includes("IDR")) ? 100 : 1; //일본 엔화와 인도네시아 루피아는 100으로 나누기
        //환율을 100으로 나누어 소수점 두 자리까지 표현        
        
        // return rate / unit;
    };

    const calculateExchange = () => {
        if (!fromCurrency || !toCurrency || !amount) { //입력값이 없으면 계산하지 않음
            setConvertedAmount(null); 
            return;
        }

        const fromRate = getExchangeRate(fromCurrency); //입력받은 통화의 환율
        const toRate = getExchangeRate(toCurrency); //변환할 통화의 환율
        //환율을 가져와서 계산

        if (fromRate && toRate) {
            const result = amount * (fromRate / toRate); 
            setConvertedAmount(result.toFixed(2));  
        } else {
            setConvertedAmount(null);   
        }
    };

    // 입력이 바뀔 때마다 자동 계산
    useEffect(() => {
        calculateExchange();
    }, [amount, fromCurrency, toCurrency]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>환율 계산기</h3>

                <div>
                    <label>금액:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div>
                    <label>From:</label>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        <option value="">통화 선택</option>
                        {exchange.map((item, index) => (
                            <option key={index} value={item.cur_unit}>
                                {item.cur_unit} - {item.cur_nm}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>To:</label>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        <option value="">통화 선택</option>
                        {exchange.map((item, index) => (
                            <option key={index} value={item.cur_unit}>
                                {item.cur_unit} - {item.cur_nm}
                            </option>
                        ))}
                    </select>
                </div>

                {convertedAmount !== null && (
                    <div>
                        <h4>결과:</h4>
                        <p>
                            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                        </p>
                    </div>
                )}

                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default ExCalc;
