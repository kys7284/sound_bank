import React, { useState, useEffect } from "react";
import styles from "../../Css/exchange/ExCalc.module.css";

const ExCalc = ({ isOpen, onClose, exchange }) => {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const getExchangeRate = (currency) => {
        const item = exchange.find(item => item.cur_unit === currency);
        if (!item) return null;

        const rate = parseFloat(item.deal_bas_r.replace(/,/g, ''));
        const unit = (item.cur_unit.includes("JPY") || item.cur_unit.includes("IDR")) ? 100 : 1;

        return rate / unit;
    };

    const calculateExchange = () => {
        if (!fromCurrency || !toCurrency || !amount) {
            setConvertedAmount(null);
            return;
        }

        const fromRate = getExchangeRate(fromCurrency);
        const toRate = getExchangeRate(toCurrency);

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
