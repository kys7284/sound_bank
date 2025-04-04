package com.boot.sound.fund;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FundRepository {

	// 펀드상품 목록
	public List<FundDTO> fundList();
	
	// 펀드상품 등록
	public int insertFund(FundDTO dto);
	
	// 등록된 펀드 상품 목록 조회
	List<FundDTO> getRegisteredFunds();
	
	// 펀드상품 수정
	public int updateFund(FundDTO dto);
	
	// 펀드상품 삭제
    int deleteFund(Long fund_id);
	
	// 펀드상품 1건 조회
	public FundDTO findById(Long fund_id);
	
	// 투자 성향 테스트 등록
	public int insertTestResult(FundTestDTO test);
	
}
