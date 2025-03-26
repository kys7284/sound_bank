import React, { useState } from "react";

const ExCalc = ({ isOpen, onClose, exchange }) => {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const calculateExchange = () => {
        if (!fromCurrency || !toCurrency || !amount) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        
        const fromRate = parseFloat(exchange.find(item => item.cur_unit === fromCurrency)?.deal_bas_r); 
        const toRate = parseFloat(exchange.find(item => item.cur_unit === toCurrency)?.deal_bas_r);     
        console.log("fromRate:", fromRate, "toRate:", toRate);

        if (!isNaN(fromRate) && !isNaN(toRate)) {

            const result = (amount/fromRate) * toRate;
            
            setConvertedAmount(result.toFixed(2)); // 소수점 2자리까지 표시
            
            console.log("fromRate:", fromRate, "toRate:", toRate, "amount:", amount);
            console.log(result);
        } else {
            alert("선택한 통화의 환율 정보를 찾을 수 없습니다.");
        }
    };

    if (!isOpen) return null;

    return (
        // <img src="/images/exchange/ex_calc.png" alt="환율계산기" />
            <div className="modal-overlay">
            <div className="modal-content">
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
                <button onClick={calculateExchange}>계산</button>
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
}
export default ExCalc;