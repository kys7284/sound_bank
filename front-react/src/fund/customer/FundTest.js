import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FundTest = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(Array(9).fill(null));
    
    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/predict", { answers });
            navigate("/test-result", { state: { result: response.data.investment_type } });
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    };

    return (
        <div>
            <h1>투자성향 테스트</h1>
            {[...Array(9)].map((_, index) => (
                <div key={index}>
                    <label>질문 {index + 1}:</label>
                    <select onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}>
                        <option value="">선택</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            ))}
            <button onClick={handleSubmit}>결과 확인</button>
        </div>
    );
};

export default FundTest;
