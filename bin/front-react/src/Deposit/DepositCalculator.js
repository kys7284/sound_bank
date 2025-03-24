import React from 'react';

const DepositCalculator = () => {
    const [principal, setPrincipal] = React.useState(0);
    const [rate, setRate] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    const calculateTotal = (e) => {
        e.preventDefault();
        const principalAmount = parseFloat(principal);
        const interestRate = parseFloat(rate) / 100;
        const timePeriod = parseFloat(time);
        const totalAmount = principalAmount + (principalAmount * interestRate * timePeriod);
        setTotal(totalAmount);

    }
        
    return (
        <div>
            <h2> 예금 계산기 </h2>         
            <form onSubmit={calculateTotal}>
               <div>
                <label>원금 : </label>
                <input type="number" value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}/>
               </div>   

               <div>
                    <label>이자율 (%)</label>
                    <input type="number" value={rate}
                        onChange={(e) => setRate(e.target.value)}/>
               </div>
               <div>
                   <label>기간(년)</label>
                   <input type="number" value={time}
                        onChange={(e) => setTime(e.target.value)}/>
               </div>

               <button type="submit">계산</button>
            </form>
            {total &&(
                <div>
                    <h3>총액: ${total}</h3>
                </div>
            )}
        </div>
    );
};

export default DepositCalculator;



