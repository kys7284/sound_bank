import React from "react";

const BankDepositScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">예금 입금</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-700">입금 계좌번호</label>
            <input id="account" type="text" placeholder="계좌번호 입력" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">입금 금액</label>
            <input id="amount" type="number" placeholder="입금 금액 입력" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-gray-700">메모 (선택사항)</label>
            <input id="memo" type="text" placeholder="메모 입력" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
            입금하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDepositScreen;
