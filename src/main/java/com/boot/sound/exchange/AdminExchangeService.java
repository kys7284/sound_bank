package com.boot.sound.exchange;

import java.math.BigDecimal;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.sound.inquire.account.AccountDTO;

@Service
public class AdminExchangeService {
	
	@Autowired
	private AdminExchangeDAO dao;
	
	// 외환 계좌 개설 요청 목록 조회
	public List<ExchangeAccountRequestDTO> exAccountList(){
		System.out.println("Service - exAccountList");
		
		return dao.reqList();
	}
	
	// 계좌 승인처리
	@Transactional
	public int approveAccount(long REQUEST_ID) {
		System.out.println("Service - approveAccount");
		
		ExchangeAccountRequestDTO req = dao.findById(REQUEST_ID);
		
		// 고객 계좌번호를 현재 시간(밀리초)으로 자동생성  => (향후 UUID 방식으로 개선고려 - 안전성 향상)
    	String millis = String.valueOf(System.currentTimeMillis());

		// 계좌번호 자르기
    	String part1 = millis.substring(0, 3);
    	String part2 = millis.substring(3, 9);
    	String part3 = millis.substring(9);

    	String accountNumber = part1 + "-" + part2 + "-" + part3;

		AccountDTO account = new AccountDTO();
		account.setAccount_number(accountNumber);
		account.setCustomer_id(req.getCUSTOMER_ID());
		account.setAccount_type("외환");
		account.setBalance(BigDecimal.valueOf(0));
		account.setInterest_rate(BigDecimal.valueOf(0.0));
        account.setYield_rate(BigDecimal.valueOf(0.0));
		account.setCurrency_type("KRW");
		account.setAccount_name("기본 입출금 계좌");
		account.setOpen_date(new java.util.Date());
		account.serAccountpassword(req.getACCOUNT_PASSWORD());
		account.setStatus("ACTIVE"); 
		return dao.approveAccount(REQUEST_ID);
	}
}
