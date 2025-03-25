package com.boot.sound.loan;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoanService {

	@Autowired
	private LoanDAO dao;
	
	// 대출 상품 리스트
	@Transactional(readOnly=true)
	public List<LoanDTO> loanList() {
		System.out.println("서비스 - loanList");
		return dao.loanList();
	}
	
	// 대출 상품 등록
	@Transactional
	public int loanInsert(LoanDTO dto) {
		System.out.println("서비스 - loanInsert");
		return dao.loanInsert(dto);
	}
	
	// 대출 상품 수정
	@Transactional
	public int loanUpdate(int loan_id, LoanDTO dto) {
		System.out.println("서비스 - loanUpdate");
		//dto.setLoan_id(loan_id);
		return dao.loanUpdate(dto);
	}
	
	// 대출 상품 삭제
	@Transactional
	public String loanDelete(int loan_id) {
		System.out.println("서비스 - loanDelete");
		dao.loanDelete(loan_id);
		return "ok";
	}
	
	
	// 대출 상품 상세
	@Transactional
	public LoanDTO loanDetail(int loan_id) {
		System.out.println("서비스 - loanDetail");
		return dao.loanDetail(loan_id);
	}

}
