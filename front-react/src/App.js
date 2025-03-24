import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Footer from "./Common/Footer";
import Main from "./Common/Main";
import Header from "./Common/Header";
import LoanApply from "./sound_loan/customer/LoanApply";
import LoanStatus from "./sound_loan/customer/LoanStatus";
import LoanManage from "./sound_loan/customer/LoanManage";
import LoanService from "./sound_loan/customer/LoanService";
import LoanCustomerList from "./sound_loan/admin/LoanCustomerList";
import LoanList from "./sound_loan/admin/LoanList";
import ChartManage from "./sound_loan/admin/ChartManage";
import LoanDetail from "./sound_loan/admin/LoanDetail";
import LoanUpdate from "./sound_loan/admin/LoanUpdate";
import Inquire from "./inquire/Inquire";
import InquireAccont from "./inquire/InquireAccont";
import InquireTransfer from "./inquire/InquireTransfer";
import InquireAssets from "./inquire/InquireAssets";
import Transfer from "./transfer/customer/Transfer";
import TransInstant from "./transfer/customer/TransInstant";
import TransAuto from "./transfer/customer/TransAuto";
import TransMulti from "./transfer/customer/TransMulti";
import TransLimit from "./transfer/customer/TransLimit";
import TransferAdmin from "./transfer/admin/TransferAdmin";
import LimitAdmin from "./transfer/admin/LimitAdmin";
import MultiAdmin from "./transfer/admin/MultiAdmin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        {/* Header.js의 Link연동을 위해서 BrowserRouter추가해야됨 */}
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

          {/* 조회 Route 시작 */}
          <Route path="/inquire" element={<Inquire />} />
          <Route path="/inquireAccont" element={<InquireAccont />} />
          <Route path="/inquireTransfer" element={<InquireTransfer />} />
          <Route path="/inquireAssets" element={<InquireAssets />} />
          {/* 조회 Route 끝 */}

          {/* 이체(고객) Route 시작 */}
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transInstant" element={<TransInstant />} />
          <Route path="/transAuto" element={<TransAuto />} />
          <Route path="/transMulti" element={<TransMulti />} />
          <Route path="/transLimit" element={<TransLimit />} />
          {/* 이체(고객) Route 끝 */}

          {/* 이체(관리자) Route 시작 */}
          <Route path="/transferAdmin" element={<TransferAdmin />} />
          <Route path="/limitAdmin" element={<LimitAdmin />} />
          <Route path="/multiAdmin" element={<MultiAdmin />} />
          {/* 이체(관리자) Route 끝 */}

          {/* 대출관련 Route 시작 */}
          <Route path="/loanApply" element={<LoanApply />} />
          <Route path="/loanStatus" element={<LoanStatus />} />
          <Route path="/loanManage" element={<LoanManage />} />
          <Route path="/loanService" element={<LoanService />} />
          <Route path="/loanList" element={<LoanList />} />
          <Route path="/loanDetail/:loan_id" element={<LoanDetail />} />
          <Route path="/loanUpdate/:loan_id" element={<LoanUpdate />} />
          <Route path="/loanCustomerList" element={<LoanCustomerList />} />
          <Route path="/chartManage" element={<ChartManage />} />
          {/* 대출관련 Route 종료 */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
