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
	
	// 전체 대출 상품 갯수
	@Transactional
	public int loanCnt() {
		System.out.println("서비스 - loanCnt()");
		return dao.loanCnt();
	}
	
	// 대출유형 검색 리스트
	@Transactional
	public List<LoanDTO> loanTypeSearch(String loan_type) {
		System.out.println("서비스 - loanTypeSearch()");
		return dao.loanTypeSearch(loan_type);
	}
	
	// 대출 유형 상품별 갯수
	@Transactional
	public int loanTypeCnt(String loan_type) {
		System.out.println("서비스 - loanTypeCnt()");
		return dao.loanTypeCnt(loan_type);
	}
	
	// 대출 이름검색 리스트
	@Transactional
	public List<LoanDTO> loanNameSearch(String loan_name){
		System.out.println("서비스 - loanNameSearch()");
		return dao.loanNameSearch(loan_name);
	}
	
	// 대출 이름 검색 결과 갯수
	@Transactional
	public int loanNameCnt(String loan_name){
		System.out.println("서비스 - loanNameSearch()");
		return dao.loanNameCnt(loan_name);
	}
}
