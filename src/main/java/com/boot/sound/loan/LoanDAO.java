package com.boot.sound.loan;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface LoanDAO  {

	// 대출 상품 리스트
	public List<LoanDTO> loanList();
	
	// 대출 상품 등록
	public int loanInsert(LoanDTO dto);
	
	// 대출 상품 수정
	public int loanUpdate(LoanDTO dto);
	
	// 대출 상품 삭제
	public int loanDelete(int loan_id);
	
	// 대출 상품 조회
	public LoanDTO loanDetail(int loan_id);
	
}
