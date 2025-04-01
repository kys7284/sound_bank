import React from "react";

const ExCreateAccount = () => {
  return (
    <div className="ex-create-account">
      <h2>환전계좌 만들기</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="exchange_account_number">외환 계좌번호 :</label>
              </th>
              <td>
                <input
                  type="text"
                  id="exchange_account_number"
                  name="exchange_account_number"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="exchange_account_name">계좌명 :</label>
              </th>
              <td>
                <input
                  type="text"
                  id="exchange_account_name"
                  name="exchange_account_name"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="base_currency">기준통화 :</label>
              </th>
              <td>
                <input
                  type="text"
                  id="base_currency"
                  name="base_currency"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </form>      
          <button type="submit">계좌 신청</button> 
                   
  </div>
  )
};

export default ExCreateAccount;
